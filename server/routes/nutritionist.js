const express = require('express');
const router = express.Router();
const nutritionistController = require('../controllers/nutritionist');

router.get('/', nutritionistController.getAllNutritionists);

module.exports = router;