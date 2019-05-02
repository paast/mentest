
const express = require('express');
const { appController } = require('../controllers');

///////////////////

const router = express.Router();
router.use(express.urlencoded({extended: true}))

router.get('/', appController.getIndex);
router.get('/run', appController.getRunForm);
router.get('/runs', appController.getRuns);
router.get('/run/:id', appController.getRunById);
router.get('/spec', appController.getSpecForm);

router.post('/run', appController.postRunForm);
router.post('/spec', appController.postSpecForm);

///////////////////

module.exports = router;
