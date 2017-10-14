'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lasName: 'Doe',
        email: 'jone.doe@localhost.com',
        password: '123456789',
        apiToken: 'demo',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      // reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkDelete('Users', null, {});
  }
};
