const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.listen(5000, () => console.log("Server running"));