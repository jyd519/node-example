const Sequelize = require('sequelize');

const db = require('./db');
const sequelize = db.sequelize;

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = User;

