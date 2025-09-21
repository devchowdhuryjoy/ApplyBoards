


import React from "react";
import { ArrowRight, ClipboardList, CheckCircle2 } from "lucide-react";

const TasksPage: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      {/* 🔶 Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden shadow-md">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3">My Tasks</h2>
          <p className="text-sm sm:text-lg mb-5 opacity-90">
            Keep track of your pending and completed tasks in one place.
          </p>
          <button className="bg-white text-orange-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            View All Tasks
          </button>
        </div>

        {/* Decorative Circle */}
        <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-20 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="orange"
            viewBox="0 0 24 24"
            className="w-40 h-40 sm:w-56 sm:h-56"
          >
            <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A7.002 7.002 0 0 1 5.07 13H7a1 1 0 1 1 0 2H5.07A7.002 7.002 0 0 1 11 17.93zM13 6.07V5a1 1 0 1 1 2 0v1.07A7.002 7.002 0 0 1 18.93 11H17a1 1 0 1 1 0-2h1.93A7.002 7.002 0 0 1 13 6.07z" />
          </svg>
        </div>
      </div>

      {/* 🔶 Tasks Sections */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-8 h-8 text-orange-600" />
            <h2 className="text-xl font-semibold text-black">Pending Tasks</h2>
          </div>
          <p className="text-black/70 text-sm mb-6">
            View all your pending tasks that need your attention.
          </p>
          <button className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2 font-medium">
            Check Tasks <ArrowRight size={18} />
          </button>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <h2 className="text-xl font-semibold text-black">
              Completed Tasks
            </h2>
          </div>
          <p className="text-black/70 text-sm mb-6">
            Review tasks you have successfully completed.
          </p>
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium">
            View Completed <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
