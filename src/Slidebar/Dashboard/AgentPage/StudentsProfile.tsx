// import React, { useState } from "react";
// import { PlusCircle, Trash2 } from "lucide-react";

// const StudentsProfile: React.FC = () => {
//   // Personal Info
//   const [personalInfo, setPersonalInfo] = useState({
//     fullName: "",
//     dob: "",
//     gender: "",
//     phone: "",
//     email: "",
//     address: "",
//   });

//   // Passport / Identity Info
//   const [passportInfo, setPassportInfo] = useState({
//     passportNumber: "",
//     expiryDate: "",
//     nationality: "",
//     countryResidence: "",
//   });

//   // Academic Info
//   const [academicList, setAcademicList] = useState<
//     { qualification: string; institution: string; year: string; cgpa: string }[]
//   >([]);
//   const [academic, setAcademic] = useState({
//     qualification: "",
//     institution: "",
//     year: "",
//     cgpa: "",
//   });

//   // Test Scores
//   const [testList, setTestList] = useState<
//     { testName: string; score: string; year: string }[]
//   >([]);
//   const [test, setTest] = useState({
//     testName: "",
//     score: "",
//     year: "",
//   });

//   // Program Details
//   const [programDetails, setProgramDetails] = useState({
//     desiredProgram: "",
//     intake: "",
//     studyLevel: "",
//     specialization: "",
//   });

//   // Work Experience
//   const [workList, setWorkList] = useState<
//     {
//       organization: string;
//       position: string;
//       start: string;
//       end: string;
//       description: string;
//     }[]
//   >([]);
//   const [work, setWork] = useState({
//     organization: "",
//     position: "",
//     start: "",
//     end: "",
//     description: "",
//   });

//   // References
//   const [referenceList, setReferenceList] = useState<
//     { name: string; email: string; relationship: string; phone?: string }[]
//   >([]);
//   const [reference, setReference] = useState({
//     name: "",
//     email: "",
//     relationship: "",
//     phone: "",
//   });

//   // SOP & Extracurriculars
//   const [sop, setSop] = useState("");
//   const [extra, setExtra] = useState("");

//   // Attachments
//   const [attachments, setAttachments] = useState<{
//     resume?: File;
//     passportCopy?: File;
//     transcripts?: File;
//     testReport?: File;
//     photo?: File;
//   }>({});

//   // Profile Completion %
//   const totalFields =
//     Object.values(personalInfo).length + Object.values(passportInfo).length;
//   const filledFields =
//     Object.values(personalInfo).filter((val) => val !== "").length +
//     Object.values(passportInfo).filter((val) => val !== "").length;
//   const profilePercent = Math.round((filledFields / totalFields) * 100);

//   // Handlers
//   const handleChange =
//     (setter: any) =>
//     (
//       e: React.ChangeEvent<
//         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//       >
//     ) => {
//       setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//   const handleAddListItem = (
//     item: any,
//     list: any,
//     setList: any,
//     resetItem: any
//   ) => {
//     const hasValues = Object.values(item).every((val) => val !== "");
//     if (hasValues) {
//       setList([...list, item]);
//       resetItem();
//     }
//   };

//   const handleRemoveListItem = (index: number, list: any, setList: any) => {
//     const updated = [...list];
//     updated.splice(index, 1);
//     setList(updated);
//   };

//   const handleAttachmentChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     key: keyof typeof attachments
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       setAttachments({ ...attachments, [key]: e.target.files[0] });
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10">
//         <h2 className="text-2xl font-bold mb-2">My Profile</h2>
//         <p className="text-sm mb-4">Complete your profile information below.</p>
//         <div className="w-full bg-white/30 rounded-full h-4">
//           <div
//             className="bg-green-500 h-4 rounded-full text-xs text-center text-white"
//             style={{ width: `${profilePercent}%` }}
//           >
//             {profilePercent}%
//           </div>
//         </div>
//       </div>

//       {/* Personal Info */}
//       <Section title="Personal Information">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={personalInfo.fullName}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="date"
//             name="dob"
//             value={personalInfo.dob}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <select
//             name="gender"
//             value={personalInfo.gender}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={personalInfo.phone}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={personalInfo.email}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={personalInfo.address}
//             onChange={handleChange(setPersonalInfo)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       </Section>

//       {/* Passport / Identity */}
//       <Section title="Passport / Identity Information">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="passportNumber"
//             placeholder="Passport Number"
//             value={passportInfo.passportNumber}
//             onChange={handleChange(setPassportInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="date"
//             name="expiryDate"
//             placeholder="Expiry Date"
//             value={passportInfo.expiryDate}
//             onChange={handleChange(setPassportInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="nationality"
//             placeholder="Nationality"
//             value={passportInfo.nationality}
//             onChange={handleChange(setPassportInfo)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="countryResidence"
//             placeholder="Country of Residence"
//             value={passportInfo.countryResidence}
//             onChange={handleChange(setPassportInfo)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       </Section>

//       {/* Program Details */}
//       <Section title="Program Details">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="desiredProgram"
//             placeholder="Desired Program / Course"
//             value={programDetails.desiredProgram}
//             onChange={handleChange(setProgramDetails)}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             name="intake"
//             placeholder="Preferred Intake / Semester"
//             value={programDetails.intake}
//             onChange={handleChange(setProgramDetails)}
//             className="border p-2 rounded w-full"
//           />
//           <select
//             name="studyLevel"
//             value={programDetails.studyLevel}
//             onChange={handleChange(setProgramDetails)}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">Select Study Level</option>
//             <option value="Bachelor">Bachelor</option>
//             <option value="Master">Master</option>
//             <option value="PhD">PhD</option>
//           </select>
//           <input
//             type="text"
//             name="specialization"
//             placeholder="Specialization / Major"
//             value={programDetails.specialization}
//             onChange={handleChange(setProgramDetails)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       </Section>

//       {/* Academic Qualification */}
//       <Section title="Academic Qualification">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Qualification"
//             value={academic.qualification}
//             onChange={(e) =>
//               setAcademic({ ...academic, qualification: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Institution"
//             value={academic.institution}
//             onChange={(e) =>
//               setAcademic({ ...academic, institution: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Year"
//             value={academic.year}
//             onChange={(e) => setAcademic({ ...academic, year: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="CGPA / GPA"
//             value={academic.cgpa}
//             onChange={(e) => setAcademic({ ...academic, cgpa: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={() =>
//             handleAddListItem(academic, academicList, setAcademicList, () =>
//               setAcademic({
//                 qualification: "",
//                 institution: "",
//                 year: "",
//                 cgpa: "",
//               })
//             )
//           }
//           className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Add Academic
//         </button>
//         <ListDisplay
//           list={academicList}
//           remove={handleRemoveListItem}
//           listSetter={setAcademicList}
//         />
//       </Section>

//       {/* Test Scores */}
//       <Section title="Test Scores">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <select
//             value={test.testName}
//             onChange={(e) => setTest({ ...test, testName: e.target.value })}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">Select Test</option>
//             <option value="IELTS">IELTS</option>
//             <option value="TOEFL">TOEFL</option>
//             <option value="GRE">GRE</option>
//             <option value="GMAT">GMAT</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Score"
//             value={test.score}
//             onChange={(e) => setTest({ ...test, score: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Year"
//             value={test.year}
//             onChange={(e) => setTest({ ...test, year: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={() =>
//             handleAddListItem(test, testList, setTestList, () =>
//               setTest({ testName: "", score: "", year: "" })
//             )
//           }
//           className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Add Test Score
//         </button>
//         <ListDisplay
//           list={testList}
//           remove={handleRemoveListItem}
//           listSetter={setTestList}
//         />
//       </Section>

//       {/* Work Experience */}
//       <Section title="Work Experience">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Organization"
//             value={work.organization}
//             onChange={(e) => setWork({ ...work, organization: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Position"
//             value={work.position}
//             onChange={(e) => setWork({ ...work, position: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="date"
//             placeholder="Start Date"
//             value={work.start}
//             onChange={(e) => setWork({ ...work, start: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="date"
//             placeholder="End Date"
//             value={work.end}
//             onChange={(e) => setWork({ ...work, end: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <textarea
//             placeholder="Description"
//             value={work.description}
//             onChange={(e) => setWork({ ...work, description: e.target.value })}
//             className="border p-2 rounded w-full md:col-span-2"
//           />
//         </div>
//         <button
//           onClick={() =>
//             handleAddListItem(work, workList, setWorkList, () =>
//               setWork({
//                 organization: "",
//                 position: "",
//                 start: "",
//                 end: "",
//                 description: "",
//               })
//             )
//           }
//           className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Add Work
//         </button>
//         <ListDisplay
//           list={workList}
//           remove={handleRemoveListItem}
//           listSetter={setWorkList}
//         />
//       </Section>

//       {/* References */}
//       <Section title="References">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={reference.name}
//             onChange={(e) =>
//               setReference({ ...reference, name: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={reference.email}
//             onChange={(e) =>
//               setReference({ ...reference, email: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Relationship"
//             value={reference.relationship}
//             onChange={(e) =>
//               setReference({ ...reference, relationship: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="text"
//             placeholder="Phone (optional)"
//             value={reference.phone}
//             onChange={(e) =>
//               setReference({ ...reference, phone: e.target.value })
//             }
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={() =>
//             handleAddListItem(reference, referenceList, setReferenceList, () =>
//               setReference({ name: "", email: "", relationship: "", phone: "" })
//             )
//           }
//           className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Add Reference
//         </button>
//         <ListDisplay
//           list={referenceList}
//           remove={handleRemoveListItem}
//           listSetter={setReferenceList}
//         />
//       </Section>

//       {/* SOP */}
//       <Section title="Statement of Purpose">
//         <textarea
//           name="sop"
//           placeholder="Your Statement of Purpose"
//           value={sop}
//           onChange={handleChange(setSop)}
//           className="border p-2 rounded w-full min-h-[120px]"
//         />
//       </Section>

//       {/* Extracurricular */}
//       <Section title="Extracurricular / Achievements">
//         <textarea
//           name="extra"
//           placeholder="Awards, Leadership, Volunteering"
//           value={extra}
//           onChange={handleChange(setExtra)}
//           className="border p-2 rounded w-full min-h-[100px]"
//         />
//       </Section>

//       {/* Attachments */}
//         <Section title="Attachments">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {([
//               { key: "resume", label: "Upload Resume / CV" },
//               { key: "passportCopy", label: "Upload Passport Copy" },
//               { key: "transcripts", label: "Upload Academic Transcripts" },
//               { key: "testReport", label: "Upload English Test Report" },
//               { key: "photo", label: "Upload Photo" },
//             ] as const).map((item) => (
//               <div key={item.key} className="flex flex-col">
//                 <span className="text-sm mb-1 font-medium">{item.label}</span>
//                 <label className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700">
//                   {attachments[item.key as keyof typeof attachments]?.name || "Click to upload"}
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={(e) => handleAttachmentChange(e, item.key as keyof typeof attachments)}
//                   />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </Section>

//     </div>
//   );
// };

// export default StudentsProfile;

// // Helper components
// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
//   title,
//   children,
// }) => (
//   <div className="bg-white mt-8 rounded-lg shadow-sm border p-6">
//     <h2 className="text-xl font-semibold mb-4">{title}</h2>
//     {children}
//   </div>
// );

// const ListDisplay: React.FC<{
//   list: any[];
//   remove: (index: number, list: any, setter: any) => void;
//   listSetter: any;
// }> = ({ list, remove, listSetter }) => (
//   <div className="mt-4">
//     {list.length === 0 ? (
//       <p className="text-gray-500 text-sm">No records added yet.</p>
//     ) : (
//       <ul className="space-y-3">
//         {list.map((item, index) => (
//           <li
//             key={index}
//             className="border p-3 rounded-lg flex justify-between items-center"
//           >
//             <div>
//               {Object.entries(item).map(([key, val]) => (
//                 <p key={key} className="text-sm">
//                   {key}: {val}
//                 </p>
//               ))}
//             </div>
//             <button
//               onClick={() => remove(index, list, listSetter)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <Trash2 size={18} />
//             </button>
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>
// );

import React, { useState } from "react";
import { PlusCircle, Trash2, Download, Eye, Save } from "lucide-react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

const StudentsProfile: React.FC = () => {
  // Main profile data
  const [mainProfile, setMainProfile] = useState({
    name: "",
    email: "",
    destination: "",
    study_level: "",
    subject: "",
    nationality: "",
    elp: "",
    passport: "",
  });

  // Detailed profile data
  const [profileData, setProfileData] = useState({
    dob: "",
    address: "",
    phone: "",
    gender: "",
    passport_expiry: "",
    country_of_residence: "",
    program: "",
    intake: "",
    specialization: "",
    sop: "",
    achievements: "",
  });

  // Arrays for multiple entries
  const [academicList, setAcademicList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [referenceList, setReferenceList] = useState([]);

  // Current items for adding to lists
  const [currentAcademic, setCurrentAcademic] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: "",
  });

  const [currentTest, setCurrentTest] = useState({
    test_name: "",
    score: "",
    date: "",
  });

  const [currentWork, setCurrentWork] = useState({
    organization: "",
    position: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [currentReference, setCurrentReference] = useState({
    name: "",
    email: "",
    relationship: "",
    phone: "",
  });

  // Attachments
  const [attachments, setAttachments] = useState({});
  const [loading, setLoading] = useState(false);
  const [profilePercent, setProfilePercent] = useState(0);

  // Handlers
  const handleMainProfileChange = (e) => {
    const { name, value } = e.target;
    setMainProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAcademic = () => {
    const hasValues = Object.values(currentAcademic).some((val) => val !== "");
    if (hasValues) {
      setAcademicList([...academicList, currentAcademic]);
      setCurrentAcademic({ degree: "", institution: "", year: "", cgpa: "" });
    }
  };

  const handleAddTest = () => {
    const hasValues = Object.values(currentTest).some((val) => val !== "");
    if (hasValues) {
      setTestList([...testList, currentTest]);
      setCurrentTest({ test_name: "", score: "", date: "" });
    }
  };

  const handleAddWork = () => {
    const hasValues = Object.values(currentWork).some((val) => val !== "");
    if (hasValues) {
      setWorkList([...workList, currentWork]);
      setCurrentWork({
        organization: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    }
  };

  const handleAddReference = () => {
    const hasValues = Object.values(currentReference).some((val) => val !== "");
    if (hasValues) {
      setReferenceList([...referenceList, currentReference]);
      setCurrentReference({
        name: "",
        email: "",
        relationship: "",
        phone: "",
      });
    }
  };

  const handleRemoveAcademic = (index) => {
    const updated = [...academicList];
    updated.splice(index, 1);
    setAcademicList(updated);
  };

  const handleRemoveTest = (index) => {
    const updated = [...testList];
    updated.splice(index, 1);
    setTestList(updated);
  };

  const handleRemoveWork = (index) => {
    const updated = [...workList];
    updated.splice(index, 1);
    setWorkList(updated);
  };

  const handleRemoveReference = (index) => {
    const updated = [...referenceList];
    updated.splice(index, 1);
    setReferenceList(updated);
  };

  const handleAttachmentChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setAttachments({ ...attachments, [key]: e.target.files[0] });
    }
  };

  // Calculate Profile Completion
  const calculateProfileCompletion = () => {
    const fields = [
      ...Object.values(mainProfile),
      ...Object.values(profileData),
    ];

    const filledFields = fields.filter(
      (value) => value && value.toString().trim() !== ""
    ).length;

    const totalFields = fields.length;
    const percentage =
      totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    setProfilePercent(percentage);
  };

  // Handle Submit with POST method
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // Token check
  //     const authString = localStorage.getItem("auth");
  //     if (!authString) {
  //       Swal.fire("Error", "User not authenticated. Please login.", "error");
  //       return;
  //     }
  //     const auth = JSON.parse(authString);
  //     const token = auth?.token || auth?.access || auth?.access_token;
  //     if (!token) {
  //       Swal.fire("Error", "User not authenticated. Please login.", "error");
  //       return;
  //     }
  //     const formData = new FormData();

  //     // Main profile fields
  //     Object.entries(mainProfile).forEach(([key, value]) => {
  //       if (value) formData.append(key, value);
  //     });

  //     // Profile data fields
  //     Object.entries(profileData).forEach(([key, value]) => {
  //       if (value) formData.append(key, value);
  //     });

  //     // Array fields
  //     if (academicList.length)
  //       formData.append(
  //         "academic_qualifications",
  //         JSON.stringify(academicList)
  //       );
  //     if (testList.length)
  //       formData.append("test_scores", JSON.stringify(testList));
  //     if (workList.length)
  //       formData.append("work_experiences", JSON.stringify(workList));
  //     if (referenceList.length)
  //       formData.append("references", JSON.stringify(referenceList));

  //     // File uploads
  //     Object.entries(attachments).forEach(([key, file]) => {
  //       if (file) formData.append(key, file as File);
  //     });

  //     // POST API Call (using second code's endpoint)
  //     const response = await fetch(`${BASE_URL}/agent-student/register`, {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       Swal.fire("Success", "Profile submitted successfully!", "success");
  //       // Reset form
  //       setMainProfile({
  //         name: "",
  //         email: "",
  //         destination: "",
  //         study_level: "",
  //         subject: "",
  //         nationality: "",
  //         elp: "",
  //         passport: "",
  //       });
  //       setProfileData({
  //         dob: "",
  //         address: "",
  //         phone: "",
  //         gender: "",
  //         passport_expiry: "",
  //         country_of_residence: "",
  //         program: "",
  //         intake: "",
  //         specialization: "",
  //         sop: "",
  //         achievements: "",
  //       });
  //       setAcademicList([]);
  //       setTestList([]);
  //       setWorkList([]);
  //       setReferenceList([]);
  //       setAttachments({});
  //     } else {
  //       Swal.fire("Error", result.message || "Submission failed", "error");
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //     Swal.fire("Error", err.message || "Something went wrong", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1️⃣ Get token from localStorage
    const authString = localStorage.getItem("auth");
    if (!authString) {
      Swal.fire("Error", "User not authenticated. Please login.", "error");
      return;
    }
    const auth = JSON.parse(authString);
    const token = auth?.token || auth?.access || auth?.access_token;
    if (!token) {
      Swal.fire("Error", "User not authenticated. Please login.", "error");
      return;
    }

    // 2️⃣ Prepare FormData
    const formData = new FormData();

    // Main profile fields
    Object.entries(mainProfile).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // Profile data fields
    Object.entries(profileData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // Array fields
    if (academicList.length)
      formData.append("academic_qualifications", JSON.stringify(academicList));
    if (testList.length)
      formData.append("test_scores", JSON.stringify(testList));
    if (workList.length)
      formData.append("work_experiences", JSON.stringify(workList));
    if (referenceList.length)
      formData.append("references", JSON.stringify(referenceList));

    // File uploads
    Object.entries(attachments).forEach(([key, file]) => {
      if (file) formData.append(key, file as File);
    });

    // 3️⃣ POST request with Authorization header
    const response = await fetch(`${BASE_URL}/agent-student/register`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
      },
    });

    // 4️⃣ Safe JSON parsing
    let result: any;
    try {
      result = await response.json();
    } catch {
      const text = await response.text();
      console.error("Server returned non-JSON response:", text);
      throw new Error("Server returned invalid response");
    }

    // 5️⃣ Handle success or error
    if (response.ok && result.success) {
      Swal.fire("Success", "Profile submitted successfully!", "success");

      // Reset all form states
      setMainProfile({
        name: "",
        email: "",
        destination: "",
        study_level: "",
        subject: "",
        nationality: "",
        elp: "",
        passport: "",
      });
      setProfileData({
        dob: "",
        address: "",
        phone: "",
        gender: "",
        passport_expiry: "",
        country_of_residence: "",
        program: "",
        intake: "",
        specialization: "",
        sop: "",
        achievements: "",
      });
      setAcademicList([]);
      setTestList([]);
      setWorkList([]);
      setReferenceList([]);
      setAttachments({});
    } else {
      Swal.fire("Error", result?.message || "Submission failed", "error");
    }
  } catch (err: any) {
    console.error("Submission error:", err);
    Swal.fire("Error", err.message || "Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};


  // PDF Generate Function (simplified version)
  const generatePdf = async () => {
    try {
      setLoading(true);
      Swal.fire(
        "Info",
        "PDF generation feature will be implemented soon",
        "info"
      );
    } catch (error) {
      console.error("PDF generation error:", error);
      Swal.fire("Error", "Failed to generate PDF", "error");
    } finally {
      setLoading(false);
    }
  };

  // View file function
  const viewFile = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      Swal.fire("Info", "No file available to view.", "info");
      return;
    }
    window.open(fileUrl, "_blank");
  };

  // Recalculate completion when data changes
  React.useEffect(() => {
    calculateProfileCompletion();
  }, [
    mainProfile,
    profileData,
    academicList,
    testList,
    workList,
    referenceList,
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Student Registration
            </h2>
            <p className="text-blue-100 mb-4">
              Complete the profile to register new student
            </p>

            {/* Progress Section */}
            <div className="flex items-center gap-4">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${profilePercent}%` }}
                />
              </div>
              <span className="text-lg font-semibold min-w-[60px]">
                {profilePercent}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={generatePdf}
              disabled={loading}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Download size={18} />
              {loading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Section title="Basic Information" icon="👤">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mainProfile).map(([key, value]) => (
                  <InputField
                    key={key}
                    label={key.replace(/_/g, " ")}
                    name={key}
                    value={value}
                    onChange={handleMainProfileChange}
                    type={key === "email" ? "email" : "text"}
                    required={key === "name" || key === "email"}
                  />
                ))}
              </div>
            </Section>

            {/* Personal Information */}
            <Section title="Personal Details" icon="📝">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={profileData.dob}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileDataChange}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleProfileDataChange}
                  options={["", "Male", "Female", "Other"]}
                />
                <div className="md:col-span-2">
                  <TextAreaField
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileDataChange}
                    rows={3}
                  />
                </div>
              </div>
            </Section>

            {/* Passport Information */}
            <Section title="Passport & Identity" icon="🛂">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Passport Number"
                  name="passport"
                  value={mainProfile.passport}
                  onChange={handleMainProfileChange}
                />
                <InputField
                  label="Passport Expiry"
                  name="passport_expiry"
                  type="date"
                  value={profileData.passport_expiry}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Nationality"
                  name="nationality"
                  value={mainProfile.nationality}
                  onChange={handleMainProfileChange}
                />
                <InputField
                  label="Country of Residence"
                  name="country_of_residence"
                  value={profileData.country_of_residence}
                  onChange={handleProfileDataChange}
                />
              </div>
            </Section>

            {/* Program Details */}
            <Section title="Program Details" icon="🎓">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Desired Program"
                  name="program"
                  value={profileData.program}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Preferred Intake"
                  name="intake"
                  value={profileData.intake}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Study Level"
                  name="study_level"
                  value={mainProfile.study_level}
                  onChange={handleMainProfileChange}
                />
                <InputField
                  label="Specialization"
                  name="specialization"
                  value={profileData.specialization}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Destination Country"
                  name="destination"
                  value={mainProfile.destination}
                  onChange={handleMainProfileChange}
                />
                <InputField
                  label="English Proficiency (ELP)"
                  name="elp"
                  value={mainProfile.elp}
                  onChange={handleMainProfileChange}
                />
              </div>
            </Section>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
              <div className="space-y-3">
                <StatItem label="Basic Info" value={70} />
                <StatItem label="Academic" value={academicList.length * 25} />
                <StatItem label="Documents" value={40} />
                <StatItem label="Overall" value={profilePercent} />
              </div>
            </div>

            {/* SOP & Achievements */}
            <Section title="Statement of Purpose" icon="📄">
              <TextAreaField
                name="sop"
                value={profileData.sop}
                onChange={handleProfileDataChange}
                placeholder="Describe your academic goals and motivations..."
                rows={6}
              />
            </Section>

            <Section title="Achievements" icon="🏆">
              <TextAreaField
                name="achievements"
                value={profileData.achievements}
                onChange={handleProfileDataChange}
                placeholder="List your awards, extracurricular activities, volunteering..."
                rows={4}
              />
            </Section>
          </div>
        </div>

        {/* Dynamic Lists Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Qualifications */}
          <Section title="Academic Qualifications" icon="📚">
            <DynamicList
              fields={[
                { name: "degree", label: "Degree", type: "text" },
                { name: "institution", label: "Institution", type: "text" },
                { name: "year", label: "Year", type: "text" },
                { name: "cgpa", label: "CGPA", type: "text" },
              ]}
              currentItem={currentAcademic}
              setCurrentItem={setCurrentAcademic}
              list={academicList}
              onAdd={handleAddAcademic}
              onRemove={handleRemoveAcademic}
            />
          </Section>

          {/* Test Scores */}
          <Section title="Test Scores" icon="📊">
            <DynamicList
              fields={[
                {
                  name: "test_name",
                  label: "Test Name",
                  type: "select",
                  options: ["", "IELTS", "TOEFL", "GRE", "GMAT", "SAT", "ACT"],
                },
                { name: "score", label: "Score", type: "text" },
                { name: "date", label: "Date", type: "date" },
              ]}
              currentItem={currentTest}
              setCurrentItem={setCurrentTest}
              list={testList}
              onAdd={handleAddTest}
              onRemove={handleRemoveTest}
            />
          </Section>

          {/* Work Experience */}
          <Section title="Work Experience" icon="💼">
            <DynamicList
              fields={[
                { name: "organization", label: "Organization", type: "text" },
                { name: "position", label: "Position", type: "text" },
                { name: "start_date", label: "Start Date", type: "date" },
                { name: "end_date", label: "End Date", type: "date" },
                { name: "description", label: "Description", type: "textarea" },
              ]}
              currentItem={currentWork}
              setCurrentItem={setCurrentWork}
              list={workList}
              onAdd={handleAddWork}
              onRemove={handleRemoveWork}
            />
          </Section>

          {/* References */}
          <Section title="References" icon="👥">
            <DynamicList
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "relationship", label: "Relationship", type: "text" },
                { name: "phone", label: "Phone", type: "text" },
              ]}
              currentItem={currentReference}
              setCurrentItem={setCurrentReference}
              list={referenceList}
              onAdd={handleAddReference}
              onRemove={handleRemoveReference}
            />
          </Section>
        </div>

        {/* Document Attachments */}
        <Section title="Document Attachments" icon="📎">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: "resume", label: "Resume/CV", icon: "📄" },
              { key: "passport_copy", label: "Passport Copy", icon: "🛂" },
              { key: "transcripts", label: "Transcripts", icon: "📑" },
              {
                key: "english_test",
                label: "English Test Results",
                icon: "📊",
              },
              { key: "photo", label: "Photo", icon: "📷" },
            ].map((item) => (
              <FileUploadField
                key={item.key}
                label={item.label}
                icon={item.icon}
                onChange={(e) => handleAttachmentChange(e, item.key)}
                fileName={attachments[item.key]?.name}
              />
            ))}
          </div>
        </Section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 p-6 bg-white rounded-xl shadow-sm">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={20} />
            {loading ? "Submitting..." : "Register Student"}
          </button>

          <button
            type="button"
            onClick={generatePdf}
            disabled={loading}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper Components (same as first code)
const Section: React.FC<{
  title: string;
  icon?: string;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h2>
    {children}
  </div>
);

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 capitalize">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      required={required}
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: string[];
}> = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option || `Select ${label}`}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField: React.FC<{
  label?: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-sm font-medium mb-2 text-gray-700">{label}</label>
    )}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

const FileUploadField: React.FC<{
  label: string;
  icon: string;
  onChange: (e: any) => void;
  fileName?: string;
}> = ({ label, icon, onChange, fileName }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
      <span>{icon}</span>
      {label}
    </label>
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <span className="text-gray-600 text-sm text-center">
        {fileName || `Click to upload ${label}`}
      </span>
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  </div>
);

const StatItem: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-semibold">{value}%</span>
  </div>
);

const DynamicList: React.FC<{
  fields: any[];
  currentItem: any;
  setCurrentItem: (item: any) => void;
  list: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}> = ({ fields, currentItem, setCurrentItem, list, onAdd, onRemove }) => (
  <div>
    <div
      className={`grid grid-cols-1 ${
        fields.length > 2 ? "md:grid-cols-2" : ""
      } gap-4 mb-4`}
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.type === "textarea" ? "md:col-span-2" : ""}
        >
          {field.type === "select" ? (
            <SelectField
              label={field.label}
              name={field.name}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
              options={field.options}
            />
          ) : field.type === "textarea" ? (
            <TextAreaField
              label={field.label}
              name={field.name}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
              placeholder={`Enter ${field.label.toLowerCase()}`}
              rows={3}
            />
          ) : (
            <InputField
              label={field.label}
              name={field.name}
              type={field.type}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
            />
          )}
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={onAdd}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors mb-4"
    >
      <PlusCircle size={18} />
      Add Item
    </button>

    <ListDisplay list={list} onRemove={onRemove} />
  </div>
);

const ListDisplay: React.FC<{
  list: any[];
  onRemove: (index: number) => void;
}> = ({ list, onRemove }) => (
  <div className="mt-4">
    {list.length === 0 ? (
      <p className="text-gray-500 text-sm italic text-center py-4">
        No items added yet
      </p>
    ) : (
      <div className="space-y-3">
        {list.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              {Object.entries(item).map(
                ([key, val]) =>
                  val &&
                  val !== "" && (
                    <p key={key} className="text-sm text-gray-700 mb-1">
                      <span className="font-medium capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      {val}
                    </p>
                  )
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 ml-4 transition-colors"
              title="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default StudentsProfile;
