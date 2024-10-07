const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('daily_nutrition', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalCalorie: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    totalProtein: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    totalFats: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    totalCarbohydrate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'daily_nutrition',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "daily_nutrition_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
