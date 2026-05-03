const Review = require("../models/review");

// GET reviews
exports.getReviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
        .sort({ createdAt: -1 });

    res.json(reviews);
};

// ADD review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

    // 🔥 VALIDATION
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be 1–5" });
    }

    if (!comment || comment.trim().length < 3) {
        return res.status(400).json({ message: "Comment too short" });
    }

    // 🔥 OPTIONAL: prevent duplicate review
    const existing = await Review.findOne({
        product: req.params.productId,
        user: req.user._id
    });

    if (existing) {
        return res.status(400).json({ message: "You already reviewed this product" });
    }

    const review = await Review.create({
        product: req.params.productId,
        user: req.user._id,
        name: req.user.name || "User",
        rating,
        comment,
    });

    return res,status(201).json(review);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};