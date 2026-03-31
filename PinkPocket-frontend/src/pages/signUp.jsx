import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/icons/pinkpicon.png";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Name must be at least 2 characters";
        }
        
        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain both letters and numbers";
        }
        
        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsLoading(true);
            
            // Simulate API call
            setTimeout(() => {
                const success = signup(formData.fullName, formData.email, formData.password);
                
                if (success) {
                    console.log("Signup successful:", formData);
                    setIsLoading(false);
                    // Redirect to products page after successful signup
                    navigate("/products");
                } else {
                    setErrors({ general: "Something went wrong. Please try again." });
                    setIsLoading(false);
                }
            }, 1000);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Logo Section */}
                <div className="signup-logo-wrapper">
                    <img src={logo} alt="PinkPocket" className="signup-logo" />
                </div>
                
                <h2 className="signup-title">Create Account ✨</h2>
                <p className="signup-subtitle">Join PinkPocket and start shopping!</p>

                {errors.general && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span> {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label className="input-label">
                            <span className="label-icon">👤</span> Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`signup-input ${errors.fullName ? 'error' : ''}`}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            <span className="label-icon">📧</span> Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`signup-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            <span className="label-icon">🔒</span> Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`signup-input ${errors.password ? 'error' : ''}`}
                            />
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                        <div className="password-hint">
                            ✨ Must be at least 6 characters with letters and numbers
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            <span className="label-icon">✓</span> Confirm Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
                            />
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="signup-btn" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <div className="login-prompt">
                    <p className="login-link">
                        Already have an account?{" "}
                        <Link to="/login" className="login-link-text">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;