
import React, { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const MultiStepFormPopup = ({ open, setOpen }) => {
  const [studentId, setStudentId] = useState(""); // input for student id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null); // fetched API data

  // ---------------- FETCH STUDENT + PROGRAM INFO ----------------
  const fetchStudentInfo = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStudentData(null);

      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer 18|UrhWE5H2CLBArlxmJooKyLw2dDoPGBgTUQ2bXQ8P0e311f19"
      );

      // dynamic API call using studentId
      const url = `${BASE_URL}/api/agent/student/info/${studentId}/8`; // 
      console.log("📡 Calling API:", url);

      const res = await fetch(url, { method: "GET", headers });
      const result = await res.json();

      console.log("📦 API response:", result);

      if (!res.ok) {
        throw new Error(result.error || "Failed to fetch student info");
      }

      setStudentData(result); // save API response to state
    } catch (err) {
      console.error("❌ API Error:", err);
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-xl text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Student & Program Info
        </h2>

        {/* Input Field */}
        <div className="space-y-4">
          <input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
          )}

          <button
            onClick={fetchStudentInfo}
            className="w-full bg-primary text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Info →"}
          </button>
        </div>

        {/* Display fetched data */}
        {studentData && (
          <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto">

            <InputField label="Student Name" value={studentData.student_name} />
            <InputField label="Student ID" value={studentData.student_id} />
            <InputField label="Agent Name" value={studentData.agent_name} />
            <InputField label="Agent ID" value={studentData.agent_id} />
            <InputField label="Program Name" value={studentData.program_name} />
            <InputField label="University Name" value={studentData.university_name} />
            <InputField label="Intake" value={studentData.intake} />

            <button
              onClick={() => console.log("Apply Now clicked", studentData)}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------- HELPER COMPONENT ----------------
const InputField = ({ label, value }) => (
  <div className="flex items-center gap-4">
    <label className="w-1/3 font-medium text-gray-600">{label}:</label>
    <input
      type="text"
      value={value || ""}
      readOnly
      className="flex-1 border px-3 py-2 rounded-lg bg-gray-100"
    />
  </div>
);

export default MultiStepFormPopup;
