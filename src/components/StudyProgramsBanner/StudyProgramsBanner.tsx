
const StudyProgramsBanner = () => {
  return (
    <div className="max-w-6xl mx-auto rounded-xl overflow-hidden bg-gradient-to-r from-secondary to-primary flex flex-col md:flex-row items-center px-6 md:px-20 py-8 text-white">
      
      {/* Left Side Image */}
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
        <img
          src="student-1.png" // Replace with your image path
          alt="Student"
          className="w-52 md:w-64 lg:w-72 object-cover"
        />
      </div>

      {/* Right Side Content */}
      <div className="text-center md:text-left max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Choose from 140,000+ Study Programs
        </h2>
        <p className="text-white/90 mb-6 text-justify hyphens-auto">
          Pick your programs. Apply all at once. Built-in quality checks give you a 
          <span className="font-semibold"> ~95% chance of application success.</span>
        </p>

        <button className="bg-white text-secondary font-medium py-3 px-6 rounded-lg shadow hover:bg-primary transition">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default StudyProgramsBanner;

