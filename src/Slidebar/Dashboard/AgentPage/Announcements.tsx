import React, { useEffect, useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

type Announcement = {
  id: number;
  section_id: number;
  section?: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  created_at: string;
};

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Get Agent Token From localStorage
  // ==============================
  const getHeaders = () => {
    const authData = localStorage.getItem("auth");

    if (!authData) {
      console.log("No auth data found");
      return {
        Accept: "application/json",
      };
    }

    const parsed = JSON.parse(authData);

    console.log("Agent Token:", parsed.token);

    return {
      Accept: "application/json",
      Authorization: `Bearer ${parsed.token}`,
    };
  };

  // ==============================
  // Fetch Announcements
  // ==============================
  const fetchAnnouncements = async () => {
    try {
      console.log("📡 Calling API:", `${BASE_URL}/announcements/frontend`);

      const res = await fetch(`${BASE_URL}/announcements/frontend`, {
        method: "GET",
        headers: getHeaders(),
      });

      console.log(" Response Status:", res.status);

      const textData = await res.text();
      console.log(" Raw Response:", textData);

      const data = textData ? JSON.parse(textData) : {};

      const formatted = Array.isArray(data) ? data : data.data || [];

      console.log(" Final Data Array:", formatted);

      setAnnouncements(formatted);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ==============================
  // Loading State
  // ==============================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-500 mt-2">
            Stay updated with the latest notices
          </p>
        </div>

        {/* Empty State */}
        {announcements.length === 0 ? (
          <div className="text-center text-gray-500">
            No announcements available.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {" "}
            {/* Stack items vertically */}
            {announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h4 className="text-sm text-indigo-600 font-semibold mb-1">
                  {item.section?.name || `Section ID: ${item.section_id}`}
                </h4>

                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="text-xs text-gray-400">
                  Published on {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
