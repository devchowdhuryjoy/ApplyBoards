import React from "react";
import { ArrowRight } from "lucide-react";

const DashboardPromotion: React.FC = () => {
  return (
    <>
      <div className="w-full px-4 sm:px-8 py-6 bg-gray-50">
        {/* 🔶 Promotion Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
          {/* Text */}
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-3xl font-bold mb-3">
              Get rewarded for studying!
            </h2>
            <p className="text-sm sm:text-base mb-4 text-justify hyphens-auto">
              Receive 500 (CAD, USD, AUD, GBP, or EUR)* by enrolling in an
              eligible program through ApplyBoard in 2025 or 2026.
            </p>
            <button className="bg-white text-black px-2 md:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              See promotion details
            </button>
            <p className="text-xs mt-3 text-justify hyphens-auto">
              *Cashback rewards vary by study destination.
            </p>
          </div>

          {/* Decorative Dollar Icons (right side) */}
          <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-30 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="orange"
              viewBox="0 0 24 24"
              className="w-32 h-32 sm:w-40 sm:h-40"
            >
              <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A7.002 7.002 0 0 1 5.07 13H7a1 1 0 1 1 0 2H5.07A7.002 7.002 0 0 1 11 17.93zM13 6.07V5a1 1 0 1 1 2 0v1.07A7.002 7.002 0 0 1 18.93 11H17a1 1 0 1 1 0-2h1.93A7.002 7.002 0 0 1 13 6.07z" />
            </svg>
          </div>
        </div>

        {/* 🔶 My Progress Section */}
        <div className="mt-10">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://img.icons8.com/color/48/marker.png"
              alt="progress"
              className="w-10 h-10"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Progress
            </h2>
          </div>

          {/* Steps */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "Complete profile",
              "Start applying",
              "Review & submit",
              "Get your results",
              "Apply for visa",
              "Enrol & settle",
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center w-28 sm:w-36 text-center"
              >
                {/* Icon box */}
                <div className="w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-lg mb-2">
                  <span className="text-blue-600 font-bold">{i + 1}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen bg-gray-50 flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-8">
          {/* Before Applying Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-black">
              Before Applying
            </h2>
            <p className="text-black mt-2 text-justify hyphens-auto">
              Complete your profile before starting your application.
            </p>

            <button className="mt-4 px-2 md:px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-secondary transition flex items-center gap-2">
              Complete Profile <ArrowRight size={18} />
            </button>
          </div>

          {/* Start Applying Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-black ">
              Start Applying
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              <button className="px-6 py-3 border border-secondary text-primary rounded-lg hover:bg-blue-50 transition w-fit">
                Find A Program
              </button>

              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Finalize Your Application
              </div>
              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Review and Submission
              </div>
              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Get Result
              </div>
              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Finalize Visa & Admission
              </div>
              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Ready to Enroll
              </div>
              <div className="px-6 py-3 bg-gray-100 text-black rounded-lg cursor-not-allowed sm:text-left md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                Enrollment Confirmed
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPromotion;
