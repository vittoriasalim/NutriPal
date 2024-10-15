const express = require('express');
const router = express.Router();
const dinnerControllers = require('../controllers/dinner_meals');


router.get('/:dailyNutritionId', dinnerControllers.getMeals);
router.post('/', dinnerControllers.createDinnerMeal);

module.exports = router;