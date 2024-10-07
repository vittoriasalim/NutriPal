'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Pantry Table
    await queryInterface.createTable(
      { tableName: 'pantries', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
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

    // Create PantryIngredients Junction Table
    await queryInterface.createTable(
      { tableName: 'pantry_ingredients', schema: 'nutripal' },
      {
        pantryId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'pantries', schema: 'nutripal' },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        ingredientId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'ingredients', schema: 'nutripal' },
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

    // Create PantryIngredients Junction Table
    await queryInterface.createTable(
      { tableName: 'pantry_recipes', schema: 'nutripal' },
      {
        pantryId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'pantries', schema: 'nutripal' },
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        recipeId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'recipes', schema: 'nutripal' },
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
    await queryInterface.dropTable({ tableName: 'pantry_recipes', schema: 'nutripal' });

    await queryInterface.dropTable({ tableName: 'pantry_ingredients', schema: 'nutripal' });
    // Drop the Pantry table
    await queryInterface.dropTable({ tableName: 'pantries', schema: 'nutripal' });
  }
};