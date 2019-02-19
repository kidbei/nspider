const ModelTool = require('./model_init');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('nspider');

module.exports = {
  init: function(config) {
    ModelTool.init(config);
    return Promise.all([
        require('./Task').sync({force: false}),
        require('./Project').sync({force: false}),
        require('./Result').sync({force: false}),
        require('./Module').sync({force: false}),
        require('./AuthRecord').sync({force: false}),
      ])
  }
}