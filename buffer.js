var b1 = Buffer.from([1, 2, 3]);
var b2 = Buffer.from([4, 5, 6]);

// 合并b1,b2为b3
var b3 = Buffer.concat([b1, b2]);
// <Buffer 01 02 03 04 05 06>


