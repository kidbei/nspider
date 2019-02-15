const ModelTool = require('./model_init');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('nspider');

module.exports = {
  init: function(config) {
    ModelTool.init(config);
    return Promise.all([
        require('./Task').sync({force: true}),
        require('./Project').sync({force: true}),
        require('./Result').sync({force: true}),
        require('./Module').sync({force: true}),
        require('./AuthRecord').sync({force: true}),
      ])
  }
}