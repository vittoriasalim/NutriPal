const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health');

router.post('/', healthController.createHealthRecord);
router.get('/', healthController.getAllHealthRecords);
router.get('/:id', healthController.getHealthRecordById);
router.put('/:id', healthController.updateHealthRecord);
router.delete('/:id', healthController.deleteHealthRecord);

module.exports = router;