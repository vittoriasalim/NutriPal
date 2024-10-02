'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the existing table from 'health' to 'clients'
    await queryInterface.renameTable({tableName:'health', schema:'nutripal'}, 'clients');
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the table back from 'clients' to 'health'
    await queryInterface.renameTable({tableName:'clients', schema:'nutripal'}, 'health');
  }
};