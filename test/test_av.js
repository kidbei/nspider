const Nspider = require('../');

const text = `
  this.start = async (url) => {
    this._crawl(url, {callback: 'index_page', fetch_type: 'html'});
    return {_result: false}
  }

  this.index_page = async (result) => {
    const _this = this;
    result.doc('#content').find('li').each((i,el) => {
      let href = result.doc(el).find('.video-pic').attr('href');
      if (href) {
        href = 'https://www.509zh.com' + href;
        _this._crawl(href, {callback: 'detail'})
      }
    });
    return {_result: false}
  }

  this.detail = (response) => {
    const title = response.doc('.player_title').find('h1').text();
    const url = response.doc('#downlist_1').find('a[title="HTTP下载"]').attr('download');
    return {_result:true, title: title, url: url};
  }
`;

const Utils = require('../utils');

const test = async () => {
  const startUrl = 'https://www.509zh.com/html/17/';
  const nspider = new Nspider();
  await nspider.start();
  const Project = require('../model/Project');
  await Project.create({name: 'test-av', script: text, status: Utils.constant.STATUS.PROJECT_DEV, rateNumber:30, rateUnit: 'minute', startUrl: startUrl});
  const scheduler = nspider.getModule('scheduler');
  await scheduler.startProject(1, startUrl);
}

setTimeout(() => {
    test();
}, 1000 * 2);


// console.log(JSON.stringify(require('merge')(require('../config.json'), require('../config_c.json'))));


