
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: {
    type: String,
    requird: true
  },
  owner: String,
  startTime: Date,
  endTime: Date,
  tads: [Number]
});

testSchema.set('toObject', { virtuals: true });
testSchema.set('toJSON', { virtuals: true });

testSchema.virtual('elapsedTime').get(function() {
  return (this.endTime - this.startTime);
});

testSchema.methods = {

};

testSchema.statics =  {

};

///////////////////

const Test = mongoose.model('Test', testSchema);


// TODO: staticify these

const getAll = () => {
  return Test.find({})
  .catch(err => {
    console.error(err);
    return err.message;
  });
};

const getById = (id) => {
  return Test.findById(id)
  .catch(err => {
    console.error(err);
    return err.message;
  });
};

// TODO: methodify this

const add = (obj) => {
  return new Test(obj).save()
  .catch(err => {
    console.error(err);
    return err.message;
  });
};

module.exports = {
  getAll,
  getById,
  add
};
