const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meals', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mealName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    calorie: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    protein: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    fats: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    carbohydrate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'meals',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "meals_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
