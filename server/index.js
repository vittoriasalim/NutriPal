const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const dailyNutritionRoutes = require('./routes/daily_nutrition');

app.use(express.json()); // To parse JSON request bodies

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/daily_nutrition', dailyNutritionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});