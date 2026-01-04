
// import React, { useState } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl"; 

// const MultiStepFormPopup = ({ open, setOpen }) => {
//   const [studentId, setStudentId] = useState(""); // input for student id
//   const [programId, setProgramId] = useState(""); // input for program id (dynamic)
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [studentData, setStudentData] = useState(null); // fetched API data

//   // ---------------- FETCH STUDENT + PROGRAM INFO ----------------
//   const fetchStudentInfo = async () => {
//     if (!studentId.trim()) {
//       setError("Please enter Student ID");
//       return;
//     }

//     // যদি আপনি প্রোগ্রাম আইডি ডাইনামিক রাখতে চান
//     const dynamicProgramId = programId || "8"; // ডিফল্ট 8, অথবা ইনপুট থেকে নিন

//     try {
//       setLoading(true);
//       setError("");
//       setStudentData(null);

//       const headers = new Headers();
      
//       // টোকেন localStorage থেকে নিন
//       const auth = localStorage.getItem("auth");
//       if (auth) {
//         try {
//           const authData = JSON.parse(auth);
//           if (authData.token) {
//             headers.append("Authorization", `Bearer ${authData.token}`);
//           }
//         } catch (e) {
//           console.error("Error parsing auth data:", e);
//         }
//       }

//       // CORRECT API URL - BASE_URL ইতিমধ্যেই /api কনটেইন করে
//       const url = `${BASE_URL}/agent/student/info/${studentId}/${dynamicProgramId}`;
//       console.log("📡 Calling API:", url);

//       const res = await fetch(url, { method: "GET", headers });
      
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("❌ API Error Response:", errorText);
//         throw new Error(`HTTP ${res.status}: Failed to fetch student info`);
//       }

//       const result = await res.json();
//       console.log("📦 API response:", result);

//       if (result.error) {
//         throw new Error(result.error);
//       }

//       setStudentData(result); // save API response to state
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       setError(err.message || "Failed to fetch student information");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closePopup = () => {
//     setStudentId("");
//     setProgramId("");
//     setError("");
//     setStudentData(null);
//     setOpen(false);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">

//         {/* Close Button */}
//         <button
//           onClick={closePopup}
//           className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-6 text-primary">
//           Student & Program Info
//         </h2>

//         {/* Input Fields */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Student ID
//             </label>
//             <input
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               placeholder="Enter Student ID"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Program ID (Optional)
//             </label>
//             <input
//               value={programId}
//               onChange={(e) => setProgramId(e.target.value)}
//               placeholder="Enter Program ID (default: 8)"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Leave empty to use default program ID 8
//             </p>
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           <button
//             onClick={fetchStudentInfo}
//             className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || !studentId.trim()}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Fetching...
//               </span>
//             ) : (
//               "Fetch Info →"
//             )}
//           </button>
//         </div>

//         {/* Display fetched data */}
//         {studentData && (
//           <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto p-4 border border-gray-200 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Student & Program Details
//             </h3>

//             <InputField label="Student Name" value={studentData.student_name} />
//             <InputField label="Student ID" value={studentData.student_id} />
//             <InputField label="Agent Name" value={studentData.agent_name} />
//             <InputField label="Agent ID" value={studentData.agent_id} />
//             <InputField label="Program Name" value={studentData.program_name} />
//             <InputField label="University Name" value={studentData.university_name} />
//             <InputField label="Intake" value={studentData.intake} />
//             <InputField label="Program ID" value={studentData.program_id} />

//             <button
//               onClick={() => {
//                 console.log("Apply Now clicked", studentData);
//                 // এখানে অ্যাপ্লিকেশন লজিক যোগ করুন
//                 alert(`Applying for program: ${studentData.program_name}`);
//                 closePopup();
//               }}
//               className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
//             >
//               Apply Now
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ---------------- HELPER COMPONENT ----------------
// const InputField = ({ label, value }) => (
//   <div className="flex items-center gap-4 py-2 border-b border-gray-100">
//     <label className="w-1/3 font-medium text-gray-600">{label}:</label>
//     <input
//       type="text"
//       value={value || "N/A"}
//       readOnly
//       className="flex-1 border border-gray-300 px-3 py-2 rounded-lg bg-gray-50"
//     />
//   </div>
// );

// export default MultiStepFormPopup;



import React, { useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const MultiStepFormPopup = ({ open, setOpen }) => {
  const [studentId, setStudentId] = useState("");
  const [programId, setProgramId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);

  // ---------------- CLOSE POPUP ----------------
  const closePopup = () => {
    setStudentId("");
    setProgramId("");
    setError("");
    setStudentData(null);
    setOpen(false);
  };

  // ---------------- FETCH STUDENT INFO ----------------
  const fetchStudentInfo = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    const dynamicProgramId = programId || "8";

    try {
      setLoading(true);
      setError("");
      setStudentData(null);

      const headers = new Headers();
      const auth = localStorage.getItem("auth");

      if (auth) {
        const authData = JSON.parse(auth);
        if (authData.token) {
          headers.append("Authorization", `Bearer ${authData.token}`);
        }
      }

      const res = await fetch(
        `${BASE_URL}/agent/student/info/${studentId}/${dynamicProgramId}`,
        { method: "GET", headers }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch student info");
      }

      const result = await res.json();
      setStudentData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- APPLY NOW (POST API) ----------------
  const applyNow = async () => {
    try {
      setSubmitting(true);

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const auth = localStorage.getItem("auth");
      if (auth) {
        const authData = JSON.parse(auth);
        if (authData.token) {
          headers.append("Authorization", `Bearer ${authData.token}`);
        }
      }

      const body = JSON.stringify({
        student_name: studentData.student_name,
        student_id: studentData.student_id,
        agent_name: studentData.agent_name,
        agent_id: studentData.agent_id,
        program_id: studentData.program_id,
        program_name: studentData.program_name,
        university_name: studentData.university_name,
        intake: studentData.intake,
      });

      const res = await fetch(`${BASE_URL}/agent/my-applications`, {
        method: "POST",
        headers,
        body,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Application failed");
      }

      alert("✅ Application submitted successfully");
      closePopup();
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl relative flex flex-col max-h-[90vh]">

        {/* CLOSE ICON */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center text-primary">
            Student & Program Info
          </h2>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* INPUTS */}
          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="Enter Student ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Program ID (Optional)
            </label>
            <input
              value={programId}
              onChange={(e) => setProgramId(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="Default: 8"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={fetchStudentInfo}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Fetch Info"}
          </button>

          {/* STUDENT DATA */}
          {studentData && (
            <div className="border rounded-lg p-4 space-y-3">
              <InputField label="Student Name" value={studentData.student_name} />
              <InputField label="Student ID" value={studentData.student_id} />
              <InputField label="Agent Name" value={studentData.agent_name} />
              <InputField label="Agent ID" value={studentData.agent_id} />
              <InputField label="Program Name" value={studentData.program_name} />
              <InputField label="University" value={studentData.university_name} />
              <InputField label="Intake" value={studentData.intake} />
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        {studentData && (
          <div className="p-6 border-t space-y-3">
            <button
              onClick={applyNow}
              disabled={submitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Apply Now"}
            </button>

            <button
              onClick={closePopup}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------- INPUT FIELD ----------------
const InputField = ({ label, value }) => (
  <div className="flex items-center gap-4">
    <span className="w-1/3 text-sm font-medium text-gray-600">
      {label}:
    </span>
    <input
      readOnly
      value={value || "N/A"}
      className="flex-1 border px-3 py-2 rounded bg-gray-50"
    />
  </div>
);

export default MultiStepFormPopup;

