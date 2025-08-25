import { useState } from "react";
import { Search, Globe } from "lucide-react";
import StudySteps from "./StudySteps";
import SearchProgram from "./SearchProgram";
import SolutionSection from "../../SolutionSection/SolutionSection";
import SolutionServices from "../../SolutionSection/SolutionServices";
import StudyProgramsBanner from "../../StudyProgramsBanner/StudyProgramsBanner";
import JourneySection from "../../JourneySection/JourneySection";


const ProgramSearch = () => {
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  return (
    <>
      <section className="w-full px-6 md:px-12 lg:px-20 py-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Find Your <span className="text-primary">Perfect Program</span>
            </h1>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center border rounded-lg w-full sm:w-auto flex-grow px-3 py-2 bg-white">
                <Search className="text-black mr-2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Course title here."
                  className="outline-none flex-grow text-sm text-gray-700"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              <div className="flex items-center border rounded-lg w-full sm:w-auto flex-grow px-3 py-2 bg-white">
                <Globe className="text-black mr-2 w-5 h-5" />
                <select
                  className="outline-none flex-grow text-sm text-black"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select a location</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>

              <button className="bg-primary hover:bg-secondary transition text-white rounded-lg px-6 py-2 font-medium">
                Search
              </button>
            </div>

            {/* Popular Searches */}
            <div className="space-y-2">
              <p className="font-medium flex items-center gap-2">
                🔥 Popular Searches
              </p>
              <div className="flex flex-wrap gap-3">
                {["Sciences", "Engineering", "Technology"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 border rounded-lg text-sm font-medium text-primary hover:bg-secondary cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-primary hover:bg-secondary transition text-white rounded-lg px-6 py-3 font-semibold">
              Start Your Journey
            </button>
          </div>

          {/* Right Side Images */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                alt="Student"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                alt="Students"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md bg-blue-600 flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1534/1534951.png"
                alt="Luggage"
                className="w-20 h-20"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="">
         <JourneySection />
         <StudySteps />
         <SearchProgram/>
         <SolutionSection/>
         <SolutionServices/>
         <div className="mt-10 mb-10">
         <StudyProgramsBanner/>
         </div>
      </div>
    </>
  );
};

export default ProgramSearch;
