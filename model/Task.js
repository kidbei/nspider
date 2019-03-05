const ModelTool = require('./model_init');
const sequelize = ModelTool.getModelSequelize('task');
const Sequelize = require('sequelize');


module.exports = task = sequelize.define('task', {
    id: {type: Sequelize.STRING(32), primaryKey: true, allowNull: false},
    projectId: {type: Sequelize.BIGINT, allowNull: false},
    url: {type: Sequelize.STRING(200), allowNull: false},
    method: {type: Sequelize.STRING(20), allowNull: false},
    status: {type: Sequelize.STRING(10), allowNull: false},
    context: {type: Sequelize.TEXT, allowNull: false},
    stack: {type: Sequelize.TEXT},
    expireTime: {type: Sequelize.BIGINT, allowNull: false, defaultValue: 0}
})