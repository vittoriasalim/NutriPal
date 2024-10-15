const sequelize = require('../config/database'); // Adjust the path as necessary
const { breakfast_meals, meals } = require('../models/init-models')(sequelize);  // Import the necessary models

// Get all meals for a specific dailyNutritionId
exports.getMeals = async (req, res) => {
  try {
    const { dailyNutritionId } = req.params;

    // Find all meals in breakfast_meals for the given dailyNutritionId
    const breakfastMeals = await breakfast_meals.findAll({
      where: { dailyNutritionId },  // Filter by dailyNutritionId
      include: [{
        model: meals,  // Include related meal information
        as: 'meal',  // Use the correct alias if needed
        attributes: ['mealName', 'description', 'calorie', 'protein', 'fats', 'carbohydrate']  // Specify which meal fields to include
      }]
    });

    // Check if meals were found
    if (!breakfastMeals || breakfastMeals.length === 0) {
      return res.status(404).json({ error: 'No meals found for the given dailyNutritionId.' });
    }

    // Respond with the found meals
    res.status(200).json(breakfastMeals);

  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the meals.' });
  }
};

// Function to create a breakfast meal
exports.createBreakfastMeal = async (req, res) => {
    try {
      // Extract the necessary data from the request body
      const { mealId, dailyNutritionId } = req.body;
  
  
      // Step 2: Create a new entry in the breakfast_meals table
      const newBreakfastMeal = await breakfast_meals.create({
        mealId,        // Reference the ID of the newly created meal
        dailyNutritionId,          // Reference the dailyNutritionId provided in the request
      });
  
      // Step 3: Respond with the newly created breakfast meal and associated meal details
      res.status(201).json(newBreakfastMeal);
    } catch (error) {
      throw('Error creating breakfast meal:', error);
      res.status(500).json({ error: error.message || 'An error occurred while creating the breakfast meal.' });
    }
  };