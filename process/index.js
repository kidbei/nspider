const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const Rpc = require('node-json-rpc');


module.exports = function(config) {

  this._fetcher_clients = [];

  this.start = async () => {
    try{
      await Mq.getMq().register(utils.constant.TOPIC_PROCESS, this._on_process);
      return Promise.resolve();
    } catch(error){
      return Promise.reject(error);
    }
  }

  this._on_process = (data) => {
    logger.info('process data:%s', data);
  }

  this._init_fetcher_clients = async () => {
    const fetcher_rpc_config = config.process.fetcher_service || {};
    
  }

  this.destroy = () => {
    logger.info('destroy process');
  }


}