'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.renameColumn('Users', 'apiToken', 'api_token'),
      queryInterface.renameColumn('Users', 'firstName', 'first_name'),
      queryInterface.renameColumn('Users', 'createdAt', 'created_at'),
      queryInterface.renameColumn('Users', 'updatedAt', 'updated_at'),
      queryInterface.renameColumn('Users', 'lastName', 'last_name'),
      queryInterface.changeColumn('Users', 'id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true
      }),


      queryInterface.createTable('marker', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        distance: {
          type: Sequelize.INTEGER
        },
        longitude: {
          type: Sequelize.DECIMAL
        },
        latitude: {
          type: Sequelize.DECIMAL
        },
        color: {
          type: Sequelize.INTEGER
        },
        time: {
          type: Sequelize.DATE
        }
      }, {
        charset: 'utf8'
      }),


      queryInterface.createTable('marker_description', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        open_hours: {
          type: Sequelize.BLOB
        },
        description: {
          type: Sequelize.STRING
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
      }),

      queryInterface.createTable('marker_picture', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        picture: {
          type: Sequelize.STRING
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
      }),

      queryInterface.createTable('message', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        content: {
          type: Sequelize.STRING
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
      }),

      queryInterface.createTable('note', {
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
        charset: 'utf8'
      }),

      queryInterface.createTable('room', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.INTEGER
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
      }),

      queryInterface.createTable('route', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        token: {
          type: Sequelize.STRING
        },
        position: {
          type: Sequelize.INTEGER
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
      queryInterface.renameColumn('Users', 'last_name', 'lastName'),
      queryInterface.renameColumn('Users', 'first_name', 'firstName'),
      queryInterface.renameColumn('Users', 'api_token', 'apiToken'),
      queryInterface.renameColumn('Users', 'created_at', 'createdAt'),
      queryInterface.renameColumn('Users', 'updated_at', 'updatedAt'),
      queryInterface.changeColumn('Users', 'id', {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.dropTable('message'),
      queryInterface.dropTable('room'),
      queryInterface.dropTable('note'),
      queryInterface.dropTable('route'),
      queryInterface.dropTable('marker_picture'),
      queryInterface.dropTable('marker_description'),
      queryInterface.dropTable('marker')
    ];
  }
};
