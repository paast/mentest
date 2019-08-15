const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: ['pass', 'fail', 'pend']
  },
  screenshotUrl: String
});

testSchema.methods = {

};

testSchema.statics = {

};

/////

module.exports = testSchema;
