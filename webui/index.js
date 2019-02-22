const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');
const merge = require('merge');
const path = require('path');
const uuidv4 = require('uuid/v4');
const serveStatic = require('serve-static')
const utils = require('../utils');
const ScriptRunner = require('./ScriptRunner');
const fastify = require('fastify')({
  logger: true
});


const safe_urls = new Set();
safe_urls.add('/api/login');

module.exports = function(config) {

  this.account_auth_keys = {};
  this.default_opts = {
    'need-auth': false,
    'host': '0.0.0.0',
    'port': 8090
  }

  this.ModuleModel = null;
  this.AuthRecordModel = null;
  this.ProjectModel = null;
  this.TaskModel = null;
  this.ResultModel = null;
  this.scriptRunner = null;

  this.start = async () => {
    const webui_config = merge(this.default_opts, config['webui']);
    if (webui_config['need-auth'] === true) {
      
      await this._init_api();
      await fastify.listen(webui_config.port, webui_config.host);
      logger.info('start webui server http://%s:%d', webui_config.host, webui_config.port);
    }
    this._init_account(webui_config);
    this.scriptRunner = new ScriptRunner(config['webui']['fetcher_service']);

    this.ModuleModel = require('../model/Module');
    this.AuthRecordModel = require('../model/AuthRecord');
    this.ProjectModel = require('../model/Project');
    this.TaskModel = require('../model/Task');
    this.ResultModel = require('../model/Result');
  }


  this._init_api = async () => {

    fastify.setErrorHandler((error, request, reply) => {
      logger.error('webui server got an error', error);
      reply.send({ret: false, code: -1024, msg: error.toString()});
    });

    fastify.use('/static', serveStatic(path.join(__dirname, 'static')));

    // fastify.use('/api', async (request,response,next) => {
    //   if (safe_urls.has(request.url)) {
    //     next();
    //     return;
    //   }
    //   const token = request.headers['token'];
    //   if (logger.isDebugEnabled()) {
    //     logger.debug('check api token:%s', token);
    //   }
    //   const authRecord = await this.AuthRecordModel.findOne({where: {token: token}});
    //   if (!authRecord) {
    //     response.statusCode = 401;
    //     logger.warn('invalid token:%s', token);
    //     next(new Error('invalid token'));
    //     return;
    //   }

    //   if (authRecord.updatedAt.getTime() + 1000 * 60 * 60 * 24 * 7 < Date.now()) {
    //     response.statusCode = 401;
    //     next(new Error('token is out of expire time'));
    //     return;
    //   }

    //   request.user = authRecord.userName;
    //   next();
    // })

    fastify.get('/api/modules', async (request, reply) => {
      const modules = await this.ModuleModel.findAll();
      reply.send({ret: true, code: 0, data: modules});
    });


    fastify.post('/api/login', async (request, reply) => {
      const userName = request.body.userName;
      const password = request.body.password;
      const authKey = userName + '@' + password;
      if (!this.account_auth_keys[authKey]) {
        reply.send({ret: false, code: -401, msg: 'invalid userName or password'});
        return;
      }

      const token = uuidv4();
      const authRecord = await this.AuthRecordModel.findOne({where: {userName: userName}});
      if (authRecord) {
        logger.info('refresh token for user:%s', userName);
        await this.AuthRecordModel.update({token: token}, {where: {userName: userName}});
      } else {
        await this.AuthRecordModel.create({userName: userName, token: token});
      }

      logger.info('user %s has been login successed', userName);
      reply.send({ret: true, code: 0, data: {token: token}});
    });

    fastify.get('/api/projects', async (request, reply) => {
      const projects = await this.ProjectModel.findAll();
      for (let i = 0; i < projects.length; i ++) {
        const runningCount = await this.TaskModel.count({where: {projectId: projects[i].id, status: utils.constant.STATUS.TASK_RUNNING}});
        const errorCount = await this.TaskModel.count({where: {projectId: projects[i].id, status: utils.constant.STATUS.TASK_ERROR}});
        const resultCount = await this.TaskModel.count({where: {projectId: projects[i].id}});
        projects[i].dataValues.runningCount = runningCount;
        projects[i].dataValues.errorCount = errorCount;
        projects[i].dataValues.resultCount = resultCount;
      }
      reply.send({ret: true, code: 0, data: projects || []});
    });


    fastify.get('/api/projects/:projectId', async (request, reply) => {
      const projectId = request.params.projectId;
      const project = await this.ProjectModel.findByPk(projectId);
      reply.send({ret: true, code: 0, data: project});
    });


    fastify.post('/api/projects/:projectId/properties/script', async (request, reply) => {
      const projectId = request.params.projectId;
      const script = request.body.script;
      await this.ProjectModel.update({script: script}, {where: {id: projectId}});
      reply.send({ret: true, code: 0});
    });


    fastify.post('/api/projects/:projectId/debug', async (request, reply) => {
      const scriptText = request.body.script;
      const method = request.body.method;
      const url = request.body.url;
      const params = request.body.params;
      const result = await this.scriptRunner.debug(scriptText, method, url, params);
      if (result.error) {
        reply.send({ret: false, code: -500, msg: result.error.message});
      } else {
        reply.send({ret: true, code: 0, data: result.result});
      }
    });


  }



  this._init_account = (webui_config) => {
    if (webui_config['need-auth'] === true) {
      const accounts = webui_config['accounts'];
      if (!accounts || accounts.length == 0) {
        logger.warn('has no account configed!');
        return;
      }
      for (let i = 0; i < accounts.length; i ++) {
        const account = accounts[i];
        const key = account['username'] + '@' + account['password'];
        logger.info('init account:%s', key);
        this.account_auth_keys[key] = account;
      }
    }
  }

  this.destroy = () => {
    this.account_auth_keys = null;
  }

}

console.log(path.join(__dirname, 'static'));