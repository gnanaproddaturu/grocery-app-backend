


const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const emailRoutes = require("./routes/emilRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(
    "/uploads/products",
    express.static(
        path.join(__dirname, "uploads/products")
    )
);

app.use("/api", productRoutes);

app.use("/admin", adminRoutes);

app.use("/email", emailRoutes);

app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "app run here",
    });
});

module.exports = app;