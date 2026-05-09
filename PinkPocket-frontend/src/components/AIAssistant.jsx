import { useState, useRef, useEffect } from "react";
import "./AIAssistant.css";

const API_URL = import.meta.env.VITE_API_URL || "https://pinkpocket.onrender.com/api";

const AIAssistant = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          content: "Hi! I'm your PinkPocket assistant. Ask me anything about this product! 🛍️",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          productId: productId,
          question: userMsg,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: data.answer },
        ]);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("AI chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-container">
      {!isOpen && (
        <div className="ai-chat-button" onClick={() => setIsOpen(true)}>
          <div className="ai-chat-icon">✨</div>
        </div>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <span>✨ AI Assistant</span>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="typing-indicator">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="ai-chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask about this product..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="send-btn" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;