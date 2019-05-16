
const express = require('express');
const { appController } = require('../controllers');

///////////////////

const router = express.Router();
router.use(express.urlencoded({extended: true}))

router.get('/', appController.getIndex);
router.get('/run', appController.getRunForm);
router.get('/runs', appController.getRuns);
router.get('/run/:runId', appController.getRunById);
router.get('/spec', appController.getSpecForm);
router.get('/run/:runId/thread', appController.getGenThread);
router.get('/run/:runId/thread/:threadId', appController.getEndThread)

router.post('/run', appController.postRunForm);
router.post('/spec', appController.postSpecForm);
router.post('/run/:runId/thread', appController.postGenThread);
router.post('/run/:runId/thread/:threadId', appController.postEndThread);

///////////////////

module.exports = router;
