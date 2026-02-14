

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
  last_level_of_study: string;
  grading_scheme: string;

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
  intake_months: string[];
  images: string[];

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
  sop: string;
  achievements: string;
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

const AgentFinalApply = ({
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) => {
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
    last_level_of_study: "",
    grading_scheme: "",

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
    intake_months: [],
    images: [],

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
    sop: "",
    achievements: "",
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
  const totalSteps = 12;
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

  // Parse JSON strings to arrays
  const parseJsonField = (field: any): any[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch (e) {
        console.error("Error parsing JSON field:", e);
        return [];
      }
    }
    return [];
  };

  // Fetch data
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        const token = getToken();

        if (!token) {
          console.warn("No token available, using mock data");
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(
          `${BASE_URL}/agent/applications/${id}/detail`,
          requestOptions,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data?.application) {
          const { application } = result.data;

          // Parse JSON string fields
          const parsedData = {
            ...application,
            academic_qualifications: parseJsonField(
              application.academic_qualifications,
            ),
            test_scores: parseJsonField(application.test_scores),
            work_experiences: parseJsonField(application.work_experiences),
            references: parseJsonField(application.references),
            intake_months: parseJsonField(application.intake_months),
            images: parseJsonField(application.images),
          };

          setFormData((prev) => ({
            ...prev,
            ...parsedData,
          }));

          // Check if already submitted
          if (
            application.status === "Submitted" ||
            application.status === "Approved" ||
            application.status === "Processed" ||
            application.status === "Reviewed"
          ) {
            setAlreadySubmitted(true);
          }
        } else {
          setError("No application data found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          `Error loading data. ${err instanceof Error ? err.message : ""}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [id]);

  // Handle input changes
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
    value: string,
  ) => {
    setFormData((prev) => {
      const arrayField = prev[field] as any[];
      const newArray = [...arrayField];
      newArray[index] = { ...newArray[index], [subField]: value };
      return { ...prev, [field]: newArray };
    });
  };

  // Add new item to array
  const addArrayItem = (field: keyof FormData, template: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), template],
    }));
  };

  // Remove item from array
  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  // Handle file changes
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FileState,
  ) => {
    if (alreadySubmitted || submitSuccess) {
      Swal.fire({
        icon: "error",
        title: "Cannot Upload",
        text: "This application has been submitted. Please contact your admin for any changes.",
      });
      return;
    }

    const file = e.target.files?.[0] || null;

    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "File size should be less than 10MB",
        });
        return;
      }

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please upload PDF, DOC, DOCX, JPG, or PNG files only",
        });
        return;
      }

      setFiles((prev) => ({
        ...prev,
        [field]: file,
      }));

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [field]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Remove file
  const handleRemoveFile = (field: keyof FileState) => {
    if (alreadySubmitted || submitSuccess) {
      Swal.fire({
        icon: "error",
        title: "Cannot Remove",
        text: "This application has been submitted. Please contact your admin for any changes.",
      });
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [field]: null,
    }));

    if (filePreviews[field]) {
      const newPreviews = { ...filePreviews };
      delete newPreviews[field];
      setFilePreviews(newPreviews);
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.student_name.trim())
          errors.push("Student Name is required");
        if (!formData.student_id.toString().trim())
          errors.push("Student ID is required");
        if (!formData.dob) errors.push("Date of Birth is required");
        if (!formData.gender) errors.push("Gender is required");
        if (!formData.passport.trim())
          errors.push("Passport Number is required");
        if (!formData.passport_expiry)
          errors.push("Passport Expiry Date is required");
        break;

      case 2:
        if (!formData.email.trim()) errors.push("Email is required");
        if (!formData.phone.trim()) errors.push("Phone is required");
        if (!formData.address.trim()) errors.push("Address is required");
        break;

      case 3:
        if (!formData.last_level_of_study.trim())
          errors.push("Last Level of Study is required");
        if (!formData.grading_scheme.trim())
          errors.push("Grading Scheme is required");
        if (!formData.study_level.trim())
          errors.push("Study Level is required");
        break;

      case 6:
        // Document validation
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

      case 11:
        if (formData.academic_qualifications.length === 0) {
          errors.push("At least one Academic Qualification is required");
        }
        if (!formData.sop.trim())
          errors.push("Statement of Purpose (SOP) is required");
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
        "last_level_of_study",
        "grading_scheme",
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
      8: [
        "has_gre_score",
        "has_gmat_score",
      ],
      9: [
        "company_name",
        "work_experiences",
      ],
      11: [
        "academic_qualifications",
        "sop",
        "achievements",
        "references",
      ],
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
    // Validate all steps
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

      // Create FormData
      const formDataToSend = new FormData();

      // Add all form fields WITHOUT changing status to Submitted
      const formFields = [
        // Basic Information
        "student_name",
        "student_id",
        "agent_name",
        "agent_id",
        "program_id",
        "program_name",
        "university_name",
        "intake",
        "status",
        
        // Program Details
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
        "last_level_of_study",
        "grading_scheme",

        // English Requirements
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

        // Program Meta
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

        // Student Profile
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
        "sop",
        "achievements",
        "language_test_status",
        "open_to_language_course",
        "has_gre_score",
        "has_gmat_score",
        "has_name_difference",
      ];

      formFields.forEach((field) => {
        const value = formData[field as keyof FormData];
        if (value !== null && value !== undefined && value !== "") {
          // Handle boolean values
          if (typeof value === 'boolean') {
            formDataToSend.append(field, value ? '1' : '0');
          } else if (Array.isArray(value)) {
            formDataToSend.append(field, JSON.stringify(value));
          } else {
            formDataToSend.append(field, value.toString());
          }
        }
      });

      // Keep status as "Review" for draft
      formDataToSend.append("status", "Review");

      // Add array fields as JSON strings
      formDataToSend.append(
        "academic_qualifications",
        JSON.stringify(formData.academic_qualifications),
      );
      formDataToSend.append(
        "test_scores",
        JSON.stringify(formData.test_scores),
      );
      formDataToSend.append(
        "work_experiences",
        JSON.stringify(formData.work_experiences),
      );
      formDataToSend.append("references", JSON.stringify(formData.references));
      formDataToSend.append("intake_months", JSON.stringify(formData.intake_months));
      formDataToSend.append("images", JSON.stringify(formData.images));

      // Add files
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
        `${BASE_URL}/agent/applications/${id}`,
        requestOptions,
      );

      // Check response
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
        // Update local status to Review
        setFormData((prev) => ({ ...prev, status: "Review" }));
        
        Swal.fire({
          icon: "success",
          title: "Saved Successfully!",
          text: "Your application has been saved as draft. You can continue editing later.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then(() => {
          // Optionally close the modal or stay open
          // if (onClose) onClose();
        });
      } else {
        throw new Error(result.message || "Save failed");
      }

    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to save. Please try again.";
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Final Submit (Changes status to Submitted)
  const handleFinalSubmit = async () => {
    // Validate all steps
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        if (stepContainerRef.current) {
          stepContainerRef.current.scrollTop = 0;
        }
        return;
      }
    }

    // Check confirmation checkbox
    const confirmationCheckbox = document.getElementById("confirmation-checkbox") as HTMLInputElement;
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

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      // Create FormData
      const formDataToSend = new FormData();

      // Add all form fields
      const formFields = [
        // Basic Information
        "student_name",
        "student_id",
        "agent_name",
        "agent_id",
        "program_id",
        "program_name",
        "university_name",
        "intake",
        "status",
        
        // Program Details
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
        "last_level_of_study",
        "grading_scheme",

        // English Requirements
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

        // Program Meta
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

        // Student Profile
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
        "sop",
        "achievements",
        "language_test_status",
        "open_to_language_course",
        "has_gre_score",
        "has_gmat_score",
        "has_name_difference",
      ];

      formFields.forEach((field) => {
        const value = formData[field as keyof FormData];
        if (value !== null && value !== undefined && value !== "") {
          // Handle boolean values
          if (typeof value === 'boolean') {
            formDataToSend.append(field, value ? '1' : '0');
          } else if (Array.isArray(value)) {
            formDataToSend.append(field, JSON.stringify(value));
          } else {
            formDataToSend.append(field, value.toString());
          }
        }
      });

      // Change status to "Submitted" for final submission
      formDataToSend.append("status", "Submitted");

      // Add array fields as JSON strings
      formDataToSend.append(
        "academic_qualifications",
        JSON.stringify(formData.academic_qualifications),
      );
      formDataToSend.append(
        "test_scores",
        JSON.stringify(formData.test_scores),
      );
      formDataToSend.append(
        "work_experiences",
        JSON.stringify(formData.work_experiences),
      );
      formDataToSend.append("references", JSON.stringify(formData.references));
      formDataToSend.append("intake_months", JSON.stringify(formData.intake_months));
      formDataToSend.append("images", JSON.stringify(formData.images));

      // Add files
      Object.entries(files).forEach(([field, file]) => {
        if (file) {
          formDataToSend.append(field, file);
        }
      });

      // Debug: দেখুন কি পাঠাচ্ছেন
      console.log("Sending FormData:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formDataToSend,
      };

      console.log("Final submitting...");

      const response = await fetch(
        `${BASE_URL}/agent/applications/${id}`,
        requestOptions,
      );

      // Check response
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

      console.log("Final Submit Response:", result);

      if (!response.ok) {
        throw new Error(result.message || result.error || "Submission failed");
      }

      if (result.success) {
        setSubmitSuccess(true);
        setAlreadySubmitted(true);
        setFormData((prev) => ({ ...prev, status: "Submitted" }));
        showSuccessAlert();
        
        // Close modal after successful submission
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        throw new Error(result.message || "Submission failed");
      }

    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      if (stepContainerRef.current) {
        stepContainerRef.current.scrollTop = 0;
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (stepContainerRef.current) {
        stepContainerRef.current.scrollTop = 0;
      }
    }
  };

  // Handle close
  const handleClose = () => {
    document.body.style.overflow = "auto";
    if (onClose) onClose();
  };

  // Step titles
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
    "Intake & Images",
    "References & SOP",
    "Review & Submit",
  ];

  // Check if form should be disabled
  const isFormDisabled = submitSuccess || alreadySubmitted || formData.status === "Submitted";

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
              Application ID: <span className="font-semibold">{id}</span> |
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
        {(alreadySubmitted || submitSuccess || formData.status === "Submitted") && (
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
                        label: "Name Difference (Passport vs Documents)",
                        name: "has_name_difference",
                        type: "checkbox",
                        value: formData.has_name_difference,
                      },
                    ].map((field) => (
                      <div key={field.name} className={field.type === "checkbox" ? "md:col-span-2" : ""}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          <div className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 ${field.type === "checkbox" ? "h-10 flex items-center" : ""}`}>
                            {field.type === "checkbox" ? (
                              field.value ? "Yes" : "No"
                            ) : (
                              field.value || "Not provided"
                            )}
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
                        ) : field.type === "checkbox" ? (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={field.value}
                              onChange={handleChange}
                              className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {field.value ? "Yes" : "No"}
                            </span>
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
                        label: "Nationality",
                        name: "student_profile_nationality",
                        type: "text",
                        value: formData.student_profile_nationality,
                      },
                      {
                        label: "Address *",
                        name: "address",
                        type: "textarea",
                        value: formData.address,
                        rows: 3,
                      },
                    ].map((field) => (
                      <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
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
                        label: "Last Level of Study *",
                        name: "last_level_of_study",
                        type: "text",
                        value: formData.last_level_of_study,
                      },
                      {
                        label: "Grading Scheme *",
                        name: "grading_scheme",
                        type: "text",
                        value: formData.grading_scheme,
                      },
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
                      {
                        label: "Education Country",
                        name: "education_country",
                        type: "text",
                        value: formData.education_country,
                      },
                      {
                        label: "Field of Study Name",
                        name: "field_of_study_name",
                        type: "text",
                        value: formData.field_of_study_name,
                      },
                      {
                        label: "Program Level",
                        name: "program_level",
                        type: "text",
                        value: formData.program_level,
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
                        label: "Program ID",
                        name: "program_id",
                        type: "text",
                        value: formData.program_id,
                      },
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
                        label: "Intake Name",
                        name: "intake_name",
                        type: "text",
                        value: formData.intake_name,
                      },
                      {
                        label: "Program Level ID",
                        name: "program_level_id",
                        type: "text",
                        value: formData.program_level_id,
                      },
                      {
                        label: "Field of Study ID",
                        name: "field_of_study_id",
                        type: "text",
                        value: formData.field_of_study_id,
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
                      <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
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
                        label: "Program Tag ID",
                        name: "program_tag_id",
                        type: "text",
                        value: formData.program_tag_id,
                      },
                      {
                        label: "Program Tag Name",
                        name: "program_tag_name",
                        type: "text",
                        value: formData.program_tag_name,
                      },
                      {
                        label: "No Exam Status",
                        name: "no_exam_status",
                        type: "text",
                        value: formData.no_exam_status,
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
                        label: "Average Graduate Program Short Description",
                        name: "average_graduate_program_short_desc",
                        type: "textarea",
                        value: formData.average_graduate_program_short_desc,
                        rows: 2,
                      },
                      {
                        label: "Average Undergraduate Program",
                        name: "average_undergraduate_program",
                        type: "text",
                        value: formData.average_undergraduate_program,
                      },
                      {
                        label: "Average Undergraduate Program Short Description",
                        name: "average_undergraduate_program_short_desc",
                        type: "textarea",
                        value: formData.average_undergraduate_program_short_desc,
                        rows: 2,
                      },
                      {
                        label: "Cost of Living",
                        name: "cost_of_living",
                        type: "text",
                        value: formData.cost_of_living,
                      },
                      {
                        label: "Cost of Living Short Description",
                        name: "cost_of_living_short_desc",
                        type: "textarea",
                        value: formData.cost_of_living_short_desc,
                        rows: 2,
                      },
                      {
                        label: "Average Gross Tuition",
                        name: "average_gross_tuition",
                        type: "text",
                        value: formData.average_gross_tuition,
                      },
                      {
                        label: "Average Gross Tuition Short Description",
                        name: "average_gross_tuition_short_desc",
                        type: "textarea",
                        value: formData.average_gross_tuition_short_desc,
                        rows: 2,
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
                      <div key={field.name} className={field.type === "textarea" && field.rows === 4 ? "md:col-span-2" : ""}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {isFormDisabled ? (
                          field.type === "textarea" ? (
                            <div className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 ${field.rows === 4 ? "min-h-[100px]" : "min-h-[60px]"}`}>
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

                  <div className="space-y-4">
                    {(
                      [
                        "resume",
                        "passport_copy",
                        "transcripts",
                        "english_test",
                        "photo",
                      ] as const
                    ).map((field) => (
                      <div
                        key={field}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700 capitalize">
                            {field.replace("_", " ")}{" "}
                            {[
                              "resume",
                              "passport_copy",
                              "transcripts",
                            ].includes(field) && "*"}
                          </label>
                          {!isFormDisabled && files[field] && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(field)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {isFormDisabled ? (
                          <div className="text-sm text-gray-600">
                            {formData[field as keyof FormData] ? (
                              <div>
                                <p>File already uploaded</p>
                                {filePreviews[field] && (
                                  <div className="mt-2">
                                    <img
                                      src={filePreviews[field]}
                                      alt={field}
                                      className="max-h-40 rounded-lg"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : files[field] ? (
                              <div>
                                <p>File: {files[field]?.name}</p>
                                {filePreviews[field] && (
                                  <div className="mt-2">
                                    <img
                                      src={filePreviews[field]}
                                      alt={field}
                                      className="max-h-40 rounded-lg"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p className="text-red-500">No file uploaded</p>
                            )}
                          </div>
                        ) : (
                          <>
                            {filePreviews[field] && (
                              <div className="mb-3">
                                <img
                                  src={filePreviews[field]}
                                  alt={field}
                                  className="max-h-40 rounded-lg"
                                />
                              </div>
                            )}

                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, field)}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-secondary hover:file:bg-blue-100"
                            />

                            {files[field] && (
                              <p className="mt-2 text-sm text-gray-500">
                                Selected: {files[field]?.name}
                              </p>
                            )}

                            {formData[field as keyof FormData] &&
                              !files[field] && (
                                <p className="mt-2 text-sm text-green-600">
                                  Existing file available
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[
                      {
                        label: "Company Name",
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

                  {/* Language Test Status */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language Test Status
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "proof_after_acceptance", label: "Proof After Acceptance" },
                        { value: "exemption_eligible", label: "Exemption Eligible" },
                        { value: "not_taken_not_planning", label: "Not Taken/Not Planning" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center">
                          {isFormDisabled ? (
                            <div className="flex items-center">
                              <div className={`h-4 w-4 rounded-full border flex items-center justify-center mr-2 ${formData.language_test_status === option.value ? "border-secondary bg-secondary" : "border-gray-300"}`}>
                                {formData.language_test_status === option.value && (
                                  <div className="h-2 w-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{option.label}</span>
                            </div>
                          ) : (
                            <>
                              <input
                                type="radio"
                                name="language_test_status"
                                value={option.value}
                                checked={formData.language_test_status === option.value}
                                onChange={handleChange}
                                className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                              />
                              <label className="ml-2 text-sm text-gray-700">
                                {option.label}
                              </label>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open to Language Course */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      {!isFormDisabled && (
                        <input
                          type="checkbox"
                          name="open_to_language_course"
                          checked={formData.open_to_language_course}
                          onChange={handleChange}
                          className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                        />
                      )}
                      <label
                        className={`${isFormDisabled ? "text-gray-700" : "ml-2 text-gray-700"} text-sm font-medium`}
                      >
                        Open to Language Course:{" "}
                        {formData.open_to_language_course ? "Yes" : "No"}
                      </label>
                    </div>
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
                          PTE Required:{" "}
                          {formData.pte_required ? "Yes" : "No"}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GRE Score
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.has_gre_score || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="number"
                          name="has_gre_score"
                          value={formData.has_gre_score}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GMAT Score
                      </label>
                      {isFormDisabled ? (
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700">
                          {formData.has_gmat_score || "Not provided"}
                        </div>
                      ) : (
                        <input
                          type="number"
                          name="has_gmat_score"
                          value={formData.has_gmat_score}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      )}
                    </div>
                  </div>

                  {/* Test Scores Array */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        Additional Test Scores
                      </h4>
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

                    {formData.test_scores.length === 0 ? (
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

                    {formData.work_experiences.length === 0 ? (
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

              {/* Step 10: Intake & Images */}
              {currentStep === 10 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      10
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Intake & Images
                    </h3>
                  </div>

                  {/* Intake Months */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        Intake Months
                      </h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("intake_months", "")
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Month
                        </button>
                      )}
                    </div>

                    {formData.intake_months.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No intake months added
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.intake_months.map((month, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Month #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem("intake_months", index)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Month Name
                              </label>
                              {isFormDisabled ? (
                                <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                  {month || "N/A"}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={month}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "intake_months",
                                      index,
                                      "",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  placeholder="e.g., January, September"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Images */}
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-gray-700">
                        Program Images
                      </h4>
                      {!isFormDisabled && (
                        <button
                          type="button"
                          onClick={() =>
                            addArrayItem("images", "")
                          }
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          + Add Image URL
                        </button>
                      )}
                    </div>

                    {formData.images.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No images added
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-700">
                                Image #{index + 1}
                              </h5>
                              {!isFormDisabled && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeArrayItem("images", index)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Image URL
                              </label>
                              {isFormDisabled ? (
                                <div className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-100">
                                  {image || "N/A"}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={image}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "images",
                                      index,
                                      "",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                  placeholder="https://example.com/image.jpg"
                                />
                              )}
                              {image && (
                                <div className="mt-2">
                                  <img
                                    src={image}
                                    alt={`Program ${index + 1}`}
                                    className="max-h-40 rounded-lg"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 11: References & SOP */}
              {currentStep === 11 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      11
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      References & SOP
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

                    {formData.academic_qualifications.length === 0 ? (
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

                  {/* SOP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statement of Purpose (SOP) *
                    </label>
                    {isFormDisabled ? (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 min-h-[150px]">
                        {formData.sop || "Not provided"}
                      </div>
                    ) : (
                      <textarea
                        name="sop"
                        value={formData.sop}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Write your Statement of Purpose here..."
                      />
                    )}
                  </div>

                  {/* Achievements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Achievements
                    </label>
                    {isFormDisabled ? (
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-700 min-h-[80px]">
                        {formData.achievements || "Not provided"}
                      </div>
                    ) : (
                      <textarea
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
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

                    {formData.references.length === 0 ? (
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

              {/* Step 12: Review & Submit */}
              {currentStep === 12 && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-secondary rounded-full flex items-center justify-center mr-3 text-sm">
                      12
                    </div>
                    <h3 className="text-lg font-semibold text-secondary">
                      Review & Submit
                    </h3>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h4 className="text-base font-medium text-secondary mb-3">
                      Review Your Application
                    </h4>
                    <p className="text-secondary text-sm mb-4">
                      Please review all information before submitting.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Personal Information
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Name:</span>{" "}
                            {formData.student_name || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Student ID:</span>{" "}
                            {formData.student_id || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {formData.email || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>{" "}
                            {formData.phone || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Passport:</span>{" "}
                            {formData.passport || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">DOB:</span>{" "}
                            {formData.dob || "N/A"}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Academic Information
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Study Level:</span>{" "}
                            {formData.study_level || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Last Level:</span>{" "}
                            {formData.last_level_of_study || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Qualifications:</span>{" "}
                            {formData.academic_qualifications.length}
                          </div>
                          <div>
                            <span className="font-medium">Test Scores:</span>{" "}
                            {formData.test_scores.length}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Program Details
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">University:</span>{" "}
                            {formData.university_name || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Program:</span>{" "}
                            {formData.program_name || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Intake:</span>{" "}
                            {formData.intake || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>{" "}
                            {formData.status || "N/A"}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Documents
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Resume:</span>{" "}
                            {files.resume || formData.resume
                              ? "Uploaded"
                              : "Missing"}
                          </div>
                          <div>
                            <span className="font-medium">Passport Copy:</span>{" "}
                            {files.passport_copy || formData.passport_copy
                              ? "Uploaded"
                              : "Missing"}
                          </div>
                          <div>
                            <span className="font-medium">Transcripts:</span>{" "}
                            {files.transcripts || formData.transcripts
                              ? "Uploaded"
                              : "Missing"}
                          </div>
                          <div>
                            <span className="font-medium">
                              Total References:
                            </span>{" "}
                            {formData.references.length}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-700">
                          Application Date:{" "}
                          {formData.created_at
                            ? new Date(formData.created_at).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isFormDisabled ? (
                    <>
                      <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <svg
                          className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm text-yellow-700 font-medium">
                            Important Notice
                          </p>
                          <p className="text-sm text-yellow-600 mt-1">
                            You can save as draft to continue editing later, or submit for final review.
                            Once submitted, you cannot make further changes.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center h-5">
                          <input
                            id="confirmation-checkbox"
                            type="checkbox"
                            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                          />
                        </div>
                        <label
                          htmlFor="confirmation-checkbox"
                          className="ml-3 text-sm text-gray-700"
                        >
                          I confirm that all information provided is accurate
                          and complete to the best of my knowledge.
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
                      <div className="text-center">
                        <svg
                          className="h-12 w-12 text-gray-400 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-600 font-medium">
                          This application has been submitted
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Please contact your admin for any changes
                        </p>
                      </div>
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






