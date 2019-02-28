const Nspider = require('../');

const text = `
  this.start = async (url) => {
    this._crawl(url, {callback: 'index_page', fetch_type: 'js'});
    return {_result: false}
  }

  this.index_page = async (result) => {
    const _this = this;
    result.doc('#projectNewsList').find('.news-item').each((i,el) => {
      const href = result.doc(el).find('.header a').attr('href');
      _this._crawl(href, {callback: 'detail'})
    });
    return {_result: false}a
  }

  this.detail = (response) => {
    const title = response.doc('.article-detail').find('.header').text();
    const content = response.doc('.article-detail').find('#articleContent').html();
    return {_result:true, title: title};
  }
`;

const Utils = require('../utils');

const test = async () => {
  const startUrl = 'https://www.oschina.net/news/project';
  const nspider = new Nspider();
  await nspider.start();
  const Project = require('../model/Project');
  await Project.create({name: 'test-project', script: text, status: Utils.constant.STATUS.PROJECT_DEV, rateNumber:1, rateUnit: 'second', startUrl: startUrl});
  const scheduler = nspider.getModule('scheduler');
  await scheduler.startProject(1, startUrl);
}

setTimeout(() => {
    test();
}, 1000 * 2);


// console.log(JSON.stringify(require('merge')(require('../config.json'), require('../config_c.json'))));


