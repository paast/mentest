const axios = require('axios');

///// GET

const getIndex = (req, res, next) => {
  res.render('base', { title: 'mentest' });
};

const getRunForm = (req, res, next) => {
  res.render('run-add', { title: 'add run' });
};

const getRuns = async (req, res, next) => {
  res.render('run-list', { title: 'list run' });
};

const getRunById = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;

  if (!id) { res.status(500).end() }

  const response = await axios.get(`http://localhost:3000/api/run/${id}`);
  const run = response.data.test ? response.data.test : null;

  if (!run) { res.status(404).end() }

  res.render('run-detail', { title: 'run detail', run: run });
};

const getSpecForm = (req, res, next) => {
  res.render('spec-add', { title: 'add spec' });
};

///// POST

const postRunForm = async (req, res, next) => {
  const name = req.body.name ? req.body.name : null;
  const runId = req.body.runId ? req.body.runId : null;
  const isParallel = req.body.isParallel ? true : false;
  const threadCount = req.body.threadCount ? req.body.threadCount : null;

  const requestObject = {
    run: {
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
    return;
  }

  const run = responseObject.data.run ? responseObject.data.run : null;

  if (!run) {
    res.render('error/500', {error: 'api error'})
  }
  res.redirect(`/run/${run.id}`);
};

const postSpecForm = (req, res, next) => {

};

/////

module.exports = {
  getIndex,
  getRunForm,
  getRuns,
  getRunById,
  getSpecForm,
  postRunForm,
  postSpecForm
}
