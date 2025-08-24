

const SearchProgram = () => {
  return (
    <>
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ==== Left Image Area ==== */}
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            
            <img
              src="student-3.png" 
              alt="Program Search Illustration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* ==== Right Content ==== */}
        <div className="text-center lg:text-left">
          <p className="uppercase text-primary font-semibold tracking-wide mb-2">
            Search
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Select a Program
          </h3>
          <p className="text-black leading-relaxed text-lg text-justify hyphens-auto">
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Search 140,000+ programs
            </span>{" "}
            by location, start date, tuition, and more — for free. <br />
            Our comprehensive AI will help guide you with personalized results 
            to make your search easier.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}

export default SearchProgram
