import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/registration");
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-primary" strokeWidth={2.5} />
          <span className="font-bold text-primary text-xl">Study XL</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xl ">
          <a href="#" className="text-black hover:text-primary">
            Students
          </a>

          <div className="flex items-center gap-1 cursor-pointer text-black hover:text-primary">
            Study Destinations <ChevronDown size={16} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer text-black hover:text-primary">
            Partners <ChevronDown size={16} />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRegister}
              className="px-4 py-1.5 border border-blue-600 text-primary rounded-md hover:bg-blue-50 transition"
            >
              Register
            </button>
            <button className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-secondary transition">
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
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t mt-2">
          <a href="#" className="text-black hover:text-primary">
            Students
          </a>
          <a
            href="#"
            className="flex items-center gap-1 text-black hover:text-primary"
          >
            Study Destinations <ChevronDown size={16} />
          </a>
          <a
            href="#"
            className="flex items-center gap-1 text-black hover:text-primary"
          >
            Partners <ChevronDown size={16} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
