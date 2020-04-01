'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    Title: DataTypes.STRING,
    Content: DataTypes.STRING,
    DueDate: {
      type:DataTypes.DATE,
      validate: {
        customValidator(value) {
          if(value < Date.now()) {
            throw new Error("Due Date Cannot Less Than Today")
          }
        }
      }
    } ,
    Status: DataTypes.BOOLEAN,
    ProjectId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    Todo.belongsTo(models.Project)
    // associations can be defined here
  };
  return Todo;
};