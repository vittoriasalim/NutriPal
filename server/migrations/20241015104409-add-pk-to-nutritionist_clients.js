'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add primary key constraint
    await queryInterface.addConstraint(
      {
      tableName: 'nutritionist_clients',
      schema: 'nutripal', 
      },
    {
      fields: ['nutritionistId', 'clientId'],
      type: 'primary key',
      name: 'composite_primary_key_nutritionist_clients' // optional, but good for clarity
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove primary key constraint
    await queryInterface.removeConstraint('nutritionist_clients', 'composite_primary_key_nutritionist_clients');
  }
};