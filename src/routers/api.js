
const express = require('express');
const { apiController, testController } = require('../controllers');

///////////////////

router = express.Router();
router.use(express.json({ limit: '5mb' }));

router.get('/', wrapEndpoint(apiController.getIndex));
router.get('/docs', wrapEndpoint(apiController.getDocs));
router.get('/run', wrapEndpoint(apiController.getAllRuns));
router.get('/run/:runId', wrapEndpoint(apiController.getRunById));

router.get('/pdf-test', wrapEndpoint(testController.getPdfTest));
router.get('/getpdf', wrapEndpoint(testController.getPdf));

router.post('/run', wrapEndpoint(apiController.addRun));
router.post('/run/:runId/thread/', wrapEndpoint(apiController.startThread));
router.post('/run/:runId/thread/:threadId', wrapEndpoint(apiController.endThread));
router.post('/run/:runId/spec', wrapEndpoint(apiController.addSpecToRun));
router.post('/run/:runId/screenshot', wrapEndpoint(apiController.addScreenshotToRun));
router.post('/run/:runId/screenshots', wrapEndpoint(apiController.addScreenshotsToRun));

function wrapEndpoint(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: e.toString() });
    }
    res.end();
  }
}

///////////////////

module.exports = router;
