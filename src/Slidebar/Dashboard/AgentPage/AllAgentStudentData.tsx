import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

/* =======================
   Auth Token Helper
======================= */
const getAuthToken = () => {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) return null;
    return JSON.parse(auth)?.token || null;
  } catch {
    return null;
  }
};

/* =======================
   Editable Detail Item
======================= */
const DetailItem = ({ label, value, type = "text", onChange }) => (
  <div className="flex flex-col md:flex-row mb-3">
    <span className="font-medium text-gray-600 w-full md:w-1/3">{label}:</span>
    <input
      type={type === "date" ? "date" : type} // date type
      className="border p-2 rounded flex-1 mt-1 md:mt-0"
      value={value ? (type === "date" ? value.split("T")[0] : value) : ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

/* =======================
   File Viewer & Uploader
======================= */
const FileSection = ({ rawData, title, onFileSelect }) => {
  let fileUrl = null;
  if (rawData && typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      const firstFile = Array.isArray(parsed) ? parsed[0] : parsed;
      const cleanPath = firstFile.replace(/\\/g, "").replace(/\/\//g, "/");
      fileUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
    } catch {
      const cleanPath = rawData.replace(/\\/g, "").replace(/\/\//g, "/");
      fileUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded border mb-4">
      <h3 className="font-semibold mb-2">
        {title.replaceAll("_", " ").toUpperCase()}
      </h3>
      {fileUrl && (
        <div className="mb-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline text-xs"
          >
            View Current File
          </a>
        </div>
      )}
      <input
        type="file"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="text-sm w-full"
      />
    </div>
  );
};

/* =======================
   Helper function to parse JSON data
======================= */
const parseData = (data) => {
  if (!data) return [];
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return [];
  }
};

/* =======================
   Main Component
======================= */
const AllAgentStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newFiles, setNewFiles] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchAgentStudents = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setStudents(result.success ? result.students || [] : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStudents();
  }, []);

  const handleViewDetails = (student) => {
    setSelectedStudent({ ...student });
    setNewFiles({});
    setShowDetailsModal(true);
  };

  const handleUpdateStudent = async () => {
    try {
      Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

      const token = getAuthToken();
      const formData = new FormData();

      // Normal fields
      const fields = [
        "company_name","name","email","destination","study_level","subject",
        "nationality","passport","elp","dob","address","phone","gender",
        "passport_expiry","country_of_residence","program","intake",
        "specialization","achievements","sop"
      ];

      fields.forEach((field) => {
        if (selectedStudent[field] !== undefined && selectedStudent[field] !== null) {
          formData.append(field, selectedStudent[field]);
        }
      });

      // JSON fields
      ["academic_qualifications","test_scores","work_experiences","references"].forEach(field => {
        if (selectedStudent[field]) {
          formData.append(field, JSON.stringify(selectedStudent[field]));
        }
      });

      // File fields
      ["resume","passport_copy","transcripts","english_test","photo"].forEach(field => {
        if (newFiles[field]) formData.append(field, newFiles[field]);
      });

      const response = await fetch(
        `https://studyxladmin.globalrouteway.com/api/agent/agent-student/update/${selectedStudent.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server returned non-JSON response. Check API URL.");
      }

      if (response.ok && result.success) {
        Swal.fire("Success!", "Updated successfully", "success");
        fetchAgentStudents();
        setShowDetailsModal(false);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Agent Students</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No students found</td></tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id || "N/A"}</td>
                      <td className="px-6 py-4">{student.name || "N/A"}</td>
                      <td className="px-6 py-4">{student.email || "N/A"}</td>
                      <td className="px-6 py-4">{student.destination || "N/A"}</td>
                      <td className="px-6 py-4">{student.program || "N/A"}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button onClick={() => handleViewDetails(student)} className="text-blue-600 hover:underline">View Details</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-5xl w-full rounded-xl shadow max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "id","agent_id","company_name","name","email","destination","study_level",
                    "subject","nationality","passport","elp","dob","address","phone","gender",
                    "passport_expiry","country_of_residence","program","intake","specialization","achievements","sop"
                  ].map((field) => (
                    <DetailItem
                      key={field}
                      label={field.replaceAll("_", " ").toUpperCase()}
                      type={["dob","passport_expiry"].includes(field) ? "date" : "text"}
                      value={selectedStudent[field]}
                      onChange={(v) => setSelectedStudent(prev => ({...prev, [field]: v}))}
                    />
                  ))}
                </div>

                {/* JSON Sections */}
                {["academic_qualifications","test_scores","work_experiences","references"].map(section => {
                  const data = parseData(selectedStudent[section]);
                  if (!data.length) return <p key={section}>{section.replaceAll("_"," ")}: N/A</p>;
                  return (
                    <div key={section} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{section.replaceAll("_"," ").toUpperCase()}</h3>
                      {data.map((item,i) => (
                        <div key={i} className="mb-2 border-b pb-2">
                          {Object.keys(item).map(key => (
                            <p key={key}><strong>{key.replaceAll("_"," ").toUpperCase()}:</strong> {item[key] || "N/A"}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* File Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["resume","passport_copy","transcripts","english_test","photo"].map(field => (
                    <FileSection
                      key={field}
                      title={field}
                      rawData={selectedStudent[field]}
                      onFileSelect={(file) => setNewFiles(prev => ({...prev,[field]: file}))}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
                <button onClick={handleUpdateStudent} className="px-4 py-2 bg-blue-600 text-white rounded">Update Student</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAgentStudentData;




// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import Swal from "sweetalert2";

// /* =======================
//    Auth Token Helper
// ======================= */
// const getAuthToken = () => {
//   try {
//     const auth = localStorage.getItem("auth");
//     if (!auth) return null;
//     return JSON.parse(auth)?.token || null;
//   } catch {
//     return null;
//   }
// };

// /* =======================
//    Editable Detail Item
// ======================= */
// const DetailItem = ({ label, value, type = "text", onChange }) => (
//   <div className="flex flex-col md:flex-row mb-3">
//     <span className="font-medium text-gray-600 w-full md:w-1/3">{label}:</span>
//     <input
//       type={type}
//       className="border p-2 rounded flex-1 mt-1 md:mt-0"
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );

// /* =======================
//    File Viewer & Uploader
// ======================= */
// const FileSection = ({ rawData, title, onFileSelect }) => {
//   let fileUrl = null;
//   if (rawData && typeof rawData === "string") {
//     try {
//       const parsed = JSON.parse(rawData);
//       const firstFile = Array.isArray(parsed) ? parsed[0] : parsed;
//       const cleanPath = firstFile.replace(/\\/g, "").replace(/\/\//g, "/");
//       fileUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
//     } catch {
//       const cleanPath = rawData.replace(/\\/g, "").replace(/\/\//g, "/");
//       fileUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
//     }
//   }

//   return (
//     <div className="bg-gray-50 p-4 rounded border mb-4">
//       <h3 className="font-semibold mb-2">
//         {title.replaceAll("_", " ").toUpperCase()}
//       </h3>
//       {fileUrl && (
//         <div className="mb-2">
//           <a
//             href={fileUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-600 underline text-xs"
//           >
//             View Current File
//           </a>
//         </div>
//       )}
//       <input
//         type="file"
//         onChange={(e) => onFileSelect(e.target.files[0])}
//         className="text-sm w-full"
//       />
//     </div>
//   );
// };

// /* =======================
//    Helper function to parse JSON data
// ======================= */
// const parseData = (data) => {
//   if (!data) return [];
//   try {
//     return typeof data === "string" ? JSON.parse(data) : data;
//   } catch {
//     return [];
//   }
// };

// /* =======================
//    Main Component
// ======================= */
// const AllAgentStudentData = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [newFiles, setNewFiles] = useState({});
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
  
//   const fetchAgentStudents = async () => {
//     try {
//       setLoading(true);
//       const token = getAuthToken();
//       const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       setStudents(result.success ? result.students || [] : []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgentStudents();
//   }, []);

//   const handleViewDetails = (student) => {
//     setSelectedStudent({ ...student });
//     setNewFiles({});
//     setShowDetailsModal(true);
//   };

//   const handleUpdateStudent = async () => {
//     try {
//       Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

//       const token = getAuthToken();
//       const formData = new FormData();

//       const fields = [
//         "id",
//         "agent_id",
//         "company_name",
//         "name",
//         "email",
//         "destination",
//         "study_level",
//         "subject",
//         "nationality",
//         "passport",
//         "elp",
//         "dob",
//         "address",
//         "phone",
//         "gender",
//         "passport_expiry",
//         "country_of_residence",
//         "program",
//         "intake",
//         "specialization",
//         "achievements",
//         "sop",
//       ];

//       fields.forEach((field) => {
//         if (
//           selectedStudent[field] !== undefined &&
//           selectedStudent[field] !== null
//         ) {
//           formData.append(field, selectedStudent[field]);
//         }
//       });

//       [
//         "resume",
//         "passport_copy",
//         "transcripts",
//         "english_test",
//         "photo",
//       ].forEach((fileField) => {
//         if (newFiles[fileField]) {
//           formData.append(fileField, newFiles[fileField]);
//         }
//       });

//       const response = await fetch(
//         `https://studyxladmin.globalrouteway.com/api/agent/agent-student/update/${selectedStudent.id}`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         },
//       );

//       const text = await response.text();
//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch (e) {
//         throw new Error("Server returned non-JSON response. Check API URL.");
//       }

//       if (response.ok && result.success) {
//         Swal.fire("Success!", "Updated successfully", "success");
//         fetchAgentStudents();
//         setShowDetailsModal(false);
//       } else {
//         throw new Error(result.message || "Update failed");
//       }
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   if (loading) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Agent Students</h1>
//         <div className="bg-white rounded-xl shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Destination
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Program
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="bg-white divide-y divide-gray-200">
//                 {students.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="px-6 py-12 text-center text-gray-500"
//                     >
//                       No students found
//                     </td>
//                   </tr>
//                 ) : (
//                   students.map((student) => (
//                     <tr key={student.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                         {student.id || "N/A"}
//                       </td>
//                       <td className="px-6 py-4">{student.name || "N/A"}</td>
//                       <td className="px-6 py-4">{student.email || "N/A"}</td>
//                       <td className="px-6 py-4">
//                         {student.destination || "N/A"}
//                       </td>
//                       <td className="px-6 py-4">{student.program || "N/A"}</td>
//                       <td className="px-6 py-4 text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(student)}
//                           className="text-blue-600 hover:underline"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {showDetailsModal && selectedStudent && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white max-w-5xl w-full rounded-xl shadow max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b flex justify-between">
//                 <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     "id",
//                     "agent_id",
//                     "company_name",
//                     "name",
//                     "email",
//                     "destination",
//                     "study_level",
//                     "subject",
//                     "nationality",
//                     "passport",
//                     "elp",
//                     "dob",
//                     "address",
//                     "phone",
//                     "gender",
//                     "passport_expiry",
//                     "country_of_residence",
//                     "program",
//                     "intake",
//                     "specialization",
//                     "achievements",
//                     "sop",
//                   ].map((field) => (
//                     <DetailItem
//                       key={field}
//                       label={field.replaceAll("_", " ").toUpperCase()}
//                       value={selectedStudent[field]}
//                       onChange={(v) =>
//                         setSelectedStudent((prev) => ({ ...prev, [field]: v }))
//                       }
//                     />
//                   ))}
//                 </div>

//                 {/* Academic Qualifications */}
//                 {parseData(selectedStudent?.academic_qualifications).length > 0 ? (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">
//                       Academic Qualifications
//                     </h3>
//                     {parseData(selectedStudent?.academic_qualifications).map((q, i) => (
//                       <div key={i} className="mb-3 border-b pb-2">
//                         <p>
//                           <strong>Degree:</strong> {q.degree || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Institution:</strong>{" "}
//                           {q.institution || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Year:</strong> {q.year || "N/A"}
//                         </p>
//                         <p>
//                           <strong>CGPA:</strong> {q.cgpa || "N/A"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>Academic Qualifications: N/A</p>
//                 )}

//                 {/* Test Scores */}
//                 {parseData(selectedStudent?.test_scores).length > 0 ? (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">
//                       Test Scores
//                     </h3>
//                     {parseData(selectedStudent?.test_scores).map((t, i) => (
//                       <div key={i} className="mb-2 border-b pb-2">
//                         <p>
//                           <strong>Test:</strong> {t.test_name || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Score:</strong> {t.score || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Date:</strong>{" "}
//                           {t.date
//                             ? new Date(t.date).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>Test Scores: N/A</p>
//                 )}

//                 {/* Work Experiences */}
//                 {parseData(selectedStudent?.work_experiences).length > 0 ? (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">
//                       Work Experiences
//                     </h3>
//                     {parseData(selectedStudent?.work_experiences).map((w, i) => (
//                       <div key={i} className="mb-3 border-b pb-2">
//                         <p>
//                           <strong>Organization:</strong>{" "}
//                           {w.organization || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Position:</strong> {w.position || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Start Date:</strong>{" "}
//                           {w.start_date
//                             ? new Date(w.start_date).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                         <p>
//                           <strong>End Date:</strong>{" "}
//                           {w.end_date
//                             ? new Date(w.end_date).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                         <p>
//                           <strong>Description:</strong>{" "}
//                           {w.description || "N/A"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>Work Experiences: N/A</p>
//                 )}

//                 {/* References */}
//                 {parseData(selectedStudent?.references).length > 0 ? (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">References</h3>
//                     {parseData(selectedStudent?.references).map((r, i) => (
//                       <div key={i} className="mb-2 border-b pb-2">
//                         <p>
//                           <strong>Name:</strong> {r.name || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Contact:</strong> {r.contact || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Relation:</strong> {r.relation || "N/A"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>References: N/A</p>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     "resume",
//                     "passport_copy",
//                     "transcripts",
//                     "english_test",
//                     "photo",
//                   ].map((field) => (
//                     <FileSection
//                       key={field}
//                       title={field}
//                       rawData={selectedStudent[field]}
//                       onFileSelect={(file) =>
//                         setNewFiles((p) => ({ ...p, [field]: file }))
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="p-6 border-t flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={handleUpdateStudent}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Update Student
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAgentStudentData;





