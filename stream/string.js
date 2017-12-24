var Readable = require('stream').Readable;

// string stream

function ss(str) {
  var s = new Readable();
  s._read = function noop() {};
  s.push(str);
  s.push(null);
  return s;
}

ss("Hello, I'm a string stream").pipe(process.stdout);
