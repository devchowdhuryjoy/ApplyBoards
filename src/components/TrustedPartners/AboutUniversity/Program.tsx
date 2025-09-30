import React from "react";

const Program: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="What would you like to study?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]"
          />
        </div>

        {/* Destination Dropdown */}
        <select className="border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Destination</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
        </select>

        {/* Institution Dropdown */}
        <select className="border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Institution (School)</option>
          <option>Harvard</option>
          <option>Oxford</option>
          <option>Toronto</option>
        </select>
      </div>

      {/* Extra Filters */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Program level</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Field of study</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Intakes</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22]">
          <option>Program tag</option>
        </select>

        {/* All filters button */}
        <button className="flex items-center gap-2 bg-[#f16f22] text-white px-5 py-2 rounded-lg hover:bg-[#f16f22]/80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          All filters
        </button>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Result count + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-semibold text-black">
          2000+ programs found
        </p>

        <button className="flex items-center gap-2 mt-3 md:mt-0 border border-gray-300 px-4 py-2 rounded-lg hover:bg-[#f16f22] transition">
          <span className="text-[#f16f22]">●</span>
          <span>Sort</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Program;

