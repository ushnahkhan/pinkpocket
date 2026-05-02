const User = require("../models/user");
const Order = require("../models/order");

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};