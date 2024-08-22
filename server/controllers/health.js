const sequelize = require('../config/database'); // Adjust the path as necessary
const { health } = require('../models/init-models')(sequelize); // Adjust the path as necessary

// Create a new health record
exports.createHealthRecord = async (req, res) => {
  try {
    const { user_id, current_weight, current_height, target_weight, target_calories } = req.body;
    const newHealthRecord = await health.create({ user_id, current_weight, current_height, target_weight, target_calories });
    res.status(201).json(newHealthRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all health records
exports.getAllHealthRecords = async (req, res) => {
  try {
    const allHealthRecords = await health.findAll();
    res.status(200).json(allHealthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a health record by ID
exports.getHealthRecordById = async (req, res) => {
  try {
    const record = await health.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a health record by ID
exports.updateHealthRecord = async (req, res) => {
  try {
    const { current_weight, current_height, target_weight, target_calories } = req.body;
    const [updated] = await health.update(
      { current_weight, current_height, target_weight, target_calories },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedRecord = await health.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a health record by ID
exports.deleteHealthRecord = async (req, res) => {
  try {
    const deleted = await health.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};