import React, { useState } from "react";
import {
  Home,
  BookOpen,
  User,
  FileText,
  DollarSign,
  Compass,
  Star,
  CheckSquare,
  Bell,
} from "lucide-react";
import DashboardPromotion from "./Dashboard/DashboardPromotion";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Home", icon: <Home size={22} /> },
  { name: "Programs & Schools", icon: <BookOpen size={22} /> },
  { name: "Profile", icon: <User size={22} /> },
  { name: "My Applications", icon: <FileText size={22} /> },
  { name: "Payments", icon: <DollarSign size={22} /> },
  { name: "360 Solutions", icon: <Compass size={22} /> },
  { name: "New", icon: <Star size={22} /> },
  { name: "My Tasks", icon: <CheckSquare size={22} /> },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${isOpen ? "w-56" : "w-16"} 
         bg-white border-r h-screen flex flex-col transition-all duration-500 ease-in-out fixed`}
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
        <div className="flex-1 flex flex-col mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-primary transition rounded-lg"
            >
              <span className="text-black">{item.icon}</span>
              {isOpen && <span className="text-black">{item.name}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main content with header */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${
          isOpen ? "ml-56" : "ml-16"
        }`}
      >
        {/* 🔹 Header (blue bar) */}
        <div className="flex items-center justify-between h-48 md:h-32 bg-primary px-4 text-white">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <Home size={20} />
            <span className="font-semibold">Home</span>
          </div>

          {/* Right side */}
          {/* <div className="flex items-center gap-4">
            <Bell size={20} className="cursor-pointer" />
            <User size={20} className="cursor-pointer" />
          </div> */}

          <div className="flex items-center gap-4 relative">
            <Bell size={20} className="cursor-pointer" />
            <User
              size={20}
              className="cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {/* Use the new component */}
            {profileOpen && <ProfileDropdown />}
          </div>

        </div>

        {/* Page content */}
        <div className="p-6 overflow-y-auto">
          <DashboardPromotion />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
