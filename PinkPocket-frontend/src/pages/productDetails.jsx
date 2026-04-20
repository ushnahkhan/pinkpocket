import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./productDetails.css";

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
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });

  const sampleProducts = [
    { id: 1, name: "Pastel Stationery Set", category: "Stationery", price: 1200, image: "https://i.pinimg.com/1200x/9d/82/43/9d8243e2d4505d6cb7e237ddb7ca8db8.jpg", description: "Complete stationery set with notebooks, pens, and sticky notes.", type: "stationery", colors: ["Pink", "Lavender", "Mint", "Peach"], stock: 25 },
    { id: 2, name: "Sticky Notes Collection", category: "Stationery", price: 550, image: "https://i.pinimg.com/736x/4a/29/9e/4a299e6dce866fc89bc03d0a3fc34aa1.jpg", description: "Cute sticky notes in various shapes and pastel colors.", type: "stationery", colors: ["Pastel Pink", "Soft Yellow", "Mint Green", "Lavender"], stock: 50 },
    { id: 3, name: "Gel Pens Set (12 Pack)", category: "Stationery", price: 850, image: "https://i.pinimg.com/736x/a3/de/e5/a3dee54e5afb193a032cf15cb0fa7161.jpg", description: "Smooth gel pens in 12 vibrant pastel colors.", type: "stationery", colors: ["Pastel Set", "Neon Set", "Metallic Set"], stock: 30 },
    { id: 4, name: "Washi Tape Bundle", category: "Stationery", price: 700, image: "https://i.pinimg.com/1200x/b4/a6/ee/b4a6ee5283f757e855d7c607a278b5e4.jpg", description: "Set of 10 decorative washi tapes for journaling.", type: "stationery", colors: ["Floral", "Geometric", "Animals", "Food"], stock: 40 },
    { id: 5, name: "Cute Planner", category: "Stationery", price: 1500, image: "https://i.pinimg.com/1200x/39/c0/09/39c00908d11c8dccabd60b1a3d7da3e1.jpg", description: "Monthly planner with aesthetic design and stickers.", type: "journal", colors: ["Pink", "Lavender", "Mint"], personalization: true, stock: 20 },
    { id: 6, name: "Anime Sticker Pack", category: "Stationery", price: 400, image: "https://i.pinimg.com/736x/c3/b9/41/c3b94159f12ba2d050dee16c2d257c97.jpg", description: "50+ adorable anime stickers.", type: "stationery", colors: ["Kawaii", "Chibi", "Vintage"], stock: 60 },
    { id: 7, name: "Louis Carmen Leather Binder", category: "Stationery", price: 1500, image: "https://i.pinimg.com/1200x/1c/bf/83/1cbf8306851fa0c9755bc2e602bc5f72.jpg", description: "Premium leather binder for organizing.", type: "stationery", colors: ["Brown", "Black", "Pink"], stock: 15 },
    { id: 8, name: "Hair Clips Set", category: "Accessories", price: 650, image: "https://i.pinimg.com/736x/98/34/2e/98342e96d53d8de98fbde5600e789400.jpg", description: "Set of 5 elegant pearl hair clips.", type: "accessory", colors: ["Pearl White", "Rose Gold", "Silver"], stock: 35 },
    { id: 9, name: "Silk Scrunchies", category: "Accessories", price: 500, image: "https://i.pinimg.com/736x/b2/44/4c/b2444c72199e037682d663c4e1f11fb5.jpg", description: "Set of 3 soft silk scrunchies.", type: "accessory", colors: ["Pink", "Lavender", "Mint", "Peach", "Sky"], stock: 45 },
    { id: 10, name: "Anime Phone Case", category: "Accessories", price: 1100, image: "https://i.pinimg.com/736x/7b/48/c3/7b48c368bd2d943f2bbe579957203f4b.jpg", description: "Cute anime-style protective phone case.", type: "phone_case", models: ["iPhone 13", "iPhone 14", "iPhone 15", "Samsung Galaxy S23"], stock: 28 },
    { id: 11, name: "Kawaii Keychain", category: "Accessories", price: 350, image: "https://i.pinimg.com/736x/f2/65/9d/f2659d7c1cb916e8dd39eb95e0868c6a.jpg", description: "Adorable keychain for your bag or keys.", type: "accessory", colors: ["Pink Bear", "White Cat", "Brown Dog"], stock: 55 },
    { id: 12, name: "Charm Bracelet", category: "Accessories", price: 900, image: "https://i.pinimg.com/736x/ed/a7/b0/eda7b0bd7099750f382120d1a7b9a082.jpg", description: "Delicate stainless steel charm bracelet.", type: "accessory", colors: ["Silver", "Gold", "Rose Gold"], stock: 32 },
    { id: 13, name: "Ghibli Drop Earrings", category: "Accessories", price: 950, image: "https://i.pinimg.com/736x/75/b9/0d/75b90db819df8094ca2559bcdb5ed8c3.jpg", description: "Ghibli themed earrings.", type: "accessory", colors: ["Totoro", "No Face", "Kiki"], stock: 22 },
    { id: 14, name: "Aesthetic Enamel Pins", category: "Accessories", price: 600, image: "https://i.pinimg.com/736x/a8/d6/7f/a8d67f846845a8a2f49323de0d1e5a19.jpg", description: "Set of 3 cute enamel pins.", type: "accessory", colors: ["Butterfly", "Star", "Heart"], stock: 40 },
    { id: 15, name: "Decorative Pin Set", category: "Accessories", price: 600, image: "https://i.pinimg.com/736x/cf/fa/43/cffa43931b9afd53716a876c25a86bb7.jpg", description: "Pair of decorative pins.", type: "accessory", colors: ["Flower", "Moon", "Sun"], stock: 38 },
  ];

  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews_${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      const defaultReviews = [
        {
          id: 1,
          name: "Sarah M.",
          rating: 5,
          date: "2 days ago",
          comment: "Absolutely obsessed with this! The quality is amazing and it's even cuter in person.",
          avatar: "🌸",
          verified: true
        },
        {
          id: 2,
          name: "Emily K.",
          rating: 5,
          date: "1 week ago",
          comment: "Love love LOVE this! The attention to detail is incredible and shipping was super fast.",
          avatar: "✨",
          verified: true
        },
        {
          id: 3,
          name: "Jessica L.",
          rating: 4,
          date: "2 weeks ago",
          comment: "So cute and functional! Exactly as described and arrived in perfect condition.",
          avatar: "🎀",
          verified: false
        }
      ];
      setReviews(defaultReviews);
      localStorage.setItem(`reviews_${id}`, JSON.stringify(defaultReviews));
    }
  }, [id]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[Math.floor(review.rating)]++;
    });
    return distribution;
  };

  const handleSubmitReview = () => {
    if (newReview.comment.trim()) {
      const reviewerName = user?.fullName || "Anonymous User";
      const avatarOptions = ["🌸", "✨", "🎀", "💕", "⭐", "🌟", "💝"];
      const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
      
      const newReviewObj = {
        id: reviews.length + 1,
        name: reviewerName,
        rating: newReview.rating,
        date: "Just now",
        comment: newReview.comment,
        avatar: randomAvatar,
        verified: !!user
      };
      
      const updatedReviews = [newReviewObj, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
      
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating, size = "medium", interactive = false, onStarClick = null) => {
    const starSize = size === "small" ? "14px" : size === "large" ? "22px" : "18px";
    
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`star ${star <= rating ? 'filled' : 'empty'}`}
            style={{ 
              fontSize: starSize,
              cursor: interactive ? 'pointer' : 'default'
            }}
            onClick={interactive ? () => onStarClick && onStarClick(star) : undefined}
          >
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const isImageUrl = (src) => {
    return src && (src.startsWith('http') || src.startsWith('https'));
  };

  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors) setSelectedColor(foundProduct.colors[0]);
      if (foundProduct.models) setSelectedModel(foundProduct.models[0]);
    } else {
      navigate("/products");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
      model: selectedModel,
      personalization: personalization,
      giftWrap: giftOption,
      giftMessage: giftMessage
    };
    console.log("Added to cart:", cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) {
    return <div className="product-details-loading">Loading...</div>;
  }

  const isLowStock = product.stock < 10;
  const avgRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;
  const isJournal = product.type === "journal";

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Back Button - Top Left */}
        <button 
          onClick={() => navigate("/products")} 
          className="back-button"
        >
          ← Back to Products
        </button>

        {/* Product Section - Image Left, Details Right */}
        <div className="product-section">
          {/* Left Column - Product Image */}
          <div className="product-image-col">
            <div className="product-image-wrapper">
              {isImageUrl(product.image) ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image-main"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="image-placeholder">🛍️</div>';
                  }}
                />
              ) : (
                <div className="image-placeholder">🛍️</div>
              )}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="product-details-col">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-category-text">{product.category}</p>
            
            <div className="product-price-large">PKR {product.price.toLocaleString()}</div>
            
            {product.description && (
              <p className="product-description-text">{product.description}</p>
            )}

            {/* Color Options */}
            {product.colors && product.type !== "phone_case" && (
              <div className="option-section">
                <label className="option-label">Choose Color</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? "active" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Phone Model Options */}
            {product.models && (
              <div className="option-section">
                <label className="option-label">Choose Model</label>
                <div className="color-options">
                  {product.models.map((model) => (
                    <button
                      key={model}
                      className={`color-btn ${selectedModel === model ? "active" : ""}`}
                      onClick={() => setSelectedModel(model)}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personalization for Journal/Planner - Only ONE field */}
            {isJournal && (
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

            {/* Quantity */}
            <div className="option-section">
              <label className="option-label">Quantity</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              <div className={`stock-status ${isLowStock ? "low" : ""}`}>
                {isLowStock ? `⚠️ Only ${product.stock} items left!` : `✓ ${product.stock} in stock`}
              </div>
            </div>

            {/* Gift Option */}
            <div className="option-section">
              <label className="gift-checkbox-label">
                <input
                  type="checkbox"
                  checked={giftOption}
                  onChange={(e) => setGiftOption(e.target.checked)}
                />
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

            {/* Add to Cart Button */}
            <button 
              className={`add-to-cart-button ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? "✓ Added to Cart" : "🛍️ Add to Bag"}
            </button>

            {/* Product Info Footer */}
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

        {/* Reviews Section - Below */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h3>💬 Customer Reviews ✨</h3>
            <button className="write-review-btn" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel" : "✍️ Write a Review"}
            </button>
          </div>

          {/* Write Review Form */}
          {showReviewForm && (
            <div className="review-form-container">
              <div className="form-field">
                <label>Your Rating</label>
                <div className="centered-rating">
                  {renderStars(newReview.rating, "large", true, (star) => setNewReview({...newReview, rating: star}))}
                  <span className="rating-value-text">{newReview.rating} out of 5 stars</span>
                </div>
              </div>
              <div className="form-field">
                <label>Your Review</label>
                <textarea
                  rows="4"
                  placeholder="Share your experience with this product..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="review-textarea"
                />
              </div>
              <div className="form-buttons">
                <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmitReview}>Post Review</button>
              </div>
            </div>
          )}

          {/* Rating Summary */}
          <div className="rating-summary-grid">
            <div className="avg-score">
              <div className="big-rating">{avgRating}</div>
              {renderStars(parseFloat(avgRating), "large")}
              <div className="total-reviews-count">Based on {totalReviews} reviews</div>
            </div>
            <div className="rating-bars-list">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingDistribution[rating] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="bar-item">
                    <span className="star-label">{rating} ★</span>
                    <div className="bar-background">
                      <div className="bar-fill-progress" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="count-label">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list-container">
            {reviews.map((review) => (
              <div key={review.id} className="review-card-item">
                <div className="review-card-header">
                  <div className="avatar-circle">{review.avatar}</div>
                  <div className="reviewer-info">
                    <div className="reviewer-name-row">
                      {review.name}
                      {review.verified && <span className="verified-tag">✓ Verified</span>}
                    </div>
                    {renderStars(review.rating, "small")}
                    <span className="review-date-text">{review.date}</span>
                  </div>
                </div>
                <p className="review-comment-text">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;