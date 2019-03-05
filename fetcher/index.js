const logger = require('log4js').getLogger('fetcher');
const Promise = require('bluebird');
const HttpFetcher = require('./http_fetcher');
const PhantomFetcher = require('./phantomjs_fetcher');
const jayson = require('jayson');

module.exports = function (config) {
    this.rpcServer = null;
    this.fetchers = {};

    this.start = async function () {
        try {
            logger.info('start fetcher');
            this.fetchers['html'] = new HttpFetcher();
            this.fetchers['js'] = new PhantomFetcher();
            const rpc_config = config.fetcher || {};
            await this._start_rpc(rpc_config);
            return await Promise.resolve();
        } catch (error) {
            logger.error('init fetcher failed', error);
            return await Promise.reject(error);
        }
    }

    this.destroy = async () => {
        logger.info('destroy fetcher');
        await this.fetchers['html'].destroy();
        await this.fetchers['js'].destroy();
        return Promise.resolve();
    }

    this.fetch = async (url, fetch_type, options) => {
        const fetcher = this.fetchers[fetch_type];
        if (!fetcher) {
            logger.error('unknown fetch type:%s', fetch_type);
            return await Promise.reject(new Error('unknown fetch type:' + fetch_type));
        }
        return await fetcher.fetch(url, options);
    }

    this._start_rpc = async (rpc_config) => {
        const _this = this;
        this.rpcServer = jayson.server({
            fetch: async function (args, callback) {
                const params = args[0];
                try {
                    const fetch_result = await _this.fetch(params['url'], params['fetch_type'], params['options']);
                    callback(null, fetch_result);
                } catch (error) {
                    callback(error);
                }
            }
        });
        const rpc_host = rpc_config.rpc_host || '127.0.0.1';
        const rpc_port = rpc_config.rpc_port || 9980;

        this.rpcServer.tcp().listen(rpc_port, rpc_host);
    }
}