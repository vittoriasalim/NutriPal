'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'meals', schema: 'nutripal' }, // Adjust the schema if necessary
      'image',
      {
        type: Sequelize.TEXT,  // Using TEXT as storageInstructions can be a lengthy text
        allowNull: true,       // Set allowNull based on your requirements
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'meals', schema: 'nutripal' }, 
      'image'
    );
  }
};
