


const User = require("../models/User")

const {generateOtp} = require("../config/generateOtp")
const {sendOtpEmail} = require("../config/mail")
const jwt = require("jsonwebtoken")
exports.sendOtp = async(req,res)=>{
    try{
        const {name , email} = req.body;
        if(!email){
            return res.status(400).json({message : "Email required"})
        }
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({name , email})
        }
        const otp = generateOtp()
        user.otp = otp
        user.otpExpires = Date.now()+5*60*1000
        await user.save()
        await sendOtpEmail(email , otp)

        return res.status(200).json({
            success : true,
            message :"OTP send to your email",
            name 
    })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message})
    }
}


exports.verifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({message : "Email and Otp are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        if(!user.otp || user.otp !== otp){
            return res.status(400).json({message : "Inavlid otp"})
        }
        if(user.otpExpires <Date.now()){
            return res.status(400).json({message : "Invalid expired"})
        }
        user.otp = undefined
        user.otpExpires = undefined
        await user.save()
        const token = jwt.sign(
            {
                _id : user._id , email: user.email
            },process.env.JWT_SECRET,{expiresIn : "1d"}
        )
        return res.json({success :true , token})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}