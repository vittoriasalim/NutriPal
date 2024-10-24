// backend/controllers/meal_plans.js
const sequelize = require('../config/database');
const { meals, daily_meal_plans, weekly_meal_plans } = require('../models/init-models')(sequelize); 
const mealPlanService = require('../services/mealPlanService');

exports.generateMealPlan = async (req, res) => {
    console.log("backend/controllers/meal_plans.js - Generating meal plan");

    const userId = req.params.id;
    console.log('Received request for userId:', userId);

    try {
        const mealPlan = await mealPlanService.getMealPlan(userId);
        console.log('Generated meal plan:', JSON.stringify(mealPlan, null, 2));

        // Save the formatted meal plan to the database
        await mealPlanService.saveMealPlan(mealPlan, userId);
        console.log('Meal plan saved successfully.');

        res.status(200).json({ result: mealPlan });
    } catch (error) {
        console.error('Error generating or saving meal plan:', error);
        res.status(500).json({ error: 'Error generating or saving meal plan' });
    }
};

exports.getLatestWeeklyMealPlan = async (req, res) => {
    const userId = req.params.id;

    console.log('Received request for latest weekly meal plan for userId:', userId);

    try {
        const latestMealPlan = await weekly_meal_plans.findOne({
            where: { clientId: userId },
            order: [['id', 'DESC']],
        });

        // Return null if no meal plan is found
        if (!latestMealPlan) {
            return res.status(200).json({ result: null });
        }

        console.log('Latest weekly meal plan:', latestMealPlan);
        res.status(200).json({ result: latestMealPlan });
    } catch (error) {
        console.error('Error retrieving latest weekly meal plan:', error);
        res.status(500).json({ error: 'Error retrieving latest weekly meal plan' });
    }
};
