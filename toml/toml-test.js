  var fs = require('fs');
  var toml = require('toml');

  fs.readFile('server.toml', function(err, data) {
    var parsed = toml.parse(data);
    console.log(parsed);
  });

