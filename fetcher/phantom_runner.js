const webPage = require('webpage');
var args = require('system').args;
const merge = require('merge');

phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;


var page = webPage.create();

const url = args[1];
const options = args[2] ? JSON.parse(args[2]) : {};

const default_settings = {
    javascriptEnabled: true,
    loadImages: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
};
page.settings = merge(default_settings, options);

page.open(url, function (status) {
    if (status !== 'success') {
        console.log("Adidas UK is loading for long");
    } else {
        console.log(status)
    }
});
