var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _breakfast_meals = require("./breakfast_meals");
var _clients = require("./clients");
var _daily_meal_plans = require("./daily_meal_plans");
var _daily_nutrition = require("./daily_nutrition");
var _dinner_meals = require("./dinner_meals");
var _health_progress_reports = require("./health_progress_reports");
var _ingredients = require("./ingredients");
var _lunch_meals = require("./lunch_meals");
var _meals = require("./meals");
var _nutritionist_clients = require("./nutritionist_clients");
var _nutritionists = require("./nutritionists");
var _pantries = require("./pantries");
var _pantry_ingredients = require("./pantry_ingredients");
var _pantry_recipes = require("./pantry_recipes");
var _recipe_ingredients = require("./recipe_ingredients");
var _recipes = require("./recipes");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var breakfast_meals = _breakfast_meals(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var daily_meal_plans = _daily_meal_plans(sequelize, DataTypes);
  var daily_nutrition = _daily_nutrition(sequelize, DataTypes);
  var dinner_meals = _dinner_meals(sequelize, DataTypes);
  var health_progress_reports = _health_progress_reports(sequelize, DataTypes);
  var ingredients = _ingredients(sequelize, DataTypes);
  var lunch_meals = _lunch_meals(sequelize, DataTypes);
  var meals = _meals(sequelize, DataTypes);
  var nutritionist_clients = _nutritionist_clients(sequelize, DataTypes);
  var nutritionists = _nutritionists(sequelize, DataTypes);
  var pantries = _pantries(sequelize, DataTypes);
  var pantry_ingredients = _pantry_ingredients(sequelize, DataTypes);
  var pantry_recipes = _pantry_recipes(sequelize, DataTypes);
  var recipe_ingredients = _recipe_ingredients(sequelize, DataTypes);
  var recipes = _recipes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  daily_meal_plans.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(daily_meal_plans, { as: "daily_meal_plans", foreignKey: "clientId"});
  nutritionist_clients.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(nutritionist_clients, { as: "nutritionist_clients", foreignKey: "clientId"});
  breakfast_meals.belongsTo(daily_nutrition, { as: "dailyNutrition", foreignKey: "dailyNutritionId"});
  daily_nutrition.hasMany(breakfast_meals, { as: "breakfast_meals", foreignKey: "dailyNutritionId"});
  clients.belongsTo(daily_nutrition, { as: "dailyNutrition", foreignKey: "dailyNutritionId"});
  daily_nutrition.hasMany(clients, { as: "clients", foreignKey: "dailyNutritionId"});
  dinner_meals.belongsTo(daily_nutrition, { as: "dailyNutrition", foreignKey: "dailyNutritionId"});
  daily_nutrition.hasMany(dinner_meals, { as: "dinner_meals", foreignKey: "dailyNutritionId"});
  lunch_meals.belongsTo(daily_nutrition, { as: "dailyNutrition", foreignKey: "dailyNutritionId"});
  daily_nutrition.hasMany(lunch_meals, { as: "lunch_meals", foreignKey: "dailyNutritionId"});
  clients.belongsTo(health_progress_reports, { as: "report", foreignKey: "reportId"});
  health_progress_reports.hasMany(clients, { as: "clients", foreignKey: "reportId"});
  pantry_ingredients.belongsTo(ingredients, { as: "ingredient", foreignKey: "ingredientId"});
  ingredients.hasMany(pantry_ingredients, { as: "pantry_ingredients", foreignKey: "ingredientId"});
  recipe_ingredients.belongsTo(ingredients, { as: "ingredient", foreignKey: "ingredientId"});
  ingredients.hasMany(recipe_ingredients, { as: "recipe_ingredients", foreignKey: "ingredientId"});
  breakfast_meals.belongsTo(meals, { as: "meal", foreignKey: "mealId"});
  meals.hasMany(breakfast_meals, { as: "breakfast_meals", foreignKey: "mealId"});
  daily_meal_plans.belongsTo(meals, { as: "breakfastMealPlan_meal", foreignKey: "breakfastMealPlan"});
  meals.hasMany(daily_meal_plans, { as: "daily_meal_plans", foreignKey: "breakfastMealPlan"});
  daily_meal_plans.belongsTo(meals, { as: "dinnerMealPlan_meal", foreignKey: "dinnerMealPlan"});
  meals.hasMany(daily_meal_plans, { as: "dinnerMealPlan_daily_meal_plans", foreignKey: "dinnerMealPlan"});
  daily_meal_plans.belongsTo(meals, { as: "lunchMealPlan_meal", foreignKey: "lunchMealPlan"});
  meals.hasMany(daily_meal_plans, { as: "lunchMealPlan_daily_meal_plans", foreignKey: "lunchMealPlan"});
  dinner_meals.belongsTo(meals, { as: "meal", foreignKey: "mealId"});
  meals.hasMany(dinner_meals, { as: "dinner_meals", foreignKey: "mealId"});
  lunch_meals.belongsTo(meals, { as: "meal", foreignKey: "mealId"});
  meals.hasMany(lunch_meals, { as: "lunch_meals", foreignKey: "mealId"});
  nutritionist_clients.belongsTo(nutritionists, { as: "nutritionist", foreignKey: "nutritionistId"});
  nutritionists.hasMany(nutritionist_clients, { as: "nutritionist_clients", foreignKey: "nutritionistId"});
  clients.belongsTo(pantries, { as: "pantry", foreignKey: "pantryId"});
  pantries.hasMany(clients, { as: "clients", foreignKey: "pantryId"});
  pantry_ingredients.belongsTo(pantries, { as: "pantry", foreignKey: "pantryId"});
  pantries.hasMany(pantry_ingredients, { as: "pantry_ingredients", foreignKey: "pantryId"});
  pantry_recipes.belongsTo(pantries, { as: "pantry", foreignKey: "pantryId"});
  pantries.hasMany(pantry_recipes, { as: "pantry_recipes", foreignKey: "pantryId"});
  pantry_recipes.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(pantry_recipes, { as: "pantry_recipes", foreignKey: "recipeId"});
  recipe_ingredients.belongsTo(recipes, { as: "recipe", foreignKey: "recipeId"});
  recipes.hasMany(recipe_ingredients, { as: "recipe_ingredients", foreignKey: "recipeId"});
  clients.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(clients, { as: "clients", foreignKey: "userId"});
  nutritionists.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(nutritionists, { as: "nutritionists", foreignKey: "userId"});

  return {
    SequelizeMeta,
    breakfast_meals,
    clients,
    daily_meal_plans,
    daily_nutrition,
    dinner_meals,
    health_progress_reports,
    ingredients,
    lunch_meals,
    meals,
    nutritionist_clients,
    nutritionists,
    pantries,
    pantry_ingredients,
    pantry_recipes,
    recipe_ingredients,
    recipes,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
