const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/////

const threadSchema = new Schema({
  isComplete: {
    required: true,
    type: Boolean,
    default: false
  }
});

/////

module.exports = threadSchema;