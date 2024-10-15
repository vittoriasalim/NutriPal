const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');

// GET /api/meals - Get all meals
router.get('/', mealsController.getAllMeals);

// GET /api/meals/:id - Get a meal by ID
router.get('/:id', mealsController.getMealById);

// POST /api/meals - Create a new meal
router.post('/', mealsController.createMeal);

// PUT /api/meals/:id - Update a meal by ID
router.put('/:id', mealsController.updateMealById);

// DELETE /api/meals/:id - Delete a meal by ID
router.delete('/:id', mealsController.deleteMealById);
module.exports = router;