'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add `unit` column with default value `'g'`
    await queryInterface.changeColumn(
      { tableName: 'ingredients', schema: 'nutripal' },  // Adjust schema if necessary
      'unit',
      {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: 'g' // Default value set to 'g'
      }
    );

    // Update `price` column to have default value `0`
    await queryInterface.changeColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' }, // Adjust schema if necessary
      'price',
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0 // Default value set to 0
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `unit` column
    await queryInterface.removeColumn(
      { tableName: 'ingredients', schema: 'nutripal' },
      'unit'
    );

    // Revert the `price` column to no default value
    await queryInterface.changeColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' },
      'price',
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null // Revert default value to null or no default
      }
    );
  }
};
