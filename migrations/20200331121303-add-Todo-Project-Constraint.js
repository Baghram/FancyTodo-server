'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Todos', ['ProjectId'], {
      type: 'foreign key',
      name: 'Todos-Constraint-FK',
      references: { //Required field
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProjectUsers', 'Todos-Constraint-FK')

  }
};
