// import React, { useEffect, useState } from "react";

// interface Application {
//   id: number;
//   university: string;
//   country: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// const ApplicationsPage: React.FC = () => {
//   const [applications, setApplications] = useState<Application[]>([]);

  
//   useEffect(() => {
//     const storedApps = JSON.parse(localStorage.getItem("applications") || "[]");
//     setApplications(storedApps);
//   }, []);

//   return (
//     <div className="w-full px-4 sm:px-8 py-8 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//          My Applications
//       </h2>

//       {applications.length > 0 ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           {applications.map((app) => (
//             <div
//               key={app.id}
//               className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                 {app.university}
//               </h3>
//               <p className="text-sm text-gray-600 mb-2">{app.country}</p>

//               <div className="text-sm text-gray-700 space-y-1">
//                 <p>
//                   <span className="font-medium">👤 Name:</span> {app.name}
//                 </p>
//                 <p>
//                   <span className="font-medium">📧 Email:</span> {app.email}
//                 </p>
//                 <p>
//                   <span className="font-medium">📱 Phone:</span> {app.phone}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center mt-10">
//           No applications found. Please apply from Programs page.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ApplicationsPage;




import React, { useEffect, useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const getAuthToken = (): string | null => {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) return null;
    return JSON.parse(auth)?.token || null;
  } catch {
    return null;
  }
};

type Application = {
  id: string;
  studentName: string;
  studentId?: string;
  program: string;
  university: string;
  status: "Pending" | "Submitted" | "Accepted" | "Rejected";
  submittedAt: string;
};

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Unauthorized: Token not found");

      const response = await fetch(`${BASE_URL}/student/my-applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const result = await response.json();
      console.log("API Response:", result);

      const formatted: Application[] = (result?.data || []).map(
        (item: any) => ({
          id: item.id || item.application_id || "N/A",
          studentName: item.student_name || item.studentName || "Unknown",
          studentId: item.student_id || item.studentId || "N/A",
          program: item.program_name || item.program || "N/A",
          university: item.university_name || item.university || "N/A",
          status: ["Accepted", "Rejected", "Submitted"].includes(item.status)
            ? item.status
            : "Pending",
          submittedAt:
            item.submitted_at ||
            item.submittedAt ||
            item.created_at?.slice(0, 10) ||
            "N/A",
        })
      );

      setApplications(formatted);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading applications...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        My Applications
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="min-w-full divide-y text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr className="text-left text-black">
              <th className="px-4 py-3">Application ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">APP-{app.id}</td>
                  <td className="px-4 py-2">{app.studentName}</td>
                  <td className="px-4 py-2">{app.studentId}</td>
                  <td className="px-4 py-2">{app.program}</td>
                  <td className="px-4 py-2">{app.university}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
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
                  <td className="px-4 py-2">{app.submittedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;