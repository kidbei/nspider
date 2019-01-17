const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');

module.exports = function(config) {

  this.start = () => {
    return Promise.resolve();
  }


  this.startProject = async (projectId, url) => {
    await Mq.getMq().produce(utils.constant.TOPIC_PROCESS,{projectId: projectId, url: url});
  }


  this.destroy = () => {
    return Promise.resolve();
  }


}