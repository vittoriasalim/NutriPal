// seeders/20241016-ingredients-seeder.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ingredients', [
      {
        ingredientName: 'Bell Pepper',
        description: 'Fresh red bell pepper',
        calorie: 20,
        protein: 1,
        fats: 0,
        carbohydrate: 4,
        food_type: 'Vegetable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredientName: 'Chicken Breast',
        description: 'Lean protein source',
        calorie: 165,
        protein: 31,
        fats: 3.6,
        carbohydrate: 0,
        food_type: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ingredients', null, {});
  }
};
