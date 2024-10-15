const express = require('express');
const router = express.Router();
const dailyNutritionController = require('../controllers/daily_nutrition');

router.get('/fortnightly/:id', dailyNutritionController.getDailyNutritionLast14Days);
// Route to update a specific daily nutrition record by ID
router.put('/:id', dailyNutritionController.updateDailyNutrition);  // This route listens for PUT requests to update the record by ID

router.get('/:id', dailyNutritionController.getDailyNutritionById);  // This route listens for PUT requests to update the record by ID

module.exports = router;