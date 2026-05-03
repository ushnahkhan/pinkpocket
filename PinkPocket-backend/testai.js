require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in .env");
    return;
  }
  console.log("✅ API key found:", apiKey.slice(0, 10) + "...");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent("Say just 'Hello, Gemini works!'");
    const response = await result.response;
    console.log("✅ Gemini response:", response.text());
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
  }
}

testGemini();