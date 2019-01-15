const request = require('request');
const fs = require('fs');

const upload_url = 'https://btalkapi.blibee.com/file/v2/upload/img?key=6f7a135f51b1ec62a8f92b38321206fe&name=6f7a135f51b1ec62a8f92b38321206fe.png';
const upload_form = {file: fs.createReadStream('/Users/kidbei/Downloads/test.png')};

const req = request.post({url:upload_url, upload_form});

req.on('response', (response) => {
  let buf = [];
    response.on('data', (chunk) => {
      console.log('eee');
      buf.push(chunk);
    })
    .on('end', () => {
      console.log('response:', buf.length);
    })
})
