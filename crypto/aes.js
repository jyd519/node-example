var crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8')
var text = "123|123123123123123";
console.log(text);
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex')
var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8')
var dec = decipher.update(crypted,'hex','utf8')
dec += decipher.final('utf8')

console.log(dec);
