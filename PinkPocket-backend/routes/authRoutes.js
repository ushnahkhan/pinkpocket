const router = require("express").Router();
const { signup, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/user");

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;