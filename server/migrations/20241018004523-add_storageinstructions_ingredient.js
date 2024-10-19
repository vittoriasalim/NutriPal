'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, // Adjust the schema if necessary
      'storageInstructions',
      {
        type: Sequelize.TEXT,  // Using TEXT as storageInstructions can be a lengthy text
        allowNull: true,       // Set allowNull based on your requirements
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, 
      'storageInstructions'
    );
  }
};
