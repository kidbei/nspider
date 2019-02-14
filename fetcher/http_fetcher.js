const request = require('request');
const cheerio = require('cheerio');
const merge = require('merge');
const Promise = require('bluebird');
const logger = require('log4js').getLogger('fetcher');



const default_http_options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
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
    const headers = merge(default_http_options.headers, options.headers);
    return new Promise((resolve, reject) => {
      request({url: url, headers: headers, encoding: null}, (error, response, body) => {
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
            const nspider_response = {headers: response.headers, statusCode: response.statusCode, content: body.toString('base64')};
            resolve(nspider_response);
          }
        }
      })
    })
  }

  this.destroy = () => {

  }


  


}
