import "./Cart.css";
import productImg from "../assets/icons/p1.png"; // replace with your image
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartAPI, updateCartAPI, removeFromCartAPI } from "../api";
const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
    const fetchCart = async () => {
        try {
            const data = await getCartAPI();
            setCart(data.items || []);
        } catch (err) {
            console.error("Failed to load cart:", err);
        }
    };

        fetchCart();
    }, []);
    const updateQuantity = async (productId, delta) => {
    try {
        const updatedCart = await updateCartAPI(productId, delta);
        setCart(updatedCart.items);
    } catch (err) {
        console.error("Update failed:", err);
    }
    };

    const deleteItem = async (productId) => {
    try {
        const updatedCart = await removeFromCartAPI(productId);
        setCart(updatedCart.items);
    } catch (err) {
        console.error("Delete failed:", err);
    }
    };
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
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
                                    <button onClick={()=>updateQuantity(item.productId,-1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={()=>updateQuantity(item.productId,1)

                                    }>+</button>
                                </div>
                            </div>

                            <div className="cart-right">
                                <span className="cart-price">PKR {(item.price * item.quantity).toLocaleString()}</span>
                                <span className="cart-delete" onClick={()=>deleteItem(item.productId)} style={{cursor:"pointer"}}>🗑</span>
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