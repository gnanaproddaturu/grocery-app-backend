


const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")

dotEnv.config()


exports.adminMiddleware =(req , res , next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message : "token required/wrong token.." })
    }

    try {
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        req.admiId = decode.adminId
        next()
    } catch (error) {
        return res.status(403).json({message : "invalid Token"})
    }
}