const cheerio = require('cheerio');
const merge = require('merge');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('fetcher');
const createPhantomPool = require('phantom-pool');

module.exports = function() {

  this.pool = createPhantomPool({
    max: 10, // default
    min: 2, // default
    // how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: 30000, // default.
    // maximum number of times an individual resource can be reused before being destroyed; set to 0 to disable
    maxUses: 50, // default
    // function to validate an instance prior to use; see https://github.com/coopernurse/node-pool#createpool
    validator: () => Promise.resolve(true), // defaults to always resolving true
    // validate resource before borrowing; required for `maxUses and `validator`
    testOnBorrow: true, // default
    // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
    phantomArgs: [['--ignore-ssl-errors=true', '--disk-cache=true'], {
      logLevel: 'info',
    }], // arguments passed to phantomjs-node directly, default is `[]`. For all opts, see https://github.com/amir20/phantomjs-node#phantom-object-api
  })

  this.fetch = async (url, options) => {
    return await this.pool.use(async (instance) => {
      try {
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
          if (logger.isDebugEnabled()) {
            logger.debug('phantomjs fetch resource:%s', requestData.url);
          }
        });
      
        const status = await page.open(url);
        if (status !== 'success') {
          logger.info('phantomjs returns:%s', status);
          return Promise.reject(new Error('phantomjs returns:' + status));
        }
        const content = await page.property('content');
        const response = {headers:{}, statusCode: 200, content: content};
        logger.info('phantomjs fetch success, url:%s', url)
        return Promise.resolve(response);
      } catch (error) {
        logger.error('fetch url failed', error);
        return Promise.reject(error);
      } finally {
        await instance.exit();
      }
    })
  }


  this.destroy = async () => {
    return await this.pool.drain().then(() => this.pool.clear());
  }

}
