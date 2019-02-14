const Nspider = require('../');


const test = async () => {
  const nspider = new Nspider();
  await nspider.start();
}

setTimeout(() => {
    test();
}, 1000 * 2);


// console.log(JSON.stringify(require('merge')(require('../config.json'), require('../config_c.json'))));


