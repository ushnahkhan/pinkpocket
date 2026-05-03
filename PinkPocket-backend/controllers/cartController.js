const Cart = require("../models/cart");
const Product = require("../models/product");

// GET cart
exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart || { items: [] });
};

// ADD to cart
exports.addToCart = async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find(i => i.productId === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.items.push({
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
            });
        }

    await cart.save();
    res.json(cart);
};
exports.updateCart = async (req, res) => {
    const { productId, delta } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += delta;

    // remove if <= 0
    if (item.quantity <= 0) {
        cart.items = cart.items.filter(i => i.productId !== productId);
    }

    await cart.save();
    res.json(cart);
};
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.productId !== productId);

    await cart.save();
    res.json(cart);
};