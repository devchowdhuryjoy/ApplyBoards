
import React from "react";

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20 text-center">
      {/* Small Heading */}
      <h3 className="text-primary font-medium text-sm md:text-base uppercase mb-2">
        360 Solutions
      </h3>

      {/* Main Heading */}
      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-secondary leading-snug mb-4">
        Find Every Solution,From Applications to Accommodations
      </h2>

      {/* Description */}
      <p className="text-black text-base md:text-lg max-w-5xl mx-auto mb-8 text-justify hyphens-auto">
        Access our full 360 Solutions, covering everything from application to
        arrival. Get instant language test vouchers, explore financial services,
        and invest in your future with flexible student loans. It’s all here.
      </p>

      {/* Button */}
      <div>
        <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition">
          Register Now
        </button>
      </div>
    </section>
  );
};

export default SolutionSection;
