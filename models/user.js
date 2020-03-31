'use strict';
const encrypt = require('../helper/encrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Email: {
      type:  DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please Fill Email'
      },
      validation: {
        unique: {
          args: true,
          msg: "Email Already Used!!"
        },
        notEmpty: {
          args: true,
          msg: 'Please Fill Email'
        },
        isEmail: {
          args: true,
          msg: "Please Fill in Email Format"
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please Fill Password'
      },
      validation: {
        len: {
          args: [3],
          msg: 'Must Have At Least 3 Characters'
        },
        notEmpty: {
          args: true,
          msg: 'Please Fill Password'
        },
        notNull: {
          args: true,
          msg: 'Please Fill Password'
        },
        
      }
    } 
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.Password = encrypt(user.Password)
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Project, {through: 'ProjectUser'})
    // associations can be defined here
  };
  return User;
};