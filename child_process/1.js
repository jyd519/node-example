console.log('CHILD\n', process.argv);

// 接受父进程的消息
process.on('message', (m) => {
  console.log('from parent:', m);

  //因为process.on,进程不会自己结束
  process.exit(0);
});

// 向父进程发送消息
process.send({ foo: 'bar', baz: __filename});
