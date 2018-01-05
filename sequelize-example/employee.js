const db = require('./db');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;

var Employee = sequelize.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get: function() {
      var title = this.getDataValue('title');
      // 'this' allows you to access attributes of the instance
      return this.getDataValue('name') + ' (' + title + ')';
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  }
});
Employee.sync().then(function() {
  Employee
    .create({
      name: 'John Doe',
      title: 'senior engineer'
    })
    .then(function(employee) {
      console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
      console.log(employee.get('title')); // SENIOR ENGINEER
    })
});

