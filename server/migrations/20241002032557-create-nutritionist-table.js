'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the nutritionists table in the nutripal schema
    await queryInterface.createTable('nutritionists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      specialisations: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      qualifications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      availability: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    }, {
      schema: 'nutripal',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the nutritionists table in the nutripal schema
    await queryInterface.dropTable('nutritionists', {
      schema: 'nutripal',
    });
  }
};