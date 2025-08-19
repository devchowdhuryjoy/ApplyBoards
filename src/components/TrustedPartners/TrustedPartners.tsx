import React, { useState } from "react";

interface Country {
  name: string;
  flag: string;
}

const countries: Country[] = [
  { name: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  { name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
  { name: "Ireland", flag: "https://flagcdn.com/w40/ie.png" },
  
];

const TrustedPartners: React.FC = () => {
  const [active, setActive] = useState("United States");

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Small Heading */}
        <h4 className="text-primary text-sm md:text-base font-medium uppercase">
          Trusted Partners
        </h4>

        {/* Main Heading */}
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-secondary mt-2 mb-10 ">
          Trusted by 1,500+ Universities,
          <br />
          Colleges and Schools Worldwide
        </h2>

        {/* Country Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setActive(country.name)}
              className={`flex items-center justify-center sm:justify-start px-5 py-3 rounded-full border transition font-medium 
        ${
          active === country.name
            ? "bg-secondary text-white border-primary"
            : "bg-white text-secondary border-gray-200 hover:border-secondary"
        }
        w-full sm:w-auto
      `}
            >
              <img
                src={country.flag}
                alt={country.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              {country.name}
            </button>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default TrustedPartners;
