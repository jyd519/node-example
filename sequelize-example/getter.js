const User = require('./user.js');

User.findById(1).then(u => {
  console.log(u.toJSON());
  u.fullName = 'hello-world';
  return u.save();
}).then(() => {

  console.log('\n\n');
  User.findById(1).then(u => {
    console.log(u.toJSON());
    console.log('\n\n');
    User.findAll({
      raw: false,
      attributes: ['firstName'],
      where: {
        id: 1
      }
    }).then(users => console.log(JSON.stringify(users)));
  });

});

