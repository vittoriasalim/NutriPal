const express = require('express');
const router = express.Router();
const lunchControllers = require('../controllers/lunch_meals');


router.get('/:dailyNutritionId', lunchControllers.getMeals);
router.post('/', lunchControllers.createLunchMeal);

module.exports = router;