
import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../ApiBaseUrl/ApiBaseUrl'; 

const AllAgentStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Parse JSON string fields
  const parseJSONField = (field) => {
    try {
      return field ? JSON.parse(field) : [];
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return [];
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch agent students data
  const fetchAgentStudents = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer 18|UrhWE5H2CLBArlxmJooKyLw2dDoPGBgTUQ2bXQ8P0e311f19");

      const response = await fetch(`${BASE_URL}/agent/agentByreg`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setStudents(result.students || []);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle view details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    fetchAgentStudents();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading student data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={fetchAgentStudents}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
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
                  students.map((student) => {
                    const academicQualifications = parseJSONField(student.academic_qualifications);
                    const testScores = parseJSONField(student.test_scores);
                    const workExperiences = parseJSONField(student.work_experiences);
                    const references = parseJSONField(student.references);

                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {student.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.gender}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${student.email}`}
                            className="text-sm text-blue-600 hover:text-blue-900 hover:underline"
                          >
                            {student.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.destination}</div>
                          <div className="text-sm text-gray-500">{student.study_level}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{student.program}</div>
                          <div className="text-sm text-gray-500">{student.specialization}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(student.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(student)}
                            className="text-blue-600 hover:text-blue-900 hover:underline mr-4"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Details Modal */}
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
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <DetailItem label="Full Name" value={selectedStudent.name} />
                      <DetailItem label="Email" value={selectedStudent.email} />
                      <DetailItem label="Phone" value={selectedStudent.phone} />
                      <DetailItem label="Date of Birth" value={formatDate(selectedStudent.dob)} />
                      <DetailItem label="Gender" value={selectedStudent.gender} />
                      <DetailItem label="Nationality" value={selectedStudent.nationality} />
                      <DetailItem label="Passport Number" value={selectedStudent.passport} />
                      <DetailItem label="Passport Expiry" value={formatDate(selectedStudent.passport_expiry)} />
                    </div>
                  </div>

                  {/* Study Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Study Information</h3>
                    <div className="space-y-3">
                      <DetailItem label="Destination" value={selectedStudent.destination} />
                      <DetailItem label="Study Level" value={selectedStudent.study_level} />
                      <DetailItem label="Subject" value={selectedStudent.subject} />
                      <DetailItem label="Program" value={selectedStudent.program} />
                      <DetailItem label="Specialization" value={selectedStudent.specialization} />
                      <DetailItem label="Intake" value={selectedStudent.intake} />
                      <DetailItem label="English Level" value={selectedStudent.elp} />
                      <DetailItem label="Country of Residence" value={selectedStudent.country_of_residence} />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Address</h3>
                    <p className="text-gray-700">{selectedStudent.address || 'N/A'}</p>
                  </div>

                  {/* Academic Qualifications */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Academic Qualifications</h3>
                    {parseJSONField(selectedStudent.academic_qualifications).length > 0 ? (
                      parseJSONField(selectedStudent.academic_qualifications).map((qual, index) => (
                        <div key={index} className="mb-3 pb-3 border-b last:border-b-0">
                          <DetailItem label="Degree" value={qual.degree} />
                          <DetailItem label="Institution" value={qual.institution} />
                          <DetailItem label="Year" value={qual.year} />
                          <DetailItem label="CGPA" value={qual.cgpa} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No academic qualifications provided</p>
                    )}
                  </div>

                  {/* Test Scores */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Test Scores</h3>
                    {parseJSONField(selectedStudent.test_scores).length > 0 ? (
                      parseJSONField(selectedStudent.test_scores).map((test, index) => (
                        <div key={index} className="mb-3">
                          <DetailItem label="Test" value={test.test_name} />
                          <DetailItem label="Score" value={test.score} />
                          <DetailItem label="Date" value={formatDate(test.date)} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No test scores provided</p>
                    )}
                  </div>

                  {/* Work Experience */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Work Experience</h3>
                    {parseJSONField(selectedStudent.work_experiences).length > 0 ? (
                      parseJSONField(selectedStudent.work_experiences).map((work, index) => (
                        <div key={index} className="mb-3 pb-3 border-b last:border-b-0">
                          <DetailItem label="Organization" value={work.organization} />
                          <DetailItem label="Position" value={work.position} />
                          <DetailItem label="Start Date" value={formatDate(work.start_date)} />
                          <DetailItem label="End Date" value={formatDate(work.end_date)} />
                          <DetailItem label="Description" value={work.description} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No work experience provided</p>
                    )}
                  </div>

                  {/* References */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">References</h3>
                    {parseJSONField(selectedStudent.references).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {parseJSONField(selectedStudent.references).map((ref, index) => (
                          <div key={index} className="bg-white p-3 rounded border">
                            <DetailItem label="Name" value={ref.name} />
                            <DetailItem label="Email" value={ref.email} />
                            <DetailItem label="Relationship" value={ref.relationship} />
                            <DetailItem label="Phone" value={ref.phone} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No references provided</p>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Additional Information</h3>
                    <DetailItem label="Statement of Purpose" value={selectedStudent.sop} />
                    <DetailItem label="Achievements" value={selectedStudent.achievements} />
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.resume && (
                          <a
                            href={`${BASE_URL}/${selectedStudent.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                          >
                            Resume
                          </a>
                        )}
                        {selectedStudent.passport_copy && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
                            Passport Copy
                          </span>
                        )}
                        {selectedStudent.transcripts && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded">
                            Transcripts
                          </span>
                        )}
                        {selectedStudent.english_test && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
                            English Test
                          </span>
                        )}
                        {selectedStudent.photo && (
                          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded">
                            Photo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
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

// Helper component for detail items
const DetailItem = ({ label, value }) => (
  <div className="flex">
    <span className="font-medium text-gray-600 w-1/3">{label}:</span>
    <span className="text-gray-800 flex-1">{value || 'N/A'}</span>
  </div>
);

export default AllAgentStudentData;
