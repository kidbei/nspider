const vm = require('vm');
const Promise = require('bluebird');
const request = require('request');
const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const jayson = require('jayson');

/**
 * @augments fetcher_services: [{host:'', port:0}]
 */
module.exports = function(fetcher_services) {

    this._fetcher_clients = [];
    this.requestIdGenerator = 0;

    this.getDebugContext = async () => {
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
        return contextObj;
    }

    this.debug = async (scriptText, method, url, params) => {
        try{
            const contextObj = await this.getDebugContext();
            contextObj.currentMethod = method;
            const context = vm.createContext(contextObj);
            const script = new vm.Script(scriptText);
            script.runInContext(context);
            let result;
            if (method === 'start') {
                result = contextObj[method](url);
            } else {
                const response = await this._fetch(url, params.fetch_type || 'html', params);
                if (params.charset) {
                    response.content = iconv.decode(new Buffer(response.content, 'base64'), params.charset);
                  } else {
                    response.content = new Buffer(response.content, 'base64').toString();
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
          let client = jayson.client.tcp(
            {
              host: host,
              port: port
            }
          );
          this._fetcher_clients.push(client);
        }
      })();
}