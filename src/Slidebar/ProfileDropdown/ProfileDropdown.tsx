
// import React, { useRef, useEffect, useState } from "react";
// import { User, Settings, Bell, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// interface ProfileDropdownProps {
  
//   onClose?: () => void;
// }

// const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.clear();
//         Swal.fire("Logged Out!", "You have been logged out.", "success");
//         navigate("/"); // Redirect to homepage
//       }
//     });
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative">
//       {/* Profile Icon */}
//       <div
//         className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         Ag
//       </div>

//       {/* Dropdown */}
//       {isOpen && (
//         <div
//           ref={dropdownRef}
//           className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-black z-50"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
//               IC
//             </div>
//             <div>
//               <div className="font-semibold">Imran Chowdhury</div>
//               <div className="text-sm text-gray-500">imranorbit5@gmail.com</div>
//             </div>
//           </div>
//           <div className="flex flex-col space-y-2">
//             <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
//               <Bell size={18} /> Notification Settings
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-red-600"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;


import React, { useRef, useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface UserInfo {
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
}

interface ProfileDropdownProps {
  onClose?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserInfo>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //Load user from localStorage (auth)
  useEffect(() => {
    const authRaw = localStorage.getItem("auth");

    if (authRaw) {
      try {
        const auth = JSON.parse(authRaw);
        setUser(auth.user || {});
      } catch (err) {
        console.error("Auth parse error", err);
      }
    }
  }, []);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Name logic (first + last fallback)
  const fullName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    user.name ||
    "User";

  // Avatar letters
  const avatarText = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {avatarText}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-black z-50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
              {avatarText}
            </div>
            <div>
              <div className="font-semibold">{fullName}</div>
              <div className="text-sm text-gray-500">
                {user.email || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
              <Bell size={18} /> Notification Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-red-600"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;




