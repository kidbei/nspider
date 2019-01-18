const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');

module.exports = function(config) {

  this.start = async () => {
    try{
      await Mq.getMq().register(utils.constant.TOPIC_SCHEDULE, this.onSchedule);
      return Promise.resolve();
    } catch(error){
      return Promise.reject(error);
    }
    
  }


  this.onSchedule = (data) => {
    try{
      logger.info('on schedule:%s', JSON.stringify(data));
      if (!data.url) {
        logger.error('invalid schedule data: no url,data:%s', JSON.stringify(data));
      }
      if (!data.projectId) {
        logger.error('invalid schedule data: no projectId,data:%s', JSON.stringify(data));
      }
      if (!data.method) {
        logger.error('invalid schedule data: no method, data:%s', JSON.stringify(data));
      }
      Mq.getMq().produce(utils.constant.TOPIC_PROCESS, data);
    } catch(error){
      logger.error('on schedule error,data:%s', JSON.stringify(data), error)
    }
  }


  this.startProject = async (projectId, url) => {
    try{
      await Mq.getMq().produce(utils.constant.TOPIC_PROCESS,{projectId: projectId, url: url, method: 'start'});
      return Promise.resolve();
    } catch(error){
      return Promise.reject(error);
    }
  }


  this.destroy = () => {
    return Promise.resolve();
  }


}