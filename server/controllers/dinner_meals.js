const sequelize = require('../config/database'); // Adjust the path as necessary
const { dinner_meals, meals } = require('../models/init-models')(sequelize);  // Import the necessary models

exports.createDinnerMeal = async (req, res) => {
    try {
      // Extract the necessary data from the request body
      const { mealId, dailyNutritionId } = req.body;
  
  
      // Step 2: Create a new entry in the breakfast_meals table
      const newdinnerMeal = await dinner_meals.create({
        mealId,        // Reference the ID of the newly created meal
        dailyNutritionId,          // Reference the dailyNutritionId provided in the request
      });
  
      // Step 3: Respond with the newly created dinner meal and associated meal details
      res.status(201).json(newdinnerMeal);
    } catch (error) {
      console.error('Error creating dinner meal:', error);
      res.status(500).json({ error: error.message || 'An error occurred while creating the dinner meal.' });
    }
  };

// Get all meals for a specific dailyNutritionId
exports.getMeals = async (req, res) => {
  try {
    const { dailyNutritionId } = req.params;

    // Find all meals in breakfast_meals for the given dailyNutritionId
    const dinnerMeals = await dinner_meals.findAll({
      where: { dailyNutritionId },  // Filter by dailyNutritionId
      include: [{
        model: meals,  // Include related meal information
        as: 'meal',  // Use the correct alias if needed
        attributes: ['mealName', 'description', 'calorie', 'protein', 'fats', 'carbohydrate']  // Specify which meal fields to include
      }]
    });

    // Check if meals were found
    if (!dinnerMeals || dinnerMeals.length === 0) {
      return res.status(404).json({ error: 'No meals found for the given dailyNutritionId.' });
    }

    // Respond with the found meals
    res.status(200).json(dinnerMeals);

  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the meals.' });
  }
};