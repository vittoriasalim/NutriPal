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
