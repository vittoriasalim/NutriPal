'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create HealthProgressReport Table
    await queryInterface.createTable(
      { tableName: 'health_progress_reports', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        dailyNutritionAnalysisList: {
          type: Sequelize.JSON, // JSON object to store daily nutrition analysis
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the HealthProgressReport Table
    await queryInterface.dropTable({ tableName: 'health_progress_reports', schema: 'nutripal' });
  }
};