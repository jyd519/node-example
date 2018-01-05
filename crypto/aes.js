const crypto = require('crypto');

function encrypt(text, password) {
  const cipher = crypto.createCipher('aes-128-cbc', password)
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(crypted, password) {
  const decipher = crypto.createDecipher('aes-128-cbc', password)
  let dec = decipher.update(crypted, 'base64', 'utf8')
  dec += decipher.final('utf8')
  return dec;
}

const pwd = '123';
const enc = encrypt('hello', pwd);
console.log(enc);
console.log(decrypt(encrypt('hello', pwd), pwd));
