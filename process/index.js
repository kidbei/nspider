const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');


module.exports = function(config) {

  this.start = async () => {
    return Promise.resolve();
  }

  this.destroy = () => {
    logger.info('destroy process');
  }


}