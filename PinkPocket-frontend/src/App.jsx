import { useState } from 'react';
import './App.css';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app">
      <Navbar />
      {/* Hamburger button below navbar */}
      <div className="app-hamburger" onClick={toggleSidebar}>
        <span className="app-dot">⋯</span>
      </div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;