const Order = require("../models/order");

exports.placeOrder = async (req, res) => {
    const order = await Order.create({
        user: req.user._id,
        items: req.body.items,
        total: req.body.total
    });

    res.json(order);
};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    res.json(orders);
};