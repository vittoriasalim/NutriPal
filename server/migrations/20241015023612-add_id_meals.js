'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { 
        tableName: 'breakfast_meals', // Table name
        schema: 'nutripal'            // Schema name
      },
      'id', // Name of the column we are adding
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }
    );
 

    // Add 'id' column to 'lunch_meals'
    await queryInterface.addColumn(
      { 
        tableName: 'lunch_meals', 
        schema: 'nutripal' 
      },
      'id', 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }
    );

    // Add 'id' column to 'dinner_meals'
    await queryInterface.addColumn(
      { 
        tableName: 'dinner_meals', 
        schema: 'nutripal' 
      },
      'id', 
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove 'id' column from 'breakfast_meals'
    await queryInterface.removeColumn(
      { 
        tableName: 'breakfast_meals', 
        schema: 'nutripal' 
      },
      'id' 
    );

    // Remove 'id' column from 'lunch_meals'
    await queryInterface.removeColumn(
      { 
        tableName: 'lunch_meals', 
        schema: 'nutripal' 
      },
      'id' 
    );

    // Remove 'id' column from 'dinner_meals'
    await queryInterface.removeColumn(
      { 
        tableName: 'dinner_meals', 
        schema: 'nutripal' 
      },
      'id' 
    );
  }
};