const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('task');
const Sequelize = require('sequelize');


module.exports = task = sequelize.define('task', {
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  projectId: {type: Sequelize.BIGINT, allowNull: false},
  url: {type: Sequelize.STRING(200), allowNull: false},
  status: {type: Sequelize.STRING(10), allowNull: false},
  scheduleInterval: {type: Sequelize.BIGINT, allowNull: false, defaultValue: -1},
  nextProcess: {type: Sequelize.STRING(200)},
  track: {type: Sequelize.TEXT}
})