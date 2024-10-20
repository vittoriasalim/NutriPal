const express = require('express');
const router = express.Router();
const nutritionistController = require('../controllers/nutritionist');

router.get('/', nutritionistController.getAllNutritionists);
router.get('/users/:userId', nutritionistController.getNutritionistByUserId);

module.exports = router;