const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const Rpc = require('node-json-rpc');
const vm = require('vm');
const cheerio = require('cheerio');


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
    logger.info('process data:%s', JSON.stringify(result));
    let project = this._project_cache[result.projectId];
    if (!project) {
      project = await this.ProjectModel.findById(result.projectId);
      if (!project) {
        return await Promise.reject(new Error('project not found:id=' + result.projectId));
      } else {
        this._init_and_cache_context(project);
        this._project_cache[project.id] = project;
      }
    }
    result.doc = cheerio.load(result.content);
    project.context[result.method](result);
  }


  this._init_and_cache_context = (project) => {
    const contextObj = {
      _fetch: this.fetch,
      _mq: Mq.getMq(),
      _crawl: async (url, options) => {
        const result = await this._fetch(url, options);
        result.method = options.callback;
        result.projectId = project.id;
        _mq.produce(utils.constant.TOPIC_SCHEDULE, result);
      }
    };
    const context = vm.createContext(contextObj);
    const script = new vm.Script(data.project.script);
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

  this.fetch = async (url, options) => {
    const fetcher = this.select_fetcher_client();
    options.url = url;
    return new Promise((resolve, reject) => {
      fetcher.call({'method':'fetch', 'params': options}, (error, result) =>{
            if (error) {
              reject(error);
            } else {
              resolve(result);
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