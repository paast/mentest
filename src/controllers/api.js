
const { Run } = require('../models');

///////////////////

const getIndex = (req, res, next) => {
  res.send('api');
};

const getAllRuns = async (req, res, next) => {
  const models = await Run.find({});
  if (!!models && models.length > 0) {
    res.send(models);
  } else {
    res.send('no tests :(');
  }
};

const getRunById = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;
  if (id) {
    const run = await Run.getById(id);
    res.send({run: run});
  } else {
    console.error('BACK: ' + 'improper request');
    res.send('improper request');
  }
};

const addRun = async (req, res, next) => {
  const requestObject = req.body.run ? req.body.run : null

  requestObject['status'] = 'created';
  requestObject['startTime'] = Date.now();
  requestObject['extra'] = 'test';

  Run.create(requestObject, (err, run) => {
    if (err) {error: res.status(500).json({ error: err.message }) }
    else { res.send({ run: run }) }
  });
};

const addSpecToRun = async (req, res, next) => {

}

///////////////////

module.exports = {
  getIndex,
  getAllRuns,
  getRunById,
  addRun,
  addSpecToRun
}
