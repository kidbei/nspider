const logger = require('log4js').getLogger('nspider');
const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;

module.exports = function() {
  this.eventBus = null;
  this.consumers = {};

  this.init = () => {
    this.eventBus = new EventEmitter();
    return Promise.resolve();
  }

  this.produce = (topic, data) => {
    logger.debug('send mq data,topic:%s, data:%s', topic, JSON.stringify(data));
    this.eventBus.emit(topic, data);
    return Promise.resolve();
  }

  this.register = (topic, callback) => {
    logger.info('register consumer for topic:%s', topic);
    if (!this.consumers[topic]) {
      this.consumers[topic] = [];
    }
    this.consumers[topic].push(callback);
    this.eventBus.on(topic, callback);
    return Promise.resolve();
  }

  this.destroy = () => {
    this.eventBus = null;
    this.consumers = null;
    return Promise.resolve();
  }

}