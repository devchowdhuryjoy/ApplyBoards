// import React, { useState } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import Swal from 'sweetalert2';

// const MultiStepFormPopup = ({ open, setOpen, programData }) => {
//   const [studentId, setStudentId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [studentData, setStudentData] = useState(null);

//   const defaultProgramId = programData?.program_id || "";

//   const fetchStudentInfo = async () => {
//     if (!studentId.trim()) {
//       setError("Please enter Student ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setStudentData(null);

//       const headers = new Headers();
//       const auth = localStorage.getItem("auth");
//       if (auth) {
//         const authData = JSON.parse(auth);
//         if (authData.token) {
//           headers.append("Authorization", `Bearer ${authData.token}`);
//         }
//       }

//       // UniversityApply
//       let programIdToUse = defaultProgramId || "";

//       const url = `${BASE_URL}/agent/student/info/${studentId}/${programIdToUse}`;
//       console.log("Fetching student info:", url);

//       const res = await fetch(url, {
//         method: "GET",
//         headers: headers,
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("API Error Response:", errorText);

//         try {
//           const errorJson = JSON.parse(errorText);
//           throw new Error(errorJson.error || `Failed to fetch: ${res.status}`);
//         } catch (e) {
//           throw new Error(errorText || `Failed to fetch: ${res.status}`);
//         }
//       }

//       const result = await res.json();
//       console.log("API Success Response:", result);

//       setStudentData(result);
//     } catch (err) {
//       console.error("API Error:", err);

//       if (process.env.NODE_ENV === "development") {
//         console.log("Showing dummy data for development");
//         setStudentData({
//           name: "",
//           student_id: parseInt(studentId) || "",
//           agent_name: "",
//           agent_id: "",
//           program_id: defaultProgramId || "",
//           program_name: programData?.program_name || "",
//           university_name: programData?.university_name || "",
//           intake: programData?.intake_name || "",
//           is_dummy: true,
//         });
//       } else {
//         setError(err.message || "Failed to fetch student information");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };



//   const applyApplication = async () => {
//   if (!studentData) return;

//   try {
//     setLoading(true);
//     setError("");

//     const auth = localStorage.getItem("auth");
//     let token = "";

//     if (auth) {
//       const authData = JSON.parse(auth);
//       token = authData.token;
//     }

//     const payload = {
//       student_name: studentData.student_name,
//       student_id: parseInt(studentData.student_id),
//       agent_name: studentData.agent_name,
//       agent_id: studentData.agent_id.toString(),
//       program_id: programData?.program_id || studentData.program_id,
//       program_name: programData?.program_name || studentData.program_name,
//       university_name: programData?.university_name || studentData.university_name,
//       intake: programData?.intake_name || studentData.intake,
//     };

//     console.log("Submitting application payload:", payload);

//     const res = await fetch(`${BASE_URL}/agent/my-applications`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();
//     console.log("Application response:", result);

//     if (!res.ok || result.success === false) {
//       // SweetAlert for error
//       await Swal.fire({
//         icon: 'error',
//         title: 'Application Failed',
//         text: result.message || 'Application submission failed. Please try again.',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#dc3545',
//       });
//       throw new Error(result.message || "Application failed");
//     }

//     // SweetAlert for success
//     await Swal.fire({
//       icon: 'success',
//       title: 'Application Submitted Successfully!',
//       confirmButtonText: 'Close',
//       confirmButtonColor: '#f16f22',
//       showCloseButton: true,
//       timer: 5000,
//       timerProgressBar: true,
//     });

//     closePopup();
//   } catch (err) {
//     setError(err.message || "Failed to submit application");
//     console.error("Application Error:", err);
    
//     // SweetAlert for catch error
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: err.message || 'Failed to submit application',
//       confirmButtonText: 'OK',
//       confirmButtonColor: '#dc3545',
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   const closePopup = () => {
//     setStudentId("");
//     setError("");
//     setStudentData(null);
//     setOpen(false);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white w-full max-w-3xl rounded-2xl relative flex flex-col max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={closePopup}
//           className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 z-10"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-center py-6 text-primary">
//           {programData
//             ? `Apply for ${programData.program_name}`
//             : "Student & Program Info"}
//         </h2>

//         {/* Selected Program Info */}
//         {programData && (
//           <div className="mx-6 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             <h3 className="font-semibold text-blue-800 mb-2">
//               Selected Program:
//             </h3>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div>
//                 <span className="font-medium">University:</span>{" "}
//                 {programData.university_name}
//               </div>
//               <div>
//                 <span className="font-medium">Program:</span>{" "}
//                 {programData.program_name}
//               </div>
//               <div>
//                 <span className="font-medium">Location:</span>{" "}
//                 {programData.location}
//               </div>
//               <div>
//                 <span className="font-medium">Intake:</span>{" "}
//                 {programData.intake_name || "N/A"}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-6 pb-32">
//           {/* Inputs */}
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
//               <p className="text-xs text-gray-500 mt-1">
//                 Enter student ID to fetch their information
//               </p>
//             </div>

//             {error && (
//               <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
//                 <strong>Error:</strong> {error}
//                 {studentData?.is_dummy && (
//                   <p className="text-xs mt-1 text-red-500">
//                     ⚠️ Showing dummy data for development
//                   </p>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={fetchStudentInfo}
//               disabled={loading || !studentId.trim()}
//               className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Fetching...
//                 </span>
//               ) : (
//                 "Fetch Student Info →"
//               )}
//             </button>
//           </div>

//           {/* Display Student Data */}
//           {studentData && (
//             <div className="mt-6 space-y-4 p-4 border border-gray-200 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                 Student Details
//               </h3>

//               <div className="space-y-3">
//                 <InputField
//                   label="Student Name"
//                   value={studentData.student_name}
//                 />
//                 <InputField label="Student ID" value={studentData.student_id} />
//                 <InputField label="Agent Name" value={studentData.agent_name} />
//                 <InputField label="Agent ID" value={studentData.agent_id} />
//                 <InputField
//                   label="Program Name"
//                   value={programData?.program_name || studentData.program_name}
//                   note={programData ? "(From selected program)" : ""}
//                 />
//                 <InputField
//                   label="University"
//                   value={
//                     programData?.university_name || studentData.university_name
//                   }
//                   note={programData ? "(From selected program)" : ""}
//                 />
//                 <InputField
//                   label="Intake"
//                   value={programData?.intake_name || studentData.intake}
//                 />
//                 <InputField
//                   label="Program ID"
//                   value={programData?.program_id || studentData.program_id}
//                 />
//               </div>

//               {studentData.default_program && (
//                 <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
//                   ⚠️ Using default program. The student may have other available
//                   programs.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Fixed Apply Button at Bottom */}
//         {studentData && (
//           <div className="sticky bottom-0 bg-white border-t p-4">
//             <div className="space-y-2">
//               <p className="text-sm text-gray-600 text-center">
//                 Ready to submit application for:{" "}
//                 <strong>
//                   {programData?.program_name || studentData.program_name}
//                 </strong>
//               </p>
//               <button
//                 onClick={applyApplication}
//                 disabled={loading}
//                 className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 font-medium disabled:opacity-50"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin h-5 w-5 mr-2 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Submitting Application...
//                   </span>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </button>
//               <p className="text-xs text-gray-500 text-center">
//                 Click to create and submit the application
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const InputField = ({ label, value, note }) => (
//   <div className="flex justify-between items-center border-b pb-2">
//     <div>
//       <span className="font-medium text-gray-700">{label}</span>
//       {note && <span className="text-xs text-gray-500 ml-2">{note}</span>}
//     </div>
//     <span className="text-gray-900 font-medium">{value || "N/A"}</span>
//   </div>
// );

// export default MultiStepFormPopup;





import React, { useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from 'sweetalert2';

const MultiStepFormPopup = ({ open, setOpen, programData }) => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);

  const defaultProgramId = programData?.program_id || programData?.id || "";

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
      
      const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
      const url = `${baseUrl}/agent/student/info/${studentId}/${defaultProgramId}`;
      
      console.log("Fetching from URL:", url);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authData.token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        signal: controller.signal,
      }).catch(err => {
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
        icon: 'error',
        title: 'Error',
        text: userMessage,
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setLoading(false);
    }
  };

  const applyApplication = async () => {
    if (!studentData) {
      Swal.fire({
        icon: 'warning',
        title: 'No Data',
        text: 'Please fetch student information first',
        confirmButtonColor: '#f16f22',
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

      const agentName = authData.name || authData.user?.name || authData.username || "Agent";

      const payload = {
        student: student,
        program: program,
        student_name: student.name || "",
        student_id: parseInt(student.id || studentId),
        agent_name: agentName,
        agent_id: (student.agent_id || "").toString(),
        program_id: (program.program_id || program.id || "").toString(),
        program_name: program.program_name || "",
        university_name: program.university_name || "",
        intake: program.intake_name || "",
        applied_at: new Date().toISOString(),
        application_source: "agent_portal"
      };

      console.log("Submitting payload:", payload);

      const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
      const submitUrl = `${baseUrl}/agent/my-applications`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authData.token}`,
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }).catch(err => {
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
        throw new Error(result.message || `HTTP Error ${res.status}`);
      }

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || 'Application submitted successfully',
        confirmButtonColor: '#f16f22',
        timer: 3000,
        timerProgressBar: true,
      });

      closePopup();

    } catch (err) {
      console.error("Application Error:", err);
      
      let userMessage = err.message;
      if (err.message.includes("timeout")) {
        userMessage = "Request timeout. Please try again.";
      } else if (err.message.includes("Failed to fetch")) {
        userMessage = "Network error. Please check your connection.";
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: userMessage,
        confirmButtonColor: '#dc3545',
      });
      
      setError(userMessage);
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

  const parseJSONField = (field) => {
    if (!field) return null;
    try {
      return typeof field === 'string' ? JSON.parse(field) : field;
    } catch {
      return field;
    }
  };

  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
  };

  // Render all data together in one place
  // const renderAllData = (student, program) => {
  //   const allData = {};

  //   // Add all student data
  //   if (student) {
  //     Object.entries(student).forEach(([key, value]) => {
  //       if (hasValue(value) && typeof value !== 'object') {
  //         allData[`student_${key}`] = value;
  //       }
  //     });
  //   }

  //   // Add all program data
  //   if (program) {
  //     Object.entries(program).forEach(([key, value]) => {
  //       if (hasValue(value) && typeof value !== 'object' && !Array.isArray(value)) {
  //         allData[`program_${key}`] = value;
  //       }
  //     });
  //   }

  //   return (
  //     <div className="border border-gray-200 rounded-lg p-4">
  //       <h3 className="text-lg font-semibold text-gray-800 mb-3">
  //         Complete Application Data
  //       </h3>
  //       <div className="space-y-2 max-h-96 overflow-y-auto">
  //         {Object.entries(allData).map(([key, value]) => (
  //           <div key={key} className="flex justify-between items-center border-b pb-2">
  //             <span className="font-medium text-gray-700 capitalize">
  //               {key.replace(/_/g, ' ')}:
  //             </span>
  //             <span className="text-gray-900">{String(value)}</span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // Render all data together in one place including array data
    const renderAllData = (student, program) => {
      const allData = {};

      // Add all student data (excluding array fields)
      if (student) {
        Object.entries(student).forEach(([key, value]) => {
          // Skip array fields that will be shown separately
          const skipFields = ['academic_qualifications', 'test_scores', 'work_experiences', 'references'];
          if (!skipFields.includes(key) && hasValue(value) && typeof value !== 'object') {
            allData[`student_${key}`] = value;
          }
        });
      }

      // Add all program data
      if (program) {
        Object.entries(program).forEach(([key, value]) => {
          if (hasValue(value) && typeof value !== 'object' && !Array.isArray(value)) {
            allData[`program_${key}`] = value;
          }
        });
      }

      // Parse array data
      const academicData = student?.academic_qualifications ? parseJSONField(student.academic_qualifications) : null;
      const testData = student?.test_scores ? parseJSONField(student.test_scores) : null;
      const workData = student?.work_experiences ? parseJSONField(student.work_experiences) : null;
      const referenceData = student?.references ? parseJSONField(student.references) : null;

      return (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Complete Application Data
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Regular fields */}
            <div className="space-y-2">
              {Object.entries(allData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-700 capitalize text-sm">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-gray-900 text-sm">{String(value)}</span>
                </div>
              ))}
            </div>

            {/* Academic Qualifications */}
            {academicData && Array.isArray(academicData) && academicData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356.257l-2.5 3.5a1 1 0 01-.794.384.998.998 0 01-.707-.293L.293 9.293a1 1 0 011.414-1.414L3 9.586l2.5-3.5a1 1 0 01.994-.318L10 7.586l3.5-2.5a1 1 0 01.994.318l2.5 3.5 1.293-1.293a1 1 0 011.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5z" />
                  </svg>
                  Academic Qualifications:
                </h4>
                {academicData.map((item, idx) => (
                  <div key={idx} className="ml-4 mb-2 p-2 bg-blue-50 rounded text-sm">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">{k}:</span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Test Scores */}
            {testData && Array.isArray(testData) && testData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Test Scores:
                </h4>
                {testData.map((item, idx) => (
                  <div key={idx} className="ml-4 mb-2 p-2 bg-purple-50 rounded text-sm">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">{k}:</span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Work Experiences */}
            {workData && Array.isArray(workData) && workData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Work Experiences:
                </h4>
                {workData.map((item, idx) => (
                  <div key={idx} className="ml-4 mb-2 p-2 bg-green-50 rounded text-sm">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">{k}:</span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* References */}
            {referenceData && Array.isArray(referenceData) && referenceData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  References:
                </h4>
                {referenceData.map((item, idx) => (
                  <div key={idx} className="ml-4 mb-2 p-2 bg-orange-50 rounded text-sm">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">{k}:</span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

  // Render array data sections
  // const renderArraySections = (student) => {
  //   const sections = [];

  //   if (student?.academic_qualifications) {
  //     const data = parseJSONField(student.academic_qualifications);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="academic" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Academic Qualifications</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.test_scores) {
  //     const data = parseJSONField(student.test_scores);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="test" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Test Scores</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.work_experiences) {
  //     const data = parseJSONField(student.work_experiences);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="work" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Work Experiences</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.references) {
  //     const data = parseJSONField(student.references);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="ref" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">References</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   return sections;
  // };



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

        {/* Program Summary - Small at top */}
        {program && (
          <div className="mx-6 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
            <span className="font-semibold">Program:</span> {program.program_name} | 
            <span className="font-semibold ml-2">University:</span> {program.university_name} | 
            <span className="font-semibold ml-2">Intake:</span> {program.intake_name || "N/A"}
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

          {/* All Data Displayed Together */}
          {student && (
            <div className="mt-6 space-y-4">
              {/* Complete combined data */}
              {renderAllData(student, program)}
              
              {/* Array sections */}
              {/* {renderArraySections(student)} */}
            </div>
          )}
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