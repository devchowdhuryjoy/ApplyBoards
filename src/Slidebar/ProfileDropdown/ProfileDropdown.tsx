
import React from "react";
import { User, Settings, Bell, LogOut } from "lucide-react";

interface ProfileDropdownProps {
  onClose?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-[350px] w-64 bg-white rounded-lg shadow-lg p-4 text-black z-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          IC
        </div>
        <div>
          <div className="font-semibold">Imran Chowdhury</div>
          <div className="text-sm text-gray-500">imranorbit5@gmail.com</div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
          <User size={18} /> My Profile
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
          <Settings size={18} /> Account Settings
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
          <Bell size={18} /> Notification Settings
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
