import "./Checkout.css";
import proficon from "../assets/icons/loginicon.png";
import locicon from "../assets/icons/locicon.png";
import sicon from "../assets/icons/shieldicon.png";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api";
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
    const [errors, setErrors] = useState({});
    const [cart, setCart] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    }, []);
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const validate = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required";

        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Invalid email format";

        if (!phone) newErrors.phone = "Phone is required";
        else if (!/^03\d{9}$/.test(phone))
            newErrors.phone = "Enter valid Pakistani number (03XXXXXXXXX)";

        if (!streetadd.trim()) newErrors.street = "Address required";
        if (!city.trim()) newErrors.city = "City required";

        if (!pcode) newErrors.pcode = "Postal code required";
        else if (!/^\d{5}$/.test(pcode))
            newErrors.pcode = "Postal code must be 5 digits";

        if (!cardno) newErrors.card = "Card number required";
        else if (!/^\d{16}$/.test(cardno.replace(/\s/g, "")))
            newErrors.card = "Card must be 16 digits";

        if (!expdate) newErrors.expdate = "Expiry date required";
        else {
            const today = new Date();
            const selected = new Date(expdate);
            if (selected < today) newErrors.expdate = "Card expired";
        }

        if (!cvv) newErrors.cvv = "CVV required";
        else if (!/^\d{3}$/.test(cvv))
            newErrors.cvv = "CVV must be 3 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    try{
        await placeOrder({
        items: cart,
        total,
        shipping: {
            name,
            email,
            phone,
            address:streetadd,
            city,
            postalCode:pcode,
            },

        }, token);
        localStorage.removeItem("cart");
        navigate("/orderconfirmation");
    } catch {
        alert("Order failed. Try again.")
    }
    
    
    };
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
                    {errors.name && <p className="error-text">{errors.name}</p>}
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
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="card-row-container">
                        <p className="input-label">Phone</p>
                        <input
                            type="text"
                            placeholder="03XX XXXXXXX"
                            value={phone}
                            className="checkout-input"
                            onChange={(n)=>setPhone(n.target.value)}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                        
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
                    {errors.street && <p className="error-text">{errors.street}</p>}
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
                        {errors.city && <p className="error-text">{errors.city}</p>}
                    </div>
                    <div className="card-row-container">
                        <p className="input-label">Postal Code</p>
                        <input
                            type="text"
                            placeholder="XXXXX"
                            value={pcode}
                            className="checkout-input"
                            onChange={(n)=>setPcode(n.target.value)}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                        
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
                    {errors.cardno && <p className="error-text">{errors.cardno}</p>}
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
                        {errors.expdate && <p className="error-text">{errors.expdate}</p>}
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
                        {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                        
                    </div>
                    
                </div>
                
            </div>
            </div>
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                    <span>Shipping</span>
                    <span className="free">Free</span>
                </div>
                <hr />
                <div className="summary-row total">
                    <span>Total</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                </div>
            </div>
            </div>
            <button className="placeorder-btn" onClick={handleOrder}>
                <p className="placeorder-txt">Place Order</p>
            </button>
        </div>
    );
}
export default Checkout;