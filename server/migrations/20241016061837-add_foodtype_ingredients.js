'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, // Specify the schema here
      'food_type',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'ingredients', schema: 'nutripal' }, // Specify the schema here
      'food_type'
    );
  }
};