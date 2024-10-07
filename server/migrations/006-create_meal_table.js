'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the Meal Table
    await queryInterface.createTable(
      { tableName: 'meals', schema: 'nutripal' }, // Ensure the table is created under the nutripal schema
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        mealName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true, // Description can be optional
        },
        calorie: {
          type: Sequelize.FLOAT,
          allowNull: true, // Optional calorie field
        },
        protein: {
          type: Sequelize.FLOAT,
          allowNull: true, // Optional protein field
        },
        fats: {
          type: Sequelize.FLOAT,
          allowNull: true, // Optional fats field
        },
        carbohydrate: {
          type: Sequelize.FLOAT,
          allowNull: true, // Optional carbohydrate field
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
    // Drop the Meal Table
    await queryInterface.dropTable({ tableName: 'meals', schema: 'nutripal' });
  }
};