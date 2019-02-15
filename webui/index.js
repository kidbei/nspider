const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');
const merge = require('merge');
const path = require('path');
const uuidv4 = require('uuid/v4');
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

  this.start = async () => {
    const webui_config = merge(this.default_opts, config['webui']);
    if (webui_config['need-auth'] === true) {
      fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'static'),
        prefix: '/static/', // optional: default '/'
      });
      fastify.setErrorHandler((error, request, reply) => {
        logger.error('webui server got an error', error);
        reply.send({ret: false, code: -1024, msg: error.toString()});
      });
      await this._init_api();
      await fastify.listen(webui_config.port, webui_config.host);
      logger.info('start webui server %s:%d', webui_config.host, webui_config.port);
    }
    this._init_account(webui_config);

    this.ModuleModel = require('../model/Module');
    this.AuthRecordModel = require('../model/AuthRecord');
  }


  this._init_api = async () => {

    fastify.use(async (request,response,next) => {
      if (safe_urls.has(request.url)) {
        next();
        return;
      }
      const token = request.headers['token'];
      if (logger.isDebugEnabled()) {
        logger.debug('check api token:%s', token);
      }
      const authRecord = await this.AuthRecordModel.findOne({where: {token: token}});
      if (!authRecord) {
        logger.warn('invalid token:%s', token);
        next(new Error('invalid token'));
        return;
      }

      if (authRecord.updatedAt.getTime() + 1000 * 60 * 60 * 24 * 7 < Date.now()) {
        next(new Error('token is out of expire time'));
        return;
      }

      next();
    })

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

