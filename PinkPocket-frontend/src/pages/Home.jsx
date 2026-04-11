import "./Home.css";
import hearticon from "../assets/icons/hearticon.png";
import boxicon from "../assets/icons/boxicon.png";
import aicon from "../assets/icons/aicon.png";
import sicon from "../assets/icons/sicon.png";
import sparkle from "../assets/icons/sparkleicon.png";
import star from "../assets/icons/staricon.png";
import truck from "../assets/icons/truck.png";
import shield from "../assets/icons/shieldicon.png";
import {Link, useNavigate} from "react-router-dom";
const images=[];
images[0]=boxicon;
images[1]=sicon;
images[2]=aicon;
const Home=()=>{
    const navigate=useNavigate();
    return(
        <div className="home">
            <section className="ad-card">
                
                <div className="ad-card-left">
                    <div className="ad-card-placeholder">
                        <img src={hearticon} className="ad-card-icon"></img>

                    </div>
                    <p>Product Image</p>
                </div>
                <div className="ad-card-right">
                    <h1>
                        Curate Your 
                        <span className="grad-text"> Aesthetic Vibe</span>
                    </h1>
                    <p>
                        Discover Pinterest-inspired accessories and stationery that match
                        your unique style. Budget-friendly prices, quality guaranteed.
                    </p>
                    <div className="ad-card-buttons">
                        <Link to="/login" className="btn-pmry">
                            <p>Login to Explore Collection →</p>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="categories">
                <h2 className="section-header">
                    Shop by Category
                </h2>
                <div className="category-grid">
                    {["All","Stationery","Accessories"
                    ].map((item,i)=>(
                        
                            <div className="category-card" onClick={()=>navigate("/products")}>
                                <img src={images[i]} className="cat-icon"/>
                                <h3>{item}</h3>
                                <p>{10+i} products</p>
                            </div>
                        
                    ))}
                </div>
            </section>
            <section className="whyus">
                <h2 className="section-header">
                    Why Shop With Us?
                </h2>
                <div className="whyus-grid">
                    <div className="whyus-card">
                        <img src={sparkle} className="whyus-icon"/>
                        <h4>Curated Collection</h4>
                        <p>Pinterest inspired aesthetic designs handpicked for you</p>
                    </div>
                    <div className="whyus-card">
                        <img src={hearticon} className="whyus-icon"/>
                        <h4>Budget Friendly</h4>
                        <p>Quality products at affordable prices</p>
                    </div>
                    <div className="whyus-card">
                        <img src={star} className="whyus-icon"/>
                        <h4>Personalize It</h4>
                        <p>Customize products to perfectly match your style</p>
                    </div>
                </div>
            </section>
            <section className="features">
                <div classname="features-tab">
                    <img src={truck} className="features-icon"/>
                    <h3>Free Shipping</h3>
                    <p>On orders over PKR 3000</p>
                </div>
                <div>
                    <img src={boxicon} className="features-icon"/>
                    <h3>Easy Returns</h3>
                    <p>30-day return policy</p>
                </div>
                <div>
                    <img src={hearticon} className="features-icon"/>
                    <h3>Aesthetic Packaging</h3>
                    <p>Carefully packaged with love</p>
                </div>
                <div>
                    <img src={shield} className="features-icon"/>
                    <h3>Secure Payments</h3>
                    <p>Multiple and secure payment options</p>
                </div>
            </section>
            <section className="cta">
                <h2>Join Our Community</h2>
                <p>Follow us for daily aesthetic inspirations and exclusive drops!</p>
                <div className="cta-buttons">
                    <a href="https://www.instagram.com/pink.pockt?igsh=dHc1c3J4YWtpb3di" target="_blank" rel="noopener noreferrer" className="footer-info-rows-text">
                        <img src={hearticon} className="joinus-icons"/>
                        Follow Us on Instagram
                    </a>
                </div>
                
            </section>
        </div>
    );
}
export default Home;