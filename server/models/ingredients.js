const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingredients', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ingredientName: {
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
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    food_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "g"
    },
    storageInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    healthBenefits: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ingredients',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "ingredients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
