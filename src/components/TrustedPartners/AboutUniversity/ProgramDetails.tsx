import React, { useState } from "react";

const ProgramDetails = () => {
  const programs = [
    {
      title: "College Diploma - Law Enforcement Studies",
      university: "Justice Institute of British Columbia - New Westminster Campus",
      intake: "Sep 2026",
      deadline: "Mar 2026",
      tuition: "$17,697.00 CAD",
      fee: "$150.00 CAD",
    },
    {
      title: "Bachelor of Law Enforcement Studies",
      university: "Justice Institute of British Columbia - New Westminster Campus",
      intake: "Sep 2026",
      deadline: "Mar 2026",
      tuition: "$21,237.00 CAD",
      fee: "$150.00 CAD",
    },
    {
      title: "Bachelor of Law Enforcement Studies",
      university: "Justice Institute of British Columbia - New Westminster Campus",
      intake: "Sep 2026",
      deadline: "Mar 2026",
      tuition: "$21,237.00 CAD",
      fee: "$150.00 CAD",
    },
  ];

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(programs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPrograms = programs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-9 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl">📄</span>
        </div>
        <h2 className="text-3xl font-semibold">Programs</h2>
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {programs.length}
        </span>
      </div>

      {/* Program Cards */}
      <div className="space-y-6">
        {currentPrograms.map((p, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
            <p className="text-gray-600 mb-4">{p.university}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-500 text-sm">Earliest Intake</p>
                <p className="font-semibold">{p.intake}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Deadline</p>
                <p className="font-semibold">{p.deadline}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Tuition (1st year)</p>
                <p className="font-semibold">{p.tuition}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Application Fee</p>
                <p className="font-semibold">{p.fee}</p>
              </div>
            </div>

            <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
              Program Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgramDetails;


