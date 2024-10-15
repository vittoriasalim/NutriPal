const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');


router.post('/', clientsController.createClient);
router.get('/', clientsController.getAllClients);
router.get('/user/:id', clientsController.getClientByUserId);

module.exports = router;