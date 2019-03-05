const logger = require('log4js').getLogger('nspider');
const LocalMq = require('./local');

module.exports = {
    current_mq: null,
    init: (config) => {
        const type = config.mq.type || 'local';
        logger.info('init mq:%s', type);
        if (type === 'local') {
            this.current_mq = new LocalMq();
            return this.current_mq.init();
        }
        return Promise.reject(new Error('unknown mq type:' + type));
    },

    getMq: () => {
        return this.current_mq;
    }
}