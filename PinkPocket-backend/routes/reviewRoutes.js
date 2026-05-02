const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
    getReviews,
    addReview
} = require("../controllers/reviewController");

router.get("/:productId", getReviews);
router.post("/:productId", auth, (req, res, next) => {
    console.log("🔥 POST /reviews hit");
    next();
}, addReview);

module.exports = router;