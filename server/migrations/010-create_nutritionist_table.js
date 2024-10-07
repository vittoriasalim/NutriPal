'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Nutritionist Table
    await queryInterface.createTable(
      { tableName: 'nutritionists', schema: 'nutripal' },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'users', schema: 'nutripal' }, // References the Users table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        specialisation: {
          type: Sequelize.ARRAY(Sequelize.STRING), // Array of specialisations
          allowNull: true,
        },
        qualifications: {
          type: Sequelize.ARRAY(Sequelize.STRING), // Array of qualifications
          allowNull: true,
        },
        availability: {
          type: Sequelize.INTEGER, // Availability in hours or sessions per week
          allowNull: false,
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

    // Create NutritionistClients Junction Table
    await queryInterface.createTable(
      { tableName: 'nutritionist_clients', schema: 'nutripal' },
      {
        nutritionistId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'nutritionists', schema: 'nutripal' }, // References Nutritionist table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        clientId: {
          type: Sequelize.INTEGER,
          references: {
            model: { tableName: 'clients', schema: 'nutripal' }, // References Clients table
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    // Drop the junction table first
    await queryInterface.dropTable({ tableName: 'nutritionist_clients', schema: 'nutripal' });
    // Drop the Nutritionist table
    await queryInterface.dropTable({ tableName: 'nutritionists', schema: 'nutripal' });
  }
};