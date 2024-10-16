const express = require('express');
const router = express.Router();
const breakfastControllers = require('../controllers/breakfast_meals');


router.get('/:dailyNutritionId', breakfastControllers.getMeals);
router.post('/', breakfastControllers.createBreakfastMeal);

module.exports = router;