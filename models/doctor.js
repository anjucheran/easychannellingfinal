const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema({
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  contact: String,
  birthday: Date,
  gender : String,
  nic : String,
  address : String,
  city : String,
  slmaceg : String,
  //category : String,
});

module.exports = mongoose.model('Doctor', Doctor);