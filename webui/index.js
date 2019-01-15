const logger = require('log4js').getLogger('fetcher');
const Rpc = require('node-json-rpc');
const Promise = require('bluebird');

module.exports = function(config) {

  this.start = () => {
    return Promise.resolve();
  }

  this.destroy = () => {
  }

}