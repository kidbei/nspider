const vm = require('vm');
const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const Mq = require('../mq');
const jayson = require('jayson');
const utils = require('../utils');

/**
 * @augments fetcher_services: [{host:'', port:0}]
 */
module.exports = function(fetcher_services, logger) {

    this._fetcher_clients = [];
    this._project_ctx_cache = {};
    this.default_on_result = async (result) => {
      logger.info('on result:%s', JSON.stringify(result));
    }

    this.getDebugContext = async (scriptText) => {
        const contextObj = {
            result:undefined,
            nextResults: [],
            currentMethod: undefined,
            _out: (message) => {
              console.log(message);
            },
            request: request,
            _crawl: async (url, options) => {
                const method = options.callback;
                contextObj.nextResults.push({url: url, method: method, params: options});
            }
        };
        const context = vm.createContext(contextObj);
        const script = new vm.Script(scriptText);
        script.runInContext(context);
        return contextObj;
    }


    this.getProdContext = async (projectId, scriptText, rateNumber, rateUnit) => {
        let ctx = this._project_ctx_cache[projectId];
        if (ctx) {
            return ctx;
        }
        const contextObj = {
            request: request,
            mq: Mq.getMq(),
            _crawl: async (url, options) => {
              const runParams = {method: options.callback, url: url, projectId: projectId, 
                charset: options.charset, proxy: options.proxy || undefined, expireTime: options.expireTime,
                attrs: options.attrs || {},fetch_type: options.fetch_type || 'html',headers:options.headers || {},
                projectId: projectId, rateNumber: rateNumber, rateUnit: rateUnit
              };
              contextObj.mq.produce(utils.constant.TOPIC_SCHEDULE, runParams);
            }
          };
        ctx = vm.createContext(contextObj);
        const script = new vm.Script(scriptText);
        script.runInContext(ctx);
        if (!contextObj['on_result']) {
          contextObj.on_result = this.default_on_result;
        }
        this._project_ctx_cache[projectId] = contextObj;
        return contextObj;
    }



    this.debug = async (scriptText, method, url, params) => {
        try{
            const contextObj = await this.getDebugContext(scriptText);
            contextObj.currentMethod = method;
            let result;
            if (method === 'start') {
                result = contextObj[method](url);
            } else {
                const response = await this._fetch(url, params.fetch_type || 'html', params);
                if (params.charset) {
                    response.content = iconv.decode(Buffer.from(response.content, 'base64'), params.charset);
                } else {
                  response.content = Buffer.from(response.content, 'base64').toString();
                }
                response.doc = (exp) => {return this._html_2_document(response.content)(exp)};
                response.text = response.content;
                result = contextObj[method](response);
            }
            result = await this._resolve_result(result);
            if (result['_result'] === true) {
                contextObj.result = result;
            } else {
                result = {_result: false, nextResults: contextObj.nextResults};
            }
            return {error: undefined, result: result};
        } catch(error){
            logger.error('debug error', error)
            return {error: error, result: undefined};
        }
    }

    
    this.runProd = async (contextObj, method, url, params) => {
      let result;
      if (method === 'start') {
        result = contextObj[method](url);
      } else {
        const response = await this._fetch(url, params.fetch_type, params);
        if (params.charset) {
            response.content = iconv.decode(Buffer.from(response.content), params.charset);
        }
        response.doc = (exp) => {return this._html_2_document(response.content)(exp)};
        response.text = response.content;
        result = contextObj[method](response);
      }
      result = await this._resolve_result(result);
      return result;
    }



    this._html_2_document = (html) => {
        return cheerio.load(html);
    }


    this._fetch = async (url, fetch_type, options) => {
        const fetcher = this.select_fetcher_client();
        options.url = url;
        return new Promise((resolve, reject) => {
          fetcher.request('fetch', [{url: url, fetch_type: fetch_type, options: options}], function(err, response) {
            if(err) {
              reject(err);
            } else if (response.error) {
              reject(response.error);
            } else {
              resolve(response.result);
            }
          });
        })
      }

    this._resolve_result = async (result) => {
        return new Promise((resolve, reject) => {
            if (!result) {
                resolve();
            } else {
                if (result.constructor.name === 'Promise') {
                    result
                        .then((pResult) => {
                            resolve(pResult);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                } else {
                    resolve(result);
                }
            }
        });
    }


    this.select_fetcher_client = () => {
        const idx = Math.floor(Math.random() * this._fetcher_clients.length);
        return this._fetcher_clients[idx];
      }


    (this._init_fetcher_clients = () => {
        for (let i = 0; i < fetcher_services.length; i ++) {
          let host = fetcher_services[i].rpc_host;
          let port = fetcher_services[i].rpc_port;
          logger.info('init fetcher,host:%s,port:%d', host, port);
          let client = jayson.client.tcp({host: host, port: port});
          this._fetcher_clients.push(client);
        }
      })();
}