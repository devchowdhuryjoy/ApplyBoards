import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

interface AcademicQualification {
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
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

interface FormData {
  // Basic Information
  student_name: string;
  student_id: string;
  agent_name: string;
  agent_id: string;
  program_id: string;
  program_name: string;
  university_name: string;
  intake: string;
  status: string;
  visa_rejection_status: string;
  visa_rejection_reason: string;

  // ===============================
  // Program Details
  // ===============================
  program_level_id: string;
  program_description: string;
  program_level: string;
  program_open_date: string;
  program_submission_deadline: string;
  intake_name: string;
  field_of_study_id: string;
  field_of_study_name: string;
  study_permit_or_visa: string;
  program_nationality: string;
  education_country: string;

  // ===============================
  // English Requirements
  // ===============================
  ielts_required: boolean;
  ielts_reading: string;
  ielts_writing: string;
  ielts_listening: string;
  ielts_speaking: string;
  ielts_overall: string;

  toefl_required: boolean;
  toefl_reading: string;
  toefl_writing: string;
  toefl_listening: string;
  toefl_speaking: string;
  toefl_overall: string;

  duolingo_required: boolean;
  duolingo_total: string;

  pte_required: boolean;
  pte_reading: string;
  pte_writing: string;
  pte_listening: string;
  pte_speaking: string;
  pte_overall: string;

  // ===============================
  // Program Meta
  // ===============================
  program_tag_id: string;
  program_tag_name: string;
  no_exam_status: string;
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
  campus_city: string;
  duration: string;
  success_chance: string;
  program_summary: string;

  // ===============================
  // Student Profile
  // ===============================
  company_name: string;
  email: string;
  destination: string;
  study_level: string;
  subject: string;
  student_profile_nationality: string;
  passport: string;
  elp: string;
  dob: string;
  address: string;
  phone: string;
  gender: string;
  passport_expiry: string;
  country_of_residence: string;
  specialization: string;
  resume: string;
  passport_copy: string;
  transcripts: string;
  english_test: string;
  photo: string;

  language_test_status: string;
  open_to_language_course: boolean;
  has_gre_score: number;
  has_gmat_score: number;
  has_name_difference: boolean;

  // ===============================
  // Arrays (JSON)
  // ===============================
  academic_qualifications: AcademicQualification[];
  test_scores: TestScore[];
  work_experiences: WorkExperience[];
  references: Reference[];

  created_at: string;
  updated_at: string;
}

interface FileState {
  resume: File | null;
  passport_copy: File | null;
  transcripts: File | null;
  english_test: File | null;
  photo: File | null;
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
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    student_name: "",
    student_id: "",
    agent_name: "",
    agent_id: "",
    program_id: "",
    program_name: "",
    university_name: "",
    intake: "",
    status: "",
    visa_rejection_status: "",
    visa_rejection_reason: "",

    // Program Details
    program_level_id: "",
    program_description: "",
    program_level: "",
    program_open_date: "",
    program_submission_deadline: "",
    intake_name: "",
    field_of_study_id: "",
    field_of_study_name: "",
    study_permit_or_visa: "",
    program_nationality: "",
    education_country: "",

    // English Requirements
    ielts_required: false,
    ielts_reading: "",
    ielts_writing: "",
    ielts_listening: "",
    ielts_speaking: "",
    ielts_overall: "",

    toefl_required: false,
    toefl_reading: "",
    toefl_writing: "",
    toefl_listening: "",
    toefl_speaking: "",
    toefl_overall: "",

    duolingo_required: false,
    duolingo_total: "",

    pte_required: false,
    pte_reading: "",
    pte_writing: "",
    pte_listening: "",
    pte_speaking: "",
    pte_overall: "",

    // Program Meta
    program_tag_id: "",
    program_tag_name: "",
    no_exam_status: "",
    application_fee: "",
    application_short_desc: "",
    average_graduate_program: "",
    average_graduate_program_short_desc: "",
    average_undergraduate_program: "",
    average_undergraduate_program_short_desc: "",
    cost_of_living: "",
    cost_of_living_short_desc: "",
    average_gross_tuition: "",
    average_gross_tuition_short_desc: "",
    campus_city: "",
    duration: "",
    success_chance: "",
    program_summary: "",

    // Student Profile
    company_name: "",
    email: "",
    destination: "",
    study_level: "",
    subject: "",
    student_profile_nationality: "",
    passport: "",
    elp: "",
    dob: "",
    address: "",
    phone: "",
    gender: "",
    passport_expiry: "",
    country_of_residence: "",
    specialization: "",
    resume: "",
    passport_copy: "",
    transcripts: "",
    english_test: "",
    photo: "",

    language_test_status: "",
    open_to_language_course: false,
    has_gre_score: 0,
    has_gmat_score: 0,
    has_name_difference: false,

    // Arrays (JSON)
    academic_qualifications: [],
    test_scores: [],
    work_experiences: [],
    references: [],

    created_at: "",
    updated_at: "",
  });

  const [files, setFiles] = useState<FileState>({
    resume: null,
    passport_copy: null,
    transcripts: null,
    english_test: null,
    photo: null,
  });

  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});
  const totalSteps = 11;
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

  // ==================== CORRECTED FETCH FUNCTION ====================
  const fetchApplicationData = async () => {
    if (!appId) return;
    setLoading(true);
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/agent/applications/${appId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();
      console.log("Fetched Data:", result);

      if (result.success && result.data) {
        const rawData = result.data;

        // Helper to safely parse JSON strings (for array fields)
        const safeParseJSON = (field: any): any[] => {
          if (!field || field === "null" || field === "[]") return [];
          if (Array.isArray(field)) return field;
          try {
            const parsed = JSON.parse(field);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            console.warn(`Failed to parse JSON field:`, field);
            return [];
          }
        };

        // Helper to format dates for HTML5 date inputs (YYYY-MM-DD)
        const formatDateForInput = (dateString: string): string => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
        };

        // Helper to format datetime-local
        const formatDateTimeForInput = (dateString: string): string => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return !isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : "";
        };

        // Update form data with all fields from the flat API response
        setFormData({
          // Basic Information
          student_name: rawData.student_name || "",
          student_id: rawData.student_id?.toString() || "",
          agent_name: rawData.agent_name || "",
          agent_id: rawData.agent_id?.toString() || "",
          program_id: rawData.program_id?.toString() || "",
          program_name: rawData.program_name || "",
          university_name: rawData.university_name || "",
          intake: rawData.intake || "",
          status: rawData.status || "Pending",
          visa_rejection_status: rawData.visa_rejection_status || "",
          visa_rejection_reason: rawData.visa_rejection_reason || "",

          // Program Details
          program_level_id: rawData.program_level_id?.toString() || "",
          program_description: rawData.program_description || "",
          program_level: rawData.program_level || "",
          program_open_date: formatDateForInput(rawData.program_open_date),
          program_submission_deadline: formatDateTimeForInput(rawData.program_submission_deadline),
          intake_name: rawData.intake_name || "",
          field_of_study_id: rawData.field_of_study_id?.toString() || "",
          field_of_study_name: rawData.field_of_study_name || "",
          study_permit_or_visa: rawData.study_permit_or_visa || "",
          program_nationality: rawData.program_nationality || "",
          education_country: rawData.education_country || "",

          // IELTS
          ielts_required: Boolean(rawData.ielts_required),
          ielts_reading: rawData.ielts_reading?.toString() || "",
          ielts_writing: rawData.ielts_writing?.toString() || "",
          ielts_listening: rawData.ielts_listening?.toString() || "",
          ielts_speaking: rawData.ielts_speaking?.toString() || "",
          ielts_overall: rawData.ielts_overall?.toString() || "",

          // TOEFL
          toefl_required: Boolean(rawData.toefl_required),
          toefl_reading: rawData.toefl_reading?.toString() || "",
          toefl_writing: rawData.toefl_writing?.toString() || "",
          toefl_listening: rawData.toefl_listening?.toString() || "",
          toefl_speaking: rawData.toefl_speaking?.toString() || "",
          toefl_overall: rawData.toefl_overall?.toString() || "",

          // Duolingo
          duolingo_required: Boolean(rawData.duolingo_required),
          duolingo_total: rawData.duolingo_total?.toString() || "",

          // PTE
          pte_required: Boolean(rawData.pte_required),
          pte_reading: rawData.pte_reading?.toString() || "",
          pte_writing: rawData.pte_writing?.toString() || "",
          pte_listening: rawData.pte_listening?.toString() || "",
          pte_speaking: rawData.pte_speaking?.toString() || "",
          pte_overall: rawData.pte_overall?.toString() || "",

          // Program Meta
          program_tag_id: rawData.program_tag_id?.toString() || "",
          program_tag_name: rawData.program_tag_name || "",
          no_exam_status: rawData.no_exam_status || "",
          application_fee: rawData.application_fee?.toString() || "",
          application_short_desc: rawData.application_short_desc || "",
          average_graduate_program: rawData.average_graduate_program || "",
          average_graduate_program_short_desc: rawData.average_graduate_program_short_desc || "",
          average_undergraduate_program: rawData.average_undergraduate_program || "",
          average_undergraduate_program_short_desc: rawData.average_undergraduate_program_short_desc || "",
          cost_of_living: rawData.cost_of_living?.toString() || "",
          cost_of_living_short_desc: rawData.cost_of_living_short_desc || "",
          average_gross_tuition: rawData.average_gross_tuition?.toString() || "",
          average_gross_tuition_short_desc: rawData.average_gross_tuition_short_desc || "",
          campus_city: rawData.campus_city || "",
          duration: rawData.duration || "",
          success_chance: rawData.success_chance || "",
          program_summary: rawData.program_summary || "",

          // Student Profile
          company_name: rawData.company_name || "",
          email: rawData.email || "",
          destination: rawData.destination || "",
          study_level: rawData.study_level || "",
          subject: rawData.subject || "",
          student_profile_nationality: rawData.student_profile_nationality || "",
          passport: rawData.passport || "",
          elp: rawData.elp || "",
          dob: formatDateForInput(rawData.dob),
          address: rawData.address || "",
          phone: rawData.phone || "",
          gender: rawData.gender || "",
          passport_expiry: formatDateForInput(rawData.passport_expiry),
          country_of_residence: rawData.country_of_residence || "",
          specialization: rawData.specialization || "",
          
          // Document paths (strings from API)
          resume: rawData.resume || "",
          passport_copy: rawData.passport_copy || "",
          transcripts: rawData.transcripts || "",
          english_test: rawData.english_test || "",
          photo: rawData.photo || "",

          // Boolean/Number fields
          language_test_status: rawData.language_test_status || "",
          open_to_language_course: Boolean(rawData.open_to_language_course),
          has_gre_score: rawData.has_gre_score || 0,
          has_gmat_score: rawData.has_gmat_score || 0,
          has_name_difference: Boolean(rawData.has_name_difference),

          // Arrays (parse JSON strings)
          academic_qualifications: safeParseJSON(rawData.academic_qualifications),
          test_scores: safeParseJSON(rawData.test_scores),
          work_experiences: safeParseJSON(rawData.work_experiences),
          references: safeParseJSON(rawData.references),

          created_at: rawData.created_at || "",
          updated_at: rawData.updated_at || "",
        });

        // Set file previews for images
        const imageFields = ["photo", "passport_copy"];
        imageFields.forEach(field => {
          const filePath = rawData[field];
          if (filePath && typeof filePath === 'string' && filePath.match(/\.(jpg|jpeg|png|gif)$/i)) {
            setFilePreviews(prev => ({
              ...prev,
              [field]: `${BASE_URL}/${filePath}`
            }));
          }
        });

        // Check if already submitted
        if (rawData.status === "Submitted") {
          setAlreadySubmitted(true);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load application data");
    } finally {
      setLoading(false);
    }
  };
  // ==================== END OF CORRECTED FETCH FUNCTION ====================

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

  const handleArrayChange = (
    field: keyof FormData,
    index: number,
    subField: string,
    value: string,
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
      const currentArray = prev[field] as any[];
      const newArray = Array.isArray(currentArray) ? [...currentArray, template] : [template];
      return { ...prev, [field]: newArray };
    });
  };

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
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FileState
  ) => {
    if (alreadySubmitted || submitSuccess) {
      Swal.fire({
        icon: "error",
        title: "Cannot Upload",
        text: "This application has been submitted. Please contact your admin for any changes.",
      });
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const maxSize = 10 * 1024 * 1024;
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: `${file.name} is too large. Max size is 10MB.`,
        });
        return;
      }

      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: `File type for ${file.name} is not supported.`,
        });
        return;
      }
    }

    setFiles((prev) => ({
      ...prev,
      [field]: prev[field] ? [...(prev[field] as any), ...selectedFiles] : selectedFiles,
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
  };

  const handleRemoveIndividualFile = (field: keyof FileState, indexToRemove: number) => {
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
        if (!formData.study_level?.trim())
          errors.push("Study Level is required");
        break;

      case 6:
        const requiredDocs = [
          "resume",
          "passport_copy",
          "transcripts",
        ] as const;
        requiredDocs.forEach((doc) => {
          if (!files[doc] && !formData[doc as keyof FormData]) {
            errors.push(`${doc.replace("_", " ").toUpperCase()} is required`);
          }
        });
        break;

      case 10:
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

  const getStepForField = (fieldName: string): number | null => {
    const stepFields: Record<number, string[]> = {
      1: [
        "student_name",
        "student_id",
        "dob",
        "gender",
        "passport",
        "passport_expiry",
        "has_name_difference",
      ],
      2: [
        "email",
        "phone",
        "address",
        "country_of_residence",
        "student_profile_nationality",
      ],
      3: [
        "study_level",
        "subject",
        "specialization",
        "education_country",
        "field_of_study_name",
        "program_level",
      ],
      4: [
        "program_id",
        "program_name",
        "university_name",
        "intake",
        "intake_name",
        "program_level_id",
        "field_of_study_id",
        "program_description",
        "program_open_date",
        "program_submission_deadline",
      ],
      5: [
        "study_permit_or_visa",
        "program_nationality",
        "program_tag_id",
        "program_tag_name",
        "no_exam_status",
        "application_fee",
        "application_short_desc",
        "average_graduate_program",
        "average_graduate_program_short_desc",
        "average_undergraduate_program",
        "average_undergraduate_program_short_desc",
        "cost_of_living",
        "cost_of_living_short_desc",
        "average_gross_tuition",
        "average_gross_tuition_short_desc",
        "campus_city",
        "duration",
        "success_chance",
        "program_summary",
      ],
      6: [
        "resume",
        "passport_copy",
        "transcripts",
        "english_test",
        "photo",
        "company_name",
        "destination",
        "elp",
      ],
      7: [
        "ielts_required",
        "ielts_reading",
        "ielts_writing",
        "ielts_listening",
        "ielts_speaking",
        "ielts_overall",
        "toefl_required",
        "toefl_reading",
        "toefl_writing",
        "toefl_listening",
        "toefl_speaking",
        "toefl_overall",
        "duolingo_required",
        "duolingo_total",
        "pte_required",
        "pte_reading",
        "pte_writing",
        "pte_listening",
        "pte_speaking",
        "pte_overall",
        "language_test_status",
        "open_to_language_course",
      ],
      8: ["has_gre_score", "has_gmat_score"],
      9: ["company_name", "work_experiences"],
      10: ["academic_qualifications", "references"],
    };

    for (const [step, fields] of Object.entries(stepFields)) {
      if (fields.includes(fieldName)) return parseInt(step);
    }
    return null;
  };

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

  const showErrorAlert = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      showConfirmButton: true,
    });
  };

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

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formDataToSend = new FormData();

      const formFields = [
        "student_name",
        "student_id",
        "agent_name",
        "agent_id",
        "program_id",
        "program_name",
        "university_name",
        "intake",
        "status",
        "visa_rejection_status",
        "visa_rejection_reason",
        "program_level_id",
        "program_description",
        "program_level",
        "program_open_date",
        "program_submission_deadline",
        "intake_name",
        "field_of_study_id",
        "field_of_study_name",
        "study_permit_or_visa",
        "program_nationality",
        "education_country",
        "ielts_required",
        "ielts_reading",
        "ielts_writing",
        "ielts_listening",
        "ielts_speaking",
        "ielts_overall",
        "toefl_required",
        "toefl_reading",
        "toefl_writing",
        "toefl_listening",
        "toefl_speaking",
        "toefl_overall",
        "duolingo_required",
        "duolingo_total",
        "pte_required",
        "pte_reading",
        "pte_writing",
        "pte_listening",
        "pte_speaking",
        "pte_overall",
        "program_tag_id",
        "program_tag_name",
        "no_exam_status",
        "application_fee",
        "application_short_desc",
        "average_graduate_program",
        "average_graduate_program_short_desc",
        "average_undergraduate_program",
        "average_undergraduate_program_short_desc",
        "cost_of_living",
        "cost_of_living_short_desc",
        "average_gross_tuition",
        "average_gross_tuition_short_desc",
        "campus_city",
        "duration",
        "success_chance",
        "program_summary",
        "company_name",
        "email",
        "destination",
        "study_level",
        "subject",
        "student_profile_nationality",
        "passport",
        "elp",
        "dob",
        "address",
        "phone",
        "gender",
        "passport_expiry",
        "country_of_residence",
        "specialization",
        "language_test_status",
        "open_to_language_course",
        "has_gre_score",
        "has_gmat_score",
        "has_name_difference",
      ];

      formFields.forEach((field) => {
        const value = formData[field as keyof FormData];
        if (value !== null && value !== undefined && value !== "") {
          if (typeof value === "boolean") {
            formDataToSend.append(field, value ? "1" : "0");
          } else if (Array.isArray(value)) {
            formDataToSend.append(field, JSON.stringify(value));
          } else {
            formDataToSend.append(field, value.toString());
          }
        }
      });

      formDataToSend.append("status", "Review");

      formDataToSend.append(
        "academic_qualifications",
        JSON.stringify(formData.academic_qualifications || [])
      );
      formDataToSend.append(
        "test_scores",
        JSON.stringify(formData.test_scores || [])
      );
      formDataToSend.append(
        "work_experiences",
        JSON.stringify(formData.work_experiences || [])
      );
      formDataToSend.append("references", JSON.stringify(formData.references || []));

      Object.entries(files).forEach(([field, file]) => {
        if (file) {
          formDataToSend.append(field, file);
        }
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formDataToSend,
      };

      console.log("Saving draft...");

      const response = await fetch(
        `${BASE_URL}/agent/applications/${appId}`,
        requestOptions,
      );

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("text/html")) {
        const text = await response.text();
        console.error("Server returned HTML:", text.substring(0, 500));
        throw new Error("Server error occurred");
      } else {
        try {
          result = await response.json();
        } catch (jsonError) {
          const text = await response.text();
          console.error("Failed to parse response:", text.substring(0, 500));
          throw new Error("Invalid response from server");
        }
      }

      console.log("Save Draft Response:", result);

      if (!response.ok) {
        throw new Error(result.message || result.error || "Save failed");
      }

      if (result.success) {
        setFormData((prev) => ({ ...prev, status: "Review" }));

        Swal.fire({
          icon: "success",
          title: "Saved Successfully!",
          text: "Your application has been saved as draft. You can continue editing later.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } else {
        throw new Error(result.message || "Save failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save. Please try again.";
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

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
      const token = getToken();
      if (!token) throw new Error("Authentication token not found.");

      const formDataToSend = new FormData();
      formDataToSend.append("_method", "POST");

      const formFields = [
        "student_name", "student_id", "agent_name", "agent_id", "program_id",
        "program_name", "university_name", "intake", "status", "visa_rejection_status",
        "visa_rejection_reason", "program_level_id", "program_description", "program_level",
        "program_open_date", "program_submission_deadline", "intake_name", "field_of_study_id",
        "field_of_study_name", "study_permit_or_visa", "program_nationality",
        "education_country", "ielts_required", "ielts_reading", "ielts_writing",
        "ielts_listening", "ielts_speaking", "ielts_overall", "toefl_required",
        "toefl_reading", "toefl_writing", "toefl_listening", "toefl_speaking",
        "toefl_overall", "duolingo_required", "duolingo_total", "pte_required",
        "pte_reading", "pte_writing", "pte_listening", "pte_speaking", "pte_overall",
        "program_tag_id", "program_tag_name", "no_exam_status", "application_fee",
        "application_short_desc", "average_graduate_program", "cost_of_living",
        "average_gross_tuition", "campus_city", "duration", "success_chance",
        "program_summary", "company_name", "email", "destination", "study_level",
        "subject", "student_profile_nationality", "passport", "elp", "dob",
        "address", "phone", "gender", "passport_expiry", "country_of_residence",
        "specialization", "language_test_status", "open_to_language_course",
        "has_gre_score", "has_gmat_score", "has_name_difference",
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

      const arrayFields = ["academic_qualifications", "test_scores", "work_experiences", "references"];
      arrayFields.forEach(field => {
        const value = formData[field as keyof FormData] || [];
        formDataToSend.append(field, JSON.stringify(value));
      });

      formDataToSend.set("status", "Submitted");

      Object.entries(files).forEach(([field, fileValue]) => {
        if (fileValue) {
          if (Array.isArray(fileValue)) {
            fileValue.forEach((file) => {
              formDataToSend.append(`${field}[]`, file);
            });
          } else {
            formDataToSend.append(field, fileValue);
          }
        }
      });

      const response = await fetch(`${BASE_URL}/agent/applications/${appId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");

      if (result.success) {
        setFiles({});
        setFilePreviews({});
        
        setTimeout(async () => {
          await fetchApplicationData();
          setSubmitSuccess(true);
          setAlreadySubmitted(true);
          showSuccessAlert();
        }, 1000);
      }
    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage = err instanceof Error ? err.message : "Submission failed.";
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => {
        console.log("Setting step to:", prevStep + 1);
        return prevStep + 1;
      });

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

  const handleClose = () => {
    document.body.style.overflow = "auto";
    if (onClose) onClose();
  };

  const stepTitles = [
    "Student Personal Information",
    "Contact Details",
    "Academic Information",
    "Program Details",
    "Program Meta Information",
    "Document Information",
    "Language Requirements",
    "Test Scores",
    "Work Experience",
    "References",
    "Review & Submit",
  ];

  const isFormDisabled =
    submitSuccess || alreadySubmitted || formData.status === "Submitted";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Application Details
            </h2>
            <p className="text-secondary text-sm mt-1">
              Application ID: <span className="font-semibold">{appId}</span> |
              Status:{" "}
              <span
                className={`font-semibold ${formData.status === "Submitted" ? "text-green-600" : formData.status === "Review" ? "text-yellow-600" : "text-blue-600"}`}
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
                  {step.split(" ")[0]}
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

        {/* Scrollable Form Content - Your existing step components remain the same */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full">
            <div
              ref={stepContainerRef}
              className="p-6 overflow-y-auto pb-24"
              style={{ height: "calc(95vh - 280px)", maxHeight: "600px" }}
            >
              {/* Step 1: Student Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Student Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Student Name *",
                        name: "student_name",
                        type: "text",
                        value: formData.student_name,
                      },
                      {
                        label: "Student ID *",
                        name: "student_id",
                        type: "text",
                        value: formData.student_id,
                      },
                      {
                        label: "Date of Birth *",
                        name: "dob",
                        type: "date",
                        value: formData.dob,
                      },
                      {
                        label: "Gender *",
                        name: "gender",
                        type: "select",
                        value: formData.gender,
                        options: ["Male", "Female", "Other"],
                      },
                      {
                        label: "Passport Number *",
                        name: "passport",
                        type: "text",
                        value: formData.passport,
                      },
                      {
                        label: "Passport Expiry Date *",
                        name: "passport_expiry",
                        type: "date",
                        value: formData.passport_expiry,
                      },
                      {
                        label: "Nationality *",
                        name: "student_profile_nationality",
                        type: "text",
                        value: formData.student_profile_nationality,
                      },
                      {
                        label: "Visa Status",
                        name: "visa_rejection_status",
                        type: "text",
                        value: formData.visa_rejection_status,
                      },
                      {
                        label: "Visa Rejection Reason",
                        name: "visa_rejection_reason",
                        type: "text",
                        value: formData.visa_rejection_reason,
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.type === "checkbox" ? "md:col-span-2" : ""
                        }
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          <div
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 ${
                              field.type === "checkbox" ? "h-10 flex items-center" : ""
                            }`}
                          >
                            {field.type === "checkbox"
                              ? field.value
                                ? "Yes"
                                : "No"
                              : field.value || "Not provided"}
                          </div>
                        ) : field.type === "select" ? (
                          <select
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.label.includes("*")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          >
                            <option value="">
                              Select {field.label.replace(" *", "")}
                            </option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.label.includes("*")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
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
                    {[
                      {
                        label: "Email *",
                        name: "email",
                        type: "email",
                        value: formData.email,
                      },
                      {
                        label: "Phone *",
                        name: "phone",
                        type: "tel",
                        value: formData.phone,
                      },
                      {
                        label: "Country of Residence",
                        name: "country_of_residence",
                        type: "text",
                        value: formData.country_of_residence,
                      },
                      {
                        label: "Address *",
                        name: "address",
                        type: "textarea",
                        value: formData.address,
                        rows: 3,
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea" ? "md:col-span-2" : ""
                        }
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          field.type === "textarea" ? (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 min-h-[80px]">
                              {field.value || "Not provided"}
                            </div>
                          ) : (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                              {field.value || "Not provided"}
                            </div>
                          )
                        ) : field.type === "textarea" ? (
                          <textarea
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            rows={field.rows || 3}
                            required={field.label.includes("*")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.label.includes("*")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Academic Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Academic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Study Level *",
                        name: "study_level",
                        type: "text",
                        value: formData.study_level,
                      },
                      {
                        label: "Subject",
                        name: "subject",
                        type: "text",
                        value: formData.subject,
                      },
                      {
                        label: "Specialization",
                        name: "specialization",
                        type: "text",
                        value: formData.specialization,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                            {field.value || "Not provided"}
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            required={field.label.includes("*")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Program Details */}
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
                    {[
                      {
                        label: "Program Name",
                        name: "program_name",
                        type: "text",
                        value: formData.program_name,
                      },
                      {
                        label: "University Name",
                        name: "university_name",
                        type: "text",
                        value: formData.university_name,
                      },
                      {
                        label: "Intake",
                        name: "intake",
                        type: "text",
                        value: formData.intake,
                      },
                      {
                        label: "Program Description",
                        name: "program_description",
                        type: "textarea",
                        value: formData.program_description,
                        rows: 2,
                      },
                      {
                        label: "Program Open Date",
                        name: "program_open_date",
                        type: "date",
                        value: formData.program_open_date,
                      },
                      {
                        label: "Program Submission Deadline",
                        name: "program_submission_deadline",
                        type: "datetime-local",
                        value: formData.program_submission_deadline,
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea" ? "md:col-span-2" : ""
                        }
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          field.type === "textarea" ? (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 min-h-[60px]">
                              {field.value || "Not provided"}
                            </div>
                          ) : (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                              {field.value || "Not provided"}
                            </div>
                          )
                        ) : field.type === "textarea" ? (
                          <textarea
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            rows={field.rows || 2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        ) : field.type === "datetime-local" ? (
                          <input
                            type="datetime-local"
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Program Meta Information */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      5
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Program Meta Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Study Permit or Visa",
                        name: "study_permit_or_visa",
                        type: "text",
                        value: formData.study_permit_or_visa,
                      },
                      {
                        label: "Program Nationality",
                        name: "program_nationality",
                        type: "text",
                        value: formData.program_nationality,
                      },
                      {
                        label: "Application Fee",
                        name: "application_fee",
                        type: "text",
                        value: formData.application_fee,
                      },
                      {
                        label: "Application Short Description",
                        name: "application_short_desc",
                        type: "textarea",
                        value: formData.application_short_desc,
                        rows: 2,
                      },
                      {
                        label: "Average Graduate Program",
                        name: "average_graduate_program",
                        type: "text",
                        value: formData.average_graduate_program,
                      },
                      {
                        label: "Average Undergraduate Program",
                        name: "average_undergraduate_program",
                        type: "text",
                        value: formData.average_undergraduate_program,
                      },
                      {
                        label: "Cost of Living",
                        name: "cost_of_living",
                        type: "text",
                        value: formData.cost_of_living,
                      },
                      {
                        label: "Average Gross Tuition",
                        name: "average_gross_tuition",
                        type: "text",
                        value: formData.average_gross_tuition,
                      },
                      {
                        label: "Campus City",
                        name: "campus_city",
                        type: "text",
                        value: formData.campus_city,
                      },
                      {
                        label: "Duration",
                        name: "duration",
                        type: "text",
                        value: formData.duration,
                      },
                      {
                        label: "Success Chance",
                        name: "success_chance",
                        type: "text",
                        value: formData.success_chance,
                      },
                      {
                        label: "Program Summary",
                        name: "program_summary",
                        type: "textarea",
                        value: formData.program_summary,
                        rows: 4,
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea" && field.rows === 4
                            ? "md:col-span-2"
                            : ""
                        }
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          field.type === "textarea" ? (
                            <div
                              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 ${
                                field.rows === 4 ? "min-h-[100px]" : "min-h-[60px]"
                              }`}
                            >
                              {field.value || "Not provided"}
                            </div>
                          ) : (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                              {field.value || "Not provided"}
                            </div>
                          )
                        ) : field.type === "textarea" ? (
                          <textarea
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            rows={field.rows || 2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Document Information */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      6
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Document Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(
                      [
                        "resume",
                        "passport_copy",
                        "transcripts",
                        "english_test",
                        "photo",
                      ] as (keyof FileState)[]
                    ).map((field) => {
                      const labelMapping: Record<string, string> = {
                        resume: "Resume / CV",
                        passport_copy: "Passport Copy",
                        transcripts: "Academic Transcripts",
                        english_test: "English Proficiency Test",
                        photo: "Passport Size Photo",
                      };

                      return (
                        <div key={field} className="border p-4 rounded-lg bg-white shadow-sm">
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            {labelMapping[field] || field.replace("_", " ")}
                          </label>

                          <div className="space-y-3">
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
                                        href={typeof fileUrl === 'string' ? fileUrl : ''}
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
                                          Uploaded: {fileUrl?.toString().split("/").pop()}
                                        </span>
                                      </a>
                                    </div>

                                    {field === "photo" && fileUrl && (
                                      <a
                                        href={typeof fileUrl === 'string' ? fileUrl : ''}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block mt-2"
                                      >
                                        <img
                                          src={typeof fileUrl === 'string' ? fileUrl : ''}
                                          alt={field}
                                          className="max-h-32 rounded-lg border border-gray-300 mx-auto hover:opacity-80 transition"
                                        />
                                      </a>
                                    )}

                                    {fileUrl?.toString().toLowerCase().includes(".pdf") && (
                                      <a
                                        href={typeof fileUrl === 'string' ? fileUrl : ''}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded flex items-center hover:bg-blue-100 transition"
                                      >
                                        <svg
                                          className="w-5 h-5 text-blue-500 mr-2"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                        </svg>
                                        <span className="text-blue-700 text-sm">
                                          View Existing PDF
                                        </span>
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {files[field] && (
                              <div className="space-y-2">
                                {Array.from(files[field] as File[]).map((file, index) => {
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

                            {!isFormDisabled && (
                              <div className="mt-2">
                                <input
                                  type="file"
                                  multiple
                                  onChange={(e) => handleFileChange(e, field)}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                              </div>
                            )}

                            {(!formData[field] ||
                              (Array.isArray(formData[field]) &&
                                formData[field].length === 0)) &&
                              (!files[field] || (files[field] as File[]).length === 0) && (
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[
                      {
                        label: "Company",
                        name: "company_name",
                        type: "text",
                        value: formData.company_name,
                      },
                      {
                        label: "Destination",
                        name: "destination",
                        type: "text",
                        value: formData.destination,
                      },
                      {
                        label: "ELP (English Language Proficiency)",
                        name: "elp",
                        type: "text",
                        value: formData.elp,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                            {field.value || "Not provided"}
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Language Requirements */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      7
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Language Requirements
                    </h3>
                  </div>

                  {/* IELTS */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {!isFormDisabled && (
                          <input
                            type="checkbox"
                            name="ielts_required"
                            checked={formData.ielts_required}
                            onChange={handleChange}
                            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                          />
                        )}
                        <label
                          className={`ml-2 text-sm font-medium ${isFormDisabled ? "text-gray-700" : "text-gray-700"}`}
                        >
                          IELTS Required:{" "}
                          {formData.ielts_required ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>

                    {formData.ielts_required && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                        {[
                          {
                            label: "Reading",
                            name: "ielts_reading",
                            value: formData.ielts_reading,
                          },
                          {
                            label: "Writing",
                            name: "ielts_writing",
                            value: formData.ielts_writing,
                          },
                          {
                            label: "Listening",
                            name: "ielts_listening",
                            value: formData.ielts_listening,
                          },
                          {
                            label: "Speaking",
                            name: "ielts_speaking",
                            value: formData.ielts_speaking,
                          },
                          {
                            label: "Overall",
                            name: "ielts_overall",
                            value: formData.ielts_overall,
                          },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            {isFormDisabled ? (
                              <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                                {field.value || "N/A"}
                              </div>
                            ) : (
                              <input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Score"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* TOEFL */}
                  <div className="border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {!isFormDisabled && (
                          <input
                            type="checkbox"
                            name="toefl_required"
                            checked={formData.toefl_required}
                            onChange={handleChange}
                            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                          />
                        )}
                        <label
                          className={`ml-2 text-sm font-medium ${isFormDisabled ? "text-gray-700" : "text-gray-700"}`}
                        >
                          TOEFL Required:{" "}
                          {formData.toefl_required ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>

                    {formData.toefl_required && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                        {[
                          {
                            label: "Reading",
                            name: "toefl_reading",
                            value: formData.toefl_reading,
                          },
                          {
                            label: "Writing",
                            name: "toefl_writing",
                            value: formData.toefl_writing,
                          },
                          {
                            label: "Listening",
                            name: "toefl_listening",
                            value: formData.toefl_listening,
                          },
                          {
                            label: "Speaking",
                            name: "toefl_speaking",
                            value: formData.toefl_speaking,
                          },
                          {
                            label: "Overall",
                            name: "toefl_overall",
                            value: formData.toefl_overall,
                          },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            {isFormDisabled ? (
                              <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                                {field.value || "N/A"}
                              </div>
                            ) : (
                              <input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Score"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Duolingo */}
                  <div className="border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {!isFormDisabled && (
                          <input
                            type="checkbox"
                            name="duolingo_required"
                            checked={formData.duolingo_required}
                            onChange={handleChange}
                            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                          />
                        )}
                        <label
                          className={`ml-2 text-sm font-medium ${isFormDisabled ? "text-gray-700" : "text-gray-700"}`}
                        >
                          Duolingo Required:{" "}
                          {formData.duolingo_required ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>

                    {formData.duolingo_required && (
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Total Score
                        </label>
                        {isFormDisabled ? (
                          <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                            {formData.duolingo_total || "N/A"}
                          </div>
                        ) : (
                          <input
                            type="text"
                            name="duolingo_total"
                            value={formData.duolingo_total}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="Score"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* PTE */}
                  <div className="border border-gray-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {!isFormDisabled && (
                          <input
                            type="checkbox"
                            name="pte_required"
                            checked={formData.pte_required}
                            onChange={handleChange}
                            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                          />
                        )}
                        <label
                          className={`ml-2 text-sm font-medium ${isFormDisabled ? "text-gray-700" : "text-gray-700"}`}
                        >
                          PTE Required: {formData.pte_required ? "Yes" : "No"}
                        </label>
                      </div>
                    </div>

                    {formData.pte_required && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                        {[
                          {
                            label: "Reading",
                            name: "pte_reading",
                            value: formData.pte_reading,
                          },
                          {
                            label: "Writing",
                            name: "pte_writing",
                            value: formData.pte_writing,
                          },
                          {
                            label: "Listening",
                            name: "pte_listening",
                            value: formData.pte_listening,
                          },
                          {
                            label: "Speaking",
                            name: "pte_speaking",
                            value: formData.pte_speaking,
                          },
                          {
                            label: "Overall",
                            name: "pte_overall",
                            value: formData.pte_overall,
                          },
                        ].map((field) => (
                          <div key={field.name}>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            {isFormDisabled ? (
                              <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                                {field.value || "N/A"}
                              </div>
                            ) : (
                              <input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Score"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 8: Test Scores */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      8
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Test Scores
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("test_scores", {
                              test_name: "",
                              score: "",
                              date: "",
                            })
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Test Score
                        </button>
                      )}
                    </div>

                    {!formData.test_scores || formData.test_scores.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No test scores added
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.test_scores.map((test, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Test Score #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem("test_scores", index)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Test Name
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {test.test_name || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={test.test_name}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "test_scores",
                                        index,
                                        "test_name",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    placeholder="e.g., SAT, ACT"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Score
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {test.score || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={test.score}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "test_scores",
                                        index,
                                        "score",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    placeholder="Score"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Date
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {test.date || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="date"
                                    value={test.date}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "test_scores",
                                        index,
                                        "date",
                                        e.target.value,
                                      )
                                    }
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

              {/* Step 9: Work Experience */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      9
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Work Experience
                    </h3>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    {isFormDisabled ? (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                        {formData.company_name || "Not provided"}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    )}
                  </div>

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
                      <div className="text-center py-4 text-gray-500">
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

              {/* Step 10: References */}
              {currentStep === 10 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      10
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Academic Qualifications & References
                    </h3>
                  </div>

                  {/* Academic Qualifications Array */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        Academic Qualifications *
                      </h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("academic_qualifications", {
                              degree: "",
                              institution: "",
                              year: "",
                              cgpa: "",
                            })
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Qualification
                        </button>
                      )}
                    </div>

                    {!formData.academic_qualifications || formData.academic_qualifications.length === 0 ? (
                      <div className="text-center py-4 text-red-500 border border-red-200 rounded-lg bg-red-50">
                        At least one academic qualification is required
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.academic_qualifications.map((qual, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Qualification #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem(
                                      "academic_qualifications",
                                      index,
                                    )
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
                                  Degree
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {qual.degree || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={qual.degree}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "academic_qualifications",
                                        index,
                                        "degree",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    required
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Institution
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {qual.institution || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={qual.institution}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "academic_qualifications",
                                        index,
                                        "institution",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    required
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Year
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {qual.year || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={qual.year}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "academic_qualifications",
                                        index,
                                        "year",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    required
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  CGPA/Grade
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {qual.cgpa || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={qual.cgpa}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "academic_qualifications",
                                        index,
                                        "cgpa",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    required
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* References Array */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        References
                      </h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("references", {
                              name: "",
                              email: "",
                              relationship: "",
                              phone: "",
                            })
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Reference
                        </button>
                      )}
                    </div>

                    {!formData.references || formData.references.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No references added
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.references.map((ref, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Reference #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem("references", index)
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
                                  Name
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {ref.name || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "references",
                                        index,
                                        "name",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {ref.email || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="email"
                                    value={ref.email}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "references",
                                        index,
                                        "email",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Relationship
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {ref.relationship || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={ref.relationship}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "references",
                                        index,
                                        "relationship",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Phone
                                </label>
                                {isFormDisabled ? (
                                  <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                    {ref.phone || "N/A"}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={ref.phone}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "references",
                                        index,
                                        "phone",
                                        e.target.value,
                                      )
                                    }
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

              {/* Step 11: Review & Submit */}
              {currentStep === 11 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      11
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
                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                          Application Status
                        </p>
                        <p className="text-sm font-bold text-secondary">
                          {formData.status || "Draft"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            {formData.student_profile_nationality && <><p className="text-gray-500">Nationality:</p><p className="font-medium">{formData.student_profile_nationality}</p></>}
                          </div>
                        </div>
                      )}

                      {/* Program Details Section */}
                      {(formData.intake || formData.program_level || formData.application_fee) && (
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                            Program Selection
                          </h5>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            {formData.intake && <><p className="text-gray-500">Intake:</p><p className="font-medium">{formData.intake}</p></>}
                            {formData.program_level && <><p className="text-gray-500">Level:</p><p className="font-medium">{formData.program_level}</p></>}
                            {formData.duration && <><p className="text-gray-500">Duration:</p><p className="font-medium">{formData.duration}</p></>}
                            {formData.campus_city && <><p className="text-gray-500">Campus:</p><p className="font-medium">{formData.campus_city}</p></>}
                            {formData.application_fee && <><p className="text-gray-500">App Fee:</p><p className="font-bold text-green-600">${formData.application_fee}</p></>}
                          </div>
                        </div>
                      )}

                      {/* Language Proficiency */}
                      {(formData.ielts_overall || formData.toefl_overall || formData.pte_overall || formData.duolingo_total) && (
                        <div className="md:col-span-2 bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <div className="flex justify-between items-center mb-3 border-b pb-1">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600">
                              Language Proficiency
                            </h5>
                            {formData.elp && (
                              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">
                                ELP: {formData.elp}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {formData.ielts_overall && (
                              <div className="p-2 rounded-lg border bg-blue-50 border-blue-200">
                                <p className="text-[10px] font-bold text-blue-600">IELTS</p>
                                <p className="text-xl font-black text-secondary">{formData.ielts_overall}</p>
                              </div>
                            )}
                            {formData.toefl_overall && (
                              <div className="p-2 rounded-lg border bg-blue-50 border-blue-200">
                                <p className="text-[10px] font-bold text-blue-600">TOEFL</p>
                                <p className="text-xl font-black text-secondary">{formData.toefl_overall}</p>
                              </div>
                            )}
                            {formData.pte_overall && (
                              <div className="p-2 rounded-lg border bg-blue-50 border-blue-200">
                                <p className="text-[10px] font-bold text-blue-600">PTE</p>
                                <p className="text-xl font-black text-secondary">{formData.pte_overall}</p>
                              </div>
                            )}
                            {formData.duolingo_total && (
                              <div className="p-2 rounded-lg border bg-blue-50 border-blue-200">
                                <p className="text-[10px] font-bold text-blue-600">DUOLINGO</p>
                                <p className="text-xl font-black text-secondary">{formData.duolingo_total}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Academic History */}
                      {Array.isArray(formData.academic_qualifications) &&
                        formData.academic_qualifications.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                              Academic Background
                            </h5>
                            <div className="space-y-3">
                              {formData.academic_qualifications.map((edu, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <p className="font-bold text-secondary text-sm">{edu.degree}</p>
                                  <p className="text-xs text-gray-600">{edu.institution}</p>
                                  <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-blue-500">
                                    <span>Year: {edu.year}</span>
                                    <span>Result: {edu.cgpa}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Work Experience */}
                      {Array.isArray(formData.work_experiences) && formData.work_experiences.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                            Professional Experience
                          </h5>
                          <div className="space-y-3">
                            {formData.work_experiences.map((work, i) => (
                              <div key={i} className="border-l-2 border-blue-200 pl-3 py-1">
                                <p className="font-bold text-sm text-secondary">{work.position}</p>
                                <p className="text-xs text-gray-500">{work.organization}</p>
                                <p className="text-[10px] text-gray-400">
                                  {work.start_date} — {work.end_date}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Documents Checklist */}
                      <div className="md:col-span-2 bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-xs uppercase tracking-wider text-blue-600 mb-3 border-b pb-1">
                          Uploaded Evidence
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { label: "Resume", key: "resume" },
                            { label: "Passport", key: "passport_copy" },
                            { label: "Transcripts", key: "transcripts" },
                            { label: "English Test", key: "english_test" },
                            { label: "Photo", key: "photo" },
                          ].map((doc) => {
                            const hasExistingFile = formData[doc.key as keyof FormData] && 
                              (formData[doc.key as keyof FormData] as string).length > 0;
                            const hasNewFile = files[doc.key as keyof FileState] && 
                              (files[doc.key as keyof FileState] as File[]).length > 0;

                            const hasFile = hasExistingFile || hasNewFile;

                            if (!hasFile) return null;

                            return (
                              <div
                                key={doc.key}
                                className="flex items-center justify-center gap-2 p-2 rounded text-[10px] font-bold uppercase border bg-green-50 border-green-200 text-green-700 animate-fadeIn"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                                {doc.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-blue-200 flex flex-wrap justify-between items-center text-[10px] text-blue-400 font-medium uppercase">
                      <div className="flex gap-4">
                        {formData.agent_name && <span>Agent: {formData.agent_name}</span>}
                        {formData.company_name && <span>Company: {formData.company_name}</span>}
                      </div>
                      {formData.student_id && (
                        <div className="bg-blue-600 text-white px-2 py-0.5 rounded">
                          Student ID: {formData.student_id}
                        </div>
                      )}
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

            {/* Navigation Buttons */}
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