const mongoose = require("mongoose");
mongoose.pluralize(null);

const empschema = new mongoose.Schema({
  is_admin: {type:Boolean, default:false},
  id: {type:String, unique:true},
  name: String,
  email: {type:String, unique:true},
  desigation: String,
  joined_on: {type:String, default: Date.now().toString()},
  password:String,
});

const empModel=mongoose.model('employee',empschema)
module.exports=empModel
