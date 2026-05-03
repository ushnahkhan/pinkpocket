const express = require("express");
const router = express.Router();
const { chatWithProductAI } = require("../controllers/aiController");

router.post("/chat", chatWithProductAI);

module.exports = router;