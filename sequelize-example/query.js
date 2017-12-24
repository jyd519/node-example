const User = require('./user.js');

User.findAll({raw: true}).then(users => {
  console.log(users)
})
