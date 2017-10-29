'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    apiToken: DataTypes.STRING,
    login: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        email: true,
        max: 30,
        notEmpty: true,
        notNull: true
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