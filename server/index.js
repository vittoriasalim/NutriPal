const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');

app.use(express.json()); // To parse JSON request bodies

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});