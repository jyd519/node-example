const User = require('./user.js');

User.findAll({raw: true}).then(users => {
  console.log(users)
})

User.findAll( {raw: false, attributes: [['firstName', 'fn']]}).then( users => {
  console.log(users);
});



