const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('daily_meal_plans', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    breakfastMealPlan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'meals',
        key: 'id'
      }
    },
    lunchMealPlan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'meals',
        key: 'id'
      }
    },
    dinnerMealPlan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'meals',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'daily_meal_plans',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "daily_meal_plans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
