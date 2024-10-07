

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      { tableName: 'clients', schema: 'nutripal' }, // specify schema and table name
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: 'users', schema: 'nutripal' }, // reference 'users' table in the 'nutripal' schema
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        reportId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: 'health_progress_reports', schema: 'nutripal' }, // reference 'users' table in the 'nutripal' schema
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        dailyNutritionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: 'daily_nutrition', schema: 'nutripal' }, // reference 'users' table in the 'nutripal' schema
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        healthGoals: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true // Optional
        },
        dietaryPreferences: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true // Optional
        },
        nutritionalNeeds: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true // Optional
        },
        pantryId: {
          type: Sequelize.INTEGER,
          allowNull: true, // Optional
          references: {
            model: { tableName: 'pantries', schema: 'nutripal' }, // reference 'Pantry' table in the 'nutripal' schema
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'clients', schema: 'nutripal' });
  }
};
