const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');
const merge = require('merge');
const fastify = require('fastify')({
  logger: true
})


module.exports = function(config) {

  this.account_auth_keys = {};
  this.default_opts = {
    'need-auth': false,
    'host': '0.0.0.0',
    'port': 8090
  }

  this.start = async () => {
    const webui_config = merge(this.default_opts, config['webui']);
    if (webui_config['need-auth'] === true) {
      await fastify.listen(webui_config.port, webui_config.host);
      logger.info('start webui server %s:%d', webui_config.host, webui_config.port);
    }
    this._init_account(webui_config);
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