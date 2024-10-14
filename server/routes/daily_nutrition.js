const express = require('express');
const router = express.Router();
const dailyNutritionController = require('../controllers/daily_nutrition');

router.get('/fortnightly/:id', dailyNutritionController.getDailyNutritionLast14Days);

module.exports = router;