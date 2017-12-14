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
    tableName: 'note'
  });

  Note.associate = function (models) {
    Note.belongsToMany(models.MarkerDescription, { through: models.ToNote });
    Note.belongsToMany(models.User, { through: models.ToNote });
  };

  return Note;
};
