//Importing
const mongoose= require ("mongoose")
//connect Database
mongoose.connect("mongodb+srv://bilkees:bilkees@cluster0.urlh5.mongodb.net/?retryWrites=true&w=majority")
//Schema
const Schema=mongoose.Schema;
var courseSchema=new Schema({
    cName:String,
    cDesc:String,
    cDuration:Number,
    cStartdate:Date,
    cPrice:Number
})
var CourseInfo=mongoose.model("ictcourses",courseSchema)
module.exports= CourseInfo
