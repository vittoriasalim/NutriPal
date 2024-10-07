const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipe_ingredients', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recipes',
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
    }
  }, {
    sequelize,
    tableName: 'recipe_ingredients',
    schema: 'nutripal',
    timestamps: true
  });
};
