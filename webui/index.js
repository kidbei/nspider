const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');
const merge = require('merge');
const path = require('path');
const fastify = require('fastify')({
  logger: true
});


module.exports = function(config) {

  this.account_auth_keys = {};
  this.default_opts = {
    'need-auth': false,
    'host': '0.0.0.0',
    'port': 8090
  }

  this.ModuleModel = null;

  this.start = async () => {
    const webui_config = merge(this.default_opts, config['webui']);
    if (webui_config['need-auth'] === true) {
      fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'static'),
        prefix: '/static/', // optional: default '/'
      });
      await this._init_api();
      await fastify.listen(webui_config.port, webui_config.host);
      logger.info('start webui server %s:%d', webui_config.host, webui_config.port);
    }
    this._init_account(webui_config);

    this.ModuleModel = require('../model/Module');
  }


  this._init_api = async () => {
    fastify.get('/api/modules', async (request, reply) => {
      const modules = await this.ModuleModel.findAll();
      reply.send({ret: true, code: 0, data: modules});
    })
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

