import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./productDetails.css";
import { getProduct, getReviews, addReview,addToCartAPI } from "../api";
import AIAssistant from "../components/AIAssistant";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [personalization, setPersonalization] = useState("");
  const [giftOption, setGiftOption] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    if (id) getProduct(id).then(setProduct);
  }, [id]);

  useEffect(() => {
    if (id) getReviews(id).then(setReviews);
  }, [id]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => dist[Math.floor(r.rating)]++);
    return dist;
  };

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) return;
    setIsSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const review = await addReview(id, newReview, token);
      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, size = "medium", interactive = false, onStarClick = null) => {
    const starSize = size === "small" ? "14px" : size === "large" ? "22px" : "18px";
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : "empty"}`}
            style={{ fontSize: starSize, cursor: interactive ? "pointer" : "default" }}
            onClick={interactive ? () => onStarClick && onStarClick(star) : undefined}
          >
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

const isImageUrl = (src) =>
  src &&
  (
    src.startsWith("http") ||
    src.startsWith("https") ||
    src.startsWith("/")
  );
  const handleAddToCart = () => {
    try {
      await addToCartAPI({
        productId: product._id
    });

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);

  } catch (err) {
    console.error("Cart error:", err);
  }
};

  if (!product) return <div className="product-details-loading">Loading...</div>;

  const isLowStock = product.stock < 10;
  const avgRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button onClick={() => navigate("/products")} className="back-button">
          ← Back to Products
        </button>

        <div className="product-section">
          {/* Left column: image */}
          <div className="product-image-col">
            <div className="product-image-wrapper">
              {isImageUrl(product.image) ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-main"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div class="image-placeholder">🛍️</div>';
                  }}
                />
              ) : (
                <div className="image-placeholder">🛍️</div>
              )}
            </div>
          </div>

          {/* Right column: details */}
          <div className="product-details-col">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-category-text">{product.category}</p>
            <div className="product-price-large">PKR {product.price.toLocaleString()}</div>
            {product.description && <p className="product-description-text">{product.description}</p>}

            {/* Color options (if any) */}
            {product.colors && product.type !== "phone_case" && (
              <div className="option-section">
                <label className="option-label">Choose Color</label>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button key={color} className={`color-btn ${selectedColor === color ? "active" : ""}`} onClick={() => setSelectedColor(color)}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phone model options (if any) */}
            {product.models && (
              <div className="option-section">
                <label className="option-label">Choose Model</label>
                <div className="color-options">
                  {product.models.map(model => (
                    <button key={model} className={`color-btn ${selectedModel === model ? "active" : ""}`} onClick={() => setSelectedModel(model)}>
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personalisation for journals */}
            {product.type === "journal" && (
              <div className="option-section">
                <label className="option-label">Add Personalization (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter custom text (max 30 characters)"
                  maxLength="30"
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  className="personalization-input-field"
                />
                <p className="hint-text">✨ Personalized items take 2-3 extra days to process</p>
              </div>
            )}

            {/* Quantity and stock */}
            <div className="option-section">
              <label className="option-label">Quantity</label>
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>
              <div className={`stock-status ${isLowStock ? "low" : ""}`}>
                {isLowStock ? `⚠️ Only ${product.stock} items left!` : `✓ ${product.stock} in stock`}
              </div>
            </div>

            {/* Gift option */}
            <div className="option-section">
              <label className="gift-checkbox-label">
                <input type="checkbox" checked={giftOption} onChange={(e) => setGiftOption(e.target.checked)} />
                <span>🎁 Gift Wrap & Personalized Message</span>
              </label>
              {giftOption && (
                <div className="gift-message-box">
                  <textarea
                    placeholder="Write a personalized gift message..."
                    maxLength="100"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="gift-textarea"
                    rows="3"
                  />
                  <p className="hint-text">💝 + PKR 150 for premium gift packaging with ribbon</p>
                </div>
              )}
            </div>

            <button className={`add-to-cart-button ${addedToCart ? "added" : ""}`} onClick={handleAddToCart}>
              {addedToCart ? "✓ Added to Cart" : "🛍️ Add to Bag"}
            </button>

            <div className="product-info-footer">
              <h4>Product Details</h4>
              <ul>
                <li>Free shipping on orders over PKR 3,000</li>
                <li>30-day return policy</li>
                <li>Carefully packaged with love</li>
                {giftOption && <li>🎁 Premium gift wrapping included</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h3>💬 Customer Reviews ✨</h3>
            <button className="write-review-btn" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel" : "✍️ Write a Review"}
            </button>
          </div>

          {showReviewForm && (
            <div className="review-form-container">
              <div className="form-field">
                <label>Your Rating</label>
                <div className="centered-rating">
                  {renderStars(newReview.rating, "large", true, (star) => setNewReview({ ...newReview, rating: star }))}
                  <span className="rating-value-text">{newReview.rating} out of 5 stars</span>
                </div>
              </div>
              <div className="form-field">
                <label>Your Review</label>
                <textarea rows="4" placeholder="Share your experience..." value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} className="review-textarea" />
              </div>
              <div className="form-buttons">
                <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmitReview} disabled={isSubmitting}>{isSubmitting ? "Posting..." : "Post Review"}</button>
              </div>
            </div>
          )}
          {error && <p className="error-text">{error}</p>}

          <div className="rating-summary-grid">
            <div className="avg-score">
              <div className="big-rating">{avgRating}</div>
              {renderStars(parseFloat(avgRating), "large")}
              <div className="total-reviews-count">Based on {totalReviews} reviews</div>
            </div>
            <div className="rating-bars-list">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingDistribution[rating] || 0;
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="bar-item">
                    <span className="star-label">{rating} ★</span>
                    <div className="bar-background"><div className="bar-fill-progress" style={{ width: `${percent}%` }}></div></div>
                    <span className="count-label">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="reviews-list-container">
            {reviews.map(review => (
              <div key={review._id} className="review-card-item">
                <div className="review-card-header">
                  <div className="avatar-circle">{review.name?.[0] || "U"}</div>
                  <div className="reviewer-info">
                    <div className="reviewer-name-row">
                      {review.name}
                      {review.verified && <span className="verified-tag">✓ Verified</span>}
                    </div>
                    {renderStars(review.rating, "small")}
                    <span className="review-date-text">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="review-comment-text">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AIAssistant productId={id} />
    </div>
  );
};

export default ProductDetails;