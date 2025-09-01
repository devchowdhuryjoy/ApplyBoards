import React, { useState } from "react";
import {
  Menu,
  Users,
  Globe,
  Search,
  FileText,
  PlusCircle,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

type Applicant = {
  id: string;
  name: string;
  country: string;
  program: string;
  status: "Pending" | "Submitted" | "Accepted" | "Rejected";
  submittedAt: string;
};

const sampleApplicants: Applicant[] = [
  {
    id: "A-001",
    name: "Rifat Ahmed",
    country: "UK",
    program: "MSc Computer Science",
    status: "Submitted",
    submittedAt: "2025-08-29",
  },
  {
    id: "A-002",
    name: "Nabila Khan",
    country: "Canada",
    program: "BBA",
    status: "Pending",
    submittedAt: "2025-08-25",
  },
  {
    id: "A-003",
    name: "Sajid Hasan",
    country: "Australia",
    program: "Diploma Nursing",
    status: "Accepted",
    submittedAt: "2025-07-31",
  },
  {
    id: "A-004",
    name: "Marzia Rahman",
    country: "USA",
    program: "MS Data Science",
    status: "Rejected",
    submittedAt: "2025-08-18",
  },
];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white shadow-sm rounded-xl p-4 flex items-center gap-4 border border-gray-100">
    <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">{icon}</div>
    <div>
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = sampleApplicants.filter((a) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.program.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Main area */}
        <div className="flex-1">
          {/* Topbar */}
          <header className="Fixed top-0 z-20 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="open sidebar"
                >
                  <Menu size={18} />
                </button>
                <h1 className="text-base sm:text-lg font-semibold">
                  Dashboard
                </h1>
                <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-black">
                  Welcome back — manage your applicants
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative w-40 sm:w-64">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-8 pr-4 py-2 rounded-full border w-full text-xs sm:text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search..."
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={14} />
                  </div>
                </div>
                <button className="px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm shadow">
                  New
                </button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-xs sm:text-sm">
                  IM
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto p-3 sm:p-4">
            {/* Welcome + Stats */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2 bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between flex-col sm:flex-row gap-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Good morning, Agent
                    </h2>
                    <p className="text-xs sm:text-sm text-black mt-1">
                      Here's what's happening with your students today.
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-black">
                    September 1, 2025
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <StatCard
                    title="Total Leads"
                    value={124}
                    icon={<Users size={18} />}
                  />
                  <StatCard
                    title="Submitted"
                    value={78}
                    icon={<FileText size={18} />}
                  />
                  <StatCard
                    title="Accepted"
                    value={23}
                    icon={<PlusCircle size={18} />}
                  />
                  <StatCard
                    title="Countries"
                    value={6}
                    icon={<Globe size={18} />}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm text-black">
                      Quick Actions
                    </div>
                    <div className="font-semibold text-sm sm:text-base">
                      One-click tools
                    </div>
                  </div>
                  <button className="text-xs text-indigo-600 hover:underline">
                    Manage
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50">
                    Register
                  </button>
                  <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50">
                    Application
                  </button>
                  <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50">
                    Documents
                  </button>
                  <button className="p-2 sm:p-3 rounded-lg border hover:shadow text-xs sm:text-sm bg-gray-50">
                    Invite
                  </button>
                </div>
              </div>
            </section>

            {/* Recent Applicants */}
            <section className="bg-white rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-col sm:flex-row gap-2">
                <h3 className="text-base sm:text-lg font-semibold">
                  Recent Applicants
                </h3>
                <div className="text-xs sm:text-sm text-black">
                  Showing {filtered.length} of {sampleApplicants.length}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y text-xs sm:text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-black">
                      <th className="px-3 sm:px-4 py-2">ID</th>
                      <th className="px-3 sm:px-4 py-2">Name</th>
                      <th className="px-3 sm:px-4 py-2">Country</th>
                      <th className="px-3 sm:px-4 py-2">Program</th>
                      <th className="px-3 sm:px-4 py-2">Status</th>
                      <th className="px-3 sm:px-4 py-2">Submitted</th>
                      <th className="px-3 sm:px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((app) => (
                      <tr key={app.id} className="border-t hover:bg-gray-50">
                        <td className="px-3 sm:px-4 py-3 font-medium">
                          {app.id}
                        </td>
                        <td className="px-3 sm:px-4 py-3">{app.name}</td>
                        <td className="px-3 sm:px-4 py-3">{app.country}</td>
                        <td className="px-3 sm:px-4 py-3">{app.program}</td>
                        <td className="px-3 sm:px-4 py-3">
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
                        <td className="px-3 sm:px-4 py-3">{app.submittedAt}</td>
                        <td className="px-3 sm:px-4 py-3">
                          <div className="flex gap-1 sm:gap-2">
                            <button className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg border hover:bg-gray-100">
                              View
                            </button>
                            <button className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg border hover:bg-gray-100">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Footer widgets */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-black">
                  Upcoming Interviews
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm">
                  No interviews scheduled. Use Quick Actions to schedule calls
                  with students.
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-black">
                  Country Summary
                </div>
                <ul className="mt-2 sm:mt-3 text-xs sm:text-sm space-y-1 sm:space-y-2 list-disc list-inside">
                  <li>UK — 34 leads</li>
                  <li>Canada — 27 leads</li>
                  <li>Australia — 18 leads</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-black">
                  <Lightbulb size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    Tips & Resources
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm space-y-1 sm:space-y-2">
                  <p>
                    ✔ Improve student engagement with personalized follow-ups.
                  </p>
                  <p>
                    ✔ Keep all documents organized before submission deadlines.
                  </p>
                  <p>
                    ✔ Invite your teammates to collaborate inside this portal.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
    </div>
  );
};

export default DashboardPage;
