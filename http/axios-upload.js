const axios = require('axios');
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
  url: URL,
  method: 'POST',
  headers : {
    'Content-Type': 'application/octect-stream',
    'Content-Length': size,
  },
  data: stream,
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
    console.log('onUploadProgress:', progressEvent);
  },
  auth: {
    username: 'ata',
    password: 'ata123'
  }
};

axios(options, options)
  .then(function (response) {
    console.log( response.status, response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
