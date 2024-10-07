'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Recipe Table
    await queryInterface.createTable(
      { tableName: 'recipes', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        recipeName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        steps: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true, // Array of strings for steps
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

    // Create RecipeIngredients Junction Table
    await queryInterface.createTable(
      { tableName: 'recipe_ingredients', schema: 'nutripal' },
      {
        recipeId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'recipes', schema: 'nutripal' },
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
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the RecipeIngredients junction table first
    await queryInterface.dropTable({ tableName: 'recipe_ingredients', schema: 'nutripal' });
    // Drop the Recipe table
    await queryInterface.dropTable({ tableName: 'recipes', schema: 'nutripal' });
  }
};