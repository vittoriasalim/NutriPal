const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'health_progress_reports',
        key: 'id'
      }
    },
    dailyNutritionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'daily_nutrition',
        key: 'id'
      }
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    healthGoals: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    dietaryPreferences: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    nutritionalNeeds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    pantryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pantries',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clients',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "clients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
