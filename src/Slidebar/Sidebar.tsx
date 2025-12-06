import React, { useState } from "react";
import {
  Home,
  BookOpen,
  User,
  FileText,
  CheckSquare,
  Bell,
} from "lucide-react";
// import { LogOut } from "lucide-react";

import HomePage from "../Slidebar/Dashboard/PageDashboard/HomePage";
import ProgramsPage from "../Slidebar/Dashboard/PageDashboard/ProgramsPage";
import ProfilePage from "../Slidebar/Dashboard/PageDashboard/ProfilePage";
import ApplicationsPage from "../Slidebar/Dashboard/PageDashboard/ApplicationsPage";
import TasksPage from "../Slidebar/Dashboard/PageDashboard/TasksPage";

import ProfileDropdown from "../Slidebar/ProfileDropdown/ProfileDropdown";
// import Logout from "./Dashboard/PageDashboard/Logout";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Home", icon: <Home size={22} /> },
  { name: "University", icon: <BookOpen size={22} /> },
  { name: "Profile", icon: <User size={22} /> },
  { name: "My Applications", icon: <FileText size={22} /> },
  { name: "My Tasks", icon: <CheckSquare size={22} /> },
  // { name: "Logout", icon: <LogOut size={22} /> },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // const [activeMenu, setActiveMenu] = useState("Home");

  const [activeMenu, setActiveMenu] = useState<string>(
    localStorage.getItem("activeMenu") || "Home"
  );

  // Update activeMenu handler
  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName); // Save in localStorage
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home":
        return <HomePage />;
      case "University":
        return <ProgramsPage />;
      case "Profile":
        return <ProfilePage />;
      case "My Applications":
        return <ApplicationsPage />;
      case "My Tasks":
        return <TasksPage />;
      // case "Logout":
      //   return <Logout />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-56" : "w-16"
        } bg-white border-r h-screen flex flex-col transition-all duration-500 ease-in-out fixed`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-primary text-xl font-bold">
            {isOpen ? "Study XL" : "XL"}
          </span>
        </div>

        {/* Menu */}
        
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(item.name)}
            className={`flex items-center gap-3 px-2 py-2 cursor-pointer 
            hover:bg-primary hover:text-white transition rounded-lg
            ${activeMenu === item.name ? "bg-primary text-white" : "text-black"}`}
            >
            <span>{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Main content with header */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${
          isOpen ? "ml-56" : "ml-16"
        }`}
      >
        {/* Header (Smaller Height) */}
        <div className="flex items-center justify-between w-full h-16 bg-primary px-4 text-white">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{activeMenu}</span>
          </div>

          <div className="flex items-center gap-4 relative">
            <Bell size={20} className="cursor-pointer" />
            <User
              size={20}
              className="cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && <ProfileDropdown />}
          </div>
        </div>

        {/* Page content (Scrollable Below Header) */}
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
