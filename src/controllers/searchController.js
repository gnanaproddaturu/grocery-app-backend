const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: "Search not found"
            });
        }

        const products = await Product.find({
            name: {
                $regex: search,
                $options: "i"
            }
        });

        return res.status(200).json({
            search: products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};