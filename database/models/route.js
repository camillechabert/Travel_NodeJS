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
    },
    marker_description_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'marker_description',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'route',
    classMethods: {
      associate: (models) => {
        Route.belongsTo(models.Users, { foreignKey: 'user_id' });
        Route.belongsTo(models.MarkerDescription, { foreignKey: 'marker_description_id' });
      }
    }
  });

  return Route;
};
