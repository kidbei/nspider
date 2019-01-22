
const Promise = require('bluebird');


const test = async function() {
  return await Promise.resolve('hello');
}


const out = async function () {
  const result = await test();
  console.log(result)
}

out();