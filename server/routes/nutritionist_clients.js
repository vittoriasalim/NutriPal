const express = require('express');
const router = express.Router();
const nutritionistClientsController = require('../controllers/nutritionist_clients');

router.post('/', nutritionistClientsController.createNewPair);

module.exports = router;