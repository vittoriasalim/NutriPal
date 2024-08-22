const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const healthRoutes = require('./routes/health');

app.use(express.json()); // To parse JSON request bodies

app.use('/users', userRoutes);
app.use('/health', healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});