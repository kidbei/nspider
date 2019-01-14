const log4js = require('log4js');
const args = process.argv;
const start_mudule = args.length >= 3 ? args[2] : 'all';

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
  processor: require('./processor'),
  scheduler: require('./scheduler'),
  webui: require('./webui'),
  task: require('./task')
};


if (start_mudule != 'all') {
  const _start_module = modules[start_mudule];
  if (!_start_module) {
    console.error('module %s not found', start_mudule);
    process.exit();
  } else {
    logger.debug('to start module:%s', start_mudule);
    _do_start_module(_start_module);
  }
} else {
  for (_module_name in modules) {
    const _module = modules[_module_name];
    logger.debug('to start module:%s', _module_name);
    _do_start_module(_module);
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
  const _config = _custom_config_path ? require(_custom_config_path) : require('./config.json');
  return _config;
}

function _do_start_module(Module) {
  const _config = get_config();
  new Module(_config).start();
}

