import { useRef } from "react";
export default function AboutUniversity(): JSX.Element {
  const topSectionRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    topSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="max-w-6xl mx-auto p-6 sm:p-8" ref={topSectionRef}>
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-sky-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg">
              LU
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Laurentian University
              </h1>
              <div className="text-sm text-slate-500 mt-0.5 flex flex-wrap gap-3 items-center">
                <span className="flex items-center gap-2">
                  <span className="text-red-500">🇨🇦</span> Sudbury, Ontario, CA
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="truncate">935 Ramsey Lake Road, Sudbury</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-2">
                  Last updated:{" "}
                  <time dateTime="2025-09-30" className="ml-1">
                    30/09/2025
                  </time>
                </span>
              </div>
            </div>
          </div>
           
          {/* Example button to scroll to top */}
          <button
            onClick={scrollToTop}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Scroll to Top
          </button>

        </header>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large left image spanning two rows on lg screens */}
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="student-1.png"
                alt="students group"
                className="w-full h-full object-cover object-center"
              />
              <button className="absolute left-4 bottom-4 bg-slate-800/85 text-white px-3 py-2 rounded-md text-sm">
                View Photos
              </button>
            </div>
          </div>

          {/* Top-right narrow images */}
          <div className="hidden sm:block">
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src="student-2.png"
                alt="lake students"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src="student-3.png"
                alt="library students"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Middle small image (center) */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src="student-4.png"
                alt="interior"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Bottom-right video card with play overlay */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src="student-1.png"
                alt="canoe video"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Play video"
                  className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white"
                >
                  <svg
                    className="w-6 h-6 text-white ml-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </section>

      <section className="max-w-7xl mx-auto p-6 sm:p-8 grid lg:grid-cols-3 gap-8">
        {/* Left Column: Tabs + About Text */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Tabs */}
          <div className="flex space-x-6 border-b mb-6 overflow-x-auto">
            {[
              "School Details",
              "Programs",
              "Scholarships",
              "Studyxl Services",
            ].map((tab, i) => (
              <button
                key={i}
                className={`pb-3 whitespace-nowrap ${
                  i === 0
                    ? "text-[#f16f22] border-b-2 border-[#252364] font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={scrollToTop}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* School Details Card */}
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                🏛️
              </span>
              School Details
            </h2>

            {/* Sub-tabs */}
            <div className="flex space-x-6 border-b text-sm mb-6">
              {["Overview", "Features", "Location"].map((sub, i) => (
                <button
                  key={i}
                  className={`pb-2 ${
                    i === 0
                      ? "text-[#f16f22] border-b-2 border-[#252364] font-medium"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* About Text */}
            <div className="prose max-w-none text-slate-700">
              <h3 className="font-semibold text-lg mb-2">
                About Laurentian University
              </h3>
              <p>
                Laurentian University was once only a regional school serving
                Sudbury, and while it still serves the area well, it has grown
                into an international leader in niches such as stressed
                watershed systems, rural and Northern children’s health,
                particle astrophysics, as well as mining, engineering, and
                environmental remediation. Laurentian University offers more
                than 175 undergraduate and graduate programs, and as it is a
                bilingual institution, 800 course sections are offered in
                French.
              </p>
              <p>
                Located on a 765-acre campus, the university is surrounded by
                five lakes, a boreal forest and nature trails. Laurentian
                University's main campus, an eight-minute drive from downtown,
                is attractive and welcoming. It’s near a beach that students can
                visit in the summer, and outdoor rinks, where they can knock
                around pucks during the winter.
              </p>

              <h3 className="font-semibold text-lg mt-4 mb-2">
                Why Laurentian University
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Unique Signature Programs:</strong> With more than 175
                  degree programs at the undergraduate and graduate levels, and
                  flexible degree options, Laurentian University offers a
                  comprehensive range of high-calibre programs. Our programs in
                  architecture, forensic science, sports administration,
                  midwifery, human kinetics, Indigenous studies and many others
                  provide unique learning experiences and diverse career
                  opportunities for graduates.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Institution Details + Cost & Duration */}
        <div className="space-y-6">
          {/* Institution Details */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Institution Details</h3>
            <dl className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <dt>Founded</dt>
                <dd>1960</dd>
              </div>
              <div className="flex justify-between">
                <dt>School ID</dt>
                <dd>250</dd>
              </div>
              <div className="flex justify-between">
                <dt>DLI number</dt>
                <dd>O19304259382</dd>
              </div>
              <div className="flex justify-between">
                <dt>Institution Type</dt>
                <dd>Public</dd>
              </div>
            </dl>
          </div>

          {/* Cost and Duration */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Cost and Duration</h3>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start justify-between">
                <span className="flex items-center gap-2">
                  💰 Average application fee
                </span>
                <span>$112.75 – $153.00 CAD</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="flex items-center gap-2">
                  📅 Average graduate program
                </span>
                <span>One Year</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="flex items-center gap-2">
                  📅 Average undergraduate program
                </span>
                <span>4 Years</span>
              </li>
              <li className="flex items-start justify-between">
                <span className="flex items-center gap-2">
                  🏠 Cost of living
                </span>
                <span>$20,635.00 CAD / year</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
