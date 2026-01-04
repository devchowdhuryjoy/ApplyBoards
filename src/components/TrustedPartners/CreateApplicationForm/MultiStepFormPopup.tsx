import React, { useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from 'sweetalert2';

const MultiStepFormPopup = ({ open, setOpen, programData }) => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);

  const defaultProgramId = programData?.program_id || "";

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
      const auth = localStorage.getItem("auth");
      if (auth) {
        const authData = JSON.parse(auth);
        if (authData.token) {
          headers.append("Authorization", `Bearer ${authData.token}`);
        }
      }

      // UniversityApply
      let programIdToUse = defaultProgramId || "";

      const url = `${BASE_URL}/agent/student/info/${studentId}/${programIdToUse}`;
      console.log("Fetching student info:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error Response:", errorText);

        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.error || `Failed to fetch: ${res.status}`);
        } catch (e) {
          throw new Error(errorText || `Failed to fetch: ${res.status}`);
        }
      }

      const result = await res.json();
      console.log("API Success Response:", result);

      setStudentData(result);
    } catch (err) {
      console.error("API Error:", err);

      if (process.env.NODE_ENV === "development") {
        console.log("Showing dummy data for development");
        setStudentData({
          student_name: "",
          student_id: parseInt(studentId) || "",
          agent_name: "",
          agent_id: "",
          program_id: defaultProgramId || "",
          program_name: programData?.program_name || "",
          university_name: programData?.university_name || "",
          intake: programData?.intake_name || "",
          is_dummy: true,
        });
      } else {
        setError(err.message || "Failed to fetch student information");
      }
    } finally {
      setLoading(false);
    }
  };



  const applyApplication = async () => {
  if (!studentData) return;

  try {
    setLoading(true);
    setError("");

    const auth = localStorage.getItem("auth");
    let token = "";

    if (auth) {
      const authData = JSON.parse(auth);
      token = authData.token;
    }

    const payload = {
      student_name: studentData.student_name,
      student_id: parseInt(studentData.student_id),
      agent_name: studentData.agent_name,
      agent_id: studentData.agent_id.toString(),
      program_id: programData?.program_id || studentData.program_id,
      program_name: programData?.program_name || studentData.program_name,
      university_name: programData?.university_name || studentData.university_name,
      intake: programData?.intake_name || studentData.intake,
    };

    console.log("Submitting application payload:", payload);

    const res = await fetch(`${BASE_URL}/agent/my-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("Application response:", result);

    if (!res.ok || result.success === false) {
      // SweetAlert for error
      await Swal.fire({
        icon: 'error',
        title: 'Application Failed',
        text: result.message || 'Application submission failed. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc3545',
      });
      throw new Error(result.message || "Application failed");
    }

    // SweetAlert for success
    await Swal.fire({
      icon: 'success',
      title: 'Application Submitted Successfully!',
      html: `
        <div style="text-align: left;">
          <p><strong>Student:</strong> ${payload.student_name}</p>
          <p><strong>Program:</strong> ${payload.program_name}</p>
          <p><strong>University:</strong> ${payload.university_name}</p>
          <p><strong>Intake:</strong> ${payload.intake}</p>
          <p><strong>Application ID:</strong> ${result.data?.id || 'N/A'}</p>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#28a745',
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true,
    });

    closePopup();
  } catch (err) {
    setError(err.message || "Failed to submit application");
    console.error("Application Error:", err);
    
    // SweetAlert for catch error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message || 'Failed to submit application',
      confirmButtonText: 'OK',
      confirmButtonColor: '#dc3545',
    });
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
      <div className="bg-white w-full max-w-3xl rounded-2xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 z-10"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center py-6 text-primary">
          {programData
            ? `Apply for ${programData.program_name}`
            : "Student & Program Info"}
        </h2>

        {/* Selected Program Info */}
        {programData && (
          <div className="mx-6 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">
              Selected Program:
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">University:</span>{" "}
                {programData.university_name}
              </div>
              <div>
                <span className="font-medium">Program:</span>{" "}
                {programData.program_name}
              </div>
              <div>
                <span className="font-medium">Location:</span>{" "}
                {programData.location}
              </div>
              <div>
                <span className="font-medium">Intake:</span>{" "}
                {programData.intake_name || "N/A"}
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {/* Inputs */}
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
              <p className="text-xs text-gray-500 mt-1">
                Enter student ID to fetch their information
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
                <strong>Error:</strong> {error}
                {studentData?.is_dummy && (
                  <p className="text-xs mt-1 text-red-500">
                    ⚠️ Showing dummy data for development
                  </p>
                )}
              </div>
            )}

            <button
              onClick={fetchStudentInfo}
              disabled={loading || !studentId.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Fetching...
                </span>
              ) : (
                "Fetch Student Info →"
              )}
            </button>
          </div>

          {/* Display Student Data */}
          {studentData && (
            <div className="mt-6 space-y-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Student Details
              </h3>

              <div className="space-y-3">
                <InputField
                  label="Student Name"
                  value={studentData.student_name}
                />
                <InputField label="Student ID" value={studentData.student_id} />
                <InputField label="Agent Name" value={studentData.agent_name} />
                <InputField label="Agent ID" value={studentData.agent_id} />
                <InputField
                  label="Program Name"
                  value={programData?.program_name || studentData.program_name}
                  note={programData ? "(From selected program)" : ""}
                />
                <InputField
                  label="University"
                  value={
                    programData?.university_name || studentData.university_name
                  }
                  note={programData ? "(From selected program)" : ""}
                />
                <InputField
                  label="Intake"
                  value={programData?.intake_name || studentData.intake}
                />
                <InputField
                  label="Program ID"
                  value={programData?.program_id || studentData.program_id}
                />
              </div>

              {studentData.default_program && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                  ⚠️ Using default program. The student may have other available
                  programs.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Apply Button at Bottom */}
        {studentData && (
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 text-center">
                Ready to submit application for:{" "}
                <strong>
                  {programData?.program_name || studentData.program_name}
                </strong>
              </p>
              <button
                onClick={applyApplication}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting Application...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Click to create and submit the application
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, note }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div>
      <span className="font-medium text-gray-700">{label}</span>
      {note && <span className="text-xs text-gray-500 ml-2">{note}</span>}
    </div>
    <span className="text-gray-900 font-medium">{value || "N/A"}</span>
  </div>
);

export default MultiStepFormPopup;
