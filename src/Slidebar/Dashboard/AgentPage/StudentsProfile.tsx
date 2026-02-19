
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  Download,
  Eye,
  Save,
  Upload,
  FileText,
  X,
} from "lucide-react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

const StudentsProfile: React.FC = () => {
  // Main profile data - with first_name and last_name separate for UI
  const [mainProfile, setMainProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    // company_name: "",
  });

  // Detailed profile data
  const [profileData, setProfileData] = useState({
    dob: "",
    address: "",
    phone: "",
    gender: "",
    passport_expiry: "",
    country_of_residence: "",
    program: "",
    intake: "",
    specialization: "",
    sop: "",
    achievements: "",
    destination: "",
    study_level: "",
    nationality: "Bangladesh",
    elp: "",
    passport: "",
   
    visa_rejection_status: "",
    visa_rejection_reason: "",
  });

  // Arrays for multiple entries
  const [academicList, setAcademicList] = useState<any[]>([]);
  const [testList, setTestList] = useState<any[]>([]);
  const [workList, setWorkList] = useState<any[]>([]);
  const [referenceList, setReferenceList] = useState<any[]>([]);

  // Current items for adding to lists
  const [currentAcademic, setCurrentAcademic] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: "",
    documents: [] as File[],
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

  // Attachments - Now supports multiple files per category
  const [attachments, setAttachments] = useState<Record<string, File[]>>({});
  const [loading, setLoading] = useState(false);
  const [profilePercent, setProfilePercent] = useState(0);

  // Handlers
  const handleMainProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multiple file upload for academic qualifications
  const handleAcademicDocumentsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setCurrentAcademic((prev) => ({
        ...prev,
        documents: [...prev.documents, ...filesArray],
      }));
    }
  };

  const removeAcademicDocument = (index: number) => {
    setCurrentAcademic((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleAddAcademic = () => {
    // Check if at least one field has a value
    const hasValues =
      currentAcademic.degree ||
      currentAcademic.institution ||
      currentAcademic.year ||
      currentAcademic.cgpa ||
      currentAcademic.documents?.length > 0;

    if (hasValues) {
      // Make a copy of currentAcademic to add to the list
      const academicToAdd = { ...currentAcademic };
      setAcademicList([...academicList, academicToAdd]);

      // Reset current academic
      setCurrentAcademic({
        degree: "",
        institution: "",
        year: "",
        cgpa: "",
        documents: [],
      });
    } else {
      Swal.fire("Warning", "Please fill at least one field", "warning");
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

  const handleRemoveAcademic = (index: number) => {
    const updated = [...academicList];
    updated.splice(index, 1);
    setAcademicList(updated);
  };

  const handleRemoveTest = (index: number) => {
    const updated = [...testList];
    updated.splice(index, 1);
    setTestList(updated);
  };

  const handleRemoveWork = (index: number) => {
    const updated = [...workList];
    updated.splice(index, 1);
    setWorkList(updated);
  };

  const handleRemoveReference = (index: number) => {
    const updated = [...referenceList];
    updated.splice(index, 1);
    setReferenceList(updated);
  };

  // Handle multiple file attachments for document sections
  const handleAttachmentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setAttachments((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...filesArray],
      }));
    }
  };

  const removeAttachment = (key: string, index: number) => {
    setAttachments((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Calculate Profile Completion
  const calculateProfileCompletion = () => {
    const fields = [
      ...Object.values(mainProfile),
      ...Object.values(profileData),
    ];

    const filledFields = fields.filter(
      (value) => value && value.toString().trim() !== "",
    ).length;

    const totalFields = fields.length;
    const percentage =
      totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    setProfilePercent(percentage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // =========================
      // 1️⃣ Get Auth Token
      // =========================
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

      // =========================
      // 2️⃣ Prepare FormData
      // =========================
      const formData = new FormData();

      // Combine first + last name into a single 'name' field
      const fullName =
        `${mainProfile.first_name} ${mainProfile.last_name}`.trim();
      if (fullName) formData.append("name", fullName);
      if (mainProfile.email) formData.append("email", mainProfile.email);
      if (mainProfile.subject) formData.append("subject", mainProfile.subject);

      // =========================
      // 3️⃣ Profile Data - Map to match JSON structure
      // =========================
      const profileMapping = {
        dob: "dob",
        address: "address",
        phone: "phone",
        gender: "gender",
        passport_expiry: "passport_expiry",
        country_of_residence: "country_of_residence",
        program: "program",
        intake: "intake",
        specialization: "specialization",
        sop: "sop",
        achievements: "achievements",
        destination: "destination",
        study_level: "study_level",
        nationality: "nationality",
        elp: "elp",
        passport: "passport",
        visa_rejection_status: "visa_rejection_status",
        visa_rejection_reason: "visa_rejection_reason",
      };

      // Append all profile data
      Object.entries(profileMapping).forEach(([stateKey, apiKey]) => {
        const value = profileData[stateKey as keyof typeof profileData];
        if (value && value !== "") {
          formData.append(apiKey, value);
        }
      });

      // =========================
      // 4️⃣ Academic Qualifications - Send as individual fields (NOT as JSON)
      // =========================
      if (academicList.length > 0) {
        academicList.forEach((academic, index) => {
          // Append text fields with the format: academic_qualifications[0][degree]
          if (academic.degree) {
            formData.append(
              `academic_qualifications[${index}][degree]`,
              academic.degree,
            );
          }
          if (academic.institution) {
            formData.append(
              `academic_qualifications[${index}][institution]`,
              academic.institution,
            );
          }
          if (academic.year) {
            formData.append(
              `academic_qualifications[${index}][year]`,
              academic.year,
            );
          }
          if (academic.cgpa) {
            formData.append(
              `academic_qualifications[${index}][cgpa]`,
              academic.cgpa,
            );
          }

          // Append files with the format: academic_qualifications[0][document_file][]
          if (academic.documents && academic.documents.length > 0) {
            academic.documents.forEach((file: File, fileIndex: number) => {
              // Using document_file as per your requirement
              formData.append(
                `academic_qualifications[${index}][document_file][]`,
                file,
              );
            });
          }
        });
      }

      // =========================
      // 5️⃣ Test Scores - JSON string
      // =========================
      if (testList.length > 0) {
        formData.append("test_scores", JSON.stringify(testList));
      }

      // =========================
      // 6️⃣ Work Experiences - JSON string
      // =========================
      if (workList.length > 0) {
        formData.append("work_experiences", JSON.stringify(workList));
      }

      // =========================
      // 7️⃣ References - JSON string
      // =========================
      if (referenceList.length > 0) {
        formData.append("references", JSON.stringify(referenceList));
      }

      // =========================
      // 8️⃣ File Attachments - as individual files
      // =========================

      // Helper function to append files
      const appendFiles = (key: string, files: File[]) => {
        if (files && files.length > 0) {
          files.forEach((file, index) => {
            // For other file types, use the format: key[index]
            formData.append(`${key}[${index}]`, file);
          });
        }
      };

      // Append all file attachments
      appendFiles("resume", attachments.resume || []);
      appendFiles("passport_copy", attachments.passport_copy || []);
      appendFiles("transcripts", attachments.transcripts || []);
      appendFiles("english_test", attachments.english_test || []);
      appendFiles("photo", attachments.photo || []);
      appendFiles("other_file_uploaded", attachments.other_documents || []);

      // =========================
      // 9️⃣ Debug Log
      // =========================
      console.log("========== SUBMITTING FORMDATA ==========");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], `File: ${pair[1].name} (${pair[1].size} bytes)`);
        } else {
          console.log(pair[0], pair[1]);
        }
      }
      console.log("========================================");

      // =========================
      // 🔟 Send Request
      // =========================
      const response = await fetch(`${BASE_URL}/agent/agent-student/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok && result.success) {
        Swal.fire("Success", "Student registered successfully!", "success");
        resetForm();
      } else {
        Swal.fire("Error", result?.message || "Submission failed", "error");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      Swal.fire("Error", error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setMainProfile({
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      // company_name: "",
    });

    setProfileData({
      dob: "",
      address: "",
      phone: "",
      gender: "",
      passport_expiry: "",
      country_of_residence: "",
      program: "",
      intake: "",
      specialization: "",
      sop: "",
      achievements: "",
      destination: "",
      study_level: "",
      nationality: "Bangladesh",
      elp: "",
      passport: "",
      visa_rejection_status: "",
      visa_rejection_reason: "",
    });

    setAcademicList([]);
    setTestList([]);
    setWorkList([]);
    setReferenceList([]);
    setAttachments({});
  };

  // PDF Generate Function
  const generatePdf = async () => {
    try {
      setLoading(true);
      Swal.fire(
        "Info",
        "PDF generation feature will be implemented soon",
        "info",
      );
    } catch (error) {
      console.error("PDF generation error:", error);
      Swal.fire("Error", "Failed to generate PDF", "error");
    } finally {
      setLoading(false);
    }
  };

  // Recalculate completion when data changes
  useEffect(() => {
    calculateProfileCompletion();
  }, [mainProfile, profileData]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Student Registration
            </h2>
            <p className="text-blue-100 mb-4">
              Complete the profile to register new student
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

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information - With First Name and Last Name separate */}
            <Section title="Basic Information" icon="👤">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <InputField
                  label="First Name"
                  name="first_name"
                  value={mainProfile.first_name}
                  onChange={handleMainProfileChange}
                  type="text"
                  required={true}
                />

                {/* Last Name */}
                <InputField
                  label="Last Name"
                  name="last_name"
                  value={mainProfile.last_name}
                  onChange={handleMainProfileChange}
                  type="text"
                  required={true}
                />

                {/* Email */}
                <InputField
                  label="Email"
                  name="email"
                  value={mainProfile.email}
                  onChange={handleMainProfileChange}
                  type="email"
                  required={true}
                />

                {/* Subject */}
                <InputField
                  label="Subject"
                  name="subject"
                  value={mainProfile.subject}
                  onChange={handleMainProfileChange}
                  type="text"
                  required={false}
                />
                
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
                  value={profileData.passport}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Passport Expiry"
                  name="passport_expiry"
                  type="date"
                  value={profileData.passport_expiry}
                  onChange={handleProfileDataChange}
                />
                <SelectField
                  label="Nationality"
                  name="nationality"
                  value={profileData.nationality}
                  onChange={handleProfileDataChange}
                  options={[
                    "Bangladesh",
                    "India",
                    "Pakistan",
                    "United Kingdom",
                    "United States",
                    "Canada",
                    "Australia",
                    "Germany",
                    "Hungary",
                    "Malaysia",
                    "Singapore",
                    "United Arab Emirates (Dubai)",
                    "Netherlands",
                    "Malta",
                  ]}
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
                <SelectField
                  label="Preferred Intake"
                  name="intake"
                  value={profileData.intake}
                  onChange={handleProfileDataChange}
                  options={[
                    "",
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ]}
                />
                <InputField
                  label="Study Level"
                  name="study_level"
                  value={profileData.study_level}
                  onChange={handleProfileDataChange}
                />
                <InputField
                  label="Specialization"
                  name="specialization"
                  value={profileData.specialization}
                  onChange={handleProfileDataChange}
                />
                <SelectField
                  label="Destination Country"
                  name="destination"
                  value={profileData.destination}
                  onChange={handleProfileDataChange}
                  options={[
                    "Bangladesh",
                    "India",
                    "Pakistan",
                    "United Kingdom",
                    "United States",
                    "Canada",
                    "Australia",
                    "Germany",
                    "Hungary",
                    "Malaysia",
                    "Singapore",
                    "United Arab Emirates (Dubai)",
                    "Netherlands",
                    "Malta",
                  ]}
                />
                <InputField
                  label="English Proficiency (ELP)"
                  name="elp"
                  value={profileData.elp}
                  onChange={handleProfileDataChange}
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
                <StatItem
                  label="Documents"
                  value={Object.keys(attachments).length * 10}
                />
                <StatItem label="Overall" value={profilePercent} />
              </div>
            </div>

            {/* Visa Rejection Status */}
            <Section title="Visa Rejection / Travel Status" icon="🛂">
              <div>

                <select
                  name="visa_rejection_status"
                  value={profileData.visa_rejection_status}
                  onChange={handleProfileDataChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="10_years_travel">
                    Travelled in last 10 years
                  </option>
                </select>

                {/*  Show message box only if Yes */}
                {profileData.visa_rejection_status === "Yes" && (
                  <textarea
                    name="visa_rejection_reason"
                    value={profileData.visa_rejection_reason}
                    onChange={handleProfileDataChange}
                    placeholder="Please explain the visa rejection reason..."
                    rows={3}
                    className="border p-2 rounded w-full mt-3"
                  />
                )}
              </div>
            </Section>
          </div>
        </div>

        {/* Dynamic Lists Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Qualifications with File Upload - FIXED */}
          <Section title="Academic Qualifications" icon="📚">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Degree"
                  name="degree"
                  value={currentAcademic.degree}
                  onChange={(e) =>
                    setCurrentAcademic({
                      ...currentAcademic,
                      degree: e.target.value,
                    })
                  }
                  options={[
                    "",
                    "SSC",
                    "HSC",
                    "Diploma",
                    "Bachelor",
                    "Masters",
                    "PhD",
                  ]}
                />
                <InputField
                  label="Institution"
                  name="institution"
                  value={currentAcademic.institution}
                  onChange={(e) =>
                    setCurrentAcademic({
                      ...currentAcademic,
                      institution: e.target.value,
                    })
                  }
                />
                <InputField
                  label="Year"
                  name="year"
                  value={currentAcademic.year}
                  onChange={(e) =>
                    setCurrentAcademic({
                      ...currentAcademic,
                      year: e.target.value,
                    })
                  }
                />
                <InputField
                  label="CGPA"
                  name="cgpa"
                  value={currentAcademic.cgpa}
                  onChange={(e) =>
                    setCurrentAcademic({
                      ...currentAcademic,
                      cgpa: e.target.value,
                    })
                  }
                />
              </div>

              {/* File Upload for Academic Documents */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (Multiple files allowed)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleAcademicDocumentsChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />

                {/* Display selected files */}
                {currentAcademic.documents &&
                  currentAcademic.documents.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {currentAcademic.documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-500" />
                            <span className="text-sm text-gray-600">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAcademicDocument(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <button
                type="button"
                onClick={handleAddAcademic}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary flex items-center gap-2 transition-colors"
              >
                <PlusCircle size={18} />
                Add Academic Qualification
              </button>

              {/* Display added academic qualifications */}
              <ListDisplay
                list={academicList}
                onRemove={handleRemoveAcademic}
              />
            </div>
          </Section>

          {/* Test Scores */}
          <Section title="Test Scores" icon="📊">
            <DynamicList
              fields={[
                {
                  name: "test_name",
                  label: "Test Name",
                  type: "select",
                  options: [
                    "",
                    "IELTS",
                    "TOEFL",
                    "PTE",
                    "GMAT",
                    "GRE",
                    "Other",
                  ],
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

        {/* Document Attachments - Multiple File Upload */}
        <Section title="Document Attachments" icon="📎">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: "resume", label: "Resume/CV", icon: "📄" },
              { key: "passport_copy", label: "Passport Copy", icon: "🛂" },
              { key: "transcripts", label: "Transcripts", icon: "📑" },
              {
                key: "english_test",
                label: "English Test Results",
                icon: "📊",
              },
              { key: "photo", label: "Photo", icon: "📷" },
              { key: "other_documents", label: "Other Files", icon: "📝" },
            ].map((item) => (
              <MultiFileUploadField
                key={item.key}
                label={item.label}
                icon={item.icon}
                onChange={(e) => handleAttachmentChange(e, item.key)}
                files={attachments[item.key] || []}
                onRemoveFile={(index) => removeAttachment(item.key, index)}
              />
            ))}
          </div>
        </Section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 p-6 bg-white rounded-xl shadow-sm">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-secondary to-primary text-white rounded-lg hover:from-secondary hover:to-primary text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={20} />
            {loading ? "Submitting..." : "Register Student"}
          </button>

          <button
            type="button"
            onClick={generatePdf}
            disabled={loading}
            className="px-8 py-3 border-2 border-secondary text-secondary rounded-lg hover:bg-blue-50 text-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper Components
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
  required?: boolean;
}> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 capitalize">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      required={required}
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

// MultiFileUploadField component
const MultiFileUploadField: React.FC<{
  label: string;
  icon: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  onRemoveFile: (index: number) => void;
}> = ({ label, icon, onChange, files, onRemoveFile }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
      <span>{icon}</span>
      {label}
    </label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <Upload size={24} className="text-gray-400 mb-2" />
        <span className="text-gray-600 text-sm text-center">
          Click to upload files
        </span>
        <input type="file" multiple className="hidden" onChange={onChange} />
      </label>

      {files.length > 0 && (
        <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText size={14} className="text-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
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
      type="button"
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
              {Object.entries(item).map(([key, val]) => {
                // Skip displaying the documents array as it's handled separately
                if (key === "documents") return null;

                return (
                  val &&
                  val !== "" && (
                    <p key={key} className="text-sm text-gray-700 mb-1">
                      <span className="font-medium capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      {val?.toString()}
                    </p>
                  )
                );
              })}
              {/* Show document count if documents exist */}
              {item.documents && item.documents.length > 0 && (
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Documents:</span>{" "}
                  {item.documents.length} file(s)
                </p>
              )}
            </div>
            <button
              type="button"
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

export default StudentsProfile;
