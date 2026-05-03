import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useAuth();
  const [productsOpen, setProductsOpen] = useState(false);
  const [stationeryOpen, setStationeryOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const [stationeryProducts, setStationeryProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const navigate = useNavigate();
  const hideCartWishlist = 
  location.pathname === "/" || 
  location.pathname === "/login" || 
  location.pathname === "/signup";

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setStationeryProducts(data.filter((p) => p.category === "Stationery"));
        setAccessoriesProducts(data.filter((p) => p.category === "Accessories"));
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    closeSidebar();
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    closeSidebar();
  };

  const handleLogout = () => {
    logout();
    closeSidebar();
    window.location.href="/login";
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={closeSidebar}></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={closeSidebar}>✕</button>
        </div>

        {user ? (
          // Logged in user
          <div className="sidebar-user-area">
            <Link to="/profile" className="sidebar-profile-link" onClick={closeSidebar}>
              <span className="sidebar-user-icon">👤</span>
              <span className="sidebar-user-name">{user.name}</span>
            </Link>
          </div>
        ) : (
          // Guest user – neat login/signup area
          <div className="sidebar-guest-area">
            <div className="guest-avatar">👤</div>
            <div className="guest-text">You are browsing as a guest</div>
            <div className="guest-buttons">
              <Link to="/signup" className="guest-btn signup-btn" onClick={closeSidebar}>✨ Sign Up</Link>
              <Link to="/login" className="guest-btn login-btn" onClick={closeSidebar}>🔐 Login</Link>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {!hideCartWishlist && (
            <>
              <Link to="/cart" className="sidebar-link" onClick={closeSidebar}>
                Cart
              </Link>

            {user ? (
              <Link to="/wishlist" className="sidebar-link" onClick={closeSidebar}>
                ❤️ My Wishlist
              </Link>
            ) : (
              <Link to="/signup" className="sidebar-link" onClick={closeSidebar}>
                ❤️ Wishlist (Sign up to save)
              </Link>
            )}
            </>
          )}

          <Link to="/" className="sidebar-link" onClick={closeSidebar}>🏠 Home</Link>

          {/* Products dropdown */}
          <div className="sidebar-section">
            <div className="category-header" onClick={() => setProductsOpen(!productsOpen)}>
              <span className="category-header-label">Products</span>
              <span className={`arrow ${productsOpen ? "up" : "down"}`}>{productsOpen ? "▲" : "▼"}</span>
            </div>
            {productsOpen && (
              <div className="nested-dropdown">
                {/* Stationery */}
                <div className="subcategory">
                  <div className="subcategory-header">
                    <button className="subcategory-btn" onClick={() => handleCategoryClick("Stationery")}>
                      Stationery
                    </button>
                    <span
                      className={`arrow ${stationeryOpen ? "up" : "down"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setStationeryOpen(!stationeryOpen);
                      }}
                    >
                      {stationeryOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {stationeryOpen && (
                    <div className="product-list">
                      {stationeryProducts.length === 0 ? (
                        <div className="empty-message">No products</div>
                      ) : (
                        stationeryProducts.map((p) => (
                          <button key={p._id} className="product-item" onClick={() => handleProductClick(p._id)}>
                            {p.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Accessories */}
                <div className="subcategory">
                  <div className="subcategory-header">
                    <button className="subcategory-btn" onClick={() => handleCategoryClick("Accessories")}>
                      Accessories
                    </button>
                    <span
                      className={`arrow ${accessoriesOpen ? "up" : "down"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAccessoriesOpen(!accessoriesOpen);
                      }}
                    >
                      {accessoriesOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {accessoriesOpen && (
                    <div className="product-list">
                      {accessoriesProducts.length === 0 ? (
                        <div className="empty-message">No products</div>
                      ) : (
                        accessoriesProducts.map((p) => (
                          <button key={p._id} className="product-item" onClick={() => handleProductClick(p._id)}>
                            {p.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-spacer"></div>

          {user && (
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;