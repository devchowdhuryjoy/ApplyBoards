

const CourseSearch = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1a2b4c]">Course Search</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search courses..." 
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] focus:border-transparent"
        />
        <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] md:min-w-[150px]">
          <option>All Levels</option>
          <option>Bachelor</option>
          <option>Master</option>
          <option>PhD</option>
        </select>
        <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] md:min-w-[150px]">
          <option>All Countries</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
        <button className="px-8 py-3 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3c5c] transition">
          Search
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-[#1a2b4c] mb-4">Recent Searches</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
            <span>Computer Science in UK</span>
            <span className="text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
            <span>Business Administration in Canada</span>
            <span className="text-xs text-gray-400">5 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;