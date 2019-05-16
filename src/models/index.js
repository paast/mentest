const mongoose = require('mongoose');
const runSchema = require('./schemas/run');
const mediaSchema = require('./schemas/media');

const Run = mongoose.model('Run', runSchema);

const Media = mongoose.model('Media', mediaSchema);

module.exports = {
  Run,
  Media
}
