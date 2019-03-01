const cheerio = require('cheerio');
const merge = require('merge');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('fetcher');
const createPhantomPool = require('phantom-pool');

module.exports = function() {

  this.pool = createPhantomPool({
    max: 10, // default
    min: 2, // default
    idleTimeoutMillis: 30000, // default.
    maxUses: 50, // default
    validator: () => Promise.resolve(true), // defaults to always resolving true
    testOnBorrow: true, // default
    phantomArgs: [['--ignore-ssl-errors=true', '--disk-cache=true'], {
      logLevel: 'info',
    }],
  })

  this.fetch = async (url, options) => {
    return await this.pool.use(async (instance) => {
      try {
        const page = await instance.createPage();
        const status = await page.open(url, options);
        if (status !== 'success') {
          logger.info('phantomjs returns:%s', status);
          return Promise.reject(new Error('phantomjs returns:' + status));
        }
        const content = await page.property('content');
        const response = {headers:{}, statusCode: 200, content: Buffer.from(content).toString('base64')};
        logger.info('phantomjs fetch success, url:%s', url)
        return Promise.resolve(response);
      } catch (error) {
        logger.error('fetch url failed', error);
        return Promise.reject(error);
      } 
    })
  }


  this.destroy = async () => {
    return await this.pool.drain().then(() => this.pool.clear());
  }

}
