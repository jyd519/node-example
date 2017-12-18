const { spawn } = require('child_process');

// spawn是最基础的创建子进程方式，其他exec，fork都是基于spawn实现的。
//
//
const ls = spawn('ls', ['-lh', '/usr']);

// Windows下不能直接spawn .bat, .cmd文件
//const ls = spawn('cmd.exe', ['/c', 'xxx.bat']);
//

ls.stdout.on('data', (data) => {
  console.log(`!!stdout: \n${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`!!stderr: \n${data}`);
});

// 子进程的stdio流被关闭
ls.on('close', (code) => {
  console.log(`!!!child process exited with code ${code}`);
});

// 子进程结束
// Note that when the 'exit' event is triggered, child process stdio streams might still be open.
ls.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});


//------------------------------------------------------------
// spawn error
const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.log('Failed to start subprocess.', err.code);
});
