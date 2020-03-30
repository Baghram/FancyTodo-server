'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['Email'], {
      type: 'unique',
      name: 'Email_Constraint_Unique'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'Email_Constraint_Unique')
  }
};
