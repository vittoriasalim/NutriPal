'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the client-nutritionist relationship table in the nutripal schema
    await queryInterface.createTable('client_nutritionist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      nutritionist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    }, {
      schema: 'nutripal',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the nutritionists table in the nutripal schema
    await queryInterface.dropTable('client_nutritionist', {
      schema: 'nutripal',
    });
  }
};