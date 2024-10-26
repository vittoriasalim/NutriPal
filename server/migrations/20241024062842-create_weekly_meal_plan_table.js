'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create WeeklyMealPlans Table
    await queryInterface.createTable(
      { tableName: 'weekly_meal_plans', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        clientId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'clients', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        mondayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        tuesdayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        wednesdayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        thursdayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        fridayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        saturdayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        sundayMealsId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'daily_meal_plans', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'weekly_meal_plans', schema: 'nutripal' });
  }
};