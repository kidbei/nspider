const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('result');
const Sequelize = require('sequelize');


module.exports = task = sequelize.define('result', {
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  projectId: {type: Sequelize.BIGINT, allowNull: false},
  taskId: {type: Sequelize.BIGINT, allowNull: false},
  result: {type: Sequelize.TEXT, allowNull: false, defaultValue: '{}'}
})