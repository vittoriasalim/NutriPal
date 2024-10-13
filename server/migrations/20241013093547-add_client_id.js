'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add clientId foreign key to daily_nutrition table
    await queryInterface.addColumn(
      {
        tableName: 'daily_nutrition',
        schema: 'nutripal'
      },
      'clientId',  // Column name
      {
        type: Sequelize.INTEGER,

        references: {
          model: {
            tableName: 'clients',
            schema: 'nutripal'
          },
          key: 'id'  // Client's primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    // Add clientId foreign key to health_progress_reports table
    await queryInterface.addColumn(
      {
        tableName: 'health_progress_reports',
        schema: 'nutripal'
      },
      'clientId',  // Column name
      {
        type: Sequelize.INTEGER,

        references: {
          model: {
            tableName: 'clients',
            schema: 'nutripal'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove clientId foreign key from daily_nutrition table
    await queryInterface.removeColumn({
      tableName: 'daily_nutrition',
      schema: 'nutripal'
    }, 'clientId');

    // Remove clientId foreign key from health_progress_reports table
    await queryInterface.removeColumn({
      tableName: 'health_progress_reports',
      schema: 'nutripal'
    }, 'clientId');
  }
};