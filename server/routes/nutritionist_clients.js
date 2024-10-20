const express = require('express');
const router = express.Router();
const nutritionistClientsController = require('../controllers/nutritionist_clients');

router.post('/', nutritionistClientsController.createNewPair);
router.get('/clients/:nutritionistId', nutritionistClientsController.getClientsByNutritionistId);
router.get('/nutri/:clientId', nutritionistClientsController.getNutritionistsByClientId);
module.exports = router;