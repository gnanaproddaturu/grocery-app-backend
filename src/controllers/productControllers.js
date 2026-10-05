const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            desc,
            category,
            price,
            unit,
        } = req.body;

        const image = req.file
            ? `/uploads/products/${req.file.filename}`
            : null;

        const product = await Product.create({
            name,
            desc,
            category,
            price,
            unit,
            image,
        });

        return res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message: "Failed to add product",
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const newProducts = await Product.find();

        return res.status(200).json({
            message: "success",
            newProducts,
        });
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};