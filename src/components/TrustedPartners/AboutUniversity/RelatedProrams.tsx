import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// 1. Program Data Interface
interface Program {
  id?: number | string;
  program_id?: number | string;
  program_name?: string;
  university_name?: string;
  intake_name?: string;
  open_date?: string;
  submission_deadline?: string;
  average_gross_tuition?: string | number;
  application_fee?: string | number;
  [key: string]: any; 
}

// 2. Display Data Interface 
interface DisplayProgram {
  index: number;
  id: string | number;
  title: string;
  university: string;
  intake: string;
  deadline: string;
  tuition: string;
  fee: string;
  originalProgram: Program;
}

// 3. Component Props Interface
interface RelatedProgramsProps {
  universityId?: string | number;
}

const RelatedPrograms: React.FC<RelatedProgramsProps> = ({ universityId }) => {
  // Use prop id if provided, otherwise fallback to URL params
  const { id: paramId } = useParams<{ id: string }>();
  const id = universityId || paramId;

  // --- State Definitions with Types ---
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Kept same as reference

  useEffect(() => {
    if (id) {
      fetchRelatedPrograms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRelatedPrograms = async () => {
    try {
      setLoading(true);

      // Specific API endpoint for Related Programs
      const response = await axios.get(
        `${BASE_URL}/university/${id}/related`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Related Programs API Response:", response.data);

      let programsData: Program[] = [];
      
      // Handle various possible API response structures safely
      const data = response.data;

      if (data && Array.isArray(data)) {
        programsData = data;
      } else if (data && Array.isArray(data.related_programs)) {
        programsData = data.related_programs;
      } else if (data && Array.isArray(data.data)) {
        programsData = data.data;
      } else if (data && Array.isArray(data.programs)) {
        programsData = data.programs;
      } else {
        programsData = [];
      }

      setPrograms(programsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching related programs:", err);
      setError("Failed to load related programs.");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProgramDetailsClick = (originalProgram: Program) => {
    const programId = originalProgram.id || originalProgram.program_id;
    
    if (programId) {
      navigate(`/program-university/${programId}`);
      window.scrollTo(0, 0);
    } else {
      console.error("No program ID found");
    }
  };

  // --- Helper Functions ---
  
  const formatDate = (dateString?: string): string => {
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

  const formatCurrency = (amount?: string | number): string => {
    if (!amount) return "$0.00 CAD";
    try {
      const num = typeof amount === 'string' ? parseFloat(amount) : amount;
      if (isNaN(num as number)) return "$0.00 CAD";
      return `$${(num as number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} CAD`;
    } catch {
      return "$0.00 CAD";
    }
  };

  const getIntakeDisplay = (program: Program): string => {
    if (program.intake_name && program.intake_name !== "N/A") {
      return program.intake_name;
    }
    return formatDate(program.open_date);
  };

  // --- Prepare Display Data ---
  const displayPrograms: DisplayProgram[] = programs.map((program, index) => ({
    index: index,
    id: program.id || program.program_id || index, 
    title: program.program_name || "Unnamed Program",
    university: program.university_name || "Unknown University",
    intake: getIntakeDisplay(program),
    deadline: formatDate(program.submission_deadline),
    tuition: formatCurrency(program.average_gross_tuition),
    fee: formatCurrency(program.application_fee),
    originalProgram: program
  }));

  // --- Pagination Logic ---
  const needsPagination = displayPrograms.length > itemsPerPage;
  const totalPages = needsPagination
    ? Math.ceil(displayPrograms.length / itemsPerPage)
    : 1;
  const startIndex = needsPagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = needsPagination
    ? startIndex + itemsPerPage
    : displayPrograms.length;
  const currentDisplayPrograms = displayPrograms.slice(startIndex, endIndex);

  // --- Render ---

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-9 px-4">
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-black text-sm">Loading related programs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; 
  }

  if (displayPrograms.length === 0) {
    return (
        <div className="w-full max-w-7xl mx-auto mt-9 px-4">
            <div className="text-center py-8 bg-gray-50 rounded-2xl">
                <p className="text-gray-500">No related programs found.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-9 px-4">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl">📚</span> 
        </div>
        <h2 className="text-3xl font-semibold">Related Programs</h2>
        <span className="text-sm bg-blue-100 text-secondary px-3 py-1 rounded-full">
          {displayPrograms.length}
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {currentDisplayPrograms.map((p) => (
          <div
            key={p.id}
            className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
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
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
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

export default RelatedPrograms;