import React, { useState } from "react";

type Task = {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

const sampleTasks: Task[] = [
  { id: "T-001", title: "Follow up with Rifat Ahmed", status: "Pending", dueDate: "2025-09-03" },
  { id: "T-002", title: "Review Nabila Khan's documents", status: "In Progress", dueDate: "2025-09-05" },
  { id: "T-003", title: "Schedule interview for Sajid Hasan", status: "Completed", dueDate: "2025-08-30" },
  { id: "T-004", title: "Prepare report for Marzia Rahman", status: "Pending", dueDate: "2025-09-07" },
];

const TasksPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = sampleTasks.filter(task => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return task.title.toLowerCase().includes(q) || task.id.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Tasks</h2>

      {/* Search */}
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks by title or ID"
          className="w-full p-2 sm:p-3 rounded-full border text-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr className="text-left text-black">
              <th className="px-3 sm:px-4 py-2">ID</th>
              <th className="px-3 sm:px-4 py-2">Task</th>
              <th className="px-3 sm:px-4 py-2">Status</th>
              <th className="px-3 sm:px-4 py-2">Due Date</th>
              <th className="px-3 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="px-3 sm:px-4 py-2 font-medium">{task.id}</td>
                <td className="px-3 sm:px-4 py-2">{task.title}</td>
                <td className="px-3 sm:px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
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
                <td className="px-3 sm:px-4 py-2">{task.dueDate}</td>
                <td className="px-3 sm:px-4 py-2">
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 sm:px-4 py-3 text-center text-gray-500">
                  No tasks found.
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

