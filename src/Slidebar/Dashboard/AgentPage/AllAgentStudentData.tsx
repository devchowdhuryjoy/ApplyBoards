// Imran 
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
//    Helper function to extract filename from path
// ======================= */
// const getFileNameFromPath = (path) => {
//   if (!path) return "Unknown file";
//   const parts = path.split('/');
//   const filename = parts[parts.length - 1];
//   return filename.replace(/^\d+_/, '');
// };

// /* =======================
//    Helper function to parse file data
// ======================= */
// const parseFileData = (rawData) => {
//   if (!rawData) return [];
 
//   try {
//     if (Array.isArray(rawData)) {
//       return rawData.map(file => {
//         if (typeof file === 'string') {
//           return {
//             url: `https://studyxladmin.globalrouteway.com/${file.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
//             name: getFileNameFromPath(file),
//             path: file
//           };
//         }
//         return file;
//       });
//     }
   
//     if (typeof rawData === "string") {
//       try {
//         const parsed = JSON.parse(rawData);
//         if (Array.isArray(parsed)) {
//           return parsed.map(file => ({
//             url: `https://studyxladmin.globalrouteway.com/${file.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
//             name: getFileNameFromPath(file),
//             path: file
//           }));
//         }
//       } catch {
//         if (rawData.length > 0) {
//           return [{
//             url: `https://studyxladmin.globalrouteway.com/${rawData.replace(/\\/g, "/").replace(/\/\//g, "/")}`,
//             name: getFileNameFromPath(rawData),
//             path: rawData
//           }];
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error parsing file data:", error);
//   }
 
//   return [];
// };

// /* =======================
//    Safe Parse Function - এইটা এখানে রাখুন
// ======================= */
// const safeParseJSON = (data) => {
//   if (!data) return [];
 
//   // If it's already an array, return it
//   if (Array.isArray(data)) {
//     return data;
//   }
 
//   // If it's a string, try to parse it
//   if (typeof data === "string") {
//     // If it's empty, return empty array
//     if (data.trim() === "") return [];
   
//     try {
//       const parsed = JSON.parse(data);
//       return Array.isArray(parsed) ? parsed : [];
//     } catch (e) {
//       console.error("JSON parse error:", e);
//       return [];
//     }
//   }
 
//   return [];
// };

// /* =======================
//    Editable Detail Item
// ======================= */
// const DetailItem = ({ label, value, type = "text", onChange }) => (
//   <div className="flex flex-col md:flex-row mb-3">
//     <span className="font-medium text-gray-600 w-full md:w-1/3">{label}:</span>
//     <input
//       type={type === "date" ? "date" : type}
//       className="border p-2 rounded flex-1 mt-1 md:mt-0"
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );

// /* =======================
//    Multiple File Viewer & Uploader
// ======================= */
// const MultiFileSection = ({ rawData, title, onFilesSelect, onRemoveExisting }) => {
//   const [files, setFiles] = useState([]);
//   const [existingFiles, setExistingFiles] = useState([]);
 
//   useEffect(() => {
//     const parsedFiles = parseFileData(rawData);
//     setExistingFiles(parsedFiles);
//   }, [rawData]);

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFiles(prev => [...prev, ...newFiles]);
//       onFilesSelect(newFiles);
//     }
//   };

//   const removeFile = (index) => {
//     setFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const removeExistingFile = (index) => {
//     const removedFile = existingFiles[index];
//     const updated = [...existingFiles];
//     updated.splice(index, 1);
//     setExistingFiles(updated);
//     if (onRemoveExisting) {
//       onRemoveExisting(removedFile);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded border mb-4">
//       <h3 className="font-semibold mb-2">
//         {title.replaceAll("_", " ").toUpperCase()}
//       </h3>
     
//       {existingFiles.length > 0 && (
//         <div className="mb-3">
//           <p className="text-sm font-medium text-gray-700 mb-2">Current Files:</p>
//           <div className="space-y-2">
//             {existingFiles.map((file, index) => (
//               <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
//                 <a
//                   href={file.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-600 underline text-xs flex items-center gap-1 truncate"
//                 >
//                   <span>📄</span> {file.name}
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => removeExistingFile(index)}
//                   className="text-red-500 hover:text-red-700 text-xs ml-2"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Upload New Files (Multiple allowed)
//         </label>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
       
//         {files.length > 0 && (
//           <div className="mt-3 space-y-2">
//             <p className="text-sm font-medium text-gray-700">New Files to Upload:</p>
//             {files.map((file, index) => (
//               <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
//                 <span className="text-xs text-gray-600 truncate flex items-center gap-1">
//                   <span>📄</span> {file.name}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => removeFile(index)}
//                   className="text-red-500 hover:text-red-700 text-xs"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* =======================
//    Academic Qualifications Display
// ======================= */
// const AcademicSection = ({ data, onChange, onAcademicFilesSelect, onRemoveExistingDocument }) => {
//   const [academics, setAcademics] = useState([]);
//   const [newAcademicFiles, setNewAcademicFiles] = useState({});

//   useEffect(() => {
//     if (data) {
//       try {
//         let parsed = data;
//         if (typeof data === "string") {
//           parsed = JSON.parse(data);
//         }
       
//         const academicsArray = Array.isArray(parsed) ? parsed : [];
       
//         const processedAcademics = academicsArray.map(academic => ({
//           degree: academic.degree || "",
//           institution: academic.institution || "",
//           year: academic.year || "",
//           cgpa: academic.cgpa || "",
//           document: academic.document || []
//         }));
       
//         setAcademics(processedAcademics);
//       } catch (error) {
//         console.error("Error parsing academics:", error);
//         setAcademics([]);
//       }
//     } else {
//       setAcademics([]);
//     }
//   }, [data]);

//   const handleAcademicChange = (index, field, value) => {
//     const updated = [...academics];
//     updated[index] = { ...updated[index], [field]: value };
//     setAcademics(updated);
//     onChange(updated);
//   };

//   const handleAcademicFileChange = (index, e) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
     
//       setNewAcademicFiles(prev => ({
//         ...prev,
//         [index]: [...(prev[index] || []), ...files]
//       }));

//       if (onAcademicFilesSelect) {
//         onAcademicFilesSelect(index, files);
//       }
//     }
//   };

//   const removeExistingDocument = (academicIndex, docIndex) => {
//     const updated = [...academics];
//     const removedDoc = updated[academicIndex].document[docIndex];
//     updated[academicIndex].document = updated[academicIndex].document.filter((_, i) => i !== docIndex);
//     setAcademics(updated);
//     onChange(updated);
   
//     if (onRemoveExistingDocument) {
//       onRemoveExistingDocument(academicIndex, removedDoc);
//     }
//   };

//   const removeNewFile = (academicIndex, fileIndex) => {
//     if (newAcademicFiles[academicIndex]) {
//       const updatedFiles = newAcademicFiles[academicIndex].filter((_, i) => i !== fileIndex);
//       setNewAcademicFiles(prev => ({
//         ...prev,
//         [academicIndex]: updatedFiles
//       }));
//     }
//   };

//   const handleAddAcademic = () => {
//     const newAcademic = {
//       degree: "",
//       institution: "",
//       year: "",
//       cgpa: "",
//       document: []
//     };
//     const updated = [...academics, newAcademic];
//     setAcademics(updated);
//     onChange(updated);
//   };

//   const handleRemoveAcademic = (index) => {
//     const updated = academics.filter((_, i) => i !== index);
//     setAcademics(updated);
//     onChange(updated);
   
//     if (newAcademicFiles[index]) {
//       const updatedFiles = { ...newAcademicFiles };
//       delete updatedFiles[index];
//       setNewAcademicFiles(updatedFiles);
//     }
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-4">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="font-semibold text-lg">ACADEMIC QUALIFICATIONS</h3>
//         <button
//           type="button"
//           onClick={handleAddAcademic}
//           className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
//         >
//           + Add Academic
//         </button>
//       </div>

//       {academics.length === 0 ? (
//         <p className="text-gray-500">No academic qualifications found</p>
//       ) : (
//         academics.map((item, index) => (
//           <div key={index} className="mb-4 border-b pb-4 last:border-b-0">
//             <div className="flex justify-between items-center mb-2">
//               <h4 className="font-medium">Academic #{index + 1}</h4>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveAcademic(index)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <DetailItem
//                 label="Degree"
//                 value={item.degree || ""}
//                 onChange={(v) => handleAcademicChange(index, "degree", v)}
//               />
//               <DetailItem
//                 label="Institution"
//                 value={item.institution || ""}
//                 onChange={(v) => handleAcademicChange(index, "institution", v)}
//               />
//               <DetailItem
//                 label="Year"
//                 value={item.year || ""}
//                 onChange={(v) => handleAcademicChange(index, "year", v)}
//               />
//               <DetailItem
//                 label="CGPA"
//                 value={item.cgpa || ""}
//                 onChange={(v) => handleAcademicChange(index, "cgpa", v)}
//               />
//             </div>

//             {/* File Upload Section */}
//             <div className="mt-3 border-t pt-3">
//               <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
             
//               {/* Existing Documents */}
//               {item.document && item.document.length > 0 && (
//                 <div className="mb-3 space-y-1">
//                   <p className="text-xs font-medium text-gray-500">Existing Files:</p>
//                   {item.document.map((doc, docIndex) => {
//                     const cleanPath = doc.replace(/\\/g, "/").replace(/\/\//g, "/");
//                     const docUrl = `https://studyxladmin.globalrouteway.com/${cleanPath}`;
//                     const docName = getFileNameFromPath(doc);

//                     return (
//                       <div key={docIndex} className="flex items-center justify-between bg-white p-2 rounded">
//                         <a
//                           href={docUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 underline text-xs flex items-center gap-1 truncate"
//                         >
//                           <span>📄</span> {docName}
//                         </a>
//                         <button
//                           type="button"
//                           onClick={() => removeExistingDocument(index, docIndex)}
//                           className="text-red-500 hover:text-red-700 text-xs"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* New Files */}
//               {newAcademicFiles[index] && newAcademicFiles[index].length > 0 && (
//                 <div className="mb-3 space-y-1">
//                   <p className="text-xs font-medium text-gray-500">New Files to Upload:</p>
//                   {newAcademicFiles[index].map((file, fileIndex) => (
//                     <div key={fileIndex} className="flex items-center justify-between bg-green-50 p-2 rounded">
//                       <span className="text-xs text-gray-600 flex items-center gap-1 truncate">
//                         <span>📄</span> {file.name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeNewFile(index, fileIndex)}
//                         className="text-red-500 hover:text-red-700 text-xs"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload New Files for Academic #{index + 1}
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={(e) => handleAcademicFileChange(index, e)}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// /* =======================
//    Main Component
// ======================= */
// const AllAgentStudentData = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [newFiles, setNewFiles] = useState({});
//   const [removedFiles, setRemovedFiles] = useState({});
//   const [academicFiles, setAcademicFiles] = useState({});
//   const [removedAcademicDocs, setRemovedAcademicDocs] = useState({});
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [updatedAcademics, setUpdatedAcademics] = useState(null);

//   const fetchAgentStudents = async () => {
//     try {
//       setLoading(true);
//       const token = getAuthToken();
//       const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();
//       console.log("Fetched students:", result);
//       setStudents(result.success ? result.students || [] : []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgentStudents();
//   }, []);

//   const handleViewDetails = (student) => {
//     console.log("Viewing student:", student);
//     setSelectedStudent({ ...student });
//     setNewFiles({});
//     setRemovedFiles({});
//     setAcademicFiles({});
//     setRemovedAcademicDocs({});
//     setUpdatedAcademics(null);
//     setShowDetailsModal(true);
//   };

//   const handleAcademicFilesSelect = (index, files) => {
//     setAcademicFiles(prev => ({
//       ...prev,
//       [index]: files
//     }));
//   };

//   const handleRemoveExistingDocument = (academicIndex, docPath) => {
//     setRemovedAcademicDocs(prev => ({
//       ...prev,
//       [academicIndex]: [...(prev[academicIndex] || []), docPath]
//     }));
//   };

//   const handleRemoveExistingFile = (section, removedFile) => {
//     setRemovedFiles(prev => ({
//       ...prev,
//       [section]: [...(prev[section] || []), removedFile]
//     }));
//   };

//   const handleUpdateStudent = async () => {
//     try {
//       Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

//       const token = getAuthToken();
//       if (!token) {
//         Swal.fire("Error", "Unauthorized", "error");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("_method", "POST");

//       // Normal fields
//       const fields = [
//         "name", "email", "destination", "study_level", "subject",
//         "nationality", "passport", "elp", "dob", "address", "phone", "gender",
//         "passport_expiry", "country_of_residence", "program", "intake",
//         "specialization", "visa_rejection_status", "visa_rejection_reason"
//       ];

//       fields.forEach((field) => {
//         if (selectedStudent[field] !== undefined && selectedStudent[field] !== null) {
//           formData.append(field, selectedStudent[field]);
//         }
//       });

//       // ========== ACADEMIC QUALIFICATIONS ==========
//       const academics = updatedAcademics || safeParseJSON(selectedStudent.academic_qualifications);
     
//       if (academics && academics.length > 0) {
//         const processedAcademics = [];
       
//         academics.forEach((academic, index) => {
//           const academicObj = {
//             degree: academic.degree || "",
//             institution: academic.institution || "",
//             year: academic.year || "",
//             cgpa: academic.cgpa || ""
//           };
         
//           if (academic.document && academic.document.length > 0) {
//             const removedForThisIndex = removedAcademicDocs[index] || [];
//             const existingDocs = academic.document.filter(doc =>
//               !removedForThisIndex.includes(doc)
//             );
           
//             academicObj.document = existingDocs;
//           } else {
//             academicObj.document = [];
//           }
         
//           processedAcademics.push(academicObj);
         
//           if (academicFiles[index]) {
//             academicFiles[index].forEach((file, fileIndex) => {
//               formData.append(`academic_qualifications[${index}][document_file][${fileIndex}]`, file);
//             });
//           }
//         });
       
//         formData.append("academic_qualifications", JSON.stringify(processedAcademics));
//       } else {
//         formData.append("academic_qualifications", JSON.stringify([]));
//       }

//       // ========== JSON SECTIONS ==========
//       const testScores = safeParseJSON(selectedStudent.test_scores);
//       formData.append("test_scores", JSON.stringify(testScores.length > 0 ? testScores : []));

//       const workExperiences = safeParseJSON(selectedStudent.work_experiences);
//       formData.append("work_experiences", JSON.stringify(workExperiences.length > 0 ? workExperiences : []));

//       const references = safeParseJSON(selectedStudent.references);
//       formData.append("references", JSON.stringify(references.length > 0 ? references : []));

//       // ========== REGULAR FILE SECTIONS ==========
//       const fileSections = [
//         "resume", "passport_copy", "transcripts", "english_test", "photo", "other_file_uploaded"
//       ];

//       fileSections.forEach((section) => {
//         if (selectedStudent[section]) {
//           let fileData = [];
         
//           try {
//             if (typeof selectedStudent[section] === 'string') {
//               if (selectedStudent[section].startsWith('[') || selectedStudent[section].startsWith('{')) {
//                 const parsed = JSON.parse(selectedStudent[section]);
//                 fileData = Array.isArray(parsed) ? parsed : [parsed];
//               } else {
//                 fileData = [selectedStudent[section]];
//               }
//             } else if (Array.isArray(selectedStudent[section])) {
//               fileData = selectedStudent[section];
//             }
//           } catch (e) {
//             console.error(`Error parsing ${section}:`, e);
//             fileData = [];
//           }
         
//           if (removedFiles[section] && removedFiles[section].length > 0) {
//             fileData = fileData.filter(file => {
//               if (typeof file === 'string') {
//                 return !removedFiles[section].some(r => r.path === file);
//               } else if (file && file.path) {
//                 return !removedFiles[section].some(r => r.path === file.path);
//               }
//               return true;
//             });
//           }
         
//           formData.append(section, JSON.stringify(fileData));
//         } else {
//           formData.append(section, JSON.stringify([]));
//         }
       
//         if (newFiles[section] && newFiles[section].length > 0) {
//           newFiles[section].forEach((file, index) => {
//             formData.append(`${section}[${index}]`, file);
//           });
//         }
//       });

//       const response = await fetch(
//         `${BASE_URL}/agent/agent-student/update/${selectedStudent.id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       console.log("Update result:", result);

//       if (response.ok && result.success) {
//         Swal.fire("Success!", "Student updated successfully", "success");
//         await fetchAgentStudents();
//         setShowDetailsModal(false);
//       } else {
//         throw new Error(result.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire("Error", err.message || "Something went wrong", "error");
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
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
//                       <td className="px-6 py-4">{student.name}</td>
//                       <td className="px-6 py-4">{student.email}</td>
//                       <td className="px-6 py-4">{student.destination}</td>
//                       <td className="px-6 py-4">{student.program}</td>
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

//         {/* Details Modal */}
//         {showDetailsModal && selectedStudent && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white max-w-5xl w-full rounded-xl shadow max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b flex justify-between sticky top-0 bg-white">
//                 <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
//                 <button onClick={() => setShowDetailsModal(false)} className="text-2xl">&times;</button>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     "id", "name", "email", "destination", "study_level", "subject",
//                     "nationality", "passport", "elp", "dob", "address", "phone", "gender",
//                     "passport_expiry", "country_of_residence", "program", "intake",
//                     "specialization", "visa_rejection_status", "visa_rejection_reason",
//                   ].map((field) => (
//                     <DetailItem
//                       key={field}
//                       label={field.replaceAll("_", " ").toUpperCase()}
//                       type={["dob", "passport_expiry"].includes(field) ? "date" : "text"}
//                       value={selectedStudent[field]}
//                       onChange={(v) => setSelectedStudent(prev => ({ ...prev, [field]: v }))}
//                     />
//                   ))}
//                 </div>

//                 {/* Academic Qualifications with File Upload */}
//                 <AcademicSection
//                   data={updatedAcademics || selectedStudent.academic_qualifications}
//                   onChange={(updated) => setUpdatedAcademics(updated)}
//                   onAcademicFilesSelect={handleAcademicFilesSelect}
//                   onRemoveExistingDocument={handleRemoveExistingDocument}
//                 />

//                 {/* Test Scores */}
//                 {selectedStudent.test_scores && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">TEST SCORES</h3>
//                     {safeParseJSON(selectedStudent.test_scores).map((item, i) => (
//                       <div key={i} className="mb-2 border-b pb-2">
//                         {Object.entries(item).map(([key, val]) => (
//                           <p key={key}>
//                             <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
//                           </p>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Work Experiences */}
//                 {selectedStudent.work_experiences && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">WORK EXPERIENCES</h3>
//                     {safeParseJSON(selectedStudent.work_experiences).map((item, i) => (
//                       <div key={i} className="mb-2 border-b pb-2">
//                         {Object.entries(item).map(([key, val]) => (
//                           <p key={key}>
//                             <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
//                           </p>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* References */}
//                 {selectedStudent.references && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-lg mb-3">REFERENCES</h3>
//                     {safeParseJSON(selectedStudent.references).map((item, i) => (
//                       <div key={i} className="mb-2 border-b pb-2">
//                         {Object.entries(item).map(([key, val]) => (
//                           <p key={key}>
//                             <strong>{key.replaceAll("_", " ").toUpperCase()}:</strong> {String(val)}
//                           </p>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* File Sections */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     "resume",
//                     "passport_copy",
//                     "transcripts",
//                     "english_test",
//                     "photo",
//                     "other_file_uploaded"
//                   ].map(field => (
//                     <MultiFileSection
//                       key={field}
//                       title={field}
//                       rawData={selectedStudent[field]}
//                       onFilesSelect={(files) => setNewFiles(prev => ({ ...prev, [field]: files }))}
//                       onRemoveExisting={(removedFile) => handleRemoveExistingFile(field, removedFile)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={handleUpdateStudent}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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




// Fahmida

import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";


const getAuthToken = () => {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) return null;
    const token = JSON.parse(auth)?.token;
    return token ? token.replace(/^"|"$/g, '') : null;
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
      type={type}
      className="border p-2 rounded flex-1 mt-1 md:mt-0"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);


const documentTitleMap = {
  cv: "CV / Resume*",
  passport: "Passport copy*",
  transcript: "Transcript*",
  hsc: "A Level / Higher secondary / High school / 12th grade",
  application: "Application screenshots",
  cas: "CAS Copy",
  chat: "Chat upload",
  disability: "Disability",
  ielts: "English test result",
  eu: "EU settle / Pre Settled documents",
  ssc: "O level / Senior secondary / 10th grade",
  othersCert: "Other certificates or diplomas",
  others: "Others",
  pg: "PG Provisional / Degree",
  portfolio: "Portfolio",
  brp: "Post Admission – BRP",
  deposit: "Post Admission – TT/Deposit receipt",
  visa: "Post Admission – Visa",
  reference: "Reference letter",
  sop: "Statement of purpose",
  representation: "Student Representation Form",
  ug: "UG Provisional / Degree",
  universityDocs: "University application documents",
  visaRefusal: "Visa refusal",
  workCert: "Work experience certificate"
};
/* =======================
   File Viewer & Uploader
======================= */

const FileSection = ({ title, existingFiles, onFileSelect, docType, selectedFile }) => {
  const documents = Array.isArray(existingFiles) ? existingFiles : [];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {documents.length} Saved
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {/* --- OLD / EXISTING FILES --- */}
        {documents.map((doc, index) => {
          // Inside FileSection map:
          const cleanPath = doc.file_path?.replace(/\\/g, "/") || "";
          if (!cleanPath) return null; // Don't render empty slots
          const fileUrl = `https://studyxl.globalrouteway.com/${cleanPath}`;

          return (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex flex-col">
                <span className="text-[9px] text-blue-600 font-bold uppercase">Existing file</span>
                <span className="truncate max-w-[150px] text-gray-600 text-[11px]">
                  {cleanPath.split('/').pop()}
                </span>
              </div>
              <a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-[10px] hover:underline">
                VIEW
              </a>
            </div>
          );
        })}

        {/* --- NEW / SELECTED FILE --- */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
            <div className="flex flex-col">
              <span className="text-[9px] text-green-600 font-bold uppercase">New Selection (Pending)</span>
              <span className="truncate max-w-[150px] text-green-700 text-[11px] font-medium">
                {selectedFile.name}
              </span>
            </div>
            <button
              onClick={() => onFileSelect(null, docType)}
              className="text-red-500 font-bold text-[10px] hover:text-red-700"
            >
              REMOVE
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-dashed">
        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">
          {selectedFile ? "Replace Selection" : `Upload New ${title}`}
        </label>
        <input
          type="file"
          onChange={(e) => onFileSelect(e.target.files[0], docType)}
          className="text-[10px] w-full file:bg-gray-800 file:text-white file:rounded file:border-0 file:px-2 file:py-1 cursor-pointer"
        />
      </div>
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
      console.log(result)
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
    console.log(student)
    setNewFiles({});
    setShowDetailsModal(true);
  };

  const handleUpdateStudent = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        Swal.fire("Error", "Session expired.", "error");
        return;
      }

      Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

      const formData = new FormData();

      // 1. Append Standard Fields
      const fields = [
        "id", "agent_id", "first_name", "family_name", "email",
        "nationality", "date_of_birth", "country_of_birth", "native_language",
        "phone", "gender", "appears_passport", "passport_issue_location",
        "passport_number", "issue_date", "expiry_date", "permanent_country",
        "permanent_address1", "permanent_address2", "postal_code", "state_territory",
        "city", "country_of_residence", "current_address_1", "current_address_2",
        "current_postal_code", "current_state_territory", "current_city",
        "emergency_contact_name", "emergency_contact_relationship",
        "emergency_contact_phone", "emergency_contact_email", "immigration_history",
      ];

      fields.forEach((field) => {
        if (selectedStudent[field] !== undefined && selectedStudent[field] !== null) {
          formData.append(field, selectedStudent[field]);
        }
      });

      const jsonFields = [
        "academic_histories", "academic_interests", "language_tests",
        "other_language", "travel_histories", "visa_rejections", "referees", "work_experiences"
      ];

      jsonFields.forEach((field) => {
        if (selectedStudent[field]) {
          const val = typeof selectedStudent[field] === 'string'
            ? selectedStudent[field]
            : JSON.stringify(selectedStudent[field]);
          formData.append(field, val);
        }
      });

 
      let docIndex = 0;
      Object.keys(newFiles).forEach((key) => {
        const file = newFiles[key];

        if (file) {
          const documentType = documentTitleMap[key] || key;

         
          formData.append(`documents[${docIndex}][document_type]`, documentType);

          if (file instanceof File) {
            formData.append(`documents[${docIndex}][file][]`, file, file.name);
          }

          docIndex++;
        }
      });

      const response = await fetch(`${BASE_URL}/agent/agent-student/update/${selectedStudent.id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
         
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok || result.success) {
        Swal.fire("Success!", "Student records and documents updated.", "success");

       
        const updatedData = result.student || result.data || result.updatedStudent;
        if (updatedData) {
          setSelectedStudent(updatedData);
        }

        setNewFiles({});
        fetchAgentStudents();
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {student.id || "N/A"}
                      </td>
                      <td className="px-6 py-4">{student.first_name || "N/A"}</td>
                      <td className="px-6 py-4">{student.email || "N/A"}</td>
                      <td className="px-6 py-4">
                        {student.country_of_residence || "N/A"}
                      </td>
                     
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

        {showDetailsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-5xl w-full rounded-xl shadow max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "id",
                    "agent_id",
                    "first_name",
                    "family_name",
                    "email",
                    "nationality",
                    "date_of_birth",
                    "country_of_birth",
                    "native_language",
                    "phone",
                    "gender",
                    "appears_passport",
                    "passport_issue_location",
                    "passport_number",
                    "issue_date",
                    "expiry_date",
                    "permanent_country",
                    "permanent_address1",
                    "permanent_address2",
                    "postal_code",
                    "state_territory",
                    "city",
                    "country_of_residence",
                    "current_address_1",
                    "current_address_2",
                    "current_postal_code",
                    "current_state_territory",
                    "current_city",
                    "emergency_contact_name",
                    "emergency_contact_relationship",
                    "emergency_contact_phone",
                    "emergency_contact_email",
                    "immigration_history",


                  ].map((field) => (
                    <DetailItem
                      key={field}
                      label={field.replaceAll("_", " ").toUpperCase()}
                      value={selectedStudent[field]}
                      onChange={(v) =>
                        setSelectedStudent((prev) => ({ ...prev, [field]: v }))
                      }
                    />
                  ))}
                </div>

                {/* Academic Qualifications */}
                {parseData(selectedStudent?.academic_histories).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Academic Histories
                    </h3>
                    {parseData(selectedStudent?.academic_histories).map((q, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <p>
                          <strong>Country:</strong> {q.country || "N/A"}
                        </p>
                        <p>
                          <strong>Institution:</strong>{" "}
                          {q.institution || "N/A"}
                        </p>
                        <p>
                          <strong>Course:</strong> {q.course || "N/A"}
                        </p>
                        <p>
                          <strong>Level of Study:</strong> {q.lavel_of_study || "N/A"}
                        </p>
                        <p>
                          <strong>Grade:</strong> {q.grade || "N/A"}
                        </p>
                        <p>
                          <strong>Start Date:</strong>
                          {q.start_date
                            ? new Date(q.start_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>End Date:</strong>
                          {q.end_date
                            ? new Date(q.end_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Academic Qualifications: N/A</p>
                )}

                {/* Academic Interest */}
                {parseData(selectedStudent?.academic_interests).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Academic Interest
                    </h3>
                    {parseData(selectedStudent?.academic_interests).map((q, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <p>
                          <strong>Level of Study:</strong> {q.level_of_study || "N/A"}
                        </p>
                        <p>
                          <strong>Discipline:</strong> {q.discipline || "N/A"}
                        </p>
                        <p>
                          <strong>Programme:</strong>{" "}
                          {q.programme || "N/A"}
                        </p>
                        <p>
                          <strong>Location:</strong> {q.location || "N/A"}
                        </p>
                        <p>
                          <strong>Start Date:</strong>
                          {q.start_date
                            ? new Date(q.start_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Academic Interest: N/A</p>
                )}




                {/* language tests */}
                {parseData(selectedStudent?.language_tests).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Language Tests
                    </h3>
                    {parseData(selectedStudent?.language_tests).map((t, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        <p>
                          <strong>Test Token:</strong> {t.test_token || "N/A"}
                        </p>
                        <p>
                          <strong>Test Reference:</strong> {t.test_reference || "N/A"}
                        </p>
                        <p><strong>Remarks:</strong> {t.remarks || t.test_remarks || "N/A"}</p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {t.date_of_test
                            ? new Date(t.date_of_test).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p> Language Tests: N/A</p>
                )}


                {/*Other language */}
                {parseData(selectedStudent?.other_language).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Other Language
                    </h3>
                    {parseData(selectedStudent?.other_language).map((t, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        <p>
                          <strong>Test Token:</strong> {t.test_token || "N/A"}
                        </p>
                        <p>
                          <strong>Test Reference:</strong> {t.test_reference || "N/A"}
                        </p>
                        <p><strong>Remarks:</strong> {t.remarks || t.test_remarks || "N/A"}</p>
                        <p>
                          <strong> Date:</strong>{" "}
                          {t.date_of_test
                            ? new Date(t.date_of_test).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p> Other Language: N/A</p>
                )}



                {/* Travel Histories */}
                {parseData(selectedStudent?.travel_histories).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Travel Histories
                    </h3>
                    {parseData(selectedStudent?.travel_histories).map((w, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <p>
                          <strong>Arrival Date:</strong>{" "}
                          {w.date_of_arrival
                            ? new Date(w.date_of_arrival).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Departure Date:</strong>
                          {w.date_of_departure
                            ? new Date(w.date_of_departure).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Visa Start Date:</strong>{" "}
                          {w.visa_start_date
                            ? new Date(w.visa_start_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Visa Expiry Date:</strong>{" "}
                          {w.visa_expiry_date
                            ? new Date(w.visa_expiry_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Purpose of Visit:</strong>{" "}
                          {w.purpose_of_visit || "N/A"}
                        </p>
                        <p>
                          <strong>Country:</strong>{" "}
                          {w.country || "N/A"}
                        </p>
                        <p>
                          <strong>Visa Type:</strong>{" "}
                          {w.visa_type || "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p> Travel Histories: N/A</p>
                )}


                {/* Visa Rejections */}
                {parseData(selectedStudent?.visa_rejections).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Visa Rejections
                    </h3>
                    {parseData(selectedStudent?.visa_rejections).map((w, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <p>
                          <strong>Visa Rejection Type:</strong>{" "}
                          {w.vis_rejection_type || "N/A"}
                        </p>
                        <p>
                          <strong>Country:</strong> {w.country || "N/A"}
                        </p>
                        <p>
                          <strong>Visa Type:</strong>{" "}
                          {w.visa_type || "N/A"}
                        </p>
                        <p>
                          <strong>Details:</strong>{" "}
                          {w.detail || "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>  Visa Rejections: N/A</p>
                )}


                {/* References */}
                {parseData(selectedStudent?.referees).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">Reference</h3>
                    {parseData(selectedStudent?.referees).map((r, i) => (
                      <div key={i} className="mb-2 border-b pb-2">
                        <p>
                          <strong>Name:</strong> {r.name || "N/A"}
                        </p>
                        <p>
                          <strong>Position:</strong> {r.possition || "N/A"}
                        </p>
                        <p>
                          <strong>Tittle:</strong> {r.tittle || "N/A"}
                        </p>
                        <p>
                          <strong>Email:</strong> {r.work_email || "N/A"}
                        </p>
                        <p>
                          <strong>Log Details:</strong> {r.how_log_has_the_person || "N/A"}
                        </p>
                        <p>
                          <strong>Mobile:</strong> {r.mobile || "N/A"}
                        </p>
                        <p>
                          <strong>Relationship:</strong> {r.relationship || "N/A"}
                        </p>
                        <p>
                          <strong>Institution:</strong> {r.institution || "N/A"}
                        </p>
                        <p>
                          <strong>Address of Institution:</strong> {r.address_of_institution || "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Reference: N/A</p>
                )}

                {/* Work Experiences */}
                {parseData(selectedStudent?.work_experiences).length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Work Experiences
                    </h3>
                    {parseData(selectedStudent?.work_experiences).map((w, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <p>
                          <strong>Job Title:</strong>{" "}
                          {w.job_title || "N/A"}
                        </p>
                        <p>
                          <strong>Organization:</strong> {w.organization || "N/A"}
                        </p>
                        <p>
                          <strong>Organization Address:</strong> {w.address_of_organization || "N/A"}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {w.phone || "N/A"}
                        </p>
                        <p>
                          <strong>Start Date:</strong>{" "}
                          {w.start_date
                            ? new Date(w.start_date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>End Date:</strong>{" "}
                          {w.end_date
                            ? new Date(w.end_date).toLocaleDateString()
                            : "N/A"}
                        </p>

                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Work Experiences: N/A</p>
                )}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(documentTitleMap).map(([key, label]) => {
                    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

                    const targetKey = normalize(key);      
                    const targetLabel = normalize(label);

                    // 2. Filter existing files
                    const existing = (selectedStudent.documents || []).filter(d => {
                      const dbType = normalize(d.document_type);
                     
                      return dbType === targetKey || dbType === targetLabel;
                    });

                    return (
                      <FileSection
                        key={key}
                        title={label}
                        docType={key}
                        existingFiles={existing}
                        selectedFile={newFiles[key]}
                        onFileSelect={(file, typeKey) =>
                          setNewFiles(prev => ({
                            ...prev,
                            [typeKey]: file
                          }))
                        }
                      />
                    );
                  })}
                </div>

              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdateStudent}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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






















