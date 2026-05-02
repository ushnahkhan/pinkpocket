const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders } = require("../controllers/orderController");

router.post("/", auth, placeOrder);
router.get("/my", auth, getMyOrders);

module.exports = router;