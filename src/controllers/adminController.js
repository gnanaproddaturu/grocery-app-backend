

const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.adminRegister = async(req,res)=>{
    try {
        const {name , email , password} = req.body
        const adminRecord = await Admin.findOne({email})
        if(adminRecord){
            return res.status(400).json({message : "email already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const admin = await Admin.create({
            name,email,password : hashedPassword
        })
        return res.status(201).json({message : "admin registered"})
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}



exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminRecord = await Admin.findOne({ email });

        if (!adminRecord) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            adminRecord.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                adminId: adminRecord._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};