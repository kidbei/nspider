const logger = require('log4js').getLogger('fetcher');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');
const HttpFetcher = require('./http_fetcher');
const PhantomFetcher = require('./phantomjs_fetcher');

module.exports = function(config) {
  this.serv = null;
  this.fetchers = {};

  this.start = async function () {
    try{
      logger.info('start fetcher');
      this.fetchers['html'] = new HttpFetcher();
      this.fetchers['js'] = new PhantomFetcher();
      const rpc_config = config.fetcher || {};
      await this._start_rpc(rpc_config);
      this.serv.addMethod('fetch', async (param, callback) => {
        try{
          const fetcher = this.fetchers[param.fetch_type];
          const result = await fetcher.fetch(param.url, param);
          callback(undefined, result);
        } catch(error){
          callback(error, undefined);
        }
      })
      return await Promise.resolve();
    } catch(error){
      logger.error('init fetcher failed', error);
      return await Promise.reject(error);
    }
  }

  this.destroy = async () => {
    logger.info('destroy fetcher');
    await this.fetchers['html'].destroy();
    await this.fetchers['js'].destroy();
    return Promise.resolve();
  }

  this.fetch = async (url, fetch_type, options) => {
    const fetcher = this.fetchers[fetch_type];
    if (!fetcher) {
      logger.error('unknown fetch type:%s', fetch_type);
      return await Promise.reject(new Error('unknown fetch type:' + fetch_type));
    }
    return await fetcher.fetch(url, options);
  }

  this._start_rpc = async (rpc_config) => {
    const rpc_host = rpc_config.rpc_host || '127.0.0.1';
    const rpc_port = rpc_config.rpc_port || 9980; 
    const _this = this;
    return await new Promise((resolve, reject) => {
      const  options = {
        port: rpc_port,
        host: rpc_host,
        path: '/',
        strict: true
      };
      _this.serv = new Rpc.Server(options);
      _this.serv.start(function (error) {
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