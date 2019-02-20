const logger = require('log4js').getLogger('processor');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const Rpc = require('node-json-rpc');
const vm = require('vm');
const cheerio = require('cheerio');
const md5Hex = require('md5-hex');
const iconv = require('iconv-lite');
const request = require('request');

module.exports = function(config) {

  this._fetcher_clients = [];
  this._project_cache = {};
  this.ProjectModel = null;
  this.TaskModel = null;
  this.ResultModel = null;
  this.requestIdGenerator = 0;
  this.stopedProjects = new Set();

  this.start = async () => {
    try{
      this.ProjectModel = require('../model/Project');
      this.TaskModel = require('../model/Task');
      this.ResultModel = require('../model/Result');
      await Mq.getMq().register(utils.constant.TOPIC_PROCESS, this._on_process);
      await Mq.getMq().register(utils.constant.TOPIC_STOP_PROJECT, this._on_project_stop);
      this._init_fetcher_clients();
      return await Promise.resolve();
    } catch(error){
      return await Promise.reject(error);
    }
  }

  this._on_project_stop = async (data)=> {
    logger.info('received stop project message:%s', JSON.stringify(data));
    this.stopedProjects.push(data.projectId);
  }

  this._on_process = async (result) => {
    const taskId = md5Hex(result.url);
    try{
      logger.info('process data,method:%s,project:%d, taskId:%s', result.method, result.projectId, taskId);
      result.fetch_type = result.fetch_type || 'html';

      if (result.method != 'start') {
        if (this.stopedProjects.has(result.projectId)) {
          logger.info('project %s is stoped, will not process message', result.projectId);
          return;
        }
        const task_temp = await this.TaskModel.findByPk(taskId);
        if (task_temp) {
          if (task_temp.expireTime === 0 || task_temp.createdAt.getTime() + task_temp.expireTime > Date.now()) {
            logger.info('task is already exist, url:%s, taskId:%s', result.url, taskId);
            return;
          } else {
            logger.info('task is out of expire time, url:%s, taskId:%s', result.url, taskId);
            this.TaskModel.destroy({where: {id: taskId}});
            this.ResultModel.destroy({where: {taskId: taskId}});
          }
        } else {
          if (this.stopedProjects.has(result.projectId)) {
            this.stopedProjects.delete(result.projectId);
          }
          await this.TaskModel.create({id: taskId, projectId: result.projectId, url: result.url, 
            expireTime: result.expireTime || 0,
            status: utils.constant.STATUS.TASK_RUNNING, context: JSON.stringify(result), track: ''});
        }
      }

      let project = this._project_cache[result.projectId];
      if (!project) {
        project = await this.ProjectModel.findByPk(result.projectId);
        if (!project) {
          return await Promise.reject(new Error('project not found:id=' + result.projectId));
        } else {
          this._init_and_cache_context(project);
          this._project_cache[project.id] = project;
        }
      }

      await this._run_project_task(project, result, taskId);
    } catch(error){
      await this.TaskModel.update({status: utils.constant.STATUS.TASK_ERROR, stack: error + ''},{where: {id: taskId}});
      logger.error('process error, data:%s', JSON.stringify(result), error);
    }
  }


  this._run_project_task = async (project, result, taskId) => {
    let process_result;
    if (result.method === 'start') {
      process_result = project.context[result.method](result.url);
      await this.TaskModel.update({status: utils.constant.STATUS.TASK_DONE},{where: {id: taskId}}); 
    } else {
      response = await this._fetch(result.url, result);
      if (!response.content) {
        logger.warn('request has no body,url:%s', result.url);
      } else {
        if (result.charset) {
          response.content = iconv.decode(new Buffer(response.content, 'base64'), result.charset);
        } else {
          response.content = new Buffer(response.content, 'base64').toString();
        }
        result.doc = this._html_2_document(response.content);
        result.text = response.content;
        process_result = project.context[result.method](result);
      }
    }
    this._resolve_process_result(project.context, taskId, project.id, result.method, process_result);
  }


  this._resolve_process_result = async (context, taskId, projectId, method, result) => {
    const _this = this;
    if (result && result.constructor.name === 'Promise') {
      result.then((new_result) => {
        return this._resolve_process_result(context, taskId, projectId, method, new_result);
      })
      .catch(async (error) => {
        await _this.TaskModel.update({status: utils.constant.STATUS.TASK_ERROR, stack: error + ''},{where: {id: taskId}});
        logger.error('process error,project:%d, method:%s', projectId, method, error);
      })
      return;
    }
    
    if ((typeof result) != 'object') {
      await _this.TaskModel.update({status: utils.constant.STATUS.TASK_ERROR, stack: 'invalid function return value:' + result},{where: {id: taskId}});
      logger.error('invalid function return value:%s', result)
    } else {
      await _this.TaskModel.update({status: utils.constant.STATUS.TASK_DONE},{where: {id: taskId}});
      if (result['_result'] === true) {
        result.taskId = taskId;
        result.projectId = projectId;
        await context['on_result'](result);
      }
    } 
  }


  this._init_and_cache_context = (project) => {
    const contextObj = {
      _out: (message) => {
        console.log(message);
      },
      on_result: async (result) => {
        logger.info('process result:%s', JSON.stringify(result, null, '\t'));
        await this.ResultModel.create({projectId: project.id, taskId: result.taskId, result:JSON.stringify(result)});
      },
      request: request,
      mq: Mq.getMq(),
      _crawl: async (url, options) => {
        const runParams = {method: options.callback, url: url, projectId: project.id, 
          charset: options.charset, proxy: options.proxy || undefined, expireTime: options.expireTime,
          attrs: options.attrs || {},fetch_type: options.fetch_type || 'html',headers:options.headers || {}, 
          _inner_params: {project:project}};
        contextObj.mq.produce(utils.constant.TOPIC_SCHEDULE, runParams);
      }
    };
    const context = vm.createContext(contextObj);
    const script = new vm.Script(project.script);
    script.runInContext(context);
    project.context = context;
  }

  this._html_2_document = (html) => {
    return cheerio.load(html);
  }

  this.select_fetcher_client = () => {
    const idx = Math.floor(Math.random() * this._fetcher_clients.length);
    return this._fetcher_clients[idx];
  }

  this._fetch = async (url, options) => {
    const fetcher = this.select_fetcher_client();
    options.url = url;
    const requestId = this.requestIdGenerator += 1 ;
    return new Promise((resolve, reject) => {
      fetcher.call({'jsonrpc': '2.0', 'method':'fetch', 'params': options, id: requestId}, (error, result) =>{
            if (error) {
              reject(error);
            } else if (result.error) {
              reject(result.error);
            } else {
              resolve(result.result);
            }
        }
      )
    })
  }

  this._init_fetcher_clients = () => {
    const fetcher_rpc_config = config.process.fetcher_service || [];
    for (let i = 0; i < fetcher_rpc_config.length; i ++) {
      let host = fetcher_rpc_config[i].rpc_host;
      let port = fetcher_rpc_config[i].rpc_port;
      let options = {
        port: port,
        host: host,
        path: '/',
        strict: true
      };
      logger.info('init fetcher,host:%s,port:%d', host, port);
      let client = new Rpc.Client(options);
      this._fetcher_clients.push(client);
    }
  }

  this.destroy = async () => {
    logger.info('destroy processor');
    this._project_cache = null;
    this._fetcher_clients = null;
    this._project_limiter = null;
    this._project_task_queue = null;
    return Promise.resolve();
  }


}
