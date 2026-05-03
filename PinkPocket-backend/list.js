require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

async function check() {
  await mongoose.connect(process.env.MONGOURI);
  const count = await Product.countDocuments();
  console.log(`Total products in DB: ${count}`);
  if (count > 0) {
    const products = await Product.find({}, { name: 1, _id: 0 }).limit(5);
    products.forEach(p => console.log(`- "${p.name}"`));
  } else {
    console.log("No products found. Collection is empty.");
  }
  process.exit(0);
}
check();