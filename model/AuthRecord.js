const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('auth_record');
const Sequelize = require('sequelize');


module.exports = sequelize.define('auth_record', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    token: {type: Sequelize.STRING(50), allowNull: false},
    userName: {type: Sequelize.STRING(50), allowNull: false}
})