import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icons/pinkpicon.png";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        setTimeout(() => {
            const success = login(email, password);
            
            if (success) {
                console.log("Login successful");
                navigate("/products");
            } else {
                setError("Invalid email or password. Password must be at least 6 characters.");
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo-wrapper">
                    <img src={logo} alt="PinkPocket" className="login-logo" />
                </div>
                
                <h2 className="login-title">Welcome Back! 💕</h2>
                <p className="login-subtitle">Login to your PinkPocket account</p>

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="signup-prompt">
                    <p className="signup-link">
                        Don't have an account?{" "}
                        <Link to="/signup" className="signup-link-text">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;