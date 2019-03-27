const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
  // init cluster
  require('os').cpus().forEach(() => {
    cluster.fork();
  });


  // add eventlisteners
  Object.values(cluster.workers).forEach(worker => {
    worker.on('message', message => {
      console.log(message);
    });
  });

} else {
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    process.send('Hi');
  }).listen(8000);
}

