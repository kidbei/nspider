
const text = `
  start = (self,url) => {
    console.log('start:', url);
  }
`;

const sandbox = {};

const vm = require('vm');
const script = new vm.Script(text);
const context = vm.createContext(sandbox);

script.runInContext(context);

console.log('context:', sandbox);





