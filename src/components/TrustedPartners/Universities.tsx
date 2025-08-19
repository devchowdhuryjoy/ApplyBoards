
import React from "react";

interface University {
  name: string;
  location: string;
  description: string;
  image: string;
  logo: string;
}

const universities: University[] = [
  {
    name: "Western University",
    location: "London, Ontario, CA",
    description:
      "Since 1878, Western University has been a choice destination for minds seeking the best education at a research university in Canada. Students at Western University can choose from over 400...",
    image:
      "student-1.png",
    logo: "student-2.png",
  },
  {
    name: "Laurentian University",
    location: "Sudbury, Ontario, CA",
    description:
      "Laurentian University was once only a regional school serving Sudbury, and while it still serves the area well, it has grown into an international leader in niches such as stressed watershed systems...",
    image:
      "student-2.png",
    logo: "student-3.png",
  },
  {
    name: "Lakehead University",
    location: "Thunder Bay, Ontario, CA",
    description:
      "Lakehead University is small enough to offer the personalized approach to supports and education that allows students to thrive. And they’re big enough to embody a truly global perspective.",
    image:
      "student-3.png",
    logo: "student-1.png",
  },
];

const Universities: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ● Featured
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <img
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    className="w-8 h-8 mr-2 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-black">{uni.location}</p>
                  </div>
                </div>
                <p className="text-black text-sm text-justify hyphens-auto">{uni.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition">
            Explore More Canadian Institutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Universities;
