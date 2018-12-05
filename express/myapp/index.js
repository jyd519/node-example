const express = require('express');
const app = express();

var responsePatchCount = 0;
var nok = 0;
var nerr = 0;
function patchLimit(req, res, next) {
  if (responsePatchCount > 5) {
    nerr++;
    return res.status(429).send('Too many requests');
  }

  ++responsePatchCount;
  nok++;
  console.log('BEFOR: Hello World!');
  next();
}

app.get('/', patchLimit, (req, res) => {
  setTimeout(() => {
    res.send('Hello World!');
    console.log('helloworld');
  }, 1000);
});

app.use('/', (req, res, next) => {
  console.log('patched');
  --responsePatchCount;
});

app.get('/stat', (req, res) => {
    res.send({nok, nerr, responsePatchCount});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
