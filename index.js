const log4js = require('log4js');
const merge = require('merge');
const Model = require('./model');
const args = process.argv;
const start_mudule = args.length >= 3 ? args[2] : 'all';
const Mq = require('./mq');
const utils = require('./utils');

const _log_options = {
    appenders: {
      nspider: {type: 'console'},
      fetcher: {type: 'console'},
      processor: {type: 'console'},
      scheduler: {type: 'console'},
      webui: {type: 'console'},
      task: {type: 'console'}
    },
    categories: {default: {appenders: ['nspider'], level: 'debug'}}
};

const modules = {
    fetcher: require('./fetcher'),
    process: require('./process'),
    scheduler: require('./scheduler'),
    webui: require('./webui'),
};

log4js.configure(_log_options);

const logger = log4js.getLogger('nspider');

module.exports = function () {
    
    this.module_instances = {};
    this.config = {};
    this.ModuleModel = null;
    this.module_heartbeat_timer;
    this.localIp = utils.getLocalIp();

    this.start = async () => {
        this.config = this._getConfig();
        await Model.init(this.config);
        await Mq.init(this.config);
        this.ModuleModel = require('./model/Module');
        await this._start_modules();
        
        this.module_heartbeat_timer = setInterval(async () => {
            const moduleNames = Object.keys(this.module_instances);
            const now = new Date();
            for (let i = 0; i < moduleNames.length; i ++) {
                const moduleName = moduleNames[i];
                logger.info('heartbeat for module: %s', moduleName);
                await this.ModuleModel.update({updatedAt: now},{where: {name: moduleName, ip: this.localIp}});
            }
        }, 1000 * 60);

        const exitHandler = async () => {
            try{
                for (name in this.module_instances) {
                    try{
                        clearInterval(this.module_heartbeat_timer);
                        let module = this.module_instances[name];
                        await module.destroy();
                    } catch(error){
                        logger.error('destroy module %s error', name, error)
                    }
                }
            } finally {
                process.exit();
            }
        }

        process.on('exit', exitHandler);
        process.on('SIGINT', exitHandler);
        process.on('SIGUSR1', exitHandler);
        process.on('SIGUSR2', exitHandler);
        process.on('uncaughtException', exitHandler);
    } 
    

    this.getModule = (moduleName) => {
        return this.module_instances[moduleName];
    }

    
    this._getConfig = () => {
        const _custom_config_path = this._get_config_path();
        const _config = _custom_config_path ? merge(require('./config.json'),require(_custom_config_path)) : require('./config.json');
        return _config;
    }

    this._get_config_path = () => {
        for (let i = 0; i < args.length; i ++) {
            const _arg = args[i];
            if (_arg === '-c') {
              const _arg_value = args[i + 1];
              return _arg_value;
            }
          }
          return null;
    }

    this._start_modules = async () => {
        if (start_mudule != 'all') {
            const _start_module = modules[start_mudule];
            if (!_start_module) {
              console.error('module %s not found', start_mudule);
              process.exit();
            } else {
              logger.info('to start module:%s', start_mudule);
              await this._do_start_module(start_mudule, _start_module);
            }
          } else {
            for (_module_name in modules) {
              const _module = modules[_module_name];
              logger.info('to start module:%s', _module_name);
              await this._do_start_module(_module_name, _module);
            }
          }
    }


    this._do_start_module = async (ModuleName, Module) => {
        const module = new Module(this.config);
        await  module.start();
        const db_module = await this.ModuleModel.findOne({where: {name: ModuleName, ip: utils.getLocalIp()}});
        if (db_module) {

        } else {
            await this.ModuleModel.create({name: ModuleName, ip: utils.getLocalIp(), hostName: utils.getLocalHostName()});
        }
        this.module_instances[ModuleName] = module;
    }
}