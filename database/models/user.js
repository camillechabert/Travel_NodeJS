'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    apiToken: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      max: 20,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        max: 30,
        notEmpty: true,
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // No associations for now
      }
    }
  });
  return User;
};