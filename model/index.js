const ModelTool = require('./model_init');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('nspider');

module.exports = {
  init: function(config) {
    ModelTool.init(config);

    Promise.all([require('./Task').sync({force: true})])
      .then(() => {
        logger.info('init model complete');
      })
      .catch((err) => {
        logger.error('init model failed', err);
        process.exit(2);
      })
  }
}