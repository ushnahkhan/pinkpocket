import "./Cart.css";
import productImg from "../assets/icons/p1.png"; // replace with your image
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(data);
    }, []);
    const updateQuantity = (index, delta) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += delta;

        if (updatedCart[index].quantity <= 0) {
            updatedCart.splice(index, 1);
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Delete item
    const deleteItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Bag</h2>
                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <p>Your cart is empty!</p>
                        ):(
                            cart.map((item,index) =>(
                                                            <div className="cart-card">
                            <img src={item.image||productImg} alt={item.name} className="cart-img" />
                            <div className="cart-info">
                                <h4>{item.name}</h4>
                                <p className="cart-category">{item.category}</p>

                                <div className="cart-qty">
                                    <button onClick={()=>updateQuantity(index,-1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={()=>updateQuantity(index,1)

                                    }>+</button>
                                </div>
                            </div>

                            <div className="cart-right">
                                <span className="cart-price">PKR {(item.price * item.quantity).toLocaleString()}</span>
                                <span className="cart-delete" onClick={()=>deleteItem(index)} style={{cursor:"pointer"}}>🗑</span>
                            </div>
                            </div>
                            ))
                        )}

                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>PKR {total.toLocaleString()}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free">Free</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>PKR {total.toLocaleString()}</span>
                        </div>
                        <button className="checkout-btn" onClick={()=>navigate("/checkout")}>Checkout</button>

                    </div>

                </div>

        </div>
    );
};

export default Cart;