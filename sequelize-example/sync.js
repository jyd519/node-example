const User = require('./user.js');

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  //
  User.bulkCreate([
    { firstName: 'barfooz' , lastName: 'true'}  ,
    { firstName: 'foo'     , lastName: 'true'}  ,
    { firstName: 'bar'     , lastName: 'false' }
  ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
    console.log('created');
  });
});
