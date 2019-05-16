const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  media: {
    data: Buffer,
    name: String,
    contentType: String
  }
});

mediaSchema.methods = {

};

mediaSchema.statics = {

};

/////

module.exports = mediaSchema;
