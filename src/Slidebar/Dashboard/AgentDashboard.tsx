import React, { useState } from "react";
import {
  Home,
  Search,
  User,
  FileText,
  Settings,
  CheckSquare,
  GraduationCap,
  User2,
  Bell,
} from "lucide-react";
// import { LogOut } from "lucide-react";

// Import your page components for the agent
import DashboardPage from "../../Slidebar/Dashboard/AgentPage/DashboardPage";
import SearchPage from "../../Slidebar/Dashboard/AgentPage/SearchPage";
import ProfilePage from "../../Slidebar/Dashboard/AgentPage/ProfilePage";
import ApplicationsPage from "../../Slidebar/Dashboard/AgentPage/ApplicationsPage ";
import TasksPage from "../../Slidebar/Dashboard/AgentPage/TasksPage";
import SettingsPage from "../../Slidebar/Dashboard/AgentPage/SettingsPage";
import Universityshow from "./AgentPage/Universityshow";
import StudentsProfile from "./AgentPage/StudentsProfile";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import AllAgentStudentData from "./AgentPage/AllAgentStudentData";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <Home size={22} /> },
  { name: "My Profile", icon: <User size={22} /> },
  { name: "Applications", icon: <FileText size={22} /> },
  { name: "Tasks", icon: <CheckSquare size={22} /> },
  { name: "Programs & University", icon: <GraduationCap size={22} /> },
  { name: "StudentsProfile", icon: <User2 size={22} /> },
  { name: "AllAgentStudentData", icon: <User2 size={22} /> },
  // { name: "Logout", icon: <LogOut size={22} /> },
];

const AgentDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("activeMenu") || "Dashboard";
  });

  const handleMenuClick = (name: string) => {
    setActiveMenu(name);
    localStorage.setItem("activeMenu", name);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <DashboardPage />;
      case "Search":
        return <SearchPage />;
      case "My Profile":
        return <ProfilePage />;
      case "Applications":
        return <ApplicationsPage />;
      case "Tasks":
        return <TasksPage />;
      case "Programs & University":
        return <Universityshow />;
      case "StudentsProfile":
        return <StudentsProfile />;
      case "AllAgentStudentData":
        return <AllAgentStudentData/>;
      // case "Logout":
      //   return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white border-r h-screen flex flex-col transition-all duration-300 ease-in-out fixed`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="logo"
            className="w-8 h-8"
          />
          {isOpen && (
            <span className="ml-2 font-bold text-primary">Agent Panel</span>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center gap-3 px-2 py-2 cursor-pointer
                hover:bg-primary hover:text-white transition rounded-lg
                ${
                  activeMenu === item.name
                    ? "bg-primary text-white"
                    : "text-black"
                }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full h-16 bg-primary px-4 text-white">
          <span className="font-semibold text-lg">{activeMenu}</span>
          {/* Optional: profile dropdown */}
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

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AgentDashboard;
