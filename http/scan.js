const http = require('http');
const url = require('url');

for( let i =1; i<255; i++) {
  scan('172.16.21.'+i + ':3001', (err, r) => {
    if (err) {
      console.log('error', i, err.code);
      return;
    }
    console.log(">>>>", i, r);
  });
}

function scan(ip, callback) {
  const tok = ip.split(':');
  let host, port;
  if (tok.length > 1) {
    host = tok[0];
    port = tok[1];
  } else {
    host = ip;
    port = 80
  }
  const opt= {
    hostname: host,
    port: port,
    path: '/info'
  };
  const req = http.request(opt, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      callback(error, nil);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let data = '';

    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
      callback(null, data);
    });

  });

  req.on('socket', function (socket) {
    socket.setTimeout(3000);
    socket.on('timeout', function() {
      req.abort();
    });
  });

  req.on("error", (err) => {
    callback(err, null);
  });

  req.end();
}

