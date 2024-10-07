'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the nutripal schema if it doesn't exist
    await queryInterface.createSchema('nutripal');
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the nutripal schema (cascading drop of all objects in the schema)
    await queryInterface.dropSchema('nutripal');
  }
};