const User = require('./user.js');

// force: true will drop the table if it already exists
// Run node sync.js first
  console.log('User.update');
User.sync({force: false}).then(() => {

  User.update({
      lastName: 'User.update: lastName'
    }, {
      where: {
        firstName: 'foo'
      },
      // hooks: false
    })
    .then(() => {
      console.log('findOne');
      return User.findOne({
          where: {
            firstName: 'foo'
          }
        })
        .then(u => {
          console.log(u.toJSON());
          console.log('u.save: hooks false');
          u.lastName = 'xxxxx';
          return u.save({hooks: false});
        })
        .then((u) => {
          console.log(u.toJSON());
          // u.lastName = 'yyyyy';
          console.log('u.save');
          return u.update({'lastName': 'yyxxx'}, {hooks: false});
        })
        .then( u => {
          console.log(u.toJSON());
        });


    }).then(() => {
      User.findAll({
        raw:true
      }).then(users => {
        console.log(users);
      });
    });

});
