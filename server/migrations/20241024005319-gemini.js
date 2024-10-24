'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Gemini Queries Table
    await queryInterface.createTable(
      { tableName: 'gemini', schema: 'nutripal' }, // You can change the schema if necessary
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: 'users', schema: 'nutripal' }, // Assuming there's a users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        query: {
          type: Sequelize.TEXT,
          allowNull: false, // The text of the query sent to the Gemini API
        },
        response: {
          type: Sequelize.TEXT,
          allowNull: false, // The response from the Gemini API
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Gemini Queries Table
    await queryInterface.dropTable({ tableName: 'gemini', schema: 'nutripal' });
  }
};