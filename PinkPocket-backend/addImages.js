require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

// Map product names to image URLs
const imageMap = {
  "Anime Phone Case": "https://i.pinimg.com/736x/7b/48/c3/7b48c368bd2d943f2bbe579957203f4b.jpg",
  "Kawaii Keychain": "https://i.pinimg.com/736x/59/a1/bb/59a1bb921663d263465758c9003504b0.jpg",
  "Ghibli Drop Earrings": "https://i.pinimg.com/1200x/1c/d3/79/1cd37916e4a9c1280add8d8c592251e1.jpg",
  "Washi Tapes Bundle": "https://i.pinimg.com/1200x/c1/40/0e/c1400ebb1bb3c458cf7bdb2c7a21715d.jpg",
  "Cute Planner": "https://i.pinimg.com/736x/78/f6/09/78f609b3c29029ee3487cc04412068f4.jpg",
  "Pop-up Sticker Pack": "https://i.pinimg.com/736x/c3/b9/41/c3b94159f12ba2d050dee16c2d257c97.jpg",
  "Louis Carmen Leather Binder": "https://i.pinimg.com/1200x/f8/83/78/f88378007d3e6c48e632023b9a2680e0.jpg",
  "Hair Clip Set": "https://i.pinimg.com/1200x/14/a3/4c/14a34c4c6d95104210de76302ccacfbf.jpg",
  "Silk Scrunchies": "https://i.pinimg.com/736x/fb/41/15/fb4115f420a971f28f116ba9eef38fa1.jpg",
  "Pastel Stationery Set": "https://i.pinimg.com/736x/c9/33/2f/c9332f432a117f281865e20aa9444d12.jpg",
  "Sticky Notes Collection": "https://i.pinimg.com/1200x/e5/b6/a7/e5b6a7d82a4bd78b7518edfed93aebed.jpg",
  "Gel Pen Set (12 Pack)": "https://i.pinimg.com/736x/0e/99/f6/0e99f6cc2741c94d7cda9b3c4371a86c.jpg",
  "Decorative Pins Set": "https://i.pinimg.com/736x/e7/6d/10/e76d1089dfc028f069b3d1ec10f9cfa8.jpg",
  "Aesthetic Enamel Pins": "https://i.pinimg.com/736x/50/f9/2a/50f92adf4239e9e0f2f1c522322eb0e2.jpg",
  "Charm Bracelet": "https://i.pinimg.com/736x/ed/a7/b0/eda7b0bd7099750f382120d1a7b9a082.jpg"
};

async function updateImages() {
  await mongoose.connect(process.env.MONGOURI);
  for (const [name, url] of Object.entries(imageMap)) {
    const result = await Product.updateOne({ name }, { $set: { image: url } });
    if (result.modifiedCount) console.log(`✅ Updated ${name}`);
    else console.log(`⚠️ Not found: ${name}`);
  }
  console.log("Done");
  process.exit();
}
updateImages();