require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");
const Review = require("./models/review");

// Sample names for reviewers
const names = [
  "Sarah J.", "Emily Chen", "Ayesha Khan", "Zara T.", "Maya R.",
  "Sophia L.", "Olivia M.", "Emma W.", "Amina S.", "Fatima Z."
];

// Sample comments (product‑type agnostic, but you can customise later)
const comments = [
  "Absolutely love this! The quality is amazing and it's so cute 🎀",
  "Really nice product, shipping was fast too. Would recommend!",
  "Obsessed with this! Perfect for my aesthetic journal 💕",
  "Good product but took a while to arrive. Still happy with it.",
  "Exceeded my expectations! Will definitely buy again.",
  "Cute design but slightly smaller than expected. Still good.",
  "Beautiful packaging and fast delivery! 10/10.",
  "Works perfectly and looks even better in person.",
  "Very satisfied with my purchase. Great value for money.",
  "The material feels premium and it's exactly as pictured."
];

// Get a random item from an array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random rating (biased toward higher ratings)
const randomRating = () => {
  const r = Math.random();
  if (r < 0.5) return 5;
  if (r < 0.75) return 4;
  if (r < 0.9) return 3;
  if (r < 0.97) return 2;
  return 1;
};

async function seedReviews() {
  await mongoose.connect(process.env.MONGOURI);
  console.log("Connected to DB");

  // Clear existing reviews (optional)
  await Review.deleteMany({});
  console.log("Cleared existing reviews");

  // Get all products
  const products = await Product.find();
  console.log(`Found ${products.length} products`);

  let totalReviews = 0;
  for (const product of products) {
    // Generate between 3 and 6 reviews per product
    const reviewCount = Math.floor(Math.random() * 4) + 3; // 3–6 reviews
    const productReviews = [];

    for (let i = 0; i < reviewCount; i++) {
      const rating = randomRating();
      productReviews.push({
        product: product._id,
        // Use a fake user ID (ObjectId) if you don't have real users
        user: new mongoose.Types.ObjectId(), // placeholder
        name: randomItem(names),
        rating: rating,
        comment: randomItem(comments),
      });
    }

    await Review.insertMany(productReviews);
    totalReviews += productReviews.length;
    console.log(`✅ Added ${productReviews.length} reviews for "${product.name}"`);
  }

  console.log(`\n🎉 Seeded ${totalReviews} reviews across ${products.length} products.`);
  process.exit(0);
}

seedReviews().catch(err => {
  console.error(err);
  process.exit(1);
});