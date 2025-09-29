const UniversityApply = () => {
  return (
    <div className="bg-white rounded-xl mt-10 mb-10 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer max-w-sm mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img
            src="/student-1.png"
            alt="University logo"
            className="w-10 h-10 object-contain"
          />
          <h3 className="text-blue-700 font-semibold hover:underline">
            Laurentian University
          </h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Bachelor's Degree</p>
        <p className="text-base font-medium text-black">
          Computer Science Program
        </p>
      </div>

      {/* Quick Info */}
      <div className="p-4 space-y-2 text-sm">
        <p>
          <strong>Location:</strong> Ontario, Canada
        </p>
        <p>
          <strong>Campus city:</strong> Sudbury
        </p>
        <p>
          <strong>Tuition (1st year):</strong> $25,000
        </p>
        <p>
          <strong>Application fee:</strong> $100
        </p>
        <p>
          <strong>Duration:</strong> 48 months
        </p>
      </div>

      {/* Success prediction */}
      <div className="p-4 border-t border-gray-200">
        <p className="font-medium text-gray-700 mb-2">Success prediction</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col items-center">
            <span>Sep 2026</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full mt-1">
              Average
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Jan 2027</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
              High
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Sep 2027</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
              High
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-200 transition">
          Create application
        </button>
      </div>
    </div>
  );
};

export default UniversityApply;
