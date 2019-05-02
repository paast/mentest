
const express = require('express');
const { apiController } = require('../controllers');

///////////////////

router = express.Router();
router.use(express.json());

router.get('/', apiController.getIndex);
router.get('/run', apiController.getAllRuns);
router.get('/run/:id', apiController.getRunById);

router.post('/run', apiController.addRun);
router.post('/run/:id/spec', apiController.addSpecToRun);

///////////////////

module.exports = router;
