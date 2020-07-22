var mongoose  =  require('mongoose');

const csvSchema = new mongoose.Schema({
    _id : Number,
    name : String,
    rating : String,
    RAM : Number,
    ROM : Number,
    price : Number
  });

module.exports = mongoose.model('products',csvSchema);