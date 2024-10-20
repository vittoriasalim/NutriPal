const sequelize = require('../config/database'); // Adjust the path as necessary
const { nutritionists } = require('../models/init-models')(sequelize);  // Import the nutritionists model (adjust path as needed)

// Create a new nutritionist
exports.createNutritionist = async (req, res) => {
  try {
    const {
      userId,
      specialisation,
      qualifications,
      availability
    } = req.body;

    // Create a new nutritionist record
    const newNutritionist = await nutritionists.create({
      userId,
      specialisation,
      qualifications,
      availability
    });

    res.status(201).json(newNutritionist);  // Respond with the newly created nutritionist
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while creating the nutritionist.' });
  }
};

// Get all nutritionists
exports.getAllNutritionists = async (req, res) => {
  console.log("GETTING NUTRITIONISTS")
  try {
    const allNutritionists = await nutritionists.findAll();
    res.status(200).json(allNutritionists);  // Respond with all nutritionist records
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the nutritionists.' });
  }
};

// Get a specific nutritionist by ID
exports.getNutritionistById = async (req, res) => {
  try {
    const { id } = req.params;

    const nutritionist = await nutritionists.findByPk(id);

    if (!nutritionist) {
      return res.status(404).json({ error: 'Nutritionist not found.' });
    }

    res.status(200).json(nutritionist);  // Respond with the nutritionist record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the nutritionist.' });
  }
};

// Get a specific nutritionist by userID
exports.getNutritionistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch nutritionist by userID
    const nutritionist = await nutritionists.findOne({ where: { userId } });

    // If no nutritionist is found, respond with a 404 status
    if (!nutritionist) {
      return res.status(404).json({ error: 'Nutritionist not found.' });
    }

    // Return the found nutritionist
    return res.status(200).json(nutritionist);
    
  } catch (error) {
    // In case of server error, return status 500
    return res.status(500).json({ error: error.message || 'Error fetching nutritionist.' });
  }
};

// Update a specific nutritionist by ID
exports.updateNutritionistById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      specialisation,
      qualifications,
      availability
    } = req.body;

    const nutritionist = await nutritionists.findByPk(id);

    if (!nutritionist) {
      return res.status(404).json({ error: 'Nutritionist not found.' });
    }

    // Update the nutritionist record
    nutritionist.userId = userId || nutritionist.userId;
    nutritionist.specialisation = specialisation || nutritionist.specialisation;
    nutritionist.qualifications = qualifications || nutritionist.qualifications;
    nutritionist.availability = availability || nutritionist.availability;

    await nutritionist.save();  // Save the updated nutritionist information

    res.status(200).json(nutritionist);  // Respond with the updated nutritionist record
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while updating the nutritionist.' });
  }
};

// Delete a nutritionist by ID
exports.deleteNutritionistById = async (req, res) => {
  try {
    const { id } = req.params;

    const nutritionist = await nutritionists.findByPk(id);

    if (!nutritionist) {
      return res.status(404).json({ error: 'Nutritionist not found.' });
    }

    await nutritionist.destroy();  // Delete the nutritionist record

    res.status(200).json({ message: 'Nutritionist deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while deleting the nutritionist.' });
  }
};