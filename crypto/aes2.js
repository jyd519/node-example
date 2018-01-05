const crypto = require('crypto');

// 加密
function encrypt(text, password) {
  const iv = Buffer.from(crypto.randomBytes(16));
  const key = crypto.pbkdf2Sync(password, iv, 10000, 32, 'sha256');
  const encryptor = crypto.createCipheriv('AES-256-CBC', key, iv);
  let cipher = encryptor.update(text, 'utf8', 'base64');
  cipher +=  encryptor.final('base64');
  return cipher + "$" + iv.toString('base64')
}

// 解密
function decrypt(blob, password) {
  const [cipher_text, ivs] = blob.split('$');
  const iv = Buffer.from(ivs, 'base64');
  const key = crypto.pbkdf2Sync(password, iv, 10000, 32, 'sha256');
  const encryptor = crypto.createDecipheriv('AES-256-CBC', key, iv);
  let plain = encryptor.update(cipher_text, 'base64', 'utf8');
  plain += encryptor.final('utf8');
  return plain;
}

const cipher = encrypt('1234567890', '123');
console.log(cipher);
console.log(decrypt(cipher, '123'));
