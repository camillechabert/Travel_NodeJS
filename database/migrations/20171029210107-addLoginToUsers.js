'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'login', {
        type: Sequelize.STRING,
        allowNull: false,
        max: 20
      }),
      queryInterface.renameColumn('Users', 'lasName', 'lastName')
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'login'),
      queryInterface.renameColumn('Users', 'lastName', 'lasName')
    ];
  }
};
