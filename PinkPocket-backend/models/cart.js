const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // one cart per user
    },
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);