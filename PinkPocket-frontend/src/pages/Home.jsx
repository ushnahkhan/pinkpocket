import { Link } from "react-router-dom";
import "../App.css"
import pinkpocketicon from "../assets/icons/pinkpicon.png";
const Home = () => {
    return(
        <div className="home">
            <div className="home-hero">

                
                <img src={pinkpocketicon} alt="" className="home-logo"/>
                

                <h1 className="home-title">Welcome to PinkPocket</h1>

                <p className="home-subtitle">
                    Discover budget-friendly items with a Pinterest vibe ✨
                </p>

                <div className="home-buttons">
                    <Link to="/login">
                        <button className="primary-btn">Login</button>
                    </Link>

                    <Link to="/signup">
                        <button className="primary-btn">Sign Up</button>
                    </Link>
                </div>

            </div>

            <div className="home-products">

                <div className="product-card">
                    <div className="product-image"></div>
                    <p className="product-name">Pastel Stationery Set</p>
                    <p className="product-price">PKR 1500</p>
                    </div>

                <div className="product-card">
                    <div className="product-image"></div>
                    <p className="product-name">Sticky Notes Collection</p>
                    <p className="product-price">PKR 550</p>
                </div>

                <div className="product-card">
                    <div className="product-image"></div>
                    <p className="product-name">Gel Pen Set</p>
                    <p className="product-price">PKR 850</p>
                </div>

            </div>
        </div>
    )
}

export default Home;