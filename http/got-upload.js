//NOT WORK!!!
const got = require('got');
const fs = require('fs');

const file = "/Users/jiyongdong/Desktop/1.zip";
let size = fs.lstatSync(file).size;
let bytes = 0;


console.log('file size:', size);

const stream = fs.createReadStream(file);
stream.on('data', (chunk) => {
   console.log('file: data: ', bytes += chunk.length, size);
});

// const URL = 'https://update.joytest.org/updates/1.0.0/file?name=scan.js';
const URL = 'http://127.0.0.1:8101/updates/1.0.0/file?name=scan.js';

var options = {
  // url: URL,
  method: 'POST',
  headers : {
    'Content-Type': 'application/octect-stream',
    'Content-Length': size,
  },
  body: stream,
  stream: true,
  auth: 'ata:ata123'
};

(async () => {
  try {
   const response = await got.post(URL, options)
    .on('uploadProgress', progress => {
      // Report upload progress
      console.log(progress);
    });
    console.log(response);
  } catch (e) {
    console.error(e);
  }
})();
