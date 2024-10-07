'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the DailyMealPlan Table
    await queryInterface.createTable(
      { tableName: 'daily_meal_plans', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        clientId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'clients', schema: 'nutripal' }, // Foreign key reference to Clients table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        day: {
          type: Sequelize.STRING,
          allowNull: false, // Day of the meal plan (e.g., Monday, Tuesday)
        },
        breakfastMealPlan: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // References Meal table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true, // Optional reference to breakfast meal
        },
        lunchMealPlan: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // References Meal table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true, // Optional reference to lunch meal
        },
        dinnerMealPlan: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // References Meal table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true, // Optional reference to dinner meal
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
    // Drop the DailyMealPlan Table
    await queryInterface.dropTable({ tableName: 'daily_meal_plans', schema: 'nutripal' });
  }
};