// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import { useNavigate } from "react-router-dom";
// import Program from "./Program";
// import {
//   FaMapMarkerAlt,
//   FaUniversity,
//   FaMoneyBillWave,
//   FaClock,
//   FaFileInvoice,
// } from "react-icons/fa";

// interface TopDiscipline {
//   discipline: string;
//   percentage: number;
// }

// interface University {
//   id?: number;
//   university_name: string;
//   address: string;
//   location: string;
//   phone_number: string;
//   founded: string;
//   school_id: string;
//   institution_type: string;
//   dli_number: string;
//   application_fee: string;
//   application_short_desc: string;
//   average_graduate_program: string;
//   average_graduate_program_short_desc: string;
//   average_undergraduate_program: string;
//   average_undergraduate_program_short_desc: string;
//   cost_of_living: string;
//   cost_of_living_short_desc: string;
//   average_gross_tuition: string;
//   average_gross_tuition_short_desc: string;
//   destinations: string;
//   top_disciplines: TopDiscipline[] | string;
//   images: string[] | any;
//   featured?: boolean;
//   created_at?: string;
//   updated_at?: string;
// }

// const UniversityApply: React.FC = () => {
//   const [universities, setUniversities] = useState<University[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const fetchUniversities = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Content-Type", "application/json");

//       const requestOptions: RequestInit = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       const response = await fetch(
//         `${BASE_URL}/university-programs/`,
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       // Normalize API response
//       let universitiesData: University[] = [];

//       if (result.data && Array.isArray(result.data)) {
//         universitiesData = result.data;
//       } else if (Array.isArray(result)) {
//         universitiesData = result;
//       } else if (result.universities && Array.isArray(result.universities)) {
//         universitiesData = result.universities;
//       } else {
//         console.warn("Unexpected API response format:", result);
//         universitiesData = [];
//       }

//       setUniversities(universitiesData);
//     } catch (err) {
//       console.error("Error fetching universities:", err);
//       setError(
//         err instanceof Error ? err.message : "Failed to fetch universities"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* Pagination state */
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const totalPages = Math.ceil(universities.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentUniversities = universities.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   useEffect(() => {
//     fetchUniversities();
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [currentPage]);

//   // Parse top_disciplines if it comes as string from API
//   const parseTopDisciplines = (
//     disciplines: string | TopDiscipline[] | any
//   ): TopDiscipline[] => {
//     if (!disciplines) return [];

//     if (typeof disciplines === "string") {
//       try {
//         const cleanedString = disciplines
//           .replace(/\n/g, "")
//           .replace(/\s+/g, " ")
//           .trim();
//         return JSON.parse(cleanedString);
//       } catch (err) {
//         console.error(
//           "Error parsing disciplines:",
//           err,
//           "Raw string:",
//           disciplines
//         );
//         return [];
//       }
//     }

//     if (Array.isArray(disciplines)) {
//       return disciplines;
//     }

//     return [];
//   };

//   const getImages = (images: any): string[] => {
//     if (!images) {
//       return ["/assets/default-university.jpg"];
//     }

//     if (Array.isArray(images)) {
//       return images
//         .filter((img) => img != null)
//         .map((img) => {
//           if (typeof img === "string") return img;
//           if (img.url) return img.url;
//           return "/assets/default-university.jpg";
//         });
//     }

//     if (typeof images === "string") {
//       try {
//         const parsed = JSON.parse(images);
//         return getImages(parsed);
//       } catch {
//         return [images];
//       }
//     }

//     return ["/assets/default-university.jpg"];
//   };

//   const getImageUrl = (imagePath: string) => {
//     if (!imagePath) return "/assets/default-university.jpg";

//     if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
//       return imagePath;
//     }

//     // Remove /api from BASE_URL for images
//     const baseUrlWithoutApi = BASE_URL.replace("/api", "");

//     if (
//       imagePath.startsWith("/storage/") ||
//       imagePath.startsWith("/images/") ||
//       imagePath.startsWith("uploads/")
//     ) {
//       return `${baseUrlWithoutApi}/${imagePath
//         .replace(/^\//, "")
//         .replace(/ /g, "%20")}`;
//     }

//     return `/assets/${imagePath}`;
//   };

//   const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
//     if (value === null || value === undefined || value === "") {
//       return defaultValue;
//     }
//     return String(value);
//   };

//   const isFeatured = (uni: University) => {
//     const featuredIds = [6, 12, 15];
//     return featuredIds.includes(uni.id || 0);
//   };

//   if (loading) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-lg">Loading universities...</div>
//         </div>
//       </section>
//     );
//   }

//   if (error && universities.length === 0) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-red-500 mb-4">Error: {error}</div>
//           <button
//             onClick={fetchUniversities}
//             className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Program />

//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Cards Grid */}
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {/* {universities.map((uni, i) => { */}
//             {currentUniversities.map((uni, i) => {
//               const disciplines = parseTopDisciplines(uni.top_disciplines);
//               const imageUrls = getImages(uni.images);
//               const mainImage = imageUrls[0];
//               const logoImage = imageUrls[1] || imageUrls[0];

//               return (
//                 <div
//                   key={uni.id || i}
//                   className="bg-white rounded-2xl  shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
//                 >
//                   {/* Header */}
//                   <div className="p-7 border-b border-gray-200">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={getImageUrl(logoImage)}
//                         alt={`${uni.university_name} logo`}
//                         className="w-14 h-14 object-contain rounded-md border shadow-sm"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "/assets/default-university.jpg";
//                         }}
//                       />
//                       <div>
//                         <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
//                           {safeDisplay(uni.university_name)}
//                         </h3>
//                         <p className="text-black text-sm mt-0.5">
//                           {safeDisplay(uni.institution_type)}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-lg font-medium text-black mt-4">
//                       🎓 {safeDisplay(uni.average_undergraduate_program)}
//                     </p>
//                   </div>

//                   {/* Quick Info */}
//                   <div className="p-7 flex flex-col gap-3 text-sm md:text-base">
//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaMapMarkerAlt className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Location:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.location)}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaUniversity className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Founded:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.founded)}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaMoneyBillWave className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Tuition:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.average_gross_tuition)}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaClock className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Duration:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.program_duration, "N/A")}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaFileInvoice className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Application Fee:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.application_fee)}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Success prediction */}
//                   <div className="p-7 border-t border-gray-200">
//                     <p className="font-semibold text-black mb-4 text-lg">
//                       📊 Success Prediction
//                     </p>
//                     <div className="flex items-center justify-around text-sm">
//                       <div className="flex flex-col items-center">
//                         <span className="font-medium">Sep 2026</span>
//                         <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
//                           {safeDisplay(
//                             uni.success_prediction_sept2026,
//                             "Average"
//                           )}
//                         </span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <span className="font-medium">Jan 2027</span>
//                         <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                           {safeDisplay(uni.success_prediction_jan2027, "High")}
//                         </span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <span className="font-medium">Sep 2027</span>
//                         <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                           {safeDisplay(uni.success_prediction_sept2027, "High")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <>
//                     {/* Bottom Button */}
//                     <div className="p-7 border-t border-gray-200">
//                       <button
//                         onClick={() => setOpen(true)}
//                         className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary"
//                       >
//                         Create Application
//                       </button>
//                     </div>

//                     {/* Popup Modal */}
//                     {open && (
//                       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//                         <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-fadeIn">
//                           {/* Close */}
//                           <button
//                             onClick={() => setOpen(false)}
//                             className="absolute top-4 right-4 text-gray-500 text-xl"
//                           >
//                             ✕
//                           </button>

//                           <h2 className="text-xl font-bold text-center text-[#252364]">
//                             Continue as
//                           </h2>
//                           <p className="text-center text-gray-500 text-sm mt-1">
//                             Select how you want to register
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             {/* Student */}
//                             <button
//                               onClick={() => navigate("/login")}
//                               className="w-full border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-[#252364] hover:text-white transition"
//                             >
//                               🎓 Student
//                             </button>

//                             {/* Agent */}
//                             <button
//                               onClick={() => navigate("/login-agent")}
//                               className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
//                             >
//                               🧑‍💼 Agent
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Empty State */}
//           {universities.length === 0 && !loading && (
//             <div className="text-center py-10">
//               <p className="text-black">No universities found.</p>
//               <button
//                 onClick={fetchUniversities}
//                 className="mt-4 bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2 mt-8">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg border ${
//                 currentPage === i + 1 ? "bg-primary text-white" : "bg-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default UniversityApply;


// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import { useNavigate } from "react-router-dom";
// import Program from "./Program";
// import {
//   FaMapMarkerAlt,
//   FaUniversity,
//   FaMoneyBillWave,
//   FaClock,
//   FaFileInvoice,
//   FaFileAlt,      
//   FaCalendarAlt,  
//   FaChartBar,    
//   FaChartLine
// } from "react-icons/fa";

// interface TopDiscipline {
//   discipline: string;
//   percentage: number;
// }

// interface University {
//   id?: number;
//   university_name: string;
//   address: string;
//   location: string;
//   phone_number: string;
//   founded: string;
//   school_id: string;
//   institution_type: string;
//   dli_number: string;
//   application_fee: string;
//   application_short_desc: string;
//   average_graduate_program: string;
//   average_graduate_program_short_desc: string;
//   average_undergraduate_program: string;
//   average_undergraduate_program_short_desc: string;
//   cost_of_living: string;
//   cost_of_living_short_desc: string;
//   average_gross_tuition: string;
//   average_gross_tuition_short_desc: string;
//   destinations: string;
//   top_disciplines: TopDiscipline[] | string;
//   images: string[] | any;
//   featured?: boolean;
//   created_at?: string;
//   updated_at?: string;
// }

// const UniversityApply: React.FC = () => {
//   const [universities, setUniversities] = useState<University[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const fetchUniversities = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Content-Type", "application/json");

//       const requestOptions: RequestInit = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       const response = await fetch(
//         `${BASE_URL}/university-programs/`,
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       // Normalize API response
//       let universitiesData: University[] = [];

//       if (result.data && Array.isArray(result.data)) {
//         universitiesData = result.data;
//       } else if (Array.isArray(result)) {
//         universitiesData = result;
//       } else if (result.universities && Array.isArray(result.universities)) {
//         universitiesData = result.universities;
//       } else {
//         console.warn("Unexpected API response format:", result);
//         universitiesData = [];
//       }

//       setUniversities(universitiesData);
//     } catch (err) {
//       console.error("Error fetching universities:", err);
//       setError(
//         err instanceof Error ? err.message : "Failed to fetch universities"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* Pagination state */
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const totalPages = Math.ceil(universities.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentUniversities = universities.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   useEffect(() => {
//     fetchUniversities();
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [currentPage]);

//   // Parse top_disciplines if it comes as string from API
//   const parseTopDisciplines = (
//     disciplines: string | TopDiscipline[] | any
//   ): TopDiscipline[] => {
//     if (!disciplines) return [];

//     if (typeof disciplines === "string") {
//       try {
//         const cleanedString = disciplines
//           .replace(/\n/g, "")
//           .replace(/\s+/g, " ")
//           .trim();
//         return JSON.parse(cleanedString);
//       } catch (err) {
//         console.error(
//           "Error parsing disciplines:",
//           err,
//           "Raw string:",
//           disciplines
//         );
//         return [];
//       }
//     }

//     if (Array.isArray(disciplines)) {
//       return disciplines;
//     }

//     return [];
//   };

//   const getImages = (images: any): string[] => {
//     if (!images) {
//       return ["/assets/default-university.jpg"];
//     }

//     if (Array.isArray(images)) {
//       return images
//         .filter((img) => img != null)
//         .map((img) => {
//           if (typeof img === "string") return img;
//           if (img.url) return img.url;
//           return "/assets/default-university.jpg";
//         });
//     }

//     if (typeof images === "string") {
//       try {
//         const parsed = JSON.parse(images);
//         return getImages(parsed);
//       } catch {
//         return [images];
//       }
//     }

//     return ["/assets/default-university.jpg"];
//   };

//   const getImageUrl = (imagePath: string) => {
//     if (!imagePath) return "/assets/default-university.jpg";

//     if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
//       return imagePath;
//     }

//     // Remove /api from BASE_URL for images
//     const baseUrlWithoutApi = BASE_URL.replace("/api", "");

//     if (
//       imagePath.startsWith("/storage/") ||
//       imagePath.startsWith("/images/") ||
//       imagePath.startsWith("uploads/")
//     ) {
//       return `${baseUrlWithoutApi}/${imagePath
//         .replace(/^\//, "")
//         .replace(/ /g, "%20")}`;
//     }

//     return `/assets/${imagePath}`;
//   };

//   const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
//     if (value === null || value === undefined || value === "") {
//       return defaultValue;
//     }
//     return String(value);
//   };

//   const isFeatured = (uni: University) => {
//     const featuredIds = [6, 12, 15];
//     return featuredIds.includes(uni.id || 0);
//   };

//   if (loading) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-lg">Loading universities...</div>
//         </div>
//       </section>
//     );
//   }

//   if (error && universities.length === 0) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-red-500 mb-4">Error: {error}</div>
//           <button
//             onClick={fetchUniversities}
//             className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Program />

//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Cards Grid */}
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {/* {universities.map((uni, i) => { */}
//             {currentUniversities.map((uni, i) => {
//               const disciplines = parseTopDisciplines(uni.top_disciplines);
//               const imageUrls = getImages(uni.images);
//               const mainImage = imageUrls[0];
//               const logoImage = imageUrls[1] || imageUrls[0];

//               return (
//                 <div
//                   key={uni.id || i}
//                   className="bg-white rounded-2xl  shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
//                 >
//                   {/* Header */}
//                   <div className="p-7 border-b border-gray-200">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={getImageUrl(logoImage)}
//                         alt={`${uni.university_name} logo`}
//                         className="w-14 h-14 object-contain rounded-md border shadow-sm"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "/assets/default-university.jpg";
//                         }}
//                       />
//                       <div>
//                         <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
//                           {safeDisplay(uni.university_name)}
//                         </h3>
//                         <p className="text-black text-sm mt-0.5">
//                           {safeDisplay(uni.institution_type)}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-lg font-medium text-black mt-4">
//                       🎓 {safeDisplay(uni.program_name)}
//                     </p>
//                   </div>

//                   {/* Quick Info */}
//                   <div className="p-7 flex flex-col gap-3 text-sm md:text-base">
//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaMapMarkerAlt className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Location:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.location)}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaMoneyBillWave className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Tuition:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.average_gross_tuition)}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaClock className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Duration:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.duration, "N/A")}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaFileInvoice className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Application Fee:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.application_fee)}
//                       </span>
//                     </p>

//                     {/* Intake Info */}
//                     <p className="flex items-center gap-2 leading-relaxed">
//                       <FaFileAlt className="text-black" />
//                       <strong className="text-black mr-2 whitespace-nowrap">
//                         Intake:
//                       </strong>
//                       <span className="text-black">
//                         {safeDisplay(uni.intake_name, "N/A")}
//                       </span>
//                     </p>

//                     {/* Intake Months */}
//                     {uni.intake_months && uni.intake_months.length > 0 && (
//                       <p className="flex items-center gap-2 leading-relaxed">
//                         <FaCalendarAlt className="text-black" />
//                         <strong className="text-black mr-2 whitespace-nowrap">
//                           Intake Months:
//                         </strong>
//                         <span className="text-black">
//                           {uni.intake_months
//                             .map((intake) => intake.month)
//                             .join(", ")}
//                         </span>
//                       </p>
//                     )}
//                   </div>

//                   {/* Success Chance */}
//                   <div className="p-7 border-t border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <p className="font-semibold text-black text-lg flex items-center gap-2">
//                         <FaChartBar className="text-black" />
//                         Success Chance
//                       </p>
//                       <div className="flex items-center space-x-2">
//                         <span
//                           className={`w-3 h-3 rounded-full ${
//                             uni.success_chance === "High"
//                               ? "bg-green-600"
//                               : uni.success_chance === "Medium"
//                               ? "bg-yellow-500"
//                               : "bg-gray-400"
//                           }`}
//                         ></span>
//                         <span className="text-sm font-medium text-black">
//                           {safeDisplay(uni.success_chance, "N/A")}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Success Prediction */}
//                     {uni.success_prediction_sept2026 ||
//                     uni.success_prediction_jan2027 ||
//                     uni.success_prediction_sept2027 ? (
//                       <>
//                         <p className="font-semibold text-black mb-4 text-lg flex items-center gap-2">
//                           <FaChartLine className="text-black" />
//                           Success Prediction
//                         </p>
//                         <div className="flex items-center justify-around text-sm">
//                           {uni.success_prediction_sept2026 && (
//                             <div className="flex flex-col items-center">
//                               <span className="font-medium">Sep 2026</span>
//                               <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
//                                 {safeDisplay(
//                                   uni.success_prediction_sept2026,
//                                   "Average"
//                                 )}
//                               </span>
//                             </div>
//                           )}
//                           {uni.success_prediction_jan2027 && (
//                             <div className="flex flex-col items-center">
//                               <span className="font-medium">Jan 2027</span>
//                               <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                                 {safeDisplay(
//                                   uni.success_prediction_jan2027,
//                                   "High"
//                                 )}
//                               </span>
//                             </div>
//                           )}
//                           {uni.success_prediction_sept2027 && (
//                             <div className="flex flex-col items-center">
//                               <span className="font-medium">Sep 2027</span>
//                               <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                                 {safeDisplay(
//                                   uni.success_prediction_sept2027,
//                                   "High"
//                                 )}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </>
//                     ) : null}
//                   </div>

//                   <>
//                     {/* Bottom Button */}
//                     <div className="p-7 border-t border-gray-200">
//                       <button
//                         onClick={() => setOpen(true)}
//                         className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary"
//                       >
//                         Create Application
//                       </button>
//                     </div>

//                     {/* Popup Modal */}
//                     {open && (
//                       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//                         <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-fadeIn">
//                           {/* Close */}
//                           <button
//                             onClick={() => setOpen(false)}
//                             className="absolute top-4 right-4 text-gray-500 text-xl"
//                           >
//                             ✕
//                           </button>

//                           <h2 className="text-xl font-bold text-center text-[#252364]">
//                             Continue as
//                           </h2>
//                           <p className="text-center text-gray-500 text-sm mt-1">
//                             Select how you want to register
//                           </p>

//                           <div className="mt-6 space-y-4">
//                             {/* Student */}
//                             <button
//                               onClick={() => navigate("/login")}
//                               className="w-full border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-[#252364] hover:text-white transition"
//                             >
//                               🎓 Student
//                             </button>

//                             {/* Agent */}
//                             <button
//                               onClick={() => navigate("/login-agent")}
//                               className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
//                             >
//                               🧑‍💼 Agent
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Empty State */}
//           {universities.length === 0 && !loading && (
//             <div className="text-center py-10">
//               <p className="text-black">No universities found.</p>
//               <button
//                 onClick={fetchUniversities}
//                 className="mt-4 bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2 mt-8">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg border ${
//                 currentPage === i + 1 ? "bg-primary text-white" : "bg-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default UniversityApply;



// import React, { useState, useEffect, useRef } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import { useNavigate } from "react-router-dom";
// import Program, { ProgramHandle } from "./Program";
// import {
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaClock,
//   FaFileInvoice,
//   FaFileAlt,      
//   FaCalendarAlt,  
//   FaChartBar,    
//   FaChartLine
// } from "react-icons/fa";

// interface TopDiscipline {
//   discipline: string;
//   percentage: number;
// }

// interface IntakeMonth {
//   month: string;
// }

// interface ProgramType {
//   id: number;
//   university_name: string;
//   program_name: string;
//   location: string;
//   average_gross_tuition: string;
//   duration: string;
//   application_fee: string;
//   intake_name: string;
//   intake_months: IntakeMonth[];
//   success_chance: string;
//   success_prediction_sept2026?: string;
//   success_prediction_jan2027?: string;
//   success_prediction_sept2027?: string;
//   institution_type: string;
//   destination_id?: number;
//   university_id?: number;
//   program_level_id?: number;
//   study_field_id?: number;
//   intake_id?: number;
//   program_tag_id?: string;
//   images?: string[] | any;
//   featured?: boolean;
// }

// interface FilterOptions {
//   destinationId?: string;
//   universityId?: string;
//   programLevelId?: string;
//   studyFieldId?: string;
//   intakeId?: string;
//   programTagId?: string;
//   searchQuery?: string;
// }

// const UniversityApply: React.FC = () => {
//   const [allPrograms, setAllPrograms] = useState<ProgramType[]>([]);
//   const [filteredPrograms, setFilteredPrograms] = useState<ProgramType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
  
//   // Filter states
//   const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  
//   // Ref for Program component
//   const programRef = useRef<ProgramHandle>(null);

//   const fetchPrograms = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Content-Type", "application/json");

//       // Get token from localStorage
//       const auth = localStorage.getItem("auth");
//       if (auth) {
//         try {
//           const authData = JSON.parse(auth);
//           if (authData.token) {
//             myHeaders.append("Authorization", `Bearer ${authData.token}`);
//           }
//         } catch (e) {
//           console.error("Error parsing auth data:", e);
//         }
//       }

//       const requestOptions: RequestInit = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       const response = await fetch(
//         `${BASE_URL}/university-programs/`,
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       // Normalize API response
//       let programsData: ProgramType[] = [];

//       if (result.data && Array.isArray(result.data)) {
//         programsData = result.data;
//       } else if (Array.isArray(result)) {
//         programsData = result;
//       } else if (result.programs && Array.isArray(result.programs)) {
//         programsData = result.programs;
//       } else {
//         console.warn("Unexpected API response format:", result);
//         programsData = [];
//       }

//       setAllPrograms(programsData);
//       setFilteredPrograms(programsData);
//     } catch (err) {
//       console.error("Error fetching programs:", err);
//       setError(
//         err instanceof Error ? err.message : "Failed to fetch programs"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (filters: FilterOptions) => {
//     console.log("Filters received:", filters);
//     setActiveFilters(filters);
    
//     if (Object.keys(filters).length === 0) {
//       // No filters, show all programs
//       setFilteredPrograms(allPrograms);
//       return;
//     }

//     let filtered = [...allPrograms];

//     // Apply destination filter
//     if (filters.destinationId) {
//       filtered = filtered.filter(program => 
//         program.destination_id?.toString() === filters.destinationId
//       );
//     }

//     // Apply university filter
//     if (filters.universityId) {
//       filtered = filtered.filter(program => 
//         program.university_id?.toString() === filters.universityId
//       );
//     }

//     // Apply program level filter
//     if (filters.programLevelId) {
//       filtered = filtered.filter(program => 
//         program.program_level_id?.toString() === filters.programLevelId
//       );
//     }

//     // Apply study field filter
//     if (filters.studyFieldId) {
//       filtered = filtered.filter(program => 
//         program.study_field_id?.toString() === filters.studyFieldId
//       );
//     }

//     // Apply intake filter
//     if (filters.intakeId) {
//       filtered = filtered.filter(program => 
//         program.intake_id?.toString() === filters.intakeId
//       );
//     }

//     // Apply program tag filter
//     if (filters.programTagId) {
//       filtered = filtered.filter(program => 
//         program.program_tag_id?.toString() === filters.programTagId
//       );
//     }

//     // Apply search query filter
//     if (filters.searchQuery) {
//       const query = filters.searchQuery.toLowerCase();
//       filtered = filtered.filter(program => 
//         program.program_name?.toLowerCase().includes(query) ||
//         program.university_name?.toLowerCase().includes(query) ||
//         program.location?.toLowerCase().includes(query)
//       );
//     }

//     console.log("Filtered programs:", filtered);
//     setFilteredPrograms(filtered);
    
//     // Scroll to top when filters change
//     if (programRef.current) {
//       programRef.current.scrollToTop();
//     }
//   };

//   /* Pagination state */
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentPrograms = filteredPrograms.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   useEffect(() => {
//     fetchPrograms();
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   useEffect(() => {
//     // Reset to page 1 when filters change
//     setCurrentPage(1);
//   }, [activeFilters]);

//   const getImageUrl = (imagePath: string) => {
//     if (!imagePath) return "/assets/default-university.jpg";

//     if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
//       return imagePath;
//     }

//     // Remove /api from BASE_URL for images
//     const baseUrlWithoutApi = BASE_URL.replace("/api", "");

//     if (
//       imagePath.startsWith("/storage/") ||
//       imagePath.startsWith("/images/") ||
//       imagePath.startsWith("uploads/")
//     ) {
//       return `${baseUrlWithoutApi}/${imagePath
//         .replace(/^\//, "")
//         .replace(/ /g, "%20")}`;
//     }

//     return `/assets/${imagePath}`;
//   };

//   const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
//     if (value === null || value === undefined || value === "") {
//       return defaultValue;
//     }
//     return String(value);
//   };

//   const getImages = (images: any): string[] => {
//     if (!images) {
//       return ["/assets/default-university.jpg"];
//     }

//     if (Array.isArray(images)) {
//       return images
//         .filter((img) => img != null)
//         .map((img) => {
//           if (typeof img === "string") return img;
//           if (img.url) return img.url;
//           return "/assets/default-university.jpg";
//         });
//     }

//     if (typeof images === "string") {
//       try {
//         const parsed = JSON.parse(images);
//         return getImages(parsed);
//       } catch {
//         return [images];
//       }
//     }

//     return ["/assets/default-university.jpg"];
//   };

//   if (loading && allPrograms.length === 0) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-lg">Loading programs...</div>
//         </div>
//       </section>
//     );
//   }

//   if (error && allPrograms.length === 0) {
//     return (
//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="text-red-500 mb-4">Error: {error}</div>
//           <button
//             onClick={fetchPrograms}
//             className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Program ref={programRef} onFilterChange={handleFilterChange} />

//       <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Results Info */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Available Programs
//             </h2>
//             <p className="text-gray-600 mt-1">
//               Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
//               {Object.keys(activeFilters).length > 0 && ' with applied filters'}
//             </p>
//           </div>

//           {/* Cards Grid */}
//           {filteredPrograms.length > 0 ? (
//             <>
//               <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {currentPrograms.map((program, i) => {
//                   const imageUrls = getImages(program.images);
//                   const mainImage = imageUrls[0];
//                   const logoImage = imageUrls[1] || imageUrls[0];

//                   return (
//                     <div
//                       key={program.id || i}
//                       className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
//                     >
//                       {/* Header */}
//                       <div className="p-7 border-b border-gray-200">
//                         <div className="flex items-center space-x-4">
//                           <img
//                             src={getImageUrl(logoImage)}
//                             alt={`${program.university_name} logo`}
//                             className="w-14 h-14 object-contain rounded-md border shadow-sm"
//                             onError={(e) => {
//                               e.currentTarget.src =
//                                 "/assets/default-university.jpg";
//                             }}
//                           />
//                           <div>
//                             <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
//                               {safeDisplay(program.university_name)}
//                             </h3>
//                             <p className="text-black text-sm mt-0.5">
//                               {safeDisplay(program.institution_type)}
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-lg font-medium text-black mt-4">
//                           🎓 {safeDisplay(program.program_name)}
//                         </p>
//                       </div>

//                       {/* Quick Info */}
//                       <div className="p-7 flex flex-col gap-3 text-sm md:text-base">
//                         <p className="flex items-center gap-2 leading-relaxed">
//                           <FaMapMarkerAlt className="text-black" />
//                           <strong className="text-black mr-2 whitespace-nowrap">
//                             Location:
//                           </strong>
//                           <span className="text-black">
//                             {safeDisplay(program.location)}
//                           </span>
//                         </p>

//                         <p className="flex items-center gap-2 leading-relaxed">
//                           <FaMoneyBillWave className="text-black" />
//                           <strong className="text-black mr-2 whitespace-nowrap">
//                             Tuition:
//                           </strong>
//                           <span className="text-black">
//                             {safeDisplay(program.average_gross_tuition)}
//                           </span>
//                         </p>

//                         <p className="flex items-center gap-2 leading-relaxed">
//                           <FaClock className="text-black" />
//                           <strong className="text-black mr-2 whitespace-nowrap">
//                             Duration:
//                           </strong>
//                           <span className="text-black">
//                             {safeDisplay(program.duration, "N/A")}
//                           </span>
//                         </p>

//                         <p className="flex items-center gap-2 leading-relaxed">
//                           <FaFileInvoice className="text-black" />
//                           <strong className="text-black mr-2 whitespace-nowrap">
//                             Application Fee:
//                           </strong>
//                           <span className="text-black">
//                             {safeDisplay(program.application_fee)}
//                           </span>
//                         </p>

//                         {/* Intake Info */}
//                         <p className="flex items-center gap-2 leading-relaxed">
//                           <FaFileAlt className="text-black" />
//                           <strong className="text-black mr-2 whitespace-nowrap">
//                             Intake:
//                           </strong>
//                           <span className="text-black">
//                             {safeDisplay(program.intake_name, "N/A")}
//                           </span>
//                         </p>

//                         {/* Intake Months */}
//                         {program.intake_months && program.intake_months.length > 0 && (
//                           <p className="flex items-center gap-2 leading-relaxed">
//                             <FaCalendarAlt className="text-black" />
//                             <strong className="text-black mr-2 whitespace-nowrap">
//                               Intake Months:
//                             </strong>
//                             <span className="text-black">
//                               {program.intake_months
//                                 .map((intake) => intake.month)
//                                 .join(", ")}
//                             </span>
//                           </p>
//                         )}
//                       </div>

//                       {/* Success Chance */}
//                       <div className="p-7 border-t border-gray-200">
//                         <div className="flex items-center justify-between mb-4">
//                           <p className="font-semibold text-black text-lg flex items-center gap-2">
//                             <FaChartBar className="text-black" />
//                             Success Chance
//                           </p>
//                           <div className="flex items-center space-x-2">
//                             <span
//                               className={`w-3 h-3 rounded-full ${
//                                 program.success_chance === "High"
//                                   ? "bg-green-600"
//                                   : program.success_chance === "Medium"
//                                   ? "bg-yellow-500"
//                                   : "bg-gray-400"
//                               }`}
//                             ></span>
//                             <span className="text-sm font-medium text-black">
//                               {safeDisplay(program.success_chance, "N/A")}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Success Prediction */}
//                         {program.success_prediction_sept2026 ||
//                         program.success_prediction_jan2027 ||
//                         program.success_prediction_sept2027 ? (
//                           <>
//                             <p className="font-semibold text-black mb-4 text-lg flex items-center gap-2">
//                               <FaChartLine className="text-black" />
//                               Success Prediction
//                             </p>
//                             <div className="flex items-center justify-around text-sm">
//                               {program.success_prediction_sept2026 && (
//                                 <div className="flex flex-col items-center">
//                                   <span className="font-medium">Sep 2026</span>
//                                   <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
//                                     {safeDisplay(
//                                       program.success_prediction_sept2026,
//                                       "Average"
//                                     )}
//                                   </span>
//                                 </div>
//                               )}
//                               {program.success_prediction_jan2027 && (
//                                 <div className="flex flex-col items-center">
//                                   <span className="font-medium">Jan 2027</span>
//                                   <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                                     {safeDisplay(
//                                       program.success_prediction_jan2027,
//                                       "High"
//                                     )}
//                                   </span>
//                                 </div>
//                               )}
//                               {program.success_prediction_sept2027 && (
//                                 <div className="flex flex-col items-center">
//                                   <span className="font-medium">Sep 2027</span>
//                                   <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
//                                     {safeDisplay(
//                                       program.success_prediction_sept2027,
//                                       "High"
//                                     )}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           </>
//                         ) : null}
//                       </div>

//                       {/* Bottom Button */}
//                       <div className="p-7 border-t border-gray-200">
//                         <button
//                           onClick={() => setOpen(true)}
//                           className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary"
//                         >
//                           Create Application
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-2 mt-8">
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
//                   >
//                     Prev
//                   </button>

//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`px-4 py-2 rounded-lg border ${
//                         currentPage === i + 1 
//                           ? "bg-primary text-white border-primary" 
//                           : "bg-white border-gray-300 hover:bg-gray-50"
//                       } transition`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             /* No Programs Found */
//             <div className="text-center py-16">
//               <div className="max-w-md mx-auto">
//                 <div className="text-6xl mb-4">🎓</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                   No Programs Found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {Object.keys(activeFilters).length > 0
//                     ? "Try adjusting your filters to see more results."
//                     : "There are currently no programs available."}
//                 </p>
//                 {Object.keys(activeFilters).length > 0 && (
//                   <button
//                     onClick={() => {
//                       // Clear filters by calling handleFilterChange with empty object
//                       handleFilterChange({});
//                       // Also clear filters in Program component
//                       const event = new Event('clearFilters');
//                       window.dispatchEvent(event);
//                     }}
//                     className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//                   >
//                     Clear All Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Popup Modal */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//           <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-fadeIn">
//             {/* Close */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-center text-[#252364]">
//               Continue as
//             </h2>
//             <p className="text-center text-gray-500 text-sm mt-1">
//               Select how you want to register
//             </p>

//             <div className="mt-6 space-y-4">
//               {/* Student */}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="w-full border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-[#252364] hover:text-white transition duration-300"
//               >
//                 🎓 Student
//               </button>

//               {/* Agent */}
//               <button
//                 onClick={() => navigate("/login-agent")}
//                 className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
//               >
//                 🧑‍💼 Agent
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UniversityApply;




import React, { useState, useEffect, useRef } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import { useNavigate } from "react-router-dom";
import Program, { ProgramHandle } from "./Program";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoice,
  FaFileAlt,      
  FaCalendarAlt,  
  FaChartBar,    
  FaChartLine
} from "react-icons/fa";

interface TopDiscipline {
  discipline: string;
  percentage: number;
}

interface IntakeMonth {
  month: string;
}

interface ProgramType {
  id: number;
  university_name: string;
  program_name: string;
  location: string;
  average_gross_tuition: string;
  duration: string;
  application_fee: string;
  intake_name: string;
  intake_months: IntakeMonth[];
  success_chance: string;
  success_prediction_sept2026?: string;
  success_prediction_jan2027?: string;
  success_prediction_sept2027?: string;
  institution_type: string;
  destination_id?: number;
  destination_name?: string; // এই ফিল্ড যোগ করুন
  university_id?: number;
  program_level_id?: number;
  study_field_id?: number;
  intake_id?: number;
  program_tag_id?: string;
  images?: string[] | any;
  featured?: boolean;
}

interface FilterOptions {
  destinationId?: string;
  universityId?: string;
  programLevelId?: string;
  studyFieldId?: string;
  intakeId?: string;
  programTagId?: string;
  searchQuery?: string;
}

interface Destination {
  id: number;
  destinations_name: string;
  universities: Array<{
    id: number;
    university_name: string;
  }>;
}

const UniversityApply: React.FC = () => {
  const [allPrograms, setAllPrograms] = useState<ProgramType[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  
  // State for destinations
  const [destinations, setDestinations] = useState<Destination[]>([]);
  
  // Ref for Program component
  const programRef = useRef<ProgramHandle>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      // Get token from localStorage
      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          if (authData.token) {
            myHeaders.append("Authorization", `Bearer ${authData.token}`);
          }
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/university-programs/`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response for programs:", result);

      // Normalize API response
      let programsData: ProgramType[] = [];

      if (result.data && Array.isArray(result.data)) {
        programsData = result.data;
      } else if (Array.isArray(result)) {
        programsData = result;
      } else if (result.programs && Array.isArray(result.programs)) {
        programsData = result.programs;
      } else {
        console.warn("Unexpected API response format:", result);
        programsData = [];
      }

      console.log("Programs loaded:", programsData);
      console.log("First program:", programsData[0]);
      
      // Check what fields are available in programs
      if (programsData.length > 0) {
        const sampleProgram = programsData[0];
        console.log("Available fields in program:", Object.keys(sampleProgram));
        console.log("Sample program destination_id:", sampleProgram.destination_id);
        console.log("Sample program destination_name:", sampleProgram.destination_name);
      }

      setAllPrograms(programsData);
      setFilteredPrograms(programsData);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch programs"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          if (authData.token) {
            myHeaders.append("Authorization", `Bearer ${authData.token}`);
          }
        } catch (e) {
          console.error("Error parsing auth data:", e);
        }
      }

      const response = await fetch(
        `${BASE_URL}/all/destination/filter`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Destinations API Response:", result);
        
        let destinationsData: Destination[] = [];
        
        if (result.data && Array.isArray(result.data)) {
          destinationsData = result.data;
        } else if (Array.isArray(result)) {
          destinationsData = result;
        } else if (result.destinations && Array.isArray(result.destinations)) {
          destinationsData = result.destinations;
        }
        
        console.log("Destinations loaded:", destinationsData);
        setDestinations(destinationsData);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  // Handle filter changes - FIXED VERSION
  const handleFilterChange = (filters: FilterOptions) => {
    console.log("=== FILTERS RECEIVED ===", filters);
    setActiveFilters(filters);
    
    if (Object.keys(filters).length === 0) {
      console.log("No filters, showing all programs");
      setFilteredPrograms(allPrograms);
      return;
    }

    let filtered = [...allPrograms];
    
    console.log(`Starting with ${filtered.length} programs`);

    // Apply destination filter - MOST IMPORTANT FIX
    if (filters.destinationId && filters.destinationId !== "") {
      console.log(`🔍 FILTERING BY DESTINATION ID: ${filters.destinationId}`);
      
      // Find destination name
      const selectedDestination = destinations.find(d => 
        d.id.toString() === filters.destinationId
      );
      
      const destinationName = selectedDestination?.destinations_name;
      console.log(`Destination name: ${destinationName}`);
      
      // Get university IDs from this destination
      const destinationUniversityIds = selectedDestination?.universities?.map(u => u.id.toString()) || [];
      console.log(`University IDs in this destination:`, destinationUniversityIds);
      
      // Filter programs
      filtered = filtered.filter(program => {
        // Method 1: Check if program's university_id is in destination's universities array
        if (program.university_id && destinationUniversityIds.includes(program.university_id.toString())) {
          console.log(`✓ Program ${program.id} matched by university_id ${program.university_id}`);
          return true;
        }
        
        // Method 2: Check destination_id directly
        if (program.destination_id?.toString() === filters.destinationId) {
          console.log(`✓ Program ${program.id} matched by destination_id ${program.destination_id}`);
          return true;
        }
        
        // Method 3: Check destination_name if available
        if (program.destination_name && destinationName && 
            program.destination_name.toLowerCase() === destinationName.toLowerCase()) {
          console.log(`✓ Program ${program.id} matched by destination_name "${program.destination_name}"`);
          return true;
        }
        
        // Method 4: Check location contains destination name
        if (destinationName && program.location?.toLowerCase().includes(destinationName.toLowerCase())) {
          console.log(`✓ Program ${program.id} matched by location "${program.location}"`);
          return true;
        }
        
        // Method 5: Check university name contains destination name
        if (destinationName && program.university_name?.toLowerCase().includes(destinationName.toLowerCase())) {
          console.log(`✓ Program ${program.id} matched by university_name "${program.university_name}"`);
          return true;
        }
        
        return false;
      });
      
      console.log(`After destination filter: ${filtered.length} programs found`);
    }

    // Apply university filter
    if (filters.universityId && filters.universityId !== "") {
      console.log(`Filtering by university ID: ${filters.universityId}`);
      filtered = filtered.filter(program => 
        program.university_id?.toString() === filters.universityId
      );
      console.log(`After university filter: ${filtered.length} programs`);
    }

    // Apply program level filter
    if (filters.programLevelId && filters.programLevelId !== "") {
      filtered = filtered.filter(program => 
        program.program_level_id?.toString() === filters.programLevelId
      );
    }

    // Apply study field filter
    if (filters.studyFieldId && filters.studyFieldId !== "") {
      filtered = filtered.filter(program => 
        program.study_field_id?.toString() === filters.studyFieldId
      );
    }

    // Apply intake filter
    if (filters.intakeId && filters.intakeId !== "") {
      filtered = filtered.filter(program => 
        program.intake_id?.toString() === filters.intakeId
      );
    }

    // Apply program tag filter
    if (filters.programTagId && filters.programTagId !== "") {
      filtered = filtered.filter(program => 
        program.program_tag_id?.toString() === filters.programTagId
      );
    }

    // Apply search query filter
    if (filters.searchQuery && filters.searchQuery !== "") {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(program => 
        program.program_name?.toLowerCase().includes(query) ||
        program.university_name?.toLowerCase().includes(query) ||
        program.location?.toLowerCase().includes(query)
      );
    }

    console.log("=== FINAL FILTERED PROGRAMS ===");
    console.log("Count:", filtered.length);
    console.log("Programs:", filtered.map(p => ({
      id: p.id,
      university: p.university_name,
      university_id: p.university_id,
      destination_id: p.destination_id,
      destination_name: p.destination_name,
      location: p.location
    })));
    
    setFilteredPrograms(filtered);
    
    // Scroll to top when filters change
    if (programRef.current) {
      programRef.current.scrollToTop();
    }
  };

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchPrograms(),
        fetchDestinations()
      ]);
      
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    
    loadData();
  }, []);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [activeFilters]);

  // Debug useEffect
  useEffect(() => {
    console.log("=== DEBUG INFO ===");
    console.log("All programs count:", allPrograms.length);
    console.log("Filtered programs count:", filteredPrograms.length);
    console.log("Destinations count:", destinations.length);
    
    if (destinations.length > 0) {
      console.log("First destination:", destinations[0]);
      console.log("Universities in first destination:", destinations[0].universities);
    }
    
    if (allPrograms.length > 0) {
      const sampleProgram = allPrograms[0];
      console.log("Sample program fields:", {
        id: sampleProgram.id,
        university_name: sampleProgram.university_name,
        university_id: sampleProgram.university_id,
        destination_id: sampleProgram.destination_id,
        destination_name: sampleProgram.destination_name,
        location: sampleProgram.location
      });
    }
  }, [allPrograms, filteredPrograms, destinations]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/assets/default-university.jpg";

    if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
      return imagePath;
    }

    // Remove /api from BASE_URL for images
    const baseUrlWithoutApi = BASE_URL.replace("/api", "");

    if (
      imagePath.startsWith("/storage/") ||
      imagePath.startsWith("/images/") ||
      imagePath.startsWith("uploads/")
    ) {
      return `${baseUrlWithoutApi}/${imagePath
        .replace(/^\//, "")
        .replace(/ /g, "%20")}`;
    }

    return `/assets/${imagePath}`;
  };

  const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
    if (value === null || value === undefined || value === "") {
      return defaultValue;
    }
    return String(value);
  };

  const getImages = (images: any): string[] => {
    if (!images) {
      return ["/assets/default-university.jpg"];
    }

    if (Array.isArray(images)) {
      return images
        .filter((img) => img != null)
        .map((img) => {
          if (typeof img === "string") return img;
          if (img.url) return img.url;
          return "/assets/default-university.jpg";
        });
    }

    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        return getImages(parsed);
      } catch {
        return [images];
      }
    }

    return ["/assets/default-university.jpg"];
  };

  if (loading && allPrograms.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg">Loading programs...</div>
        </div>
      </section>
    );
  }

  if (error && allPrograms.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={fetchPrograms}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Program ref={programRef} onFilterChange={handleFilterChange} />

      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Programs
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
              {Object.keys(activeFilters).length > 0 && ' with applied filters'}
              {activeFilters.destinationId && ` for ${destinations.find(d => d.id.toString() === activeFilters.destinationId)?.destinations_name}`}
            </p>
          </div>

          {/* Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentPrograms.map((program, i) => {
                  const imageUrls = getImages(program.images);
                  const mainImage = imageUrls[0];
                  const logoImage = imageUrls[1] || imageUrls[0];

                  return (
                    <div
                      key={program.id || i}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
                    >
                      {/* Header */}
                      <div className="p-7 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                          <img
                            src={getImageUrl(logoImage)}
                            alt={`${program.university_name} logo`}
                            className="w-14 h-14 object-contain rounded-md border shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/assets/default-university.jpg";
                            }}
                          />
                          <div>
                            <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
                              {safeDisplay(program.university_name)}
                            </h3>
                            <p className="text-black text-sm mt-0.5">
                              {safeDisplay(program.institution_type)}
                              {program.destination_name && ` • ${program.destination_name}`}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-medium text-black mt-4">
                          🎓 {safeDisplay(program.program_name)}
                        </p>
                      </div>

                      {/* Quick Info */}
                      <div className="p-7 flex flex-col gap-3 text-sm md:text-base">
                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaMapMarkerAlt className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Location:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.location)}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaMoneyBillWave className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Tuition:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.average_gross_tuition)}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaClock className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Duration:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.duration, "N/A")}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaFileInvoice className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Application Fee:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.application_fee)}
                          </span>
                        </p>

                        {/* Intake Info */}
                        <p className="flex items-center gap-2 leading-relaxed">
                          <FaFileAlt className="text-black" />
                          <strong className="text-black mr-2 whitespace-nowrap">
                            Intake:
                          </strong>
                          <span className="text-black">
                            {safeDisplay(program.intake_name, "N/A")}
                          </span>
                        </p>

                        {/* Intake Months */}
                        {program.intake_months && program.intake_months.length > 0 && (
                          <p className="flex items-center gap-2 leading-relaxed">
                            <FaCalendarAlt className="text-black" />
                            <strong className="text-black mr-2 whitespace-nowrap">
                              Intake Months:
                            </strong>
                            <span className="text-black">
                              {program.intake_months
                                .map((intake) => intake.month)
                                .join(", ")}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Success Chance */}
                      <div className="p-7 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-semibold text-black text-lg flex items-center gap-2">
                            <FaChartBar className="text-black" />
                            Success Chance
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                program.success_chance === "High"
                                  ? "bg-green-600"
                                  : program.success_chance === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                              }`}
                            ></span>
                            <span className="text-sm font-medium text-black">
                              {safeDisplay(program.success_chance, "N/A")}
                            </span>
                          </div>
                        </div>

                        {/* Success Prediction */}
                        {program.success_prediction_sept2026 ||
                        program.success_prediction_jan2027 ||
                        program.success_prediction_sept2027 ? (
                          <>
                            <p className="font-semibold text-black mb-4 text-lg flex items-center gap-2">
                              <FaChartLine className="text-black" />
                              Success Prediction
                            </p>
                            <div className="flex items-center justify-around text-sm">
                              {program.success_prediction_sept2026 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Sep 2026</span>
                                  <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_sept2026,
                                      "Average"
                                    )}
                                  </span>
                                </div>
                              )}
                              {program.success_prediction_jan2027 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Jan 2027</span>
                                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_jan2027,
                                      "High"
                                    )}
                                  </span>
                                </div>
                              )}
                              {program.success_prediction_sept2027 && (
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">Sep 2027</span>
                                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                                    {safeDisplay(
                                      program.success_prediction_sept2027,
                                      "High"
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>

                      {/* Bottom Button */}
                      <div className="p-7 border-t border-gray-200">
                        <button
                          onClick={() => setOpen(true)}
                          className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary"
                        >
                          Create Application
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === i + 1 
                          ? "bg-primary text-white border-primary" 
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      } transition`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Programs Found */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Programs Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {Object.keys(activeFilters).length > 0
                    ? "Try adjusting your filters to see more results."
                    : "There are currently no programs available."}
                </p>
                {Object.keys(activeFilters).length > 0 && (
                  <button
                    onClick={() => {
                      // Clear filters by calling handleFilterChange with empty object
                      handleFilterChange({});
                    }}
                    className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-fadeIn">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center text-[#252364]">
              Continue as
            </h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Select how you want to register
            </p>

            <div className="mt-6 space-y-4">
              {/* Student */}
              <button
                onClick={() => navigate("/login")}
                className="w-full border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-[#252364] hover:text-white transition duration-300"
              >
                🎓 Student
              </button>

              {/* Agent */}
              <button
                onClick={() => navigate("/login-agent")}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
              >
                🧑‍💼 Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversityApply;