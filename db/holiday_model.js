const mongoose=require('mongoose')
mongoose.pluralize(null);

const holidayschema=new mongoose.Schema({
    name: {type:String, },
    date: {type:String, default:"Not Found!",unique:true},
    day: String,
})

module.exports=mongoose.model('holidays',holidayschema)