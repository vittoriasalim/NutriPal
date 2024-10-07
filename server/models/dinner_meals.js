const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dinner_meals', {
    dailyNutritionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'daily_nutrition',
        key: 'id'
      }
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'meals',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'dinner_meals',
    schema: 'nutripal',
    timestamps: true
  });
};
