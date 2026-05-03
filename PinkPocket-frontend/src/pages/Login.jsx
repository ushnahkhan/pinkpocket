import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";           // <-- only addition: useEffect
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icons/pinkpicon.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();                  // <-- only addition: user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in (minimal addition)
  useEffect(() => {
    if (user) navigate("/products");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate("/products");
    } else {
      setError(result.error || "Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo-wrapper">
          <img src={logo} alt="PinkPocket" className="login-logo" />
        </div>
        <h2 className="login-title">Welcome Back! 💕</h2>
        <p className="login-subtitle">Login to your theSoftGirlStore account</p>
        {error && <div className="error-message"><span>⚠️</span> {error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" required />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
        </form>
        <div className="signup-prompt">
          <p className="signup-link">Don't have an account? <Link to="/signup" className="signup-link-text">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;