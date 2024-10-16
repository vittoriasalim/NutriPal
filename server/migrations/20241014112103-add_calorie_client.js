'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'recomendedCalorie' column to the 'clients' table in the 'NutriPal' schema
    return queryInterface.addColumn(
      { tableName: 'clients', schema: 'nutripal' },  // Specify schema and table name
      'recommendationCal',  // The column name to be added
      {
        type: Sequelize.INTEGER,  // Define the column type, assuming integer for calories
        allowNull: true,          // You can change this to false if you want the column to be non-nullable
        defaultValue: 0,          // Set a default value (optional)
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'recomendedCalorie' column if the migration is rolled back
    return queryInterface.removeColumn(
      { tableName: 'clients', schema: 'nutripal' },  // Specify schema and table name
      'recomendedCal'  // The column to remove
    );
  }
};