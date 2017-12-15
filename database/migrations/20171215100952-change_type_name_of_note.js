'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Note', 'type', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Note', 'type', {
      type: Sequelize.INTEGER
    });
  }
};
