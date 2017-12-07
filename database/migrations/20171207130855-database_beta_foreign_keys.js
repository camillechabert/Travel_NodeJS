'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('marker_description', 'marker_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'marker',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }),
      queryInterface.addColumn('marker_picture', 'marker_description_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'marker_description',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }),
      queryInterface.addColumn('message', 'room_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'room',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      }),
      queryInterface.addColumn('message', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }),
      queryInterface.addColumn('route', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      }),
      queryInterface.addColumn('route', 'marker_description_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'marker_description',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      }),
      queryInterface.addColumn('room', 'marker_description_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'marker_description',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      }),

      queryInterface.createTable('to_note', {
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        note_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'note',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        marker_description_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'marker_description',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      }, {
        charset: 'utf8'
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('marker_description', 'marker_id'),
      queryInterface.removeColumn('marker_picture', 'marker_description_id'),
      queryInterface.removeColumn('message', 'room_id'),
      queryInterface.removeColumn('message', 'user_id'),
      queryInterface.removeColumn('route', 'user_id'),
      queryInterface.removeColumn('route', 'marker_description_id'),
      queryInterface.removeColumn('room', 'marker_description_id'),
      queryInterface.dropTable('to_note')
    ];
  }
};
