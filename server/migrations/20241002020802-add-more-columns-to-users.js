'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add columns "first_name", "last_name", "date_of_birth" and "user_type" to the Users table in the Nutripal schema
    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'nutripal',
      },
      'first_name',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'nutripal',
      },
      'last_name',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'nutripal',
      },
      'date_of_birth',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'nutripal',
      },
      'user_type',
      {
        type: Sequelize.ENUM,
        values: ['CLIENT', 'NUTRITIONIST'],
        allowNull: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'first_name'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'last_name'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'date_of_birth'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'user_type'
    );
  }
};
