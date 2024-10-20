const express = require('express');
const router = express.Router();
const nutritionistClientsController = require('../controllers/nutritionist_clients');

router.post('/', nutritionistClientsController.createNewPair);
router.get('/clientId/:clientId',nutritionistClientsController.getPairingByClientId);
router.delete('/delete/:clientId', nutritionistClientsController.deletePairingByClientId);

module.exports = router;