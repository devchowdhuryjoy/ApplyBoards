// import React from "react";
// import { ArrowRight } from "lucide-react";

// const ProgramsPage: React.FC = () => {
//   return (
//     <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
//       {/* 🔶 Header Banner */}
//       <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
//         <div className="max-w-2xl">
//           <h2 className="text-xl sm:text-3xl font-bold mb-3">
//             My Programs
//           </h2>
//           <p className="text-sm sm:text-base mb-4 text-justify hyphens-auto">
//             Browse and manage your enrolled programs here.
//           </p>
//           <button className="bg-white text-black px-2 md:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
//             Explore Programs
//           </button>
//         </div>

//         {/* Decorative Icon */}
//         <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-30 pointer-events-none">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="orange"
//             viewBox="0 0 24 24"
//             className="w-32 h-32 sm:w-40 sm:h-40"
//           >
//             <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A7.002 7.002 0 0 1 5.07 13H7a1 1 0 1 1 0 2H5.07A7.002 7.002 0 0 1 11 17.93zM13 6.07V5a1 1 0 1 1 2 0v1.07A7.002 7.002 0 0 1 18.93 11H17a1 1 0 1 1 0-2h1.93A7.002 7.002 0 0 1 13 6.07z" />
//           </svg>
//         </div>
//       </div>

//       {/* 🔶 Programs Sections */}
//       <div className="mt-10 flex flex-col gap-6">
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">Enrolled Programs</h2>
//           <p className="text-black text-sm mb-4">
//             View the programs you are currently enrolled in and check their status.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             Manage Programs <ArrowRight size={18} />
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">Available Programs</h2>
//           <p className="text-black text-sm mb-4">
//             Explore new programs you can apply to or join.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             Explore Programs <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default ProgramsPage;



import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const ProgramsPage: React.FC = () => {
  // 🔶 University Data with Details
  const universities = [
    { 
      id: 1, 
      name: "University of Oxford", 
      country: "UK",
      details: "One of the oldest universities in the world.\nKnown for academic excellence.\nOffers wide range of programs.\nTop choice for international students."
    },
    { 
      id: 2, 
      name: "University of Cambridge", 
      country: "UK",
      details: "World-class research facilities.\nRich history and tradition.\nStrong alumni network.\nLeading in science and technology."
    },
    { 
      id: 3, 
      name: "Harvard University", 
      country: "USA",
      details: "Ivy League institution.\nGlobal leader in research.\nDiverse student community.\nTop-ranked business and law schools."
    },
    { 
      id: 4, 
      name: "MIT", 
      country: "USA",
      details: "Renowned for innovation.\nLeader in technology and engineering.\nStrong entrepreneurial culture.\nCutting-edge research labs."
    },
    { 
      id: 5, 
      name: "University of Toronto", 
      country: "Canada",
      details: "Canada’s top-ranked university.\nStrong in medicine and AI research.\nVibrant multicultural campus.\nGlobally recognized faculty."
    },
    { 
      id: 6, 
      name: "McGill University", 
      country: "Canada",
      details: "Located in Montreal.\nKnown for medical and law programs.\nDiverse international students.\nHigh global ranking."
    },
  ];

  const countries = ["All", "UK", "USA", "Canada"];
  const [selectedCountry, setSelectedCountry] = useState("All");

  // 🔶 Filtered Universities
  const filteredUniversities =
    selectedCountry === "All"
      ? universities
      : universities.filter((u) => u.country === selectedCountry);

  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      {/* 🔶 Header Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-3xl font-bold mb-3">
            Study Abroad Programs
          </h2>
          <p className="text-sm sm:text-base mb-4 text-justify hyphens-auto">
            Choose your dream country and explore top universities available for you.
          </p>
          <button className="bg-white text-black px-2 md:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Programs
          </button>
        </div>
      </div>

      {/* 🔶 Country Search & University Count */}
      <div className="mt-10 bg-white rounded-xl shadow-md border p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* Country Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-black">Select Country:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "🌍 All Countries" : c}
                </option>
              ))}
            </select>
          </div>

          {/* University Count */}
          <div className="text-sm text-black font-semibold">
            {selectedCountry === "All"
              ? `Total Universities: ${filteredUniversities.length}`
              : `${selectedCountry} Universities: ${filteredUniversities.length}`}
          </div>
        </div>

        {/* 🔶 University List */}
        {filteredUniversities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni) => (
              <div
                key={uni.id}
                className="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-black mb-2">{uni.country}</p>
                  {/* 🔶 4 Line Details */}
                  <p className="text-sm text-black whitespace-pre-line text-justify hyphens-auto">
                    {uni.details}
                  </p>
                </div>
                <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2 text-sm">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-black text-center mt-4">
            No universities found for {selectedCountry}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;


