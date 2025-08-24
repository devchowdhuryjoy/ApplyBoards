
import React from 'react';

const FindProgram: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-12 lg:px-20 bg-white">
      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <h4 className="text-primary font-semibold uppercase mb-2">
          International Students
        </h4>
        <h2 className="text-xl lg:text-4xl font-bold text-secondary mb-6 ">
          Find Your Perfect Study Program
        </h2>
        <p className="text-black mb-6 text-justify hyphens-auto">
          We've spent a decade perfecting a faster, easier, quality-first international study application process. Now, the world is yours to explore in just a few clicks.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">📘</span>
            <p>Easily apply to multiple programs</p>
          </li>
          <li className="flex items-start gap-3 text-justify hyphens-auto">
            <span className="text-primary text-xl">🪪</span>
            <p>Find your perfect program from 140,000+ options in five top destinations</p>
          </li>
          <li className="flex items-start gap-3 text-justify hyphens-auto">
            <span className="text-primary text-xl">📊</span>
            <p>Get a higher chance of success with quality checks and AI technology</p>
          </li>
        </ul>
        <button className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-secondary transition">
          Try It Today
        </button>
      </div>

      {/* Right Content (Images + Stat Box) */}
      <div className="flex-1 lg:flex-none flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 lg:mt-0">
        {/* Left: Main Student Image */}
        <div className="w-full sm:w-64 h-64 sm:h-96 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80"
            alt="Student"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right: Two stacked boxes */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full sm:w-auto">
          {/* Acceptance Rate Box */}
          <div className="bg-blue-600 text-white rounded-2xl p-6 w-full sm:w-56 shadow-md text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm">Acceptance Rate</div>
          </div>

          {/* Supporting Image */}
          <div className="w-full sm:w-56 h-36 rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=400&q=80"
              alt="Students"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindProgram;
