'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the DailyNutrition Table
    await queryInterface.createTable(
      { tableName: 'daily_nutrition', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        totalCalorie: {
          type: Sequelize.FLOAT,
          allowNull: true, // Total calories for the day
        },
        totalProtein: {
          type: Sequelize.FLOAT,
          allowNull: true, // Total protein for the day
        },
        totalFats: {
          type: Sequelize.FLOAT,
          allowNull: true, // Total fats for the day
        },
        totalCarbohydrate: {
          type: Sequelize.FLOAT,
          allowNull: true, // Total carbohydrates for the day
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

    // Create Junction Table for Breakfast Meals
    await queryInterface.createTable(
      { tableName: 'breakfast_meals', schema: 'nutripal' },
      {
        dailyNutritionId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_nutrition', schema: 'nutripal' },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        mealId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // Reference to Meals table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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

    // Create Junction Table for Lunch Meals
    await queryInterface.createTable(
      { tableName: 'lunch_meals', schema: 'nutripal' },
      {
        dailyNutritionId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_nutrition', schema: 'nutripal' },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        mealId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // Reference to Meals table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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

    // Create Junction Table for Dinner Meals
    await queryInterface.createTable(
      { tableName: 'dinner_meals', schema: 'nutripal' },
      {
        dailyNutritionId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_nutrition', schema: 'nutripal' },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        mealId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'meals', schema: 'nutripal' }, // Reference to Meals table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    // Drop the Junction Tables first
    await queryInterface.dropTable({ tableName: 'dinner_meals', schema: 'nutripal' });
    await queryInterface.dropTable({ tableName: 'lunch_meals', schema: 'nutripal' });
    await queryInterface.dropTable({ tableName: 'breakfast_meals', schema: 'nutripal' });
    // Drop the DailyNutrition Table
    await queryInterface.dropTable({ tableName: 'daily_nutrition', schema: 'nutripal' });
  }
};