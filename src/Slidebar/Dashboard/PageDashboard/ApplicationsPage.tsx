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
