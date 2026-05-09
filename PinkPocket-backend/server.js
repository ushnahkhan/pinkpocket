const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
console.log(process.env.MONGOURI);
const app = express();
const PORT=process.env.PORT||5000;

connectDB();
app.use(cors({
    origin: "https://pinkpocket.vercel.app",
    credentials: true
}));
app.use(express.json());

app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.listen(PORT, () => console.log("Server running"));