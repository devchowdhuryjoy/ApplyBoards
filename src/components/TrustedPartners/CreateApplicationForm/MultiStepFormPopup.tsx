import React, { useState } from "react";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

const MultiStepFormPopup = ({ open, setOpen, programData }) => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);

  const defaultProgramId = programData?.program_id || programData?.id || "";

  const fetchStudentInfo = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStudentData(null);

      const auth = localStorage.getItem("auth");
      if (!auth) throw new Error("Please login again");

      const authData = JSON.parse(auth);

      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
      const url = `${baseUrl}/agent/student/info/${studentId}/${defaultProgramId}`;

      console.log("Fetching from URL:", url);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authData.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }).catch((err) => {
        clearTimeout(timeoutId);
        throw err;
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const result = await res.json();
      console.log("Complete API Response:", result);

      setStudentData(result);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);

      let userMessage = "Failed to fetch student information.";
      if (err.message.includes("timeout")) {
        userMessage = "Request timeout. Please try again.";
      } else if (err.message.includes("Failed to fetch")) {
        userMessage = "Network error. Please check your connection.";
      }

      setError(userMessage);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: userMessage,
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
    }
  };

  // const applyApplication = async () => {
  //   if (!studentData) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "No Data",
  //       text: "Please fetch student information first",
  //       confirmButtonColor: "#f16f22",
  //     });
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError("");

  //     const auth = localStorage.getItem("auth");
  //     if (!auth) throw new Error("Please login again");

  //     const authData = JSON.parse(auth);

  //     const student = studentData.student || {};
  //     const program = studentData.program || programData || {};

  //     const agentName =
  //       authData.name || authData.user?.name || authData.username || "Agent";

  //     const payload = {
  //       student: student,
  //       program: program,
  //       student_name: student.name || "",
  //       student_id: parseInt(student.id || studentId),
  //       agent_name: agentName,
  //       agent_id: (student.agent_id || "").toString(),
  //       program_id: (program.program_id || program.id || "").toString(),
  //       program_name: program.program_name || "",
  //       university_name: program.university_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       intake: program.intake_name || "",
  //       applied_at: new Date().toISOString(),
  //       application_source: "agent_portal"
  //     };

  //     console.log("Submitting payload:", payload);

  //     const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  //     const submitUrl = `${baseUrl}/agent/my-applications`;

  //     const controller = new AbortController();
  //     const timeoutId = setTimeout(() => controller.abort(), 15000);

  //     const res = await fetch(submitUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authData.token}`,
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //       signal: controller.signal,
  //     }).catch((err) => {
  //       clearTimeout(timeoutId);
  //       throw err;
  //     });

  //     clearTimeout(timeoutId);

  //     const responseText = await res.text();
  //     let result;
  //     try {
  //       result = JSON.parse(responseText);
  //     } catch (e) {
  //       result = { message: responseText };
  //     }

  //     if (!res.ok) {
  //       throw new Error(result.message || `HTTP Error ${res.status}`);
  //     }

  //     await Swal.fire({
  //       icon: "success",
  //       title: "Success!",
  //       text: result.message || "Application submitted successfully",
  //       confirmButtonColor: "#f16f22",
  //       timer: 3000,
  //       timerProgressBar: true,
  //     });

  //     closePopup();
  //   } catch (err) {
  //     console.error("Application Error:", err);

  //     let userMessage = err.message;
  //     if (err.message.includes("timeout")) {
  //       userMessage = "Request timeout. Please try again.";
  //     } else if (err.message.includes("Failed to fetch")) {
  //       userMessage = "Network error. Please check your connection.";
  //     }

  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: userMessage,
  //       confirmButtonColor: "#dc3545",
  //     });

  //     setError(userMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const applyApplication = async () => {
    if (!studentData) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "Please fetch student information first",
        confirmButtonColor: "#f16f22",
      });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const auth = localStorage.getItem("auth");
      if (!auth) throw new Error("Please login again");

      const authData = JSON.parse(auth);

      const student = studentData.student || {};
      const program = studentData.program || programData || {};

      const agentName =
        authData.name || authData.user?.name || authData.username || "Agent";

      // Helper function to format date for MySQL (YYYY-MM-DD)
      const formatDateForMySQL = (dateString) => {
        if (!dateString) return "";
        try {
          // If it's an ISO string, extract just the date part
          if (dateString.includes("T")) {
            return dateString.split("T")[0];
          }
          // If it's already in YYYY-MM-DD format, return as is
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
          }
          // Try to parse and format
          const date = new Date(dateString);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split("T")[0];
          }
          return "";
        } catch (e) {
          console.error("Error formatting date:", e);
          return "";
        }
      };

      // Helper function to parse JSON strings to arrays
      const parseToArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try {
          return typeof data === "string" ? JSON.parse(data) : [];
        } catch {
          return [];
        }
      };

      // Parse JSON strings to actual arrays
      const academicQualifications = parseToArray(
        student.academic_qualifications,
      );
      const testScores = parseToArray(student.test_scores);
      const workExperiences = parseToArray(student.work_experiences);
      const references = parseToArray(student.references);
      const intakeMonths = parseToArray(program.intake_months);
      const images = parseToArray(program.images);

      // Create FormData
      const formData = new FormData();

      // ================= BASIC INFO =================
      formData.append("student_name", student.name || "");
      formData.append("student_id", parseInt(student.id || studentId));
      formData.append("agent_name", agentName);
      formData.append(
        "agent_id",
        (student.agent_id || authData.id || "").toString(),
      );
      formData.append(
        "program_id",
        (program.id || program.program_id || "").toString(),
      );
      formData.append("program_name", program.program_name || "");
      formData.append("university_name", program.university_name || "");
      formData.append("intake", program.intake_name || "");
      formData.append("status", "Pending");

      // ================= PROGRAM INFO =================
      formData.append("program_level_id", program.program_level_id || "");
      formData.append("program_description", program.program_description || "");
      formData.append("program_level", program.program_level || "");
      formData.append(
        "program_open_date",
        formatDateForMySQL(program.open_date),
      );
      formData.append(
        "program_submission_deadline",
        formatDateForMySQL(program.submission_deadline),
      );
      formData.append("intake_name", program.intake_name || "");
      formData.append("field_of_study_id", program.field_of_study_id || "");
      formData.append("field_of_study_name", program.field_of_study_name || "");
      formData.append(
        "study_permit_or_visa",
        program.study_permit_or_visa || "",
      );
      formData.append("program_nationality", program.nationality || "");
      formData.append(
        "education_country",
        student.education_country || program.education_country || "",
      );
      formData.append(
        "last_level_of_study",
        student.last_level_of_study || program.last_level_of_study || "",
      );
      formData.append("grading_scheme", program.grading_scheme || "");

      // ================= IELTS =================
      formData.append("ielts_required", program.ielts_required ? "1" : "0");
      if (program.ielts_reading)
        formData.append("ielts_reading", program.ielts_reading.toString());
      if (program.ielts_writing)
        formData.append("ielts_writing", program.ielts_writing.toString());
      if (program.ielts_listening)
        formData.append("ielts_listening", program.ielts_listening.toString());
      if (program.ielts_speaking)
        formData.append("ielts_speaking", program.ielts_speaking.toString());
      if (program.ielts_overall)
        formData.append("ielts_overall", program.ielts_overall.toString());

      // ================= TOEFL =================
      formData.append("toefl_required", program.toefl_required ? "1" : "0");
      if (program.toefl_reading)
        formData.append("toefl_reading", program.toefl_reading.toString());
      if (program.toefl_writing)
        formData.append("toefl_writing", program.toefl_writing.toString());
      if (program.toefl_listening)
        formData.append("toefl_listening", program.toefl_listening.toString());
      if (program.toefl_speaking)
        formData.append("toefl_speaking", program.toefl_speaking.toString());
      if (program.toefl_overall)
        formData.append("toefl_overall", program.toefl_overall.toString());

      // ================= DUOLINGO =================
      formData.append(
        "duolingo_required",
        program.duolingo_required ? "1" : "0",
      );
      if (program.duolingo_total)
        formData.append("duolingo_total", program.duolingo_total.toString());

      // ================= PTE =================
      formData.append("pte_required", program.pte_required ? "1" : "0");
      if (program.pte_reading)
        formData.append("pte_reading", program.pte_reading.toString());
      if (program.pte_writing)
        formData.append("pte_writing", program.pte_writing.toString());
      if (program.pte_listening)
        formData.append("pte_listening", program.pte_listening.toString());
      if (program.pte_speaking)
        formData.append("pte_speaking", program.pte_speaking.toString());
      if (program.pte_overall)
        formData.append("pte_overall", program.pte_overall.toString());

      // ================= PROGRAM EXTRA =================
      formData.append("program_tag_id", program.program_tag_id || "");
      formData.append("program_tag_name", program.program_tag_name || "");
      formData.append("no_exam_status", program.no_exam_status || "");
      formData.append("application_fee", program.application_fee || "");
      formData.append(
        "application_short_desc",
        program.application_short_desc || "",
      );
      formData.append(
        "average_graduate_program",
        program.average_graduate_program || "",
      );
      formData.append(
        "average_graduate_program_short_desc",
        program.average_graduate_program_short_desc || "",
      );
      formData.append(
        "average_undergraduate_program",
        program.average_undergraduate_program || "",
      );
      formData.append(
        "average_undergraduate_program_short_desc",
        program.average_undergraduate_program_short_desc || "",
      );
      formData.append("cost_of_living", program.cost_of_living || "");
      formData.append(
        "cost_of_living_short_desc",
        program.cost_of_living_short_desc || "",
      );
      formData.append(
        "average_gross_tuition",
        program.average_gross_tuition || "",
      );
      formData.append(
        "average_gross_tuition_short_desc",
        program.average_gross_tuition_short_desc || "",
      );
      formData.append("campus_city", program.campus_city || "");
      formData.append("duration", program.duration || "");
      formData.append("success_chance", program.success_chance || "");
      formData.append("program_summary", program.program_summary || "");

      // ================= ARRAYS AS JSON STRINGS =================
      formData.append("intake_months", JSON.stringify(intakeMonths));
      formData.append("images", JSON.stringify(images));

      // ================= STUDENT EXTRA =================
      formData.append("company_name", student.company_name || "");
      formData.append("email", student.email || "");
      formData.append(
        "destination",
        student.destination || program.university_name || "",
      );
      formData.append(
        "study_level",
        student.study_level || program.program_level || "",
      );
      formData.append(
        "subject",
        student.subject || program.field_of_study_name || "",
      );
      formData.append("student_profile_nationality", student.nationality || "");
      formData.append("passport", student.passport || "");
      formData.append("elp", student.elp || "");
      formData.append("dob", formatDateForMySQL(student.dob));
      formData.append("address", student.address || "");
      formData.append("phone", student.phone || "");
      formData.append("gender", student.gender || "");
      formData.append(
        "passport_expiry",
        formatDateForMySQL(student.passport_expiry),
      );
      formData.append(
        "country_of_residence",
        student.country_of_residence || "",
      );
      formData.append("specialization", student.specialization || "");
      formData.append("sop", student.sop || "");
      formData.append("achievements", student.achievements || "");

      // ================= FILE PATHS =================
      formData.append("resume", student.resume || "");
      formData.append("passport_copy", student.passport_copy || "");
      formData.append("transcripts", student.transcripts || "");
      formData.append("english_test", student.english_test || "");
      formData.append("photo", student.photo || "");

      // ================= ACADEMIC DATA AS JSON STRINGS =================
      formData.append(
        "academic_qualifications",
        JSON.stringify(academicQualifications),
      );
      formData.append("test_scores", JSON.stringify(testScores));
      formData.append("work_experiences", JSON.stringify(workExperiences));
      formData.append("references", JSON.stringify(references));

      // ================= TIMESTAMPS =================
      const now = new Date();
      const mysqlDateTime = now.toISOString().slice(0, 19).replace("T", " ");
      formData.append("created_at", mysqlDateTime);
      formData.append("updated_at", mysqlDateTime);
      formData.append("application_source", "agent_portal");

      console.log("Submitting FormData");

      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
      const submitUrl = `${baseUrl}/agent/my-applications`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authData.token}`,
          Accept: "application/json",
          // Don't set Content-Type header for FormData
        },
        body: formData,
        signal: controller.signal,
      }).catch((err) => {
        clearTimeout(timeoutId);
        throw err;
      });

      clearTimeout(timeoutId);

      const responseText = await res.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        result = { message: responseText };
      }

      if (!res.ok) {
        console.error("Validation errors:", result.errors);

        let errorMessage = result.message;
        if (result.errors) {
          errorMessage = Object.entries(result.errors)
            .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
            .join("\n");
        }

        throw new Error(errorMessage);
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: result.message || "Application submitted successfully",
        confirmButtonColor: "#f16f22",
        timer: 3000,
        timerProgressBar: true,
      });

      closePopup();
    } catch (err) {
      console.error("Application Error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#dc3545",
      });

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setStudentId("");
    setError("");
    setStudentData(null);
    setOpen(false);
  };

  const parseJSONField = (field) => {
    if (!field) return null;
    try {
      return typeof field === "string" ? JSON.parse(field) : field;
    } catch {
      return field;
    }
  };

  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== "";
  };

  // Render all data together in one place
  // const renderAllData = (student, program) => {
  //   const allData = {};

  //   // Add all student data
  //   if (student) {
  //     Object.entries(student).forEach(([key, value]) => {
  //       if (hasValue(value) && typeof value !== 'object') {
  //         allData[`student_${key}`] = value;
  //       }
  //     });
  //   }

  //   // Add all program data
  //   if (program) {
  //     Object.entries(program).forEach(([key, value]) => {
  //       if (hasValue(value) && typeof value !== 'object' && !Array.isArray(value)) {
  //         allData[`program_${key}`] = value;
  //       }
  //     });
  //   }

  //   return (
  //     <div className="border border-gray-200 rounded-lg p-4">
  //       <h3 className="text-lg font-semibold text-gray-800 mb-3">
  //         Complete Application Data
  //       </h3>
  //       <div className="space-y-2 max-h-96 overflow-y-auto">
  //         {Object.entries(allData).map(([key, value]) => (
  //           <div key={key} className="flex justify-between items-center border-b pb-2">
  //             <span className="font-medium text-gray-700 capitalize">
  //               {key.replace(/_/g, ' ')}:
  //             </span>
  //             <span className="text-gray-900">{String(value)}</span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // Render all data together in one place including array data
  const renderAllData = (student, program) => {
    const allData = {};

    // Add all student data (excluding array fields)
    if (student) {
      Object.entries(student).forEach(([key, value]) => {
        // Skip array fields that will be shown separately
        const skipFields = [
          "academic_qualifications",
          "test_scores",
          "work_experiences",
          "references",
        ];
        if (
          !skipFields.includes(key) &&
          hasValue(value) &&
          typeof value !== "object"
        ) {
          allData[`student_${key}`] = value;
        }
      });
    }

    // Add all program data
    if (program) {
      Object.entries(program).forEach(([key, value]) => {
        if (
          hasValue(value) &&
          typeof value !== "object" &&
          !Array.isArray(value)
        ) {
          allData[`program_${key}`] = value;
        }
      });
    }

    // Parse array data
    const academicData = student?.academic_qualifications
      ? parseJSONField(student.academic_qualifications)
      : null;
    const testData = student?.test_scores
      ? parseJSONField(student.test_scores)
      : null;
    const workData = student?.work_experiences
      ? parseJSONField(student.work_experiences)
      : null;
    const referenceData = student?.references
      ? parseJSONField(student.references)
      : null;

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          Complete Application Data
        </h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Regular fields */}
          <div className="space-y-2">
            {Object.entries(allData).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <span className="font-medium text-gray-700 capitalize text-sm">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="text-gray-900 text-sm">{String(value)}</span>
              </div>
            ))}
          </div>

          {/* Academic Qualifications */}
          {academicData &&
            Array.isArray(academicData) &&
            academicData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356.257l-2.5 3.5a1 1 0 01-.794.384.998.998 0 01-.707-.293L.293 9.293a1 1 0 011.414-1.414L3 9.586l2.5-3.5a1 1 0 01.994-.318L10 7.586l3.5-2.5a1 1 0 01.994.318l2.5 3.5 1.293-1.293a1 1 0 011.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5z" />
                  </svg>
                  Academic Qualifications:
                </h4>
                {academicData.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-4 mb-2 p-2 bg-blue-50 rounded text-sm"
                  >
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">
                          {k}:
                        </span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

          {/* Test Scores */}
          {testData && Array.isArray(testData) && testData.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Test Scores:
              </h4>
              {testData.map((item, idx) => (
                <div
                  key={idx}
                  className="ml-4 mb-2 p-2 bg-purple-50 rounded text-sm"
                >
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-1">
                      <span className="font-medium text-gray-600 capitalize">
                        {k}:
                      </span>
                      <span className="text-gray-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Work Experiences */}
          {workData && Array.isArray(workData) && workData.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Work Experiences:
              </h4>
              {workData.map((item, idx) => (
                <div
                  key={idx}
                  className="ml-4 mb-2 p-2 bg-green-50 rounded text-sm"
                >
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-1">
                      <span className="font-medium text-gray-600 capitalize">
                        {k}:
                      </span>
                      <span className="text-gray-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {referenceData &&
            Array.isArray(referenceData) &&
            referenceData.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  References:
                </h4>
                {referenceData.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-4 mb-2 p-2 bg-orange-50 rounded text-sm"
                  >
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 gap-1">
                        <span className="font-medium text-gray-600 capitalize">
                          {k}:
                        </span>
                        <span className="text-gray-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  };

  // Render array data sections
  // const renderArraySections = (student) => {
  //   const sections = [];

  //   if (student?.academic_qualifications) {
  //     const data = parseJSONField(student.academic_qualifications);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="academic" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Academic Qualifications</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.test_scores) {
  //     const data = parseJSONField(student.test_scores);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="test" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Test Scores</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.work_experiences) {
  //     const data = parseJSONField(student.work_experiences);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="work" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">Work Experiences</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   if (student?.references) {
  //     const data = parseJSONField(student.references);
  //     if (data && Array.isArray(data)) {
  //       sections.push(
  //         <div key="ref" className="border border-gray-200 rounded-lg p-4 mt-4">
  //           <h4 className="font-semibold text-gray-800 mb-3">References</h4>
  //           {data.map((item, idx) => (
  //             <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
  //               {Object.entries(item).map(([k, v]) => (
  //                 <div key={k} className="grid grid-cols-2 gap-2 text-sm">
  //                   <span className="font-medium text-gray-600 capitalize">{k}:</span>
  //                   <span className="text-gray-900">{String(v)}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     }
  //   }

  //   return sections;
  // };

  if (!open) return null;

  const student = studentData?.student;
  const program = studentData?.program || programData;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl relative flex flex-col max-h-[90vh]">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 z-10"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center py-6 text-primary">
          {program?.program_name
            ? `Apply for ${program.program_name}`
            : "Student & Program Info"}
        </h2>

        {/* Program Summary - Small at top */}
        {program && (
          <div className="mx-6 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
            <span className="font-semibold">Program:</span>{" "}
            {program.program_name} |
            <span className="font-semibold ml-2">University:</span>{" "}
            {program.university_name} |
            <span className="font-semibold ml-2">Intake:</span>{" "}
            {program.intake_name || "N/A"}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-32">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID *
              </label>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID (e.g., 1000)"
                type="number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchStudentInfo();
                  }
                }}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}

            <button
              onClick={fetchStudentInfo}
              disabled={loading || !studentId.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch Student Info →"}
            </button>
          </div>

          {/* All Data Displayed Together */}
          {student && (
            <div className="mt-6 space-y-4">
              {/* Complete combined data */}
              {renderAllData(student, program)}

              {/* Array sections */}
              {/* {renderArraySections(student)} */}
            </div>
          )}
        </div>

        {/* Submit Button */}
        {student && (
          <div className="sticky bottom-0 bg-white border-t p-4">
            <button
              onClick={applyApplication}
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition duration-300 font-medium disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepFormPopup;
