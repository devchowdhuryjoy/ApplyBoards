// import React, { useState } from "react";

// type Task = {
//   id: string;
//   title: string;
//   status: "Pending" | "In Progress" | "Completed";
//   dueDate: string;
// };

// const sampleTasks: Task[] = [
//   { id: "T-001", title: "Follow up with Rifat Ahmed", status: "Pending", dueDate: "2025-09-03" },
//   { id: "T-002", title: "Review Nabila Khan's documents", status: "In Progress", dueDate: "2025-09-05" },
//   { id: "T-003", title: "Schedule interview for Sajid Hasan", status: "Completed", dueDate: "2025-08-30" },
//   { id: "T-004", title: "Prepare report for Marzia Rahman", status: "Pending", dueDate: "2025-09-07" },
// ];

// const TasksPage: React.FC = () => {
//   const [query, setQuery] = useState("");

//   const filtered = sampleTasks.filter(task => {
//     const q = query.trim().toLowerCase();
//     if (!q) return true;
//     return task.title.toLowerCase().includes(q) || task.id.toLowerCase().includes(q);
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
//       <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Tasks</h2>

//       {/* Search */}
//       <div className="mb-4 w-full max-w-md">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search tasks by title or ID"
//           className="w-full p-2 sm:p-3 rounded-full border text-black focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
//         <table className="min-w-full divide-y text-sm sm:text-base">
//           <thead className="bg-gray-50">
//             <tr className="text-left text-black">
//               <th className="px-3 sm:px-4 py-2">ID</th>
//               <th className="px-3 sm:px-4 py-2">Task</th>
//               <th className="px-3 sm:px-4 py-2">Status</th>
//               <th className="px-3 sm:px-4 py-2">Due Date</th>
//               <th className="px-3 sm:px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(task => (
//               <tr key={task.id} className="border-t hover:bg-gray-50">
//                 <td className="px-3 sm:px-4 py-2 font-medium">{task.id}</td>
//                 <td className="px-3 sm:px-4 py-2">{task.title}</td>
//                 <td className="px-3 sm:px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
//                       task.status === "Completed"
//                         ? "bg-green-100 text-green-800"
//                         : task.status === "In Progress"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {task.status}
//                   </span>
//                 </td>
//                 <td className="px-3 sm:px-4 py-2">{task.dueDate}</td>
//                 <td className="px-3 sm:px-4 py-2">
//                   <div className="flex gap-1 sm:gap-2">
//                     <button className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg border hover:bg-gray-100">
//                       View
//                     </button>
//                     <button className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg border hover:bg-gray-100">
//                       Edit
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-3 sm:px-4 py-3 text-center text-gray-500">
//                   No tasks found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TasksPage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

type Task = {
  id: number;
  title: string;
  subject: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  due_date: string;
  student_id: number;
  student_name: string;
  agent_id: number;
  agent_name: string;
  university_id: number;
  university_name: string;
  program_id: number;
  program_name: string;
  documents: string[];
};

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("🔍 Checking localStorage for auth data...");
        
        // Get the auth object from localStorage (same as ProfilePage)
        const authRaw = localStorage.getItem("auth");
        console.log("📦 authRaw from localStorage:", authRaw);
        
        if (!authRaw) {
          console.error("❌ No 'auth' found in localStorage");
          Swal.fire({
            icon: "error",
            title: "Token Missing",
            text: "No token found! Please login first.",
          });
          setLoading(false);
          return;
        }

        // Parse the auth object
        let auth;
        try {
          auth = JSON.parse(authRaw);
          console.log("✅ Parsed auth object:", auth);
        } catch (e) {
          console.error("❌ Error parsing auth object:", e);
          Swal.fire({
            icon: "error",
            title: "Token Error",
            text: "Invalid token format. Please login again.",
          });
          setLoading(false);
          return;
        }

        // Extract token from auth object (same as ProfilePage)
        const token = auth?.token;
        console.log("🔑 Extracted token:", token ? "Token exists" : "No token");
        console.log("🔑 Token (first 20 chars):", token ? token.substring(0, 20) + "..." : "null");

        if (!token) {
          console.error("❌ Token missing inside auth object");
          Swal.fire({
            icon: "error",
            title: "Token Missing",
            text: "No token found in auth object. Please login again.",
          });
          setLoading(false);
          return;
        }

        console.log("🌐 Making API request to:", `${BASE_URL}/agent/tasks`);

        const response = await axios.get(`${BASE_URL}/agent/tasks`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        console.log("✅ API Response:", response.data);

        // Handle different possible response structures
        let tasksData: Task[] = [];
        
        if (Array.isArray(response.data)) {
          tasksData = response.data;
        } else if (response.data.tasks && Array.isArray(response.data.tasks)) {
          tasksData = response.data.tasks;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          tasksData = response.data.data;
        } else if (response.data.status === "success" && Array.isArray(response.data.data)) {
          tasksData = response.data.data;
        } else if (response.data.status === "success" && Array.isArray(response.data.tasks)) {
          tasksData = response.data.tasks;
        }

        console.log("📋 Extracted tasks data:", tasksData);

        if (tasksData.length > 0) {
          setTasks(tasksData);
          console.log(`✅ Successfully loaded ${tasksData.length} tasks`);
        } else {
          setTasks([]);
          console.log("⚠️ No tasks data found in response");
          Swal.fire({
            icon: "info",
            title: "No Tasks",
            text: "No tasks found for your account.",
          });
        }
      } catch (err: any) {
        console.error("❌ Error fetching tasks:", err);
        console.error("❌ Error details:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        
        setTasks([]);
        
        let errorMessage = "An error occurred while fetching tasks.";
        
        if (err.response) {
          if (err.response.status === 401) {
            errorMessage = "Unauthorized! Please login again.";
            // Clear invalid auth data
            localStorage.removeItem("auth");
          } else if (err.response.status === 403) {
            errorMessage = "You don't have permission to view tasks.";
          } else if (err.response.status === 404) {
            errorMessage = "Tasks endpoint not found.";
          } else {
            errorMessage = `Server error: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = "Network error! Please check your connection.";
        }
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filtered = tasks.filter((task) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      task.title.toLowerCase().includes(q) ||
      task.id.toString().toLowerCase().includes(q) ||
      task.student_name.toLowerCase().includes(q) ||
      task.agent_name.toLowerCase().includes(q)
    );
  });

  if (loading)
    return <div className="text-center p-6 text-gray-700">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Tasks</h2>

      {/* Search */}
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks by title, ID, student, or agent"
          className="w-full p-2 sm:p-3 rounded-full border text-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Debug button (optional - can remove later) */}
      <div className="mb-4">
        <button
          onClick={() => {
            const authRaw = localStorage.getItem("auth");
            const auth = authRaw ? JSON.parse(authRaw) : null;
            console.log("🔍 Debug - Current auth:", auth);
            console.log("🔍 Debug - Token:", auth?.token);
            console.log("🔍 Debug - All localStorage:");
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              console.log(key, ":", localStorage.getItem(key));
            }
          }}
          className="px-3 py-1 text-xs bg-gray-200 rounded"
        >
          Debug Storage
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr className="text-left text-black whitespace-nowrap">
              <th className="px-3 sm:px-4 py-2">ID</th>
              <th className="px-3 sm:px-4 py-2">Title</th>
              <th className="px-3 sm:px-4 py-2">Student</th>
              <th className="px-3 sm:px-4 py-2">Agent</th>
              <th className="px-3 sm:px-4 py-2">Status</th>
              <th className="px-3 sm:px-4 py-2">Due Date</th>
              <th className="px-3 sm:px-4 py-2">Documents</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((task) => (
                <tr key={task.id} className="border-t hover:bg-gray-50 whitespace-nowrap">
                  <td className="px-3 sm:px-4 py-2 font-medium">{task.id}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <div className="font-medium">{task.title}</div>
                    {task.subject && (
                      <div className="text-xs text-gray-500">{task.subject}</div>
                    )}
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <div>{task.student_name}</div>
                    {task.program_name && (
                      <div className="text-xs text-gray-500">{task.program_name}</div>
                    )}
                  </td>
                  <td className="px-3 sm:px-4 py-2">{task.agent_name}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    {new Date(task.due_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    {task.documents && task.documents.length > 0 ? (
                      task.documents.map((doc, i) => (
                        <div key={i} className="mb-1">
                          <a
                            href={`https://studyxl.globalrouteway.com/${doc}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline text-xs block truncate max-w-xs hover:text-blue-800"
                          >
                            {doc.split("/").pop()}
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No documents</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 sm:px-4 py-8 text-center text-gray-500"
                >
                  {tasks.length === 0 
                    ? "No tasks available. Start by creating a new task." 
                    : "No tasks match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksPage;






