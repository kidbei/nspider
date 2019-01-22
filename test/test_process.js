const nspider = require('../');



const text = `
  this.start = async (url) => {
    _crawl(url, {callback: index_page})
  }

  this.index_page = async (result) => {
    console.log('result:' + JSON.stringify(result))
  }
`;



// console.log(JSON.stringify(require('merge')(require('../config.json'), require('../config_c.json'))));


