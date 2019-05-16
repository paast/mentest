const mongoose = require('mongoose');
const suiteSchema = require('./suite');
const threadSchema = require('./thread');
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
  numThreads: {
    type: Number,
    default: 1
  },
  threads: [threadSchema],
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

runSchema.virtual('elapsedTime').get(function() {
  return (this.endTime - this.startTime)
});

runSchema.methods = {
  addSpec: function(spec) {
    try {
      this.specs.push(spec)
      this.save();
      return { run: this }
    } catch (e) {
      return { error: e }
    }
  },
  genThread: function() {
    if (this.threads.length >= this.numThreads) {
      return { e : 'thread count reached, no more being accepted'}
    } 
    try {
      thread = {
        _id: mongoose.Types.ObjectId(),
        state: 'created'
      }
      this.threads.push(thread);
      this.save();
      return { threadId: thread._id }
    } catch (e) {
      return { e: e }
    }
  }
};

runSchema.statics = {
  getById: function (id) {
    return this.findById(id)
      .then(run => {
        return { run: run }
      })
      .catch(e => {
        console.log('ERROR: ' + e)
        return { error: e }
    })
  }
};

runSchema.set('toObject', { virtuals: true });
runSchema.set('toJSON', { virtuals: true });

/////

module.exports = runSchema;
