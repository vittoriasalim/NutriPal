const sequelize = require('../config/database'); // Adjust the path as necessary
const { nutritionist_clients,clients,users,nutritionists } = require('../models/init-models')(sequelize);  // Import the clients model (adjust path as needed)

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
exports.getClientsByNutritionistId = async (req, res) => {
  try {
    const { nutritionistId } = req.params;

    // Ensure nutritionistId is properly logged for debugging
    console.log('Fetching clients for nutritionistId:', nutritionistId);

    // Find all clients for the given nutritionistId, including user info
    const clientPairs = await nutritionist_clients.findAll({
      where: { nutritionistId },
      include: [{
        model: clients,  // Include client information
        as: 'client',
        include: [{
          model: users,  // Include user information for each client
          as: 'user',
          attributes: ['id','firstName', 'lastName', 'email']  // Fetch only the needed user fields
        }]
      }]
    });

    // If no clients found, respond with a 404
    if (clientPairs.length === 0) {
      return res.status(404).json({ message: 'No clients found for this nutritionist.' });
    }

    // Extract client and user information from the result
    const clientsList = clientPairs.map(pair => ({
      clientId: pair.client.id,
      userId: pair.client.user.id,
      firstName: pair.client.user.firstName,
      lastName: pair.client.user.lastName,
      email: pair.client.user.email,
      sex: pair.client.user.sex
    }));

    return res.status(200).json(clientsList);

  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: error.message || 'Failed to retrieve clients.' });
  }
};

// Get nutritionists by clientId
exports.getNutritionistsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Log the clientId for debugging
    console.log('Fetching nutritionists for clientId:', clientId);

    // Find all nutritionists for the given clientId, including user info
    const nutritionistPairs = await nutritionist_clients.findAll({
      where: { clientId },
      include: [{
        model: nutritionists,  // Include nutritionist information
        as: 'nutritionist',
        include: [{
          model: users,  // Include user information for each nutritionist
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']  // Fetch only the needed user fields
        }]
      }]
    });

    // If no nutritionists found, respond with a 404
    if (nutritionistPairs.length === 0) {
      return res.status(404).json({ message: 'No nutritionists found for this client.' });
    }

    // Extract nutritionist and user information from the result
    const nutritionistsList = nutritionistPairs.map(pair => ({
      nutritionistId: pair.nutritionist.id,
      userId: pair.nutritionist.user.id,
      firstName: pair.nutritionist.user.firstName,
      lastName: pair.nutritionist.user.lastName,
      email: pair.nutritionist.user.email,
      specialization: pair.nutritionist.specialization,  // Assuming you have this field in the model
    }));

    // Send back the list of nutritionists
    return res.status(200).json(nutritionistsList);

  } catch (error) {
    console.error('Error fetching nutritionists:', error);
    return res.status(500).json({ error: error.message || 'Failed to retrieve nutritionists.' });
  }
};

exports.getPairingByClientId = async (req, res) => {
  console.log("Get pairing by client id");
  try {
    const { clientId } = req.params;

    console.log("Finding pairing for", clientId);

    const currentPair = await nutritionist_clients.findOne({
      where: {
        clientId: clientId,
      },
    });

    console.log("FOUND PAIRING", currentPair);

    if (currentPair) {
      console.log("Sending this pairing");
      res.status(200).json(currentPair);
    } else {
      console.log("Not sending the new pair")
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the nutritionist_clients.' });
  }
};

exports.deletePairingByClientId = async (req, res) => {
  console.log("Delete pairing by client id");
  try {
    const { clientId } = req.params;

    console.log("Deleting pairing for client id:", clientId);

    // Delete the record from the nutritionist_clients table
    const deletedCount = await nutritionist_clients.destroy({
      where: {
        clientId: clientId,
      },
    });

    if (deletedCount > 0) {
      console.log("Deleted pairing successfully.");
      res.status(200).json({ message: "Pairing deleted successfully." });
    } else {
      console.log("No pairing found for the provided client id.");
      res.status(404).json({ message: "No pairing found for the provided client id." });
    }
  } catch (error) {
    console.error('Database Error:', error); // Log the database error
    res.status(500).json({ error: error.message || 'Failed to delete pairing from database.' });
  }
};
