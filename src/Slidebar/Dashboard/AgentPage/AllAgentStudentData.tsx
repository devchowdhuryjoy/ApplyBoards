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
//       type={type === "date" ? "date" : type} // date type
//       className="border p-2 rounded flex-1 mt-1 md:mt-0"
//       value={value ? (type === "date" ? value.split("T")[0] : value) : ""}
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

//       // Normal fields
//       const fields = [
//         "company_name","name","email","destination","study_level","subject",
//         "nationality","passport","elp","dob","address","phone","gender",
//         "passport_expiry","country_of_residence","program","intake",
//         "specialization","achievements","sop"
//       ];

//       fields.forEach((field) => {
//         if (selectedStudent[field] !== undefined && selectedStudent[field] !== null) {
//           formData.append(field, selectedStudent[field]);
//         }
//       });

//       // JSON fields
//       ["academic_qualifications","test_scores","work_experiences","references"].forEach(field => {
//         if (selectedStudent[field]) {
//           formData.append(field, JSON.stringify(selectedStudent[field]));
//         }
//       });

//       // File fields
//       ["resume","passport_copy","transcripts","english_test","photo"].forEach(field => {
//         if (newFiles[field]) formData.append(field, newFiles[field]);
//       });

//       const response = await fetch(
//         `https://studyxladmin.globalrouteway.com/api/agent/agent-student/update/${selectedStudent.id}`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         }
//       );

//       const text = await response.text();
//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch {
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
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {students.length === 0 ? (
//                   <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No students found</td></tr>
//                 ) : (
//                   students.map((student) => (
//                     <tr key={student.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id || "N/A"}</td>
//                       <td className="px-6 py-4">{student.name || "N/A"}</td>
//                       <td className="px-6 py-4">{student.email || "N/A"}</td>
//                       <td className="px-6 py-4">{student.destination || "N/A"}</td>
//                       <td className="px-6 py-4">{student.program || "N/A"}</td>
//                       <td className="px-6 py-4 text-sm font-medium">
//                         <button onClick={() => handleViewDetails(student)} className="text-blue-600 hover:underline">View Details</button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Details Modal */}
//         {showDetailsModal && selectedStudent && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white max-w-5xl w-full rounded-xl shadow max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b flex justify-between">
//                 <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
//                 <button onClick={() => setShowDetailsModal(false)} className="text-2xl">&times;</button>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     "id","agent_id","company_name","name","email","destination","study_level",
//                     "subject","nationality","passport","elp","dob","address","phone","gender",
//                     "passport_expiry","country_of_residence","program","intake","specialization","achievements","sop"
//                   ].map((field) => (
//                     <DetailItem
//                       key={field}
//                       label={field.replaceAll("_", " ").toUpperCase()}
//                       type={["dob","passport_expiry"].includes(field) ? "date" : "text"}
//                       value={selectedStudent[field]}
//                       onChange={(v) => setSelectedStudent(prev => ({...prev, [field]: v}))}
//                     />
//                   ))}
//                 </div>

//                 {/* JSON Sections */}
//                 {["academic_qualifications","test_scores","work_experiences","references"].map(section => {
//                   const data = parseData(selectedStudent[section]);
//                   if (!data.length) return <p key={section}>{section.replaceAll("_"," ")}: N/A</p>;
//                   return (
//                     <div key={section} className="bg-gray-50 rounded-lg p-4">
//                       <h3 className="font-semibold text-lg mb-3">{section.replaceAll("_"," ").toUpperCase()}</h3>
//                       {data.map((item,i) => (
//                         <div key={i} className="mb-2 border-b pb-2">
//                           {Object.keys(item).map(key => (
//                             <p key={key}><strong>{key.replaceAll("_"," ").toUpperCase()}:</strong> {item[key] || "N/A"}</p>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 })}

//                 {/* File Sections */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {["resume","passport_copy","transcripts","english_test","photo"].map(field => (
//                     <FileSection
//                       key={field}
//                       title={field}
//                       rawData={selectedStudent[field]}
//                       onFileSelect={(file) => setNewFiles(prev => ({...prev,[field]: file}))}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="p-6 border-t flex justify-end gap-3">
//                 <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
//                 <button onClick={handleUpdateStudent} className="px-4 py-2 bg-blue-600 text-white rounded">Update Student</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAgentStudentData;









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
   Helper function to extract filename from path
======================= */
const getFileNameFromPath = (path) => {
  if (!path) return "Unknown file";
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/^\d+_/, '');
};

/* =======================
   Helper function to parse file data
======================= */
const parseFileData = (rawData) => {
  if (!rawData) return [];
  
  try {
    if (Array.isArray(rawData)) {
      return rawData.map(file => {
        if (typeof file === 'string') {
          return {
            url: `https://studyxladmin.globalrouteway.com/${file.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
            name: getFileNameFromPath(file),
            path: file
          };
        }
        return file;
      });
    }
    
    if (typeof rawData === "string") {
      try {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed)) {
          return parsed.map(file => ({
            url: `https://studyxladmin.globalrouteway.com/${file.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
            name: getFileNameFromPath(file),
            path: file
          }));
        }
      } catch {
        if (rawData.length > 0) {
          return [{
            url: `https://studyxladmin.globalrouteway.com/${rawData.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
            name: getFileNameFromPath(rawData),
            path: rawData
          }];
        }
      }
    }
  } catch (error) {
    console.error("Error parsing file data:", error);
  }
  
  return [];
};

/* =======================
   Safe Parse Function
======================= */
const safeParseJSON = (data) => {
  if (!data) return [];
  try {
    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    }
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

/* =======================
   Editable Detail Item
======================= */
const DetailItem = ({ label, value, type = "text", onChange }) => (
  <div className="flex flex-col md:flex-row mb-3">
    <span className="font-medium text-gray-600 w-full md:w-1/3">{label}:</span>
    <input
      type={type === "date" ? "date" : type}
      className="border p-2 rounded flex-1 mt-1 md:mt-0"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

/* =======================
   Multiple File Viewer & Uploader
======================= */
const MultiFileSection = ({ rawData, title, onFilesSelect, onRemoveExisting }) => {
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  
  useEffect(() => {
    const parsedFiles = parseFileData(rawData);
    setExistingFiles(parsedFiles);
  }, [rawData]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesSelect(newFiles);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index) => {
    const removedFile = existingFiles[index];
    const updated = [...existingFiles];
    updated.splice(index, 1);
    setExistingFiles(updated);
    if (onRemoveExisting) {
      onRemoveExisting(removedFile);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded border mb-4">
      <h3 className="font-semibold mb-2">
        {title.replaceAll("_", " ").toUpperCase()}
      </h3>
      
      {existingFiles.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Current Files:</p>
          <div className="space-y-2">
            {existingFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-xs flex items-center gap-1 truncate"
                >
                  <span>📄</span> {file.name}
                </a>
                <button
                  type="button"
                  onClick={() => removeExistingFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload New Files (Multiple allowed)
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700">New Files to Upload:</p>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
                <span className="text-xs text-gray-600 truncate flex items-center gap-1">
                  <span>📄</span> {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =======================
   Academic Qualifications Display - WITH FILE UPLOAD
======================= */
const AcademicSection = ({ data, onChange, onAcademicFilesSelect, onRemoveExistingDocument }) => {
  const [academics, setAcademics] = useState([]);
  const [newAcademicFiles, setNewAcademicFiles] = useState({});

  useEffect(() => {
    if (data) {
      try {
        let parsed = data;
        if (typeof data === "string") {
          parsed = JSON.parse(data);
        }
        
        const academicsArray = Array.isArray(parsed) ? parsed : [];
        
        const processedAcademics = academicsArray.map(academic => ({
          degree: academic.degree || "",
          institution: academic.institution || "",
          year: academic.year || "",
          cgpa: academic.cgpa || "",
          documents: academic.document || [] // Keep original document paths
        }));
        
        setAcademics(processedAcademics);
      } catch (error) {
        console.error("Error parsing academics:", error);
        setAcademics([]);
      }
    } else {
      setAcademics([]);
    }
  }, [data]);

  const handleAcademicChange = (index, field, value) => {
    const updated = [...academics];
    updated[index] = { ...updated[index], [field]: value };
    setAcademics(updated);
    onChange(updated);
  };

  const handleAcademicFileChange = (index, e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      setNewAcademicFiles(prev => ({
        ...prev,
        [index]: [...(prev[index] || []), ...files]
      }));

      if (onAcademicFilesSelect) {
        onAcademicFilesSelect(index, files);
      }
    }
  };

  const removeExistingDocument = (academicIndex, docIndex) => {
    const updated = [...academics];
    const removedDoc = updated[academicIndex].documents[docIndex];
    updated[academicIndex].documents = updated[academicIndex].documents.filter((_, i) => i !== docIndex);
    setAcademics(updated);
    onChange(updated);
    
    if (onRemoveExistingDocument) {
      onRemoveExistingDocument(academicIndex, removedDoc);
    }
  };

  const removeNewFile = (academicIndex, fileIndex) => {
    if (newAcademicFiles[academicIndex]) {
      const updatedFiles = newAcademicFiles[academicIndex].filter((_, i) => i !== fileIndex);
      setNewAcademicFiles(prev => ({
        ...prev,
        [academicIndex]: updatedFiles
      }));
    }
  };

  const handleAddAcademic = () => {
    const newAcademic = {
      degree: "",
      institution: "",
      year: "",
      cgpa: "",
      documents: []
    };
    const updated = [...academics, newAcademic];
    setAcademics(updated);
    onChange(updated);
  };

  const handleRemoveAcademic = (index) => {
    const updated = academics.filter((_, i) => i !== index);
    setAcademics(updated);
    onChange(updated);
    
    if (newAcademicFiles[index]) {
      const updatedFiles = { ...newAcademicFiles };
      delete updatedFiles[index];
      setNewAcademicFiles(updatedFiles);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">ACADEMIC QUALIFICATIONS</h3>
        <button
          type="button"
          onClick={handleAddAcademic}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          + Add Academic
        </button>
      </div>

      {academics.length === 0 ? (
        <p className="text-gray-500">No academic qualifications found</p>
      ) : (
        academics.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Academic #{index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveAcademic(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DetailItem
                label="Degree"
                value={item.degree || ""}
                onChange={(v) => handleAcademicChange(index, "degree", v)}
              />
              <DetailItem
                label="Institution"
                value={item.institution || ""}
                onChange={(v) => handleAcademicChange(index, "institution", v)}
              />
              <DetailItem
                label="Year"
                value={item.year || ""}
                onChange={(v) => handleAcademicChange(index, "year", v)}
              />
              <DetailItem
                label="CGPA"
                value={item.cgpa || ""}
                onChange={(v) => handleAcademicChange(index, "cgpa", v)}
              />
            </div>

            {/* File Upload Section */}
            <div className="mt-3 border-t pt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
              
              {/* Existing Documents */}
              {item.documents && item.documents.length > 0 && (
                <div className="mb-3 space-y-1">
                  <p className="text-xs font-medium text-gray-500">Existing Files:</p>
                  {item.documents.map((doc, docIndex) => {
                    const cleanPath = doc.replace(/\\/g, "/").replace(/\/\//g, "/");
                    const docUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
                    const docName = getFileNameFromPath(doc);

                    return (
                      <div key={docIndex} className="flex items-center justify-between bg-white p-2 rounded">
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline text-xs flex items-center gap-1 truncate"
                        >
                          <span>📄</span> {docName}
                        </a>
                        <button
                          type="button"
                          onClick={() => removeExistingDocument(index, docIndex)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* New Files */}
              {newAcademicFiles[index] && newAcademicFiles[index].length > 0 && (
                <div className="mb-3 space-y-1">
                  <p className="text-xs font-medium text-gray-500">New Files to Upload:</p>
                  {newAcademicFiles[index].map((file, fileIndex) => (
                    <div key={fileIndex} className="flex items-center justify-between bg-green-50 p-2 rounded">
                      <span className="text-xs text-gray-600 flex items-center gap-1 truncate">
                        <span>📄</span> {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewFile(index, fileIndex)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Files for Academic #{index + 1}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleAcademicFileChange(index, e)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/* =======================
   Main Component
======================= */
const AllAgentStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newFiles, setNewFiles] = useState({});
  const [removedFiles, setRemovedFiles] = useState({});
  const [academicFiles, setAcademicFiles] = useState({});
  const [removedAcademicDocs, setRemovedAcademicDocs] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updatedAcademics, setUpdatedAcademics] = useState(null);

  const fetchAgentStudents = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      console.log("Fetched students:", result);
      setStudents(result.success ? result.students || [] : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStudents();
  }, []);

  const handleViewDetails = (student) => {
    console.log("Viewing student:", student);
    setSelectedStudent({ ...student });
    setNewFiles({});
    setRemovedFiles({});
    setAcademicFiles({});
    setRemovedAcademicDocs({});
    setUpdatedAcademics(null);
    setShowDetailsModal(true);
  };

  const handleAcademicFilesSelect = (index, files) => {
    setAcademicFiles(prev => ({
      ...prev,
      [index]: files
    }));
  };

  const handleRemoveExistingDocument = (academicIndex, docPath) => {
    setRemovedAcademicDocs(prev => ({
      ...prev,
      [academicIndex]: [...(prev[academicIndex] || []), docPath]
    }));
  };

  const handleRemoveExistingFile = (section, removedFile) => {
    setRemovedFiles(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), removedFile]
    }));
  };

  const handleUpdateStudent = async () => {
    try {
      Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

      const token = getAuthToken();
      if (!token) {
        Swal.fire("Error", "Unauthorized", "error");
        return;
      }

      const formData = new FormData();
      formData.append("_method", "POST");

      // Normal fields
      const fields = [
        "name", "email", "destination", "study_level", "subject",
        "nationality", "passport", "elp", "dob", "address", "phone", "gender",
        "passport_expiry", "country_of_residence", "program", "intake",
        "specialization", "achievements", "sop"
      ];

      fields.forEach((field) => {
        if (selectedStudent[field] !== undefined && selectedStudent[field] !== null) {
          formData.append(field, selectedStudent[field]);
        }
      });

      // Academic Qualifications - Send as individual fields
      const academics = updatedAcademics || safeParseJSON(selectedStudent.academic_qualifications);
      if (academics && academics.length > 0) {
        academics.forEach((academic, index) => {
          // Send text fields
          if (academic.degree) formData.append(`academic_qualifications[${index}][degree]`, academic.degree);
          if (academic.institution) formData.append(`academic_qualifications[${index}][institution]`, academic.institution);
          if (academic.year) formData.append(`academic_qualifications[${index}][year]`, academic.year);
          if (academic.cgpa) formData.append(`academic_qualifications[${index}][cgpa]`, academic.cgpa);
          
          // Send EXISTING document paths as JSON string (NOT as array)
          if (academic.documents && academic.documents.length > 0) {
            const removedForThisIndex = removedAcademicDocs[index] || [];
            const existingDocs = academic.documents.filter(doc => 
              !removedForThisIndex.includes(doc)
            );
            
            if (existingDocs.length > 0) {
              // IMPORTANT FIX: Send as JSON string - this is what the backend expects
              formData.append(`academic_qualifications[${index}][document]`, JSON.stringify(existingDocs));
            } else {
              // Send empty array as JSON string if no documents remain
              formData.append(`academic_qualifications[${index}][document]`, JSON.stringify([]));
            }
          } else {
            // Send empty array as JSON string if no documents
            formData.append(`academic_qualifications[${index}][document]`, JSON.stringify([]));
          }
          
          // Append NEW academic files if any
          if (academicFiles[index]) {
            academicFiles[index].forEach((file, fileIndex) => {
              formData.append(`academic_qualifications[${index}][document_file][${fileIndex}]`, file);
            });
          }
        });
      } else {
        // If no academics, send empty array
        formData.append("academic_qualifications", JSON.stringify([]));
      }

      // JSON Sections - ALWAYS send as JSON strings
      const testScores = safeParseJSON(selectedStudent.test_scores);
      formData.append("test_scores", JSON.stringify(testScores.length > 0 ? testScores : []));

      const workExperiences = safeParseJSON(selectedStudent.work_experiences);
      formData.append("work_experiences", JSON.stringify(workExperiences.length > 0 ? workExperiences : []));

      const references = safeParseJSON(selectedStudent.references);
      formData.append("references", JSON.stringify(references.length > 0 ? references : []));

      // Regular File Upload Sections - Send as JSON strings for existing files
      const fileSections = [
        "resume", "passport_copy", "transcripts", "english_test", "photo", "other_file_uploaded"
      ];

      fileSections.forEach((section) => {
        // Handle existing files
        if (selectedStudent[section]) {
          let existingData = selectedStudent[section];
          
          try {
            // Parse if it's a string that looks like JSON
            let parsedData = existingData;
            if (typeof existingData === 'string' && (existingData.startsWith('[') || existingData.startsWith('{'))) {
              try {
                parsedData = JSON.parse(existingData);
              } catch {
                parsedData = existingData;
              }
            }
            
            // If we have removed files for this section
            if (removedFiles[section] && Array.isArray(parsedData)) {
              const remainingFiles = parsedData.filter(file => {
                if (typeof file === 'string') {
                  return !removedFiles[section].some(r => r.path === file);
                } else if (file && file.path) {
                  return !removedFiles[section].some(r => r.path === file.path);
                }
                return true;
              });
              
              // Send as JSON string
              formData.append(section, JSON.stringify(remainingFiles));
            } else {
              // Make sure it's sent as JSON string
              if (Array.isArray(parsedData)) {
                formData.append(section, JSON.stringify(parsedData));
              } else if (typeof parsedData === 'string') {
                // If it's already a string but not JSON array, wrap it
                if (parsedData.startsWith('[')) {
                  formData.append(section, parsedData);
                } else {
                  formData.append(section, JSON.stringify([parsedData]));
                }
              } else {
                formData.append(section, JSON.stringify(parsedData ? [parsedData] : []));
              }
            }
          } catch (error) {
            console.error(`Error processing ${section}:`, error);
            // Fallback: send as is if not processable
            formData.append(section, JSON.stringify([existingData]));
          }
        } else {
          // Send empty array as JSON string
          formData.append(section, JSON.stringify([]));
        }
        
        // Send new files with the correct format
        if (newFiles[section] && newFiles[section].length > 0) {
          newFiles[section].forEach((file, index) => {
            formData.append(`${section}[${index}]`, file);
          });
        }
      });

      // Debug log
      console.log("========== UPDATING STUDENT ==========");
      console.log("Student ID:", selectedStudent.id);
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], `File: ${pair[1].name} (${pair[1].size} bytes)`);
        } else {
          console.log(pair[0], pair[1]);
        }
      }
      console.log("======================================");

      const response = await fetch(
        `${BASE_URL}/agent/agent-student/update/${selectedStudent.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Update result:", result);

      if (response.ok && result.success) {
        Swal.fire("Success!", "Student updated successfully", "success");
        await fetchAgentStudents();
        setShowDetailsModal(false);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", err.message || "Something went wrong", "error");
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">{student.destination}</td>
                      <td className="px-6 py-4">{student.program}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button 
                          onClick={() => handleViewDetails(student)} 
                          className="text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
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
              <div className="p-6 border-b flex justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "id", "name", "email", "destination", "study_level", "subject",
                    "nationality", "passport", "elp", "dob", "address", "phone", "gender",
                    "passport_expiry", "country_of_residence", "program", "intake",
                    "specialization", "achievements", "sop"
                  ].map((field) => (
                    <DetailItem
                      key={field}
                      label={field.replaceAll("_", " ").toUpperCase()}
                      type={["dob", "passport_expiry"].includes(field) ? "date" : "text"}
                      value={selectedStudent[field]}
                      onChange={(v) => setSelectedStudent(prev => ({ ...prev, [field]: v }))}
                    />
                  ))}
                </div>

                {/* Academic Qualifications with File Upload */}
                <AcademicSection 
                  data={updatedAcademics || selectedStudent.academic_qualifications}
                  onChange={(updated) => setUpdatedAcademics(updated)}
                  onAcademicFilesSelect={handleAcademicFilesSelect}
                  onRemoveExistingDocument={handleRemoveExistingDocument}
                />

                {/* Test Scores */}
                {selectedStudent.test_scores && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">TEST SCORES</h3>
                    {safeParseJSON(selectedStudent.test_scores).map((item, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        {Object.entries(item).map(([key, val]) => (
                          <p key={key}>
                            <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Work Experiences */}
                {selectedStudent.work_experiences && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">WORK EXPERIENCES</h3>
                    {safeParseJSON(selectedStudent.work_experiences).map((item, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        {Object.entries(item).map(([key, val]) => (
                          <p key={key}>
                            <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* References */}
                {selectedStudent.references && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">REFERENCES</h3>
                    {safeParseJSON(selectedStudent.references).map((item, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        {Object.entries(item).map(([key, val]) => (
                          <p key={key}>
                            <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* File Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "resume",
                    "passport_copy", 
                    "transcripts", 
                    "english_test", 
                    "photo",
                    "other_file_uploaded"
                  ].map(field => (
                    <MultiFileSection
                      key={field}
                      title={field}
                      rawData={selectedStudent[field]}
                      onFilesSelect={(files) => setNewFiles(prev => ({ ...prev, [field]: files }))}
                      onRemoveExisting={(removedFile) => handleRemoveExistingFile(field, removedFile)}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
                <button 
                  onClick={() => setShowDetailsModal(false)} 
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <button 
                  onClick={handleUpdateStudent} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAgentStudentData;





















