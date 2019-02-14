const Nspider = require('../');

const text = `
  this.start = async (url) => {
    this._crawl(url, {callback: 'index_page', fetch_type: 'html',charset:'GBK'});
    return {_result: false}
  }

  this.index_page = async (result) => {
    const _this = this;
    result.doc('.p_in').find('li a').each((i, el) => {
      const url = result.doc(el).attr('href');
      _this._crawl(url, {callback: 'index_page', fetch_type: 'html',charset:'GBK'});
    });
    result.doc('#resultList').find('.t2').each((i,el) => {
      const href = result.doc(el).find('a').attr('href');
      _this._crawl(href, {callback: 'detail',charset:'GBK'})
    });
    return {_result: false}
  }

  this.detail = (response) => {
    const name = response.doc('title').text();
    return {_result:true, name: name};
  }
`;

const Utils = require('../utils');

const test = async () => {
  const startUrl = 'https://search.51job.com/list/000000,000000,0000,00,9,99,%2520,2,1.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=';
  const nspider = new Nspider();
  await nspider.start();
  const Project = require('../model/Project');
  await Project.create({name: 'zhaopin-company', script: text, status: Utils.constant.STATUS.PROJECT_DEV, rateNumber:1, rateUnit: 'second', startUrl: startUrl});
  const scheduler = nspider.getModule('scheduler');
  await scheduler.startProject(1, startUrl);
}

setTimeout(() => {
    test();
}, 1000 * 2);


// console.log(JSON.stringify(require('merge')(require('../config.json'), require('../config_c.json'))));


