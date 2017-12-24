const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  // SQLite only
  storage: './database.sqlite'
});

exports.sequelize = sequelize;
