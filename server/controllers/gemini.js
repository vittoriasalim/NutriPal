// controllers/geminiController.js
const sequelize = require('../config/database');
const geminiService = require('../services/geminiService');

const { users,clients } = require('../models/init-models')(sequelize);

exports.queryGemini = async (req, res) => {
  const userQuery = req.body.query; // Assuming the user's query is in the request body
  console.log(userQuery);

  try {
    const geminiResponse = await geminiService.queryGeminiApi(userQuery);
    console.log(geminiResponse);
    res.status(200).json({ result: geminiResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error querying Gemini LLM' });
  }
};
exports.retrieveAndGenerate = async (req, res) => {
    const userQuery = req.body.query;
    const userId = req.params.id;
    console.log(userQuery);
  
    try {
      const userInfo = await users.findByPk(userId);
      if (!userInfo) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const clientInfo = await clients.findOne({ where: { userId: userId } });
      if (!clientInfo) {
        return res.status(404).json({ error: 'Client info not found' });
      }
  
      const geminiResponse = await geminiService.queryRAGSystem(userQuery,userInfo,clientInfo);
      console.log(geminiResponse);
      res.status(200).json({ result: geminiResponse });
    } catch (error) {
      console.error('Error querying Gemini LLM:', error);
      res.status(500).json({ error: 'Error querying Gemini LLM' });
    }
  };