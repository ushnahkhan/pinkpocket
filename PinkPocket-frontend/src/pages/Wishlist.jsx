import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../utils/wishlist";
import "./Wishlist.css";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setItems(getWishlist());
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty 💔</h2>
        <Link to="/products">Start shopping →</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>
      <div className="wishlist-grid">
        {items.map((product) => (
          <div key={product._id} className="wishlist-card">
            <img src={product.image || "https://via.placeholder.com/200"} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">PKR {product.price.toLocaleString()}</p>
            <div className="wishlist-buttons">
              <Link to={`/product/${product._id}`} className="view-btn">View Product</Link>
              <button onClick={() => handleRemove(product._id)} className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;