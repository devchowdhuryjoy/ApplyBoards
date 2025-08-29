// import React from "react";
// import {
//   Home,
//   Search,
//   User,
//   FileText,
//   DollarSign,
//   Award,
//   CheckSquare,
//   Settings,
// } from "lucide-react";

// const AgentDashboard: React.FC = () => {
//   const menuItems = [
//     { icon: <Home size={22} />, label: "Dashboard" },
//     { icon: <Search size={22} />, label: "Search" },
//     { icon: <User size={22} />, label: "My Profile" },
//     { icon: <FileText size={22} />, label: "Applications" },
//     { icon: <CheckSquare size={22} />, label: "Tasks" },
//     { icon: <Settings size={22} />, label: "Settings" },
//     { icon: <Settings size={22} />, label: "Logout" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className="
//           group relative
//           w-16 hover:w-64
//           transition-all duration-300
//           bg-white border-r shadow-md
//           flex flex-col
//           p-4
//         "
//       >
//         {/* Logo */}
//         <div className="mb-8 flex items-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="logo"
//             className="w-8 h-8"
//           />
//           <span
//             className="
//               ml-2 font-bold text-primary text-lg
//               hidden group-hover:inline-block
//               transition-all duration-300
//               whitespace-nowrap
//             "
//           >
//             Agent Panel
//           </span>
//         </div>

//         {/* Nav Items */}
//         <nav className="flex flex-col gap-6">
//           {menuItems.map((item, i) => (
//             <a
//               key={i}
//               href="#"
//               className="
//                 flex items-center gap-3 text-gray-600 hover:text-primary
//                 font-medium px-2 py-2 rounded-md
//                 transition-colors
//               "
//             >
//               {item.icon}
//               <span
//                 className="
//                   hidden group-hover:inline-block
//                   transition-all duration-300
//                   whitespace-nowrap
//                 "
//               >
//                 {item.label}
//               </span>
//             </a>
//           ))}
//         </nav>
//       </aside>

//       {/* Dashboard Content */}
//       <main className="flex-1 p-6 sm:p-10">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//           Welcome to Agent Dashboard
//         </h1>
//         <p className="text-gray-600">
//           Here is your dashboard content. Sidebar is hover-expandable and fully
//           responsive.
//         </p>
//       </main>
//     </div>
//   );
// };

// export default AgentDashboard;



import React, { useState } from "react";
import {
  Home,
  Search,
  User,
  FileText,
  CheckSquare,
  Settings,
} from "lucide-react";

// Import your page components for the agent
import DashboardPage from "../../Slidebar/Dashboard/AgentPage/DashboardPage";
import SearchPage from "../../Slidebar/Dashboard/AgentPage/SearchPage";
import ProfilePage from "../../Slidebar/Dashboard/AgentPage/ProfilePage";
import ApplicationsPage from "../../Slidebar/Dashboard/AgentPage/ApplicationsPage ";
import TasksPage from "../../Slidebar/Dashboard/AgentPage/TasksPage";
import SettingsPage from "../../Slidebar/Dashboard/AgentPage/SettingsPage";

interface MenuItem {
  name: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <Home size={22} /> },
  { name: "My Profile", icon: <User size={22} /> },
  { name: "Applications", icon: <FileText size={22} /> },
  { name: "Tasks", icon: <CheckSquare size={22} /> },
  { name: "Logout", icon: <Settings size={22} /> },
];

const AgentDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

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
      case "Settings":
        return <SettingsPage />;
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
          {isOpen && <span className="ml-2 font-bold text-primary">Agent Panel</span>}
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-3 px-2 py-2 cursor-pointer
                hover:bg-primary hover:text-white transition rounded-lg
                ${activeMenu === item.name ? "bg-primary text-white" : "text-black"}`}
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
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AgentDashboard;
