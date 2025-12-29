import React, { useState, useEffect } from "react";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import { useNavigate } from "react-router-dom";

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

  

  

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(universities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentUniversities = universities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchUniversities();
  }, [currentPage]);

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
          {/* {universities.map((uni, i) => { */}
          {currentUniversities.map((uni, i) => {
            const disciplines = parseTopDisciplines(uni.top_disciplines);
            const imageUrls = getImages(uni.images);
            const mainImage = imageUrls[0];
            const logoImage = imageUrls[1] || imageUrls[0];

            return (
              <div
                key={uni.id || i}
                className="bg-white rounded-3xl shadow-md border border-black overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/about-university/${uni.id}`)}
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
                    <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      ● Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  {/* Logo + Name */}
                  <div className="flex items-center border-b pb-3">
                    <img
                      src={getImageUrl(logoImage)}
                      alt={`${uni.university_name} logo`}
                      className="w-10 h-10 mr-3 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/default-university.jpg";
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-black">
                        {safeDisplay(uni.university_name)}
                      </h3>
                      <p className="text-sm text-black italic">
                        {safeDisplay(uni.location)}
                      </p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="border-b pb-3">
                    <p className="text-base md:text-lg text-black leading-relaxed">
                      {safeDisplay(
                        uni.application_short_desc,
                        "No description available"
                      )}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="border-b pb-3">
                    <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
                      Quick Info
                    </h4>
                    <ul className="text-sm md:text-base text-black space-y-1">
                      <li>
                        <strong>Founded:</strong> {safeDisplay(uni.founded)}
                      </li>
                      <li>
                        <strong>Type:</strong>{" "}
                        {safeDisplay(uni.institution_type)}
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
                  </div>

                  {/* Programs */}
                  <div className="border-b pb-3">
                    <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
                      Programs
                    </h4>
                    <p className="text-sm md:text-base text-black">
                      <strong>Graduate:</strong>{" "}
                      {safeDisplay(uni.average_graduate_program)} –{" "}
                      {safeDisplay(uni.average_graduate_program_short_desc)}
                    </p>
                    <p className="text-sm md:text-base text-black">
                      <strong>Undergraduate:</strong>{" "}
                      {safeDisplay(uni.average_undergraduate_program)} –{" "}
                      {safeDisplay(
                        uni.average_undergraduate_program_short_desc
                      )}
                    </p>
                  </div>

                  {/* Cost Info */}
                  <div className="border-b pb-3">
                    <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
                      Costs
                    </h4>
                    <p className="text-sm md:text-base text-black">
                      <strong>Cost of Living:</strong>{" "}
                      {safeDisplay(uni.cost_of_living)} –{" "}
                      {safeDisplay(uni.cost_of_living_short_desc)}
                    </p>
                    <p className="text-sm md:text-base text-black">
                      <strong>Gross Tuition:</strong>{" "}
                      {safeDisplay(uni.average_gross_tuition)} –{" "}
                      {safeDisplay(uni.average_gross_tuition_short_desc)}
                    </p>
                  </div>

                  {/* Top Disciplines */}
                  {disciplines.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
                        Top Disciplines
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {disciplines.map((disc, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-black px-3 py-1 rounded-lg text-sm md:text-base shadow-sm"
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/university-apply")}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary transition"
          >
            Explore More Institutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Universities;
