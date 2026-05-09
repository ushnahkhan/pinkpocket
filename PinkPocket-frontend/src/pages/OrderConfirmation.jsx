import "./OrderConfirmation.css";
import tickicon from"../assets/icons/tickicon.png";
import { useNavigate } from "react-router-dom";
const OrderConfirmation=()=>{
    const nav=useNavigate();
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <img src={tickicon} className="confirmation-icon"/>
                <h3>Thank you for ordering from PinkPocket!</h3>
                <p>Your order has been placed successfully, it will be delivered soon!</p>
                <button onClick={()=>nav("/products")} className="continue-button">
                    <p>Continue Shopping</p>
                </button>
            </div>
        </div>
    );
}
export default OrderConfirmation;