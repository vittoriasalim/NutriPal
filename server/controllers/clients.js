const sequelize = require('../config/database'); // Adjust the path as necessary
const { clients } = require('../models/init-models')(sequelize); // Adjust the path as necessary

// Create a new client record
exports.createClientRecord = async (req, res) => {
  try {
    const { user_id, current_weight, current_height, target_weight, target_calories } = req.body;
    const newClientRecord = await clients.create({ user_id, current_weight, current_height, target_weight, target_calories });
    res.status(201).json(newClientRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all client records
exports.getAllClientRecords = async (req, res) => {
  try {
    const allClientRecords = await clients.findAll();
    res.status(200).json(allClientsRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a clients record by ID
exports.getClientRecordById = async (req, res) => {
  try {
    const record = await clients.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Client record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a client record by ID
exports.updateClientRecord = async (req, res) => {
  try {
    const { current_weight, current_height, target_weight, target_calories } = req.body;
    const [updated] = await clients.update(
      { current_weight, current_height, target_weight, target_calories },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedRecord = await clients.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Client record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a client record by ID
exports.deleteClientRecord = async (req, res) => {
  try {
    const deleted = await clients.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Client record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};