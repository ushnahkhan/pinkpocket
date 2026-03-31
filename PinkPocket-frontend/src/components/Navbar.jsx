import {Link} from "react-router-dom";
import pinkpocketicon from "../assets/icons/pinkpicon.png";
import "../App.css"
import bagicon from "../assets/icons/bagicon.png";
import proficon from "../assets/icons/loginicon.png";

import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="navbar">
            <Link to="/products" className="navbar-left">  {/* Changed from "/" to "/products" */}
                <img src={pinkpocketicon} alt="logo" className="navbar-logo"></img>
                <span className="navbar-title">PinkPocket</span>
            </Link>
            <div className="navbar-right">
                <Link to="/products" className="nav-link">Shop</Link>
                <Link to="/cart" className="nav-cart">
                    <img src={bagicon} alt="cartlogo" className="navbar-logo"></img>
                </Link>
                <Link to="/login" className="nav-link">Login 
                    <img src={proficon} alt="proflogo" className="navbar-logo"></img>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;