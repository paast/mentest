const mongoose = require('mongoose');
const runSchema = require('./schemas/run');

const Run = mongoose.model('Run', runSchema);

module.exports = {
  Run
}
