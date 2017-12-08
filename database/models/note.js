'use strict';

module.exports = function (sequelize, Sequelize) {
  const Note = sequelize.define('Note', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    type: {
      type: Sequelize.INTEGER
    },
    note: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'note',
    classMethods: {
      associate: (models) => {
        Note.hasMany(models.Note, { foreignKey: 'note_id' });
      }
    }
  });
};
