import BASE_URL from "../../../../ApiBaseUrl/ApiBaseUrl";
import Swal from "sweetalert2";

// Document configuration
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

// Helper function to get auth token
const getAuthToken = () => {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) return null;

    const parsedAuth = JSON.parse(auth);
    return parsedAuth.token || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Helper to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("auth");
      await Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again.",
      });
      window.location.href = "/agent-login";
      throw new Error("Session expired. Please login again.");
    }

    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

// Student API service
export const studentAPI = {
  // Register a new student
  registerStudent: async (formData) => {
    const token = getAuthToken();

    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "No authentication token found. Please login again.",
      });
      throw new Error("No authentication token found. Please login again.");
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    // Don't set Content-Type - let browser set it with boundary

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${BASE_URL}/agent/agent-student/register`,
        requestOptions,
      );
      const data = await handleResponse(response);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Student registered successfully!",
        timer: 2000,
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.error("Registration error:", error);

      if (error.message !== "Session expired. Please login again.") {
        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      }

      throw error;
    }
  },

  // Save form data to localStorage
  saveToStorage: (section, data) => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("studentFormData") || "{}",
      );
      existingData[section] = data;
      localStorage.setItem("studentFormData", JSON.stringify(existingData));
      return true;
    } catch (error) {
      console.error("Error saving to storage:", error);
      return false;
    }
  },

  // Get all saved form data
  getFromStorage: () => {
    try {
      return JSON.parse(localStorage.getItem("studentFormData") || "{}");
    } catch (error) {
      console.error("Error reading from storage:", error);
      return {};
    }
  },

  // Clear storage after successful submission
  clearStorage: () => {
    localStorage.removeItem("studentFormData");
  },

  // Prepare complete form data for final submission
  prepareFinalFormData: (allData) => {
    const formData = new FormData();

    // 1. Personal Details
    if (allData.personal) {
      const personal = allData.personal;

      // Basic Info
      if (personal.first_name)
        formData.append("first_name", personal.first_name);
      if (personal.family_name)
        formData.append("family_name", personal.family_name);
      if (personal.email) formData.append("email", personal.email);
      if (personal.phone) formData.append("phone", personal.phone);
      if (personal.gender) formData.append("gender", personal.gender);
      if (personal.nationality)
        formData.append("nationality", personal.nationality);
      if (personal.date_of_birth)
        formData.append("date_of_birth", personal.date_of_birth);
      if (personal.country_of_birth)
        formData.append("country_of_birth", personal.country_of_birth);
      if (personal.native_language)
        formData.append("native_language", personal.native_language);

      // Passport
      if (personal.appears_passport) {
        formData.append(
          "appears_passport",
          personal.appears_passport.substring(0, 10),
        );
      }
      if (personal.passport_issue_location)
        formData.append(
          "passport_issue_location",
          personal.passport_issue_location,
        );
      if (personal.passport_number)
        formData.append("passport_number", personal.passport_number);
      if (personal.issue_date)
        formData.append("issue_date", personal.issue_date);
      if (personal.expiry_date)
        formData.append("expiry_date", personal.expiry_date);

      // Permanent Address
      if (personal.permanent_country)
        formData.append("permanent_country", personal.permanent_country);
      if (personal.permanent_address1)
        formData.append("permanent_address1", personal.permanent_address1);
      if (personal.permanent_address2)
        formData.append("permanent_address2", personal.permanent_address2);
      if (personal.postal_code)
        formData.append("postal_code", personal.postal_code);
      if (personal.state_territory)
        formData.append("state_territory", personal.state_territory);
      if (personal.city) formData.append("city", personal.city);

      // Current Address
      if (personal.country_of_residence)
        formData.append("country_of_residence", personal.country_of_residence);
      if (personal.current_address_1)
        formData.append("current_address_1", personal.current_address_1);
      if (personal.current_address_2)
        formData.append("current_address_2", personal.current_address_2);
      if (personal.current_postal_code)
        formData.append("current_postal_code", personal.current_postal_code);
      if (personal.current_state_territory)
        formData.append(
          "current_state_territory",
          personal.current_state_territory,
        );
      if (personal.current_city)
        formData.append("current_city", personal.current_city);

      // Emergency Contact
      if (personal.emergency_contact_name)
        formData.append(
          "emergency_contact_name",
          personal.emergency_contact_name,
        );
      if (personal.emergency_contact_relationship)
        formData.append(
          "emergency_contact_relationship",
          personal.emergency_contact_relationship,
        );
      if (personal.emergency_contact_phone)
        formData.append(
          "emergency_contact_phone",
          personal.emergency_contact_phone,
        );
      if (personal.emergency_contact_email)
        formData.append(
          "emergency_contact_email",
          personal.emergency_contact_email,
        );
    }

    // 2. Education Details
    if (allData.education) {
      const education = allData.education;

      if (education.destination) {
        formData.append("destination", education.destination);
      }

      if (education.immigration_history) {
        formData.append("immigration_history", education.immigration_history);
      }

      // Academic histories
      if (
        education.academic_histories &&
        education.academic_histories.length > 0
      ) {
        education.academic_histories.forEach((history, index) => {
          if (history.destination)
            formData.append(
              `academic_histories[${index}][destination]`,
              history.destination,
            );

          if (history.country)
            formData.append(
              `academic_histories[${index}][country]`,
              history.country,
            );
          if (history.institution)
            formData.append(
              `academic_histories[${index}][institution]`,
              history.institution,
            );
          if (history.course)
            formData.append(
              `academic_histories[${index}][course]`,
              history.course,
            );
          if (history.lavel_of_study)
            formData.append(
              `academic_histories[${index}][lavel_of_study]`,
              history.lavel_of_study,
            );
          if (history.start_date)
            formData.append(
              `academic_histories[${index}][start_date]`,
              history.start_date,
            );
          if (history.end_date)
            formData.append(
              `academic_histories[${index}][end_date]`,
              history.end_date,
            );
          if (history.grade)
            formData.append(
              `academic_histories[${index}][grade]`,
              history.grade,
            );
        });
      }

      // Academic interests
      if (
        education.academic_interests &&
        education.academic_interests.length > 0
      ) {
        education.academic_interests.forEach((interest, index) => {
          if (interest.level_of_study)
            formData.append(
              `academic_interests[${index}][level_of_study]`,
              interest.level_of_study,
            );
          if (interest.discipline)
            formData.append(
              `academic_interests[${index}][discipline]`,
              interest.discipline,
            );
          if (interest.programme)
            formData.append(
              `academic_interests[${index}][programme]`,
              interest.programme,
            );
          if (interest.start_date)
            formData.append(
              `academic_interests[${index}][start_date]`,
              interest.start_date,
            );
          if (interest.location)
            formData.append(
              `academic_interests[${index}][location]`,
              interest.location,
            );
        });
      }

      // Language tests
      if (education.language_tests && education.language_tests.length > 0) {
        education.language_tests.forEach((test, index) => {
          if (test.test_token)
            formData.append(
              `language_tests[${index}][test_token]`,
              test.test_token,
            );
          if (test.date_of_test)
            formData.append(
              `language_tests[${index}][date_of_test]`,
              test.date_of_test,
            );
          if (test.test_reference)
            formData.append(
              `language_tests[${index}][test_reference]`,
              test.test_reference,
            );
          if (test.remarks)
            formData.append(`language_tests[${index}][remarks]`, test.remarks);
        });
      }

      // Other language
      if (education.other_language && education.other_language.length > 0) {
        education.other_language.forEach((test, index) => {
          if (test.test_token)
            formData.append(
              `other_language[${index}][test_token]`,
              test.test_token,
            );
          if (test.date_of_test)
            formData.append(
              `other_language[${index}][date_of_test]`,
              test.date_of_test,
            );
          if (test.test_reference)
            formData.append(
              `other_language[${index}][test_reference]`,
              test.test_reference,
            );

          if (test.remarks)
            formData.append(`other_language[${index}][remarks]`, test.remarks);
        });
      }
    }

    // 3. Travel & Immigration Details
    if (allData.travel) {
      const travel = allData.travel;

      // Travel histories
      if (travel.travel_histories && travel.travel_histories.length > 0) {
        travel.travel_histories.forEach((travelItem, index) => {
          if (travelItem.date_of_arrival)
            formData.append(
              `travel_histories[${index}][date_of_arrival]`,
              travelItem.date_of_arrival,
            );
          if (travelItem.date_of_departure)
            formData.append(
              `travel_histories[${index}][date_of_departure]`,
              travelItem.date_of_departure,
            );
          if (travelItem.visa_start_date)
            formData.append(
              `travel_histories[${index}][visa_start_date]`,
              travelItem.visa_start_date,
            );
          if (travelItem.visa_expiry_date)
            formData.append(
              `travel_histories[${index}][visa_expiry_date]`,
              travelItem.visa_expiry_date,
            );
          if (travelItem.purpose_of_visit)
            formData.append(
              `travel_histories[${index}][purpose_of_visit]`,
              travelItem.purpose_of_visit,
            );
          if (travelItem.country)
            formData.append(
              `travel_histories[${index}][country]`,
              travelItem.country,
            );
          if (travelItem.visa_type)
            formData.append(
              `travel_histories[${index}][visa_type]`,
              travelItem.visa_type,
            );
        });
      }

      // Visa rejections
      if (travel.visa_rejections && travel.visa_rejections.length > 0) {
        travel.visa_rejections.forEach((rejection, index) => {
          if (rejection.vis_rejection_type)
            formData.append(
              `visa_rejections[${index}][vis_rejection_type]`,
              rejection.vis_rejection_type,
            );
          if (rejection.date_of_rejection)
            formData.append(
              `visa_rejections[${index}][date_of_rejection]`,
              rejection.date_of_rejection,
            );
          if (rejection.country)
            formData.append(
              `visa_rejections[${index}][country]`,
              rejection.country,
            );
          if (rejection.visa_type)
            formData.append(
              `visa_rejections[${index}][visa_type]`,
              rejection.visa_type,
            );
          if (rejection.detail)
            formData.append(
              `visa_rejections[${index}][detail]`,
              rejection.detail,
            );
        });
      }
    }

    // 4. Referee Details
    if (
      allData.referee &&
      allData.referee.referees &&
      allData.referee.referees.length > 0
    ) {
      allData.referee.referees.forEach((referee, index) => {
        if (referee.name)
          formData.append(`referees[${index}][name]`, referee.name);
        if (referee.possition)
          formData.append(`referees[${index}][possition]`, referee.possition);
        if (referee.tittle)
          formData.append(`referees[${index}][tittle]`, referee.tittle);
        if (referee.work_email)
          formData.append(`referees[${index}][work_email]`, referee.work_email);
        if (referee.how_log_has_the_person)
          formData.append(
            `referees[${index}][how_log_has_the_person]`,
            referee.how_log_has_the_person,
          );
        if (referee.mobile)
          formData.append(`referees[${index}][mobile]`, referee.mobile);
        if (referee.relationship)
          formData.append(
            `referees[${index}][relationship]`,
            referee.relationship,
          );
        if (referee.institution)
          formData.append(
            `referees[${index}][institution]`,
            referee.institution,
          );
        if (referee.address_of_institution)
          formData.append(
            `referees[${index}][address_of_institution]`,
            referee.address_of_institution,
          );
      });
    }

    // 5. Work Details
    if (
      allData.work &&
      allData.work.work_experiences &&
      allData.work.work_experiences.length > 0
    ) {
      allData.work.work_experiences.forEach((work, index) => {
        if (work.job_title)
          formData.append(
            `work_experiences[${index}][job_title]`,
            work.job_title,
          );
        if (work.organization)
          formData.append(
            `work_experiences[${index}][organization]`,
            work.organization,
          );
        if (work.address_of_organization)
          formData.append(
            `work_experiences[${index}][address_of_organization]`,
            work.address_of_organization,
          );
        if (work.phone)
          formData.append(`work_experiences[${index}][phone]`, work.phone);
        if (work.start_date)
          formData.append(
            `work_experiences[${index}][start_date]`,
            work.start_date,
          );
        if (work.end_date)
          formData.append(
            `work_experiences[${index}][end_date]`,
            work.end_date,
          );
      });
    }

    return formData;
  },

  // Submit all data at once
  submitAllData: async (allData, fileInputs = {}) => {
    const formData = studentAPI.prepareFinalFormData(allData);

    // Add documents in the format your backend expects
    // Your backend expects: documents[0][document_type] and documents[0][file][]

    let docIndex = 0;

    // Map of document keys to titles
    const documentTitleMap = {
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

    // Loop through all document keys
    Object.keys(fileInputs).forEach((key) => {
      const files = fileInputs[key];

      if (files && files.length > 0) {
        const documentType = documentTitleMap[key] || key;

        // For each document type, add one document entry with multiple files
        formData.append(`documents[${docIndex}][document_type]`, documentType);

        // Add each file to this document type
        files.forEach((file) => {
          if (file instanceof File) {
            formData.append(`documents[${docIndex}][file][]`, file, file.name);
          }
        });

        docIndex++;
      }
    });

    // Log form data for debugging
    console.log("Submitting with documents:");
    for (let pair of formData.entries()) {
      if (pair[0].includes("documents")) {
        console.log(pair[0], pair[1] instanceof File ? pair[1].name : pair[1]);
      }
    }

    return studentAPI.registerStudent(formData);
  },
};
