// import React from "react";
// import { Users, Globe, FileText } from "lucide-react";

// const ProfilePage: React.FC = () => {
//   // Sample agent data
//   const agent = {
//     name: "Imran",
//     email: "imran@example.com",
//     role: "Agent",
//     profileImage: "https://i.pravatar.cc/150?img=12",
//     totalLeads: 124,
//     submitted: 78,
//     accepted: 23,
//     countries: 6,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
//       {/* Profile Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
//         {/* Profile Image */}
//         <div className="flex-shrink-0">
//           <img
//             src={agent.profileImage}
//             alt="Agent"
//             className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-indigo-500"
//           />
//         </div>

//         {/* Agent Info */}
//         <div className="flex-1 text-center sm:text-left">
//           <h2 className="text-xl sm:text-2xl font-semibold text-black">{agent.name}</h2>
//           <p className="text-sm sm:text-base text-black mt-1">{agent.role}</p>
//           <p className="text-xs sm:text-sm text-black mt-1">{agent.email}</p>
//         </div>
//       </div>

      
//       {/* Stats */}
//       <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
//           <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
//             <Users size={20} />
//           </div>
//           <div className="text-center sm:text-left">
//             <div className="text-xs text-black">Total Leads</div>
//             <div className="text-lg font-semibold text-black">{agent.totalLeads}</div>
//           </div>
//         </div>

//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
//           <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
//             <FileText size={20} />
//           </div>
//           <div className="text-center sm:text-left">
//             <div className="text-xs text-black">Submitted</div>
//             <div className="text-lg font-semibold text-black">{agent.submitted}</div>
//           </div>
//         </div>

//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
//           <div className="p-3 rounded-lg bg-green-50 text-green-600">
//             <Users size={20} />
//           </div>
//           <div className="text-center sm:text-left">
//             <div className="text-xs text-black">Accepted</div>
//             <div className="text-lg font-semibold text-black">{agent.accepted}</div>
//           </div>
//         </div>

//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
//           <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
//             <Globe size={20} />
//           </div>
//           <div className="text-center sm:text-left">
//             <div className="text-xs text-black">Countries</div>
//             <div className="text-lg font-semibold text-black">{agent.countries}</div>
//           </div>
//         </div>
//       </div>


//       {/* Quick Actions */}
//       <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
//         <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
//           Register Student
//         </button>
//         <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
//           Create Application
//         </button>
//         <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
//           Upload Documents
//         </button>
//         <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
//           Invite Team
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useEffect, useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

interface Agent {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  company_name?: string;
  job_title?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  profile_image?: string;
}

const ProfilePage = () => {
  const [agent, setAgent] = useState<Agent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //
    const authRaw = localStorage.getItem("auth");
    console.log("AUTH RAW:", authRaw);

    if (!authRaw) {
      console.error("auth not found in localStorage");
      setLoading(false);
      return;
    }

    let auth;
    try {
      auth = JSON.parse(authRaw);
    } catch (e) {
      console.error(" auth parse error", e);
      setLoading(false);
      return;
    }

    const token = auth?.token;
    console.log("TOKEN:", token);
    console.log("BASE_URL:", BASE_URL);
    console.log("FINAL API URL:", `${BASE_URL}/agent/profile`);

    if (!token) {
      console.error("token missing inside auth object");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/agent/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log("API STATUS:", res.status);
        return res.json();
      })
      .then((result) => {
        console.log("API RESPONSE:", result);

        const profile =
          result?.data?.agent ||
          result?.data ||
          result?.agent ||
          result?.profile ||
          result?.user ||
          result ||
          {};

        setAgent(profile);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-6 sm:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <img
            src={agent.profile_image || "https://i.pravatar.cc/150"}
            alt="Agent"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {[agent.first_name, agent.last_name]
                .filter(Boolean)
                .join(" ") || "N/A"}
            </h2>
            <p className="text-sm text-gray-500">
              {agent.job_title || "N/A"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {agent.company_name || "N/A"}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">

          <Info label="First Name" value={agent.first_name} />
          <Info label="Last Name" value={agent.last_name} />
          <Info label="Email" value={agent.email} />
          <Info label="Phone" value={agent.phone_number} />
          <Info label="Company" value={agent.company_name} />
          <Info label="Role" value={agent.job_title} />
          <Info label="Country" value={agent.country} />
          <Info label="Postal Code" value={agent.postal_code} />

          <div className="flex flex-col sm:col-span-2">
            <span className="text-gray-500">Website</span>
            {agent.website ? (
              <a
                href={agent.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:underline break-all"
              >
                {agent.website}
              </a>
            ) : (
              <span className="font-medium text-gray-900">N/A</span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

//Reusable info row
const Info = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value || "N/A"}</span>
  </div>
);

export default ProfilePage;









