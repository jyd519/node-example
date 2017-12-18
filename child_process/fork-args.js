const fs   = require('fs'),
  path = require('path'),
  fork = require('child_process').fork;

let cwd  = path.join(__dirname, '.');
let script = './1.js';

// fork用于运行node js脚本
//    fork使用process.execPath运行js
//    fork忽略shell选项
// fork支持父子进程间ipc通讯
var child = fork(script, ['-arg1', '-arg2'], {
  cwd : cwd
});

// 给子进程发送消息
child.send('hello, parent');

// 接受消息
child.on('message', (m)=>{
  console.log("from child: ", m);
});

child.on('close', (exit_code) => {
  console.log(exit_code);
});

