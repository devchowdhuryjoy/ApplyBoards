import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const ProgramDetails = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  /* Pagination state  */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch programs from API
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${BASE_URL}/university-programs/`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      // Handle different response formats
      let programsData = [];
      if (response.data && Array.isArray(response.data)) {
        programsData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        programsData = response.data.data;
      } else {
        programsData = [];
      }
      
      setPrograms(programsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError("Failed to load programs. Please try again.");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date to "Mar 2026" format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return "N/A";
    }
  };

  // Format currency to "$21,237.00 CAD" format
  const formatCurrency = (amount) => {
    if (!amount) return "$0.00 CAD";
    try {
      const num = parseFloat(amount);
      if (isNaN(num)) return "$0.00 CAD";
      return `$${num.toFixed(2)} CAD`;
    } catch {
      return "$0.00 CAD";
    }
  };

  // Format intake name (if available) or use open_date
  const getIntakeDisplay = (program) => {
    if (program.intake_name && program.intake_name !== "N/A") {
      return program.intake_name;
    }
    return formatDate(program.open_date);
  };

  // Prepare data for display (matching your original structure)
  const displayPrograms = programs.map(program => ({
    title: program.program_name || "Unnamed Program",
    university: program.university_name || "Unknown University",
    intake: getIntakeDisplay(program),
    deadline: formatDate(program.submission_deadline),
    tuition: formatCurrency(program.average_gross_tuition),
    fee: formatCurrency(program.application_fee)
  }));

  // Check if we need pagination (more than 3 programs)
  const needsPagination = displayPrograms.length > 3;
  
  // Pagination calculations - 
  const totalPages = needsPagination ? Math.ceil(displayPrograms.length / itemsPerPage) : 1;
  const startIndex = needsPagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = needsPagination ? startIndex + itemsPerPage : displayPrograms.length;
  const currentPrograms = displayPrograms.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-9 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-black">Loading programs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-9 px-4">
        <div className="text-center py-12">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Programs</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={fetchPrograms}
            className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-9 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl">📄</span>
        </div>
        <h2 className="text-3xl font-semibold">Programs</h2>
        <span className="text-sm bg-blue-100 text-secondary px-3 py-1 rounded-full">
          {displayPrograms.length}
        </span>
      </div>

      {/* Program Cards */}
      <div className="space-y-6">
        {displayPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-black mb-2">No programs available</h3>
            <p className="text-black">Create your first program to get started!</p>
          </div>
        ) : (
          currentPrograms.map((p, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
              <p className="text-black mb-4">{p.university}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-black text-sm">Earliest Intake</p>
                  <p className="font-semibold">{p.intake}</p>
                </div>

                <div>
                  <p className="text-black text-sm">Deadline</p>
                  <p className="font-semibold">{p.deadline}</p>
                </div>

                <div>
                  <p className="text-black text-sm">Tuition (1st year)</p>
                  <p className="font-semibold">{p.tuition}</p>
                </div>

                <div>
                  <p className="text-black text-sm">Application Fee</p>
                  <p className="font-semibold">{p.fee}</p>
                </div>
              </div>

              <button className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition">
                Program Details
              </button>
            </div>
          ))
        )}
      </div>

      
      {needsPagination && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-secondary text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}
      
    </div>
  );
};

export default ProgramDetails;