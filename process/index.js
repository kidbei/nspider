const logger = require('log4js').getLogger('processor');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const Rpc = require('node-json-rpc');
const vm = require('vm');
const cheerio = require('cheerio');
const md5Hex = require('md5-hex');


module.exports = function(config) {

  this._fetcher_clients = [];
  this._project_cache = {};
  this.ProjectModel = null;
  this.TaskModel = null;
  this.requestIdGenerator = 0;

  this.start = async () => {
    try{
      this.ProjectModel = require('../model/Project');
      this.TaskModel = require('../model/Task');
      await Mq.getMq().register(utils.constant.TOPIC_PROCESS, this._on_process);
      this._init_fetcher_clients();
      return await Promise.resolve();
    } catch(error){
      return await Promise.reject(error);
    }
  }

  this._on_process = async (result) => {
    const taskId = md5Hex(result.url);
    try{
      logger.info('process data,method:%s,project:%d, taskId:%s', result.method, result.projectId, taskId);
      result.fetch_type = result.fetch_type || 'html';

      if (result.method != 'start') {
        await this.TaskModel.create({id: taskId, projectId: result.projectId, url: result.url, 
          status: utils.constant.STATUS.TASK_RUNNING, context: JSON.stringify(result), track: ''});
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

      let process_result;
      if (result.method === 'start') {
        process_result = project.context[result.method](result.url);
        await this.TaskModel.update({status: utils.constant.STATUS.TASK_DONE},{where: {id: taskId}}); 
      } else {
        response = await this._fetch(result.url, result);
        if (!response.content) {
          logger.warn('request has no body,url:%s', result.url);
        } else {
          result.doc = this._html_2_document(response.content);
          result.text = response.content;
          process_result = project.context[result.method](result);
        }
      }
      this._resolve_process_result(project.context, taskId, project.id, result.method, process_result);
    } catch(error){
      await this.TaskModel.update({status: utils.constant.STATUS.TASK_ERROR, stack: error + ''},{where: {id: taskId}});
      logger.error('process error, data:%s', JSON.stringify(result), error);
    }
  }


  this._resolve_process_result = async (context, taskId, projectId, method, result) => {
    const _this = this;
    if (result && result.constructor.name === 'Promise') {
      result.then((new_result) => {
        this._resolve_process_result(context, taskId, projectId, method, new_result);
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
      if (result['_result'] === true) {
        await _this.TaskModel.update({status: utils.constant.STATUS.TASK_DONE},{where: {id: taskId}});
        context['on_result'](result);
      }
    } 
  }


  this._init_and_cache_context = (project) => {
    const contextObj = {
      _out: (message) => {
        console.log(message);
      },
      on_result: (result) => {
        delete result['_result'];
        logger.info('process result:%s', JSON.stringify(result, null, '\t'));
      },
      _crawl: async (url, options) => {
        const runParams = {method: options.callback, url: url, projectId: project.id, 
          fetch_type: options.fetch_type || 'html',headers:options.headers || {}};
        Mq.getMq().produce(utils.constant.TOPIC_SCHEDULE, runParams);
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

  this._fetch = (url, options) => {
    const fetcher = this.select_fetcher_client();
    options.url = url;
    const requestId = this.requestIdGenerator += 1 ;
    return new Promise((resolve, reject) => {
      fetcher.call({'jsonrpc': '2.0', 'method':'fetch', 'params': options, id: requestId}, (error, result) =>{
            if (error) {
              reject(error);
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

  this.destroy = () => {
    logger.info('destroy process');
    this._project_cache = null;
    this._fetcher_clients = null;
  }


}