const logger = require('log4js').getLogger('processor');
const Promise = require('bluebird');
const Mq = require('../mq');
const utils = require('../utils');
const cheerio = require('cheerio');
const md5Hex = require('md5-hex');
const ScriptRunner = require('./ScriptRunner');

module.exports = function (config) {

    this._project_cache = {};
    this.ProjectModel = null;
    this.TaskModel = null;
    this.stopedProjects = new Set();
    this.scriptRunner = null;

    this.start = async () => {
        try {
            this.ProjectModel = require('../model/Project');
            this.TaskModel = require('../model/Task');
            this.ResultModel = require('../model/Result');
            await Mq.getMq().register(utils.constant.TOPIC_PROCESS, this._on_process);
            await Mq.getMq().register(utils.constant.TOPIC_STOP_PROJECT, this._on_project_stop);
            this.scriptRunner = new ScriptRunner(config.process.fetcher_service || [], logger);
            return await Promise.resolve();
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    this._on_project_stop = async (data) => {
        logger.info('received stop project message:%s', JSON.stringify(data));
        this.stopedProjects.push(data.projectId);
    }

    this._on_process = async (result) => {
        if (!result.method) {
            logger.error('no method found:%s', JSON.stringify(result));
            return;
        }
        if (!result.url) {
            logger.error('no url found:%s', JSON.stringify(result));
            return;
        }
        if (!result.projectId) {
            logger.error('no projectId found:%s', JSON.stringify(result));
            return;
        }
        const taskId = md5Hex(result.method + result.url);
        try {
            logger.info('process data,method:%s,project:%d, taskId:%s', result.method, result.projectId, taskId);

            let project = this._project_cache[result.projectId];
            if (!project) {
                project = await this.ProjectModel.findByPk(result.projectId);
                if (!project) {
                    return await Promise.reject(new Error('project not found:id=' + result.projectId));
                } else {
                    await this._init_and_cache_context(project);
                    this._project_cache[project.id] = project;
                }
            }

            let task = await this.TaskModel.findByPk(taskId);
            if (task) {
                logger.info('task is already exist, url:%s, taskId:%s', result.url, taskId);
            } else {
                task = {
                    id: taskId, projectId: result.projectId, url: result.url,
                    expireTime: result.expireTime || 0, method: result.method,
                    status: utils.constant.STATUS.TASK_RUNNING, context: JSON.stringify(result), track: ''
                };
                await this.TaskModel.create(task);

                const run_result = await this.scriptRunner.runProd(project.context, result.method, result.url, result);
                if (run_result['_result'] === true) {
                    await project.context['on_result'](run_result);
                }
                await this.TaskModel.update({status: utils.constant.STATUS.TASK_DONE}, {where: {id: taskId}});
            }
        } catch (error) {
            await this.TaskModel.update({
                status: utils.constant.STATUS.TASK_ERROR,
                stack: error + ''
            }, {where: {id: taskId}});
            logger.error('process error, data:%s', JSON.stringify(result), error);
        }
    }

    this._init_and_cache_context = async (project) => {
        project.context = await this.scriptRunner.getProdContext(project.id, project.script, project.rateNumber, project.rateUnit);
    }

    this._html_2_document = (html) => {
        return cheerio.load(html);
    }


    this.destroy = async () => {
        logger.info('destroy processor');
        this._project_cache = null;
        this._project_limiter = null;
        this._project_task_queue = null;
        return Promise.resolve();
    }


}
