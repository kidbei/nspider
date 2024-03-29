const log4js = require('log4js');
const merge = require('merge');
const Model = require('./model');
const args = process.argv;
const start_mudule = args.length >= 3 ? args[2] : 'all';
const config = get_config();
const Mq = require('./mq');

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

log4js.configure(_log_options);

const logger = log4js.getLogger('nspider');

const modules = {
  fetcher: require('./fetcher'),
  process: require('./process'),
  scheduler: require('./scheduler'),
  webui: require('./webui'),
};

const module_instances = {};

Model.init(config);

Mq.init(config);

if (start_mudule != 'all') {
  const _start_module = modules[start_mudule];
  if (!_start_module) {
    console.error('module %s not found', start_mudule);
    process.exit();
  } else {
    logger.info('to start module:%s', start_mudule);
    _do_start_module(_start_module);
  }
} else {
  for (module_name in modules) {
    const _module = modules[module_name];
    logger.info('to start module:%s', module_name);
    _do_start_module(module_name, _module);
  }
}


function _get_config_path() {
  for (let i = 0; i < args.length; i ++) {
    const _arg = args[i];
    if (_arg === '-c') {
      const _arg_value = args[i + 1];
      return _arg_value;
    }
  }
  return null;
}


function get_config() {
  const _custom_config_path = _get_config_path();
  const _config = _custom_config_path ? merge(require('./config.json'),require(_custom_config_path)) : require('./config.json');
  return _config;
}

function _do_start_module(ModuleName, Module) {
  const module = new Module(config);
  module.start()
  .then(() => {
    console.log('xxxx:', ModuleName);
    module_instances[ModuleName] = module;
    return Promise.resolve();
  })
  .catch((error)=>{
    logger.error('start module failed,%s', Module, error);
    process.exit(2);
  });
}

