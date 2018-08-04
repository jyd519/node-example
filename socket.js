const net = require('net');
const client = net.createConnection({ port: 9001}, () => {
  //'connect' listener
  console.log('connected to server!');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('error', (err) => {
  console.log(err);
  process.exit(0);
});
client.on('end', () => {
  console.log('disconnected from server');
});

setTimeout(() => { process.exit(1); }, 10000);

