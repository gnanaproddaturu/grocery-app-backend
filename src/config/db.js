


const mongoose = require("mongoose")


const connectDB=async()=>{
    try {
        const connection = await mongoose.connect(process.env.MOGO_URI)
        console.log(`mongoDB connected : ${connection.connection.host}`)
    } catch (error) {
        console.log(`mongoDB connection filled : ${error.message}`)
        throw error;
    }
}

module.exports = connectDB