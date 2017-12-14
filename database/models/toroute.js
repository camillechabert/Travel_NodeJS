'use strict';

module.exports = function (sequelize, Sequelize) {
  const ToRoute = sequelize.define('ToRoute', {
    route_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'route',
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
    timestamps: false,
    underscored: true,
    tableName: 'to_route'
  });

  ToRoute.associate = function (models) {
    ToRoute.belongsTo(models.Route, { foreignKey: 'route_id' });
    ToRoute.belongsTo(models.MarkerDescription, { foreignKey: 'marker_description_id' });
  };

  return ToRoute;
};
