import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

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
   DetailItem Component
======================= */
const DetailItem = ({ label, value }) => (
  <div className="flex">
    <span className="font-medium text-gray-600 w-1/3">{label}:</span>
    <span className="text-gray-800 flex-1">{value || "N/A"}</span>
  </div>
);

/* =======================
   Main Component
======================= */
const AllAgentStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const parseJSONField = (field) => {
    try {
      return field ? JSON.parse(field) : [];
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return [];
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchAgentStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      if (!token) throw new Error("Unauthorized: Token not found");

      const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) setStudents(result.students || []);
      else setStudents([]);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message || "Failed to load student data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStudents();
  }, []);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h3 className="text-red-800 font-semibold text-lg">Error Loading Data</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={fetchAgentStudents}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Students</h1>
          <p className="text-gray-600 mt-2">
            Total Students: <span className="font-semibold">{students.length}</span>
          </p>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">{student.destination}</td>
                      <td className="px-6 py-4">{student.program}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(student.created_at)}</td>
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

        {/* ===========================
            Modal
        =========================== */}
        {showDetailsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Student Details - {selectedStudent.name}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                  <DetailItem label="Name" value={selectedStudent.name} />
                  <DetailItem label="Email" value={selectedStudent.email} />
                  <DetailItem label="Phone" value={selectedStudent.phone} />
                  <DetailItem label="Gender" value={selectedStudent.gender} />
                  <DetailItem label="DOB" value={formatDate(selectedStudent.dob)} />
                  <DetailItem label="Nationality" value={selectedStudent.nationality} />
                </div>

                {/* Academic Qualifications */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Academic Qualifications</h3>
                  {parseJSONField(selectedStudent.academic_qualifications).length > 0 ? (
                    parseJSONField(selectedStudent.academic_qualifications).map((q, i) => (
                      <div key={i} className="mb-3 border-b pb-2">
                        <DetailItem label="Degree" value={q.degree} />
                        <DetailItem label="Institution" value={q.institution} />
                        <DetailItem label="Year" value={q.year} />
                        <DetailItem label="CGPA" value={q.cgpa} />
                      </div>
                    ))
                  ) : <p className="italic text-gray-500">No academic qualifications provided</p>}
                </div>

                {/* Test Scores */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Test Scores</h3>
                  {parseJSONField(selectedStudent.test_scores).length > 0 ? (
                    parseJSONField(selectedStudent.test_scores).map((t, i) => (
                      <div key={i} className="mb-2">
                        <DetailItem label="Test" value={t.test_name} />
                        <DetailItem label="Score" value={t.score} />
                        <DetailItem label="Date" value={formatDate(t.date)} />
                      </div>
                    ))
                  ) : <p className="italic text-gray-500">No test scores provided</p>}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Close
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
