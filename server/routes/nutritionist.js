const express = require('express');
const router = express.Router();
const nutritionistController = require('../controllers/nutritionist');

// route for getting all nutritionists
router.get('/', nutritionistController.getAllNutritionists);
router.get('/users/:userId', nutritionistController.getNutritionistByUserId);

router.get('/:id', nutritionistController.getNutritionistById);
router.patch('/incrementAvailability/:id', nutritionistController.incrementAvailability);
router.patch('/decrementAvailability/:id', nutritionistController.decrementAvailability);

module.exports = router;