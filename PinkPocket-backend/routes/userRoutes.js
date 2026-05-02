const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
    getProfile,
    getUserOrders
} = require("../controllers/userController");


router.get("/me", auth, getProfile);
router.get("/orders", auth, getUserOrders);

module.exports = router;