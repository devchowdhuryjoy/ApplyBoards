// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
// import IMAGE_URL from "../../../ApiBaseUrl/ImageUrl";

// interface TopDiscipline {
//   discipline: string;
//   percentage: number;
// }

// interface University {
//   id: number;
//   university_name: string;
//   university_desc: string;
//   address: string;
//   location: string;
//   phone_number: string;
//   images: string[];
//   founded: number;
//   school_id: string;
//   institution_type: string;
//   dli_number: string;
//   top_disciplines: TopDiscipline[];
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
// }

// const AboutUniversity: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [university, setUniversity] = useState<University | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) {
//       setError("University ID not found");
//       setLoading(false);
//       return;
//     }

//     const fetchUniversity = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch(`${BASE_URL}/universities/details/${id}`, {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("Public API response status:", res);

//         if (res.ok) {
//           const json = await res.json();
//           if (json.status && json.data) {
//             setUniversity(json.data);
//           } else if (json) {
//             setUniversity(json); // If API directly returns data
//           } else {
//             setError("No data found");
//           }
//           return;
//         }

//         console.log("Public API failed, trying admin API...");

//         const token =
//           localStorage.getItem("auth_token") ||
//           sessionStorage.getItem("auth_token") ||
//           "7|7l2JF3NxhKDGU0eCZQdsLu9IZQHygFlD7rIfZMF12271af1a";

//         const adminRes = await fetch(
//           `${BASE_URL}/admin/universities/details/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!adminRes.ok) {
//           if (adminRes.status === 401) {
//             throw new Error(
//               "Authentication required. Please login to view university details."
//             );
//           } else {
//             throw new Error(`Error ${adminRes.status}: ${adminRes.statusText}`);
//           }
//         }

//         const adminJson = await adminRes.json();
//         if (adminJson.status && adminJson.data) {
//           setUniversity(adminJson.data);
//         } else {
//           throw new Error("No data found");
//         }
//       } catch (err: any) {
//         console.error("Error fetching university:", err);
//         setError(err.message || "Failed to fetch university data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUniversity();
//   }, [id]);

//   const getImageUrl = (path: string) => {
//   if (!path) return '';

//   // already full url
//   if (path.startsWith('http')) return path;

//   // API gives: uploads/universities/xxx.jpg
//   return `${IMAGE_URL}/storage/${path}`;
// };


//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-3">Loading university details...</span>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-6">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//           <h3 className="text-lg font-semibold text-red-700 mb-2">
//             Error Loading University
//           </h3>
//           <p className="text-red-600 mb-4">{error}</p>
//           <div className="space-x-2">
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//             >
//               Retry
//             </button>
//             <button
//               onClick={() => navigate("/university")}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
//             >
//               Back to Universities
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//   if (!university)
//     return (
//       <div className="text-center py-6">
//         <p>No university data found for ID: {id}</p>
//         <button
//           onClick={() => navigate("/university")}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Back to Universities List
//         </button>
//       </div>
//     );

//   return (
//     <div>
//       {/* Header */}
//       <section className="max-w-6xl mx-auto p-6 sm:p-8">
//         <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-sky-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg">
//               {university.university_name[0]}
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-semibold">
//                 {university.university_name}
//               </h1>
//               <div className="text-sm text-slate-500 mt-0.5 flex flex-wrap gap-3 items-center">
//                 <span className="flex items-center gap-2">
//                   <span className="text-red-500">🏛️</span> {university.location}
//                 </span>
//                 <span className="hidden sm:inline">|</span>
//                 <span className="truncate">{university.address}</span>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate("/university")}
//             className="px-4 py-2 bg-primary  text-sm font-medium"
//           >
//             ← Back to Universities
//           </button>
//         </header>

//         {/* Image Gallery */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {university.images && university.images.length > 0 ? (
//             university.images.slice(0, 5).map((img, i) => (
//               <div
//                 key={i}
//                 className={`${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''} relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100`}
//               >
//                 <img
//                   // src={`${IMAGE_URL}${img}`}
//                   src={getImageUrl(img)} 
//                   alt={`${university.university_name} - ${i + 1}`}
//                   className="w-full h-full object-cover object-center"
//                   onError={(e) => {
//                     e.currentTarget.src = '/assets/default-university.jpg';
//                   }}
//                 />
//                 {i === 0 && (
//                   <button className="absolute left-4 bottom-4 bg-slate-800/85 text-white px-3 py-2 rounded-md text-sm hover:bg-slate-900 transition">
//                     View Photos ({university.images.length})
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="lg:col-span-4 flex items-center justify-center h-64 bg-gray-100 rounded-2xl">
//               <p className="text-gray-500">No images available</p>
//             </div>
//           )}
//         </div>

      

//       </section>

//       {/* Details Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:space-x-6 border-b mb-6 overflow-x-auto">
//             {[
//               "School Details",
//               "Programs",
//               "Scholarships",
//               "Studyxl Services",
//             ].map((tab, i) => (
//               <button
//                 key={i}
//                 className={`pb-3 whitespace-nowrap text-sm sm:text-base ${
//                   i === 0
//                     ? "text-[#f16f22] border-b-2 border-[#252364] font-medium"
//                     : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-6">
//             <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4">
//               <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
//                 🏛️
//               </span>
//               School Details
//             </h2>

//             <div className="prose max-w-none text-slate-700 text-sm sm:text-base">
//               <h3 className="font-semibold text-base sm:text-lg mb-2">
//                 About {university.university_name}
//               </h3>
//               <p className="text-justify">{university.university_desc}</p>
//               <h3 className="font-semibold text-base sm:text-lg mt-4 mb-2">
//                 Top Disciplines
//               </h3>
//               {university.top_disciplines &&
//               university.top_disciplines.length > 0 ? (
//                 <ul className="list-disc list-inside space-y-1 text-justify">
//                   {university.top_disciplines.map((d, i) => (
//                     <li key={i}>
//                       <strong>{d.discipline}:</strong> {d.percentage}%
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No disciplines information available</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow p-4 sm:p-6">
//             <h3 className="text-base sm:text-lg font-semibold mb-4">
//               Institution Details
//             </h3>
//             <dl className="space-y-2 text-sm text-slate-700">
//               <div className="flex justify-between flex-wrap">
//                 <dt>Founded</dt>
//                 <dd>{university.founded || "N/A"}</dd>
//               </div>
//               <div className="flex justify-between flex-wrap">
//                 <dt>School ID</dt>
//                 <dd>{university.school_id || "N/A"}</dd>
//               </div>
//               <div className="flex justify-between flex-wrap">
//                 <dt>DLI number</dt>
//                 <dd>{university.dli_number || "N/A"}</dd>
//               </div>
//               <div className="flex justify-between flex-wrap">
//                 <dt>Institution Type</dt>
//                 <dd>{university.institution_type || "N/A"}</dd>
//               </div>
//             </dl>
//           </div>

//           <div className="bg-white rounded-xl shadow p-4 sm:p-6">
//             <h3 className="text-base sm:text-lg font-semibold mb-4">
//               Cost & Duration
//             </h3>
//             <ul className="space-y-4 text-sm text-slate-700">
//               <li className="flex justify-between">
//                 <span>💰 Application Fee</span>
//                 <span>{university.application_fee || "N/A"}</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>📅 Avg Graduate Program</span>
//                 <span>{university.average_graduate_program || "N/A"}</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>📅 Avg Undergraduate Program</span>
//                 <span>{university.average_undergraduate_program || "N/A"}</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>🏠 Cost of Living</span>
//                 <span>{university.cost_of_living || "N/A"}</span>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="bg-white rounded-xl shadow p-4 sm:p-6">
//             <h3 className="text-base sm:text-lg font-semibold mb-4">
//               Contact Information
//             </h3>
//             <ul className="space-y-3 text-sm text-slate-700">
//               <li className="flex justify-between">
//                 <span>📞 Phone</span>
//                 <span>{university.phone_number || "N/A"}</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>📍 Address</span>
//                 <span className="text-right">
//                   {university.address || "N/A"}
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUniversity;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

interface TopDiscipline {
  discipline: string;
  percentage: number;
}

interface University {
  id: number;
  university_name: string;
  university_desc: string;
  address: string;
  location: string;
  phone_number: string;
  images: string[];
  founded: number;
  school_id: string;
  institution_type: string;
  dli_number: string;
  top_disciplines: TopDiscipline[];
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
}

const AboutUniversity: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!id) {
      setError("University ID not found");
      setLoading(false);
      return;
    }

    const fetchUniversity = async () => {
      setLoading(true);
      setError(null);
      setImageErrors({});

      try {
        // First try public API
        const publicRes = await fetch(`${BASE_URL}/universities/details/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (publicRes.ok) {
          const json = await publicRes.json();
          if (json.status && json.data) {
            console.log("University data from public API:", json.data);
            setUniversity(json.data);
            setLoading(false);
            return;
          }
        }

        // If public API fails, try admin API
        console.log("Trying admin API...");
        const token =
          localStorage.getItem("auth_token") ||
          sessionStorage.getItem("auth_token") ||
          "7|7l2JF3NxhKDGU0eCZQdsLu9IZQHygFlD7rIfZMF12271af1a";

        const adminRes = await fetch(
          `${BASE_URL}/admin/universities/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!adminRes.ok) {
          if (adminRes.status === 401) {
            throw new Error(
              "Authentication required. Please login to view university details."
            );
          } else {
            throw new Error(`Error ${adminRes.status}: ${adminRes.statusText}`);
          }
        }

        const adminJson = await adminRes.json();
        if (adminJson.status && adminJson.data) {
          console.log("University data from admin API:", adminJson.data);
          setUniversity(adminJson.data);
        } else {
          throw new Error("No data found");
        }
      } catch (err: any) {
        console.error("Error fetching university:", err);
        setError(err.message || "Failed to fetch university data");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  // Function to get correct image URL
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      console.log("Empty image path provided");
      return "/assets/default-university.jpg";
    }

    console.log("Original image path:", imagePath);

    // Case 1: Already full URL (http/https)
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Case 2: Starts with storage path
    if (imagePath.startsWith("storage/")) {
      const backendUrl = BASE_URL.replace("/api", "");
      const fullUrl = `${backendUrl}/${imagePath}`;
      console.log("Storage path URL:", fullUrl);
      return fullUrl;
    }

    // Case 3: Starts with uploads path
    if (imagePath.startsWith("uploads/")) {
      const backendUrl = BASE_URL.replace("/api", "");
      const fullUrl = `${backendUrl}/${imagePath}`;
      console.log("Uploads path URL:", fullUrl);
      return fullUrl;
    }

    // Case 4: Starts with /storage/
    if (imagePath.startsWith("/storage/")) {
      const backendUrl = BASE_URL.replace("/api", "");
      const fullUrl = `${backendUrl}${imagePath}`;
      console.log("/storage/ path URL:", fullUrl);
      return fullUrl;
    }

    // Case 5: Starts with /uploads/
    if (imagePath.startsWith("/uploads/")) {
      const backendUrl = BASE_URL.replace("/api", "");
      const fullUrl = `${backendUrl}${imagePath}`;
      console.log("/uploads/ path URL:", fullUrl);
      return fullUrl;
    }

    // Case 6: Relative path without prefix
    if (!imagePath.startsWith("/") && !imagePath.startsWith("storage/") && !imagePath.startsWith("uploads/")) {
      const backendUrl = BASE_URL.replace("/api", "");
      // Try both storage and uploads prefixes
      const possiblePaths = [
        `${backendUrl}/storage/${imagePath}`,
        `${backendUrl}/storage/universities/${imagePath}`,
        `${backendUrl}/uploads/${imagePath}`,
        `${backendUrl}/uploads/universities/${imagePath}`
      ];
      console.log("Possible image URLs:", possiblePaths);
      return possiblePaths[0];
    }

    // Default fallback
    const backendUrl = BASE_URL.replace("/api", "");
    const fullUrl = `${backendUrl}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
    console.log("Fallback URL:", fullUrl);
    return fullUrl;
  };

  // Handle image loading error
  const handleImageError = (index: number, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Image ${index} failed to load. Original src: ${e.currentTarget.src}`);
    setImageErrors(prev => ({ ...prev, [index]: true }));
    
    // Try alternative path
    if (university?.images[index]) {
      const originalPath = university.images[index];
      let alternativeUrl = "";
      
      if (originalPath.startsWith("storage/")) {
        alternativeUrl = `${BASE_URL.replace("/api", "")}/uploads/${originalPath.replace("storage/", "")}`;
      } else if (originalPath.startsWith("uploads/")) {
        alternativeUrl = `${BASE_URL.replace("/api", "")}/storage/${originalPath.replace("uploads/", "")}`;
      } else if (originalPath.includes("universities")) {
        alternativeUrl = `${BASE_URL.replace("/api", "")}/storage/${originalPath}`;
      }
      
      if (alternativeUrl && alternativeUrl !== e.currentTarget.src) {
        console.log("Trying alternative URL:", alternativeUrl);
        e.currentTarget.src = alternativeUrl;
        return;
      }
    }
    
    // If all fails, use default image
    e.currentTarget.src = "/assets/default-university.jpg";
    e.currentTarget.className = "w-full h-full object-contain object-center bg-gray-100 p-4";
  };

  // Handle successful image load
  const handleImageLoad = (index: number) => {
    console.log(`Image ${index} loaded successfully`);
    setImageErrors(prev => ({ ...prev, [index]: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg text-gray-700">Loading university details...</p>
        <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading University</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/university")}
              className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">University Not Found</h2>
          <p className="text-gray-600 mb-6">No university found with ID: {id}</p>
          <button
            onClick={() => navigate("/university")}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Universities
          </button>
        </div>
      </div>
    );
  }

  // Log image data for debugging
  console.log("University images array:", university.images);
  console.log("Number of images:", university.images?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {university.university_name.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {university.university_name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{university.location}</span>
                  </span>
                  <span className="hidden md:inline text-gray-300">•</span>
                  <span className="truncate" title={university.address}>
                    {university.address}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/university")}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to List
              </button>
              <button className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {university.images && university.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {university.images.slice(0, 8).map((img, index) => {
                const imageUrl = getImageUrl(img);
                const isMainImage = index === 0;
                const hasError = imageErrors[index];

                return (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                      isMainImage ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                    style={{ aspectRatio: isMainImage ? '16/9' : '4/3' }}
                  >
                    {hasError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-500 text-sm text-center px-4">Image not available</p>
                      </div>
                    ) : (
                      <>
                        <img
                          src={imageUrl}
                          alt={`${university.university_name} - Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => handleImageError(index, e)}
                          onLoad={() => handleImageLoad(index)}
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                        {isMainImage && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <button className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              View All Photos ({university.images.length})
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No Images Available</h3>
              <p className="text-gray-400">This university hasn't uploaded any photos yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Navigation Tabs */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="flex overflow-x-auto">
                  {['Overview', 'Programs', 'Admissions', 'Campus Life', 'Scholarships', 'Reviews'].map((tab, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                        index === 0
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">About {university.university_name}</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    {university.university_desc || 'No description available for this university.'}
                  </p>
                  
                  {university.top_disciplines && university.top_disciplines.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Disciplines</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {university.top_disciplines.map((discipline, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">{discipline.discipline}</span>
                              <span className="text-blue-600 font-bold">{discipline.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.min(discipline.percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Programs Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Programs & Duration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Graduate Programs</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Duration:</span> {university.average_graduate_program || 'N/A'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {university.average_graduate_program_short_desc || 'Information not available'}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Undergraduate Programs</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Duration:</span> {university.average_undergraduate_program || 'N/A'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {university.average_undergraduate_program_short_desc || 'Information not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-semibold">{university.founded || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Institution Type</span>
                    <span className="font-semibold">{university.institution_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">DLI Number</span>
                    <span className="font-semibold">{university.dli_number || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-semibold">{university.application_fee || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Cost Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cost Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-blue-50 rounded-lg p-4">
                    <div>
                      <p className="font-medium text-gray-900">Cost of Living</p>
                      <p className="text-gray-600 text-sm">{university.cost_of_living_short_desc}</p>
                    </div>
                    <span className="text-blue-600 font-bold text-lg">{university.cost_of_living || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-50 rounded-lg p-4">
                    <div>
                      <p className="font-medium text-gray-900">Average Tuition</p>
                      <p className="text-gray-600 text-sm">{university.average_gross_tuition_short_desc}</p>
                    </div>
                    <span className="text-green-600 font-bold text-lg">{university.average_gross_tuition || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{university.phone_number || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{university.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Request More Information
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors">
                    Schedule Campus Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUniversity;