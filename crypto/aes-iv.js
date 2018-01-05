
const crypto = require('crypto');

function encrypt(text, password) {
  const IV = Buffer.from(crypto.randomBytes(16));
  const key = crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256');
  const encryptor = crypto.createCipheriv('AES-256-CBC', key, IV);
  encryptor.setEncoding('base64');
  encryptor.write(text);
  encryptor.end();

  const cipher_text = encryptor.read();
  const hmac = crypto.createHmac('SHA1', '111');
  hmac.update(cipher_text);
  hmac.update(IV.toString('base64')); // ensure that both the IV and the cipher-text is protected by the HMAC

  // The IV isn't a secret so it can be stored along side everything else
  return cipher_text + "$" + IV.toString('base64') + "$" + hmac.digest('base64')
}

console.log(encrypt('hello', '123'));
console.log(encrypt('hellohellohellohellohellohellohellohellohellohellohello', '123'));
