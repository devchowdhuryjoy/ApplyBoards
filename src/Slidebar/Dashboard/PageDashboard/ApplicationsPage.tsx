// import React from "react";
// import { ArrowRight } from "lucide-react";

// const ApplicationsPage: React.FC = () => {
//   return (
//     <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
//       {/* 🔶 Promotion Banner (Same style as HomePage) */}
//       <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
//         {/* Text */}
//         <div className="max-w-2xl">
//           <h2 className="text-xl sm:text-3xl font-bold mb-3">
//             My Applications
//           </h2>
//           <p className="text-sm sm:text-base mb-4 text-justify hyphens-auto">
//             Manage all your submitted applications here.
//           </p>
//           <button className="bg-white text-black px-2 md:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
//             View Details
//           </button>
//         </div>

//         {/* Decorative Dollar Icon */}
//         <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-30 pointer-events-none">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="orange"
//             viewBox="0 0 24 24"
//             className="w-32 h-32 sm:w-40 sm:h-40"
//           >
//             <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A7.002 7.002 0 0 1 5.07 13H7a1 1 0 1 1 0 2H5.07A7.002 7.002 0 0 1 11 17.93zM13 6.07V5a1 1 0 1 1 2 0v1.07A7.002 7.002 0 0 1 18.93 11H17a1 1 0 1 1 0-2h1.93A7.002 7.002 0 0 1 13 6.07z" />
//           </svg>
//         </div>
//       </div>

//       {/* 🔶 Applications List Section */}
//       <div className="mt-10 flex flex-col gap-6">
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">
//             Pending Applications
//           </h2>
//           <p className="text-black text-sm mb-4">
//             You have 3 applications currently in progress.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             View Pending <ArrowRight size={18} />
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">
//             Submitted Applications
//           </h2>
//           <p className="text-black text-sm mb-4">
//             Check the status of your submitted applications.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             View Submitted <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationsPage;



import React, { useEffect, useState } from "react";

interface Application {
  id: number;
  university: string;
  country: string;
  name: string;
  email: string;
  phone: string;
}

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  // লোকালস্টোরেজ থেকে ডেটা আনা
  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem("applications") || "[]");
    setApplications(storedApps);
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📌 My Applications
      </h2>

      {applications.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {app.university}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{app.country}</p>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">👤 Name:</span> {app.name}
                </p>
                <p>
                  <span className="font-medium">📧 Email:</span> {app.email}
                </p>
                <p>
                  <span className="font-medium">📱 Phone:</span> {app.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No applications found. Please apply from Programs page.
        </p>
      )}
    </div>
  );
};

export default ApplicationsPage;
