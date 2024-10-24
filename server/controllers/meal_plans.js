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
            return res.status(200).json(null);
        }

        const weeklyMealPlanJson = {};

        const mondayMeals = await daily_meal_plans.findByPk(latestMealPlan.mondayMealsId);
        console.log("MONDAY MEALS", mondayMeals);
        const tuesdayMeals = await daily_meal_plans.findByPk(latestMealPlan.tuesdayMealsId);
        const wednesdayMeals = await daily_meal_plans.findByPk(latestMealPlan.wednesdayMealsId);
        const thursdayMeals = await daily_meal_plans.findByPk(latestMealPlan.thursdayMealsId);
        const fridayMeals = await daily_meal_plans.findByPk(latestMealPlan.fridayMealsId);
        const saturdayMeals = await daily_meal_plans.findByPk(latestMealPlan.saturdayMealsId);
        const sundayMeals = await daily_meal_plans.findByPk(latestMealPlan.sundayMealsId);

        const daysInWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const weeklyMealPlanData = [mondayMeals, tuesdayMeals, wednesdayMeals, thursdayMeals, fridayMeals, saturdayMeals, sundayMeals];

        for (let i in weeklyMealPlanData) {
            console.log(i);
            const breakfastData = await meals.findByPk(weeklyMealPlanData[i].breakfastMealPlan);
            const lunchData = await meals.findByPk(weeklyMealPlanData[i].lunchMealPlan);
            const dinnerData = await meals.findByPk(weeklyMealPlanData[i].dinnerMealPlan);
            
            weeklyMealPlanJson[daysInWeek[i]] = {
                // breakfast: {
                //     name: breakfastData.mealName,
                //     description: breakfastData.description,
                //     calorie: breakfastData.calorie,
                //     carbohydrate: breakfastData.carbohydrate,
                //     fat: breakfastData.fats,
                //     protein: breakfastData.protein,
                //     image: breakfastData.image,
                // },
                breakfast: breakfastData,
                lunch: lunchData,
                dinner: dinnerData
            };
        }

        console.log(weeklyMealPlanJson);
        
        res.status(200).json(weeklyMealPlanJson);
        // res.status(200).json(latestMealPlan);
    } catch (error) {
        console.error('Error retrieving latest weekly meal plan:', error);
        res.status(500).json({ error: 'Error retrieving latest weekly meal plan' });
    }
};
