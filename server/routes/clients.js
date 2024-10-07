const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');

router.post('/', clientsController.createClientRecord);
router.get('/', clientsController.getAllClientRecords);
router.get('/:id', clientsController.getClientRecordById);
router.put('/:id', clientsController.updateClientRecord);
router.delete('/:id', clientsController.deleteClientRecord);

module.exports = router;