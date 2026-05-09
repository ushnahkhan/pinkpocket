import "./Footer.css";
import pinkpicon from "../assets/icons/pinkpicon.png";
import phoneicon from "../assets/icons/phoneicon.png";
import whatsappicon from "../assets/icons/whatsappicon.png";
import instagramicon from "../assets/icons/instagram.png";
import emailicon from "../assets/icons/emailicon.png";
const Footer = () => {
    return (
        <footer className="footer-container">

            <div className="footer-top">
                <img src={pinkpicon} className="footer-logo" alt="PinkPocket"></img>
                <p className="footer-title">PinkPocket</p>
            </div>
            <div className="footer-info">
                <div className="footer-info-title">About Us</div>
                <div className="footer-info-rows-text">PinkPocket is a thoughtfully designed online space created
                    for young women who love aesthetics without stretching their budget. 
                    We believe that shopping for stationery and accessories should feel personal, 
                    inspiring, and fun—just like scrolling through your favorite Pinterest boards. 
                    From soft pastel themes to customizable touches, every detail of PinkPocket is crafted 
                    to reflect individuality and creativity. Our goal is to make stylish, affordable products 
                    accessible while delivering a smooth and enjoyable digital experience that feels uniquely yours.
                </div>
                <div className="footer-info-title">Contact Us</div>
                <div className="footer-info-rows-container">
                    <div className="footer-info-rows">
                        <img className="footer-info-rows-logo" src={phoneicon}></img>
                        <div className="footer-info-rows-text">+92 335 1487209</div>
                    </div>
                    <div className="footer-info-rows">
                        <img className="footer-info-rows-logo" src={emailicon}></img>
                        <div className="footer-info-rows-text">pinkpocktt@gmail.com</div>
                    </div>
                    <div className="footer-info-rows">
                        <img className="footer-info-rows-logo" src={instagramicon}></img>
                        <a href="https://www.instagram.com/pink.pockt?igsh=dHc1c3J4YWtpb3di" target="_blank" rel="noopener noreferrer" className="footer-info-rows-text">@instagram/pink.pockt</a>
                    </div>
                    <div className="footer-info-rows">
                        <img className="footer-info-rows-logo" src={whatsappicon}></img>
                        <div className="footer-info-rows-text">+92 335 1487209</div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;