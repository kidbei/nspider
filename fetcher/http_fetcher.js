const request = require('request');
const cheerio = require('cheerio');
const merge = require('merge');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('fetcher');


const default_http_options = {
  headers: {
    'User-Agent': 'nspider fetcher'
  }
};

module.exports = function() {

  /**
   * options: {}  include headers
   */
  this.fetch = (url, options) => {
    if (logger.isDebugEnabled()) {
      logger.debug('fetch url:%s', url);
    }
    const real_options = merge(default_http_options, options);
    real_options.url = url;
    return new Promise((resolve, reject) => {
      request(real_options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode >= 400) {
            logger.error('fetc url faild,url:%s,reason:http server return code:%d', url, response.statusCode);
            reject(new Error('http code error:' + response.statusCode));
          } else {
            if (logger.isDebugEnabled()) {
              logger.debug('fetch success,url:%s', url);
            }
            const page_doc = this._html_2_document(body);
            const nspider_response = {headers: response.headers, statusCode: response.statusCode};
            nspider_response.doc = page_doc;
            resolve(nspider_response);
          }
        }
      })
    })
  }

  this.destroy = () => {

  }


  this._html_2_document = (html) => {
    return cheerio.load(html);
  }


}
