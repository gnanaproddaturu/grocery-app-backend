

const controller = require("../controllers/cartControllers")
const express = require("express")
const email = require("../middleware/emailMeddleware")
const router = express.Router()


router.post("/add-to-cart" , email.emilMiddleware ,controller.addToCart)
router.get("/cart-details" , email.emilMiddleware,controller.getCartItems)
router.put("/update-cart", email.emilMiddleware, controller.updateQuantity)
router.delete("/delete/:productId", email.emilMiddleware, controller.removeFromCart)

module.exports = router