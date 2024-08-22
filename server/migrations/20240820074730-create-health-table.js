'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the health table in the nutripal schema
    await queryInterface.createTable('health', {
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
          model: {
            tableName: 'users',
            schema: 'nutripal',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      current_weight: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      current_height: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      target_weight: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      target_calories: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    }, {
      schema: 'nutripal', // Specify the schema where the table should be created
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the health table in the nutripal schema
    await queryInterface.dropTable('health', {
      schema: 'nutripal',
    });
  }
};