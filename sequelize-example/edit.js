const User = require('./user.js');

// force: true will drop the table if it already exists
// Run node sync.js first
  console.log('User.update');
  User.update({
      lastName: 'lastName ---'
    }, {
      where: {
        firstName: 'BBC: foo'
      }
    })
    .then(() => {

      return User.findOne({
          where: {
            firstName: 'BBC: foo'
          }
        })
        .then(u => {
          console.log('u.save');
          u.lastName = 'xxxxx';
          return u.save();
        })
        .then((u) => {
          console.log(u);
        });


    }).then(() => {

      User.findAll({
        raw: false
      }).then(users => {
        console.log(users);
      });

    });

