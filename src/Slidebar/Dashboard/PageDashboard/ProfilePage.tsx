// import React from "react";
// import { ArrowRight } from "lucide-react";

// const ProfilePage: React.FC = () => {
//   return (
//     <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
//       {/* 🔶 Header Banner */}
//       <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden">
//         <div className="max-w-2xl">
//           <h2 className="text-xl sm:text-3xl font-bold mb-3">
//             My Profile
//           </h2>
//           <p className="text-sm sm:text-base mb-4 text-justify hyphens-auto">
//             Manage and update your profile information here.
//           </p>
//           <button className="bg-white text-black px-2 md:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
//             Edit Profile
//           </button>
//         </div>

//         {/* Decorative Icon */}
//         <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-30 pointer-events-none">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="orange"
//             viewBox="0 0 24 24"
//             className="w-32 h-32 sm:w-40 sm:h-40"
//           >
//             <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A7.002 7.002 0 0 1 5.07 13H7a1 1 0 1 1 0 2H5.07A7.002 7.002 0 0 1 11 17.93zM13 6.07V5a1 1 0 1 1 2 0v1.07A7.002 7.002 0 0 1 18.93 11H17a1 1 0 1 1 0-2h1.93A7.002 7.002 0 0 1 13 6.07z" />
//           </svg>
//         </div>
//       </div>

//       {/* 🔶 Profile Sections */}
//       <div className="mt-10 flex flex-col gap-6">
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">Personal Information</h2>
//           <p className="text-black text-sm mb-4">
//             Update your name, email, phone number, and other details.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             Edit Personal Info <ArrowRight size={18} />
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-black mb-2">Account Settings</h2>
//           <p className="text-black text-sm mb-4">
//             Change your password, manage notifications, and account preferences.
//           </p>
//           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition flex items-center gap-2">
//             Update Settings <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const ProfilePage: React.FC = () => {
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });

  // Passport / Identity Info
  const [passportInfo, setPassportInfo] = useState({
    passportNumber: "",
    expiryDate: "",
    nationality: "",
    countryResidence: "",
  });

  // Academic Info
  const [academicList, setAcademicList] = useState<
    { qualification: string; institution: string; year: string; cgpa: string }[]
  >([]);
  const [academic, setAcademic] = useState({
    qualification: "",
    institution: "",
    year: "",
    cgpa: "",
  });

  // Test Scores
  const [testList, setTestList] = useState<
    { testName: string; score: string; year: string }[]
  >([]);
  const [test, setTest] = useState({
    testName: "",
    score: "",
    year: "",
  });

  // Program Details
  const [programDetails, setProgramDetails] = useState({
    desiredProgram: "",
    intake: "",
    studyLevel: "",
    specialization: "",
  });

  // Work Experience
  const [workList, setWorkList] = useState<
    {
      organization: string;
      position: string;
      start: string;
      end: string;
      description: string;
    }[]
  >([]);
  const [work, setWork] = useState({
    organization: "",
    position: "",
    start: "",
    end: "",
    description: "",
  });

  // References
  const [referenceList, setReferenceList] = useState<
    { name: string; email: string; relationship: string; phone?: string }[]
  >([]);
  const [reference, setReference] = useState({
    name: "",
    email: "",
    relationship: "",
    phone: "",
  });

  // SOP & Extracurriculars
  const [sop, setSop] = useState("");
  const [extra, setExtra] = useState("");

  // Attachments
  const [attachments, setAttachments] = useState<{
    resume?: File;
    passportCopy?: File;
    transcripts?: File;
    testReport?: File;
    photo?: File;
  }>({});

  // Profile Completion %
  const totalFields =
    Object.values(personalInfo).length + Object.values(passportInfo).length;
  const filledFields =
    Object.values(personalInfo).filter((val) => val !== "").length +
    Object.values(passportInfo).filter((val) => val !== "").length;
  const profilePercent = Math.round((filledFields / totalFields) * 100);

  // Handlers
  const handleChange =
    (setter: any) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

  const handleAddListItem = (
    item: any,
    list: any,
    setList: any,
    resetItem: any
  ) => {
    const hasValues = Object.values(item).every((val) => val !== "");
    if (hasValues) {
      setList([...list, item]);
      resetItem();
    }
  };

  const handleRemoveListItem = (index: number, list: any, setList: any) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const handleAttachmentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof attachments
  ) => {
    if (e.target.files && e.target.files[0]) {
      setAttachments({ ...attachments, [key]: e.target.files[0] });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-700 rounded-2xl text-white p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>
        <p className="text-sm mb-4">Complete your profile information below.</p>
        <div className="w-full bg-white/30 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full text-xs text-center text-white"
            style={{ width: `${profilePercent}%` }}
          >
            {profilePercent}%
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={personalInfo.fullName}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            name="dob"
            value={personalInfo.dob}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          />
          <select
            name="gender"
            value={personalInfo.gender}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={personalInfo.phone}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={personalInfo.address}
            onChange={handleChange(setPersonalInfo)}
            className="border p-2 rounded w-full"
          />
        </div>
      </Section>

      {/* Passport / Identity */}
      <Section title="Passport / Identity Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="passportNumber"
            placeholder="Passport Number"
            value={passportInfo.passportNumber}
            onChange={handleChange(setPassportInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={passportInfo.expiryDate}
            onChange={handleChange(setPassportInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={passportInfo.nationality}
            onChange={handleChange(setPassportInfo)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="countryResidence"
            placeholder="Country of Residence"
            value={passportInfo.countryResidence}
            onChange={handleChange(setPassportInfo)}
            className="border p-2 rounded w-full"
          />
        </div>
      </Section>

      {/* Program Details */}
      <Section title="Program Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="desiredProgram"
            placeholder="Desired Program / Course"
            value={programDetails.desiredProgram}
            onChange={handleChange(setProgramDetails)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="intake"
            placeholder="Preferred Intake / Semester"
            value={programDetails.intake}
            onChange={handleChange(setProgramDetails)}
            className="border p-2 rounded w-full"
          />
          <select
            name="studyLevel"
            value={programDetails.studyLevel}
            onChange={handleChange(setProgramDetails)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Study Level</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
          <input
            type="text"
            name="specialization"
            placeholder="Specialization / Major"
            value={programDetails.specialization}
            onChange={handleChange(setProgramDetails)}
            className="border p-2 rounded w-full"
          />
        </div>
      </Section>

      {/* Academic Qualification */}
      <Section title="Academic Qualification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Qualification"
            value={academic.qualification}
            onChange={(e) =>
              setAcademic({ ...academic, qualification: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Institution"
            value={academic.institution}
            onChange={(e) =>
              setAcademic({ ...academic, institution: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Year"
            value={academic.year}
            onChange={(e) => setAcademic({ ...academic, year: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="CGPA / GPA"
            value={academic.cgpa}
            onChange={(e) => setAcademic({ ...academic, cgpa: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={() =>
            handleAddListItem(academic, academicList, setAcademicList, () =>
              setAcademic({
                qualification: "",
                institution: "",
                year: "",
                cgpa: "",
              })
            )
          }
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Academic
        </button>
        <ListDisplay
          list={academicList}
          remove={handleRemoveListItem}
          listSetter={setAcademicList}
        />
      </Section>

      {/* Test Scores */}
      <Section title="Test Scores">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={test.testName}
            onChange={(e) => setTest({ ...test, testName: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Test</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="GRE">GRE</option>
            <option value="GMAT">GMAT</option>
          </select>
          <input
            type="text"
            placeholder="Score"
            value={test.score}
            onChange={(e) => setTest({ ...test, score: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Year"
            value={test.year}
            onChange={(e) => setTest({ ...test, year: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={() =>
            handleAddListItem(test, testList, setTestList, () =>
              setTest({ testName: "", score: "", year: "" })
            )
          }
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Test Score
        </button>
        <ListDisplay
          list={testList}
          remove={handleRemoveListItem}
          listSetter={setTestList}
        />
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Organization"
            value={work.organization}
            onChange={(e) => setWork({ ...work, organization: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Position"
            value={work.position}
            onChange={(e) => setWork({ ...work, position: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={work.start}
            onChange={(e) => setWork({ ...work, start: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={work.end}
            onChange={(e) => setWork({ ...work, end: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={work.description}
            onChange={(e) => setWork({ ...work, description: e.target.value })}
            className="border p-2 rounded w-full md:col-span-2"
          />
        </div>
        <button
          onClick={() =>
            handleAddListItem(work, workList, setWorkList, () =>
              setWork({
                organization: "",
                position: "",
                start: "",
                end: "",
                description: "",
              })
            )
          }
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Work
        </button>
        <ListDisplay
          list={workList}
          remove={handleRemoveListItem}
          listSetter={setWorkList}
        />
      </Section>

      {/* References */}
      <Section title="References">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={reference.name}
            onChange={(e) =>
              setReference({ ...reference, name: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={reference.email}
            onChange={(e) =>
              setReference({ ...reference, email: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Relationship"
            value={reference.relationship}
            onChange={(e) =>
              setReference({ ...reference, relationship: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone (optional)"
            value={reference.phone}
            onChange={(e) =>
              setReference({ ...reference, phone: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={() =>
            handleAddListItem(reference, referenceList, setReferenceList, () =>
              setReference({ name: "", email: "", relationship: "", phone: "" })
            )
          }
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Reference
        </button>
        <ListDisplay
          list={referenceList}
          remove={handleRemoveListItem}
          listSetter={setReferenceList}
        />
      </Section>

      {/* SOP */}
      <Section title="Statement of Purpose">
        <textarea
          name="sop"
          placeholder="Your Statement of Purpose"
          value={sop}
          onChange={handleChange(setSop)}
          className="border p-2 rounded w-full min-h-[120px]"
        />
      </Section>

      {/* Extracurricular */}
      <Section title="Extracurricular / Achievements">
        <textarea
          name="extra"
          placeholder="Awards, Leadership, Volunteering"
          value={extra}
          onChange={handleChange(setExtra)}
          className="border p-2 rounded w-full min-h-[100px]"
        />
      </Section>

      
      {/* Attachments */}
        <Section title="Attachments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([
              { key: "resume", label: "Upload Resume / CV" },
              { key: "passportCopy", label: "Upload Passport Copy" },
              { key: "transcripts", label: "Upload Academic Transcripts" },
              { key: "testReport", label: "Upload English Test Report" },
              { key: "photo", label: "Upload Photo" },
            ] as const).map((item) => (
              <div key={item.key} className="flex flex-col">
                <span className="text-sm mb-1 font-medium">{item.label}</span>
                <label className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700">
                  {attachments[item.key as keyof typeof attachments]?.name || "Click to upload"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleAttachmentChange(e, item.key as keyof typeof attachments)}
                  />
                </label>
              </div>
            ))}
          </div>
        </Section>

    </div>
  );
};

export default ProfilePage;

// Helper components
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white mt-8 rounded-lg shadow-sm border p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const ListDisplay: React.FC<{
  list: any[];
  remove: (index: number, list: any, setter: any) => void;
  listSetter: any;
}> = ({ list, remove, listSetter }) => (
  <div className="mt-4">
    {list.length === 0 ? (
      <p className="text-gray-500 text-sm">No records added yet.</p>
    ) : (
      <ul className="space-y-3">
        {list.map((item, index) => (
          <li
            key={index}
            className="border p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              {Object.entries(item).map(([key, val]) => (
                <p key={key} className="text-sm">
                  {key}: {val}
                </p>
              ))}
            </div>
            <button
              onClick={() => remove(index, list, listSetter)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
