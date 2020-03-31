'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProjectUsers', ['ProjectId'], {
      type: 'foreign key',
      name: 'Project-Constraint-FK',
      references: { //Required field
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProjectUsers', 'Project-Constraint-FK')

  }
};
