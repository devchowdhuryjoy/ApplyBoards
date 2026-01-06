import React, { useState, useEffect, useRef } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import { useNavigate } from "react-router-dom";
import Program, { ProgramHandle } from "../AboutUniversity/Program";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoice,
  FaFileAlt,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import StudentProgramApply from "./StudentProgramApply";

interface TopDiscipline {
  discipline: string;
  percentage: number;
}

interface IntakeMonth {
  month: string;
}

interface ProgramType {
  id: number;
  university_name: string;
  program_name: string;
  location: string;
  average_gross_tuition: string;
  duration: string;
  application_fee: string;
  intake_name: string;
  intake_months: IntakeMonth[];
  success_chance: string;
  success_prediction_sept2026?: string;
  success_prediction_jan2027?: string;
  success_prediction_sept2027?: string;
  institution_type: string;
  destination_id?: number;
  destination_name?: string;
  university_id?: number;
  program_level_id?: number;
  study_field_id?: number;
  intake_id?: number;
  program_tag_id?: string;
  images?: string[] | any;
  featured?: boolean;
}

interface FilterOptions {
  destinationId?: string;
  universityId?: string;
  programLevelId?: string;
  studyFieldId?: string;
  intakeId?: string;
  programTagId?: string;
  searchQuery?: string;
}

interface Destination {
  id: number;
  destinations_name: string;
  universities: Array<{
    id: number;
    university_name: string;
  }>;
}

const StudentApplication: React.FC = () => {
  const [allPrograms, setAllPrograms] = useState<ProgramType[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Popup states
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);

  // Filter states
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  // State for destinations
  const [destinations, setDestinations] = useState<Destination[]>([]);

  // Ref for Program component
  const programRef = useRef<ProgramHandle>(null);

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      // Get token from localStorage
      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          if (authData.token) {
            myHeaders.append("Authorization", `Bearer ${authData.token}`);
          }
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/university-programs/`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response for programs:", result);

      // Normalize API response
      let programsData: ProgramType[] = [];

      if (result.data && Array.isArray(result.data)) {
        programsData = result.data;
      } else if (Array.isArray(result)) {
        programsData = result;
      } else if (result.programs && Array.isArray(result.programs)) {
        programsData = result.programs;
      } else {
        console.warn("Unexpected API response format:", result);
        programsData = [];
      }

      console.log("Programs loaded:", programsData);
      
      setAllPrograms(programsData);
      setFilteredPrograms(programsData);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          if (authData.token) {
            myHeaders.append("Authorization", `Bearer ${authData.token}`);
          }
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      const response = await fetch(`${BASE_URL}/all/destination/filter`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Destinations API Response:", result);

        let destinationsData: Destination[] = [];

        if (result.data && Array.isArray(result.data)) {
          destinationsData = result.data;
        } else if (Array.isArray(result)) {
          destinationsData = result;
        } else if (result.destinations && Array.isArray(result.destinations)) {
          destinationsData = result.destinations;
        }

        console.log("Destinations loaded:", destinationsData);
        setDestinations(destinationsData);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters: FilterOptions) => {
    console.log("=== FILTERS RECEIVED ===", filters);
    setActiveFilters(filters);

    if (Object.keys(filters).length === 0) {
      console.log("No filters, showing all programs");
      setFilteredPrograms(allPrograms);
      return;
    }

    let filtered = [...allPrograms];

    console.log(`Starting with ${filtered.length} programs`);

    // Apply destination filter
    if (filters.destinationId && filters.destinationId !== "") {
      console.log(` FILTERING BY DESTINATION ID: ${filters.destinationId}`);

      // Find destination name
      const selectedDestination = destinations.find(
        (d) => d.id.toString() === filters.destinationId
      );

      const destinationName = selectedDestination?.destinations_name;
      console.log(`Destination name: ${destinationName}`);

      // Get university IDs from this destination
      const destinationUniversityIds =
        selectedDestination?.universities?.map((u) => u.id.toString()) || [];
      console.log(
        `University IDs in this destination:`,
        destinationUniversityIds
      );

      // Filter programs
      filtered = filtered.filter((program) => {
        // Method 1: Check if program's university_id is in destination's universities array
        if (
          program.university_id &&
          destinationUniversityIds.includes(program.university_id.toString())
        ) {
          return true;
        }

        // Method 2: Check destination_id directly
        if (program.destination_id?.toString() === filters.destinationId) {
          return true;
        }

        // Method 3: Check destination_name if available
        if (
          program.destination_name &&
          destinationName &&
          program.destination_name.toLowerCase() ===
            destinationName.toLowerCase()
        ) {
          return true;
        }

        // Method 4: Check location contains destination name
        if (
          destinationName &&
          program.location
            ?.toLowerCase()
            .includes(destinationName.toLowerCase())
        ) {
          return true;
        }

        // Method 5: Check university name contains destination name
        if (
          destinationName &&
          program.university_name
            ?.toLowerCase()
            .includes(destinationName.toLowerCase())
        ) {
          return true;
        }

        return false;
      });

      console.log(
        `After destination filter: ${filtered.length} programs found`
      );
    }

    // Apply university filter
    if (filters.universityId && filters.universityId !== "") {
      console.log(`Filtering by university ID: ${filters.universityId}`);
      filtered = filtered.filter(
        (program) => program.university_id?.toString() === filters.universityId
      );
      console.log(`After university filter: ${filtered.length} programs`);
    }

    // Apply program level filter
    if (filters.programLevelId && filters.programLevelId !== "") {
      filtered = filtered.filter(
        (program) =>
          program.program_level_id?.toString() === filters.programLevelId
      );
    }

    // Apply study field filter
    if (filters.studyFieldId && filters.studyFieldId !== "") {
      filtered = filtered.filter(
        (program) => program.study_field_id?.toString() === filters.studyFieldId
      );
    }

    // Apply intake filter
    if (filters.intakeId && filters.intakeId !== "") {
      filtered = filtered.filter(
        (program) => program.intake_id?.toString() === filters.intakeId
      );
    }

    // Apply program tag filter
    if (filters.programTagId && filters.programTagId !== "") {
      filtered = filtered.filter(
        (program) => program.program_tag_id?.toString() === filters.programTagId
      );
    }

    // Apply search query filter
    if (filters.searchQuery && filters.searchQuery !== "") {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.program_name?.toLowerCase().includes(query) ||
          program.university_name?.toLowerCase().includes(query) ||
          program.location?.toLowerCase().includes(query)
      );
    }

    console.log("=== FINAL FILTERED PROGRAMS ===");
    console.log("Count:", filtered.length);

    setFilteredPrograms(filtered);

    // Scroll to top when filters change
    if (programRef.current) {
      programRef.current.scrollToTop();
    }
  };

  // Handle Create Application button click
  const handleCreateApplication = (program: ProgramType) => {
    console.log("Selected Program:", program);
    setSelectedProgram(program);
    setOpen(true);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchPrograms(), fetchDestinations()]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [activeFilters]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/assets/default-university.jpg";

    if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
      return imagePath;
    }

    // Remove /api from BASE_URL for images
    const baseUrlWithoutApi = BASE_URL.replace("/api", "");

    if (
      imagePath.startsWith("/storage/") ||
      imagePath.startsWith("/images/") ||
      imagePath.startsWith("uploads/")
    ) {
      return `${baseUrlWithoutApi}/${imagePath
        .replace(/^\//, "")
        .replace(/ /g, "%20")}`;
    }

    return `/assets/${imagePath}`;
  };

  const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
    if (value === null || value === undefined || value === "") {
      return defaultValue;
    }
    return String(value);
  };

  const getImages = (images: any): string[] => {
    if (!images) {
      return ["/assets/default-university.jpg"];
    }

    if (Array.isArray(images)) {
      return images
        .filter((img) => img != null)
        .map((img) => {
          if (typeof img === "string") return img;
          if (img.url) return img.url;
          return "/assets/default-university.jpg";
        });
    }

    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        return getImages(parsed);
      } catch {
        return [images];
      }
    }

    return ["/assets/default-university.jpg"];
  };

  if (loading && allPrograms.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg">Loading programs...</div>
        </div>
      </section>
    );
  }

  if (error && allPrograms.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={fetchPrograms}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Program component */}
      <Program ref={programRef} onFilterChange={handleFilterChange} />

      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Programs
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {filteredPrograms.length} program
              {filteredPrograms.length !== 1 ? "s" : ""}
              {Object.keys(activeFilters).length > 0 && " with applied filters"}
              {activeFilters.destinationId &&
                ` for ${
                  destinations.find(
                    (d) => d.id.toString() === activeFilters.destinationId
                  )?.destinations_name
                }`}
            </p>
          </div>

          {/* Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentPrograms.map((program, i) => {
                  const imageUrls = getImages(program.images);
                  const logoImage = imageUrls[1] || imageUrls[0];

                  return (
                    <div
                      key={program.id || i}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
                    >
                      {/* Header */}
                      <div className="p-7 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                          <img
                            src={getImageUrl(logoImage)}
                            alt={`${program.university_name} logo`}
                            className="w-14 h-14 object-contain rounded-md border shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/assets/default-university.jpg";
                            }}
                          />
                          <div>
                            <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
                              {safeDisplay(program.university_name)}
                            </h3>
                            <p className="text-black text-sm mt-0.5">
                              {safeDisplay(program.institution_type)}
                              {program.destination_name &&
                                ` • ${program.destination_name}`}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-medium text-black mt-4">
                          🎓 {safeDisplay(program.program_name)}
                        </p>
                      </div>

                      {/* Quick Info */}
                      <div className="p-7 flex flex-col gap-3 text-sm md:text-base">
                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaMapMarkerAlt className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Location:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.location)}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaMoneyBillWave className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Tuition:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.average_gross_tuition)}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaClock className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Duration:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.duration, "N/A")}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaFileInvoice className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Application Fee:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.application_fee)}
                          </span>
                        </p>

                        {/* Intake Info */}
                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaFileAlt className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Intake:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.intake_name, "N/A")}
                          </span>
                        </p>

                        {/* Intake Months */}
                        {program.intake_months &&
                          program.intake_months.length > 0 && (
                            <p className="flex items-center gap-2 leading-relaxed">
                              <FaCalendarAlt className="text-black" />
                              <strong className="text-black mr-2 whitespace-nowrap">
                                Intake Months:
                              </strong>
                              <span className="text-black">
                                {program.intake_months
                                  .map((intake) => intake.month)
                                  .join(", ")}
                              </span>
                            </p>
                          )}
                      </div>

                      {/* Success Chance */}
                      <div className="p-7 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-semibold text-black text-lg flex items-center gap-2">
                            <FaChartBar className="text-black" />
                            Success Chance
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                program.success_chance === "High"
                                  ? "bg-green-600"
                                  : program.success_chance === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                              }`}
                            ></span>
                            <span className="text-sm font-medium text-black">
                              {safeDisplay(program.success_chance, "N/A")}
                            </span>
                          </div>
                        </div>

                        {/* Success Prediction */}
                        {program.success_prediction_sept2026 ||
                        program.success_prediction_jan2027 ||
                        program.success_prediction_sept2027 ? (
                          <>
                            <p className="font-semibold text-black mb-4 text-lg flex items-center gap-2">
                              <FaChartLine className="text-black" />
                              Success Prediction
                            </p>
                            <div className="flex items-center justify-around text-sm">
                              {program.success_prediction_sept2026 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Sep 2026</span>
                                  <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_sept2026,
                                      "Average"
                                    )}
                                  </span>
                                </div>
                              )}
                              {program.success_prediction_jan2027 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Jan 2027</span>
                                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_jan2027,
                                      "High"
                                    )}
                                  </span>
                                </div>
                              )}
                              {program.success_prediction_sept2027 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Sep 2027</span>
                                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_sept2027,
                                      "High"
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>

                      {/* Bottom Button */}
                      <div className="p-7 border-t border-gray-200">
                        <button
                          onClick={() => handleCreateApplication(program)}
                          className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary"
                        >
                          Create Application
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Student Program Apply Modal */}
              {selectedProgram && (
                <StudentProgramApply
                  open={open}
                  setOpen={setOpen}
                  programData={{
                    program_id: selectedProgram.id?.toString() || "",
                    program_name: selectedProgram.program_name || "",
                    university_name: selectedProgram.university_name || "",
                    location: selectedProgram.location || "",
                    intake_name: selectedProgram.intake_name || "",
                    intake_months: selectedProgram.intake_months || [],
                  }}
                />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
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
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      } transition`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Programs Found */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Programs Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {Object.keys(activeFilters).length > 0
                    ? "Try adjusting your filters to see more results."
                    : "There are currently no programs available."}
                </p>
                {Object.keys(activeFilters).length > 0 && (
                  <button
                    onClick={() => handleFilterChange({})}
                    className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StudentApplication;