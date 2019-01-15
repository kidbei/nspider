const logger = require('log4js').getLogger('fetcher');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');

module.exports = function(config) {
  this.serv = null;

  this.start = function () {
    console.log('start fetcher');
    const rpc_config = config.fetcher || {};
    return this._start_rpc(rpc_config);
  }

  this.destroy = () => {
    logger.info('destroy fetcher');
  }

  this._start_rpc = (rpc_config) => {
    const rpc_host = rpc_config.rpc_host || '127.0.0.1';
    const rpc_port = rpc_config.rpc_port || 9980; 
    return new Promise((resolve, reject) => {
      const  options = {
        port: rpc_port,
        host: rpc_host,
        path: '/',
        strict: true
      };
      serv = new Rpc.Server(options);
      serv.start(function (error) {
        if (error) {
          logger.error('start fetcher rpc server failed, host:%s,port:%d', rpc_host, rpc_port);
          reject(error);
        } else {
          logger.info('start fetcher rpc server success, host:%s,port:%d', rpc_host, rpc_port);
          resolve();
        };
      });
    })
  }
}