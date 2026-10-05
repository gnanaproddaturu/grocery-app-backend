
const app = require("./app")
const dotEnv = require("dotenv")
const connectDB = require("./config/db")


const PORT = process.env.PORT || 3000

dotEnv.config()


const startServer =async()=>{
    try {
        await connectDB()
        app.listen(PORT ,()=>{
            console.log(`app run in${PORT}`)
        })
    } catch (error) {
        console.log(`server startup failed`,error.message)
        process.exit(1)
    }
}



startServer()