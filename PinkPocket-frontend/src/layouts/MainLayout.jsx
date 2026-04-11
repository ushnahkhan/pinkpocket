import {Outlet} from "react-router-dom";
import Themeswitcher from "../components/ThemeSwitcher";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
    return (
        <div className="min.h.screen flex flex-col">
            <Navbar/>
            <main className="flex-grow main-content">
                <Outlet />
            </main>
            <Themeswitcher />
            <Footer/>
        </div>
    );
};

export default MainLayout;