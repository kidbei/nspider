const Sequelize = require('sequelize');
const logger = require('log4js').getLogger('nspider');

const model_db_instance = {};
const db_key_instance = {};

module.exports = {
  init: function(config) {
    this._init_model_sequelize('task', config.task.db);
    this._init_model_sequelize('project', config.project.db);
    this._init_model_sequelize('result', config.result.db);
  },
  _get_db_key: function(db_config) {
    return db_config.type + db_config.host + db_config.username + db_config.password + 
       db_config.port + db_config.database;
  },
  _init_model_sequelize: function(model_name, db_config) {
    const db_key = this._get_db_key(db_config);
    logger.info('init db config for model:%s, db_key:%s', model_name, db_key);
    let sequelize;
    if (db_key_instance[db_key]) {
      logger.info('reuse db config:%s', JSON.stringify(db_config));
      sequelize = db_key_instance[db_key];
    } else {
      logger.info('init db config:%s', JSON.stringify(db_config));
      sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
        host: db_config.host,
        dialect: db_config.type,
        pool: {
          max: 5,
          min: 1,
          acquire: 30000,
          idle: 10000
        }
      });
      db_key_instance[db_key] = sequelize;
    }
    model_db_instance[model_name] = sequelize;
  },

  getModelSequelize: function(model_name) {
    return model_db_instance[model_name];
  }
}