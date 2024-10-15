const sequelize = require('../config/database'); // Adjust the path as necessary
const { meals } = require('../models/init-models')(sequelize); // Import the meals model (adjust path as needed)

// Create a new meal
exports.createMeal = async (req, res) => {
  try {
    const { mealName, description, calorie, protein, fats, carbohydrate } = req.body;

    // Create a new meal record
    const newMeal = await meals.create({
      mealName,
      description,
      calorie,
      protein,
      fats,
      carbohydrate
    });

    res.status(201).json(newMeal); // Respond with the newly created meal
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while creating the meal.' });
  }
};

// Get all meals
exports.getAllMeals = async (req, res) => {
  try {
    const allMeals = await meals.findAll();
    res.status(200).json(allMeals); // Respond with all meal records
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the meals.' });
  }
};

// Get a specific meal by ID
exports.getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await meals.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found.' });
    }

    res.status(200).json(meal); // Respond with the meal record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the meal.' });
  }
};

// Update a specific meal by ID
exports.updateMealById = async (req, res) => {
  try {
    const { id } = req.params;
    const { mealName, description, calorie, protein, fats, carbohydrate } = req.body;

    const meal = await meals.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found.' });
    }

    // Update the meal record
    meal.mealName = mealName || meal.mealName;
    meal.description = description || meal.description;
    meal.calorie = calorie || meal.calorie;
    meal.protein = protein || meal.protein;
    meal.fats = fats || meal.fats;
    meal.carbohydrate = carbohydrate || meal.carbohydrate;

    await meal.save(); // Save the updated meal information

    res.status(200).json(meal); // Respond with the updated meal record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while updating the meal.' });
  }
};

// Delete a meal by ID
exports.deleteMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await meals.findByPk(id);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found.' });
    }

    await meal.destroy(); // Delete the meal record

    res.status(200).json({ message: 'Meal deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while deleting the meal.' });
  }
};