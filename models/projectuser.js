'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {});
  ProjectUser.associate = function(models) {
    ProjectUser.belongsTo(models.User)
    ProjectUser.belongsTo(models.Project)
    // associations can be defined here
  };
  return ProjectUser;
};