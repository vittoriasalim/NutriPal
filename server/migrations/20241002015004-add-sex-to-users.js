'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add column "sex" to the Users table in the Nutripal schema
    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'nutripal',
      },
      'sex',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    // Remove the 'sex' column from the users table in the nutripal schema
    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'sex'
    );
  }
};
