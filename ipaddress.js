const os = require('os');

const ifaces = os.networkInterfaces();
const address = [];
Object.keys(ifaces).forEach( function (name) {
  ifaces[name].forEach(function(iface) {
    if (iface.family !== 'IPv4' || iface.internal) {
      return;
    }
    address.push(iface.address);
  });
});


console.log(address);
