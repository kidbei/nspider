const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('module');
const Sequelize = require('sequelize');


module.exports = sequelize.define('module', {
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING(100), allowNull: false},
  ip: {type: Sequelize.STRING(20), allowNull: false},
  hostName: {type: Sequelize.STRING(50), allowNull: false}
})