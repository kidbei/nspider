const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const Rpc = require('node-json-rpc');
const vm = require('vm');
const cheerio = require('cheerio');
const merge = require('merge');


module.exports = function(config) {

  this._fetcher_clients = [];
  this._project_cache = {};
  this.ProjectModel = null;

  this.start = async () => {
    try{
      this.ProjectModel = require('../model/Project');
      await Mq.getMq().register(utils.constant.TOPIC_PROCESS, this._on_process);
      this._init_fetcher_clients();
      return await Promise.resolve();
    } catch(error){
      return await Promise.reject(error);
    }
  }

  this._on_process = async (result) => {
    try{
      if (result.error) {
        logger.error('process fetcher got an error', result.error);
        return;
      }
      logger.info('process data,method:%s,project:%d', result.method, result.projectId);
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
      } else {
        result.content = await this._fetch(result.url, result);
        result.doc = this._html_2_document(result.content);
        process_result = project.context[result.method](result);
      }
      this._resolve_process_result(project.context, project.id, result.method, process_result);
    } catch(error){
      logger.error('process error, data:%s', JSON.stringify(result), error);
      return Promise.reject(error);
    }
  }



  this._resolve_process_result = (context, projectId, method, result) => {
    if (result && result.constructor.name === 'Promise') {
      result.then((new_result) => {
        this._resolve_process_result(context, projectId, method, new_result);
      })
      .catch((error) => {
        logger.error('process error,project:%d, method:%s', projectId, method, error);
      })
      return;
    }
    
    context['on_result'](result);
  }


  this._init_and_cache_context = (project) => {
    const contextObj = {
      _fetch: this.fetch,
      _out: (message) => {
        console.log(message);
      },
      on_result: (result) => {
        logger.info('process result:%s', JSON.stringify(result, null, '\t'));
      },
      _crawl: async (url, options) => {
        options.url = url;
        options.fetch_type == options.fetch_type || 'html';
        options.projectId = project.id;
        options.method = options.callback;
        Mq.getMq().produce(utils.constant.TOPIC_SCHEDULE, options);
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
    return new Promise((resolve, reject) => {
      fetcher.call({'jsonrpc': '2.0', 'method':'fetch', 'params': options, id: 1}, (error, result) =>{
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