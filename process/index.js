const logger = require('log4js').getLogger('fetcher');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');


module.exports = function(config) {
  this.rpcClients = [];

  this.start = () => {
    return this._start_rpc_client((config.process || {}).fetcher_service);
  }

  this.destroy = () => {
    logger.info('destroy process');
  }

  this._start_rpc_client = (fetcher_rpc_config) => {
    if (!fetcher_rpc_config || fetcher_rpc_config.length == 0) {
      return Promise.reject(new Error('process.fetcher_service can not be empty'));
    }
    const all_promise = [];
    for (let i = 0; i < fetcher_rpc_config.length; i ++) {
      const config = fetcher_rpc_config[i];
      const rpc_host = config['rpc_host'];
      const rpc_port = config['rpc_port'];
      const p = new Promise((resolve, reject) => {
        const options = {
          port: rpc_port,
          host: rpc_host,
          path: '/',
          strict: true
        };
        this.rpcClients.push(new Rpc.Client(options));
        logger.info('init rpc client,host:%s, port:%d', rpc_host, rpc_port);
        resolve();
      });
      all_promise.push(p);
    }

    return Promise.all(all_promise);
  }

}