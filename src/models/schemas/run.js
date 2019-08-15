const mongoose = require('mongoose');
const suiteSchema = require('./suite');
const threadSchema = require('./thread');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  name: String,
  test: [String],
  runId: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  numThreads: {
    type: Number,
    default: 1
  },
  threads: [{
    type: threadSchema,
    select: false
  }],
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

runSchema.virtual('describe').set(function(describe) {
  const split = describe.split('<');
  this.name = split[0].trim();
  if (split[1]) {
    this.test = split[1].replace(/>| /g, '').split(',');
  }
});

runSchema.virtual('elapsedTime').get(function() {
  return (this.endTime - this.startTime)
});

runSchema.methods = {

  addSpec: async function(spec) {
    const threadId = spec.threadId;
    if (!threadId) throw 'could not add spec: no thread assigned';
    const thread = this.threads.id(threadId);
    if (!thread) throw `could not add spec: thread ${threadId} not found on run ${this._id}`;
    if (thread.isComplete) throw `could not add spec: thread ${threadId}  is locked`;

    this.specs.push(spec)
    await this.save();
    return { success: true }
  },

  genThread: async function(callback) {
    if (this.threads.length >= this.numThreads || this.finished) {
      throw 'thread count reached, no more being accepted'
    } 

    const thread = {
      _id: mongoose.Types.ObjectId(),
      state: 'created'
    }

    this.threads.push(thread);
    await this.save();

    const newThread = this.threads.id(thread._id);
    if (!newThread) throw 'thread failed to save';

    return { thread: newThread };
  },

  endThread: async function(threadId) {
    const thread = this.threads.id(threadId);
    if (!thread) throw 'no thread';
    thread.set({ isComplete: true });

    await this.save();
    await this.checkEnd();
    return { success: true }
  },

  checkEnd: async function() {
    const isFull = this.threads.length >= this.numThreads;
    let areDone = true;
    this.threads.forEach(thread => {
      if (!thread.isComplete) areDone = false;
    });

    if (isFull && areDone) {
      this.set({ isComplete: true, endTime: Date.now() });
      await this.save();
    }
  }
};

runSchema.statics = {

};

runSchema.set('toObject', { virtuals: true });
runSchema.set('toJSON', { virtuals: true });

/////

module.exports = runSchema;
