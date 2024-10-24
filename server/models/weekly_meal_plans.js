const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weekly_meal_plans', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    mondayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    tuesdayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    wednesdayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    thursdayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    fridayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    saturdayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    },
    sundayMealsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_meal_plans',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'weekly_meal_plans',
    schema: 'nutripal',
    timestamps: false,
    indexes: [
      {
        name: "weekly_meal_plans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
