// import React from "react";
// import {
//   Home,
//   FileText,
//   Search,
//   Banknote,
//   Landmark,
//   CreditCard,
//   Globe,
// } from "lucide-react";

// const services = [
//   { title: "Student Loans", icon: <Banknote className="text-yellow-500 w-6 h-6" /> },
//   { title: "Language Tests", icon: <FileText className="text-teal-500 w-6 h-6" /> },
//   { title: "Instant Applications", icon: <FileText className="text-blue-500 w-6 h-6" /> },
//   { title: "Program Search", icon: <Search className="text-purple-500 w-6 h-6" /> },
//   { title: "GIC Program", icon: <CreditCard className="text-blue-600 w-6 h-6" /> },
//   { title: "Foreign Exchange", icon: <Globe className="text-green-500 w-6 h-6" /> },
//   { title: "Banking", icon: <Landmark className="text-purple-600 w-6 h-6" /> },
//   { title: "Visa Services", icon: <CreditCard className="text-orange-500 w-6 h-6" /> },
// ];

// const SolutionServices: React.FC = () => {
//   return (
//     <section className="relative bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-12 lg:px-20">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        
//         {/* Left side - 4 services */}
//         <div className="flex flex-col gap-4 md:gap-6 items-start">
//           {services.slice(0, 4).map((service, i) => (
//             <div
//               key={i}
//               className="flex items-center bg-white shadow-md rounded-full px-5 py-3 w-fit hover:shadow-lg transition"
//             >
//               {service.icon}
//               <span className="ml-3 text-gray-700 font-medium">{service.title}</span>
//             </div>
//           ))}
//         </div>

//         {/* Center Image */}
//         <div className="relative flex justify-center">
//           <img
//             src="student-1.png"
//             alt="student"
//             className="w-72 md:w-96 relative z-10"
//           />
//           <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-blue-200 -z-10"></div>
//         </div>

//         {/* Right side - 4 services */}
//         <div className="flex flex-col gap-4 md:gap-6 items-end">
//           {services.slice(4, 8).map((service, i) => (
//             <div
//               key={i}
//               className="flex items-center bg-white shadow-md rounded-full px-5 py-3 w-fit hover:shadow-lg transition"
//             >
//               {service.icon}
//               <span className="ml-3 text-gray-700 font-medium">{service.title}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SolutionServices;


import React from "react";
import {
  Home,
  FileText,
  Search,
  Banknote,
  Landmark,
  CreditCard,
  Globe,
} from "lucide-react";

const services = [
  { title: "Student Loans", icon: <Banknote className="text-yellow-500 w-6 h-6" /> },
  { title: "Language Tests", icon: <FileText className="text-teal-500 w-6 h-6" /> },
  { title: "Instant Applications", icon: <FileText className="text-blue-500 w-6 h-6" /> },
  { title: "Program Search", icon: <Search className="text-purple-500 w-6 h-6" /> },
  { title: "GIC Program", icon: <CreditCard className="text-blue-600 w-6 h-6" /> },
  { title: "Foreign Exchange", icon: <Globe className="text-green-500 w-6 h-6" /> },
  { title: "Banking", icon: <Landmark className="text-purple-600 w-6 h-6" /> },
  { title: "Visa Services", icon: <CreditCard className="text-orange-500 w-6 h-6" /> },
];

const SolutionServices: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-12 px-4 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        
        {/* Left side - 4 services */}
        {/* Mobile: Order 2 (Below image), Desktop: Order 1 (Left) */}
        <div className="flex flex-col gap-4 md:gap-6 items-center lg:items-start order-2 lg:order-1 w-full">
          {services.slice(0, 4).map((service, i) => (
            <div
              key={i}
              className="flex items-center bg-white shadow-md rounded-full px-5 py-3 w-full max-w-xs sm:w-fit hover:shadow-lg transition cursor-pointer"
            >
              <div className="shrink-0">
                {service.icon}
              </div>
              <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">{service.title}</span>
            </div>
          ))}
        </div>

        {/* Center Image */}
        {/* Mobile: Order 1 (Top), Desktop: Order 2 (Center) */}
        <div className="relative flex justify-center order-1 lg:order-2 py-6 lg:py-0">
          {/* Responsive Image Size */}
          <img
            src="student-1.png"
            alt="student"
            className="w-64 md:w-80 lg:w-96 relative z-10 object-contain"
          />
          {/* Responsive Circle Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full border border-blue-200 -z-10"></div>
        </div>

        {/* Right side - 4 services */}
        {/* Mobile: Order 3 (Bottom), Desktop: Order 3 (Right) */}
        <div className="flex flex-col gap-4 md:gap-6 items-center lg:items-end order-3 w-full">
          {services.slice(4, 8).map((service, i) => (
            <div
              key={i}
              className="flex items-center bg-white shadow-md rounded-full px-5 py-3 w-full max-w-xs sm:w-fit hover:shadow-lg transition cursor-pointer"
            >
              <div className="shrink-0">
                {service.icon}
              </div>
              <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">{service.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SolutionServices;