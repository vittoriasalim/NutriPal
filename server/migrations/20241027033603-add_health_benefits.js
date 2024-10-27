'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: 'ingredients',
        schema: 'nutripal'  // Ensure you specify the correct schema
      },
      'healthBenefits',
      {
        type: Sequelize.TEXT,  // Using TEXT for potential lengthy descriptions
        allowNull: true,       // Set allowNull as per your requirements
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      {
        tableName: 'ingredients',
        schema: 'nutripal'  // Ensure the correct schema is used here as well
      },
      'healthBenefits'
    );
  }
};
