const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');

// Create a new client
router.post('/', clientsController.createClient);

// Get all clients
router.get('/', clientsController.getAllClients);


// Optionally, if you want to retrieve a client by client ID
router.get('/:id', clientsController.getClientById);

// Other CRUD routes as needed
router.put('/:id', clientsController.updateClientById);
router.delete('/:id', clientsController.deleteClientById);


router.get('/user/:id', clientsController.getClientByUserId);

module.exports = router;