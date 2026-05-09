import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Products.css";
import { getProducts,addToCartAPI } from "../api";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../utils/wishlist";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [activeFilter, setFilter] = useState(categoryFromUrl || "All");
  const [liked, setLiked] = useState({});
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const categories = ["All", "Stationery", "Accessories"];

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // When URL category changes, update activeFilter
  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilter(categoryFromUrl);
    } else if (!categoryFromUrl) {
      setFilter("All");
    }
  }, [categoryFromUrl, categories]);

  // Load liked state from localStorage wishlist
  useEffect(() => {
    if (products.length === 0) return;
    const initialLiked = {};
    products.forEach(product => {
      initialLiked[product._id] = isInWishlist(product._id);
    });
    setLiked(initialLiked);
  }, [products]);

  const toggleLike = (product) => {
    const newLiked = !liked[product._id];
    setLiked(prev => ({ ...prev, [product._id]: newLiked }));
    if (newLiked) {
      addToWishlist(product);
    } else {
      removeFromWishlist(product._id);
    }
  };

  const addToCart = async (id) => {
  const selectedProduct = products.find(p => p._id === id);
  if (!selectedProduct) return;

  try {
    await addToCartAPI({
      productId: selectedProduct._id
    });

    // UI feedback only
    setCart(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCart(prev => ({ ...prev, [id]: false }));
    }, 1500);

  } catch (err) {
    console.error("Cart error:", err);
  }
};

  const filtered = activeFilter === "All"
    ? products
    : products.filter(p => p.category === activeFilter);

  const isImageUrl = (src) =>
  src &&
  (
    src.startsWith("http") ||
    src.startsWith("https") ||
    src.startsWith("/")
  );

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1 className="products-hero-title">Welcome to theSoftGirlStore</h1>
        <p className="products-hero-subtitle">Discover budget-friendly items with a Pinterest vibe ✨</p>
        <div className="products-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filtered.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none' }}>
            <div className="shop-product-card">
              <div className="shop-product-img-container">
                <div className="shop-product-img-placeholder">
                  {isImageUrl(product.image) ? (
                    <img src={product.image} alt={product.name} className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="placeholder-icon">🛍️</div>';
                      }}
                    />
                  ) : (
                    <div className="placeholder-icon">{product.image || "🛍️"}</div>
                  )}
                </div>
                <button
                  className={`heart-btn-figma ${liked[product._id] ? "liked" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product);
                  }}
                  aria-label="Add to wishlist"
                >
                  {liked[product._id] ? "♥" : "♡"}
                </button>
              </div>
              <div className="shop-product-info">
                <div className="shop-product-name">{product.name}</div>
                <div className="shop-product-category">{product.category.toLowerCase()}</div>
                <div className="shop-product-footer">
                  <div className="shop-product-price">PKR {product.price.toLocaleString()}</div>
                  <button
                    className={`add-to-bag-btn ${cart[product._id] ? "added" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product._id);
                    }}
                  >
                    {cart[product._id] ? "Added ✓" : "Add to Bag"}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;