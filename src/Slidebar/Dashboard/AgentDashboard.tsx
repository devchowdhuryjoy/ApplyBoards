


import React, { useState } from "react";
import {
  Home,
  Search,
  User,
  FileText,
  CheckSquare,
  GraduationCap,
  User2,
  Bell,
  Menu, // Mobile Menu Icon
  X,    // Mobile Close Icon
} from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";

// Import your page components
import DashboardPage from "../../Slidebar/Dashboard/AgentPage/DashboardPage";
import SearchPage from "../../Slidebar/Dashboard/AgentPage/SearchPage";
import ProfilePage from "../../Slidebar/Dashboard/AgentPage/ProfilePage";
import ApplicationsPage from "../../Slidebar/Dashboard/AgentPage/ApplicationsPage ";
import TasksPage from "../../Slidebar/Dashboard/AgentPage/TasksPage";
import Universityshow from "./AgentPage/Universityshow";
import StudentsProfile from "./AgentPage/StudentsProfile";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import AllAgentStudentData from "./AgentPage/AllAgentStudentData";
import NotificationDropdown from "../../components/Notification/NotificationDropdown";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <Home size={22} /> },
  { name: "My Profile", icon: <User size={22} /> },
  { name: "StudentsProfile", icon: <User2 size={22} /> },
  { name: "AllStudentData", icon: <FaUserGraduate size={22} /> },
  { name: "Programs & University", icon: <GraduationCap size={22} /> },
  { name: "Applications", icon: <FileText size={22} /> },
  { name: "Tasks", icon: <CheckSquare size={22} /> },
];

const AgentDashboard: React.FC = () => {
  // Desktop Hover State
  const [isOpen, setIsOpen] = useState(false);
  // Mobile Drawer State
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("activeMenu") || "Dashboard";
  });

  const handleMenuClick = (name: string) => {
    setActiveMenu(name);
    localStorage.setItem("activeMenu", name);
    setIsMobileOpen(false); 
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard": return <DashboardPage />;
      case "Search": return <SearchPage />;
      case "My Profile": return <ProfilePage />;
      case "Applications": return <ApplicationsPage />;
      case "Tasks": return <TasksPage />;
      case "Programs & University": return <Universityshow />;
      case "StudentsProfile": return <StudentsProfile />;
      case "AllStudentData": return <AllAgentStudentData />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 relative overflow-hidden">
      
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
          
          /* Mobile: Default width 64, slide in/out logic */
          w-64
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop: Always visible (translate-x-0), Width depends on Hover (isOpen) */
          lg:translate-x-0
          ${isOpen ? "lg:w-64" : "lg:w-16"}
        `}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 border-b px-4">
          <div className="flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo"
              className="w-8 h-8"
            />
            {/* Logo Text Logic */}
            <span 
              className={`ml-2 font-bold text-primary whitespace-nowrap transition-opacity duration-300
              ${(isOpen || isMobileOpen) ? "opacity-100 block" : "opacity-0 hidden lg:hidden"}`}
            >
              Agent Panel
            </span>
          </div>

          {/* Close Button (Mobile Only) */}
          <button 
            className="lg:hidden text-gray-500"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col mt-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center gap-3 px-3 py-2 mx-2 cursor-pointer
                hover:bg-primary hover:text-white transition rounded-lg whitespace-nowrap
                ${
                  activeMenu === item.name
                    ? "bg-primary text-white"
                    : "text-black"
                }`}
            >
              <div className="min-w-[22px]">{item.icon}</div>
              <span className={`
                transition-all duration-200
                ${(isOpen || isMobileOpen) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 w-0 overflow-hidden lg:hidden"}
              `}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Content Wrapper */}
      <div
        className={`flex flex-col flex-1 h-full w-full transition-all duration-300
          /* Mobile: No margin */
          ml-0
          /* Desktop: Margin changes with sidebar width */
          ${isOpen ? "lg:ml-64" : "lg:ml-16"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full h-16 bg-primary px-4 text-white sticky top-0 z-20 shadow-md">
          
          {/* Left: Mobile Menu Trigger & Page Title */}
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-1 hover:bg-white/20 rounded"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-lg truncate">{activeMenu}</span>
          </div>

          {/* Right Side Icons:
             FIXED HERE: Used "flex items-center" and REMOVED absolute positioning.
             This ensures "TR" sits inside the orange bar next to the User icon.
          */}
          <div className="flex items-center gap-4">
            {/* <Bell size={20} className="cursor-pointer hover:text-gray-200" /> */}
            <NotificationDropdown />
            <User
              size={20}
              className="cursor-pointer hover:text-gray-200"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {/* ProfileDropdown is rendered directly in the flex flow.
               It will sit to the RIGHT of the User icon, inside the header.
            */}
            {profileOpen && (
              <div className="flex-shrink-0">
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

export default AgentDashboard;
