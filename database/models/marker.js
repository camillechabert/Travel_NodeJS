'use strict';

module.exports = function (sequelize, Sequelize) {
  const Marker = sequelize.define('Marker', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    distance: {
      type: Sequelize.INTEGER
    },
    longitude: {
      type: Sequelize.DECIMAL
    },
    latitude: {
      type: Sequelize.DECIMAL
    },
    color: {
      type: Sequelize.INTEGER
    },
    time: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'marker',
    classMethods: {
      associate: (models) => {
        Marker.hasOne(models.MarkerDescription, { foreignKey: 'marker_id' });
      }
    }
  });

  return Marker;
};
