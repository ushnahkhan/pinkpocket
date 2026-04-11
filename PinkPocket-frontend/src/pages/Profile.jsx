import "./Profile.css";
import prodicon from "../assets/icons/p1.png";
import { useNavigate  } from "react-router-dom";
import proficon from "../assets/icons/loginicon.png";
const Profile=()=>{
    const nav=useNavigate();
    return(
        <div className="profile-container">
            <div className="profile-card">
                <img src={proficon} className="profile-card-icon"/>
                <div className="profile-card-info">
                    <h2>Name</h2>
                    <p>Email Address</p>
                    <div className="orders-icon">
                        <p>X Orders</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={()=>nav("/login")}>
                    <p>Logout</p>
                </button>
            </div>
            <div className="order-container">
                <h2>Order History</h2>
                <div className="order-card">
                    <h2>Order#123</h2>
                    <p>Status: Pending</p>
                    <div className="product-container">
                        <div className="product-card">
                        <img className="product-icon" src={prodicon}/>
                        <p>Product 1</p>
                    </div>
                    <div className="product-card">
                        <img className="product-icon" src={prodicon}/>
                        <p>Product 2</p>
                    </div>
                    </div>
                    <h5>Total: PKR 1500</h5>
                </div>
            </div>

        </div>
    )
}
export default Profile;