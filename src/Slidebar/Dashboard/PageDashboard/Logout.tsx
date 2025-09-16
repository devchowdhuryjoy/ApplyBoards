import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        localStorage.clear();

        Swal.fire("Logged Out!", "You have been logged out.", "success");

        navigate("/"); 
      }
    });
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
