const sequelize = require('../config/database'); // Adjust the path as necessary
const { nutritionist_clients } = require('../models/init-models')(sequelize);  // Import the clients model (adjust path as needed)

exports.createNewPair = async (req, res) => {
    try {
      const {
        nutritionistId,
        clientId,
      } = req.body;

      console.log('N C controller', req.body);

      const newPair = await nutritionist_clients.create({
        nutritionistId,
        clientId
      });
  
      res.status(201).json(newPair);
    } catch (dbError) {
        console.error('Database Error:', dbError); // Log the database error
        res.status(500).json({ error: dbError.message || 'Failed to create pairing in database.' });
    }
};