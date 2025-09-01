import React from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Static logout functionality
    // Session clear korte paren ekhane, for now alert
    alert("You have been logged out.");
    navigate("/login"); // Login page e redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col gap-4">
        <div className="text-sm sm:text-base text-black">
          Here you can manage your account logout.
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-lg bg-primary hover:bg-secondary text-white font-medium shadow text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
