const cp = require('child_process');

// 注意： 同步方法会注释 node 的 event loop
//
// execFileSync(file[, args][, options])
const buf = cp.execFileSync('node', ['--version']);
console.log('execFileSync (buffer): ', buf.toString());

const version = cp.execFileSync('node', ['--version'], {encoding:'utf-8'});
console.log('execFileSync(string):', version);



