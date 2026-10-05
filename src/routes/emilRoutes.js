

const emialController = require("../controllers/emailControllers")
const express = require("express")

const router = express.Router()

router.post("/send-otp" , emialController.sendOtp)
router.post("/verify-otp", emialController.verifyOtp)


module.exports = router