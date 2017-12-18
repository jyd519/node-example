var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('server.pem');
var key = pem.toString('ascii');
console.log(key);
var hmac = crypto.createHmac('sha1', key);

hmac.update('foo');
console.log(hmac.digest('hex'));
//'7b058f2f33ca28da3ff3c6506c978825718c7d42'

