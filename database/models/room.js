'use strict';

module.exports = function (sequelize, Sequelize) {
  const Room = sequelize.define('Room', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
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
      onDelete: 'restrict'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'room',
    classMethods: {
      associate: (models) => {
        Room.belongsTo(models.Message, { foreignKey: 'room_id' });
        Room.belongsTo(models.MarkerDescription, { foreignKey: 'marker_description_id' });
      }
    }
  });

  return Room;
};
