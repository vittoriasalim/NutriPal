const sequelize = require('../config/database'); // Adjust the path as necessary
const { clients } = require('../models/init-models')(sequelize);  // Import the clients model (adjust path as needed)

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const {
      userId,
      weight,
      height,
      healthGoals,
      dietaryPreferences,
      nutritionalNeeds,
      pantryId,
      recommendationCal
    } = req.body;

    // Create a new client record
    const newClient = await clients.create({
      userId,
      weight,
      height,
      healthGoals,
      dietaryPreferences,
      nutritionalNeeds,
      pantryId,
      recommendationCal
    });

    res.status(201).json(newClient);  // Respond with the newly created client
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while creating the client.' });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const allClients = await clients.findAll();
    res.status(200).json(allClients);  // Respond with all client records
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the clients.' });
  }
};

// Get a specific client by ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await clients.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    res.status(200).json(client);  // Respond with the client record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the client.' });
  }
};

// Controller function to get a client by userId
exports.getClientByUserId = async (req, res) => {
  try {
    const { id } = req.params;  // Get userId from request parameters

    // Find the client by the userId
    const client = await clients.findOne({ where: { id } });

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    res.status(200).json(client);  // Respond with the client record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the client.' });
  }
};

// Update a specific client by ID
exports.updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      weight,
      height,
      healthGoals,
      dietaryPreferences,
      nutritionalNeeds,
      pantryId
    } = req.body;

    const client = await clients.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    // Update the client record
    client.weight = weight || client.weight;
    client.height = height || client.height;
    client.healthGoals = healthGoals || client.healthGoals;
    client.dietaryPreferences = dietaryPreferences || client.dietaryPreferences;
    client.nutritionalNeeds = nutritionalNeeds || client.nutritionalNeeds;
    client.pantryId = pantryId || client.pantryId;

    await client.save();  // Save the updated client information

    res.status(200).json(client);  // Respond with the updated client record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while updating the client.' });
  }
};

// Delete a client by ID
exports.deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await clients.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    await client.destroy();  // Delete the client record

    res.status(200).json({ message: 'Client deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while deleting the client.' });
  }
};