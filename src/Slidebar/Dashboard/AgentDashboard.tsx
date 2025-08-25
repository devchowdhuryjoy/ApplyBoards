import React from "react";
import {
  Home,
  Search,
  User,
  FileText,
  DollarSign,
  Award,
  CheckSquare,
  Settings,
} from "lucide-react";

const AgentDashboard: React.FC = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: "Dashboard" },
    { icon: <Search size={22} />, label: "Search" },
    { icon: <User size={22} />, label: "My Profile" },
    { icon: <FileText size={22} />, label: "Applications" },
    { icon: <CheckSquare size={22} />, label: "Tasks" },
    { icon: <Settings size={22} />, label: "Settings" },
    { icon: <Settings size={22} />, label: "Logout" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className="
          group relative
          w-16 hover:w-64
          transition-all duration-300
          bg-white border-r shadow-md
          flex flex-col
          p-4
        "
      >
        {/* Logo */}
        <div className="mb-8 flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span
            className="
              ml-2 font-bold text-primary text-lg
              hidden group-hover:inline-block
              transition-all duration-300
              whitespace-nowrap
            "
          >
            Agent Panel
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="
                flex items-center gap-3 text-gray-600 hover:text-primary
                font-medium px-2 py-2 rounded-md
                transition-colors
              "
            >
              {item.icon}
              <span
                className="
                  hidden group-hover:inline-block
                  transition-all duration-300
                  whitespace-nowrap
                "
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to Agent Dashboard
        </h1>
        <p className="text-gray-600">
          Here is your dashboard content. Sidebar is hover-expandable and fully
          responsive.
        </p>
      </main>
    </div>
  );
};

export default AgentDashboard;
