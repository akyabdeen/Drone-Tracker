import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { SIDEBAR_ELEMENTS } from "../constants/siderbar";
import { Bell, Globe, SquareDashed, Menu, X } from "lucide-react";

const MainLayout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen text-white font-sans flex flex-col">
      {/* Header */}
      <div className="bg-sager-black py-5 px-4 w-full flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src="sager-logo.svg" alt="Sager Logo" />
        </div>
        
        <div className="flex items-center gap-3">
          {/* Icons - hide some on small screens */}
          <div className="hidden sm:flex items-center gap-3">
            <SquareDashed size={30} />
            <Globe size={30} />
          </div>
          <Bell size={30} />
          
          {/* Divider - hide on small screens */}
          <div className="w-px h-6 bg-sager-lighter-gray mx-4 hidden sm:block"></div>
          
          {/* User info - hide text on small screens */}
          <div className="flex flex-col">
            <h2 className="text-md hidden sm:block">Abdullah Abdeen</h2>
            <p className="text-sm text-sager-lighter-gray hidden sm:block">Fullstack Developer</p>
            {/* Show initials on mobile */}
            <div className="sm:hidden w-8 h-8 bg-sager-lighter-gray rounded-full flex items-center justify-center text-sager-black font-semibold">
              AA
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden shadow-lg">
        {/* Sidebar */}
        <div className={`bg-sager-dark-gray text-lg transition-transform duration-300 ease-in-out z-20 ${
          // Mobile: slide in/out from left, Desktop: always visible
          isSidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full md:translate-x-0'
        } fixed md:relative h-full w-48 md:w-fit pt-14`}>
          {/* Map */}
          {SIDEBAR_ELEMENTS.map((el, index) => (
            <Link
              key={index}
              className={`flex flex-col md:flex-col items-center py-4 px-8 md:px-8 ${
                el.path == pathname // is current page
                  ? "bg-sager-light-gray border-l-2 border-sager-active-red text-white"
                  : "hover:bg-sager-light-gray text-sager-lighter-gray"
              }`}
              to={el.path}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when link is clicked
            >
              <el.icon size={32} />
              <h1 className="text-sm md:text-base mt-1 text-center">{el.name}</h1>
            </Link>
          ))}
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
