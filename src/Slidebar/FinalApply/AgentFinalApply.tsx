
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

// Document configuration from studentAPI
export const documentConfig = [
  { title: "CV / Resume*", key: "cv", max: 2, mandatory: true },
  { title: "Passport copy*", key: "passport", max: 2, mandatory: true },
  { title: "Transcript*", key: "transcript", max: 10, mandatory: true },
  {
    title: "A Level / Higher secondary / High school / 12th grade",
    key: "hsc",
    max: 2,
    mandatory: false,
  },
  {
    title: "Application screenshots",
    key: "application",
    max: 50,
    mandatory: false,
  },
  { title: "CAS Copy", key: "cas", max: 2, mandatory: false },
  { title: "Chat upload", key: "chat", max: 10, mandatory: false },
  { title: "Disability", key: "disability", max: 2, mandatory: false },
  { title: "English test result", key: "ielts", max: 5, mandatory: false },
  {
    title: "EU settle / Pre Settled documents",
    key: "eu",
    max: 3,
    mandatory: false,
  },
  {
    title: "O level / Senior secondary / 10th grade",
    key: "ssc",
    max: 2,
    mandatory: false,
  },
  {
    title: "Other certificates or diplomas",
    key: "othersCert",
    max: 10,
    mandatory: false,
  },
  { title: "Others", key: "others", max: 5, mandatory: false },
  { title: "PG Provisional / Degree", key: "pg", max: 2, mandatory: false },
  { title: "Portfolio", key: "portfolio", max: 10, mandatory: false },
  { title: "Post Admission – BRP", key: "brp", max: 2, mandatory: false },
  {
    title: "Post Admission – TT/Deposit receipt",
    key: "deposit",
    max: 2,
    mandatory: false,
  },
  { title: "Post Admission – Visa", key: "visa", max: 2, mandatory: false },
  { title: "Reference letter", key: "reference", max: 3, mandatory: false },
  { title: "Statement of purpose", key: "sop", max: 8, mandatory: false },
  {
    title: "Student Representation Form",
    key: "representation",
    max: 2,
    mandatory: false,
  },
  { title: "UG Provisional / Degree", key: "ug", max: 2, mandatory: false },
  {
    title: "University application documents",
    key: "universityDocs",
    max: 10,
    mandatory: false,
  },
  { title: "Visa refusal", key: "visaRefusal", max: 3, mandatory: false },
  {
    title: "Work experience certificate",
    key: "workCert",
    max: 3,
    mandatory: false,
  },
];

// Map of document keys to titles (for reverse lookup)
const documentTitleMap: Record<string, string> = {
  cv: "CV / Resume*",
  passport: "Passport copy*",
  transcript: "Transcript*",
  hsc: "A Level / Higher secondary / High school / 12th grade",
  application: "Application screenshots",
  cas: "CAS Copy",
  chat: "Chat upload",
  disability: "Disability",
  ielts: "English test result",
  eu: "EU settle / Pre Settled documents",
  ssc: "O level / Senior secondary / 10th grade",
  othersCert: "Other certificates or diplomas",
  others: "Others",
  pg: "PG Provisional / Degree",
  portfolio: "Portfolio",
  brp: "Post Admission – BRP",
  deposit: "Post Admission – TT/Deposit receipt",
  visa: "Post Admission – Visa",
  reference: "Reference letter",
  sop: "Statement of purpose",
  representation: "Student Representation Form",
  ug: "UG Provisional / Degree",
  universityDocs: "University application documents",
  visaRefusal: "Visa refusal",
  workCert: "Work experience certificate",
};

interface AcademicQualification {
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
  document: (File | string)[];
}

interface TestScore {
  test_name: string;
  score: string;
  date: string;
}

interface WorkExperience {
  organization: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Reference {
  name: string;
  email: string;
  relationship: string;
  phone: string;
}

interface LanguageTest {
  test_token: string;
  date_of_test: string;
  test_reference: string;
  remarks: string;
}

interface Document {
  document_type: string;
  file_path: string;
}

interface IntakeMonth {
  id: number;
  month: string;
  open_date: string;
  submission_deadline: string;
  status: string;
}

interface ProgramSnapshot {
  id: number;
  program_level_id: string;
  university_name: string;
  address: string;
  application_fee: string;
  application_short_desc: string;
  average_graduate_program: string;
  average_graduate_program_short_desc: string;
  average_gross_tuition: string;
  average_gross_tuition_short_desc: string;
  average_undergraduate_program: string;
  average_undergraduate_program_short_desc: string;
  campus_city: string;
  cost_of_living: string;
  cost_of_living_short_desc: string;
  created_at: string;
  duolingo_required: boolean;
  duolingo_total: string | null;
  duration: string;
  education_country: string;
  field_of_study_id: string;
  field_of_study_name: string;
  grading_scheme: string;
  ielts_listening: number;
  ielts_overall: number;
  ielts_reading: number;
  ielts_required: boolean;
  ielts_speaking: number;
  ielts_writing: number;
  images: string;
  intake_id: string;
  intake_months: IntakeMonth[];
  intake_name: string;
  last_level_of_study: string;
  location: string;
  nationality: string;
  no_exam_status: string;
  open_date: string;
  phone_number: string;
  program_description: string;
  program_level: string;
  program_level_id: string;
  program_name: string;
  program_summary: string;
  program_tag_id: string;
  program_tag_name: string;
  pte_listening: number | null;
  pte_overall: number | null;
  pte_reading: number | null;
  pte_required: boolean;
  pte_speaking: number | null;
  pte_writing: number | null;
  study_permit_or_visa: string;
  submission_deadline: string;
  success_chance: string;
  toefl_listening: number | null;
  toefl_overall: number | null;
  toefl_reading: number | null;
  toefl_required: boolean;
  toefl_speaking: number | null;
  toefl_writing: number | null;
  university_id: number;
  updated_at: string;
}

interface StudentSnapshot {
  id: number;
  agent_id: number;
  company_name: string;
  first_name: string;
  family_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  passport_number: string;
  expiry_date: string;
  country_of_residence: string;
  nationality: string;
  current_address_1: string;
  documents: Document[];
  language_tests: LanguageTest[];
  academic_qualifications: string;
  work_experiences: string;
  referees: string;
}

interface ApplicationData {
  id: number;
  status: string;
  admin_note: string | null;
  created_at: string;
  program_snapshot: ProgramSnapshot;
  student_snapshot: StudentSnapshot;
  updated_at: string;
}

interface FormData {
  // Basic Information - Only essential fields
  student_name: string;
  student_id: string;
  program_name: string;
  university_name: string;
  program_id: string;
  university_id: string;
  intake_name: string;
  country: string;
  status: string;
  
  // Essential student fields
  email: string;
  phone: string;
  dob: string;
  gender: string;
  passport: string;
  passport_expiry: string;
  address: string;
  
  // Files - using document config keys
  cv: string | string[];
  passport: string | string[];
  transcript: string | string[];
  hsc: string | string[];
  application: string | string[];
  cas: string | string[];
  chat: string | string[];
  disability: string | string[];
  ielts: string | string[];
  eu: string | string[];
  ssc: string | string[];
  othersCert: string | string[];
  others: string | string[];
  pg: string | string[];
  portfolio: string | string[];
  brp: string | string[];
  deposit: string | string[];
  visa: string | string[];
  reference: string | string[];
  sop: string | string[];
  representation: string | string[];
  ug: string | string[];
  universityDocs: string | string[];
  visaRefusal: string | string[];
  workCert: string | string[];

  // Arrays - Essential ones
  academic_qualifications: AcademicQualification[];
  work_experiences: WorkExperience[];
  references: Reference[];
  language_tests: LanguageTest[];
  documents: Document[];

  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface FileState {
  [key: string]: File[] | null;
}

interface AgentFinalApplyProps {
  id: string;
  appId: string;
  currentStatus: string;
  onClose?: () => void;
}

const AgentFinalApply = ({
  id,
  appId,
  currentStatus,
  onClose,
}: AgentFinalApplyProps) => {
  // Initialize file state with all document config keys
  const initialFileState: FileState = {};
  documentConfig.forEach(doc => {
    initialFileState[doc.key] = null;
  });

  const [formData, setFormData] = useState<FormData>({
    // Basic Information - Only essential
    student_name: "",
    student_id: "",
    program_name: "",
    university_name: "",
    program_id: "",
    university_id: "",
    intake_name: "",
    country: "",
    status: "",
    
    // Essential student fields
    email: "",
    phone: "",
    dob: "",
    gender: "",
    passport: "",
    passport_expiry: "",
    address: "",

    // Files - using document config keys
    cv: "",
    passport: "",
    transcript: "",
    hsc: "",
    application: "",
    cas: "",
    chat: "",
    disability: "",
    ielts: "",
    eu: "",
    ssc: "",
    othersCert: "",
    others: "",
    pg: "",
    portfolio: "",
    brp: "",
    deposit: "",
    visa: "",
    reference: "",
    sop: "",
    representation: "",
    ug: "",
    universityDocs: "",
    visaRefusal: "",
    workCert: "",

    // Arrays
    academic_qualifications: [],
    work_experiences: [],
    references: [],
    language_tests: [],
    documents: [],

    created_at: "",
    updated_at: "",
  });

  const [files, setFiles] = useState<FileState>(initialFileState);
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});
  const totalSteps = 6; // Reduced to 6 steps
  const stepContainerRef = useRef<HTMLDivElement>(null);

  // Get token from localStorage
  const getToken = () => {
    try {
      const authStr = localStorage.getItem("auth");
      if (authStr) {
        try {
          const auth = JSON.parse(authStr);
          if (auth?.token) return auth.token;
          if (auth?.agent_token) return auth.agent_token;
          if (auth?.access_token) return auth.access_token;
        } catch (e) {
          console.error("Error parsing auth:", e);
        }
      }

      const directToken = localStorage.getItem("token");
      if (directToken) return directToken;

      const agentToken = localStorage.getItem("agent_token");
      if (agentToken) return agentToken;

      const accessToken = localStorage.getItem("access_token");
      if (accessToken) return accessToken;

      console.warn("No token found in localStorage");
      return "";
    } catch (error) {
      console.error("Error getting token:", error);
      return "";
    }
  };

  // Safe parse function for JSON strings
  const safeParse = (field: any): any => {
    if (!field || field === "null" || field === "[]") return [];
    if (Array.isArray(field)) return field;

    try {
      let parsed = typeof field === 'string' ? JSON.parse(field) : field;
      // Handle double-stringified data
      if (typeof parsed === 'string') parsed = JSON.parse(parsed);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.warn("Parse error for field:", field, e);
      return [];
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
  };

  const fetchApplicationData = async () => {
    if (!appId) return;
    setLoading(true);
    try {
      const token = getToken();
      const FILE_ROOT = "http://studyxl.globalrouteway.com";

      const response = await fetch(`${BASE_URL}/agent/applications/${appId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();

      if (result.success && result.data) {
        const rawData = result.data;
        const programSnapshot = rawData.program_snapshot || {};
        const studentSnapshot = rawData.student_snapshot || {};

        // Parse student snapshot data
        const parsedAcademicQualifications = safeParse(studentSnapshot.academic_qualifications);
        const parsedLanguageTests = safeParse(studentSnapshot.language_tests);
        const parsedDocuments = safeParse(studentSnapshot.documents);
        const parsedWorkExperiences = safeParse(studentSnapshot.work_experiences);
        const parsedReferees = safeParse(studentSnapshot.referees);

        // Initialize document files object
        const docFiles: Record<string, string> = {};

        // Map documents from API to document config keys
        if (parsedDocuments && parsedDocuments.length > 0) {
          parsedDocuments.forEach((doc: Document) => {
            // Find matching document key from title map
            const entry = Object.entries(documentTitleMap).find(
              ([key, title]) => title === doc.document_type
            );
            
            if (entry) {
              const [key] = entry;
              docFiles[key] = doc.file_path;
            }
          });
        }

        // Combine all data - Only essential fields
        setFormData((prev) => ({
          ...prev,
          // Basic info
          student_name: `${studentSnapshot.first_name || ""} ${studentSnapshot.family_name || ""}`.trim(),
          student_id: studentSnapshot.id?.toString() || "",
          email: studentSnapshot.email || "",
          phone: studentSnapshot.phone || "",
          gender: studentSnapshot.gender || "",
          dob: formatDateForInput(studentSnapshot.date_of_birth),
          passport: studentSnapshot.passport_number || "",
          passport_expiry: formatDateForInput(studentSnapshot.expiry_date),
          address: studentSnapshot.current_address_1 || "",
          
          // Program info from program_snapshot - Only essential
          program_id: programSnapshot.id?.toString() || "",
          program_name: programSnapshot.program_name || "",
          university_name: programSnapshot.university_name || "",
          university_id: programSnapshot.university_id?.toString() || "",
          intake_name: programSnapshot.intake_name || "",
          country: programSnapshot.location || programSnapshot.education_country || "",

          // Status
          status: rawData.status || "Pending",
          created_at: rawData.created_at || "",
          updated_at: rawData.updated_at || "",

          // Arrays
          academic_qualifications: parsedAcademicQualifications,
          language_tests: parsedLanguageTests,
          documents: parsedDocuments,
          work_experiences: parsedWorkExperiences,
          references: parsedReferees,

          // Files from student snapshot documents - mapped to document config keys
          ...docFiles,
        }));

        // Clear old previews
        setFilePreviews({});
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load application data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, [appId, id, currentStatus]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    const step = getStepForField(name);
    if (step && stepErrors[step]) {
      const newErrors = { ...stepErrors };
      newErrors[step] = newErrors[step].filter(
        (error) => !error.includes(name),
      );
      setStepErrors(newErrors);
    }
  };

  // Handle array field changes
  const handleArrayChange = (
    field: keyof FormData,
    index: number,
    subField: string,
    value: any,
  ) => {
    setFormData((prev) => {
      const arrayField = prev[field] as any[];
      if (!arrayField) return prev;
      const newArray = [...arrayField];
      if (newArray[index]) {
        if (subField === "") {
          newArray[index] = value;
        } else {
          newArray[index] = { ...newArray[index], [subField]: value };
        }
      }
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: keyof FormData, template: any) => {
    setFormData((prev) => {
      const sanitizedTemplate = Object.keys(template).reduce((acc, key) => {
        acc[key] = template[key] ?? "";
        return acc;
      }, {} as any);

      if ("document" in sanitizedTemplate) {
        sanitizedTemplate.document = [];
      }

      const currentArray = Array.isArray(prev[field]) ? (prev[field] as any[]) : [];

      return {
        ...prev,
        [field]: [...currentArray, sanitizedTemplate]
      };
    });
  };

  // Remove item from array
  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => {
      const currentArray = prev[field] as any[];
      if (!Array.isArray(currentArray)) return prev;
      return {
        ...prev,
        [field]: currentArray.filter((_, i) => i !== index),
      };
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (alreadySubmitted || submitSuccess) {
      Swal.fire({
        icon: "error",
        title: "Cannot Upload",
        text: "This application has been submitted. Please contact admin for changes.",
      });
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const maxSize = 10 * 1024 * 1024; // 10MB

    const validMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    const validExtensions = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

    for (const file of selectedFiles) {
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      const isValidType = validMimeTypes.includes(file.type) || validExtensions.includes(fileExtension);

      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: `${file.name} is too large. Max size is 10MB.`,
        });
        return;
      }

      if (!isValidType) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: `The file "${file.name}" is not a supported format.`,
        });
        return;
      }
    }

    setFiles((prev) => ({
      ...prev,
      [field]: prev[field] ? [...(prev[field] as File[]), ...selectedFiles] : selectedFiles,
    }));

    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [`${field}-${file.name}`]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    });

    e.target.value = "";
  };

  const handleRemoveIndividualFile = (field: string, indexToRemove: number) => {
    setFiles((prev) => {
      const currentFiles = Array.from(prev[field] as File[] || []);

      const fileToRemove = currentFiles[indexToRemove];

      const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);

      if (fileToRemove) {
        setFilePreviews((prevPreviews) => {
          const newPreviews = { ...prevPreviews };
          delete newPreviews[`${field}-${fileToRemove.name}`];
          return newPreviews;
        });
      }

      return {
        ...prev,
        [field]: updatedFiles.length > 0 ? updatedFiles : null,
      };
    });
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.student_name?.trim())
          errors.push("Student Name is required");
        if (!formData.student_id?.toString().trim())
          errors.push("Student ID is required");
        if (!formData.dob) errors.push("Date of Birth is required");
        if (!formData.gender) errors.push("Gender is required");
        if (!formData.passport?.trim())
          errors.push("Passport Number is required");
        if (!formData.passport_expiry)
          errors.push("Passport Expiry Date is required");
        break;

      case 2:
        if (!formData.email?.trim()) errors.push("Email is required");
        if (!formData.phone?.trim()) errors.push("Phone is required");
        if (!formData.address?.trim()) errors.push("Address is required");
        break;

      case 3:
        // Check mandatory documents
        const mandatoryDocs = documentConfig.filter(doc => doc.mandatory);
        mandatoryDocs.forEach((doc) => {
          if (!files[doc.key] && !formData[doc.key as keyof FormData]) {
            errors.push(`${doc.title} is required`);
          }
        });
        break;

      case 5:
        if (!formData.academic_qualifications || formData.academic_qualifications.length === 0) {
          errors.push("At least one Academic Qualification is required");
        }
        break;
    }

    if (errors.length > 0) {
      setStepErrors((prev) => ({ ...prev, [step]: errors }));
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        html: `<div class="text-left"><p class="font-semibold">Please fill the following fields:</p><ul class="list-disc pl-4 mt-2">${errors.map((err) => `<li>${err}</li>`).join("")}</ul></div>`,
      });
      return false;
    }

    setStepErrors((prev) => ({ ...prev, [step]: [] }));
    return true;
  };

  // Get step for field
  const getStepForField = (fieldName: string): number | null => {
    const stepFields: Record<number, string[]> = {
      1: [
        "student_name", "student_id", "dob", "gender", "passport", "passport_expiry",
      ],
      2: [
        "email", "phone", "address",
      ],
      3: [
        ...documentConfig.map(doc => doc.key),
        "documents",
      ],
      4: [
        "program_name", "university_name", "program_id", "university_id", "intake_name", "country",
      ],
      5: ["academic_qualifications", "work_experiences", "references"],
    };

    for (const [step, fields] of Object.entries(stepFields)) {
      if (fields.includes(fieldName)) return parseInt(step);
    }
    return null;
  };

  // Show success alert
  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Application Submitted Successfully!",
      html: `
        <div class="text-left">
          <p>Your application has been submitted successfully.</p>
          <p class="mt-2 font-semibold text-red-600">Please contact your admin for any changes.</p>
          <p class="mt-2 text-sm">You cannot modify this application anymore.</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  // Show error alert
  const showErrorAlert = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      showConfirmButton: true,
    });
  };

  // Save as Draft
  const handleSaveDraft = async () => {
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        if (stepContainerRef.current) {
          stepContainerRef.current.scrollTop = 0;
        }
        return;
      }
    }

    setSubmitLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) throw new Error("Authentication token not found.");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formDataToSend = new FormData();

      const formFields = [
        "student_name", "student_id", "email", "phone", "gender",
        "dob", "passport", "passport_expiry", "address",
        "program_id", "program_name", "university_name", "university_id", 
        "intake_name", "country",
      ];

      formFields.forEach((field) => {
        const value = formData[field as keyof FormData];
        if (value !== null && value !== undefined && value !== "") {
          if (typeof value === "boolean") {
            formDataToSend.append(field, value ? "1" : "0");
          } else {
            formDataToSend.append(field, value.toString());
          }
        }
      });

      formDataToSend.append("status", "Reviewed");

      const complexFields = ["academic_qualifications", "work_experiences", "references", "language_tests"];
      complexFields.forEach(field => {
        const rawValue = formData[field as keyof FormData];
        let cleanArray = Array.isArray(rawValue) ? rawValue : [];

        if (field === "academic_qualifications") {
          cleanArray = cleanArray.map((qual: any) => {
            let docs = [];
            try {
              docs = typeof qual.document === 'string' ? JSON.parse(qual.document) : (qual.document || []);
              if (typeof docs === 'string') docs = JSON.parse(docs);
            } catch (e) { docs = []; }
            return { ...qual, document: docs };
          });
        }
        formDataToSend.append(field, JSON.stringify(cleanArray));
      });

      // Add documents
      let docIndex = 0;

      // First, add existing documents from formData
      Object.entries(documentTitleMap).forEach(([key, title]) => {
        const existingDoc = formData[key as keyof FormData];
        if (existingDoc && typeof existingDoc === 'string' && existingDoc !== "") {
          formDataToSend.append(`documents[${docIndex}][document_type]`, title);
          formDataToSend.append(`documents[${docIndex}][existing_path]`, existingDoc);
          docIndex++;
        }
      });

      // Then, add new files from files state
      Object.entries(files).forEach(([key, fileValue]) => {
        if (!fileValue || !Array.isArray(fileValue) || fileValue.length === 0) return;

        const title = documentTitleMap[key];
        if (title) {
          formDataToSend.append(`documents[${docIndex}][document_type]`, title);
          
          fileValue.forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append(`documents[${docIndex}][file][]`, file, file.name);
            }
          });
          
          docIndex++;
        }
      });

      const response = await fetch(`${BASE_URL}/agent/applications/${appId}`, {
        method: "POST",
        headers: myHeaders,
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({ ...prev, status: "Reviewed" }));
        setFiles(initialFileState);

        Swal.fire({
          icon: "success",
          title: "Saved Successfully!",
          text: "Your draft has been updated.",
        });

        fetchApplicationData();
      } else {
        throw new Error(result.message || "Save failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Failed to save.");
      Swal.fire("Error", err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        if (stepContainerRef.current) stepContainerRef.current.scrollTop = 0;
        return;
      }
    }

    const confirmationCheckbox = document.getElementById("confirm") as HTMLInputElement;
    if (!confirmationCheckbox?.checked) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation Required",
        text: "Please confirm that all information is accurate before submitting.",
      });
      return;
    }

    setSubmitLoading(true);
    setError(null);

    try {
      const authRaw = localStorage.getItem("auth");
      if (!authRaw) throw new Error("You are logged out. Please login again.");
      let token = "";
      try {
        const authData = JSON.parse(authRaw);
        token = authData.token || authData;
      } catch (e) {
        token = authRaw;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("_method", "POST");

      const formFields = [
        "student_name", "student_id", "email", "phone", "gender",
        "dob", "passport", "passport_expiry", "address",
        "program_id", "program_name", "university_name", "university_id", 
        "intake_name", "country",
      ];

      formFields.forEach((field) => {
        const value = formData[field as keyof FormData];
        if (value !== null && value !== undefined && value !== "") {
          if (typeof value === "boolean") {
            formDataToSend.append(field, value ? "1" : "0");
          } else {
            formDataToSend.append(field, String(value));
          }
        }
      });

      const arrayFields = ["academic_qualifications", "work_experiences", "references", "language_tests"];

      arrayFields.forEach(field => {
        let rawValue = formData[field as keyof FormData];
        let cleanArray = [];

        try {
          cleanArray = Array.isArray(rawValue) ? rawValue : JSON.parse(rawValue || '[]');
        } catch (e) { cleanArray = []; }

        if (field === "academic_qualifications") {
          cleanArray = cleanArray.map((qual: any) => {
            let existingDocs = [];
            try {
              const docField = qual.document;
              if (Array.isArray(docField)) {
                existingDocs = docField;
              } else if (typeof docField === 'string' && docField !== "") {
                const firstParse = JSON.parse(docField);
                existingDocs = typeof firstParse === 'string' ? JSON.parse(firstParse) : firstParse;
              }
            } catch (e) {
              console.error("Error parsing document field:", e);
              existingDocs = [];
            }

            return {
              ...qual,
              document: Array.isArray(existingDocs) ? existingDocs : []
            };
          });
        }

        formDataToSend.append(field, JSON.stringify(cleanArray));
      });

      formDataToSend.set("status", "Reviewed");

      // Add documents
      let docIndex = 0;

      Object.entries(documentTitleMap).forEach(([key, title]) => {
        const existingDoc = formData[key as keyof FormData];
        if (existingDoc && typeof existingDoc === 'string' && existingDoc !== "") {
          formDataToSend.append(`documents[${docIndex}][document_type]`, title);
          formDataToSend.append(`documents[${docIndex}][existing_path]`, existingDoc);
          docIndex++;
        }
      });

      Object.entries(files).forEach(([key, fileValue]) => {
        if (!fileValue || !Array.isArray(fileValue) || fileValue.length === 0) return;

        const title = documentTitleMap[key];
        if (title) {
          formDataToSend.append(`documents[${docIndex}][document_type]`, title);
          
          fileValue.forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append(`documents[${docIndex}][file][]`, file, file.name);
            }
          });
          
          docIndex++;
        }
      });

      const response = await fetch(`${BASE_URL}/agent/applications/${appId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: formDataToSend,
      });

      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Raw Server Error:", responseText);
        throw new Error("Server Error: Unable to process request. Check console for details.");
      }

      if (!response.ok) throw new Error(result.message || "Submission failed");

      if (result.success || response.status === 200) {
        setFiles(initialFileState);
        setFilePreviews({});
        setTimeout(async () => {
          await fetchApplicationData();
          setSubmitSuccess(true);
          setAlreadySubmitted(true);
          showSuccessAlert();
        }, 1000);
      }
    } catch (err) {
      console.error("Full Error Context:", err);
      const errorMessage = err instanceof Error ? err.message : "Submission failed.";
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
      setTimeout(() => {
        if (stepContainerRef.current) {
          stepContainerRef.current.scrollTop = 0;
        }
      }, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
      setTimeout(() => {
        if (stepContainerRef.current) {
          stepContainerRef.current.scrollTop = 0;
        }
      }, 0);
    }
  };

  // Handle close
  const handleClose = () => {
    document.body.style.overflow = "auto";
    if (onClose) onClose();
  };

  // Step titles - Simplified
  const stepTitles = [
    "Personal Information",
    "Contact Details",
    "Documents",
    "Program Details",
    "Academic & Work",
    "Review & Submit",
  ];

  // Check if form should be disabled
  const isFormDisabled =
    submitSuccess || alreadySubmitted || formData.status === "Submitted";

  // Render loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mb-4"></div>
            <p className="text-black">Loading application data...</p>
          </div>
        </div>
      </div>
    );
  }

  const FILE_ROOT = "http://studyxl.globalrouteway.com";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header with Close Button */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Application Details
            </h2>
            <p className="text-secondary text-sm mt-1">
              Application ID: <span className="font-semibold">{appId}</span> |
              Status:{" "}
              <span
                className={`font-semibold ${formData.status === "Submitted" ? "text-green-600" : formData.status === "Reviewed" ? "text-yellow-600" : "text-blue-600"}`}
              >
                {formData.status}
              </span>
            </p>
            {error && !isFormDisabled && (
              <p className="text-yellow-600 text-sm mt-1">{error}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            {stepTitles.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / totalSteps}%` }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-xs ${
                    currentStep > index + 1
                      ? "bg-primary text-white"
                      : currentStep === index + 1
                        ? "bg-secondary text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > index + 1 ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs text-center truncate w-full ${
                    currentStep >= index + 1
                      ? "font-medium text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm font-medium text-secondary">
              Step {currentStep}: {stepTitles[currentStep - 1]}
            </span>
            {stepErrors[currentStep] &&
              stepErrors[currentStep].length > 0 &&
              !isFormDisabled && (
                <div className="text-red-600 text-xs mt-1">
                  {stepErrors[currentStep].length} field(s) need attention
                </div>
              )}
          </div>
        </div>

        {/* Already Submitted Message */}
        {(alreadySubmitted ||
          submitSuccess ||
          formData.status === "Submitted") && (
          <div className="px-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 mt-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 font-semibold">
                    {submitSuccess
                      ? "Application submitted successfully!"
                      : "This application has already been submitted."}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Please contact your admin for any changes. You cannot modify
                    a submitted application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full">
            <div
              ref={stepContainerRef}
              className="p-6 overflow-y-auto pb-24"
              style={{ height: "calc(95vh - 280px)", maxHeight: "600px" }}
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student Name *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.student_name || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="student_name"
                          value={formData.student_name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.student_id || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="student_id"
                          value={formData.student_id}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.dob || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.gender || "Not provided"}
                        </div>
                      ) : (
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Number *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.passport || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="passport"
                          value={formData.passport}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Expiry Date *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.passport_expiry || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="date"
                          name="passport_expiry"
                          value={formData.passport_expiry}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Contact Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.email || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.phone || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Address *
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.address || "Not provided"}
                        </div>
                      ) : (
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={2}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Document Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Document Information
                    </h3>
                  </div>

                  {/* Documents from student_snapshot */}
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Uploaded Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.documents.map((doc, index) => (
                          <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-1">{doc.document_type}</p>
                            <a
                              href={`${FILE_ROOT}/${doc.file_path.replace(/^\/+/, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs flex items-center hover:underline"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4-4A2 2 0 0013.414 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              View Document
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documentConfig.map((doc) => {
                      const field = doc.key;
                      
                      return (
                        <div key={field} className="border p-4 rounded-lg bg-white shadow-sm">
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            {doc.title} {doc.mandatory && <span className="text-red-500">*</span>}
                            <span className="text-xs text-gray-500 ml-2">(Max: {doc.max} files)</span>
                          </label>

                          <div className="space-y-3">
                            {/* Show existing files */}
                            {formData[field] && (
                              <div className="space-y-2">
                                {(Array.isArray(formData[field])
                                  ? formData[field]
                                  : [formData[field]]
                                ).map((fileUrl, index) => (
                                  <div
                                    key={`existing-${index}`}
                                    className="p-2 bg-green-50 border border-green-200 rounded"
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <a
                                        href={`${FILE_ROOT}/${fileUrl?.toString().replace(/^\/+/, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-green-700 flex items-center text-sm hover:underline cursor-pointer"
                                      >
                                        <svg
                                          className="w-4 h-4 mr-1 flex-shrink-0"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        <span className="truncate">
                                          {fileUrl?.toString().split("/").pop()}
                                        </span>
                                      </a>
                                    </div>

                                    {/* Photo Preview */}
                                    {typeof fileUrl === 'string' && fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) && (
                                      <a
                                        href={`${FILE_ROOT}/${fileUrl.toString().replace(/^\/+/, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block mt-2"
                                      >
                                        <img
                                          src={`${FILE_ROOT}/${fileUrl.toString().replace(/^\/+/, '')}`}
                                          alt={doc.title}
                                          className="max-h-32 rounded-lg border border-gray-300 mx-auto hover:opacity-80 transition"
                                        />
                                      </a>
                                    )}

                                    {/* PDF Link */}
                                    {typeof fileUrl === 'string' && fileUrl.toLowerCase().includes(".pdf") && (
                                      <a
                                        href={`${FILE_ROOT}/${fileUrl.replace(/^\/+/, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded flex items-center hover:bg-blue-100 transition group"
                                      >
                                        <svg
                                          className="w-5 h-5 text-blue-500 mr-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4-4A2 2 0 0013.414 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-blue-700 text-sm font-medium">
                                          View PDF
                                        </span>
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Show NEWLY selected multiple files */}
                            {files[field] && (
                              <div className="space-y-2">
                                {(Array.isArray(files[field])
                                  ? (files[field] as File[])
                                  : [files[field] as File]
                                ).map((file, index) => {
                                  const localFileUrl = URL.createObjectURL(file);
                                  return (
                                    <div
                                      key={`new-${index}`}
                                      className="p-2 bg-blue-50 border border-blue-200 rounded"
                                    >
                                      <div className="flex justify-between items-center">
                                        <a
                                          href={localFileUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 flex items-center text-sm hover:underline"
                                        >
                                          <svg
                                            className="w-4 h-4 mr-1 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          <span className="truncate font-medium">
                                            {file.name}
                                          </span>
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveIndividualFile(field, index)}
                                          className="text-red-500 hover:text-red-700 text-xs font-bold px-1"
                                        >
                                          ✖ Remove
                                        </button>
                                      </div>

                                      {/* Photo Preview */}
                                      {file.type?.startsWith("image/") &&
                                        filePreviews[`${field}-${file.name}`] && (
                                          <a
                                            href={localFileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block mt-2"
                                          >
                                            <img
                                              src={filePreviews[`${field}-${file.name}`]}
                                              alt="preview"
                                              className="max-h-32 rounded-lg border border-gray-300 mx-auto hover:opacity-80"
                                            />
                                          </a>
                                        )}

                                      {/* PDF Link */}
                                      {file.type === "application/pdf" && (
                                        <a
                                          href={localFileUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="mt-2 flex items-center bg-white p-2 rounded border border-blue-100 hover:bg-blue-50"
                                        >
                                          <svg
                                            className="w-5 h-5 text-blue-500 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                          </svg>
                                          <span className="text-blue-700 text-sm">
                                            View PDF
                                          </span>
                                        </a>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* File upload input */}
                            {!isFormDisabled && (
                              <div className="mt-2">
                                <input
                                  type="file"
                                  multiple
                                  onChange={(e) => handleFileChange(e, field)}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                  Uploaded: {files[field] ? (files[field] as File[]).length : 0} / {doc.max} files
                                </p>
                              </div>
                            )}

                            {/* Empty State */}
                            {(!formData[field] ||
                              (Array.isArray(formData[field]) &&
                                formData[field].length === 0)) &&
                              (!files[field] || ((files[field] as unknown) as File[]).length === 0) && (
                                <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                                  <p className="text-gray-400 italic text-sm flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-1"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    No file uploaded
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Program Details - Only 5 items */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      4
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Program Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Name
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.program_name || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="program_name"
                          value={formData.program_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        University Name
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.university_name || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="university_name"
                          value={formData.university_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program ID
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.program_id || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="program_id"
                          value={formData.program_id}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        University ID
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.university_id || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="university_id"
                          value={formData.university_id}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Intake
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.intake_name || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="intake_name"
                          value={formData.intake_name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.country || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Academic & Work Experience */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      5
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Academic & Work Experience
                    </h3>
                  </div>

                  {/* Academic Qualifications Array */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">Academic Qualifications *</h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() => addArrayItem("academic_qualifications", { degree: "", institution: "", year: "", cgpa: "", document: [] })}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          + Add Qualification
                        </button>
                      )}
                    </div>

                    {(() => {
                      let qualifications = [];
                      try {
                        const raw = formData.academic_qualifications;
                        if (Array.isArray(raw)) {
                          qualifications = raw;
                        } else if (typeof raw === 'string' && raw.trim() !== "") {
                          qualifications = JSON.parse(raw);
                          if (typeof qualifications === 'string') {
                            qualifications = JSON.parse(qualifications);
                          }
                        }
                      } catch (e) {
                        console.error("Parsing error:", e);
                        qualifications = [];
                      }
                      return (
                        <div className="space-y-3">
                          {qualifications.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                              No academic qualifications added
                            </div>
                          ) : (
                            qualifications.map((qual: AcademicQualification, index: number) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                  <h5 className="font-medium text-gray-700 text-sm">Qualification #{index + 1}</h5>
                                  {!isFormDisabled && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayItem("academic_qualifications", index)}
                                      className="text-red-500 hover:text-red-700 text-xs font-bold"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Degree</label>
                                    {isFormDisabled ? (
                                      <div className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-gray-50">
                                        {qual.degree || "N/A"}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={qual.degree || ""}
                                        onChange={(e) => handleArrayChange("academic_qualifications", index, "degree", e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Institution</label>
                                    {isFormDisabled ? (
                                      <div className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-gray-50">
                                        {qual.institution || "N/A"}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={qual.institution || ""}
                                        onChange={(e) => handleArrayChange("academic_qualifications", index, "institution", e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                                    {isFormDisabled ? (
                                      <div className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-gray-50">
                                        {qual.year || "N/A"}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={qual.year || ""}
                                        onChange={(e) => handleArrayChange("academic_qualifications", index, "year", e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">CGPA</label>
                                    {isFormDisabled ? (
                                      <div className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-gray-50">
                                        {qual.cgpa || "N/A"}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={qual.cgpa || ""}
                                        onChange={(e) => handleArrayChange("academic_qualifications", index, "cgpa", e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                      />
                                    )}
                                  </div>
                                </div>

                                {/* Document Section */}
                                {qual.document && qual.document.length > 0 && (
                                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                      <label className="text-xs font-medium text-gray-700">Documents</label>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {(() => {
                                        let docs: (File | string)[] = [];
                                        if (Array.isArray(qual.document)) {
                                          docs = qual.document;
                                        } else if (typeof qual.document === 'string') {
                                          try { docs = JSON.parse(qual.document); } catch { docs = []; }
                                        }

                                        return docs.map((doc, dIdx) => {
                                          if (!doc) return null;

                                          const isExistingString = typeof doc === 'string';

                                          return (
                                            <div key={dIdx} className="flex items-center">
                                              {isExistingString ? (
                                                <a
                                                  href={`${FILE_ROOT}/${doc.replace(/^\/+/, '')}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex items-center px-2 py-1 bg-white border border-blue-200 text-blue-600 rounded-l text-xs hover:bg-blue-50"
                                                >
                                                  Document {dIdx + 1}
                                                </a>
                                              ) : (
                                                <span className="inline-flex items-center px-2 py-1 bg-green-100 border border-green-200 text-green-700 rounded-l text-xs font-medium">
                                                  {(doc as File)?.name ? (doc as File).name.substring(0, 15) + "..." : "New File"}
                                                </span>
                                              )}
                                            </div>
                                          );
                                        });
                                      })()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Work Experiences Array */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        Work Experiences
                      </h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("work_experiences", {
                              organization: "",
                              position: "",
                              start_date: "",
                              end_date: "",
                              description: "",
                            })
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Experience
                        </button>
                      )}
                    </div>

                    {!formData.work_experiences || formData.work_experiences.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                        No work experiences added
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.work_experiences.map((exp, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Experience #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem("work_experiences", index)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Organization
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {exp.organization || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={exp.organization}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "work_experiences",
                                        index,
                                        "organization",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Position
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {exp.position || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={exp.position}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "work_experiences",
                                        index,
                                        "position",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Start Date
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {exp.start_date || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="date"
                                    value={exp.start_date}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "work_experiences",
                                        index,
                                        "start_date",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  End Date
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {exp.end_date || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="date"
                                    value={exp.end_date}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "work_experiences",
                                        index,
                                        "end_date",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100 min-h-[60px]">
                                    {exp.description || "N/A"}
                                  </div>
                                ) : (
                                  <textarea
                                    value={exp.description}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "work_experiences",
                                        index,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                    rows={2}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      6
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Review & Submit Application
                    </h3>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-secondary">
                          {formData.student_name || "Untitled Application"}
                        </h4>
                        {(formData.university_name || formData.program_name) && (
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            {formData.university_name && (
                              <span className="font-semibold text-blue-600">
                                {formData.university_name}
                              </span>
                            )}
                            {formData.university_name && formData.program_name && <span>•</span>}
                            {formData.program_name && <span>{formData.program_name}</span>}
                          </p>
                        )}
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Application Status
                        </p>
                        <p className="text-sm font-bold text-secondary">
                          {formData.status || "Draft"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Program Details - Show the 5 items */}
                      <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm md:col-span-2">
                        <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                          Program Details
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          {formData.program_name && (
                            <div>
                              <p className="text-gray-500 text-xs">Program Name</p>
                              <p className="font-medium">{formData.program_name}</p>
                            </div>
                          )}
                          {formData.university_name && (
                            <div>
                              <p className="text-gray-500 text-xs">University</p>
                              <p className="font-medium">{formData.university_name}</p>
                            </div>
                          )}
                          {formData.program_id && (
                            <div>
                              <p className="text-gray-500 text-xs">Program ID</p>
                              <p className="font-medium">{formData.program_id}</p>
                            </div>
                          )}
                          {formData.university_id && (
                            <div>
                              <p className="text-gray-500 text-xs">University ID</p>
                              <p className="font-medium">{formData.university_id}</p>
                            </div>
                          )}
                          {formData.intake_name && (
                            <div>
                              <p className="text-gray-500 text-xs">Intake</p>
                              <p className="font-medium">{formData.intake_name}</p>
                            </div>
                          )}
                          {formData.country && (
                            <div>
                              <p className="text-gray-500 text-xs">Country</p>
                              <p className="font-medium">{formData.country}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Personal Profile Section */}
                      {(formData.gender || formData.dob || formData.passport) && (
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                            Student Identity
                          </h5>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            {formData.gender && <><p className="text-gray-500">Gender:</p><p className="font-medium">{formData.gender}</p></>}
                            {formData.dob && <><p className="text-gray-500">Date of Birth:</p><p className="font-medium">{formData.dob}</p></>}
                            {formData.passport && <><p className="text-gray-500">Passport No:</p><p className="font-medium">{formData.passport}</p></>}
                            {formData.passport_expiry && <><p className="text-gray-500">Expiry:</p><p className="font-medium text-red-500">{formData.passport_expiry}</p></>}
                          </div>
                        </div>
                      )}

                      {/* Contact Section */}
                      {(formData.email || formData.phone || formData.address) && (
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                            Contact Information
                          </h5>
                          <div className="space-y-2 text-sm">
                            {formData.email && <p><span className="text-gray-500">Email:</span> {formData.email}</p>}
                            {formData.phone && <p><span className="text-gray-500">Phone:</span> {formData.phone}</p>}
                            {formData.address && <p><span className="text-gray-500">Address:</span> {formData.address}</p>}
                          </div>
                        </div>
                      )}

                      {/* Academic History Section */}
                      {Array.isArray(formData.academic_qualifications) &&
                        formData.academic_qualifications.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm md:col-span-2">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                              Academic Background
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {formData.academic_qualifications.slice(0, 3).map((edu, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <p className="font-bold text-secondary text-sm">{edu.degree}</p>
                                  <p className="text-xs text-gray-600">{edu.institution}</p>
                                  <div className="flex justify-between mt-2 text-xs uppercase font-bold text-blue-500">
                                    <span>Year: {edu.year}</span>
                                    <span>Result: {edu.cgpa}</span>
                                  </div>
                                </div>
                              ))}
                              {formData.academic_qualifications.length > 3 && (
                                <p className="text-xs text-gray-500">+{formData.academic_qualifications.length - 3} more qualifications</p>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Documents Checklist */}
                      <div className="md:col-span-2 bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                          Uploaded Documents
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {documentConfig.map((doc) => {
                            const hasExistingFile = formData[doc.key] && formData[doc.key].length > 0 && formData[doc.key] !== "[]";
                            const hasNewFile = files[doc.key] && (files[doc.key] as File[]).length > 0;
                            const hasFile = hasExistingFile || hasNewFile;

                            if (!hasFile) return null;

                            return (
                              <div
                                key={doc.key}
                                className="flex items-center justify-center gap-2 p-2 rounded text-xs font-bold uppercase border bg-green-50 border-green-200 text-green-700 animate-fadeIn"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                                {doc.key}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Language Tests */}
                      {formData.language_tests && formData.language_tests.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                            Language Tests
                          </h5>
                          <div className="space-y-2">
                            {formData.language_tests.map((test, i) => (
                              <div key={i} className="text-sm">
                                <span className="font-medium">{test.test_token}:</span> {test.remarks}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Meta */}
                    <div className="mt-6 pt-4 border-t border-blue-200 flex flex-wrap justify-between items-center text-xs text-blue-400 font-medium uppercase">
                      <span>Student ID: {formData.student_id}</span>
                      <span>Application ID: {appId}</span>
                    </div>
                  </div>

                  {/* Submission Confirmation */}
                  {!isFormDisabled ? (
                    <div className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <input
                        id="confirm"
                        type="checkbox"
                        className="h-5 w-5 text-secondary border-gray-300 rounded focus:ring-secondary transition cursor-pointer"
                      />
                      <label htmlFor="confirm" className="ml-3 text-sm text-gray-700 leading-tight cursor-pointer">
                        I hereby certify that the information provided for <strong>{formData.student_name}</strong> is true and correct.
                      </label>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-700 text-sm">
                      <p>This application is <strong>Locked</strong>. Status: {formData.status}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
              <div className="flex justify-between items-center">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={submitLoading || isFormDisabled}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 hidden md:block">
                    Step {currentStep} of {totalSteps}
                  </span>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={submitLoading || isFormDisabled}
                      className="px-6 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm transition-colors min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  ) : !isFormDisabled ? (
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        disabled={submitLoading}
                        className={`px-6 py-2.5 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm transition-colors min-w-[140px] ${
                          submitLoading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
                        }`}
                      >
                        {submitLoading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Save as Draft"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        disabled={submitLoading}
                        className={`px-6 py-2.5 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm transition-colors min-w-[160px] ${
                          submitLoading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-secondary text-white hover:bg-primary focus:ring-secondary"
                        }`}
                      >
                        {submitLoading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm transition-colors min-w-[120px]"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentFinalApply;











