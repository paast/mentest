const mongoose = require('mongoose');
const suiteSchema = require('./suite');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  name: String,
  runId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'started', 'finished', 'error']
  },
  isParallel: {
    type: Boolean,
    required: true,
    default: false
  },
  threadCount: {
    type: Number,
    default: 1
  },
  totalPass: {
    type: Number,
    default: 0
  },
  totalFail: {
    type: Number,
    default: 0
  },
  startTime: Date,
  endTime: Date,
  specs: [suiteSchema]
});

runSchema.virtuals = {

}

runSchema.methods = {
  return Test.findById(id)
  .catch(err => {
    console.error(err);
    return err.message;
  });
};

runSchema.statics = {
  getById: id => {

  }
};

runSchema.set('toObject', { virtuals: true });
runSchema.set('toJSON', { virtuals: true });

/////

module.exports = runSchema;
