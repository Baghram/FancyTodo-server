'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    UserId: DataTypes.INTEGER,
    Title: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.belongsToMany(models.User, {
      through: 'ProjectUser'
    })
    // associations can be defined here
  };
  return Project;
};