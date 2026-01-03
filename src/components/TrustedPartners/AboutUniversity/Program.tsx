
// import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// /* ---------- Types ---------- */
// interface Item {
//   id: number;
//   name?: string;
//   title?: string;
//   destinations_name?: string;
//   university_name?: string;
//   program_tag?: string;
// }

// interface ProgramProps {
//   onFilterChange: (filters: {
//     destinationId?: string;
//     universityId?: string;
//     programLevelId?: string;
//     studyFieldId?: string;
//     intakeId?: string;
//     programTagId?: string;
//     searchQuery?: string;
//   }) => void;
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
//   item.destinations_name ||
//   item.university_name ||
//   item.program_tag ||
//   "Unnamed";

// /* ---------- Fetch Data ---------- */
// const fetchData = async (endpoint: string) => {
//   try {
//     const token = getToken();
//     const res = await fetch(`${BASE_URL}${endpoint}`, {
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//     });
    
//     if (!res.ok) {
//       throw new Error(`API Error: ${res.status}`);
//     }
    
//     const data = await res.json();
    
//     // Always return an array
//     if (Array.isArray(data)) {
//       return data;
//     } else if (data.data && Array.isArray(data.data)) {
//       return data.data;
//     } else if (data.universities && Array.isArray(data.universities)) {
//       return data.universities;
//     } else if (data.destinations && Array.isArray(data.destinations)) {
//       return data.destinations;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error(`Error fetching from ${endpoint}:`, error);
//     return [];
//   }
// };

// // Create ref for Program component
// export interface ProgramHandle {
//   scrollToTop: () => void;
// }

// const Program = forwardRef<ProgramHandle, ProgramProps>(({ onFilterChange }, ref) => {
//   /* ---------- State ---------- */
//   const [destinations, setDestinations] = useState<Item[]>([]);
//   const [allUniversities, setAllUniversities] = useState<Item[]>([]);
//   const [filteredUniversities, setFilteredUniversities] = useState<Item[]>([]);
//   const [programLevels, setProgramLevels] = useState<Item[]>([]);
//   const [studyFields, setStudyFields] = useState<Item[]>([]);
//   const [intakes, setIntakes] = useState<Item[]>([]);
//   const [programTags, setProgramTags] = useState<Item[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   /* ---------- Selected Filters ---------- */
//   const [destinationId, setDestinationId] = useState("");
//   const [universityId, setUniversityId] = useState("");
//   const [programLevelId, setProgramLevelId] = useState("");
//   const [studyFieldId, setStudyFieldId] = useState("");
//   const [intakeId, setIntakeId] = useState("");
//   const [programTagId, setProgramTagId] = useState("");

//   /* ---------- Expose scrollToTop function via ref ---------- */
//   useImperativeHandle(ref, () => ({
//     scrollToTop: () => {
//       const resultsSection = document.getElementById('results-section');
//       if (resultsSection) {
//         resultsSection.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         });
//       } else {
//         window.scrollTo({
//           top: 0,
//           behavior: "smooth",
//         });
//       }
//     },
//   }));

//   /* ---------- Load all filter data ---------- */
//   useEffect(() => {
//     const loadFilterData = async () => {
//       try {
//         const [
//           destData,
//           uniData,
//           progLevelData,
//           studyFieldData,
//           intakeData,
//           progTagData
//         ] = await Promise.all([
//           fetchData("/all/destination/filter"),
//           fetchData("/all/university/filter"),
//           fetchData("/all/program/level/filter"),
//           fetchData("/all/study/field/filter"),
//           fetchData("/all/intakes/filter"),
//           fetchData("/all/program/tag/filter")
//         ]);

//         console.log("Destinations loaded:", destData);
//         console.log("Universities loaded:", uniData);

//         setDestinations(destData);
//         setAllUniversities(uniData);
//         setFilteredUniversities(uniData);
//         setProgramLevels(progLevelData);
//         setStudyFields(studyFieldData);
//         setIntakes(intakeData);
//         setProgramTags(progTagData);
//       } catch (error) {
//         console.error("Error loading filter data:", error);
//       }
//     };

//     loadFilterData();
//   }, []);

//   /* ---------- Filter Universities by Destination ---------- */
//   useEffect(() => {
//     const filterUniversitiesByDestination = async () => {
//       console.log("Filtering universities by destination:", destinationId);
      
//       if (destinationId) {
//         try {
//           // Instead of fetching from API, filter from all universities
//           // assuming universities have a destination_id field
//           const filtered = allUniversities.filter(uni => 
//             uni.destination_id?.toString() === destinationId
//           );
          
//           console.log("Filtered universities:", filtered);
//           setFilteredUniversities(filtered.length > 0 ? filtered : allUniversities);
          
//           // Reset university selection if selected university is not in filtered list
//           if (universityId && !filtered.some((u: Item) => u.id && u.id.toString() === universityId)) {
//             setUniversityId("");
//             onFilterChange({
//               destinationId,
//               universityId: "",
//               programLevelId,
//               studyFieldId,
//               intakeId,
//               programTagId,
//               searchQuery,
//             });
//           }
//         } catch (error) {
//           console.error("Error filtering universities by destination:", error);
//           setFilteredUniversities(allUniversities);
//         }
//       } else {
//         setFilteredUniversities(allUniversities);
//       }
//     };

//     filterUniversitiesByDestination();
//   }, [destinationId, allUniversities]);

//   /* ---------- Handle Filter Change ---------- */
//   const handleSelectChange = (
//     value: string,
//     type: 'destination' | 'university' | 'programLevel' | 'studyField' | 'intake' | 'programTag'
//   ) => {
//     console.log(`Filter change: ${type} = ${value}`);
    
//     // Update local state
//     const setters = {
//       destination: setDestinationId,
//       university: setUniversityId,
//       programLevel: setProgramLevelId,
//       studyField: setStudyFieldId,
//       intake: setIntakeId,
//       programTag: setProgramTagId,
//     };
    
//     setters[type](value);
    
//     // Prepare filters for parent
//     const filters = {
//       destinationId: type === 'destination' ? value : destinationId,
//       universityId: type === 'university' ? value : universityId,
//       programLevelId: type === 'programLevel' ? value : programLevelId,
//       studyFieldId: type === 'studyField' ? value : studyFieldId,
//       intakeId: type === 'intake' ? value : intakeId,
//       programTagId: type === 'programTag' ? value : programTagId,
//       searchQuery,
//     };
    
//     console.log("Sending filters to parent:", filters);
//     onFilterChange(filters);
//   };

//   /* ---------- Handle Search ---------- */
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
    
//     const timeoutId = setTimeout(() => {
//       onFilterChange({
//         destinationId,
//         universityId,
//         programLevelId,
//         studyFieldId,
//         intakeId,
//         programTagId,
//         searchQuery: value,
//       });
//     }, 500);
    
//     return () => clearTimeout(timeoutId);
//   };

//   /* ---------- Clear All Filters ---------- */
//   const handleClearFilters = () => {
//     console.log("Clearing all filters");
//     setDestinationId("");
//     setUniversityId("");
//     setProgramLevelId("");
//     setStudyFieldId("");
//     setIntakeId("");
//     setProgramTagId("");
//     setSearchQuery("");
//     setFilteredUniversities(allUniversities);
    
//     onFilterChange({});
//   };

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto" id="program-filters">
//       {/* 🔍 Search & Main Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
//         {/* Search Input */}
//         <div className="flex-1">
//           <input
//             type="text"
//             placeholder="What would you like to study?"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>

//         {/* Destination Dropdown */}
//         <select
//           value={destinationId}
//           onChange={(e) => handleSelectChange(e.target.value, 'destination')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//         >
//           <option value="">All Destinations</option>
//           {destinations.map((d) => (
//             <option key={d.id} value={d.id}>
//               {getName(d)}
//             </option>
//           ))}
//         </select>

//         {/* University Dropdown */}
//         <select
//           value={universityId}
//           onChange={(e) => handleSelectChange(e.target.value, 'university')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[180px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//           disabled={!Array.isArray(filteredUniversities) || filteredUniversities.length === 0}
//         >
//           <option value="">All Institutions</option>
//           {Array.isArray(filteredUniversities) && filteredUniversities.length > 0 ? (
//             filteredUniversities.map((u) => (
//               <option key={u.id} value={u.id}>
//                 {getName(u)}
//               </option>
//             ))
//           ) : (
//             <option value="" disabled>No universities available</option>
//           )}
//         </select>
//       </div>

//       {/* 🔽 Additional Filters */}
//       <div className="flex flex-wrap items-center gap-3 mt-4">
//         <select
//           value={programLevelId}
//           onChange={(e) => handleSelectChange(e.target.value, 'programLevel')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//         >
//           <option value="">All Program Levels</option>
//           {programLevels.map((p) => (
//             <option key={p.id} value={p.id}>
//               {getName(p)}
//             </option>
//           ))}
//         </select>

//         <select
//           value={studyFieldId}
//           onChange={(e) => handleSelectChange(e.target.value, 'studyField')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//         >
//           <option value="">All Fields of Study</option>
//           {studyFields.map((s) => (
//             <option key={s.id} value={s.id}>
//               {getName(s)}
//             </option>
//           ))}
//         </select>

//         <select
//           value={intakeId}
//           onChange={(e) => handleSelectChange(e.target.value, 'intake')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[120px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//         >
//           <option value="">All Intakes</option>
//           {intakes.map((i) => (
//             <option key={i.id} value={i.id}>
//               {getName(i)}
//             </option>
//           ))}
//         </select>

//         <select
//           value={programTagId}
//           onChange={(e) => handleSelectChange(e.target.value, 'programTag')}
//           className="border border-gray-300 rounded-lg px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
//         >
//           <option value="">All Program Tags</option>
//           {programTags.map((t) => (
//             <option key={t.id} value={t.id}>
//               {getName(t)}
//             </option>
//           ))}
//         </select>

//         {/* Clear All Filters Button */}
//         {(destinationId || universityId || programLevelId || studyFieldId || intakeId || programTagId || searchQuery) && (
//           <button
//             onClick={handleClearFilters}
//             className="bg-red-100 text-red-700 px-5 py-2 rounded-lg hover:bg-red-200 transition font-medium"
//           >
//             Clear All Filters
//           </button>
//         )}
//       </div>

//       <hr className="my-6 border-gray-200" />

//       {/* Programs Header */}
//       <div className="flex justify-between items-center">
//         <p className="text-lg font-semibold text-gray-800">Programs</p>
//         <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700">
//           Sort by: Recommended
//         </button>
//       </div>
//     </div>
//   );
// });

// export default Program;



import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

/* ---------- Types ---------- */
interface University {
  id: number;
  name?: string;
  title?: string;
  university_name?: string;
  destination_id?: number;
}

interface Destination {
  id: number;
  name?: string;
  title?: string;
  destinations_name?: string;
  created_at: string;
  updated_at: string;
  universities: University[];
}

interface Item {
  id: number;
  name?: string;
  title?: string;
  destinations_name?: string;
  university_name?: string;
  program_tag?: string;
  destination_id?: number;
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

const getName = (item: Item | Destination | University) =>
  item.name ||
  item.title ||
  item.destinations_name ||
  item.university_name ||
  item.program_tag ||
  "Unnamed";

const getUniversityName = (uni: University) =>
  uni.university_name || uni.name || uni.title || "Unnamed University";

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
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
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
        console.log("First destination universities array:", destData[0]?.universities);
        console.log("Universities from separate endpoint:", uniData);

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
    const filterUniversitiesByDestination = () => {
      console.log("Filtering universities for destination:", destinationId);
      
      if (destinationId) {
        try {
          // Find the selected destination
          const selectedDestination = destinations.find(d => d.id.toString() === destinationId);
          
          if (!selectedDestination) {
            console.log("Destination not found in destinations array");
            setFilteredUniversities([]);
            return;
          }
          
          console.log("Selected destination:", selectedDestination);
          
          // Check if universities array exists and has data
          if (selectedDestination.universities && selectedDestination.universities.length > 0) {
            console.log("Using universities from destination object:", selectedDestination.universities);
            console.log("First university in array:", selectedDestination.universities[0]);
            
            // Map the universities to match University type
            const destinationUnis: University[] = selectedDestination.universities.map((uni: any) => ({
              id: uni.id,
              name: uni.name,
              title: uni.title,
              university_name: uni.university_name || uni.name,
              destination_id: uni.destination_id
            }));
            
            console.log("Mapped universities:", destinationUnis);
            setFilteredUniversities(destinationUnis);
          } else {
            // If no universities in destination object, use all universities
            console.log("No universities in destination object, using all universities");
            console.log("All universities count:", allUniversities.length);
            setFilteredUniversities(allUniversities);
          }
          
          // Reset university selection
          setUniversityId("");
          
        } catch (error) {
          console.error("Error in filterUniversitiesByDestination:", error);
          setFilteredUniversities(allUniversities);
        }
      } else {
        // No destination selected
        console.log("No destination selected, showing all universities");
        setFilteredUniversities(allUniversities);
      }
    };

    filterUniversitiesByDestination();
  }, [destinationId, destinations, allUniversities]);

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
    
    // Prepare filters for parent -
    const filters = {
      destinationId: type === 'destination' ? value : destinationId,
      universityId: type === 'university' ? value : universityId,
      programLevelId: type === 'programLevel' ? value : programLevelId,
      studyFieldId: type === 'studyField' ? value : studyFieldId,
      intakeId: type === 'intake' ? value : intakeId,
      programTagId: type === 'programTag' ? value : programTagId,
      searchQuery,
    };
    
    console.log("Sending ALL filters to parent:", filters);
    onFilterChange(filters);
  };

  /* ---------- Handle Search ---------- */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const timeoutId = setTimeout(() => {
      const filters = {
        destinationId,
        universityId,
        programLevelId,
        studyFieldId,
        intakeId,
        programTagId,
        searchQuery: value,
      };
      
      console.log("Search filter changed:", filters);
      onFilterChange(filters);
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
          onChange={(e) => {
            const value = e.target.value;
            console.log("Destination changed to:", value);
            
            // Find and log the selected destination
            const selected = destinations.find(d => d.id.toString() === value);
            console.log("Selected destination object:", selected);
            
            if (selected && selected.universities) {
              console.log("Universities in selected destination:", selected.universities);
              console.log("Universities array length:", selected.universities.length);
              console.log("First university details:", selected.universities[0]);
            }
            
            handleSelectChange(value, 'destination');
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Destinations</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {getName(d)} {d.universities && d.universities.length > 0 ? `(${d.universities.length})` : ''}
            </option>
          ))}
        </select>

        {/* University Dropdown */}
        <select
          value={universityId}
          onChange={(e) => {
            console.log("University selected:", e.target.value);
            handleSelectChange(e.target.value, 'university');
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[180px] focus:ring-2 focus:ring-[#f16f22] focus:border-[#f16f22] outline-none transition cursor-pointer"
        >
          <option value="">All Institutions ({filteredUniversities.length})</option>
          {destinationId && filteredUniversities.length === 0 ? (
            <option value="" disabled>
              No universities found for {destinations.find(d => d.id.toString() === destinationId)?.destinations_name}
            </option>
          ) : (
            filteredUniversities.map((u) => (
              <option key={u.id} value={u.id}>
                {getUniversityName(u)} {u.destination_id ? `(Dest: ${u.destination_id})` : ''}
              </option>
            ))
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
