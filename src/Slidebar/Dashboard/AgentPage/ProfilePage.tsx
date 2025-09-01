import React from "react";
import { Users, Globe, FileText } from "lucide-react";

const ProfilePage: React.FC = () => {
  // Sample agent data
  const agent = {
    name: "Imran Uddin chowdhury",
    email: "imran@example.com",
    role: "Agent",
    profileImage: "https://i.pravatar.cc/150?img=12",
    totalLeads: 124,
    submitted: 78,
    accepted: 23,
    countries: 6,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={agent.profileImage}
            alt="Agent"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-indigo-500"
          />
        </div>

        {/* Agent Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">{agent.name}</h2>
          <p className="text-sm sm:text-base text-black mt-1">{agent.role}</p>
          <p className="text-xs sm:text-sm text-black mt-1">{agent.email}</p>
        </div>
      </div>

      
      {/* Stats */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            <Users size={20} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xs text-black">Total Leads</div>
            <div className="text-lg font-semibold text-black">{agent.totalLeads}</div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
            <FileText size={20} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xs text-black">Submitted</div>
            <div className="text-lg font-semibold text-black">{agent.submitted}</div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <div className="p-3 rounded-lg bg-green-50 text-green-600">
            <Users size={20} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xs text-black">Accepted</div>
            <div className="text-lg font-semibold text-black">{agent.accepted}</div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
            <Globe size={20} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xs text-black">Countries</div>
            <div className="text-lg font-semibold text-black">{agent.countries}</div>
          </div>
        </div>
      </div>


      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
          Register Student
        </button>
        <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
          Create Application
        </button>
        <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
          Upload Documents
        </button>
        <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50 text-black">
          Invite Team
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
