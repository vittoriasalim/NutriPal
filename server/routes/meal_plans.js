// routes/mealPlanRoutes.js
const express = require('express');
const mealPlanController = require('../controllers/meal_plans');

const router = express.Router();

router.post('/:id', mealPlanController.generateMealPlan);
router.get('/latest/:id', mealPlanController.getLatestWeeklyMealPlan);

router.get('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
});

module.exports = router;