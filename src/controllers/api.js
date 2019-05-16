
const { Run } = require('../models');

///////////////////

const getIndex = (req, res, next) => {
  res.send('api');
};

const getAllRuns = async (req, res, next) => {
  const models = await Run.find({});
  if (!!models && models.length > 0) {
    res.send({ runs: models });
  } else {
    res.send({ runs: null });
  }
};

const getRunById = async (req, res, next) => {
  const { runId } = req.params;

  if (!runId) {
    res.send('improper request');
    return;
  }

  const run = await Run.getById(runId);

  if (run.error || !run) {
    res.send(run.error ? run.error : 'no run');
  } else {
    res.send(run);
  }
};

const addRun = (req, res, next) => {

  const { requestObject } = req.body;

  requestObject['status'] = 'started';
  requestObject['startTime'] = Date.now();

  Run.create(requestObject, (err, run) => {
    if (err) { res.send({ error: err }) }
    else { res.send({ run: run }) }
  });
};

const startThread = async (req, res, next) => {

  const { runId } = req.params;

  const response = await Run.getById(runId);
  if (!response) console.log('failed run get: ' + runId);
  const { run, error } = response;

  if (error) {
    res.send(error);
    return;
  }

  if (!run) {
    res.send('error, no run');
    return;
  }

  const { threadId, e } = run.genThread();
  
  console.log(threadId, e);
  res.send(threadId);

};

const endThread = async (req, res, next) => {

  const { runId, threadId } = req.params;

};

const addSpecToRun = async (req, res, next) => {

  const { requestObject } = req.body;
  const { runId } = req.params;

  if (!runId || !requestObject) {
    res.status(500).end();
  }

  const response = await Run.getById(runId);
  if (!response) {
    res.status(500).end();
  } else if (response.error) {
    res.status(400).send({ error: response.error });
  }

  const run = response.run;

  if (!run) {
    res.status(400).send('invalid run id');
  }

  const success = run.addSpec(requestObject);

  res.send('yo ' + success);
}

///////////////////

const errorTest = (req, res, next) => {
  const type = req.params.type ? req.params.type : null;

  console.log(type);

  switch (type) {
    case '500': res.status(500).send('test 500'); return;
    case '400': res.status(400).send('no record found with id 50'); return;
    default: res.status(200).send('test 500'); return;
  }
}

///////////////////

module.exports = {
  getIndex,
  getAllRuns,
  getRunById,
  addRun,
  startThread,
  endThread,
  addSpecToRun
}
