// openssl genrsa  -out server.pem 1024
// openssl req -key server.pem -new -x509 -out cert.pem
var crypto = require('crypto');
var fs = require('fs');

var privatePem = fs.readFileSync('server.pem');
var publicPem = fs.readFileSync('cert.pem');
var key = privatePem.toString();
var pubkey = publicPem.toString();

var data = "abcdef"

var sign = crypto.createSign('RSA-SHA256');
sign.update(data);


var sig = sign.sign(key, 'hex');

var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
var res = verify.verify(pubkey, sig, 'hex');
console.log(res);
