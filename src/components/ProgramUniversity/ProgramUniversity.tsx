

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import RelatedPrograms from "../TrustedPartners/AboutUniversity/RelatedProrams";

interface ProgramData {
  id: number;
  program_name: string;
  university_name: string;
  location: string;
  faculty?: string;
  description: string;
  program_level: string;
  program_length: string;
  cost_of_living: string;
  gross_tuition: string;
  application_fee: string;
  other_fees?: string;
  conditions?: string[];
  minimum_education?: string;
  minimum_gpa?: string;
  intakes?: Array<{
    intake: string;
    status: string;
  }>;
  similar_programs?: Array<{
    title: string;
    university: string;
    intake: string;
    deadline: string;
    tuition: string;
    fee: string;
  }>;
  images: string[];
  // New fields from your data
  program_description?: string;
  program_summary?: string;
  address?: string;
  campus_city?: string;
  duration?: string;
  intake_id?: number; //
  intake_name?: string;
  submission_deadline?: string;
  average_gross_tuition_short_desc?: string;
  cost_of_living_short_desc?: string;
  field_of_study_name?: string;
  program_level?: string;
  ielts_overall?: number;
  toefl_overall?: number;
  duolingo_total?: number;
  grading_scheme?: string;
  study_permit_or_visa?: string;
  nationality?: string;
}

const ProgramUniversity: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState("Overview");

  const [selectedIntakeId, setSelectedIntakeId] = useState<number>(0);
  const [intakeList, setIntakeList] = useState<any[]>([]);

  useEffect(() => {

    window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  
    if (!id) {
      setError("Program ID not found");
      setLoading(false);
      return;
    }

    const fetchProgramData = async () => {
      setLoading(true);
      setError(null);
      setImageErrors({});

      try {
        console.log(`Fetching program data for ID: ${id}`);

        // Try multiple API endpoints
        const endpoints = [
          `${BASE_URL}/university-programs/details/${id}`,
          `${BASE_URL}/university/programs/${id}`,
          `${BASE_URL}/programs/${id}`,
          `${BASE_URL}/api/programs/${id}`,
        ];

        let success = false;
        let lastError = null;

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);

            const response = await fetch(endpoint, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            console.log(`Response status for ${endpoint}:`, response.status);

            if (!response.ok) {
              console.warn(`Endpoint ${endpoint} failed: ${response.status}`);
              lastError = `HTTP ${response.status}`;
              continue;
            }

            const responseText = await response.text();
            console.log(`Response text length: ${responseText.length}`);

            if (responseText.trim() === "") {
              console.warn(`Empty response from ${endpoint}`);
              lastError = "Empty response";
              continue;
            }

            let parsedData;
            try {
              parsedData = JSON.parse(responseText);
            } catch (parseError) {
              console.warn(`JSON parse error for ${endpoint}:`, parseError);
              lastError = "Invalid JSON";
              continue;
            }

            console.log("Parsed data:", parsedData);

            // Handle response structure
            if (parsedData.status && parsedData.data) {
              setProgramData(parsedData.data);
            } else if (parsedData.data) {
              setProgramData(parsedData.data);
            } else if (parsedData.id || parsedData.program_name) {
              // Direct program object (from your console data)
              setProgramData(parsedData);
            } else {
              console.warn("Unexpected response structure:", parsedData);
              continue;
            }

            success = true;
            console.log("Successfully fetched program data");
            break;
          } catch (err) {
            console.error(`Error with endpoint ${endpoint}:`, err);
            lastError = err.message;
          }
        }

        if (!success) {
          // If all API endpoints fail, use the data directly from localStorage or create mock
          console.log(
            "All API endpoints failed, creating data from console structure",
          );

          // Create program data based on your console output
          const programFromLocal = {
            id: parseInt(id),
            program_name: "Program Data Not Found",
            university_name: "University Not Found",
            location: "N/A",
            description: "Program details could not be loaded from API.",
            program_level: "N/A",
            program_length: "N/A",
            cost_of_living: "N/A",
            gross_tuition: "N/A",
            application_fee: "N/A",
            images: [],
            // Add more fields as needed
          };

          setProgramData(programFromLocal);
          setError(
            `Could not fetch from API. Using fallback data. Last error: ${lastError}`,
          );
        }
      } catch (err: any) {
        console.error("Error fetching program data:", err);
        setError(err.message || "Failed to fetch program data");

        // Create fallback data
        const fallbackData: ProgramData = {
          id: parseInt(id) || 0,
          program_name: "Fallback Program",
          university_name: "Fallback University",
          location: "Unknown",
          description:
            "This is fallback program data because the API failed to load.",
          program_level: "Bachelor's",
          program_length: "4 years",
          cost_of_living: "$15,000",
          gross_tuition: "$30,000",
          application_fee: "$100",
          images: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
          ],
        };

        setProgramData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, [id]);

  // --- Fetch Intakes from Admin API ---
  useEffect(() => {
    const fetchIntakes = async () => {
      // console.log("Intake API calling started...");

      let token = null;
      const auth = localStorage.getItem("auth");

      if (auth) {
        try {
          const authData = JSON.parse(auth);

          if (authData.token) {
            token = authData.token;
          }
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      if (!token) {
        console.warn("No auth token found inside 'auth' key.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/admin/intakes`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 Intake API Status:", response.status);

        if (response.ok) {
          const result = await response.json();
          // console.log("✅ Intake API Data:", result);

          if (result.data) {
            setIntakeList(result.data);
          } else if (Array.isArray(result)) {
            setIntakeList(result);
          }
        } else {
          console.error("Failed to fetch intakes. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching intakes:", error);
      }
    };

    fetchIntakes();
  }, []);

  // Function to get correct image URL
  const getImageUrl = (imagePath: string): string => {
    if (
      !imagePath ||
      typeof imagePath !== "string" ||
      imagePath.trim() === ""
    ) {
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Handle image string that might be JSON array
    if (imagePath.startsWith('["') && imagePath.endsWith('"]')) {
      try {
        const imagesArray = JSON.parse(imagePath);
        if (Array.isArray(imagesArray) && imagesArray.length > 0) {
          const backendUrl = BASE_URL.replace("/api", "");
          return `${backendUrl}/${imagesArray[0]}`;
        }
      } catch (e) {
        console.error("Error parsing images JSON:", e);
      }
    }

    const backendUrl = BASE_URL.replace("/api", "");
    return `${backendUrl}/${imagePath}`;
  };

  // Parse images from string or array
  const getImagesArray = (images: any): string[] => {
    if (!images) return [];

    if (Array.isArray(images)) {
      return images;
    }

    if (typeof images === "string") {
      try {
        // Try to parse as JSON array
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // If not JSON, treat as single image string
        return [images];
      }
    }

    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg text-gray-700">Loading program details...</p>
        <p className="text-sm text-gray-500 mt-2">Program ID: {id}</p>
      </div>
    );
  }

  if (error && !programData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            API Connection Error
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-gray-700 mb-2">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Tried endpoints:</strong>
            </p>
            <ul className="text-xs text-gray-500 mt-1">
              <li>
                • {BASE_URL}/university-programs/details/{id}
              </li>
              <li>
                • {BASE_URL}/university/programs/{id}
              </li>
              <li>
                • {BASE_URL}/programs/{id}
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = programData!;
  const imagesArray = getImagesArray(data.images);

  // --- Intake Options Logic ---
  let intakeOptions: { id: number; name: string }[] = [];

  if (intakeList.length > 0) {
    intakeOptions = intakeList.map((item: any) => ({
      id: item.id || item.intake_id,

      name: item.name,
    }));
  } else {
    intakeOptions = [
      {
        id: data.intake_id || 0,
        name: data.intake_name || "Current Intake",
      },
    ];
  }

  // Selected Name Logic
  const selectedIntakeName =
    intakeOptions.find((opt) => opt.id === selectedIntakeId)?.name ||
    data.intake_name ||
    "Intake";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {data.program_name?.charAt(0) || "P"}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                  {data.program_name || "Program Name"}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-secondary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      {data.university_name || "University Name"},{" "}
                      {data.location || "Location"}
                    </span>
                  </span>
                  {data.campus_city && (
                    <>
                      <span className="hidden md:inline text-gray-300">•</span>
                      <span className="truncate" title={data.campus_city}>
                        {data.campus_city}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 border border-primary text-secondary font-medium rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
              {data.university_id && (
                <button
                  onClick={() =>
                    navigate(`/about-university/${data.university_id}`)
                  }
                  className="px-5 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  View University
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {imagesArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {imagesArray.slice(0, 5).map((img, index) => {
                const imageUrl = getImageUrl(img);
                const isMainImage = index === 0;

                return (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                      isMainImage ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                    style={{ aspectRatio: isMainImage ? "16/9" : "4/3" }}
                  >
                    <img
                      src={imageUrl}
                      alt={`${data.program_name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Image ${index} failed to load`);
                        setImageErrors((prev) => ({ ...prev, [index]: true }));
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
                      }}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    {isMainImage && imagesArray.length > 1 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <button className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          View All Photos ({imagesArray.length})
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <div
                className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 md:row-span-2"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
                  alt="Default program image"
                  className="w-full h-full object-cover"
                />
              </div>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80&${item}`}
                    alt={`Default image ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex overflow-x-auto border-b">
              {["Overview", "Admission Requirements", "Similar Programs"].map(
                (tab, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-600 text-secondary"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Program Summary & Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Program Summary Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Program Summary
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {data.program_description ||
                      data.program_summary ||
                      data.description ||
                      "No description available for this program."}
                  </p>

                  {/* Program Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {data.field_of_study_name && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">
                          Field of Study
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {data.field_of_study_name}
                        </p>
                      </div>
                    )}

                    {data.program_level && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">
                          Program Level
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {data.program_level}
                        </p>
                      </div>
                    )}

                    {data.duration && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">Duration</p>
                        <p className="text-lg font-bold text-gray-900">
                          {data.duration}
                        </p>
                      </div>
                    )}

                    {/* {data.intake_name && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">Intake</p>
                        <p className="text-lg font-bold text-gray-900">{data.intake_name}</p>
                      </div>
                    )} */}

                    {/* Intake Card Update */}

                    <select
                      value={selectedIntakeId}
                      onChange={(e) =>
                        setSelectedIntakeId(Number(e.target.value))
                      }
                      className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 cursor-pointer font-semibold transition-colors hover:bg-white hover:border-blue-400"
                    >
                      {/* Default Option (Optional) */}
                      <option value={0} disabled>
                        Select an Intake
                      </option>

                      {/* Dynamic Options */}
                      {intakeOptions.map((intake) => (
                        <option key={intake.id} value={intake.id}>
                          {intake.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Admission Requirements Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Admission Requirements
                </h2>

                <div className="space-y-8">
                  {/* Language Requirements */}
                  {(data.ielts_required ||
                    data.toefl_required ||
                    data.duolingo_required) && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Language Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.ielts_required && data.ielts_overall && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">
                              IELTS Overall
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {data.ielts_overall}
                            </p>
                          </div>
                        )}

                        {data.toefl_required && data.toefl_overall && (
                          <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">
                              TOEFL Overall
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {data.toefl_overall}
                            </p>
                          </div>
                        )}

                        {data.duolingo_required && data.duolingo_total && (
                          <div className="bg-purple-50 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">
                              Duolingo Total
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {data.duolingo_total}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Academic Background */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Academic Background
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">
                          Minimum GPA
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {data.minimum_gpa || data.grading_scheme || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm mb-1">
                          Last Level of Study
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {data.last_level_of_study || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visa Information */}
                  {(data.study_permit_or_visa || data.nationality) && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Visa Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.study_permit_or_visa && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">
                              Study Permit/Visa
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {data.study_permit_or_visa}
                            </p>
                          </div>
                        )}

                        {data.nationality && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">
                              Nationality
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {data.nationality}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Important Dates */}
                  {(data.open_date || data.submission_deadline) && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Important Dates
                      </h3>
                      <div className="space-y-2">
                        {data.open_date && (
                          <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <span className="text-green-600">📅</span>
                              <span className="font-medium text-gray-900">
                                Open Date
                              </span>
                            </div>
                            <span className="text-gray-600">
                              {new Date(data.open_date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        )}

                        {data.submission_deadline && (
                          <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                              <span className="text-red-600">⏰</span>
                              <span className="font-medium text-gray-900">
                                Submission Deadline
                              </span>
                            </div>
                            <span className="text-gray-600">
                              {new Date(
                                data.submission_deadline,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar prorams  */}
              <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <RelatedPrograms />
              </div>
            </div>

            {/* Right Column - Program Details Sidebar */}
            <div className="space-y-6">
              {/* Apply Now Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                {/* <div className="text-center mb-6">
                  <button className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary transition-colors text-lg">
                    Apply Now
                  </button>
                </div> */}

                <div className="space-y-4">
                  {[
                    {
                      label: "Program Name",
                      value: data.program_name || "N/A",
                      icon: "📚",
                    },
                    {
                      label: "University",
                      value: data.university_name || "N/A",
                      icon: "🏛️",
                    },
                    {
                      label: "Location",
                      value: data.location || "N/A",
                      icon: "📍",
                    },
                    {
                      label: "Application Fee",
                      value: data.application_fee
                        ? `$${data.application_fee}`
                        : "N/A",
                      icon: "💰",
                    },
                    {
                      label: "Gross Tuition",
                      value: data.gross_tuition
                        ? `$${data.gross_tuition}`
                        : "N/A",
                      icon: "📊",
                    },
                    {
                      label: "Cost of Living",
                      value: data.cost_of_living
                        ? `$${data.cost_of_living}/year`
                        : "N/A",
                      icon: "🏠",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between py-3 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-gray-600">{item.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Chance */}
              {data.success_chance && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Success Chance
                  </h3>
                  <div
                    className={`p-4 rounded-lg ${
                      data.success_chance === "High"
                        ? "bg-green-50 border border-green-200"
                        : data.success_chance === "Medium"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {data.success_chance} Chance
                      </span>
                      <span
                        className={`text-2xl ${
                          data.success_chance === "High"
                            ? "text-green-600"
                            : data.success_chance === "Medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {data.success_chance === "High"
                          ? "🎯"
                          : data.success_chance === "Medium"
                            ? "⚠️"
                            : "❌"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Download Brochure",
                      icon: "📥",
                      onClick: () => console.log("Download Brochure"),
                    },
                    {
                      label: "Schedule Consultation",
                      icon: "📅",
                      onClick: () => console.log("Schedule Consultation"),
                    },
                    {
                      label: "View University Details",
                      icon: "🏛️",
                      onClick: () =>
                        data.university_id &&
                        navigate(`/about-university/${data.university_id}`),
                    },
                    {
                      label: "Compare Programs",
                      icon: "⚖️",
                      onClick: () => console.log("Compare Programs"),
                    },
                  ].map((link, index) => (
                    <button
                      key={index}
                      onClick={link.onClick}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span>{link.icon}</span>
                        <span className="text-gray-700">{link.label}</span>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramUniversity;
