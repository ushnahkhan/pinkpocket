const Order = require("../models/order");
const Cart = require("../models/cart");

exports.placeOrder = async (req, res) => {
    const order = await Order.create({
        user: req.user._id,
        items: req.body.items,
        total: req.body.total
    });
    const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }

    res.json(order);
};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    res.json(orders);
};