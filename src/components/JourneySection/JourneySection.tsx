

import React from "react";
import { useNavigate } from "react-router-dom";

interface Card {
  title: string;
  desc: string;
  btnText: string;
  img: string;
  btnStyle: string;
  route: string;
}

const JourneySection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const cards: Card[] = [
    {
      title: "Students",
      desc: "We’ll guide you to your dream course — from course selection to campus life.",
      btnText: "Sign up",
      img: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
      btnStyle: "bg-primary text-white hover:bg-secondary",
      route: "/registration", // Student registration
    },
    {
      title: "Agents",
      desc: "Get support to submit quick and compliant applications, and earn your commissions.",
      btnText: "Become a partner",
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      btnStyle: "bg-primary text-white hover:bg-secondary",
      route: "/registration-agent", // Agent registration
    },
    {
      title: "Institutions",
      desc: "Increase your reach and gain high-quality applications by partnering with us.",
      btnText: "Become a partner",
      img: "https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg",
      btnStyle: "bg-primary text-white hover:bg-secondary",
      route: "/University", // Institution info page
    },
  ];

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
        Start your journey with us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-2 text-primary">
                {card.title}
              </h3>
              <p className="text-black mb-4 flex-1 text-justify hyphens-auto">
                {card.desc}
              </p>
              <button
                className={`px-5 py-2 rounded-full font-medium ${card.btnStyle}`}
                onClick={() => {
                  scrollToTop(); // Scroll to top
                  navigate(card.route); // Navigate to route
                }}
              >
                {card.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneySection;
