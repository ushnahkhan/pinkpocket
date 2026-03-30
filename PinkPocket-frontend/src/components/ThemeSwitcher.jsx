import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import themeicon from "../assets/icons/themeicon.png"
const ThemeSwitcher=()=>{
    const [open,setOpen]=useState(false);
    const {themes,setTheme}=useTheme();
    return (
    <>
        
        <img src={themeicon} alt="" onClick={() => setOpen(!open)} className="theme-btn"/>
        {open && (
            <div className="theme-popup">
                <h3 className="theme-title">Choose Theme</h3>
                <div className="theme-options">
                    {Object.entries(themes).map(([name, color]) => (
                    <div
                        key={name}
                        onClick={() => {setTheme(name); setOpen(false);}}
                        className="theme-circle"
                        style={{ backgroundColor: color }}
                    ></div>
                    ))}
                </div>
            </div>
        )}
    </>
    );
}
export default ThemeSwitcher;