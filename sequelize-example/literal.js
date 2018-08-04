const User = require('./user.js');
const Sequelize = require('sequelize');

// force: true will drop the table if it already exists
// Run node sync.js first
  console.log('User.update');
  User.update({
      lastName: 'User.update: lastName',
      // 有用
      local_version: Sequelize.literal('local_version + 2')
    }, {
      where: {
        firstName: 'foo'
      },
      // 是否运行hooks
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
          console.log('u.update');
          // 实例update方法等价与: set(values); save(options);
          return u.update( {
              lastName : 'xxxxx',
            //无效: local_version是readonly属性, 不能直接更新;
            //  类似的字段还有: updateAt, sequelize负责更新他们
              local_version : Sequelize.literal('local_version + 1')
          }, { hooks: false, }  //有效
          );
        })
        .then((u) => {
          console.log(u.toJSON());
          u.lastName = 'yyyyy';
          console.log('u.save');
          return u.save({hooks: false}); //支持hooks选项
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
