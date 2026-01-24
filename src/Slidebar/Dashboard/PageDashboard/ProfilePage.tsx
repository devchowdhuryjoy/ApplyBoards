import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Download, Eye, Save } from "lucide-react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

const ProfilePage: React.FC = () => {
  // Main profile data
  const [mainProfile, setMainProfile] = useState({
    name: "",
    email: "",
    destination: "",
    study_level: "",
    subject: "",
    nationality: "",
    elp: "",
    passport: "",
  });

  // Detailed profile data
  const [profileData, setProfileData] = useState({
    // Personal Info
    dob: "",
    address: "",
    phone: "",
    gender: "",

    // Passport Info
    passport_expiry: "",
    country_of_residence: "",

    // Program Details
    program: "",
    intake: "",
    specialization: "",

    // SOP & Achievements
    sop: "",
    achievements: "",
  });

  // Arrays for multiple entries
  const [academicList, setAcademicList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [referenceList, setReferenceList] = useState([]);

  // Current items for adding to lists
  const [currentAcademic, setCurrentAcademic] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: "",
  });

  const [currentTest, setCurrentTest] = useState({
    test_name: "",
    score: "",
    date: "",
  });

  const [currentWork, setCurrentWork] = useState({
    organization: "",
    position: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [currentReference, setCurrentReference] = useState({
    name: "",
    email: "",
    relationship: "",
    phone: "",
  });

  // Attachments
  const [attachments, setAttachments] = useState({});
  const [existingFiles, setExistingFiles] = useState({
    resume: "",
    passport_copy: "",
    transcripts: "",
    english_test: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [profilePercent, setProfilePercent] = useState(0);

  // ✅ PDF Generate Function
  // const generatePdf = async () => {
  //   try {
  //     setLoading(true);

  //     const myHeaders = new Headers();
  //     myHeaders.append(
  //       "Authorization",
  //       "Bearer 54|Hn9OSJm9vfFPniOFCwdCxRGGmJFcZLuK4t3msBN9e0348cec"
  //     );
  //     myHeaders.append("Content-Type", "application/json");

  //     const response = await fetch(`${BASE_URL}/student/profile/generate-pdf`, {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: JSON.stringify({
  //         profile_data: {
  //           ...mainProfile,
  //           ...profileData,
  //           academic_qualifications: academicList,
  //           test_scores: testList,
  //           work_experiences: workList,
  //           references: referenceList,
  //         },
  //       }),
  //     });

  //     const result = await response.json();

  //     if (result.success && result.pdf_url) {
  //       // PDF in new tab
  //       window.open(result.pdf_url, "_blank");
  //       Swal.fire("Success", "PDF generated successfully!", "success");
  //     } else {
  //       Swal.fire("Error", result.message || "Failed to generate PDF", "error");
  //     }
  //   } catch (error) {
  //     console.error("PDF generation error:", error);
  //     Swal.fire("Error", "Failed to generate PDF", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const generatePdf = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token"); 
    if (!token) {
      Swal.fire("Error", "Authentication token not found", "error");
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/student/profile/generate-pdf`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        profile_data: {
          ...mainProfile,
          ...profileData,
          academic_qualifications: academicList,
          test_scores: testList,
          work_experiences: workList,
          references: referenceList,
        },
      }),
    });

    const result = await response.json();

    if (result.success && result.pdf_url) {
      window.open(result.pdf_url, "_blank");
      Swal.fire("Success", "PDF generated successfully!", "success");
    } else {
      Swal.fire("Error", result.message || "Failed to generate PDF", "error");
    }
  } catch (error) {
    console.error("PDF generation error:", error);
    Swal.fire("Error", "Failed to generate PDF", "error");
  } finally {
    setLoading(false);
  }
};


  // ✅ View/Download existing file
  const viewFile = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      Swal.fire("Info", "No file available to view.", "info");
      return;
    }

    // Convert relative URL to absolute URL if needed
    const absoluteUrl = fileUrl.startsWith("http")
      ? fileUrl
      : `${BASE_URL}/${fileUrl.replace(/^\/+/, "")}`;

    // Open in new tab for viewing
    window.open(absoluteUrl, "_blank");
  };

  // ✅ Calculate Profile Completion
  const calculateProfileCompletion = () => {
    const fields = [
      ...Object.values(mainProfile),
      ...Object.values(profileData),
    ];

    const filledFields = fields.filter(
      (value) => value && value.toString().trim() !== ""
    ).length;

    const totalFields = fields.length;
    const percentage =
      totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    setProfilePercent(percentage);
  };

  // ✅ Improved JSON parsing function
  const parseJsonField = (field) => {
    try {
      if (!field || field === '""' || field === "null" || field === "[]")
        return [];

      let str = field.toString().trim();

      // Remove surrounding quotes if present
      if (str.startsWith('"') && str.endsWith('"')) {
        str = str.slice(1, -1);
      }

      // Handle escaped characters
      str = str.replace(/\\"/g, '"').replace(/\\n/g, "").replace(/\\/g, "");

      // If it's already a valid JSON array, parse it directly
      if (str.startsWith("[") && str.endsWith("]")) {
        return JSON.parse(str);
      }

      // If it contains multiple objects
      if (str.includes("},{")) {
        str = `[${str}]`;
      }

      // If it's a single object
      if (str.startsWith("{") && str.endsWith("}") && !str.includes("},{")) {
        str = `[${str}]`;
      }

      const result = JSON.parse(str);
      return Array.isArray(result) ? result : [result];
    } catch (error) {
      console.error("Error parsing JSON field:", error);
      return [];
    }
  };

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    const token = authString ? JSON.parse(authString)?.token : "";

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/student/profile/edit`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Profile GET:", data);

        // if (data.success && data.profile) {
        //   const profile = data.profile;

        if (data.success) {
          const profile = data.profile || data.user;
          console.log("Profile Data:", profile);

          // 🔹 Basic Info
          setMainProfile({
            name: profile.name || "",
            email: profile.email || "",
            destination: profile.destination || "",
            study_level: profile.study_level || "",
            subject: profile.subject || "",
            nationality: profile.nationality || "",
            elp: profile.elp || "",
            passport: profile.passport || "",
          });

          // 🔹 Detailed Info
          setProfileData({
            dob: profile.dob || "",
            address: profile.address || "",
            phone: profile.phone || "",
            gender: profile.gender || "",
            passport_expiry: profile.passport_expiry || "",
            country_of_residence: profile.country_of_residence || "",
            program: profile.program || "",
            intake: profile.intake || "",
            specialization: profile.specialization || "",
            sop: profile.sop || "",
            achievements: profile.achievements || "",
          });

          // 🔹 Existing files
          setExistingFiles({
            resume: profile.resume || "",
            passport_copy: profile.passport_copy || "",
            transcripts: profile.transcripts || "",
            english_test: profile.english_test || "",
            photo: profile.photo || "",
          });

          // 🔹 Helper function to safely parse array or string
          const safeParse = (value) => {
            if (!value) return [];
            if (typeof value === "string") {
              try {
                return JSON.parse(value);
              } catch {
                return [];
              }
            }
            return Array.isArray(value) ? value : [value];
          };

          // 🔹 List fields
          setAcademicList(safeParse(profile.academic_qualifications));
          setTestList(safeParse(profile.test_scores));
          setWorkList(safeParse(profile.work_experiences));
          setReferenceList(safeParse(profile.references));
        }
      } catch (err) {
        console.error("GET error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Recalculate completion when data changes
  useEffect(() => {
    calculateProfileCompletion();
  }, [
    mainProfile,
    profileData,
    academicList,
    testList,
    workList,
    referenceList,
  ]);

  // Handlers
  const handleMainProfileChange = (e) => {
    const { name, value } = e.target;
    setMainProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAcademic = () => {
    const hasValues = Object.values(currentAcademic).some((val) => val !== "");
    if (hasValues) {
      setAcademicList([...academicList, currentAcademic]);
      setCurrentAcademic({ degree: "", institution: "", year: "", cgpa: "" });
    }
  };

  const handleAddTest = () => {
    const hasValues = Object.values(currentTest).some((val) => val !== "");
    if (hasValues) {
      setTestList([...testList, currentTest]);
      setCurrentTest({ test_name: "", score: "", date: "" });
    }
  };

  const handleAddWork = () => {
    const hasValues = Object.values(currentWork).some((val) => val !== "");
    if (hasValues) {
      setWorkList([...workList, currentWork]);
      setCurrentWork({
        organization: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    }
  };

  const handleAddReference = () => {
    const hasValues = Object.values(currentReference).some((val) => val !== "");
    if (hasValues) {
      setReferenceList([...referenceList, currentReference]);
      setCurrentReference({
        name: "",
        email: "",
        relationship: "",
        phone: "",
      });
    }
  };

  const handleRemoveAcademic = (index) => {
    const updated = [...academicList];
    updated.splice(index, 1);
    setAcademicList(updated);
  };

  const handleRemoveTest = (index) => {
    const updated = [...testList];
    updated.splice(index, 1);
    setTestList(updated);
  };

  const handleRemoveWork = (index) => {
    const updated = [...workList];
    updated.splice(index, 1);
    setWorkList(updated);
  };

  const handleRemoveReference = (index) => {
    const updated = [...referenceList];
    updated.splice(index, 1);
    setReferenceList(updated);
  };

  const handleAttachmentChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setAttachments({ ...attachments, [key]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Token check
      const authString = localStorage.getItem("auth");
      if (!authString) {
        Swal.fire("Error", "User not authenticated. Please login.", "error");
        return;
      }
      const auth = JSON.parse(authString);
      const token = auth?.token || auth?.access || auth?.access_token;
      if (!token) {
        Swal.fire("Error", "User not authenticated. Please login.", "error");
        return;
      }

      const formData = new FormData();

      // Main profile fields
      Object.entries(mainProfile).forEach(([key, value]) => {
        if (value) formData.append(key, value); // skip empty
      });

      // Profile data fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (value) {
          if (["dob", "passport_expiry"].includes(key)) {
            const d = new Date(value);
            if (!isNaN(d.getTime()))
              formData.append(key, d.toISOString().split("T")[0]);
          } else {
            formData.append(key, value);
          }
        }
      });

      // Array fields
      if (academicList.length)
        formData.append(
          "academic_qualifications",
          JSON.stringify(academicList)
        );
      if (testList.length)
        formData.append("test_scores", JSON.stringify(testList));
      if (workList.length)
        formData.append("work_experiences", JSON.stringify(workList));
      if (referenceList.length)
        formData.append("references", JSON.stringify(referenceList));

      // File uploads
      Object.entries(attachments).forEach(([key, file]) => {
        if (file) formData.append(key, file as File);
      });

      // API Call
      const response = await fetch(`${BASE_URL}/student/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Update result:", result);

      if (result.success) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        // Refresh existing files after update
        if (result.profile) {
          setExistingFiles({
            resume: result.profile.resume || existingFiles.resume,
            passport_copy:
              result.profile.passport_copy || existingFiles.passport_copy,
            transcripts:
              result.profile.transcripts || existingFiles.transcripts,
            english_test:
              result.profile.english_test || existingFiles.english_test,
            photo: result.profile.photo || existingFiles.photo,
          });
        }
      } else {
        Swal.fire("Error", result.message || "Update failed", "error");
      }
    } catch (err: any) {
      console.error("POST error:", err);
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">My Profile</h2>
            <p className="text-blue-100 mb-4">
              Complete your profile to increase your chances
            </p>

            {/* Progress Section */}
            <div className="flex items-center gap-4">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${profilePercent}%` }}
                />
              </div>
              <span className="text-lg font-semibold min-w-[60px]">
                {profilePercent}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={generatePdf}
              disabled={loading}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Download size={18} />
              {loading ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Section title="Basic Information" icon="👤">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mainProfile).map(([key, value]) => (
                <InputField
                  key={key}
                  label={key.replace(/_/g, " ")}
                  name={key}
                  value={value}
                  onChange={handleMainProfileChange}
                  type={key === "email" ? "email" : "text"}
                />
              ))}
            </div>
          </Section>

          {/* Personal Information */}
          <Section title="Personal Details" icon="📝">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={profileData.dob}
                onChange={handleProfileDataChange}
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileDataChange}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={profileData.gender}
                onChange={handleProfileDataChange}
                options={["", "Male", "Female", "Other"]}
              />
              <div className="md:col-span-2">
                <TextAreaField
                  label="Address"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileDataChange}
                  rows={3}
                />
              </div>
            </div>
          </Section>

          {/* Passport Information */}
          <Section title="Passport & Identity" icon="🛂">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Passport Number"
                name="passport"
                value={mainProfile.passport}
                onChange={handleMainProfileChange}
              />
              <InputField
                label="Passport Expiry"
                name="passport_expiry"
                type="date"
                value={profileData.passport_expiry}
                onChange={handleProfileDataChange}
              />
              <InputField
                label="Nationality"
                name="nationality"
                value={mainProfile.nationality}
                onChange={handleMainProfileChange}
              />
              <InputField
                label="Country of Residence"
                name="country_of_residence"
                value={profileData.country_of_residence}
                onChange={handleProfileDataChange}
              />
            </div>
          </Section>

          {/* Program Details */}
          <Section title="Program Details" icon="🎓">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Desired Program"
                name="program"
                value={profileData.program}
                onChange={handleProfileDataChange}
              />
              <InputField
                label="Preferred Intake"
                name="intake"
                value={profileData.intake}
                onChange={handleProfileDataChange}
              />
              <InputField
                label="Study Level"
                name="study_level"
                value={mainProfile.study_level}
                onChange={handleMainProfileChange}
              />
              <InputField
                label="Specialization"
                name="specialization"
                value={profileData.specialization}
                onChange={handleProfileDataChange}
              />
              <InputField
                label="Destination Country"
                name="destination"
                value={mainProfile.destination}
                onChange={handleMainProfileChange}
              />
              <InputField
                label="English Proficiency (ELP)"
                name="elp"
                value={mainProfile.elp}
                onChange={handleMainProfileChange}
              />
            </div>
          </Section>
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <StatItem label="Basic Info" value={70} />
              <StatItem label="Academic" value={academicList.length * 25} />
              <StatItem label="Documents" value={40} />
              <StatItem label="Overall" value={profilePercent} />
            </div>
          </div>

          {/* SOP & Achievements */}
          <Section title="Statement of Purpose" icon="📄">
            <TextAreaField
              name="sop"
              value={profileData.sop}
              onChange={handleProfileDataChange}
              placeholder="Describe your academic goals and motivations..."
              rows={6}
            />
          </Section>

          <Section title="Achievements" icon="🏆">
            <TextAreaField
              name="achievements"
              value={profileData.achievements}
              onChange={handleProfileDataChange}
              placeholder="List your awards, extracurricular activities, volunteering..."
              rows={4}
            />
          </Section>
        </div>
      </div>

      {/* Dynamic Lists Sections */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Qualifications */}
        <Section title="Academic Qualifications" icon="📚">
          <DynamicList
            fields={[
              { name: "degree", label: "Degree", type: "text" },
              { name: "institution", label: "Institution", type: "text" },
              { name: "year", label: "Year", type: "text" },
              { name: "cgpa", label: "CGPA", type: "text" },
            ]}
            currentItem={currentAcademic}
            setCurrentItem={setCurrentAcademic}
            list={academicList}
            onAdd={handleAddAcademic}
            onRemove={handleRemoveAcademic}
          />
        </Section>

        {/* Test Scores */}
        <Section title="Test Scores" icon="📊">
          <DynamicList
            fields={[
              {
                name: "test_name",
                label: "Test Name",
                type: "select",
                options: ["", "IELTS", "TOEFL", "GRE", "GMAT", "SAT", "ACT"],
              },
              { name: "score", label: "Score", type: "text" },
              { name: "date", label: "Date", type: "date" },
            ]}
            currentItem={currentTest}
            setCurrentItem={setCurrentTest}
            list={testList}
            onAdd={handleAddTest}
            onRemove={handleRemoveTest}
          />
        </Section>

        {/* Work Experience */}
        <Section title="Work Experience" icon="💼">
          <DynamicList
            fields={[
              { name: "organization", label: "Organization", type: "text" },
              { name: "position", label: "Position", type: "text" },
              { name: "start_date", label: "Start Date", type: "date" },
              { name: "end_date", label: "End Date", type: "date" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            currentItem={currentWork}
            setCurrentItem={setCurrentWork}
            list={workList}
            onAdd={handleAddWork}
            onRemove={handleRemoveWork}
          />
        </Section>

        {/* References */}
        <Section title="References" icon="👥">
          <DynamicList
            fields={[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "relationship", label: "Relationship", type: "text" },
              { name: "phone", label: "Phone", type: "text" },
            ]}
            currentItem={currentReference}
            setCurrentItem={setCurrentReference}
            list={referenceList}
            onAdd={handleAddReference}
            onRemove={handleRemoveReference}
          />
        </Section>
      </div>

      {/* Attachments Section */}
      <Section title="Document Attachments" icon="📎">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { key: "resume", label: "Resume/CV", icon: "📄" },
            { key: "passport_copy", label: "Passport Copy", icon: "🛂" },
            { key: "transcripts", label: "Transcripts", icon: "📑" },
            { key: "english_test", label: "Test Reports", icon: "📊" },
            { key: "photo", label: "Photo", icon: "📷" },
          ].map((item) => (
            <FileUploadField
              key={item.key}
              label={item.label}
              icon={item.icon}
              onChange={(e) => handleAttachmentChange(e, item.key)}
              fileName={attachments[item.key]?.name}
              existingFile={existingFiles[item.key]}
              onViewFile={() => viewFile(existingFiles[item.key], item.label)}
            />
          ))}
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 p-6 bg-white rounded-xl shadow-sm">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-blue-700 hover:to-purple-700 text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={20} />
          {loading ? "Saving..." : "Save Profile"}
        </button>

        <button
          onClick={generatePdf}
          disabled={loading}
          className="px-8 py-3 border-2 border-primary text-secondary rounded-lg hover:bg-blue-50 text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>
    </div>
  );
};

// Updated FileUploadField component with view functionality
const FileUploadField: React.FC<{
  label: string;
  icon: string;
  onChange: (e: any) => void;
  fileName?: string;
  existingFile?: string;
  onViewFile: () => void;
}> = ({ label, icon, onChange, fileName, existingFile, onViewFile }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
      <span>{icon}</span>
      {label}
    </label>

    {/* Existing file display */}
    {existingFile && (
      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-xs text-green-700 mb-1">Current file:</p>
        <button
          onClick={onViewFile}
          className="text-primary hover:text-secondary text-sm flex items-center gap-1 transition-colors"
        >
          <Eye size={14} />
          View uploaded file
        </button>
      </div>
    )}

    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <span className="text-gray-600 text-sm text-center">
        {fileName || `Click to upload new ${label}`}
      </span>
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  </div>
);

// Helper Components (keep the rest as they are)
const Section: React.FC<{
  title: string;
  icon?: string;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h2>
    {children}
  </div>
);

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  placeholder?: string;
}> = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 capitalize">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: string[];
}> = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option || `Select ${label}`}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField: React.FC<{
  label?: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-sm font-medium mb-2 text-gray-700">{label}</label>
    )}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

const StatItem: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-semibold">{value}%</span>
  </div>
);

const DynamicList: React.FC<{
  fields: any[];
  currentItem: any;
  setCurrentItem: (item: any) => void;
  list: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}> = ({ fields, currentItem, setCurrentItem, list, onAdd, onRemove }) => (
  <div>
    <div
      className={`grid grid-cols-1 ${
        fields.length > 2 ? "md:grid-cols-2" : ""
      } gap-4 mb-4`}
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.type === "textarea" ? "md:col-span-2" : ""}
        >
          {field.type === "select" ? (
            <SelectField
              label={field.label}
              name={field.name}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
              options={field.options}
            />
          ) : field.type === "textarea" ? (
            <TextAreaField
              label={field.label}
              name={field.name}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
              placeholder={`Enter ${field.label.toLowerCase()}`}
              rows={3}
            />
          ) : (
            <InputField
              label={field.label}
              name={field.name}
              type={field.type}
              value={currentItem[field.name]}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.name]: e.target.value })
              }
            />
          )}
        </div>
      ))}
    </div>

    <button
      onClick={onAdd}
      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary flex items-center gap-2 transition-colors mb-4"
    >
      <PlusCircle size={18} />
      Add Item
    </button>

    <ListDisplay list={list} onRemove={onRemove} />
  </div>
);

const ListDisplay: React.FC<{
  list: any[];
  onRemove: (index: number) => void;
}> = ({ list, onRemove }) => (
  <div className="mt-4">
    {list.length === 0 ? (
      <p className="text-gray-500 text-sm italic text-center py-4">
        No items added yet
      </p>
    ) : (
      <div className="space-y-3">
        {list.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              {Object.entries(item).map(
                ([key, val]) =>
                  val &&
                  val !== "" && (
                    <p key={key} className="text-sm text-gray-700 mb-1">
                      <span className="font-medium capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      {val}
                    </p>
                  )
              )}
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 ml-4 transition-colors"
              title="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProfilePage;
