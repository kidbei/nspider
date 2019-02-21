const vm = require('vm');
const Promise = require('bluebird');
const request = require('request');
const logger = require('log4js').getLogger('webui');
const Rpc = require('node-json-rpc');



/**
 * @augments fetcher_services: [{host:'', port:0}]
 */
module.exports = function(fetcher_services) {

    this._fetcher_clients = [];

    this._init_fetcher_clients();

    this.getDebugContext = async () => {
        const contextObj = {
            result:undefined,
            urls: [],
            currentMethod: undefined,
            nextMethod: undefined,
            nextOptions: {},
            _out: (message) => {
              console.log(message);
            },
            request: request,
            mq: Mq.getMq(),
            _crawl: async (url, options) => {
                const method = options.callback;
                contextObj.nextMethod = method;
                contextObj.nextOptions = options;
                contextObj.urls.push(url);
            }
        };
        return contextObj;
    }

    this.debug = async (scriptText, method, url, params) => {
        try{
            const contextObj = this.getDebugContext();
            contextObj.currentMethod = method;
            const context = vm.createContext(contextObj);
            const script = new vm.Script(scriptText);
            script.runInContext(context);
            let result = contextObj[method](url, params);
            result = await this._resolve_result(result);
            if (result['_result'] === true) {
                contextObj.result = result;
            } else {
                result = {_result: false, urls: contextObj.urls};
            }
            return {error: undefined, result: result};
        } catch(error){
            return {error: error, result: undefined};
        }
    }


    this._resolve_result = async (result) => {
        return new Promise((resolve, reject) => {
            if (!result) {
                resolve();
            } else {
                if (result.construct.name === 'Promise') {
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


    this._init_fetcher_clients = () => {
        for (let i = 0; i < fetcher_services.length; i ++) {
          let host = fetcher_services[i].rpc_host;
          let port = fetcher_services[i].rpc_port;
          let options = {
            port: port,
            host: host,
            path: '/',
            strict: true
          };
          logger.info('init fetcher,host:%s,port:%d', host, port);
          let client = new Rpc.Client(options);
          this._fetcher_clients.push(client);
        }
      }
}