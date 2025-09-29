import React, { useState } from "react";

type Application = {
  id: string;
  studentName: string;
  program: string;
  status: "Pending" | "Submitted" | "Accepted" | "Rejected";
  submittedAt: string;
};

const sampleApplications: Application[] = [
  { id: "APP-001", studentName: "Rifat Ahmed", program: "MSc Computer Science", status: "Submitted", submittedAt: "2025-08-29" },
  { id: "APP-002", studentName: "Nabila Khan", program: "BBA", status: "Pending", submittedAt: "2025-08-25" },
  { id: "APP-003", studentName: "Sajid Hasan", program: "Diploma Nursing", status: "Accepted", submittedAt: "2025-07-31" },
  { id: "APP-004", studentName: "Marzia Rahman", program: "MS Data Science", status: "Rejected", submittedAt: "2025-08-18" },
];

const ApplicationsPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = sampleApplications.filter(app => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      app.studentName.toLowerCase().includes(q) ||
      app.program.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Applications</h2>

      {/* Search */}
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Student, Program, or ID"
          className="w-full p-2 sm:p-3 rounded-full border text-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr className="text-left text-black">
              <th className="px-3 sm:px-4 py-2">Student ID</th>
              <th className="px-3 sm:px-4 py-2">Student</th>
              <th className="px-3 sm:px-4 py-2">Program</th>
              <th className="px-3 sm:px-4 py-2">Status</th>
              <th className="px-3 sm:px-4 py-2">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-t hover:bg-gray-50">
                <td className="px-3 sm:px-4 py-2 font-medium">{app.id}</td>
                <td className="px-3 sm:px-4 py-2">{app.studentName}</td>
                <td className="px-3 sm:px-4 py-2">{app.program}</td>
                <td className="px-3 sm:px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : app.status === "Submitted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-2">{app.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsPage;




