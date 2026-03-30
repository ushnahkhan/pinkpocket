import { createContext,useContext,useState,useEffect } from "react";
const themes={
    pink:"#fef5f8",lavender:"#c8b8f5",mint:"#b8f5d0",peach:"#f5d0b8",sky:"#b8d0f5"
};

const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState("pink");
    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    return(
        <ThemeContext.Provider value={{theme,setTheme,themes}}>
            {children}
        </ThemeContext.Provider>)
};
export const useTheme=()=>useContext(ThemeContext);