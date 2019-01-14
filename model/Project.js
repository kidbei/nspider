const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('project');
const Sequelize = require('sequelize');


module.exports = sequelize.define('project', {
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING(100), allowNull: false},
  script: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.STRING(10), allowNull: false},
  rateNumber: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 1},
  rateUnit: {type: Sequelize.STRING(10), allowNull: false, defaultValue: 'second'}
})