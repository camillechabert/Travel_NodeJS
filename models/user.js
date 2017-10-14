'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lasName: DataTypes.STRING,
    password: DataTypes.STRING,
    apiToken: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // No associations for now
      }
    }
  });
  return User;
};