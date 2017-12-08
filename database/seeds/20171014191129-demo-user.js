'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Users', [{
      login: 'JohnLog',
      first_name: 'John',
      last_name: 'Doe',
      email: 'jone.doe@localhost.com',
      password: '123456789',
      api_token: 'demo'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete('Users', null, {});
  }
};
