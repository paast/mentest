const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/////

const threadSchema = new Schema({
  state: {
    required: true,
    type: String,
    enum: ['created', 'done', 'error']
  }
});

/////

module.exports = threadSchema;