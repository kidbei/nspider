const logger = require('log4js').getLogger('scheduler');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const RateLimiter = require('limiter').RateLimiter;

module.exports = function(config) {

  this._project_limiter = {};
  this._error_task_timer;

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
      // logger.info('on schedule:%s', JSON.stringify(data));
      if (!data.projectId) {
        logger.error('invalid schedule data: no projectId,data:%s', JSON.stringify(data));
      }
      if (!data.method) {
        logger.error('invalid schedule data: no method, data:%s', JSON.stringify(data));
      }
      const params = data['_inner_params'];
      delete data['_inner_params'];
      const project = params.project;

      const limiter = this._get_limiter(project.id, project.rateNumber, project.rateUnit);
      limiter.removeTokens(1, () => {
        Mq.getMq().produce(utils.constant.TOPIC_PROCESS, data);
      });
    } catch(error){
      logger.error('on schedule error,data:%s', JSON.stringify(data), error)
    }
  }



  this._get_limiter = (projectId, limiterNum, limiterUnit) => {
    let limiter = this._project_limiter[projectId];
    if (limiter) {
      return limiter;
    }
    limiter = new RateLimiter(limiterNum, limiterUnit);
    this._project_limiter[projectId] = limiter;
    return limiter;
  }


  this.startProject = async (projectId, url) => {
    try{
      await Mq.getMq().produce(utils.constant.TOPIC_PROCESS,{projectId: projectId, url: url, method: 'start'});
      return Promise.resolve();
    } catch(error){
      return Promise.reject(error);
    }
  }


  this.destroy = async() => {
    return Promise.resolve();
  }


}