import "./Cart.css";
import productImg from "../assets/icons/p1.png"; // replace with your image
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const [count,setCount]=useState(1);
    const navigate=useNavigate();
    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Bag</h2>
                <div className="cart-layout">
                    <div className="cart-items">
                        <div className="cart-card">
                            <img src={productImg} alt="product" className="cart-img" />
                            <div className="cart-info">
                                <h4>Pastel Stationery Set</h4>
                                <p className="cart-category">Stationery</p>

                                <div className="cart-qty">
                                    <button onClick={()=>setCount(prev=>prev-1)}>-</button>
                                    <span>{count}</span>
                                    <button onClick={()=>setCount(prev=>prev+1)}>+</button>
                                </div>
                            </div>

                            <div className="cart-right">
                                <span className="cart-price">PKR 1500</span>
                                <span className="cart-delete">🗑</span>
                            </div>

                        </div>

                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>PKR 1500</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free">Free</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>PKR 1500</span>
                        </div>
                        <button className="checkout-btn" onClick={()=>navigate("/checkout")}>Checkout</button>

                    </div>

                </div>

        </div>
    );
};

export default Cart;