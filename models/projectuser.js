'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {});
  ProjectUser.associate = function(models) {
    // associations can be defined here
  };
  return ProjectUser;
};