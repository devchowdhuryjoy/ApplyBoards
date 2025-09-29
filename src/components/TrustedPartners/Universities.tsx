// import React from "react";

// interface University {
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
//   top_disciplines: { discipline: string; percentage: number }[];
//   images: string[];
//   featured?: boolean;
// }

// const universities: University[] = [
//   {
//     university_name: "Western University",
//     address: "1151 Richmond St, London, ON N6A 3K7, Canada",
//     location: "London, Ontario, CA",
//     phone_number: "+1 519-661-2111",
//     founded: "1878",
//     school_id: "WU001",
//     institution_type: "Public",
//     dli_number: "O19375892345",
//     application_fee: "$125",
//     application_short_desc: "Apply easily with online application portal.",
//     average_graduate_program: "$18,000 / year",
//     average_graduate_program_short_desc:
//       "Competitive tuition for graduate students.",
//     average_undergraduate_program: "$15,000 / year",
//     average_undergraduate_program_short_desc:
//       "Affordable tuition for undergraduate students.",
//     cost_of_living: "$12,000 / year",
//     cost_of_living_short_desc: "Includes housing, food, and other expenses.",
//     average_gross_tuition: "$16,000 / year",
//     average_gross_tuition_short_desc: "Balanced average across programs.",
//     destinations: "Canada, USA, Europe",
//     top_disciplines: [
//       { discipline: "Engineering", percentage: 40 },
//       { discipline: "Business", percentage: 30 },
//       { discipline: "Health Sciences", percentage: 30 },
//     ],
//     images: ["student-1.png", "student-2.png"],
//     featured: true,
//   },
//   {
//     university_name: "Laurentian University",
//     address: "935 Ramsey Lake Rd, Sudbury, ON P3E 2C6, Canada",
//     location: "Sudbury, Ontario, CA",
//     phone_number: "+1 705-675-1151",
//     founded: "1960",
//     school_id: "LU002",
//     institution_type: "Public",
//     dli_number: "O19483746293",
//     application_fee: "$100",
//     application_short_desc: "Application with flexible intakes.",
//     average_graduate_program: "$17,000 / year",
//     average_graduate_program_short_desc:
//       "Affordable graduate-level tuition fees.",
//     average_undergraduate_program: "$14,000 / year",
//     average_undergraduate_program_short_desc:
//       "Value-focused tuition for undergraduates.",
//     cost_of_living: "$11,000 / year",
//     cost_of_living_short_desc: "Cheaper cost of living in Sudbury.",
//     average_gross_tuition: "$15,500 / year",
//     average_gross_tuition_short_desc: "Balanced program costs.",
//     destinations: "Canada, Asia",
//     top_disciplines: [
//       { discipline: "Environmental Science", percentage: 50 },
//       { discipline: "Mining Engineering", percentage: 50 },
//     ],
//     images: ["student-2.png", "student-3.png"],
//     featured: false,
//   },
// ];

// const Universities: React.FC = () => {
//   return (
//     <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Cards Grid */}
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {universities.map((uni, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
//             >
//               {/* Image */}
//               <div className="relative">
//                 <img
//                   src={uni.images[0]}
//                   alt={uni.university_name}
//                   className="w-full h-48 object-cover"
//                 />
//                 {uni.featured && (
//                   <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
//                     ● Featured
//                   </span>
//                 )}
//               </div>

//               {/* Content */}
//               <div className="p-5">
//                 {/* Logo + Name */}
//                 <div className="flex items-center mb-3">
//                   <img
//                     src={uni.images[1]}
//                     alt={`${uni.university_name} logo`}
//                     className="w-8 h-8 mr-2 object-contain"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold text-black">
//                       {uni.university_name}
//                     </h3>
//                     <p className="text-sm text-gray-600">{uni.location}</p>
//                   </div>
//                 </div>

//                 {/* Short Description */}
//                 <p className="text-black text-sm mb-3">
//                   {uni.application_short_desc}
//                 </p>

//                 {/* Quick Info */}
//                 <ul className="text-xs text-gray-700 space-y-1 mb-3">
//                   <li><strong>Founded:</strong> {uni.founded}</li>
//                   <li><strong>Type:</strong> {uni.institution_type}</li>
//                   <li><strong>DLI #:</strong> {uni.dli_number}</li>
//                   <li><strong>Phone:</strong> {uni.phone_number}</li>
//                   <li><strong>Application Fee:</strong> {uni.application_fee}</li>
//                   <li><strong>Address:</strong> {uni.address}</li>
//                 </ul>

//                 {/* Programs */}
//                 <div className="mb-3">
//                   <p className="text-xs"><strong>Graduate:</strong> {uni.average_graduate_program} – {uni.average_graduate_program_short_desc}</p>
//                   <p className="text-xs"><strong>Undergraduate:</strong> {uni.average_undergraduate_program} – {uni.average_undergraduate_program_short_desc}</p>
//                 </div>

//                 {/* Cost Info */}
//                 <div className="mb-3">
//                   <p className="text-xs"><strong>Cost of Living:</strong> {uni.cost_of_living} – {uni.cost_of_living_short_desc}</p>
//                   <p className="text-xs"><strong>Gross Tuition:</strong> {uni.average_gross_tuition} – {uni.average_gross_tuition_short_desc}</p>
//                 </div>

//                 {/* Top Disciplines */}
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {uni.top_disciplines.map((disc, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                     >
//                       {disc.discipline} ({disc.percentage}%)
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Button */}
//         <div className="flex justify-center mt-10">
//           <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition">
//             Explore More Institutions
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Universities;

// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

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

// const Universities: React.FC = () => {
//   const [universities, setUniversities] = useState<University[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch universities data from API
//   // const fetchUniversities = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);

//   //     const myHeaders = new Headers();
//   //     myHeaders.append("Accept", "application/json");
//   //     myHeaders.append("Content-Type", "application/json");
//   //     myHeaders.append("Authorization", "Bearer 4|7DhgCgnsMc3MdTi1lnzDh4xxiG1xcMLpSn9uc0Y3f79923b3");

//   //     const requestOptions = {
//   //       method: "GET",
//   //       headers: myHeaders,
//   //       redirect: "follow" as RequestRedirect
//   //     };

//   //     const response = await fetch(`${BASE_URL}/admin/alluniversities`, requestOptions);

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     const result = await response.json();
//   //     console.log("API Response:", result); // Debugging purpose

//   //     // Handle different API response structures
//   //     let universitiesData: University[] = [];

//   //     if (result.data && Array.isArray(result.data)) {
//   //       universitiesData = result.data;
//   //     } else if (Array.isArray(result)) {
//   //       universitiesData = result;
//   //     } else if (result.universities && Array.isArray(result.universities)) {
//   //       universitiesData = result.universities;
//   //     } else {
//   //       console.warn("Unexpected API response format:", result);
//   //       universitiesData = [];
//   //     }

//   //     setUniversities(universitiesData);

//   //   } catch (err) {
//   //     console.error("Error fetching universities:", err);
//   //     setError(err instanceof Error ? err.message : "Failed to fetch universities");

//   //     // Fallback to static data if API fails
//   //     setUniversities(getFallbackData());
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

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
//         `${BASE_URL}/admin/alluniversities`,
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

//       // Fallback static data if API fails
//       setUniversities(getFallbackData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback static data
//   const getFallbackData = (): University[] => [
//     {
//       university_name: "Western University",
//       address: "1151 Richmond St, London, ON N6A 3K7, Canada",
//       location: "London, Ontario, CA",
//       phone_number: "+1 519-661-2111",
//       founded: "1878",
//       school_id: "WU001",
//       institution_type: "Public",
//       dli_number: "O19375892345",
//       application_fee: "$125",
//       application_short_desc: "Apply easily with online application portal.",
//       average_graduate_program: "$18,000 / year",
//       average_graduate_program_short_desc:
//         "Competitive tuition for graduate students.",
//       average_undergraduate_program: "$15,000 / year",
//       average_undergraduate_program_short_desc:
//         "Affordable tuition for undergraduate students.",
//       cost_of_living: "$12,000 / year",
//       cost_of_living_short_desc: "Includes housing, food, and other expenses.",
//       average_gross_tuition: "$16,000 / year",
//       average_gross_tuition_short_desc: "Balanced average across programs.",
//       destinations: "Canada, USA, Europe",
//       top_disciplines: [
//         { discipline: "Engineering", percentage: 40 },
//         { discipline: "Business", percentage: 30 },
//         { discipline: "Health Sciences", percentage: 30 },
//       ],
//       images: ["/assets/student-1.png", "/assets/student-2.png"],
//       featured: true,
//     },
//     {
//       university_name: "Laurentian University",
//       address: "935 Ramsey Lake Rd, Sudbury, ON P3E 2C6, Canada",
//       location: "Sudbury, Ontario, CA",
//       phone_number: "+1 705-675-1151",
//       founded: "1960",
//       school_id: "LU002",
//       institution_type: "Public",
//       dli_number: "O19483746293",
//       application_fee: "$100",
//       application_short_desc: "Application with flexible intakes.",
//       average_graduate_program: "$17,000 / year",
//       average_graduate_program_short_desc:
//         "Affordable graduate-level tuition fees.",
//       average_undergraduate_program: "$14,000 / year",
//       average_undergraduate_program_short_desc:
//         "Value-focused tuition for undergraduates.",
//       cost_of_living: "$11,000 / year",
//       cost_of_living_short_desc: "Cheaper cost of living in Sudbury.",
//       average_gross_tuition: "$15,500 / year",
//       average_gross_tuition_short_desc: "Balanced program costs.",
//       destinations: "Canada, Asia",
//       top_disciplines: [
//         { discipline: "Environmental Science", percentage: 50 },
//         { discipline: "Mining Engineering", percentage: 50 },
//       ],
//       images: ["/assets/student-2.png", "/assets/student-3.png"],
//       featured: false,
//     },
//   ];

//   useEffect(() => {
//     fetchUniversities();
//   }, []);

//   // Parse top_disciplines if it comes as string from API
//   const parseTopDisciplines = (
//     disciplines: string | TopDiscipline[] | any
//   ): TopDiscipline[] => {
//     if (!disciplines) return [];

//     if (typeof disciplines === "string") {
//       try {
//         // Remove extra spaces and newlines
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

//   // Handle images array - if images are not coming properly
//   // const getImages = (images: any): string[] => {
//   //   if (!images) {
//   //     return ['/assets/default-university.jpg'];
//   //   }

//   //   if (Array.isArray(images)) {
//   //     // Filter out null/undefined and ensure strings
//   //     return images
//   //       .filter(img => img != null)
//   //       .map(img => {
//   //         if (typeof img === 'string') return img;
//   //         if (img.url) return img.url;
//   //         return '/default-university.jpg';
//   //       });
//   //   }

//   //   if (typeof images === 'string') {
//   //     try {
//   //       const parsed = JSON.parse(images);
//   //       return getImages(parsed);
//   //     } catch {
//   //       return [images];
//   //     }
//   //   }

//   //   return ['/assets/default-university.jpg'];
//   // };

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

//   // Handle image URLs
//   // const getImageUrl = (imagePath: string) => {
//   //   if (!imagePath) return '/assets/default-university.jpg';

//   //   if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
//   //     return imagePath;
//   //   }

//   //   if (imagePath.startsWith('/storage/') || imagePath.startsWith('/images/')) {
//   //     return `${BASE_URL}${imagePath}`;
//   //   }

//   //   return `/${imagePath}`;
//   // };

//   // const getImageUrl = (imagePath: string) => {
//   //   if (!imagePath) return "/assets/default-university.jpg";

//   //   if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
//   //     return imagePath;
//   //   }

//   //   if (imagePath.startsWith("/storage/") || imagePath.startsWith("/images/")) {
//   //     return `${BASE_URL}${imagePath}`;
//   //   }

//   //   return `/assets/${imagePath}`;
//   // };

// const getImageUrl = (imagePath: string) => {
//   if (!imagePath) return "/assets/default-university.jpg";

//   if (imagePath.startsWith("http") || imagePath.startsWith("//")) return imagePath;

//   if (
//     imagePath.startsWith("/storage/") ||
//     imagePath.startsWith("/images/") ||
//     imagePath.startsWith("uploads/")
//   ) {
//     return `${BASE_URL}/${imagePath.replace(/ /g, "%20")}`;
//   }

//   return `/assets/${imagePath}`;
// };

//   const safeDisplay = (value: any, defaultValue: string = "N/A"): string => {
//     if (value === null || value === undefined || value === "") {
//       return defaultValue;
//     }
//     return String(value);
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
//     <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Debug Info - Remove in production */}
//         {process.env.NODE_ENV === "development" && (
//           <div className="mb-4 p-3 bg-yellow-100 rounded">
//             <strong>Debug:</strong> Loaded {universities.length} universities
//           </div>
//         )}

//         {/* Cards Grid */}
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {universities.map((uni, i) => {
//             const disciplines = parseTopDisciplines(uni.top_disciplines);
//             const imageUrls = getImages(uni.images);
//             const mainImage = imageUrls[0];
//             const logoImage = imageUrls[1] || imageUrls[0];

//             return (
//               <div
//                 key={uni.id || i}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
//               >
//                 {/* Image */}
//                 <div className="relative">
//                   {getImages(uni.images).map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={getImageUrl(img)}
//                       alt={`${uni.university_name} image ${idx + 1}`}
//                       className="w-full h-48 object-cover"
//                     />
//                   ))}
//                   {uni.featured && (
//                     <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       ● Featured
//                     </span>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   {/* Logo + Name */}
//                   <div className="flex items-center mb-3">
//                     <img
//                       src={getImageUrl(logoImage)}
//                       alt={`${uni.university_name} logo`}
//                       className="w-8 h-8 mr-2 object-contain"
//                       onError={(e) => {
//                         e.currentTarget.style.display = "none";
//                       }}
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold text-black">
//                         {safeDisplay(uni.university_name)}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {safeDisplay(uni.location)}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Short Description */}
//                   <p className="text-black text-sm mb-3">
//                     {safeDisplay(
//                       uni.application_short_desc,
//                       "No description available"
//                     )}
//                   </p>

//                   {/* Quick Info */}
//                   <ul className="text-xs text-gray-700 space-y-1 mb-3">
//                     <li>
//                       <strong>Founded:</strong> {safeDisplay(uni.founded)}
//                     </li>
//                     <li>
//                       <strong>Type:</strong> {safeDisplay(uni.institution_type)}
//                     </li>
//                     <li>
//                       <strong>DLI #:</strong> {safeDisplay(uni.dli_number)}
//                     </li>
//                     <li>
//                       <strong>Phone:</strong> {safeDisplay(uni.phone_number)}
//                     </li>
//                     <li>
//                       <strong>Application Fee:</strong>{" "}
//                       {safeDisplay(uni.application_fee)}
//                     </li>
//                     <li>
//                       <strong>Address:</strong> {safeDisplay(uni.address)}
//                     </li>
//                     <li>
//                       <strong>Destinations:</strong>{" "}
//                       {safeDisplay(uni.destinations)}
//                     </li>
//                   </ul>

//                   {/* Programs */}
//                   <div className="mb-3">
//                     <p className="text-xs">
//                       <strong>Graduate:</strong>{" "}
//                       {safeDisplay(uni.average_graduate_program)} –{" "}
//                       {safeDisplay(uni.average_graduate_program_short_desc)}
//                     </p>
//                     <p className="text-xs">
//                       <strong>Undergraduate:</strong>{" "}
//                       {safeDisplay(uni.average_undergraduate_program)} –{" "}
//                       {safeDisplay(
//                         uni.average_undergraduate_program_short_desc
//                       )}
//                     </p>
//                   </div>

//                   {/* Cost Info */}
//                   <div className="mb-3">
//                     <p className="text-xs">
//                       <strong>Cost of Living:</strong>{" "}
//                       {safeDisplay(uni.cost_of_living)} –{" "}
//                       {safeDisplay(uni.cost_of_living_short_desc)}
//                     </p>
//                     <p className="text-xs">
//                       <strong>Gross Tuition:</strong>{" "}
//                       {safeDisplay(uni.average_gross_tuition)} –{" "}
//                       {safeDisplay(uni.average_gross_tuition_short_desc)}
//                     </p>
//                   </div>

//                   {/* Top Disciplines */}
//                   {disciplines.length > 0 && (
//                     <div className="mb-3">
//                       <strong className="text-xs block mb-1">
//                         Top Disciplines:
//                       </strong>
//                       <div className="flex flex-wrap gap-2">
//                         {disciplines.map((disc, idx) => (
//                           <span
//                             key={idx}
//                             className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                           >
//                             {disc.discipline} ({disc.percentage}%)
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Timestamps - for debugging */}
//                   {process.env.NODE_ENV === "development" && (
//                     <div className="mt-2 pt-2 border-t border-gray-200">
//                       <p className="text-xs text-gray-500">
//                         Created: {safeDisplay(uni.created_at)}
//                         <br />
//                         Updated: {safeDisplay(uni.updated_at)}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {universities.length === 0 && !loading && (
//           <div className="text-center py-10">
//             <p className="text-gray-500">No universities found.</p>
//             <button
//               onClick={fetchUniversities}
//               className="mt-4 bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Button */}
//         <div className="flex justify-center mt-10">
//           <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition">
//             Explore More Institutions
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Universities;



import React, { useState, useEffect } from "react";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

interface TopDiscipline {
  discipline: string;
  percentage: number;
}

interface University {
  id?: number;
  university_name: string;
  address: string;
  location: string;
  phone_number: string;
  founded: string;
  school_id: string;
  institution_type: string;
  dli_number: string;
  application_fee: string;
  application_short_desc: string;
  average_graduate_program: string;
  average_graduate_program_short_desc: string;
  average_undergraduate_program: string;
  average_undergraduate_program_short_desc: string;
  cost_of_living: string;
  cost_of_living_short_desc: string;
  average_gross_tuition: string;
  average_gross_tuition_short_desc: string;
  destinations: string;
  top_disciplines: TopDiscipline[] | string;
  images: string[] | any;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

const Universities: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/admin/alluniversities`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Normalize API response
      let universitiesData: University[] = [];

      if (result.data && Array.isArray(result.data)) {
        universitiesData = result.data;
      } else if (Array.isArray(result)) {
        universitiesData = result;
      } else if (result.universities && Array.isArray(result.universities)) {
        universitiesData = result.universities;
      } else {
        console.warn("Unexpected API response format:", result);
        universitiesData = [];
      }

      setUniversities(universitiesData);
    } catch (err) {
      console.error("Error fetching universities:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch universities"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // Parse top_disciplines if it comes as string from API
  const parseTopDisciplines = (
    disciplines: string | TopDiscipline[] | any
  ): TopDiscipline[] => {
    if (!disciplines) return [];

    if (typeof disciplines === "string") {
      try {
        const cleanedString = disciplines
          .replace(/\n/g, "")
          .replace(/\s+/g, " ")
          .trim();
        return JSON.parse(cleanedString);
      } catch (err) {
        console.error(
          "Error parsing disciplines:",
          err,
          "Raw string:",
          disciplines
        );
        return [];
      }
    }

    if (Array.isArray(disciplines)) {
      return disciplines;
    }

    return [];
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

  const isFeatured = (uni: University) => {
    const featuredIds = [6, 12, 15];
    return featuredIds.includes(uni.id || 0);
  };

  if (loading) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg">Loading universities...</div>
        </div>
      </section>
    );
  }

  if (error && universities.length === 0) {
    return (
      <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={fetchUniversities}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni, i) => {
            const disciplines = parseTopDisciplines(uni.top_disciplines);
            const imageUrls = getImages(uni.images);
            const mainImage = imageUrls[0];
            const logoImage = imageUrls[1] || imageUrls[0];

            return (
              <div
                key={uni.id || i}
                className="bg-white rounded-3xl shadow-md border border-black overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={getImageUrl(mainImage)}
                    alt={`${uni.university_name}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/default-university.jpg";
                    }}
                  />

                  {isFeatured(uni) && (
                    <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      ● Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Logo + Name */}
                  <div className="flex items-center mb-3">
                    <img
                      src={getImageUrl(logoImage)}
                      alt={`${uni.university_name} logo`}
                      className="w-8 h-8 mr-2 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/default-university.jpg";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {safeDisplay(uni.university_name)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {safeDisplay(uni.location)}
                      </p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-black text-sm mb-3">
                    {safeDisplay(
                      uni.application_short_desc,
                      "No description available"
                    )}
                  </p>

                  {/* Quick Info */}
                  <ul className="text-xs text-black space-y-1 mb-3">
                    <li>
                      <strong>Founded:</strong> {safeDisplay(uni.founded)}
                    </li>
                    <li>
                      <strong>Type:</strong> {safeDisplay(uni.institution_type)}
                    </li>
                    <li>
                      <strong>DLI #:</strong> {safeDisplay(uni.dli_number)}
                    </li>
                    <li>
                      <strong>Phone:</strong> {safeDisplay(uni.phone_number)}
                    </li>
                    <li>
                      <strong>Application Fee:</strong>{" "}
                      {safeDisplay(uni.application_fee)}
                    </li>
                    <li>
                      <strong>Address:</strong> {safeDisplay(uni.address)}
                    </li>
                    <li>
                      <strong>Destinations:</strong>{" "}
                      {safeDisplay(uni.destinations)}
                    </li>
                  </ul>

                  {/* Programs */}
                  <div className="mb-3">
                    <p className="text-xs">
                      <strong>Graduate:</strong>{" "}
                      {safeDisplay(uni.average_graduate_program)} –{" "}
                      {safeDisplay(uni.average_graduate_program_short_desc)}
                    </p>
                    <p className="text-xs">
                      <strong>Undergraduate:</strong>{" "}
                      {safeDisplay(uni.average_undergraduate_program)} –{" "}
                      {safeDisplay(
                        uni.average_undergraduate_program_short_desc
                      )}
                    </p>
                  </div>

                  {/* Cost Info */}
                  <div className="mb-3">
                    <p className="text-xs">
                      <strong>Cost of Living:</strong>{" "}
                      {safeDisplay(uni.cost_of_living)} –{" "}
                      {safeDisplay(uni.cost_of_living_short_desc)}
                    </p>
                    <p className="text-xs">
                      <strong>Gross Tuition:</strong>{" "}
                      {safeDisplay(uni.average_gross_tuition)} –{" "}
                      {safeDisplay(uni.average_gross_tuition_short_desc)}
                    </p>
                  </div>

                  {/* Top Disciplines */}
                  {disciplines.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-xs block mb-1">
                        Top Disciplines:
                      </strong>
                      <div className="flex flex-wrap gap-2">
                        {disciplines.map((disc, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-black px-2 py-1 rounded text-xs"
                          >
                            {disc.discipline} ({disc.percentage}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {universities.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-black">No universities found.</p>
            <button
              onClick={fetchUniversities}
              className="mt-4 bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition">
            Explore More Institutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Universities;
