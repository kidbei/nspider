const vm = require('vm');
const util = require('util');

const contextObj = {
  out: (message) => {
    console.log(message);
  },
  craw: (url,options) => {
    console.log('craw,url:%s,options:%s', url, JSON.stringify(options));
  }
}
const context = vm.createContext(contextObj);

const text = `
  this.start = (url) => {
    this.craw(url, {headers:{"a":"aa"}})
  };
`;


const script = new vm.Script(text);
script.runInContext(context);
context.start('http://www.baidu.com');
 