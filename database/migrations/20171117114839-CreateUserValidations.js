'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Users', 'login', {
        type: Sequelize.STRING,
        unique: true,
        max: 8
      }),
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        notEmpty: true,
        isEmail: true,
        unique: true,
        max: 30
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Users', 'login', {
        type: Sequelize.STRING,
        unique: false,
        max: 20
      }),
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        notEmpty: true,
        isEmail: true,
        unique: false,
        max: 30
      })
    ];
  }
};
