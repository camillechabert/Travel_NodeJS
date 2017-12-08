'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('to_route', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        route_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'route',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
        charset: 'utf8'
      }),

      queryInterface.removeColumn('route', 'marker_description_id')
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.dropTable('to_route'),

      queryInterface.addColumn('route', 'marker_description_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'marker_description',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      })
    ];
  }
};
