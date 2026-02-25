

const ShortlistApply = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-[#1a2b4c]">Shortlist and Apply</h2>
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
          3 Shortlisted
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-lg font-semibold text-[#1a2b4c] mb-2">MSc in Computer Science</h4>
            <p className="text-gray-600 text-sm mb-1">University of Toronto</p>
            <p className="text-red-500 text-sm">Deadline: 30 Mar 2024</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3c5c] transition">
              Apply
            </button>
            <button className="flex-1 md:flex-none px-6 py-2 border border-[#1a2b4c] text-[#1a2b4c] rounded-lg hover:bg-gray-100 transition">
              Remove
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-lg font-semibold text-[#1a2b4c] mb-2">BSc in Data Science</h4>
            <p className="text-gray-600 text-sm mb-1">University of British Columbia</p>
            <p className="text-red-500 text-sm">Deadline: 15 Apr 2024</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3c5c] transition">
              Apply
            </button>
            <button className="flex-1 md:flex-none px-6 py-2 border border-[#1a2b4c] text-[#1a2b4c] rounded-lg hover:bg-gray-100 transition">
              Remove
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-lg font-semibold text-[#1a2b4c] mb-2">MBA</h4>
            <p className="text-gray-600 text-sm mb-1">Western University</p>
            <p className="text-red-500 text-sm">Deadline: 20 May 2024</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3c5c] transition">
              Apply
            </button>
            <button className="flex-1 md:flex-none px-6 py-2 border border-[#1a2b4c] text-[#1a2b4c] rounded-lg hover:bg-gray-100 transition">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortlistApply;