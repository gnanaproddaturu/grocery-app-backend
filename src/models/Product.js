


const mongoose = require("mongoose")

const Category_Enum =[
    "vagetables", "fruits" , "food-grains",
]
const Unit_enum = [
    "500g" ,"1kg" , "2kg","5kg"
]

const productSchema = new mongoose.Schema({
    name : {
        type  : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    price:{
        type : Number
    },
    category : {
        type : String,
        values : Category_Enum
    },
    unit : {
        type : String,
        values : Unit_enum
    },
    image : {
        type : String
    },
    isActive :{
        type : String
    }
},{timestamps: true});


module.exports = mongoose.model ("Product",productSchema);