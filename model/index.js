const ModelTool = require('./model_init');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('nspider');

module.exports = {
  init: function(start_modules, config) {
    ModelTool.init(config);
    Promise.all([
        require('./Task').sync({force: false}),
        require('./Project').sync({force: false}),
        require('./Result').sync({force: false}),
      ])
      .then(() => {
        logger.info('init model complete');
      })
      .catch((err) => {
        logger.error('init model failed', err);
        process.exit(2);
      })
  }
}