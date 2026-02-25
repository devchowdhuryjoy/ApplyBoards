

const Applications = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1a2b4c]">Applications</h2>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-yellow-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h4 className="text-lg font-semibold text-[#1a2b4c]">University of Toronto - MSc Computer Science</h4>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Under Review
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4">Submitted: 10 Feb 2024</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#1a2b4c] rounded-full" style={{width: '60%'}}></div>
            </div>
            <span className="text-sm text-gray-600">60% Complete</span>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-green-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h4 className="text-lg font-semibold text-[#1a2b4c]">University of British Columbia - BSc Data Science</h4>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Accepted
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">Submitted: 5 Jan 2024</p>
          <p className="text-green-600 text-sm">Offer received: 20 Feb 2024</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-red-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h4 className="text-lg font-semibold text-[#1a2b4c]">McGill University - BSc Computer Science</h4>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Rejected
            </span>
          </div>
          <p className="text-gray-600 text-sm">Submitted: 15 Dec 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Applications;