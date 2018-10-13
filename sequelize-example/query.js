const User = require('./user.js');

User.findAll({raw: true}).then(users => {
  console.log(users)
})

User.findAll( {raw: true, attributes: [['firstName', 'fn']]}).then( users => {
  console.log(users);
});



User.max('local_version', {where : {local_version: 20}}).then( users => {
  console.log('max local_version: ', !!users);
});



