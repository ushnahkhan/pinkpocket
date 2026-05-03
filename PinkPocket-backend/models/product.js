const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String,
    stock: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);