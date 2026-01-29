import React, { useState } from "react";
import {
  Home,
  BookOpen,
  User,
  FileText,
  CheckSquare,
  Bell,
  Menu, 
  X,   
} from "lucide-react";

import HomePage from "../Slidebar/Dashboard/PageDashboard/HomePage";
import ProgramsPage from "../Slidebar/Dashboard/PageDashboard/ProgramsPage";
import ProfilePage from "../Slidebar/Dashboard/PageDashboard/ProfilePage";
import ApplicationsPage from "../Slidebar/Dashboard/PageDashboard/ApplicationsPage";
import TasksPage from "../Slidebar/Dashboard/PageDashboard/TasksPage";

import ProfileDropdown from "../Slidebar/ProfileDropdown/ProfileDropdown";
import NotificationDropdown from "../components/Notification/NotificationDropdown";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Home", icon: <Home size={22} /> },
  { name: "Profile", icon: <User size={22} /> },
  { name: "Programs", icon: <BookOpen size={22} /> },
  { name: "My Applications", icon: <FileText size={22} /> },
  { name: "My Tasks", icon: <CheckSquare size={22} /> },
];

const Sidebar: React.FC = () => {
  // Desktop Hover State
  const [isOpen, setIsOpen] = useState(false);
  // Mobile Drawer State
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [profileOpen, setProfileOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<string>(
    localStorage.getItem("activeMenu") || "Home"
  );

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
    setIsMobileOpen(false); 
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home": return <HomePage />;
      case "Programs": return <ProgramsPage />;
      case "Profile": return <ProfilePage />;
      case "My Applications": return <ApplicationsPage />;
      case "My Tasks": return <TasksPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden relative">
      
      {/* 1. Mobile Overlay (Backdrop) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 2. Sidebar Section */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r z-40 flex flex-col
          transition-all duration-300 ease-in-out
          
          /* Mobile Logic: width 64px, translate toggles based on isMobileOpen */
          w-64
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop Logic (lg): Always visible (translate-x-0), Width depends on Hover (isOpen) */
          lg:translate-x-0
          ${isOpen ? "lg:w-56" : "lg:w-16"}
        `}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between lg:justify-center h-16 border-b px-4 lg:px-0">
          <span className="text-primary text-xl font-bold whitespace-nowrap overflow-hidden">
            <span className="lg:hidden">Study XL</span>
            <span className="hidden lg:block">
               {isOpen ? "Study XL" : "XL"}
            </span>
          </span>

          {/* Close Button (Mobile Only) */}
          <button 
            className="lg:hidden text-gray-500 hover:text-red-300"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col mt-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center gap-3 px-3 py-3 mx-2 cursor-pointer 
              hover:bg-primary hover:text-white transition rounded-lg whitespace-nowrap
              ${activeMenu === item.name ? "bg-primary text-white" : "text-black"}`}
            >
              <div className="min-w-[22px]">{item.icon}</div>
              
              {/* Text Visibility Logic */}
              <span className={`
                 transition-all duration-200
                 /* Mobile: Always visible */
                 block lg:hidden
                 /* Desktop: Visible only when hovered (isOpen) */
                 ${isOpen ? "lg:block" : "lg:hidden"}
              `}>
                {item.name}
              </span>
              
              {/* Special case for desktop smooth transition text */}
              <span className={`hidden lg:block ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                  {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Content Wrapper */}
      <div
        className={`flex flex-col flex-1 h-full w-full transition-all duration-300
          /* Mobile: No margin (content covers full width) */
          ml-0
          /* Desktop: Margin pushes content based on sidebar width */
          ${isOpen ? "lg:ml-56" : "lg:ml-16"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full h-16 bg-primary px-4 text-white sticky top-0 z-20 shadow-md">
          
          {/* Left Side: Hamburger & Title */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu (Mobile Only) */}
            <button 
              className="lg:hidden p-1 hover:bg-white/20 rounded"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-lg">{activeMenu}</span>
          </div>

          {/* Right Side: Icons & Profile */}
          <div className="flex items-center gap-4">
            {/* <Bell size={20} className="cursor-pointer hover:text-gray-200" /> */}
            <NotificationDropdown />
            <User
              size={20}
              className="cursor-pointer hover:text-gray-200"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {/* Profile Dropdown Logic */}
            {profileOpen && (
              <div className="flex-shrink-0 relative">
                 <ProfileDropdown />
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


