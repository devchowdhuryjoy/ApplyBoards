import React from "react";
import {
  FaUniversity,
  FaBed,
  FaUsers,
  FaBookReader,
} from "react-icons/fa";

// --- Simplified Types ---
interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Facility {
  title: string;
  description: string;
  image: string;
}

interface CampusLifeProps {
  universityName?: string;
  stats?: StatItem[];
  facilities?: Facility[];
}

// --- Default Data ---
const defaultStats: StatItem[] = [
  { label: "Total Students", value: "15,000+", icon: <FaUsers /> },
  { label: "Student Clubs", value: "120+", icon: <FaUniversity /> },
  { label: "Nationalities", value: "85+", icon: <FaBookReader /> },
  { label: "Dorms", value: "12", icon: <FaBed /> },
];

const defaultFacilities: Facility[] = [
  {
    title: "Student Housing",
    description: "Modern dorms with high-speed internet and comfortable lounges.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sports Complex",
    description: "Olympic-sized pool, fully equipped gym, and outdoor fields.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Library & Tech",
    description: "24/7 study pods and state-of-the-art computer labs.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1592280771800-bcf9a2a029ad?auto=format&fit=crop&w=800&q=80",
];

const CampusLife: React.FC<CampusLifeProps> = ({
  universityName = "Global University",
  stats = defaultStats,
  facilities = defaultFacilities,
}) => {
  return (
    <div className="font-sans text-slate-800 bg-white">
      
      {/* 1. Improved Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* New Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1920&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90"></div>
        </div>
        
        {/* Beautiful Typography */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
            WELCOME TO EXCELLENCE
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Life at <span className="text-blue-400">{universityName}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
            Where academic ambition meets a vibrant community. Discover a place designed for your future.
          </p>
        </div>
      </section>

      {/* 2. Stats Bar (Clean & Minimal) */}
      <section className="bg-white border-b border-slate-100 relative -mt-10 mx-6 rounded-xl shadow-lg z-20 md:mx-auto md:max-w-6xl">
        <div className="py-10 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center px-2">
                <div className="text-blue-600 text-3xl mb-3 opacity-90">{stat.icon}</div>
                <span className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Facilities (Clean Cards) */}
      <section className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">World-Class Facilities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We provide a supportive environment with everything you need to thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{facility.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {facility.description}
                  </p>
                  <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Learn more <span className="ml-2">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery (Grid) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
             <h2 className="text-3xl font-bold text-slate-900 font-serif">Campus Gallery</h2>
             <a href="#" className="text-blue-600 font-medium hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden group">
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Simple CTA */}
      <section className="py-24 px-6 bg-slate-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">Ready to start your journey?</h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Experience the atmosphere of {universityName} firsthand. Book a visit or chat with our student ambassadors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Schedule a Visit
            </button>
            <button className="border border-slate-600 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CampusLife;