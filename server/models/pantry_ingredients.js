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
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ingredients',
        key: 'id'
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pantry_ingredients',
    schema: 'nutripal',
    timestamps: true
  });
};
