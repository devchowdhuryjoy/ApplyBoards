// const UniversityApply = () => {
//   return (
//     <div className="bg-white rounded-xl mt-10 mb-10 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer max-w-sm mx-auto">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-2">
//           <img
//             src="/student-1.png"
//             alt="University logo"
//             className="w-10 h-10 object-contain"
//           />
//           <h3 className="text-blue-700 font-semibold hover:underline">
//             Laurentian University
//           </h3>
//         </div>
//         <p className="text-sm text-black mt-1">Bachelor's Degree</p>
//         <p className="text-base font-medium text-black">
//           Computer Science Program
//         </p>
//       </div>

//       {/* Quick Info */}
//       <div className="p-4 space-y-2 text-sm">
//         <p>
//           <strong>Location:</strong> Ontario, Canada
//         </p>
//         <p>
//           <strong>Campus city:</strong> Sudbury
//         </p>
//         <p>
//           <strong>Tuition (1st year):</strong> $25,000
//         </p>
//         <p>
//           <strong>Application fee:</strong> $100
//         </p>
//         <p>
//           <strong>Duration:</strong> 48 months
//         </p>
//       </div>

//       {/* Success prediction */}
//       <div className="p-4 border-t border-gray-200">
//         <p className="font-medium text-black mb-2">Success prediction</p>
//         <div className="flex items-center justify-between text-xs">
//           <div className="flex flex-col items-center">
//             <span>Sep 2026</span>
//             <span className="bg-gray-200 text-black px-2 py-0.5 rounded-full mt-1">
//               Average
//             </span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span>Jan 2027</span>
//             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
//               High
//             </span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span>Sep 2027</span>
//             <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
//               High
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="p-4 border-t border-gray-200">
//         <button className="w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-200 transition">
//           Create application
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UniversityApply;

import React, { useState, useEffect } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import { useNavigate } from "react-router-dom";
import Program from "./Program";

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

const UniversityApply: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <>
    <Program />

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
              // <div
              //   key={uni.id || i}
              //   className="bg-white rounded-xl mt-10 mb-10 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer max-w-md mx-auto"

              // >
              //   {/* Header */}
              //   <div className="p-4 border-b border-gray-200">
              //     <div className="flex items-center space-x-2">
              //       <img
              //         src={getImageUrl(logoImage)}
              //         alt={`${uni.university_name} logo`}
              //         className="w-10 h-10 object-contain"
              //         onError={(e) => {
              //           e.currentTarget.src = "/assets/default-university.jpg";
              //         }}
              //       />
              //       <h3 className="text-blue-700 font-semibold hover:underline">
              //         {safeDisplay(uni.university_name)}
              //       </h3>
              //     </div>
              //     <p className="text-sm text-black mt-1">
              //       {safeDisplay(uni.institution_type)}
              //     </p>
              //     <p className="text-base font-medium text-black">
              //       {safeDisplay(uni.average_undergraduate_program)}
              //     </p>
              //   </div>

              //   {/* Quick Info */}
              //   <div className="p-4 space-y-2 text-sm">
              //     <p>
              //       <strong>Location:</strong> {safeDisplay(uni.location)}
              //     </p>
              //     <p>
              //       <strong>Founded:</strong> {safeDisplay(uni.founded)}
              //     </p>
              //     <p>
              //       <strong>Tuition (1st year):</strong>{" "}
              //       {safeDisplay(uni.average_gross_tuition)}
              //     </p>
              //     <p>
              //       <strong>Application fee:</strong>{" "}
              //       {safeDisplay(uni.application_fee)}
              //     </p>
              //     <p>
              //       <strong>Duration:</strong>{" "}
              //       {safeDisplay(uni.program_duration, "N/A")}
              //     </p>
              //   </div>

              //   {/* Success prediction */}
              //   <div className="p-4 border-t border-gray-200">
              //     <p className="font-medium text-black mb-2">
              //       Success prediction
              //     </p>
              //     <div className="flex items-center justify-between text-xs">
              //       <div className="flex flex-col items-center">
              //         <span>Sep 2026</span>
              //         <span className="bg-gray-200 text-black px-2 py-0.5 rounded-full mt-1">
              //           {safeDisplay(
              //             uni.success_prediction_sept2026,
              //             "Average"
              //           )}
              //         </span>
              //       </div>
              //       <div className="flex flex-col items-center">
              //         <span>Jan 2027</span>
              //         <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
              //           {safeDisplay(uni.success_prediction_jan2027, "High")}
              //         </span>
              //       </div>
              //       <div className="flex flex-col items-center">
              //         <span>Sep 2027</span>
              //         <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
              //           {safeDisplay(uni.success_prediction_sept2027, "High")}
              //         </span>
              //       </div>
              //     </div>
              //   </div>

              //   {/* CTA */}
              //   <div className="p-4 border-t border-gray-200">
              //     <button className="w-full bg-blue-100 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-200 transition">
              //       Create application
              //     </button>
              //   </div>
              // </div>

              <div
                key={uni.id || i}
                className="bg-white rounded-2xl  shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-[850px] mx-auto"
              >
                {/* Header */}
                <div className="p-7 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={getImageUrl(logoImage)}
                      alt={`${uni.university_name} logo`}
                      className="w-14 h-14 object-contain rounded-md border shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/default-university.jpg";
                      }}
                    />
                    <div>
                      <h3 className="text-2xl text-[#252364] font-bold hover:underline leading-snug">
                        {safeDisplay(uni.university_name)}
                      </h3>
                      <p className="text-black text-sm mt-0.5">
                        {safeDisplay(uni.institution_type)}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-black mt-4">
                    🎓 {safeDisplay(uni.average_undergraduate_program)}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="p-7 grid grid-cols-2 gap-y-3 gap-x-8 text-sm md:text-base">
                  <p className="flex items-center leading-relaxed">
                    <strong className="text-black mr-2 whitespace-nowrap">
                      📍 Location:
                    </strong>
                    <span className="text-black">
                      {safeDisplay(uni.location)}
                    </span>
                  </p>

                  <p className="flex items-center leading-relaxed">
                    <strong className="text-black mr-2 whitespace-nowrap">
                      🏛 Founded:
                    </strong>
                    <span className="text-black">
                      {safeDisplay(uni.founded)}
                    </span>
                  </p>

                  <p className="flex items-center leading-relaxed">
                    <strong className="text-black mr-2 whitespace-nowrap">
                      💰 Tuition:
                    </strong>
                    <span className="text-black">
                      {safeDisplay(uni.average_gross_tuition)}
                    </span>
                  </p>
                  <p className="flex items-center leading-relaxed col-span-2">
                    <strong className="text-black mr-2 whitespace-nowrap">
                      ⏳ Duration:
                    </strong>
                    <span className="text-black">
                      {safeDisplay(uni.program_duration, "N/A")}
                    </span>
                  </p>

                  <p className="flex items-center leading-relaxed">
                    <strong className="text-black mr-2 whitespace-nowrap">
                      📝 Application Fee:
                    </strong>
                    <span className="text-black">
                      {safeDisplay(uni.application_fee)}
                    </span>
                  </p>
                </div>

                {/* Success prediction */}
                <div className="p-7 border-t border-gray-200">
                  <p className="font-semibold text-black mb-4 text-lg">
                    📊 Success Prediction
                  </p>
                  <div className="flex items-center justify-around text-sm">
                    <div className="flex flex-col items-center">
                      <span className="font-medium">Sep 2026</span>
                      <span className="bg-gray-100 text-black px-4 py-1 rounded-full mt-2 shadow-sm">
                        {safeDisplay(
                          uni.success_prediction_sept2026,
                          "Average"
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-medium">Jan 2027</span>
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                        {safeDisplay(uni.success_prediction_jan2027, "High")}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-medium">Sep 2027</span>
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full mt-2 shadow-sm">
                        {safeDisplay(uni.success_prediction_sept2027, "High")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-7 border-t border-gray-200">
                  <button className="w-full bg-[#f16f22] text-white font-semibold py-3.5 rounded-xl hover:bg-[#252364] transition-all duration-300 shadow-md">
                    🚀 Create Application
                  </button>
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
        {/* <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/university-apply")}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
          >
            Explore More Institutions
          </button>
        </div> */}
      </div>
    </section>
    </>
  );
};

export default UniversityApply;
