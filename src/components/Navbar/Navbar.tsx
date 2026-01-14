import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/registration");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const destinations = ["UK", "USA", "Canada", "Australia", "Europe", "Hungary", "Denmark", "Finland", "Sweden", "Dubai", "Malaysia",];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Optional: destination gulo route e convert
  const getRoute = (country: string) => {
    switch (country) {
      case "UK":
        return "/uk";
      case "USA":
        return "/usa";
      case "Canada":
        return "/canada";
      case "Australia":
        return "/australia";
      case "Hungary":
        return "/hungary";
      case "Denmark":
        return "/hungary";
      case "Finland":
        return "/hungary";
      case "Sweden":
        return "/hungary";
      case "Dubai":
        return "/hungary";
      case "Malaysia":
        return "/hungary";
      case "Europe":
        return "/hungary";
      default:
        return "/";
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <GraduationCap className="w-7 h-7 text-primary" strokeWidth={2.5} />
          <span className="font-bold text-primary text-xl">Study XL</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xl ">
          <Link to="/program-search" className="text-black hover:text-primary">
            Students
          </Link>

          <Link
            to="/university"
            className="flex items-center gap-1 cursor-pointer text-black hover:text-primary"
          >
            University
          </Link>

          <Link
            to="/agent"
            className="flex items-center gap-1 cursor-pointer text-black hover:text-primary"
          >
            Agent
          </Link>

          <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <div
              className="flex items-center gap-1  cursor-pointer text-black hover:text-primary"
              onClick={() => setOpen(!open)}
            >
              Study Destinations <ChevronDown size={16} />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                {destinations.map((country) => (
                  <div
                    key={country}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(getRoute(country));
                      setOpen(false);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRegister}
              className="px-4 py-1.5 border border-blue-600 text-primary rounded-md hover:bg-blue-50 transition"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-secondary transition"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white border-t mt-2">
          <Link
            to="/program-search"
            onClick={() => setMobileOpen(false)}
            className="text-black hover:text-primary"
          >
            Students
          </Link>

          <Link
            to="/university"
            onClick={() => setMobileOpen(false)}
            className="text-black hover:text-primary"
          >
            University
          </Link>

          <Link
            to="/agent"
            onClick={() => setMobileOpen(false)}
            className="text-black hover:text-primary"
          >
            Agent
          </Link>

          {/* Study Destinations (Mobile) */}
          <div>
            <div
              className="flex items-center gap-1 text-black font-semibold cursor-pointer"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              Study Destinations
              <ChevronDown
                size={18}
                className={`transition ${
                  mobileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {mobileDropdownOpen && (
              <div className="ml-3 mt-2 flex flex-col gap-2">
                {destinations.map((country) => (
                  <div
                    key={country}
                    className="cursor-pointer text-gray-700 hover:text-primary"
                    onClick={() => {
                      navigate(getRoute(country));
                      setMobileOpen(false);
                      setMobileDropdownOpen(false);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <button
            onClick={() => {
              handleRegister();
              setMobileOpen(false);
            }}
            className="px-4 py-2 border border-blue-600 text-primary rounded-md hover:bg-blue-50"
          >
            Register
          </button>

          <button
            onClick={() => {
              handleLogin();
              setMobileOpen(false);
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
          >
            Log In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
