const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages');

// Route to send a message between a nutritionist and a client
router.post('/', messageController.sendMessage);

// Route to get all messages between a nutritionist and a client
router.get('/conversation/:nutritionistId/:clientId', messageController.getConversation);

// Route to delete a specific message by ID
router.delete('/:id', messageController.deleteMessage);

// Route to get all messages for a specific client
router.get('/client/:clientId', messageController.getClientMessages);

// Route to get all messages for a specific nutritionist
router.get('/nutritionist/:nutritionistId', messageController.getNutritionistMessages);

module.exports = router;