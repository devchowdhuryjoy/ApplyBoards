


// import React, { useEffect, useState } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// /* ---------- Types ---------- */
// interface Item {
//   id: number;
//   name?: string;
//   title?: string;
//   destination_name?: string;
//   university_name?: string;
// }

// /* ---------- Helpers ---------- */
// const getToken = () => {
//   const auth = localStorage.getItem("auth");
//   if (!auth) return null;
//   try {
//     return JSON.parse(auth).token;
//   } catch {
//     return null;
//   }
// };

// const getName = (item: Item) =>
//   item.name ||
//   item.title ||
//   item.destination_name ||
//   item.university_name ||
//   "Unnamed";

// /* ---------- Fetch ---------- */
// const fetchData = async (endpoint: string) => {
//   const token = getToken();
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//   });
//   if (!res.ok) throw new Error("API Error");
//   const data = await res.json();
//   return data.data ?? data;
// };

// const Program: React.FC = () => {
//   /* ---------- Options ---------- */
//   const [destinations, setDestinations] = useState<Item[]>([]);
//   const [universities, setUniversities] = useState<Item[]>([]);
//   const [programLevels, setProgramLevels] = useState<Item[]>([]);
//   const [studyFields, setStudyFields] = useState<Item[]>([]);
//   const [intakes, setIntakes] = useState<Item[]>([]);
//   const [programTags, setProgramTags] = useState<Item[]>([]);

//   /* ---------- Selected ---------- */
//   const [destinationId, setDestinationId] = useState("");
//   const [universityId, setUniversityId] = useState("");
//   const [programLevelId, setProgramLevelId] = useState("");
//   const [studyFieldId, setStudyFieldId] = useState("");
//   const [intakeId, setIntakeId] = useState("");
//   const [programTagId, setProgramTagId] = useState("");

//   /* ---------- Load filter data ---------- */
//   useEffect(() => {
//     fetchData("/all/destination/filter").then(setDestinations);
//     fetchData("/all/university/filter").then(setUniversities);
//     fetchData("/all/program/level/filter").then(setProgramLevels);
//     fetchData("/all/study/field/filter").then(setStudyFields);
//     fetchData("/all/intakes/filter").then(setIntakes);
//     fetchData("/all/program/tag/filter").then(setProgramTags);
//   }, []);

//   /* ---------- Destination → Universities ---------- */
//   useEffect(() => {
//     if (destinationId) {
//       fetchData(`/destinations/${destinationId}/universities`)
//         .then(setUniversities);
//     }
//   }, [destinationId]);

//   /* ---------- Apply filters (program fetch ready) ---------- */
//   useEffect(() => {
//     if (universityId) fetchData(`/university/${universityId}/programs`);
//     else if (programLevelId) fetchData(`/program/level/${programLevelId}/filter`);
//     else if (studyFieldId) fetchData(`/study/field/${studyFieldId}/filter`);
//     else if (intakeId) fetchData(`/intakes/${intakeId}/filter`);
//     else if (programTagId) fetchData(`/program/${programTagId}/filter`);
//   }, [
//     universityId,
//     programLevelId,
//     studyFieldId,
//     intakeId,
//     programTagId,
//   ]);

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto">

//       {/* 🔍 Search & Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">

//         {/* Search */}
//         <div className="flex-1">
//           <input
//             type="text"
//             placeholder="What would you like to study?"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22]"
//           />
//         </div>

//         {/* Destination */}
//         <select
//           onChange={(e) => setDestinationId(e.target.value)}
//           className="border border-black rounded-lg px-4 py-2"
//         >
//           <option value="">Destination</option>
//           {destinations.map(d => (
//             <option key={d.id} value={d.id}>{getName(d)}</option>
//           ))}
//         </select>

//         {/* University */}
//         <select
//           onChange={(e) => setUniversityId(e.target.value)}
//           className="border border-black rounded-lg px-4 py-2"
//         >
//           <option value="">Institution (School)</option>
//           {universities.map(u => (
//             <option key={u.id} value={u.id}>{getName(u)}</option>
//           ))}
//         </select>
//       </div>

//       {/* 🔽 Extra Filters */}
//       <div className="flex flex-wrap items-center gap-3 mt-4">

//         <select
//           onChange={(e) => setProgramLevelId(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2"
//         >
//           <option value="">Program level</option>
//           {programLevels.map(p => (
//             <option key={p.id} value={p.id}>{getName(p)}</option>
//           ))}
//         </select>

//         <select
//           onChange={(e) => setStudyFieldId(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2"
//         >
//           <option value="">Field of study</option>
//           {studyFields.map(s => (
//             <option key={s.id} value={s.id}>{getName(s)}</option>
//           ))}
//         </select>

//         <select
//           onChange={(e) => setIntakeId(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2"
//         >
//           <option value="">Intakes</option>
//           {intakes.map(i => (
//             <option key={i.id} value={i.id}>{getName(i)}</option>
//           ))}
//         </select>

//         <select
//           onChange={(e) => setProgramTagId(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2"
//         >
//           <option value="">Program tag</option>
//           {programTags.map(t => (
//             <option key={t.id} value={t.id}>{getName(t)}</option>
//           ))}
//         </select>

//         <button className="bg-[#f16f22] text-white px-5 py-2 rounded-lg">
//           All filters
//         </button>
//       </div>

//       <hr className="my-6" />

//       <div className="flex justify-between">
//         <p className="text-lg font-semibold">Programs</p>
//         <button className="border px-4 py-2 rounded-lg">Sort</button>
//       </div>
//     </div>
//   );
// };

// export default Program;




import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

/* ---------- Types ---------- */
interface Item {
  id: number;
  name?: string;
  title?: string;
  destinations_name?: string;
  university_name?: string;
  program_tag?: string;
}

interface ProgramProps {
  onFilterChange: (filters: {
    destinationId?: string;
    universityId?: string;
    programLevelId?: string;
    studyFieldId?: string;
    intakeId?: string;
    programTagId?: string;
    searchQuery?: string;
  }) => void;
}

/* ---------- Helpers ---------- */
const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  try {
    return JSON.parse(auth).token;
  } catch {
    return null;
  }
};

const getName = (item: Item) =>
  item.name ||
  item.title ||
  item.destinations_name ||
  item.university_name ||
  item.program_tag ||
  "Unnamed";

/* ---------- Fetch Data ---------- */
const fetchData = async (endpoint: string) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Always return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else if (data.universities && Array.isArray(data.universities)) {
      return data.universities;
    } else if (data.destinations && Array.isArray(data.destinations)) {
      return data.destinations;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
};

// Create ref for Program component
export interface ProgramHandle {
  scrollToTop: () => void;
}

const Program = forwardRef<ProgramHandle, ProgramProps>(({ onFilterChange }, ref) => {
  /* ---------- State ---------- */
  const [destinations, setDestinations] = useState<Item[]>([]);
  const [allUniversities, setAllUniversities] = useState<Item[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<Item[]>([]);
  const [programLevels, setProgramLevels] = useState<Item[]>([]);
  const [studyFields, setStudyFields] = useState<Item[]>([]);
  const [intakes, setIntakes] = useState<Item[]>([]);
  const [programTags, setProgramTags] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------- Selected Filters ---------- */
  const [destinationId, setDestinationId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [programLevelId, setProgramLevelId] = useState("");
  const [studyFieldId, setStudyFieldId] = useState("");
  const [intakeId, setIntakeId] = useState("");
  const [programTagId, setProgramTagId] = useState("");

  /* ---------- Expose scrollToTop function via ref ---------- */
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  }));

  /* ---------- Load all filter data ---------- */
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [
          destData,
          uniData,
          progLevelData,
          studyFieldData,
          intakeData,
          progTagData
        ] = await Promise.all([
          fetchData("/all/destination/filter"),
          fetchData("/all/university/filter"),
          fetchData("/all/program/level/filter"),
          fetchData("/all/study/field/filter"),
          fetchData("/all/intakes/filter"),
          fetchData("/all/program/tag/filter")
        ]);

        console.log("Destinations loaded:", destData);
        console.log("Universities loaded:", uniData);

        setDestinations(destData);
        setAllUniversities(uniData);
        setFilteredUniversities(uniData);
        setProgramLevels(progLevelData);
        setStudyFields(studyFieldData);
        setIntakes(intakeData);
        setProgramTags(progTagData);
      } catch (error) {
        console.error("Error loading filter data:", error);
      }
    };

    loadFilterData();
  }, []);

  /* ---------- Filter Universities by Destination ---------- */
  useEffect(() => {
    const filterUniversitiesByDestination = async () => {
      console.log("Filtering universities by destination:", destinationId);
      
      if (destinationId) {
        try {
          // Instead of fetching from API, filter from all universities
          // assuming universities have a destination_id field
          const filtered = allUniversities.filter(uni => 
            uni.destination_id?.toString() === destinationId
          );
          
          console.log("Filtered universities:", filtered);
          setFilteredUniversities(filtered.length > 0 ? filtered : allUniversities);
          
          // Reset university selection if selected university is not in filtered list
          if (universityId && !filtered.some((u: Item) => u.id && u.id.toString() === universityId)) {
            setUniversityId("");
            onFilterChange({
              destinationId,
              universityId: "",
              programLevelId,
              studyFieldId,
              intakeId,
              programTagId,
              searchQuery,
            });
          }
        } catch (error) {
          console.error("Error filtering universities by destination:", error);
          setFilteredUniversities(allUniversities);
        }
      } else {
        setFilteredUniversities(allUniversities);
      }
    };

    filterUniversitiesByDestination();
  }, [destinationId, allUniversities]);

  /* ---------- Handle Filter Change ---------- */
  const handleSelectChange = (
    value: string,
    type: 'destination' | 'university' | 'programLevel' | 'studyField' | 'intake' | 'programTag'
  ) => {
    console.log(`Filter change: ${type} = ${value}`);
    
    // Update local state
    const setters = {
      destination: setDestinationId,
      university: setUniversityId,
      programLevel: setProgramLevelId,
      studyField: setStudyFieldId,
      intake: setIntakeId,
      programTag: setProgramTagId,
    };
    
    setters[type](value);
    
    // Prepare filters for parent
    const filters = {
      destinationId: type === 'destination' ? value : destinationId,
      universityId: type === 'university' ? value : universityId,
      programLevelId: type === 'programLevel' ? value : programLevelId,
      studyFieldId: type === 'studyField' ? value : studyFieldId,
      intakeId: type === 'intake' ? value : intakeId,
      programTagId: type === 'programTag' ? value : programTagId,
      searchQuery,
    };
    
    console.log("Sending filters to parent:", filters);
    onFilterChange(filters);
  };

  /* ---------- Handle Search ---------- */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const timeoutId = setTimeout(() => {
      onFilterChange({
        destinationId,
        universityId,
        programLevelId,
        studyFieldId,
        intakeId,
        programTagId,
        searchQuery: value,
      });
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  /* ---------- Clear All Filters ---------- */
  const handleClearFilters = () => {
    console.log("Clearing all filters");
    setDestinationId("");
    setUniversityId("");
    setProgramLevelId("");
    setStudyFieldId("");
    setIntakeId("");
    setProgramTagId("");
    setSearchQuery("");
    setFilteredUniversities(allUniversities);
    
    onFilterChange({});
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto" id="program-filters">
      {/* 🔍 Search & Main Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="What would you like to study?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Destination Dropdown */}
        <select
          value={destinationId}
          onChange={(e) => handleSelectChange(e.target.value, 'destination')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {getName(d)}
            </option>
          ))}
        </select>

        {/* University Dropdown */}
        <select
          value={universityId}
          onChange={(e) => handleSelectChange(e.target.value, 'university')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[180px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
          disabled={!Array.isArray(filteredUniversities) || filteredUniversities.length === 0}
        >
          <option value="">All Institutions</option>
          {Array.isArray(filteredUniversities) && filteredUniversities.length > 0 ? (
            filteredUniversities.map((u) => (
              <option key={u.id} value={u.id}>
                {getName(u)}
              </option>
            ))
          ) : (
            <option value="" disabled>No universities available</option>
          )}
        </select>
      </div>

      {/* 🔽 Additional Filters */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <select
          value={programLevelId}
          onChange={(e) => handleSelectChange(e.target.value, 'programLevel')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Program Levels</option>
          {programLevels.map((p) => (
            <option key={p.id} value={p.id}>
              {getName(p)}
            </option>
          ))}
        </select>

        <select
          value={studyFieldId}
          onChange={(e) => handleSelectChange(e.target.value, 'studyField')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Fields of Study</option>
          {studyFields.map((s) => (
            <option key={s.id} value={s.id}>
              {getName(s)}
            </option>
          ))}
        </select>

        <select
          value={intakeId}
          onChange={(e) => handleSelectChange(e.target.value, 'intake')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[120px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Intakes</option>
          {intakes.map((i) => (
            <option key={i.id} value={i.id}>
              {getName(i)}
            </option>
          ))}
        </select>

        <select
          value={programTagId}
          onChange={(e) => handleSelectChange(e.target.value, 'programTag')}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Program Tags</option>
          {programTags.map((t) => (
            <option key={t.id} value={t.id}>
              {getName(t)}
            </option>
          ))}
        </select>

        {/* Clear All Filters Button */}
        {(destinationId || universityId || programLevelId || studyFieldId || intakeId || programTagId || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="bg-red-100 text-red-700 px-5 py-2 rounded-lg hover:bg-red-200 transition font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Programs Header */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-800">Programs</p>
        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700">
          Sort by: Recommended
        </button>
      </div>
    </div>
  );
});

export default Program;




