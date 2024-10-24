// backend/controllers/mealPlanController.js
const mealPlanService = require('../services/mealPlanService');

exports.generateMealPlan = async (req, res) => {

    console.log("backend/controllers/meal_plans.js - Generating meal plan");

    const userId = req.params.id;
    console.log('Received request for userId:', userId);

    try {
        const mealPlan = await mealPlanService.getMealPlan(userId);
        console.log('Generated meal plan:', mealPlan);
        res.status(200).json({ result: mealPlan });
    } catch (error) {
        console.error('Error generating meal plan:', error);
        res.status(500).json({ error: 'Error generating meal plan' });
    }
};
