const { exec } = require('child_process');
const { execFile, execFileSync } = require('child_process');

// 使用shell执行: 支持bat，cmd文件
//   Windows下使用process.env.ComSpec
// exec(command[, options][, callback])
exec('ls -lh /usr', (err, stdout, stderr) => {
  console.log('ls -lh /usr');
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

//
// 执行可执行文件
// /

// execFile(file[, args][, options][, callback])
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  console.log('node --version');

  if (error) {
    throw error;
  }
  console.log(stdout);
});

