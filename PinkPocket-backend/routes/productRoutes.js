const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getProducts, addProduct,getProductById } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", auth, addProduct);
router.get("/:id", getProductById); 

module.exports = router;