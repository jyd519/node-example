const { execFile, execFileSync, spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const crypto = require('crypto');

function getAntiVirusProducts() {
  const wmic = path.join(process.env.SystemRoot, 'System32', 'wbem', 'WMIC.exe');
  return new Promise( (resolve, reject) => {
    const filename = path.join(os.tmpdir(), 'wmic'+crypto.randomBytes(8).toString('hex'));
    const fd = fs.openSync(filename, 'w');
    const p = spawn(wmic, ['/namespace:\\\\root\\SecurityCenter2', 'path', 'AntiVirusProduct', 'get', '*', '/format:list'], {
      stdio: ['ignore', fd, 'ignore'],
      timeout: 10000,
    });

    p.on('error', (err) => { 
      fs.closeSync(fd);
      fs.unlinkSync(filename);
      reject(err); 
    });

    p.on('close', (code) => {
      if (code !== 0) {
        const err = new Error('failed to run wmic');
        err.code = code;
        fs.closeSync(fd);
        fs.unlinkSync(filename);
        return reject(err);
      }

      fs.closeSync(fd);
      const output = fs.readFileSync(filename, 'utf16le');
      fs.unlink(filename, err => {});
      let value = null; 
      const values = [];
      for (let item of output.split('\r\n')) {
        item = item.trim();
        if (!value) {
          if (item.length === 0) {
            continue;
          }
          value = {}
        }
        
        if (item.length === 0) {
          values.push(value);
          value = null;
        } else {
          const toks = item.split('=', 2)
          value[toks[0]] = toks[1];
        }
      }
      resolve(values);
    });
  });
}

 getAntiVirusProducts().then(r => {
   console.log('then', r);
 }).catch(err => {
   console.error('error', err)
 });
