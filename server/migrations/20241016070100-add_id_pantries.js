'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      { tableName: 'pantries', schema: 'nutripal' }, // Specify the schema here
      'userId', // Add a userId column
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assuming there is a 'users' table
          key: 'id',
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      { tableName: 'pantries', schema: 'nutripal' }, // Specify the schema here
      'userId' // Remove the userId column
    );
  }
};
