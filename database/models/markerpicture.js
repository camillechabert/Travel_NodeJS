'use strict';

module.exports = function (sequelize, Sequelize) {
  const MarkerPicture = sequelize.define('MarkerPicture', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    picture: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    marker_description_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'marker_description',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'marker_picture',
    classMethods: {
      associate: (models) => {
        MarkerPicture.belongsTo(models.MarkerDescription, { foreignKey: 'marker_description_id' });
      }
    }
  });

  return MarkerPicture;
};
