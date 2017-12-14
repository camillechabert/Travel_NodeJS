'use strict';

module.exports = function (sequelize, Sequelize) {
  const Route = sequelize.define('Route', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    token: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'route'
  });

  Route.associate = function (models) {
    Route.belongsTo(models.User, { foreignKey: 'user_id' });
    Route.belongsToMany(models.MarkerDescription, { through: models.ToRoute });
  };

  return Route;
};
