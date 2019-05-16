
const express = require('express');
const { apiController } = require('../controllers');

///////////////////

router = express.Router();
router.use(express.json({ limit: '5mb' }));

router.get('/', apiController.getIndex);
router.get('/run', apiController.getAllRuns);
router.get('/run/:runId', apiController.getRunById);

router.post('/run', apiController.addRun);
router.post('/run/:runId/thread/', apiController.startThread);
router.post('/run/:runId/thread/:threadId', apiController.endThread);
router.post('/run/:runId/spec', apiController.addSpecToRun);

///////////////////

module.exports = router;
