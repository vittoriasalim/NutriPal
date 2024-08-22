'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the users table in the nutripal schema
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOaW,
      },
    }, {
      schema: 'nutripal', // Specify the schema where the table should be created
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the users table in the nutripal schema
    await queryInterface.dropTable('users', {
      schema: 'nutripal',
    });
  }
};