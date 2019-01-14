const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('task');
const Sequelize = require('sequelize');


module.exports = task = sequelize.define('task', {
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  projectId: {type: Sequelize.BIGINT, allowNull: false},
  url: {type: Sequelize.STRING(200), allowNull: false},
  status: {type: Sequelize.INTEGER(1), allowNull: false},
  schedule_interval: {type: Sequelize.BIGINT, allowNull: false, defaultValue: -1},
  next_process: {type: Sequelize.STRING(200)},
  track: {type: Sequelize.TEXT}
})