import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from 'sweetalert2';

interface ProgramData {
  program_id: string;
  program_name: string;
  university_name: string;
  location: string;
  intake_name: string;
  intake_months?: Array<{ month: string }>;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  student_id?: string;
  user_type?: string;
}

interface StudentProgramApplyProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  programData: ProgramData;
}

const StudentProgramApply: React.FC<StudentProgramApplyProps> = ({ open, setOpen, programData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    if (open) {
      loadUserData();
    }
  }, [open]);

  const loadUserData = () => {
    try {
      const authRaw = localStorage.getItem("auth");
      
      if (authRaw) {
        const auth = JSON.parse(authRaw);
        console.log("Auth data from localStorage:", auth);
        
        if (auth.user) {
          setUserData(auth.user);
          
          // Create student data object from localStorage
          const studentInfo = {
            student_name: auth.user.name || "",
            student_id: auth.user.student_id || auth.user.id || "",
            email: auth.user.email || "",
            user_type: auth.user.user_type || ""
          };
          
          setStudentData(studentInfo);
          setError("");
        } else {
          setError("User data not found in localStorage");
        }
      } else {
        setError("Authentication data not found in localStorage");
      }
    } catch (err) {
      console.error("Error loading user data:", err);
      setError("Failed to load user data from localStorage");
    }
  };

  const applyApplication = async () => {
    if (!studentData) {
      setError("Student data not available");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Get token from localStorage
      const authRaw = localStorage.getItem("auth");
      let token = "";

      if (authRaw) {
        try {
          const auth = JSON.parse(authRaw);
          token = auth.token || "";
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Prepare payload -
      const payload = {
        student_name: studentData.student_name,
        student_id: parseInt(studentData.student_id.toString()),
        program_id: programData.program_id,
        program_name: programData.program_name,
        university_name: programData.university_name,
        intake: programData.intake_name,
      };

      console.log("Submitting application payload:", payload);
      console.log("API Endpoint:", `${BASE_URL}/student/applications`);

      // API call
      const res = await fetch(`${BASE_URL}/student/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Application response:", result);

      if (!res.ok) {
        await Swal.fire({
          icon: 'error',
          title: 'Application Failed',
          text: result.message || result.error || `Application submission failed (Status: ${res.status})`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc3545',
        });
        throw new Error(result.message || result.error || "Application failed");
      }

      // Success message
      await Swal.fire({
        icon: 'success',
        title: 'Application Submitted Successfully!',
        confirmButtonText: 'Close',
        confirmButtonColor: '#f16f22',
        showCloseButton: true,
        timer: 5000,
        timerProgressBar: true,
      });

      closePopup();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application";
      setError(errorMessage);
      console.error("Application Error:", err);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setError("");
    setUserData(null);
    setStudentData(null);
    setOpen(false);
  };

  const refreshData = () => {
    loadUserData();
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
          Apply for {programData.program_name}
        </h2>

        {/* Selected Program Info */}
        <div className="mx-6 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">
            Selected Program Details:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
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
            <div className="md:col-span-2">
              <span className="font-medium">Program ID:</span>{" "}
              {programData.program_id || "N/A"}
            </div>
          </div>
          {programData.intake_months && programData.intake_months.length > 0 && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Intake Months:</span>{" "}
              {programData.intake_months.map((intake) => intake.month).join(", ")}
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200">
              <div className="flex justify-between items-center">
                <strong>Error:</strong> {error}
                <button
                  onClick={refreshData}
                  className="ml-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* User/Student Information from localStorage */}
          {studentData ? (
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Student Information
                </h3>
              </div>

              <div className="space-y-3">
                <InfoField
                  label="Student Name"
                  value={studentData.student_name}
                />
                <InfoField label="Student ID" value={studentData.student_id} />
                <InfoField label="Email" value={studentData.email} />
                {studentData.user_type && (
                  <InfoField label="User Type" value={studentData.user_type} />
                )}
                
                {/* Program Information */}
                <div className="pt-3 border-t">
                  <h4 className="font-semibold text-gray-700 mb-2">Program Information:</h4>
                  <InfoField
                    label="Program Name"
                    value={programData.program_name}
                  />
                  <InfoField
                    label="University"
                    value={programData.university_name}
                  />
                  <InfoField
                    label="Location"
                    value={programData.location}
                  />
                  <InfoField
                    label="Intake"
                    value={programData.intake_name}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading user data from localStorage...</p>
            </div>
          )}
        </div>

        {/* Fixed Apply Button at Bottom */}
        {studentData && (
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="space-y-2">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Ready to submit application:
                </p>
                <p className="font-bold text-gray-800">
                  {studentData.student_name} (ID: {studentData.student_id})
                </p>
                <p className="text-sm text-gray-600">
                  Program: {programData.program_name}
                </p>
              </div>
              <button
                onClick={applyApplication}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 font-medium disabled:opacity-50"
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
                Click to submit application with all information
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b">
    <div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <span className="text-gray-900 font-medium">{value || "N/A"}</span>
  </div>
);

export default StudentProgramApply;