import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Globe } from "lucide-react";
// import StudySteps from "./StudySteps";
import SearchProgram from "./SearchProgram";
import SolutionSection from "../../SolutionSection/SolutionSection";
import SolutionServices from "../../SolutionSection/SolutionServices";
import StudyProgramsBanner from "../../StudyProgramsBanner/StudyProgramsBanner";

const ProgramSearch = () => {
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const studentCard = {
    title: "Students",
    desc: "We’ll guide you to your dream course — from course selection to campus life.",
    btnText: "Sign up",
    img: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    btnStyle: "bg-primary text-white hover:bg-secondary",
    route: "/login",
  };

  return (
    <>
      <div className="px-4 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
          Start your journey with us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Extra Text */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              Study Abroad with Confidence
            </h3>
            <p className="text-black text-justify leading-relaxed">
              Studying abroad is no longer just a dream. We guide you step by
              step in selecting the right course, applying to universities,
              completing your visa process, and preparing for campus life
              overseas. Stay with us to turn your goals into reality and build a
              brighter future. <br />
              <br />
              Our expert counselors help you explore career-focused programs
              across top destinations. We ensure that your applications meet all
              compliance standards and increase your chances of acceptance.{" "}
              <br />
              <br />
              From scholarship opportunities to accommodation guidance, we make
              sure you feel confident throughout your journey. <br />
              <br />
              We also provide personalized support so every student receives the
              attention and guidance they deserve. <br />
              <br />
              With our dedicated team, you will be well-prepared to face
              challenges, adapt to new cultures, and excel in your academic
              journey abroad. <br />
              <br />
              Join us today and take the first step toward a successful
              international education experience.
            </p>
          </div>

          {/* Right Side: Student Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <img
              src={studentCard.img}
              alt={studentCard.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                {studentCard.title}
              </h3>
              <p className="text-black mb-4 text-justify hyphens-auto">
                {studentCard.desc}
              </p>
              <button
                className={`px-6 py-3 rounded-full font-medium ${studentCard.btnStyle}`}
                onClick={() => {
                  scrollToTop();
                  navigate(studentCard.route);
                }}
              >
                {studentCard.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>

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
        {/* <StudySteps /> */}
        <SearchProgram />
        <SolutionSection />
        <SolutionServices />
        <div className="mt-10 mb-10">
          <StudyProgramsBanner />
        </div>
      </div>
    </>
  );
};

export default ProgramSearch;
