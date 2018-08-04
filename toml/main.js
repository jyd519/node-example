  var fs = require('fs');
  var toml = require('toml-js');

  fs.readFile('server.toml', function(err, data) {
    var parsed = toml.parse(data);
    console.log(parsed);
  });

