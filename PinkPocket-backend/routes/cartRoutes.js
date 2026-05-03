const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getCart, addToCart ,updateCart,removeFromCart} = require("../controllers/cartController");

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/update", auth, updateCart);
router.delete("/:productId", auth, removeFromCart);

module.exports = router;