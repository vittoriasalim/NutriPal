const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    recipeName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    tableName: 'recipes',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "recipes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
