'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Ingredient Table
    await queryInterface.createTable(
      { tableName: 'ingredients', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        ingredientName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        calorie: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        protein: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        fats: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        carbohydrate: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: true,
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
    // Drop Ingredient table
    await queryInterface.dropTable({ tableName: 'ingredients', schema: 'nutripal' });
  }
};