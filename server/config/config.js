require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  gemini: {
    geminiApiKey: process.env.GEMINI_API_KEY,  // Store in .env
    geminiApiBaseUrl: process.env.GEMINI_API_BASE_URL || 'https://api.gemini.com/v1',  // Use environment variable or fallback to default
  },
};