import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe } from "../api";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    getMe()
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (!userData) return null;

  return (
    <div className="profile-container-simple">
      <div className="profile-card-simple">
        <div className="profile-avatar">👤</div>
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
        <div className="aesthetic-lines">
          <p>✨ You're one of a kind ✨</p>
          <p>💖 Thank you for being part of our soft family 💖</p>
          <p>🌸 Stay sweet, stay stylish 🌸</p>
        </div>
        <Link to="/wishlist" className="profile-wishlist-btn">❤️ My Wishlist</Link>
        <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;