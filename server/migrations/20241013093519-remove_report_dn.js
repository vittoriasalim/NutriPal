'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the reportId and dailyNutritionId columns from the clients table
    await queryInterface.removeColumn({
      tableName: 'clients',
      schema: 'nutripal' // Specify the schema if it's not the default schema
    }, 'reportId');

    await queryInterface.removeColumn({
      tableName: 'clients',
      schema: 'nutripal' // Specify the schema if it's not the default schema
    }, 'dailyNutritionId');
  },

  down: async (queryInterface, Sequelize) => {
    // In case of rollback, add the reportId and dailyNutritionId columns back to the clients table
    await queryInterface.addColumn({
      tableName: 'clients',
      schema: 'nutripal'
    }, 'reportId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn({
      tableName: 'clients',
      schema: 'nutripal'
    }, 'dailyNutritionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};