'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'health_goals',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'favourite_foods',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'disliked_foods',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'allergies',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      }
    );

    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'nutritional_needs',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      }
    );
    
    await queryInterface.addColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'pantry_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pantries',
          key: 'id'
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'health_goals'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'favourite_foods'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'disliked_foods'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal',
      },
      'allergies'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'nutritional_needs'
    );

    await queryInterface.removeColumn(
      {
        tableName: 'clients',
        schema: 'nutripal', // Specify the schema where the table exists
      },
      'pantry_id'
    );
  }
};