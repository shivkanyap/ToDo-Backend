'use strict';

let mongoose = require('mongoose');

let User = new mongoose.Schema({
  firstName:{
    type:String,
    default:""
  },
  lastName:{
    type:String,
    default:""
  },
  email:{
    type:String,
    default:""
  },
  password:{
    type:String,
    default:""
  },
  token:{
    type:String,
    default:""
  },
  status:{
    type:String,
    default:""
  },
  role:{
    type:String,
    default:""
  },
})


let user = new mongoose.model('user',User);
module.exports = user;