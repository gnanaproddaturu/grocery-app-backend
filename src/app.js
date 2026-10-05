

const exprss = require("express")
const productRoutes = require("./routes/productRoutes")
const path = require("path")
const adminRouters = require("./routes/adminRoutes")
const emailRouters = require("./routes/emilRoutes")
const cartRouters = require("./routes/cartRoutes")

const app = exprss()


 app.use(exprss.json())
 app.use("/uploads/products",exprss.static(path.join(__dirname,"uploads/products")))
 app.use("/api" , productRoutes)
 app.use("/admin",adminRouters)
 app.use("/email" , emailRouters)
 app.use("/cart" , cartRouters)
 

 
 app.get("/" ,(req,res)=>{
    res.json({
        message : "app run here"
    })
 })
 




module.exports=app


//Se1LeqvffQ10NT5x
//gnanaproddaturu_db_user