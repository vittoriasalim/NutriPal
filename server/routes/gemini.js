// routes/geminiRoutes.js
const express = require('express');
const geminiController = require('../controllers/gemini');

const router = express.Router();

router.post('/query', geminiController.queryGemini);
router.post('/query/:id', geminiController.retrieveAndGenerate);

module.exports = router;