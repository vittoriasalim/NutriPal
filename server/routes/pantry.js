const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantry');

// Get all ingredients in the pantry for a specific user
router.get('/:userId', pantryController.getPantryForUser);

// Add an ingredient to the pantry
router.post('/:userId/ingredient', pantryController.addIngredientToPantry);

// Update a pantry ingredient
router.put('/:userId/ingredient/:ingredientId', pantryController.updatePantryIngredient);

// Remove a pantry ingredient
router.delete('/:userId/ingredient/:ingredientId', pantryController.removePantryIngredient);

module.exports = router;
