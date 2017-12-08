'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Users', 'created_at', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }),

      queryInterface.changeColumn('Users', 'updated_at', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Users', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE
      }),

      queryInterface.changeColumn('Users', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE
      })
    ];
  }
};
