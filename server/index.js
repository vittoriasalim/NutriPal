const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const nutritionistRoutes = require('./routes/nutritionist');
const nutritionistClientsRoutes = require('./routes/nutritionist_clients');
const dailyNutritionRoutes = require('./routes/daily_nutrition');
const breakfastRoutes = require('./routes/breakfast_meals');
const lunchRoutes = require('./routes/lunch_meals');
const dinnerRoutes = require('./routes/dinner_meals');
const mealRoutes = require('./routes/meals');
const pantryRoutes = require('./routes/pantry');


app.use(express.json()); // To parse JSON request bodies

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/nutritionists', nutritionistRoutes);
app.use('/nutritionist_clients', nutritionistClientsRoutes);
app.use('/daily_nutrition', dailyNutritionRoutes);
app.use('/breakfast_meals', breakfastRoutes);
app.use('/dinner_meals', dinnerRoutes);
app.use('/lunch_meals', lunchRoutes);
app.use('/meals', mealRoutes);
app.use('/pantry', pantryRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});