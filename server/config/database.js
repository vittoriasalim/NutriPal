require('dotenv').config(); // Load environment variables from .env

const { Sequelize } = require('sequelize');

// Construct the DATABASE_URL dynamically using environment variables
const databaseUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;

// Initialize Sequelize with the constructed URL and additional settings
const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    define: {
        schema: process.env.DB_SCHEMA, // Use schema from .env or default to 'public'
    },
    logging: false, // Disable logging; set to true to see SQL queries
});

module.exports = sequelize;