import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import themeicon from "../assets/icons/themeicon.png";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
    const [open, setOpen] = useState(false);
    const { themes, setTheme, theme: activeTheme } = useTheme();

    const themeLabels = {
        pink: "Pink Pockets",
        lavender: "Lavender Dreams",
        mint: "Mint Fresh",
        peach: "Peachy Keen",
        sky: "Sky Blue"
    };

    return (
        <>
            {/* The trigger icon now has a specific class for sizing */}
            <img 
                src={themeicon} 
                alt="Theme Settings" 
                onClick={() => setOpen(!open)} 
                className="theme-fab-icon" 
            />
            
            {open && (
                <div className="theme-backdrop" onClick={() => setOpen(false)}>
                    <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="theme-modal-header">
                            <h3 className="theme-modal-title">Choose Your Theme</h3>
                            <button className="theme-close-btn" onClick={() => setOpen(false)}>✕</button>
                        </div>
                        <div className="theme-list">
                            {Object.entries(themes).map(([name, color]) => (
                                <div 
                                    key={name} 
                                    className={`theme-row ${activeTheme === name ? 'theme-row-active' : ''}`}
                                    onClick={() => { setTheme(name); setOpen(false); }}
                                >
                                    <div className="theme-row-circle" style={{ backgroundColor: color }}></div>
                                    <span className="theme-row-label">{themeLabels[name]}</span>
                                    <div className="theme-row-dot" style={{ backgroundColor: activeTheme === name ? '#3a2a35' : '#eee' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ThemeSwitcher;