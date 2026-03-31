import { useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [activeFilter, setFilter] = useState("All");
  const [liked, setLiked] = useState({});
  const [cart, setCart] = useState({});

  const categories = ["All", "Stationery", "Accessories"];

  // 15 products with actual images
  const sampleProducts = [
    // Stationery
    { id: 1, name: "Pastel Stationery Set", category: "Stationery", price: 1200, image: "https://i.pinimg.com/1200x/9d/82/43/9d8243e2d4505d6cb7e237ddb7ca8db8.jpg" },
    { id: 2, name: "Sticky Notes Collection", category: "Stationery", price: 550, image: "https://i.pinimg.com/736x/4a/29/9e/4a299e6dce866fc89bc03d0a3fc34aa1.jpg" },
    { id: 3, name: "Gel Pens Set (12 Pack)", category: "Stationery", price: 850, image: "https://i.pinimg.com/736x/a3/de/e5/a3dee54e5afb193a032cf15cb0fa7161.jpg" },
    { id: 4, name: "Washi Tape Bundle", category: "Stationery", price: 700, image: "https://i.pinimg.com/1200x/b4/a6/ee/b4a6ee5283f757e855d7c607a278b5e4.jpg" },
    { id: 5, name: "Cute Planner", category: "Stationery", price: 1500, image: "https://i.pinimg.com/1200x/39/c0/09/39c00908d11c8dccabd60b1a3d7da3e1.jpg" },
    { id: 6, name: "Anime Sticker Pack", category: "Stationery", price: 400, image: "https://i.pinimg.com/736x/c3/b9/41/c3b94159f12ba2d050dee16c2d257c97.jpg" },
    { id: 7, name: "Louis Carmen Leather Binder", category: "Stationery", price: 1500, image: "https://i.pinimg.com/1200x/1c/bf/83/1cbf8306851fa0c9755bc2e602bc5f72.jpg" },
    // Accessories
    { id: 8, name: "Hair Clips Set", category: "Accessories", price: 650, image: "https://i.pinimg.com/736x/98/34/2e/98342e96d53d8de98fbde5600e789400.jpg" },
    { id: 9, name: "Silk Scrunchies", category: "Accessories", price: 500, image: "https://i.pinimg.com/736x/b2/44/4c/b2444c72199e037682d663c4e1f11fb5.jpg" },
    { id: 10, name: "Anime Phone Case", category: "Accessories", price: 1100, image: "https://i.pinimg.com/736x/7b/48/c3/7b48c368bd2d943f2bbe579957203f4b.jpg" },
    { id: 11, name: "Kawaii Keychain", category: "Accessories", price: 350, image: "https://i.pinimg.com/736x/f2/65/9d/f2659d7c1cb916e8dd39eb95e0868c6a.jpg" },
    { id: 12, name: "Charm Bracelet", category: "Accessories", price: 900, image: "https://i.pinimg.com/736x/ed/a7/b0/eda7b0bd7099750f382120d1a7b9a082.jpg" },
    { id: 13, name: "Ghibli Drop Earrings", category: "Accessories", price: 950, image: "https://i.pinimg.com/736x/75/b9/0d/75b90db819df8094ca2559bcdb5ed8c3.jpg" },
    { id: 14, name: "Aesthetic Enamel Pins", category: "Accessories", price: 600, image: "https://i.pinimg.com/736x/a8/d6/7f/a8d67f846845a8a2f49323de0d1e5a19.jpg" },
    { id: 15, name: "Decorative Pin Set", category: "Accessories", price: 600, image: "https://i.pinimg.com/736x/cf/fa/43/cffa43931b9afd53716a876c25a86bb7.jpg" },
  ];

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCart(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const filtered = activeFilter === "All" 
    ? sampleProducts 
    : sampleProducts.filter(p => p.category === activeFilter);

  // Function to check if image is a URL
  const isImageUrl = (src) => {
    return src && (src.startsWith('http') || src.startsWith('https'));
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1 className="products-hero-title">Welcome to PinkPocket</h1>
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
          <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
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
                  className={`heart-btn-figma ${liked[product.id] ? "liked" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product.id);
                  }}
                  aria-label="Add to wishlist"
                >
                  {liked[product.id] ? "♥" : "♡"}
                </button>
              </div>

              {/* Product Info Section */}
              <div className="shop-product-info">
                <div className="shop-product-name">{product.name}</div>
                <div className="shop-product-category">{product.category.toLowerCase()}</div>
                <div className="shop-product-footer">
                  <div className="shop-product-price">PKR {product.price.toLocaleString()}</div>
                  <button 
                    className={`add-to-bag-btn ${cart[product.id] ? "added" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.id);
                    }}
                  >
                    {cart[product.id] ? "Added ✓" : "Add to Bag"}
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