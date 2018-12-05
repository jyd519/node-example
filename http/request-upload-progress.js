const request = require('request');
const fs = require('fs');

const file = "/Users/jiyongdong/Desktop/1.zip";
let size = fs.lstatSync(file).size;
let bytes = 0;


console.log('file size:', size);

const stream = fs.createReadStream(file);
// stream.on('data', (chunk) => {
//   console.log('file: data: ', bytes += chunk.length, size);
// });

// const URL = 'https://update.joytest.org/updates/1.0.0/file?name=scan.js';
const URL = 'http://127.0.0.1:8101/updates/1.0.0/file?name=scan.js';

var options = {
  url: URL,
  method: 'POST',
  headers : {
    'Content-Type': 'application/octect-stream',
    'Content-Length': size,
  },
  body:  stream,
  auth: {
    'user': 'ata',
    'pass': 'ata123'
  }
};

const req = request(options, function (error, response, body) {
  console.log('finished:', error, response.statusCode, body);

  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

req.on('drain', () => {
  // OK
  console.log('drain:', req.req.connection.bytesWritten, size);
});

req.on('error', function(err) {
  console.log('error', err)
});


