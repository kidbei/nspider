const Fetcher = require('../fetcher');
const config = require('../config.json');

const fetcher = new Fetcher(config);

// fetcher.start()
//   .then(() => {
//     return fetcher.fetch('http://www.baidu.com', 'html', {})
//   })
//   .then((response) => {
//     console.log('response title:', response.doc('title').text());
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error('fetch error', error);
//     process.exit(1);
//   })


fetcher.start()
  .then(() => {
    return fetcher.fetch('http://www.baidu.com', 'js', {})
  })
  .then((response) => {
    console.log('response title:', response.doc('title').text());
    return fetcher.destroy();
  })
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('fetch error', error);
    process.exit(1);
  })
