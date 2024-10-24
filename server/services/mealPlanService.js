// backend/services/mealPlanService.js
const sequelize = require('../config/database'); // Adjust the path as necessary
const { clients, meals, daily_meal_plans, weekly_meal_plans } = require('../models/init-models')(sequelize);
const geminiService = require('./geminiService');

exports.getMealPlan = async (userId) => {
    // const userInfo = await users.findByPk(userId);
    // if (!userInfo) throw new Error('User not found');

    console.log("backend/services/mealPlanService.js");
    console.log("Finding client:", userId);

    const clientInfo = await clients.findOne({ where: { id: userId } });
    if (!clientInfo) throw new Error('Client info not found');

    const clientData = {
        weight: clientInfo.weight,
        height: clientInfo.height,
        healthGoals: clientInfo.healthGoals,
        dietaryPreferences: clientInfo.dietaryPreferences,
    };

    return geminiService.generateMealPlan(clientData);
};

exports.saveMealPlan = async (mealPlan, userId) => {
    console.log("SAVE MEAL PLAN ====================");
    console.log("received", mealPlan);
    
    // Clean the mealPlan string and parse it
    const cleanedMealPlan = mealPlan.replace(/```json|```/g, '').trim();
    const mealPlanJSON = JSON.parse(cleanedMealPlan);

    console.log('Parsed meal plan:', mealPlanJSON);

    // Object to hold the daily meal plan IDs
    const dailyPlanIds = {};

    // Save meals for each day and collect their IDs
    for (const day of Object.keys(mealPlanJSON)) {
        console.log("working on", day);
        const mealsForDay = mealPlanJSON[day];
        const savedMeals = {}; // Store meal IDs for the current day

        // Save meals (breakfast, lunch, dinner) if they exist
        for (const mealType of ['breakfast', 'lunch', 'dinner']) {
            const meal = mealsForDay[mealType];
            if (meal) {
                const { name, description, calorie, protein, fat, carbohydrate, image } = meal;

                const newMeal = await meals.create({
                    mealName: name,
                    description,
                    calorie,
                    protein,
                    fats: fat,
                    carbohydrate: carbohydrate,
                    image: image
                });
                savedMeals[mealType] = newMeal.id; // Store the saved meal ID
                console.log(`Saved ${mealType} for ${day}:`, newMeal.id);
            } else {
                console.log(`No ${mealType} found for ${day}`);
            }
        }

        // Construct daily meal plan entry if at least one meal was saved
        const dailyPlan = {
            clientId: userId,
            day,
            breakfastMealPlan: savedMeals.breakfast || null,
            lunchMealPlan: savedMeals.lunch || null,
            dinnerMealPlan: savedMeals.dinner || null,
        };

        if (savedMeals.breakfast || savedMeals.lunch || savedMeals.dinner) {
            const savedDailyPlan = await daily_meal_plans.create(dailyPlan);
            dailyPlanIds[day] = savedDailyPlan.id; // Collect saved daily plan ID by day
            console.log(`Saved daily meal plan for ${day}:`, savedDailyPlan.id);
        } else {
            console.log(`No meals to save for ${day}. Skipping daily meal plan creation.`);
        }
    }

    // Log dailyPlanIds before constructing the weekly plan
    console.log('Daily meal plan IDs:', dailyPlanIds);

    // Construct weekly meal plan entry
    const weeklyPlan = {
        clientId: userId,
        mondayMealsId: dailyPlanIds.monday || null,
        tuesdayMealsId: dailyPlanIds.tuesday || null,
        wednesdayMealsId: dailyPlanIds.wednesday || null,
        thursdayMealsId: dailyPlanIds.thursday || null,
        fridayMealsId: dailyPlanIds.friday || null,
        saturdayMealsId: dailyPlanIds.saturday || null,
        sundayMealsId: dailyPlanIds.sunday || null,
    };

    // Upsert weekly meal plan (create or update)
    await weekly_meal_plans.upsert(weeklyPlan);
    console.log('Weekly meal plan saved successfully:', weeklyPlan);
};



// exports.saveMealPlan = async (mealPlan, userId) => {
//     console.log("+++++++++++++++++++++++++++++++++++++++++++++");
//     try {
//         console.log('Received mealPlan:', JSON.stringify(mealPlan, null, 2));

//         // Object to hold the daily meal plan IDs
//         const dailyPlanIds = {};

//         // Save meals for each day and collect their IDs
//         for (const day of Object.keys(mealPlan)) {
//             // Log the key to understand its structure
//             console.log("Working on day:", day);
//             const mealsForDay = mealPlan[day];
//             const savedMeals = {}; // Store meal IDs for the current day

//             // Save meals (breakfast, lunch, dinner) if they exist
//             for (const mealType of ['breakfast', 'lunch', 'dinner']) {
//                 const meal = mealsForDay[mealType];
//                 if (meal) {
//                     // Ensure the meal object is structured correctly
//                     console.log(`Saving ${mealType} for ${day}:`, meal);
//                     const [savedMeal] = await meals.create({
//                         mealName: meal.name,
//                         description: meal.description,
//                         calorie: meal.calorie,
//                         protein: meal.protein,
//                         fats: meal.fat,
//                         carbohydrate: meal.carbohydrate,
//                     });
//                     savedMeals[mealType] = savedMeal.id; // Store the saved meal ID
//                 } else {
//                     console.log(`No ${mealType} found for ${day}`);
//                 }
//             }

//             // Construct daily meal plan entry
//             const dailyPlan = {
//                 clientId: userId,
//                 day,
//                 breakfastMealPlan: savedMeals.breakfast || null,
//                 lunchMealPlan: savedMeals.lunch || null,
//                 dinnerMealPlan: savedMeals.dinner || null,
//             };

//             // Save the daily meal plan if there are meals
//             if (savedMeals.breakfast || savedMeals.lunch || savedMeals.dinner) {
//                 const savedDailyPlan = await daily_meal_plans.create(dailyPlan);
//                 dailyPlanIds[day] = savedDailyPlan.id; // Collect saved daily plan ID
//                 console.log(`Saved daily meal plan for ${day}:`, savedDailyPlan.id);
//             } else {
//                 console.log(`No meals to save for ${day}. Skipping daily meal plan creation.`);
//             }
//         }

//         // Log dailyPlanIds before constructing the weekly plan
//         console.log('Daily meal plan IDs:', dailyPlanIds);

//         // Construct weekly meal plan entry
//         const weeklyPlan = {
//             clientId: userId,
//             mondayMealsId: dailyPlanIds.monday || null,
//             tuesdayMealsId: dailyPlanIds.tuesday || null,
//             wednesdayMealsId: dailyPlanIds.wednesday || null,
//             thursdayMealsId: dailyPlanIds.thursday || null,
//             fridayMealsId: dailyPlanIds.friday || null,
//             saturdayMealsId: dailyPlanIds.saturday || null,
//             sundayMealsId: dailyPlanIds.sunday || null,
//         };

//         // Upsert weekly meal plan (create or update)
//         await weekly_meal_plans.upsert(weeklyPlan);

//         console.log('Weekly meal plan saved successfully:', weeklyPlan);
//     } catch (error) {
//         console.error('Error saving meal plan:', error);
//         throw error; // Re-throw the error for further handling if needed
//     }
// };

