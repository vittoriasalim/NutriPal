const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantry');

// Get all ingredients in the pantry for a specific user
router.get('/:userId', pantryController.getPantryForUser);

// Get a specific ingredient from the user's pantry
router.get('/:userId/ingredient/:ingredientId', pantryController.getPantryIngredient);

// Add an ingredient to the pantry
router.post('/:userId/ingredient', pantryController.addIngredientToPantry);

// Update a pantry ingredient
router.put('/:userId/pantryIngredient/:pantryIngredientId', pantryController.updatePantryIngredient);

// Remove a specific instance of a pantry ingredient by pantryIngredientId
router.delete('/:userId/pantryIngredient/:pantryIngredientId', pantryController.removePantryIngredient);

// Remove all instances of a specific ingredient in the pantry (identified by ingredientId)
router.delete('/:userId/ingredient/:ingredientId/all', pantryController.removeAllIngredientsByType);

// New route to generate recipes based on the user's pantry
router.post('/:userId/generateRecipes', pantryController.generateRecipesWithPantry); // Add the new route for generating recipes

module.exports = router;
