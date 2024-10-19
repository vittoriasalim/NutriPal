const express = require('express');
const router = express.Router();
const nutritionistController = require('../controllers/nutritionist');

// route for getting all nutritionists
router.get('/', nutritionistController.getAllNutritionists);

router.get('/:id', nutritionistController.getNutritionistById);

module.exports = router;