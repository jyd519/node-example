var toml = require('toml-js');
var stringData = toml.dump({owner: {name: "Tom Preston-Werner", organization: "GitHub"}});
console.log(stringData);
