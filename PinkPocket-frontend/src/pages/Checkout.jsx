import "./Checkout.css";
import proficon from "../assets/icons/loginicon.png";
import locicon from "../assets/icons/locicon.png";
import sicon from "../assets/icons/shieldicon.png";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Checkout=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [streetadd,setStreetAdd]=useState("");
    const [city,setCity]=useState("");
    const [pcode,setPcode]=useState("");
    const [cardno,setCardno]=useState("");
    const [expdate,setExpdate]=useState("");
    const [cvv,setCvv]=useState("");
    const navigate=useNavigate();
    return (
        <div className="checkout-container">
            <div className="checkout-layout">
                <div className="checkout-left">
                <div className="checkout-card">
                <div className="card-heading-row">
                    <img src={proficon} className="card-logo"></img>
                    <p className="card-heading">Contact Information</p>
                </div>
                
                <div className="card-row-container">
                    <p className="input-label">Full Name</p>
                    <input
                        type="string"
                        placeholder="Enter name"
                        value={name}
                        className="checkout-input"
                        onChange={(n)=>setName(n.target.value)}
                    />
                </div>
                <div className="card-row">
                    
                    <div className="card-row-container">
                        <p className="input-label">Email</p>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            className="checkout-input"
                            onChange={(n)=>setEmail(n.target.value)}
                        />
                    </div>
                    <div className="card-row-container">
                        <p className="input-label">Phone</p>
                        <input
                            type="int"
                            placeholder="03XX XXXXXXX"
                            value={phone}
                            className="checkout-input"
                            onChange={(n)=>setPhone(n.target.value)}
                        />
                        
                    </div>
                    
                </div>
                
            </div>
            <div className="checkout-card">
                <div className="card-heading-row">
                    <img src={locicon} className="card-logo"></img>
                    <p className="card-heading">Shipping Address</p>
                </div>
                
                <div className="card-row-container">
                    <p className="input-label">Street Address</p>
                    <input
                        type="string"
                        placeholder="Enter street address"
                        value={streetadd}
                        className="checkout-input"
                        onChange={(n)=>setStreetAdd(n.target.value)}
                    />
                </div>
                <div className="card-row">
                    
                    <div className="card-row-container">
                        <p className="input-label">City</p>
                        <input
                            type="string"
                            placeholder="Enter city"
                            value={city}
                            className="checkout-input"
                            onChange={(n)=>setCity(n.target.value)}
                        />
                    </div>
                    <div className="card-row-container">
                        <p className="input-label">Postal Code</p>
                        <input
                            type="int"
                            placeholder="XXXXX"
                            value={phone}
                            className="checkout-input"
                            onChange={(n)=>setPcode(n.target.value)}
                        />
                        
                    </div>
                    
                </div>
                
            </div>
            <div className="checkout-card">
                <div className="card-heading-row">
                    <img src={sicon} className="card-logo"></img>
                    <p className="card-heading">Payment Information</p>
                </div>
                
                <div className="card-row-container">
                    <p className="input-label">Card Number</p>
                    <input
                        type="string"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardno}
                        className="checkout-input"
                        onChange={(n)=>setCardno(n.target.value)}
                    />
                </div>
                <div className="card-row">
                    
                    <div className="card-row-container">
                        <p className="input-label">Expiry Date</p>
                        <input
                            type="date"
                            placeholder="MM\YYYY"
                            value={expdate}
                            className="checkout-input"
                            onChange={(n)=>setExpdate(n.target.value)}
                        />
                    </div>
                    <div className="card-row-container">
                        <p className="input-label">CVV</p>
                        <input
                            type="integer"
                            size={3}
                            placeholder="XXX"
                            value={cvv}
                            className="checkout-input"
                            onChange={(n)=>setCvv(n.target.value)}
                        />
                        
                    </div>
                    
                </div>
                
            </div>
            </div>
            <div className="checkout-summary">
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
            </div>
            </div>
            <button className="placeorder-btn" onClick={()=>navigate("/orderconfirmation")}>
                <p className="placeorder-txt">Place Order</p>
            </button>
        </div>
    );
}
export default Checkout;