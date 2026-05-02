import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { getProducts } from "../api";

const Products = () => {
  const [activeFilter, setFilter] = useState("All");
  const [liked, setLiked] = useState({});
  const [cart, setCart] = useState({});

  const categories = ["All", "Stationery", "Accessories"];

  const [products,setProducts]=useState([]);
  useEffect(()=>{
    getProducts().then(setProducts);
  },[]);
  

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (id) => {
    const selectedProduct = products.find(p => p._id === id);
  if (!selectedProduct) return;

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = existingCart.find(item => item.productId === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    existingCart.push({
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      category: selectedProduct.category,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  // UI feedback
  setCart(prev => ({ ...prev, [id]: true }));
  setTimeout(() => {
    setCart(prev => ({ ...prev, [id]: false }));
  }, 1500);
};

  const filtered = activeFilter === "All" 
    ? products
    : products.filter(p => p.category === activeFilter);

  // Function to check if image is a URL
  const isImageUrl = (src) => {
    return src && (src.startsWith('http') || src.startsWith('https'));
  };

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
              {/* Product Image Container */}
              <div className="shop-product-img-container">
                <div className="shop-product-img-placeholder">
                  {isImageUrl(product.image) ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
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
                    toggleLike(product._id);
                  }}
                  aria-label="Add to wishlist"
                >
                  {liked[product._id] ? "♥" : "♡"}
                </button>
              </div>

              {/* Product Info Section */}
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