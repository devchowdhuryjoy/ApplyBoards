
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaGlobe } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-light w-full py-12 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10 rounded-3xl">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-secondary">
            Your Future Goes <br />
            <span className="text-secondary">Beyond Borders</span>
          </h1>
          <p className="mt-4 text-black text-base sm:text-lg text-justify hyphens-auto">
            Explore 1,500+ global universities and colleges. Submit your best possible application with a 95% success rate. Unlock your full potential with ApplyBoard!
          </p>
          <button
            onClick={() => navigate('/registration')}
            className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md text-sm sm:text-base hover:bg-secondary transition"
          >
            Register Now
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-wrap items-center justify-center gap-4 relative">
          {[
            'student-1.png',
            'student-2.png',
            'student-3.png',
            'student-4.png',
            'student-1.png',
            'student-2.png',
          ].map((imgSrc, idx) => (
            <div
              key={idx}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 transform rotate-45 overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={imgSrc}
                alt={`student-${idx}`}
                className="-rotate-45 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gradient-to-r from-secondary to-primary rounded-3xl mt-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24 py-10 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          <span className="font-bold">18 million</span> searches and counting
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          {/* Search input */}
          <div className="flex items-center bg-white rounded-md px-3 py-2 w-full sm:w-80">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="What would you like to study? (e.g., law)"
              className="w-full text-sm text-black outline-none"
            />
          </div>

          {/* Country dropdown */}
          <div className="flex items-center bg-white rounded-md px-3 py-2 w-full sm:w-52">
            <FaGlobe className="text-gray-500 mr-2" />
            <select className="w-full bg-white text-sm text-black outline-none">
              <option>Canada</option>
              <option>U.S.A</option>
              <option>U.K.</option>
              <option>Germany</option>
              <option>Australia</option>
            </select>
          </div>

          {/* Search button */}
          <button className="bg-white text-primary px-5 py-2 rounded-md font-medium hover:bg-blue-50 transition">
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;

