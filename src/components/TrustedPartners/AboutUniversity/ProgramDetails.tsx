// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// const ProgramDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   useEffect(() => {
//     if (id) {
//       fetchPrograms();
//     }
//   }, [id]);

//   const fetchPrograms = async () => {
//     try {
//       setLoading(true);

//       // Public API - no token required
//       const response = await axios.get(
//         `${BASE_URL}/university/${id}/programs`,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("API Response:", response.data);

//       let programsData = [];
//       if (response.data && Array.isArray(response.data)) {
//         programsData = response.data;
//       } else if (
//         response.data &&
//         response.data.data &&
//         Array.isArray(response.data.data)
//       ) {
//         programsData = response.data.data;
//       } else if (
//         response.data &&
//         response.data.programs &&
//         Array.isArray(response.data.programs)
//       ) {
//         programsData = response.data.programs;
//       } else {
//         programsData = [];
//       }

//       setPrograms(programsData);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching programs:", err);

//       try {
//         await fetchProgramsWithOptionalToken();
//       } catch (altErr) {
//         setError("Failed to load programs. Please try again.");
//         setPrograms([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   //program click to id navigation program university
//   const handleProgramDetailsClick = (program) => {
//   // Try different ID fields
//   const programId = program.id || program.program_id || program.originalProgram?.id;
  
//   if (programId) {
//     navigate(`/program-university/${programId}`);
//   } else {
//     console.error("No program ID found:", program);
//     // Fallback: navigate with a placeholder or show error
//     navigate(`/program-university/not-found`);
//   }
// };

//   const fetchProgramsWithOptionalToken = async () => {
//     // Optional token
//     const token =
//       localStorage.getItem("auth_token") ||
//       sessionStorage.getItem("auth_token");

//     const headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await axios.get(`${BASE_URL}/university/${id}/programs`, {
//       headers: headers,
//     });

//     let programsData = [];
//     if (response.data && Array.isArray(response.data)) {
//       programsData = response.data;
//     } else if (
//       response.data &&
//       response.data.data &&
//       Array.isArray(response.data.data)
//     ) {
//       programsData = response.data.data;
//     } else if (
//       response.data &&
//       response.data.programs &&
//       Array.isArray(response.data.programs)
//     ) {
//       programsData = response.data.programs;
//     } else {
//       programsData = [];
//     }

//     setPrograms(programsData);
//     setError(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return "N/A";
//     }
//   };

//   const formatCurrency = (amount) => {
//     if (!amount) return "$0.00 CAD";
//     try {
//       const num = parseFloat(amount);
//       if (isNaN(num)) return "$0.00 CAD";
//       return `$${num.toLocaleString("en-US", {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       })} CAD`;
//     } catch {
//       return "$0.00 CAD";
//     }
//   };

//   const getIntakeDisplay = (program) => {
//     if (program.intake_name && program.intake_name !== "N/A") {
//       return program.intake_name;
//     }
//     return formatDate(program.open_date);
//   };

//   const displayPrograms = programs.map((program) => ({
//     title: program.program_name || "Unnamed Program",
//     university: program.university_name || "Unknown University",
//     intake: getIntakeDisplay(program),
//     deadline: formatDate(program.submission_deadline),
//     tuition: formatCurrency(program.average_gross_tuition),
//     fee: formatCurrency(program.application_fee),
//   }));

//   const needsPagination = displayPrograms.length > 3;
//   const totalPages = needsPagination
//     ? Math.ceil(displayPrograms.length / itemsPerPage)
//     : 1;
//   const startIndex = needsPagination ? (currentPage - 1) * itemsPerPage : 0;
//   const endIndex = needsPagination
//     ? startIndex + itemsPerPage
//     : displayPrograms.length;
//   const currentPrograms = displayPrograms.slice(startIndex, endIndex);

//   if (loading) {
//     return (
//       <div className="w-full max-w-7xl mx-auto mt-9 px-4">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-black text-sm">Loading programs...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full max-w-7xl mx-auto mt-9 px-4">
//         <div className="text-center py-12">
//           <div className="text-5xl mb-4">⚠️</div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Error Loading Programs
//           </h3>
//           <p className="text-gray-500 mb-4">{error}</p>
//           <button
//             onClick={fetchPrograms}
//             className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto mt-9 px-4">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//           <span className="text-xl">📄</span>
//         </div>
//         <h2 className="text-3xl font-semibold">Programs</h2>
//         <span className="text-sm bg-blue-100 text-secondary px-3 py-1 rounded-full">
//           {displayPrograms.length}
//         </span>
//       </div>

//       <div className="space-y-6">
//         {displayPrograms.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-5xl mb-4">📭</div>
//             <h3 className="text-xl font-semibold text-black mb-2">
//               No programs available
//             </h3>
//             <p className="text-black">No programs found for this university.</p>
//           </div>
//         ) : (
//           currentPrograms.map((p, index) => (
//             <div
//               key={index}
//               className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
//               <p className="text-black mb-4">{p.university}</p>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 <div>
//                   <p className="text-black text-sm">Earliest Intake</p>
//                   <p className="font-semibold">{p.intake}</p>
//                 </div>

//                 <div>
//                   <p className="text-black text-sm">Deadline</p>
//                   <p className="font-semibold">{p.deadline}</p>
//                 </div>

//                 <div>
//                   <p className="text-black text-sm">Tuition (1st year)</p>
//                   <p className="font-semibold">{p.tuition}</p>
//                 </div>

//                 <div>
//                   <p className="text-black text-sm">Application Fee</p>
//                   <p className="font-semibold">{p.fee}</p>
//                 </div>
//               </div>

//               {/* <button className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition">
//                 Program Details
//               </button> */}

//               <button
//                 onClick={() => handleProgramDetailsClick(program)}
//                 className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
//               >
//                 Program Details
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {needsPagination && (
//         <div className="flex justify-center items-center gap-2 mt-8 mb-8">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg border ${
//                 currentPage === i + 1
//                   ? "bg-secondary text-white"
//                   : "bg-white hover:bg-gray-50"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgramDetails;




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    if (id) {
      fetchPrograms();
    }
  }, [id]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);

      // Public API - no token required
      const response = await axios.get(
        `${BASE_URL}/university/${id}/programs`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      let programsData = [];
      if (response.data && Array.isArray(response.data)) {
        programsData = response.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        programsData = response.data.data;
      } else if (
        response.data &&
        response.data.programs &&
        Array.isArray(response.data.programs)
      ) {
        programsData = response.data.programs;
      } else {
        programsData = [];
      }

      console.log("Processed programs data:", programsData);
      setPrograms(programsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching programs:", err);

      try {
        await fetchProgramsWithOptionalToken();
      } catch (altErr) {
        setError("Failed to load programs. Please try again.");
        setPrograms([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Program click to id navigation program university
  const handleProgramDetailsClick = (originalProgram) => {
    console.log("Clicked program:", originalProgram);
    
    // Try different ID fields - check the actual structure from console
    const programId = originalProgram.id || originalProgram.program_id;
    
    if (programId) {
      console.log(`Navigating to /program-university/${programId}`);
      navigate(`/program-university/${programId}`);
    } else {
      console.error("No program ID found in:", originalProgram);
      // Fallback: navigate with university ID or show error
      navigate(`/program-university/not-found`);
    }
  };

  const fetchProgramsWithOptionalToken = async () => {
    // Optional token
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(`${BASE_URL}/university/${id}/programs`, {
      headers: headers,
    });

    let programsData = [];
    if (response.data && Array.isArray(response.data)) {
      programsData = response.data;
    } else if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      programsData = response.data.data;
    } else if (
      response.data &&
      response.data.programs &&
      Array.isArray(response.data.programs)
    ) {
      programsData = response.data.programs;
    } else {
      programsData = [];
    }

    setPrograms(programsData);
    setError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0.00 CAD";
    try {
      const num = parseFloat(amount);
      if (isNaN(num)) return "$0.00 CAD";
      return `$${num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} CAD`;
    } catch {
      return "$0.00 CAD";
    }
  };

  const getIntakeDisplay = (program) => {
    if (program.intake_name && program.intake_name !== "N/A") {
      return program.intake_name;
    }
    return formatDate(program.open_date);
  };

  // Create display data while preserving original program reference
  const displayPrograms = programs.map((program, index) => ({
    index: index,
    id: program.id || program.program_id, // Keep the ID
    title: program.program_name || "Unnamed Program",
    university: program.university_name || "Unknown University",
    intake: getIntakeDisplay(program),
    deadline: formatDate(program.submission_deadline),
    tuition: formatCurrency(program.average_gross_tuition),
    fee: formatCurrency(program.application_fee),
    originalProgram: program // Preserve original program object for navigation
  }));

  const needsPagination = displayPrograms.length > 3;
  const totalPages = needsPagination
    ? Math.ceil(displayPrograms.length / itemsPerPage)
    : 1;
  const startIndex = needsPagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = needsPagination
    ? startIndex + itemsPerPage
    : displayPrograms.length;
  const currentDisplayPrograms = displayPrograms.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-9 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-black text-sm">Loading programs...</p>
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
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Error Loading Programs
          </h3>
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
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl">📄</span>
        </div>
        <h2 className="text-3xl font-semibold">Programs</h2>
        <span className="text-sm bg-blue-100 text-secondary px-3 py-1 rounded-full">
          {displayPrograms.length}
        </span>
      </div>

      <div className="space-y-6">
        {displayPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-black mb-2">
              No programs available
            </h3>
            <p className="text-black">No programs found for this university.</p>
          </div>
        ) : (
          currentDisplayPrograms.map((p, index) => (
            <div
              key={p.id || index}
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

              <button
                onClick={() => handleProgramDetailsClick(p.originalProgram)}
                className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
              >
                Program Details
              </button>
              
              {/* Debug button - remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => console.log("Program object:", p.originalProgram)}
                  
                >
                  
                </button>
              )}
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
// before my implementation
