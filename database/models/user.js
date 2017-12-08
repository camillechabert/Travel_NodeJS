'use strict';

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    apiToken: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      max: 20,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        max: 30,
        notEmpty: true
      }
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'users',
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, { foreignKey: 'user_id' });
        User.hasMany(models.ToNote, { foreignKey: 'user_id' });
        User.hasMany(models.Route, { foreignKey: 'user_id' });
      }
    }
  });
  return User;
};
