const sequelize = require('../config/database'); // Adjust the path as necessary
const { daily_nutrition } = require('../models/init-models')(sequelize);  // Import the models (adjust path as needed)
const { Op, Sequelize } = require('sequelize');


// Helper function to get the day of the week from a date (Mon, Tue, etc.)
const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = new Date(date).getDay();  // Get the day index (0 = Sunday, 6 = Saturday)
  return daysOfWeek[dayIndex];  // Return the day abbreviation
};



// Helper function to generate an array of the last 14 dates
const getLast14Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - i);
    dates.push(pastDate.toISOString().split('T')[0]);  // Store as YYYY-MM-DD
  }

  return dates;
};


// Get daily nutrition records for the past 14 days (create missing ones) for a specific client
exports.getDailyNutritionLast14Days = async (req, res) => {
    try {
      const { id: clientId } = req.params;  // Get clientId from request params (id is provided by URL)
  
      // Get the last 14 days
      const last14Days = getLast14Days();

  
      // Find records in the database for the last 14 days and for the specified clientId
      const existingRecords = await daily_nutrition.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.cast(Sequelize.col('date'), 'DATE'), {
              [Op.in]: last14Days,
            }),
            { clientId }
          ]
        }
      });
  
  
      // Extract the dates that already have records
      const existingDates = existingRecords.map(record => record.date.toISOString().split('T')[0]);
  
  
      // Find the missing dates (those that don't have records yet)
      const missingDates = last14Days.filter(date => !existingDates.includes(date));
  
      // Create records for the missing dates for the given clientId
      const newRecords = await Promise.all(
        missingDates.map(async (date) => {
          return await daily_nutrition.create({
            date,
            totalCalorie: 0,  // Default value (adjust as needed)
            totalProtein: 0,  // Default value (adjust as needed)
            totalFats: 0,     // Default value (adjust as needed)
            totalCarbohydrate: 0,  // Default value (adjust as needed)
            clientId  // Include clientId
          });
        })
      );
  
      // Combine existing and newly created records
      const allRecords = [...existingRecords, ...newRecords];
  
      // Sort by date in descending order (most recent first)
      allRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Add the day of the date to each record in the response
      const formattedRecords = allRecords.map(record => ({
        id:record.id,
        date: record.date.toISOString().split('T')[0],  // Keep date in YYYY-MM-DD format
        day: getDayOfWeek(record.date),  // Add the day (1-31)
        totalCalorie: record.totalCalorie,
        totalProtein: record.totalProtein,
        totalFats: record.totalFats,
        totalCarbohydrate: record.totalCarbohydrate,
        clientId: record.clientId
      }));
  
    
  
      res.status(200).json(formattedRecords);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Something went wrong while fetching or creating records.' });
    }
  };

// Create a new daily nutrition record
exports.createDailyNutrition = async (req, res) => {
  try {
    const { clientId, date, totalCalorie, totalProtein, totalFats, totalCarbohydrate } = req.body;
    
    // Create the record
    const dailyNutrition = await daily_nutrition.create({
      clientId,  // Ensure clientId is included
      date,
      totalCalorie,
      totalProtein,
      totalFats,
      totalCarbohydrate
    });

    res.status(201).json(dailyNutrition);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while creating the record.' });
  }
};

// Get all daily nutrition records (optionally by client)
exports.getAllDailyNutrition = async (req, res) => {
  try {
    const { clientId } = req.query;  // Optionally filter by clientId

    const dailyNutritionList = await daily_nutrition.findAll({
      where: clientId 
    });
    
    res.status(200).json(dailyNutritionList);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the records.' });
  }
};

// Get a specific daily nutrition record by ID
exports.getDailyNutritionById = async (req, res) => {
  try {
    const id = req.params.id;
    const dailyNutrition = await daily_nutrition.findByPk(id);

    if (!dailyNutrition) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    res.status(200).json(dailyNutrition);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while fetching the record.' });
  }
};

// Update a specific daily nutrition record by ID
exports.updateDailyNutrition = async (req, res) => {
  try {
    const id = req.params.id;
    const { totalCalorie, totalProtein, totalFats, totalCarbohydrate } = req.body;

    const dailyNutrition = await daily_nutrition.findByPk(id);
    if (!dailyNutrition) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    // Update the record
    dailyNutrition.totalCalorie = totalCalorie + dailyNutrition.totalCalorie;
    dailyNutrition.totalProtein = totalProtein + dailyNutrition.totalProtein;
    dailyNutrition.totalFats = totalFats + dailyNutrition.totalFats;
    dailyNutrition.totalCarbohydrate = totalCarbohydrate + dailyNutrition.totalCarbohydrate;

    await dailyNutrition.save();
    res.status(200).json(dailyNutrition);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while updating the record.' });
  }
};

// Delete a specific daily nutrition record by ID
exports.deleteDailyNutrition = async (req, res) => {
  try {
    const id = req.params.id;
    const dailyNutrition = await daily_nutrition.findByPk(id);
    if (!dailyNutrition) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    await dailyNutrition.destroy();
    res.status(200).json({ message: 'Record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong while deleting the record.' });
  }
};