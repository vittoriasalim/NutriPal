const sequelize = require('../config/database'); // Adjust the path as necessary
const { pantries, pantry_ingredients, ingredients } = require('../models/init-models')(sequelize);

// Helper function to ensure that a pantry exists for the given userId
const ensurePantryExists = async (userId, transaction) => {
    // Check if a pantry exists for the user
    const pantry = await pantries.findOne({
      where: { userId },
      transaction, // Pass the transaction if one exists
    });
  
    if (!pantry) {
      // If no pantry exists, create one
      const newPantry = await pantries.create(
        {
         userId, // Ensure the userId is set when creating a new pantry
        },
        { transaction }
      );
      return newPantry;
    }
  
    return pantry; // Return the existing pantry
  };

// Controller function to get pantry and ingredients for a user
exports.getPantryForUser = async (req, res) => {
    try {
      const { userId } = req.params; // Get the user ID from the request parameters
  
      // Ensure a pantry exists for the user
      const pantry = await ensurePantryExists(userId);
  
      // Check if pantry is found or created successfully
      if (!pantry || !pantry.id) {
        return res.status(404).json({ message: 'Pantry not found or could not be created' });
      }
  
      // Fetch all pantry ingredients for the pantryId
      const pantryIngredients = await pantry_ingredients.findAll({
        where: { pantryId: pantry.id },  // Use `pantryId` from pantry_ingredients table
        include: [
          {
            model: ingredients,  // Join with ingredients table
            as: 'ingredient',
            attributes: ['id', 'ingredientName', 'description', 'food_type', 'storageInstructions', 'unit'],
          },
        ],
      });
  
      // If no ingredients found, return empty array
      if (!pantryIngredients.length) {
        return res.status(200).json({ message: 'Pantry is empty', ingredients: [] });
      }
  
      // Return the pantry ingredients to the client
      res.status(200).json(pantryIngredients);
    } catch (error) {
      console.error('Error in getPantryForUser:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Function to ensure the pantry exists and add an ingredient to it
exports.addIngredientToPantry = async (req, res) => {
    const { userId } = req.params; // The userId is passed in the URL params
    const { ingredientName, expiryDate, quantity } = req.body; // Extract ingredient data from request body
  
    try {
      // Ensure the pantry exists for the user
      const pantry = await ensurePantryExists(userId);
  
      // Check if the ingredient exists in the 'ingredients' table
      let ingredient = await ingredients.findOne({
        where: { ingredientName }
      });
  
      // If the ingredient doesn't exist, create a new one with default values
      if (!ingredient) {
        ingredient = await ingredients.create({
          ingredientName,
          description: '', // Default values for now
          calorie: 0,
          protein: 0,
          fats: 0,
          carbohydrate: 0,
          amount: 0,
          food_type: 'Meat', // You can change the default values as needed
        });
      }
  
      // Now, add the ingredient to the user's pantry
      const pantryIngredient = await pantry_ingredients.create({
        pantryId: pantry.id, // Associate with the correct pantry
        ingredientId: ingredient.id, // Use the existing or newly created ingredient ID
        expiryDate,
        quantity
      });
  
      res.status(201).json(pantryIngredient); // Return the created pantry ingredient
    } catch (error) {
      console.error('Error in addIngredientToPantry:', error);
      res.status(500).json({ error: 'An error occurred while adding the ingredient to the pantry' });
    }
  };

// Update a pantry ingredient
exports.updatePantryIngredient = async (req, res) => {
    try {
      const { userId, ingredientId } = req.params;
      const { expiryDate, quantity, price } = req.body;
  
      const pantry = await ensurePantryExists(userId);
      if (!pantry || !pantry.id) {
        return res.status(404).json({ message: 'Pantry not found' });
      }
  
      const pantryIngredient = await pantry_ingredients.findOne({
        where: { pantryId: pantry.id, ingredientId },
      });
  
      if (!pantryIngredient) {
        return res.status(404).json({ message: 'Ingredient not found in pantry' });
      }
  
      // Update the pantry ingredient details
      pantryIngredient.expiryDate = expiryDate || pantryIngredient.expiryDate;
      pantryIngredient.quantity = quantity || pantryIngredient.quantity;
      pantryIngredient.price = price || pantryIngredient.price;
  
      await pantryIngredient.save();
  
      res.status(200).json(pantryIngredient);
    } catch (error) {
      console.error('Error in updatePantryIngredient:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Remove an ingredient from the pantry
  exports.removePantryIngredient = async (req, res) => {
    try {
      const { userId, ingredientId } = req.params;
  
      const pantry = await ensurePantryExists(userId);
      if (!pantry || !pantry.id) {
        return res.status(404).json({ message: 'Pantry not found' });
      }
  
      const pantryIngredient = await pantry_ingredients.findOne({
        where: { pantryId: pantry.id, ingredientId },
      });
  
      if (!pantryIngredient) {
        return res.status(404).json({ message: 'Ingredient not found in pantry' });
      }
  
      await pantryIngredient.destroy();
  
      res.status(200).json({ message: 'Ingredient removed from pantry' });
    } catch (error) {
      console.error('Error in removePantryIngredient:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Get a specific ingredient from the user's pantry
exports.getPantryIngredient = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { ingredientId } = req.params;

    // Ensure pantry exists for the user
    const pantry = await ensurePantryExists(userId);

    // Fetch the specific ingredient from the pantry
    const pantryIngredient = await pantry_ingredients.findOne({
      where: { pantryId: pantry.id, ingredientId },
      include: [{ model: ingredients, as: 'ingredient' }],  // Join with ingredient details
    });

    if (!pantryIngredient) {
      return res.status(404).json({ error: 'Ingredient not found in pantry.' });
    }

    return res.status(200).json(pantryIngredient);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching ingredient from pantry.' });
  }
};
