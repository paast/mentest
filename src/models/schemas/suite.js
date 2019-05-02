const mongoose = require('mongoose');
const testSchema = require('./test');
const Schema = mongoose.Schema;

const suiteSchema = new Schema({
  name: String,
  suites: [this],
  tests: [testSchema]
});

suiteSchema.virtuals = {

}

suiteSchema.methods = {

};

suiteSchema.statics = {

};

/////

module.exports = suiteSchema;
