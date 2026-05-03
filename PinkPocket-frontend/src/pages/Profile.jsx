import "./Profile.css";
import prodicon from "../assets/icons/p1.png";
import { useNavigate  } from "react-router-dom";
import proficon from "../assets/icons/loginicon.png";
import {useEffect,useState} from "react";
import {getMe,getMyOrders} from "../api"
import { useAuth } from "../context/AuthContext";

const Profile=()=>{
    const nav=useNavigate();
    const [user,setUser]=useState(null);
    const [orders, setOrders] = useState([]);
    const {logout}=useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getMe();
                setUser(userData);

                const orderData = await getMyOrders();
                setOrders(orderData);

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    return(
        <div className="profile-container">
            <div className="profile-card">
                <img src={proficon} className="profile-card-icon"/>
                <div className="profile-card-info">
                    <h2>{user?.name || "User"}</h2>
                    <p>{user?.email || "Email"}</p>
                    <div className="orders-icon">
                        <p>{orders.length} Orders</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={()=>{
                    logout();
                    nav("/login",{replace:true});
                    }}>
                    <p>Logout</p>
                </button>
            </div>
            <div className="order-container">
                <h2>Order History</h2>
                {orders.length===0?(<p>No orders yet!</p>):(
                    orders.map(order=>(
                        <div className="order-card" key={order._id}>
                            <h2>Order #{order._id.slice(-5)}</h2>
                            <p>Status: {order.status}</p>
                            <div className="product-container">
                                {order.items.map((item,i)=> (
                                    <div className="product-card" key={i}>
                                        <img className="product-icon" src={item.img}/>
                                        <p>{item.name}</p>
                                        <p> x{item.quantity}</p>
                                    </div>
                                ))}       
                        </div>
                    <h5>Total: PKR {order.total?.toLocaleString()}</h5>
                </div>
                ))
                )}
            </div>
        </div>
    )
}
export default Profile;