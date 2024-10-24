// backend/services/mealPlanService.js
const sequelize = require('../config/database'); // Adjust the path as necessary
const { clients } = require('../models/init-models')(sequelize);
const geminiService = require('./geminiService');

exports.getMealPlan = async (userId) => {
    // const userInfo = await users.findByPk(userId);
    // if (!userInfo) throw new Error('User not found');

    console.log("backend/services/mealPlanService.js");
    console.log("Finding client:", userId);

    const clientInfo = await clients.findOne({ where: { userId: userId } });
    if (!clientInfo) throw new Error('Client info not found');

    const clientData = {
        weight: clientInfo.weight,
        height: clientInfo.height,
        healthGoals: clientInfo.healthGoals,
        dietaryPreferences: clientInfo.dietaryPreferences,
    };

    return geminiService.generateMealPlan(clientData);
};