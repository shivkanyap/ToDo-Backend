const mongoose = require('mongoose');

let to_do_app = new mongoose.Schema({
  title:{
    type:String,
    default:""
  },
  body:{
    type:String,
    default:""
  }
})

let to_do = new mongoose.model('to_do_app',to_do_app);
module.exports = to_do;