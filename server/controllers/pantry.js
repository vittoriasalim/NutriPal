const sequelize = require('../config/database'); // Adjust the path as necessary
const { pantries, pantry_ingredients, ingredients } = require('../models/init-models')(sequelize);
const { generateRecipeWithIngredients } = require('../services/geminiService'); // Function to call LLM

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

  // Helper function to get pantry ingredients for a user
const getPantryIngredientsForUser = async (userId) => {
  // Ensure a pantry exists for the user
  const pantry = await ensurePantryExists(userId);

  // Check if pantry is found or created successfully
  if (!pantry || !pantry.id) {
    throw new Error('Pantry not found or could not be created');
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

  return pantryIngredients;
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
        return res.status(200).json({});
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

  exports.updatePantryIngredient = async (req, res) => {
    const { userId, pantryIngredientId } = req.params;
    const { expiryDate, quantity } = req.body;
  
    try {
      const pantry = await ensurePantryExists(userId);
  
      // Find the pantry ingredient by its unique ID (pantryIngredientId)
    const pantryIngredient = await pantry_ingredients.findOne({
      where: { id: pantryIngredientId, pantryId: pantry.id }, // Match pantryIngredientId and pantryId
    });

    // If the pantry ingredient is not found, return a 404 error
    if (!pantryIngredient) {
      return res.status(404).json({ message: 'Ingredient not found in pantry' });
    }
  
      if (!pantryIngredient) {
        return res.status(404).json({ message: 'Ingredient not found in pantry' });
      }
  
      // Update the pantry ingredient's quantity and expiry date
      pantryIngredient.quantity = quantity || pantryIngredient.quantity;
      pantryIngredient.expiryDate = expiryDate || pantryIngredient.expiryDate;
  
      await pantryIngredient.save();
  
      return res.status(200).json(pantryIngredient);
    } catch (error) {
      console.error('Error in updatePantryIngredient:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  
// Remove an ingredient from the pantry by pantry_ingredient id
exports.removePantryIngredient = async (req, res) => {
  try {
    const { userId, pantryIngredientId } = req.params; // Extract userId and pantryIngredientId from URL params

    // Ensure the pantry exists for the user
    const pantry = await ensurePantryExists(userId);
    if (!pantry || !pantry.id) {
      return res.status(404).json({ message: 'Pantry not found' });
    }

    // Find the pantry ingredient by its unique ID (pantryIngredientId)
    const pantryIngredient = await pantry_ingredients.findOne({
      where: { id: pantryIngredientId, pantryId: pantry.id }, // Match pantryIngredientId and pantryId
    });

    // If the pantry ingredient is not found, return a 404 error
    if (!pantryIngredient) {
      return res.status(404).json({ message: 'Ingredient not found in pantry' });
    }

    // Delete the pantry ingredient record
    await pantryIngredient.destroy();

    // Respond with a success message
    res.status(200).json({ message: 'Ingredient removed from pantry' });
  } catch (error) {
    console.error('Error in removePantryIngredient:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get a specific ingredient from the user's pantry
exports.getPantryIngredient = async (req, res) => {
  try {
    const { userId, ingredientId } = req.params;


    // Ensure pantry exists for the user
    const pantry = await ensurePantryExists(userId);

    // Fetch the specific ingredient from the pantry
    const pantryIngredient = await pantry_ingredients.findAll({
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

// Remove all instances of a specific ingredient in the pantry
exports.removeAllIngredientsByType = async (req, res) => {
  try {
    const { userId, ingredientId } = req.params;

    // Ensure pantry exists for the user
    const pantry = await ensurePantryExists(userId);
    if (!pantry || !pantry.id) {
      return res.status(404).json({ message: 'Pantry not found' });
    }

    // Find all instances of the ingredient in the pantry
    const pantryIngredients = await pantry_ingredients.findAll({
      where: { pantryId: pantry.id, ingredientId },
    });

    if (!pantryIngredients.length) {
      return res.status(404).json({ message: 'No instances of this ingredient found in the pantry' });
    }

    // Remove all instances of the ingredient
    await pantry_ingredients.destroy({
      where: { pantryId: pantry.id, ingredientId },
    });

    res.status(200).json({ message: 'All instances of the ingredient removed from the pantry' });
  } catch (error) {
    console.error('Error in removeAllIngredientsByType:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to generate recipes with available pantry ingredients
exports.generateRecipesWithPantry = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from request params

    // Fetch pantry ingredients for the user
    const pantryIngredients = await getPantryIngredientsForUser(userId);

    // If no ingredients are found in the pantry, return an empty response
    if (!pantryIngredients || pantryIngredients.length === 0) {
      return res.status(200).json({ message: 'No ingredients found in the pantry' });
    }

    // Extract ingredient names from the pantry data
    const ingredientNames = pantryIngredients.map(item => item.ingredient.ingredientName);

    // Call the LLM service function to generate recipes based on the ingredients
    const generatedRecipes = await generateRecipeWithIngredients(ingredientNames);

    // Return the generated recipes to the frontend
    res.status(200).json(generatedRecipes);
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({ error: 'Server error while generating recipes' });
  }
};


