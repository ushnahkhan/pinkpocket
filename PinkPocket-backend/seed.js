require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const products = [
  { name: "Anime Phone Case", price: 1100, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Phone+Case", description: "Durable hard case featuring vibrant anime artwork. Compatible with iPhone and Samsung models. Shock-absorbent edges.", stock: 30 },
  { name: "Kawaii Keychain", price: 350, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Keychain", description: "Acrylic keychain with cute pastel charms. Lightweight, scratch-resistant, with a sturdy metal ring.", stock: 100 },
  { name: "Ghibli Drop Earrings", price: 950, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Earrings", description: "Whimsical earrings inspired by Studio Ghibli films. Hypoallergenic hooks, nickel-free. Comes in a gift box.", stock: 25 },
  { name: "Washi Tapes Bundle", price: 700, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Washi+Tapes", description: "Set of 5 decorative washi tapes with floral, geometric, and pastel patterns. Ideal for journaling.", stock: 45 },
  { name: "Cute Planner", price: 1500, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Planner", description: "Undated monthly/weekly planner with 120 pages. Includes sticker sheets and habit trackers.", stock: 15 },
  { name: "Pop-up Sticker Pack", price: 400, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Stickers", description: "Collection of 50+ pop-up and kawaii stickers. Waterproof and glossy finish.", stock: 200 },
  { name: "Louis Carmen Leather Binder", price: 1500, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Binder", description: "Vegan leather binder with ring mechanism. Holds A5 refills. Includes dividers and zipper pocket.", stock: 10 },
  { name: "Hair Clip Set", price: 650, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Hair+Clips", description: "Set of 4 trendy hair clips in pastel colors. Strong grip, no snagging.", stock: 60 },
  { name: "Silk Scrunchies", price: 500, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Scrunchies", description: "Set of 6 silk scrunchies in soft shades. Gentle on hair, prevents breakage.", stock: 80 },
  { name: "Pastel Stationery Set", price: 1500, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Stationery+Set", description: "Complete stationery set: 2 notebooks, sticky notes, gel pens, and a pencil case.", stock: 0 },
  { name: "Sticky Notes Collection", price: 550, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Sticky+Notes", description: "12 pads of sticky notes in various pastel shades and shapes. Acid-free.", stock: 120 },
  { name: "Gel Pen Set (12 Pack)", price: 850, category: "Stationery", image: "https://via.placeholder.com/300x300?text=Gel+Pens", description: "12 gel pens with 0.7mm tip. Smooth ink, vibrant colors. Includes neon, metallic, and pastel.", stock: 40 },
  { name: "Decorative Pins Set", price: 600, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Pins", description: "Set of 5 enamel pins with aesthetic designs. Rubber clutch backing.", stock: 55 },
  { name: "Aesthetic Enamel Pins", price: 600, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Enamel+Pins", description: "High-quality enamel pins featuring moons, flowers, and abstract art. Gold-plated metal.", stock: 35 },
  { name: "Charm Bracelet", price: 900, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Bracelet", description: "Adjustable bracelet with 5 interchangeable charms (hearts, stars, pearls). Gold or silver finish.", stock: 20 }
];

async function seed() {
  await mongoose.connect(process.env.MONGOURI);
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log(`${products.length} products inserted.`);
  process.exit(0);
}
seed();