'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' }, // Specify the schema here
      'expiryDate',
      {
        type: Sequelize.DATE, // Add expiry date
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' }, // Specify the schema here
      'price',
      {
        type: Sequelize.DOUBLE, // Add price
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' }, // Specify the schema here
      'quantity',
      {
        type: Sequelize.DOUBLE, // Add quantity
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' },
      'expiryDate'
    );
    await queryInterface.removeColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' },
      'price'
    );
    await queryInterface.removeColumn(
      { tableName: 'pantry_ingredients', schema: 'nutripal' },
      'quantity'
    );
  }
};
