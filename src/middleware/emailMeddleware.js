





const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")

dotEnv.config()


exports.emilMiddleware =(req , res , next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message : "token required/wrong token.." })
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.userId = decoded._id
        req.userEmail = decoded.email
        next()
    } catch (error) {
        return res.status(403).json({message : "invalid Token or expird token"})
    }
}