const fs = require('fs-extra')

// Async with promises:
fs.copy('./package.json', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Async with callbacks:
fs.copy('./package.json', '/tmp/mynewfile', err => {
  if (err) return console.error(err)
  console.log('success!')
})

// Sync:
try {
  fs.copySync('./package.json', '/tmp/mynewfile')
  fs.removeSync('/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

console.log('readJson ....\n');
fs.readJson('./package.json', (err, packageObj) => {
  if (err) console.error(err)

  console.log(packageObj.version) // => 0.1.3
})

// Promise Usage
fs.readJson('./package.json')
.then(packageObj => {
  console.log(packageObj)
})
.catch(err => {
  console.error(err)
})
