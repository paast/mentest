
const { Run } = require('../models');

///////////////////

const getIndex = (req, res, next) => {
  res.send('api');
};

const getDocs = (req, res, next) => {
  res.send('docs');
};

const getAllRuns = async (req, res, next) => {
  
  const runs = await Run.find({});

  if (!runs || runs.length == 0) {
    res.send({ runs: null });
  } else {
    res.send({ runs: runs});
  }
};

const getRunById = async (req, res, next) => {

  const { runId } = req.params;

  const run = await Run.findById(runId);
  res.send({ run: run });
};

const addRun = async (req, res, next) => {

  const { requestObject } = req.body;
  requestObject.startTime = Date.now();

  const run = await Run.create(requestObject);
  res.send({ run: run });
};

const startThread = async (req, res, next) => {

  const { runId } = req.params;

  const run = await Run.findById(runId);
  const { thread } = await run.genThread();
  res.send({ threadId: thread._id });

};

const endThread = async (req, res, next) => {

  const { runId, threadId } = req.params;

  const run = await Run.findById(runId);
  const { success } = await run.endThread(threadId);
  res.send({ success: success });
};

const addSpecToRun = async (req, res, next) => {

  const { runId } = req.params;
  const { requestObject } = req.body;
  
  console.log(requestObject);

  const run = await Run.findById(runId);

  const success = await run.addSpec(requestObject);
  res.send({ success: success });
};

const addScreenshotToRun = (req, res, next) => {

  // pull screenshot from request
  // pull runId from request
  // if no screenshot, return 400 (no screenshot provided)

  // try await addScreenshot(runId, screenshot)
  // if error, return 500 (error)

  // (else) return 200

};

const addScreenshotsToRun = (req, res, next) => {

  // pull screenshots from request
  // pull runId from request
  // if no screenshots, return 400 (no screenshots provided)

  // try screenshots.forEach(await addScreenshot(runId, screenshot))
  // if error, return 500 (error)

  // (else) return 200

};

///////////////////

async function addScreenshot(runId, screenshot) {

  // get run by runId
  // if !run, return error (invalid runId)

  // use screenshot.path[] to query test object within run
  // if !test, return error (invalid test path for run ${run.runId})

  // using runId & testId, create URL, write file to URL & set test.screenshotUrl = `/ss/${runId}/${testId}.png`
  // if error, return error (failed to set test.screenshotUrl for ${runId}/${testId})

  // return success
  
}

///////////////////

module.exports = {
  getIndex,
  getDocs,
  getAllRuns,
  getRunById,
  addRun,
  startThread,
  endThread,
  addSpecToRun,
  addScreenshotToRun,
  addScreenshotsToRun
}
