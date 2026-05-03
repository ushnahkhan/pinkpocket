const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/product");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithProductAI = async (req, res) => {
  try {
    const { productId, question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    let productContext = "";
    if (productId) {
      const product = await Product.findById(productId);
      if (product) {
        productContext = `
Product Name: ${product.name}
Category: ${product.category}
Price: PKR ${product.price}
Description: ${product.description || "No description provided"}
        `;
      }
    }

    const prompt = `
You are a helpful shopping assistant for a PinkPocket online store (theSoftGirlStore).
Answer questions about products in a friendly, concise, and informative way.
Do NOT mention that you are an AI or Gemini. Just answer naturally.

IMPORTANT FORMATTING RULES:
- NEVER use asterisks (*), underscores (_), or any markdown formatting.
- Do NOT use bold, italics, or any special characters for emphasis.
- Use simple plain text with line breaks.
- Use emojis (like ✅, ❌, 🎀, 💕) instead of asterisks for bullet points.
- Keep each point on a new line.
- If listing pros/cons, write each pro on a new line starting with "✅ " and each con with "❌ ".
- Keep the answer short, readable, and scannable.

Here is the product the user is looking at:
${productContext || "No specific product context."}

User question: ${question}

Answer (plain text, no markdown, friendly tone):
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Optional: post‑process to strip any leftover markdown (just in case)
    text = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\_\_/g, "").replace(/\_/g, "");

    res.json({ answer: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};