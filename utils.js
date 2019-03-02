const hostname = require('hostname');
const internalIp = require('internal-ip');

module.exports = {
  constant: {
    TOPIC_PROCESS: 'process',
    TOPIC_SCHEDULE: 'schedule',
    TOPIC_STOP_PROJECT: 'stopProject',
    STATUS: {
      PROJECT_DEV: 'dev',
      PROJECT_START: 'start',
      PROJECT_STOP: 'stop',
      TASK_RUNNING: 'running',
      TASK_ERROR: 'error',
      TASK_DONE: 'done'
    }
  },


  getLocalIp: () => {
    return internalIp.v4.sync();
  },

  getLocalHostName: () => {
    return hostname();
  }
}
