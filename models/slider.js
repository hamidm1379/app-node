const mongoose=require('mongoose');
const Schema=mongoose.Schema

let newSldier=new Schema({
    name:{type:String,required:true},
    title:{type:String},
    url:{type:String,required:true},
    imageSlider:{type:String}
},{timestamps:true})

module.exports=mongoose.model("slider",newSldier)


