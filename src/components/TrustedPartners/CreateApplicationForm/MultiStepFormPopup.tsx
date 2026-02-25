// import React, { useState } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import Swal from "sweetalert2";

// const MultiStepFormPopup = ({ open, setOpen, programData }) => {
//   const [studentId, setStudentId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [studentData, setStudentData] = useState(null);

//   const defaultProgramId = programData?.program_id || programData?.id || "";
//   // CHANGED
//   const getNameParts = (fullName) => {
//     if (!fullName) return { firstName: "", familyName: "" };

//     const parts = fullName.trim().split(" ");
//     return {
//       firstName: parts[0] || "",
//       familyName: parts.slice(1).join(" ") || "",
//     };
//   };
//   // CHANGED

//   const fetchStudentInfo = async () => {
//     if (!studentId.trim()) {
//       setError("Please enter Student ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setStudentData(null);

//       const auth = localStorage.getItem("auth");
//       if (!auth) throw new Error("Please login again");

//       const authData = JSON.parse(auth);

//       const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
//       const url = `${baseUrl}/agent/student/info/${studentId}/${defaultProgramId}`;

//       console.log("Fetching from URL:", url);

//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 15000);

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authData.token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         signal: controller.signal,
//       }).catch((err) => {
//         clearTimeout(timeoutId);
//         throw err;
//       });

//       clearTimeout(timeoutId);

//       if (!res.ok) {
//         throw new Error(`Failed to fetch: ${res.status}`);
//       }

//       const result = await res.json();
//       console.log("Complete API Response:", result);

//       setStudentData(result);
//       setError("");
//     } catch (err) {
//       console.error("Fetch error:", err);

//       let userMessage = "Failed to fetch student information.";
//       if (err.message.includes("timeout")) {
//         userMessage = "Request timeout. Please try again.";
//       } else if (err.message.includes("Failed to fetch")) {
//         userMessage = "Network error. Please check your connection.";
//       }

//       setError(userMessage);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: userMessage,
//         confirmButtonColor: "#dc3545",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyApplication = async () => {
//     if (!studentData) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Data",
//         text: "Please fetch student information first",
//         confirmButtonColor: "#f16f22",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const auth = localStorage.getItem("auth");
//       if (!auth) throw new Error("Please login again");

//       const authData = JSON.parse(auth);

//       const student = studentData.student || {};
//       const program = studentData.program || programData || {};

//       const agentName =
//         authData.name || authData.user?.name || authData.username || "Agent";

//       // Helper function to format date for MySQL (YYYY-MM-DD)
//       const formatDateForMySQL = (dateString) => {
//         if (!dateString) return "";
//         try {
//           // If it's an ISO string, extract just the date part
//           if (dateString.includes("T")) {
//             return dateString.split("T")[0];
//           }
//           // If it's already in YYYY-MM-DD format, return as is
//           if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
//             return dateString;
//           }
//           // Try to parse and format
//           const date = new Date(dateString);
//           if (!isNaN(date.getTime())) {
//             return date.toISOString().split("T")[0];
//           }
//           return "";
//         } catch (e) {
//           console.error("Error formatting date:", e);
//           return "";
//         }
//       };

//       // Helper function to parse JSON strings to arrays
//       const parseToArray = (data) => {
//         if (!data) return [];
//         if (Array.isArray(data)) return data;
//         try {
//           return typeof data === "string" ? JSON.parse(data) : [];
//         } catch {
//           return [];
//         }
//       };

//       // Parse JSON strings to actual arrays
//       const academicQualifications = parseToArray(
//         student.academic_qualifications,
//       );
//       const testScores = parseToArray(student.test_scores);
//       const workExperiences = parseToArray(student.work_experiences);
//       const references = parseToArray(student.references);
//       const intakeMonths = parseToArray(program.intake_months);
//       const images = parseToArray(program.images);

//       // Create FormData
//       const formData = new FormData();

//       // ================= BASIC INFO =================
//       // formData.append("student_name", student.name || "");

//       const { firstName, familyName } = getNameParts(student.name); // CHANGED

//       if (firstName) formData.append("first_name", firstName); // CHANGED
//       if (familyName) formData.append("family_name", familyName); // CHANGED

//       formData.append("student_id", parseInt(student.id || studentId));
//       formData.append("agent_name", agentName);
//       formData.append(
//         "agent_id",
//         (student.agent_id || authData.id || "").toString(),
//       );
//       formData.append(
//         "program_id",
//         (program.id || program.program_id || "").toString(),
//       );
//       formData.append("program_name", program.program_name || "");
//       formData.append("university_name", program.university_name || "");
//       formData.append("intake", program.intake_name || "");
//       formData.append("status", "Pending");

//       // ================= PROGRAM INFO =================
//       formData.append("program_level_id", program.program_level_id || "");
//       formData.append("program_description", program.program_description || "");
//       formData.append("program_level", program.program_level || "");
//       formData.append(
//         "program_open_date",
//         formatDateForMySQL(program.open_date),
//       );
//       formData.append(
//         "program_submission_deadline",
//         formatDateForMySQL(program.submission_deadline),
//       );
//       formData.append("intake_name", program.intake_name || "");
//       formData.append("field_of_study_id", program.field_of_study_id || "");
//       formData.append("field_of_study_name", program.field_of_study_name || "");
//       formData.append(
//         "study_permit_or_visa",
//         program.study_permit_or_visa || "",
//       );
//       formData.append("program_nationality", program.nationality || "");
//       formData.append(
//         "education_country",
//         student.education_country || program.education_country || "",
//       );
//       formData.append(
//         "last_level_of_study",
//         student.last_level_of_study || program.last_level_of_study || "",
//       );
//       formData.append("grading_scheme", program.grading_scheme || "");

//       // ================= IELTS =================
//       formData.append("ielts_required", program.ielts_required ? "1" : "0");
//       if (program.ielts_reading)
//         formData.append("ielts_reading", program.ielts_reading.toString());
//       if (program.ielts_writing)
//         formData.append("ielts_writing", program.ielts_writing.toString());
//       if (program.ielts_listening)
//         formData.append("ielts_listening", program.ielts_listening.toString());
//       if (program.ielts_speaking)
//         formData.append("ielts_speaking", program.ielts_speaking.toString());
//       if (program.ielts_overall)
//         formData.append("ielts_overall", program.ielts_overall.toString());

//       // ================= TOEFL =================
//       formData.append("toefl_required", program.toefl_required ? "1" : "0");
//       if (program.toefl_reading)
//         formData.append("toefl_reading", program.toefl_reading.toString());
//       if (program.toefl_writing)
//         formData.append("toefl_writing", program.toefl_writing.toString());
//       if (program.toefl_listening)
//         formData.append("toefl_listening", program.toefl_listening.toString());
//       if (program.toefl_speaking)
//         formData.append("toefl_speaking", program.toefl_speaking.toString());
//       if (program.toefl_overall)
//         formData.append("toefl_overall", program.toefl_overall.toString());

//       // ================= DUOLINGO =================
//       formData.append(
//         "duolingo_required",
//         program.duolingo_required ? "1" : "0",
//       );
//       if (program.duolingo_total)
//         formData.append("duolingo_total", program.duolingo_total.toString());

//       // ================= PTE =================
//       formData.append("pte_required", program.pte_required ? "1" : "0");
//       if (program.pte_reading)
//         formData.append("pte_reading", program.pte_reading.toString());
//       if (program.pte_writing)
//         formData.append("pte_writing", program.pte_writing.toString());
//       if (program.pte_listening)
//         formData.append("pte_listening", program.pte_listening.toString());
//       if (program.pte_speaking)
//         formData.append("pte_speaking", program.pte_speaking.toString());
//       if (program.pte_overall)
//         formData.append("pte_overall", program.pte_overall.toString());

//       // ================= PROGRAM EXTRA =================
//       formData.append("program_tag_id", program.program_tag_id || "");
//       formData.append("program_tag_name", program.program_tag_name || "");
//       formData.append("no_exam_status", program.no_exam_status || "");
//       formData.append("application_fee", program.application_fee || "");
//       formData.append(
//         "application_short_desc",
//         program.application_short_desc || "",
//       );
//       formData.append(
//         "average_graduate_program",
//         program.average_graduate_program || "",
//       );
//       formData.append(
//         "average_graduate_program_short_desc",
//         program.average_graduate_program_short_desc || "",
//       );
//       formData.append(
//         "average_undergraduate_program",
//         program.average_undergraduate_program || "",
//       );
//       formData.append(
//         "average_undergraduate_program_short_desc",
//         program.average_undergraduate_program_short_desc || "",
//       );
//       formData.append("cost_of_living", program.cost_of_living || "");
//       formData.append(
//         "cost_of_living_short_desc",
//         program.cost_of_living_short_desc || "",
//       );
//       formData.append(
//         "average_gross_tuition",
//         program.average_gross_tuition || "",
//       );
//       formData.append(
//         "average_gross_tuition_short_desc",
//         program.average_gross_tuition_short_desc || "",
//       );
//       formData.append("campus_city", program.campus_city || "");
//       formData.append("duration", program.duration || "");
//       formData.append("success_chance", program.success_chance || "");
//       formData.append("program_summary", program.program_summary || "");

//       // ================= ARRAYS AS JSON STRINGS =================
//       formData.append("intake_months", JSON.stringify(intakeMonths));
//       formData.append("images", JSON.stringify(images));

//       // ================= STUDENT EXTRA =================
//       formData.append("company_name", student.company_name || "");
//       formData.append("email", student.email || "");
//       formData.append(
//         "destination",
//         student.destination || program.university_name || "",
//       );
//       formData.append(
//         "study_level",
//         student.study_level || program.program_level || "",
//       );
//       formData.append(
//         "subject",
//         student.subject || program.field_of_study_name || "",
//       );
//       formData.append("student_profile_nationality", student.nationality || "");
//       formData.append("passport", student.passport || "");
//       formData.append("elp", student.elp || "");
//       formData.append("dob", formatDateForMySQL(student.dob));
//       formData.append("address", student.address || "");
//       formData.append("phone", student.phone || "");
//       formData.append("gender", student.gender || "");
//       formData.append(
//         "passport_expiry",
//         formatDateForMySQL(student.passport_expiry),
//       );
//       formData.append(
//         "country_of_residence",
//         student.country_of_residence || "",
//       );
//       formData.append("specialization", student.specialization || "");
//       formData.append("sop", student.sop || "");
//       formData.append("achievements", student.achievements || "");

//       // ================= FILE PATHS =================
//       formData.append("resume", student.resume || "");
//       formData.append("passport_copy", student.passport_copy || "");
//       formData.append("transcripts", student.transcripts || "");
//       formData.append("english_test", student.english_test || "");
//       formData.append("photo", student.photo || "");

//       // ================= ACADEMIC DATA AS JSON STRINGS =================
//       formData.append(
//         "academic_qualifications",
//         JSON.stringify(academicQualifications),
//       );
//       formData.append("test_scores", JSON.stringify(testScores));
//       formData.append("work_experiences", JSON.stringify(workExperiences));
//       formData.append("references", JSON.stringify(references));

//       // ================= TIMESTAMPS =================
//       const now = new Date();
//       const mysqlDateTime = now.toISOString().slice(0, 19).replace("T", " ");
//       formData.append("created_at", mysqlDateTime);
//       formData.append("updated_at", mysqlDateTime);
//       formData.append("application_source", "agent_portal");

//       console.log("Submitting FormData");

//       const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
//       const submitUrl = `${baseUrl}/agent/my-applications`;

//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 30000);

//       const res = await fetch(submitUrl, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${authData.token}`,
//           Accept: "application/json",
//           // Don't set Content-Type header for FormData
//         },
//         body: formData,
//         signal: controller.signal,
//       }).catch((err) => {
//         clearTimeout(timeoutId);
//         throw err;
//       });

//       clearTimeout(timeoutId);

//       const responseText = await res.text();
//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (e) {
//         result = { message: responseText };
//       }

//       if (!res.ok) {
//         console.error("Validation errors:", result.errors);

//         let errorMessage = result.message;
//         if (result.errors) {
//           errorMessage = Object.entries(result.errors)
//             .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
//             .join("\n");
//         }

//         throw new Error(errorMessage);
//       }

//       await Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: result.message || "Application submitted successfully",
//         confirmButtonColor: "#f16f22",
//         timer: 3000,
//         timerProgressBar: true,
//       });

//       closePopup();
//     } catch (err) {
//       console.error("Application Error:", err);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.message,
//         confirmButtonColor: "#dc3545",
//       });

//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closePopup = () => {
//     setStudentId("");
//     setError("");
//     setStudentData(null);
//     setOpen(false);
//   };

//   // ================ START OF MODIFIED CODE ================
//   // NEW FUNCTION: Only shows specific fields as requested
//   const renderSelectedDataOnly = (student, program, authData) => {
//     if (!student && !program) return null;

//     // Get agent info from auth
//     const agentName =
//       authData?.name || authData?.user?.name || authData?.username || "Agent";
//     const agentId = authData?.id || authData?.user?.id || "";

//     const firstName = student?.first_name || "";
//     const familyName = student?.family_name || ""; // CHANGED
//     // Prepare only the selected fields
//     const selectedFields = [
//       // { label: "Student Name", value: student?.name },
//       { label: "First Name", value: firstName }, // CHANGED
//       { label: "Family Name", value: familyName }, // CHANGED
//       { label: "Student ID", value: student?.id || studentId },
//       { label: "Agent Name", value: agentName },
//       { label: "Agent ID", value: agentId },
//       { label: "Program Name", value: program?.program_name },
//       { label: "Program ID", value: program?.id || program?.program_id },
//       { label: "University Name", value: program?.university_name },
//       { label: "University ID", value: program?.university_id },
//     ];

//     return (
//       <div className="border border-primary/20 rounded-lg p-4 bg-white shadow-sm mt-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//           <svg
//             className="w-5 h-5 mr-2 text-primary"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
//           </svg>
//           Student Information Summary
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {selectedFields.map((field, index) => (
//             <div
//               key={index}
//               className="flex flex-col p-2 border-b border-gray-100"
//             >
//               <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 {field.label}
//               </span>
//               <span className="text-base font-semibold text-gray-900 mt-1">
//                 {field.value || "N/A"}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Optional: Add a note that other data is hidden */}
//         <div className="mt-4 text-xs text-gray-400 italic border-t pt-2">
//           * Only essential information is displayed for application
//         </div>
//       </div>
//     );
//   };
//   // ================ END OF MODIFIED CODE ================

//   // REMOVED/COMMENTED OUT: Original renderAllData function that showed everything
//   /*
//   const renderAllData = (student, program) => {
//     // ... original code that showed all data ...
//   };
//   */

//   // REMOVED/COMMENTED OUT: parseJSONField function (no longer needed)
//   // const parseJSONField = (field) => { ... };

//   // REMOVED/COMMENTED OUT: hasValue function (no longer needed)
//   // const hasValue = (value) => { ... };

//   if (!open) return null;

//   const student = studentData?.student;
//   const program = studentData?.program || programData;

//   // Get auth data for agent info
//   const auth = localStorage.getItem("auth");
//   const authData = auth ? JSON.parse(auth) : {};

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl relative flex flex-col max-h-[90vh]">
//         <button
//           onClick={closePopup}
//           className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 z-10"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-center py-6 text-primary">
//           {program?.program_name
//             ? `Apply for ${program.program_name}`
//             : "Student & Program Info"}
//         </h2>

//         {/* Program Summary - Small at top */}
//         {program && (
//           <div className="mx-6 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
//             <span className="font-semibold">Program:</span>{" "}
//             {program.program_name} |
//             <span className="font-semibold ml-2">University:</span>{" "}
//             {program.university_name} |
//             <span className="font-semibold ml-2">Intake:</span>{" "}
//             {program.intake_name || "N/A"}
//           </div>
//         )}

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-6 pb-32">
//           {/* Input Section */}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Student ID *
//               </label>
//               <input
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//                 placeholder="Enter Student ID (e.g., 1000)"
//                 type="number"
//                 className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     fetchStudentInfo();
//                   }
//                 }}
//               />
//             </div>

//             {error && (
//               <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
//                 <strong>Error:</strong> {error}
//               </div>
//             )}

//             <button
//               onClick={fetchStudentInfo}
//               disabled={loading || !studentId.trim()}
//               className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50"
//             >
//               {loading ? "Fetching..." : "Fetch Student Info →"}
//             </button>
//           </div>

//           {/* MODIFIED: Only show selected data, not all data */}
//           {student && (
//             <div className="mt-6">
//               {renderSelectedDataOnly(student, program, authData)}
//             </div>
//           )}

//           {/* REMOVED: Original all-data display */}
//           {/* {student && renderAllData(student, program)} */}
//         </div>

//         {/* Submit Button */}
//         {student && (
//           <div className="sticky bottom-0 bg-white border-t p-4">
//             <button
//               onClick={applyApplication}
//               disabled={loading}
//               className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 font-medium disabled:opacity-50"
//             >
//               {loading ? "Submitting..." : "Submit Application"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepFormPopup;



import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

const MultiStepFormPopup = ({ open, setOpen, programData }) => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({ name: "", id: "" });

  const defaultProgramId = programData?.program_id || programData?.id || "";

  // Load company info from localStorage on component mount
  useEffect(() => {
    try {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const authData = JSON.parse(auth);
        
        // Try different possible paths for company name
        const companyName = 
          authData.company_name || 
          authData.companyName || 
          authData.agent_company || 
          authData.organization ||
          authData.company ||
          authData.name || 
          authData.user?.company_name ||
          authData.user?.name || 
          authData.username || 
          "Company";
        
        const companyId = 
          authData.company_id || 
          authData.companyId || 
          authData.id || 
          authData.user?.id || 
          "";

        setCompanyInfo({ 
          name: companyName, 
          id: companyId.toString() 
        });
        
        console.log("Company Info loaded:", { name: companyName, id: companyId });
      }
    } catch (error) {
      console.error("Error loading company info:", error);
    }
  }, []);

  const getNameParts = (fullName) => {
    if (!fullName) return { firstName: "", familyName: "" };
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      familyName: parts.slice(1).join(" ") || "",
    };
  };

  const fetchStudentInfo = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStudentData(null);

      const auth = localStorage.getItem("auth");
      if (!auth) throw new Error("Please login again");

      const authData = JSON.parse(auth);

      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
      const url = `${baseUrl}/agent/student/info/${studentId}/${defaultProgramId}`;

      console.log("Fetching from URL:", url);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authData.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }).catch((err) => {
        clearTimeout(timeoutId);
        throw err;
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const result = await res.json();
      console.log("Complete API Response:", result);

      setStudentData(result);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);

      let userMessage = "Failed to fetch student information.";
      if (err.message.includes("timeout")) {
        userMessage = "Request timeout. Please try again.";
      } else if (err.message.includes("Failed to fetch")) {
        userMessage = "Network error. Please check your connection.";
      }

      setError(userMessage);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: userMessage,
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyApplication = async () => {
    if (!studentData) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "Please fetch student information first",
        confirmButtonColor: "#f16f22",
      });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const auth = localStorage.getItem("auth");
      if (!auth) throw new Error("Please login again");

      const authData = JSON.parse(auth);

      const student = studentData.student || {};
      const program = studentData.program || programData || {};

      // Use company name instead of agent name
      const companyName = companyInfo.name;

      // Helper function to format date for MySQL (YYYY-MM-DD)
      const formatDateForMySQL = (dateString) => {
        if (!dateString) return "";
        try {
          if (dateString.includes("T")) {
            return dateString.split("T")[0];
          }
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
          }
          const date = new Date(dateString);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split("T")[0];
          }
          return "";
        } catch (e) {
          console.error("Error formatting date:", e);
          return "";
        }
      };

      const parseToArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try {
          return typeof data === "string" ? JSON.parse(data) : [];
        } catch {
          return [];
        }
      };

      const academicQualifications = parseToArray(
        student.academic_qualifications,
      );
      const testScores = parseToArray(student.test_scores);
      const workExperiences = parseToArray(student.work_experiences);
      const references = parseToArray(student.references);
      const intakeMonths = parseToArray(program.intake_months);
      const images = parseToArray(program.images);

      const formData = new FormData();

      const { firstName, familyName } = getNameParts(student.name);

      if (firstName) formData.append("first_name", firstName);
      if (familyName) formData.append("family_name", familyName);

      formData.append("student_id", parseInt(student.id || studentId));
      
      // CHANGED: Use company_name instead of agent_name
      formData.append("company_name", companyName);
      formData.append("agent_name", companyName); // Keeping both for backward compatibility
      
      formData.append(
        "agent_id",
        (student.agent_id || authData.id || "").toString(),
      );
      formData.append(
        "program_id",
        (program.id || program.program_id || "").toString(),
      );
      formData.append("program_name", program.program_name || "");
      formData.append("university_name", program.university_name || "");
      formData.append("intake", program.intake_name || "");
      formData.append("status", "Pending");

      // ================= PROGRAM INFO =================
      formData.append("program_level_id", program.program_level_id || "");
      formData.append("program_description", program.program_description || "");
      formData.append("program_level", program.program_level || "");
      formData.append(
        "program_open_date",
        formatDateForMySQL(program.open_date),
      );
      formData.append(
        "program_submission_deadline",
        formatDateForMySQL(program.submission_deadline),
      );
      formData.append("intake_name", program.intake_name || "");
      formData.append("field_of_study_id", program.field_of_study_id || "");
      formData.append("field_of_study_name", program.field_of_study_name || "");
      formData.append(
        "study_permit_or_visa",
        program.study_permit_or_visa || "",
      );
      formData.append("program_nationality", program.nationality || "");
      formData.append(
        "education_country",
        student.education_country || program.education_country || "",
      );
      formData.append(
        "last_level_of_study",
        student.last_level_of_study || program.last_level_of_study || "",
      );
      formData.append("grading_scheme", program.grading_scheme || "");

      // ================= IELTS =================
      formData.append("ielts_required", program.ielts_required ? "1" : "0");
      if (program.ielts_reading)
        formData.append("ielts_reading", program.ielts_reading.toString());
      if (program.ielts_writing)
        formData.append("ielts_writing", program.ielts_writing.toString());
      if (program.ielts_listening)
        formData.append("ielts_listening", program.ielts_listening.toString());
      if (program.ielts_speaking)
        formData.append("ielts_speaking", program.ielts_speaking.toString());
      if (program.ielts_overall)
        formData.append("ielts_overall", program.ielts_overall.toString());

      // ================= TOEFL =================
      formData.append("toefl_required", program.toefl_required ? "1" : "0");
      if (program.toefl_reading)
        formData.append("toefl_reading", program.toefl_reading.toString());
      if (program.toefl_writing)
        formData.append("toefl_writing", program.toefl_writing.toString());
      if (program.toefl_listening)
        formData.append("toefl_listening", program.toefl_listening.toString());
      if (program.toefl_speaking)
        formData.append("toefl_speaking", program.toefl_speaking.toString());
      if (program.toefl_overall)
        formData.append("toefl_overall", program.toefl_overall.toString());

      // ================= DUOLINGO =================
      formData.append(
        "duolingo_required",
        program.duolingo_required ? "1" : "0",
      );
      if (program.duolingo_total)
        formData.append("duolingo_total", program.duolingo_total.toString());

      // ================= PTE =================
      formData.append("pte_required", program.pte_required ? "1" : "0");
      if (program.pte_reading)
        formData.append("pte_reading", program.pte_reading.toString());
      if (program.pte_writing)
        formData.append("pte_writing", program.pte_writing.toString());
      if (program.pte_listening)
        formData.append("pte_listening", program.pte_listening.toString());
      if (program.pte_speaking)
        formData.append("pte_speaking", program.pte_speaking.toString());
      if (program.pte_overall)
        formData.append("pte_overall", program.pte_overall.toString());

      // ================= PROGRAM EXTRA =================
      formData.append("program_tag_id", program.program_tag_id || "");
      formData.append("program_tag_name", program.program_tag_name || "");
      formData.append("no_exam_status", program.no_exam_status || "");
      formData.append("application_fee", program.application_fee || "");
      formData.append(
        "application_short_desc",
        program.application_short_desc || "",
      );
      formData.append(
        "average_graduate_program",
        program.average_graduate_program || "",
      );
      formData.append(
        "average_graduate_program_short_desc",
        program.average_graduate_program_short_desc || "",
      );
      formData.append(
        "average_undergraduate_program",
        program.average_undergraduate_program || "",
      );
      formData.append(
        "average_undergraduate_program_short_desc",
        program.average_undergraduate_program_short_desc || "",
      );
      formData.append("cost_of_living", program.cost_of_living || "");
      formData.append(
        "cost_of_living_short_desc",
        program.cost_of_living_short_desc || "",
      );
      formData.append(
        "average_gross_tuition",
        program.average_gross_tuition || "",
      );
      formData.append(
        "average_gross_tuition_short_desc",
        program.average_gross_tuition_short_desc || "",
      );
      formData.append("campus_city", program.campus_city || "");
      formData.append("duration", program.duration || "");
      formData.append("success_chance", program.success_chance || "");
      formData.append("program_summary", program.program_summary || "");

      // ================= ARRAYS AS JSON STRINGS =================
      formData.append("intake_months", JSON.stringify(intakeMonths));
      formData.append("images", JSON.stringify(images));

      // ================= STUDENT EXTRA =================
      formData.append("company_name", student.company_name || companyName);
      formData.append("email", student.email || "");
      formData.append(
        "destination",
        student.destination || program.university_name || "",
      );
      formData.append(
        "study_level",
        student.study_level || program.program_level || "",
      );
      formData.append(
        "subject",
        student.subject || program.field_of_study_name || "",
      );
      formData.append("student_profile_nationality", student.nationality || "");
      formData.append("passport", student.passport || "");
      formData.append("elp", student.elp || "");
      formData.append("dob", formatDateForMySQL(student.dob));
      formData.append("address", student.address || "");
      formData.append("phone", student.phone || "");
      formData.append("gender", student.gender || "");
      formData.append(
        "passport_expiry",
        formatDateForMySQL(student.passport_expiry),
      );
      formData.append(
        "country_of_residence",
        student.country_of_residence || "",
      );
      formData.append("specialization", student.specialization || "");
      formData.append("sop", student.sop || "");
      formData.append("achievements", student.achievements || "");

      // ================= FILE PATHS =================
      formData.append("resume", student.resume || "");
      formData.append("passport_copy", student.passport_copy || "");
      formData.append("transcripts", student.transcripts || "");
      formData.append("english_test", student.english_test || "");
      formData.append("photo", student.photo || "");

      // ================= ACADEMIC DATA AS JSON STRINGS =================
      formData.append(
        "academic_qualifications",
        JSON.stringify(academicQualifications),
      );
      formData.append("test_scores", JSON.stringify(testScores));
      formData.append("work_experiences", JSON.stringify(workExperiences));
      formData.append("references", JSON.stringify(references));

      // ================= TIMESTAMPS =================
      const now = new Date();
      const mysqlDateTime = now.toISOString().slice(0, 19).replace("T", " ");
      formData.append("created_at", mysqlDateTime);
      formData.append("updated_at", mysqlDateTime);
      formData.append("application_source", "agent_portal");

      console.log("Submitting FormData with Company:", companyName);

      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
      const submitUrl = `${baseUrl}/agent/my-applications`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authData.token}`,
          Accept: "application/json",
        },
        body: formData,
        signal: controller.signal,
      }).catch((err) => {
        clearTimeout(timeoutId);
        throw err;
      });

      clearTimeout(timeoutId);

      const responseText = await res.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        result = { message: responseText };
      }

      if (!res.ok) {
        console.error("Validation errors:", result.errors);

        let errorMessage = result.message;
        if (result.errors) {
          errorMessage = Object.entries(result.errors)
            .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
            .join("\n");
        }

        throw new Error(errorMessage);
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: result.message || "Application submitted successfully",
        confirmButtonColor: "#f16f22",
        timer: 3000,
        timerProgressBar: true,
      });

      closePopup();
    } catch (err) {
      console.error("Application Error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#dc3545",
      });

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setStudentId("");
    setError("");
    setStudentData(null);
    setOpen(false);
  };

  // Updated render function to show Company Name instead of Agent Name
  const renderSelectedDataOnly = (student, program) => {
    if (!student && !program) return null;

    const firstName = student?.first_name || "";
    const familyName = student?.family_name || "";
    const { firstName: nameFirst, familyName: nameFamily } = getNameParts(student?.name);
    
    const displayFirstName = firstName || nameFirst;
    const displayFamilyName = familyName || nameFamily;

    const selectedFields = [
      { 
        section: "Student Information",
        fields: [
          { label: "First Name", value: displayFirstName },
          { label: "Family Name", value: displayFamilyName },
          { label: "Student ID", value: student?.id || studentId },
          { label: "Email", value: student?.email || "N/A" },
        ]
      },
      {
        section: "Company Information",
        fields: [
          { label: "Company Name", value: companyInfo.name },
          { label: "Company ID", value: companyInfo.id },
        ]
      },
      {
        section: "Program Information",
        fields: [
          { label: "Program Name", value: program?.program_name },
          { label: "Program ID", value: program?.id || program?.program_id },
          { label: "University Name", value: program?.university_name },
          { label: "University ID", value: program?.university_id },
          { label: "Intake", value: program?.intake_name || "N/A" },
        ]
      }
    ];

    return (
      <div className="border border-primary/20 rounded-lg p-4 bg-white shadow-sm mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          Application Summary
        </h3>

        {selectedFields.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h4 className="text-md font-semibold text-primary mb-3 border-b pb-1">
              {section.section}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col p-2 bg-gray-50 rounded-lg"
                >
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {field.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 mt-1">
                    {field.value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 text-xs text-gray-400 italic border-t pt-2">
          * Please verify all information before submitting
        </div>
      </div>
    );
  };

  if (!open) return null;

  const student = studentData?.student;
  const program = studentData?.program || programData;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl relative flex flex-col max-h-[90vh]">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 z-10"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center py-6 text-primary">
          {program?.program_name
            ? `Apply for ${program.program_name}`
            : "Student & Program Info"}
        </h2>

        {/* Company Info Badge - UPDATED */}
        <div className="mx-6 mb-2 p-2 bg-green-50 rounded-lg border border-green-200 flex justify-between items-center">
          <span className="text-sm">
            <span className="font-semibold">Company:</span> {companyInfo.name}
          </span>
          <span className="text-sm">
            <span className="font-semibold">ID:</span> {companyInfo.id}
          </span>
        </div>

        {/* Program Summary */}
        {program && (
          <div className="mx-6 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
            <span className="font-semibold">Program:</span>{" "}
            {program.program_name} |
            <span className="font-semibold ml-2">University:</span>{" "}
            {program.university_name} |
            <span className="font-semibold ml-2">Intake:</span>{" "}
            {program.intake_name || "N/A"}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID *
              </label>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID (e.g., 1000)"
                type="number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchStudentInfo();
                  }
                }}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}

            <button
              onClick={fetchStudentInfo}
              disabled={loading || !studentId.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch Student Info →"}
            </button>
          </div>

          {/* Student Data Display */}
          {student && renderSelectedDataOnly(student, program)}
        </div>

        {/* Submit Button */}
        {student && (
          <div className="sticky bottom-0 bg-white border-t p-4">
            <button
              onClick={applyApplication}
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 font-medium disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepFormPopup;
