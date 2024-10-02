'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the pantry table in the nutripal schema
    await queryInterface.createTable('pantries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    }, {
      schema: 'nutripal', // Specify the schema where the table should be created
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the nutritionists table in the nutripal schema
    await queryInterface.dropTable('pantries', {
      schema: 'nutripal',
    });
  }
};