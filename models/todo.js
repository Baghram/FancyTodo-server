'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    Title: DataTypes.STRING,
    Content: DataTypes.STRING,
    DueDate: DataTypes.DATE,
    Status: DataTypes.BOOLEAN,
    ProjectId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};