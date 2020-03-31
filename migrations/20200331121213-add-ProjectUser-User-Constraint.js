'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProjectUsers', ['UserId'], {
      type: 'foreign key',
      name: 'User-Constraint-FK',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProjectUsers', 'User-Constraint-FK')

  }
};
