// import JourneySection from "../../JourneySection/JourneySection";

// const Agent = () => {
//  const requirements = [
//     "Be committed and motivated to apply your skills effectively.",
//     "Understand the company's policies and guidelines thoroughly.",
//     "Communicate clearly with clients and team members.",
//     "Show patience, persistence, and professionalism.",
//     "Manage time efficiently and stay organized.",
//     "Handle challenges and unexpected situations calmly.",
//     "Continuously learn and improve to grow in your career.",
//     "Maintain ethical behavior and honesty at all times.",
//     "Build strong, long-term relationships with clients.",
//     "Actively listen to client needs to provide better solutions.",
//     "Be adaptable in different work scenarios.",
//     "Share knowledge and help teammates to strengthen the team.",
//     "Keep accurate records and reports.",
//     "Follow up and give feedback to improve service quality.",
//     "Dedicate focus and consistency for success as an agent."
//   ];

//   return (
//     <div className="container mx-auto p-6 space-y-6">


//       {/* Agent Header */}
//       <div className="">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Become a Professional Agent</h1>
//         <p className="text-black max-w-2xl">
//           Work with us to guide students for studying abroad. Meet the requirements below and start your journey as a professional agent.
//         </p>
//       </div>
      
//       {/* Requirements List */}
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Requirements & Qualities</h2>
//         <ul className="list-disc list-inside space-y-2 text-black">
//           {requirements.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Journey Section */}
//       <JourneySection />
//     </div>
//   );
// };

// export default Agent;




import React from "react";
import { useNavigate } from "react-router-dom";

// --- agentCard object at the end ---
const agentCard = {
  title: "Agents",
  desc: "Get support to submit quick and compliant applications, and earn your commissions.",
  btnText: "Become a partner",
  img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  btnStyle: "bg-primary text-white hover:bg-secondary",
  route: "/registration-agent",
};

const AgentCard: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <img
          src={agentCard.img}
          alt={agentCard.title}
          className="w-full h-52 object-cover"
        />
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold mb-2 text-primary">{agentCard.title}</h3>
          <p className="text-black mb-4 flex-1 text-justify hyphens-auto">
            {agentCard.desc}
          </p>
          <button
            className={`px-5 py-2 rounded-full font-medium ${agentCard.btnStyle}`}
            onClick={() => {
              scrollToTop();
              navigate(agentCard.route);
            }}
          >
            {agentCard.btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Agent: React.FC = () => {
  const requirements = [
    "Be committed and motivated to apply your skills effectively.",
    "Understand the company's policies and guidelines thoroughly.",
    "Communicate clearly with clients and team members.",
    "Show patience, persistence, and professionalism.",
    "Manage time efficiently and stay organized.",
    "Handle challenges and unexpected situations calmly.",
    "Continuously learn and improve to grow in your career.",
    "Maintain ethical behavior and honesty at all times.",
    "Build strong, long-term relationships with clients.",
    "Actively listen to client needs to provide better solutions.",
    "Be adaptable in different work scenarios.",
    "Share knowledge and help teammates to strengthen the team.",
    "Keep accurate records and reports.",
    "Follow up and give feedback to improve service quality.",
    "Dedicate focus and consistency for success as an agent."
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header section center aligned */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-4xl font-bold mb-4 text-primary">
          Become a Professional Agent
        </h1>
        <p className="text-black max-w-2xl mx-auto text-justify hyphens-auto">
          Work with us to guide students for studying abroad. Meet the requirements below and start your journey as a professional agent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Requirements List */}
        <div className="w-full lg:w-1/2 space-y-6 text-justify hyphens-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Requirements & Qualities</h2>
            <ul className="list-disc list-inside space-y-2 text-black">
              {requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Agent Card */}
        <div className="w-full lg:w-1/2 flex justify-center items-start bg-white shadow-lg rounded-lg">
          <AgentCard />
        </div>
      </div>
    </div>
  );
};

export default Agent;



