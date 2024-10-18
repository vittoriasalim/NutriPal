'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, // Adjust the schema if necessary
      'unit',
      {
        type: Sequelize.STRING(10),  // The length can be adjusted as needed (e.g., g, ml, kg, etc.)
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, 
      'unit'
    );
  }
};
