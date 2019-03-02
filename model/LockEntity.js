const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('lock_entity');
const Sequelize = require('sequelize');


module.exports = sequelize.define('lock_entity', {
    id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    key: {type: Sequelize.STRING(32), allowNull: false},
    value: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
})