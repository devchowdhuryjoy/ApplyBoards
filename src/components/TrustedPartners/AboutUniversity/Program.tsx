


import React, { useEffect, useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

/* ---------- Types ---------- */
interface Item {
  id: number;
  name?: string;
  title?: string;
  destination_name?: string;
  university_name?: string;
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
  item.destination_name ||
  item.university_name ||
  "Unnamed";

/* ---------- Fetch ---------- */
const fetchData = async (endpoint: string) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("API Error");
  const data = await res.json();
  return data.data ?? data;
};

const Program: React.FC = () => {
  /* ---------- Options ---------- */
  const [destinations, setDestinations] = useState<Item[]>([]);
  const [universities, setUniversities] = useState<Item[]>([]);
  const [programLevels, setProgramLevels] = useState<Item[]>([]);
  const [studyFields, setStudyFields] = useState<Item[]>([]);
  const [intakes, setIntakes] = useState<Item[]>([]);
  const [programTags, setProgramTags] = useState<Item[]>([]);

  /* ---------- Selected ---------- */
  const [destinationId, setDestinationId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [programLevelId, setProgramLevelId] = useState("");
  const [studyFieldId, setStudyFieldId] = useState("");
  const [intakeId, setIntakeId] = useState("");
  const [programTagId, setProgramTagId] = useState("");

  /* ---------- Load filter data ---------- */
  useEffect(() => {
    fetchData("/all/destination/filter").then(setDestinations);
    fetchData("/all/university/filter").then(setUniversities);
    fetchData("/all/program/level/filter").then(setProgramLevels);
    fetchData("/all/study/field/filter").then(setStudyFields);
    fetchData("/all/intakes/filter").then(setIntakes);
    fetchData("/all/program/tag/filter").then(setProgramTags);
  }, []);

  /* ---------- Destination → Universities ---------- */
  useEffect(() => {
    if (destinationId) {
      fetchData(`/destinations/${destinationId}/universities`)
        .then(setUniversities);
    }
  }, [destinationId]);

  /* ---------- Apply filters (program fetch ready) ---------- */
  useEffect(() => {
    if (universityId) fetchData(`/university/${universityId}/programs`);
    else if (programLevelId) fetchData(`/program/level/${programLevelId}/filter`);
    else if (studyFieldId) fetchData(`/study/field/${studyFieldId}/filter`);
    else if (intakeId) fetchData(`/intakes/${intakeId}/filter`);
    else if (programTagId) fetchData(`/program/${programTagId}/filter`);
  }, [
    universityId,
    programLevelId,
    studyFieldId,
    intakeId,
    programTagId,
  ]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">

      {/* 🔍 Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">

        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="What would you like to study?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#f16f22]"
          />
        </div>

        {/* Destination */}
        <select
          onChange={(e) => setDestinationId(e.target.value)}
          className="border border-black rounded-lg px-4 py-2"
        >
          <option value="">Destination</option>
          {destinations.map(d => (
            <option key={d.id} value={d.id}>{getName(d)}</option>
          ))}
        </select>

        {/* University */}
        <select
          onChange={(e) => setUniversityId(e.target.value)}
          className="border border-black rounded-lg px-4 py-2"
        >
          <option value="">Institution (School)</option>
          {universities.map(u => (
            <option key={u.id} value={u.id}>{getName(u)}</option>
          ))}
        </select>
      </div>

      {/* 🔽 Extra Filters */}
      <div className="flex flex-wrap items-center gap-3 mt-4">

        <select
          onChange={(e) => setProgramLevelId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Program level</option>
          {programLevels.map(p => (
            <option key={p.id} value={p.id}>{getName(p)}</option>
          ))}
        </select>

        <select
          onChange={(e) => setStudyFieldId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Field of study</option>
          {studyFields.map(s => (
            <option key={s.id} value={s.id}>{getName(s)}</option>
          ))}
        </select>

        <select
          onChange={(e) => setIntakeId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Intakes</option>
          {intakes.map(i => (
            <option key={i.id} value={i.id}>{getName(i)}</option>
          ))}
        </select>

        <select
          onChange={(e) => setProgramTagId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Program tag</option>
          {programTags.map(t => (
            <option key={t.id} value={t.id}>{getName(t)}</option>
          ))}
        </select>

        <button className="bg-[#f16f22] text-white px-5 py-2 rounded-lg">
          All filters
        </button>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between">
        <p className="text-lg font-semibold">Programs</p>
        <button className="border px-4 py-2 rounded-lg">Sort</button>
      </div>
    </div>
  );
};

export default Program;




