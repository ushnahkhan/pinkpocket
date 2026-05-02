const Product = require("../models/product");

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.addProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
};
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};