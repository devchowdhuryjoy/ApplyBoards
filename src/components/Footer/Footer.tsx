import React from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-light pt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo + Address */}
          <div>
            <h2 className="text-primary font-bold text-xl mb-3 flex items-center space-x-2">
              {/* Replace with your SVG/Logo */}
              <span>🎓</span>
              <span>Study XL</span>
            </h2>
            <p className="text-black text-sm mb-4">
              Kirkdale House,<br />
              7 Kirkdale Road, E11 1HP, <br />
              London, UK.
            </p>
            <div className="flex space-x-4 text-primary text-lg">
              <FaLinkedin />
              <FaFacebook />
              <FaInstagram />
              <FaTiktok />
              <FaYoutube />
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-2 text-primary">Students</h3>
            <p className="mb-2">Recruitment Partners</p>
            <p className="mb-2">Institutions</p>
            <h3 className="font-semibold mt-4 mb-2 text-primary">Explore</h3>
            <p className="mb-2">Find Programs & Institutions</p>
            <p>360 Solutions</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-2 text-primary">Destinations</h3>
            <p className="mb-2">Australia</p>
            <p className="mb-2">Canada</p>
            <p className="mb-2">Germany</p>
            <p className="mb-2">Ireland</p>
            <p className="mb-2">United Kingdom</p>
            <p>United States</p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-2 text-primary">About</h3>
            <p className="mb-2">Our Story</p>
            <p className="mb-2">Careers</p>
            <p className="mb-2">Press and Media</p>
            <p>Contact</p>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-2 text-primary">Resources</h3>
            <p className="mb-2">Blog</p>
            <p className="mb-2">Webinar</p>
            <p>ApplyInsights</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-black font-semibold">
        Copyright © 2025{" "}
        <span className="font-medium text-[#f16f22]">Study XL</span> |
        Powered by <span className="font-medium text-[#f16f22]">Global Routway Consultants</span>
      </div>

      </div>
    </footer>
  );
};

export default Footer;
