'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { schema: 'nutripal', tableName: 'messages' }, // Specify schema here
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nutritionistId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              schema: 'nutripal',
              tableName: 'nutritionists'
            },
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              schema: 'nutripal',
              tableName: 'clients'
            },
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        isNutriSender: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false // Default value for boolean field
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ schema: 'nutripal', tableName: 'messages' });
  }
};