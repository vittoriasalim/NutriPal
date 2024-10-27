'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, // Adjust the schema if necessary
      'healthBenefits',
      {
        type: Sequelize.TEXT,  // Using TEXT as healthBenefits can be a lengthy description
        allowNull: true,       // Set allowNull based on your requirements
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, 
      'healthBenefits'
    );
  }
};
