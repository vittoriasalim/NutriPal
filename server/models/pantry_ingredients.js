const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pantry_ingredients', {
    pantryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pantries',
        key: 'id'
      }
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ingredients',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pantry_ingredients',
    schema: 'nutripal',
    timestamps: true,
    indexes: [
      {
        name: "pantry_ingredients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
