const Sequelize = require('sequelize');

const db = require('./db');
const sequelize = db.sequelize;

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  local_version: {
    type:Sequelize.INTEGER
  },
  updated_at: {
    type: Sequelize.INTEGER
  },
}, {
  updatedAt: 'updated_at',
  version:'local_version',
  hooks: {
    beforeCreate: function(user, options, fn) {
      console.log('beforeCreate');
      // user.firstName = "BC: " + u.firstName;
    },
    beforeBulkCreate: function(users, options, fn) {
      console.log('beforeBulkCreate');
      /*
       * users.forEach((u) => {
       *   u.firstName = "BBC: " + u.firstName;
       * });
       */
    },
    afterUpdate: function() {
      console.log('afterUpdate');
    },
    beforeUpdate: function(user, options, fn) {
      console.log('beforeUpdate');
      // user.firstName = "BU: " + user.firstName;
      // var names = user._fullName.split('-');
      // user.firstName = names[0];
      // user.lastName = names[1];
    },
    afterFind: function(result) {
      console.log('afterFind:', typeof(result));
      if (!result) {
        return;
      }
      if (result.constructor === Array) {
        var arrayLength = result.length;
        for (var i = 0; i < arrayLength; i++) {
          result[i].logo = "works";
        }
      } else {
        result._fullName = result.firstName + '-' + result.lastName;
        result.logo = "works";
      }
      return result;
    }
  },
  getterMethods: {
    fullName: function() {
      return this.firstName + '-' + this.lastName
    }
  },

  setterMethods: {
    fullName: function(value) {
      this._fullName = value;
    },
  }
});
module.exports = User;

