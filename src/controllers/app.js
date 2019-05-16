const axios = require('axios');
const fse = require('fse');

///// GET

const getIndex = (req, res, next) => {
  res.render('base', { title: 'mentest' });
};

const getRunForm = (req, res, next) => {
  res.render('run-add', { title: 'add run' });
};

const getRuns = async (req, res, next) => {

  const response = await axios.get('http://localhost:3000/api/run');
  const { runs } = response.data;

  res.render('run-list', { title: 'list run', runs: runs });
};

const getRunById = async (req, res, next) => {
  const { runId } = req.params;

  if (!runId) { res.status(500).end() }

  const response = await axios.get(`http://localhost:3000/api/run/${runId}`);
  const run = response.data.run ? response.data.run : null;

  if (!run) { res.status(404).end() }

  res.render('run-detail', { title: 'run detail', run: run });
};

const getSpecForm = (req, res, next) => {
  res.render('spec-add', { title: 'add spec' });
};

const getGenThread = async (req, res, next) => {
  res.render('gen-thread', { title: 'gen thread' });
};

const getEndThread = async (req, res, next) => {
  res.render('end-thread', { title: 'end thread' });
};

///// POST

const postRunForm = async (req, res, next) => {
  const { name, runId, isParallel, threadCount } = req.body;

  const requestObject = {
    requestObject: {
      name: name,
      runId: runId,
      isParallel: isParallel,
      threadCount: threadCount
    }
  };

  let responseObject;

  try {
    responseObject = await axios.post('http://localhost:3000/api/run', requestObject);
  } catch (e) {
    res.render('error/500', { error: e })
    return
  }

  const run = responseObject.data.run ? responseObject.data.run : null;
  const err = responseObject.data.error ? responseObject.data.error : null;

  if (err) {
    res.render('error/500', { error: err.message });
  } else {
    res.redirect(`/run/${run.id}`);
  }
};

const postSpecForm = async (req, res, next) => {
  const runId = req.body.runId ? req.body.runId : null;

  const requestObject = {
    requestObject: generateSuite(4)
  };
  const response = await axios.post(`http://localhost:3000/api/run/${runId}/spec`, requestObject);
  
  res.send(response.data);
};

const postGenThread = async (req, res, next) => {

  const { runId } = req.params;

  const response = await axios.post(`http://localhost:3000/api/run/${runId}/thread`);
  const { threadId } = response.data;

  res.send(response.data);
};

const postEndThread = async (req, res, next) => {

  const { runId, threadId } = req.params;

  const response = await axios.post(`http://localhost:3000/api/run/${runId}/thread/${threadId}`);
  const { success } = response.data;

  res.redirect(`/run/${runId}`);
};

/////

function generateSuite(depthLimit) {

  const name = generateName();
  const tests = generateTests(5);
  let suites = [];
  if (depthLimit > 0) {
    n = randRange(1, 4)
    for (let i = 0; i < n; i++) {
      suites.push(generateSuite(depthLimit - 1))
    }
  }

  return { name: name, tests: tests, suites: suites };
}

function generateTests(n) {

  const stati = ['pass', 'fail', 'pend'];
  const tests = [];
  for (i = 0; i < n; i++) {
    status = randomChoice(stati);
    let screenshot = null;
    // if (status === 'fail') {
    //   let data;
    //   try {
    //     data = fse.readFileSync('fail.png');
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   screenshot = {
    //     name: generateName(),
    //     contentType: 'image/jpeg',
    //     data: data
    //   }
    // }
    tests.push({ status: randomChoice(stati), screenshot: screenshot });

  }
  return tests;
}

function generateName() {
  return Math.floor(Math.random() * 100000).toString();
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/////

module.exports = {
  getIndex,
  getRunForm,
  getRuns,
  getRunById,
  getSpecForm,
  getGenThread,
  getEndThread,
  postRunForm,
  postSpecForm,
  postGenThread,
  postEndThread
}
