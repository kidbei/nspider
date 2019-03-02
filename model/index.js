const ModelTool = require('./model_init');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('nspider');
const utils = require('../utils');

module.exports = {
  init: function(config) {
    ModelTool.init(config);
    const debugModel = config['devModel'] || false;
    return Promise.all([
        require('./Task').sync({force: debugModel}),
        require('./Project').sync({force: false}),
        require('./Result').sync({force: debugModel}),
        require('./Module').sync({force: false}),
        require('./AuthRecord').sync({force: false}),
        require('./LockEntity').sync({force: debugModel})
      ])
        .then(async () => {
            if (debugModel) {
                await require('./Project').update({status: utils.constant.STATUS.PROJECT_DEV}, {where: {}});
            }
            return Promise.resolve();
        })
  }
}