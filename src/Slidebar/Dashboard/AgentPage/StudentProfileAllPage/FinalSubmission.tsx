

import React, { useState, useEffect } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from "sweetalert2";


const FinalSubmission = ({ goToSection, onComplete, fileInputs = {} }) => {
  const [allData, setAllData] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState({
    personal: false,
    education: false,
    travel: false,
    referee: false,
    work: false,
    documents: false,
  });

  useEffect(() => {
    // Load all saved data
    const savedData = studentAPI.getFromStorage();
    setAllData(savedData);

    // Check which sections are complete
    const completedSections = {};
    Object.keys(sections).forEach((section) => {
      completedSections[section] = !!savedData[section];
    });
    setSections(completedSections);

    console.log("File inputs in FinalSubmission:", fileInputs);
  }, [fileInputs]);

  const handleSubmit = async () => {
    // Check if all sections are complete
    const allComplete = Object.values(sections).every((v) => v === true);

    if (!allComplete) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please complete all sections before submitting.",
      });
      return;
    }

    // Check if there are any files to upload
    console.log("Checking fileInputs:", fileInputs);

    // Check mandatory documents (cv, passport, transcript)
    const mandatoryDocKeys = ["cv", "passport", "transcript"];
    const missingMandatory = mandatoryDocKeys.filter((key) => {
      const files = fileInputs[key] || [];
      return files.length === 0;
    });

    if (missingMandatory.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Mandatory Documents",
        text: `Please upload: ${missingMandatory.join(", ")}`,
      });
      return;
    }

    // Confirm submission
    const result = await Swal.fire({
      icon: "question",
      title: "Confirm Submission",
      text: "Are you sure you want to submit this application?",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Make sure required array fields have at least empty values
      const enhancedData = { ...allData };

      // Ensure education object exists
      if (!enhancedData.education) {
        enhancedData.education = {};
      }

      // Ensure arrays exist
      if (
        !enhancedData.education.academic_histories ||
        enhancedData.education.academic_histories.length === 0
      ) {
        enhancedData.education.academic_histories = [
          {
            country: "",
            institution: "",
            course: "",
            lavel_of_study: "",
            start_date: "",
            end_date: "",
            grade: "",
          },
        ];
      }

      if (
        !enhancedData.education.academic_interests ||
        enhancedData.education.academic_interests.length === 0
      ) {
        enhancedData.education.academic_interests = [
          {
            level_of_study: "",
            discipline: "",
            programme: "",
            start_date: "",
            location: "",
          },
        ];
      }

      if (
        !enhancedData.education.language_tests ||
        enhancedData.education.language_tests.length === 0
      ) {
        enhancedData.education.language_tests = [
          {
            test_token: "",
            date_of_test: "",
            test_reference: "",
          },
        ];
      }

      if (
        !enhancedData.education.other_language ||
        enhancedData.education.other_language.length === 0
      ) {
        enhancedData.education.other_language = [
          {
            test_token: "",
            date_of_test: "",
            test_reference: "",
          },
        ];
      }

      // Ensure travel object exists
      if (!enhancedData.travel) {
        enhancedData.travel = {};
      }

      if (
        !enhancedData.travel.travel_histories ||
        enhancedData.travel.travel_histories.length === 0
      ) {
        enhancedData.travel.travel_histories = [
          {
            date_of_arrival: "",
            date_of_departure: "",
            visa_start_date: "",
            visa_expiry_date: "",
            purpose_of_visit: "",
            country: "",
            visa_type: "",
          },
        ];
      }

      if (
        !enhancedData.travel.visa_rejections ||
        enhancedData.travel.visa_rejections.length === 0
      ) {
        enhancedData.travel.visa_rejections = [
          {
            vis_rejection_type: "",
            date_of_rejection: "",
            country: "",
            visa_type: "",
            detail: "",
          },
        ];
      }

      // Ensure referee exists
      if (
        !enhancedData.referee ||
        !enhancedData.referee.referees ||
        enhancedData.referee.referees.length === 0
      ) {
        enhancedData.referee = {
          referees: [
            {
              name: "",
              possition: "",
              tittle: "",
              work_email: "",
              how_log_has_the_person: "",
              mobile: "",
              relationship: "",
              institution: "",
              address_of_institution: "",
            },
          ],
        };
      }

      // Ensure work exists
      if (
        !enhancedData.work ||
        !enhancedData.work.work_experiences ||
        enhancedData.work.work_experiences.length === 0
      ) {
        enhancedData.work = {
          work_experiences: [
            {
              job_title: "",
              organization: "",
              address_of_organization: "",
              phone: "",
              start_date: "",
              end_date: "",
            },
          ],
        };
      }

      // Truncate appears_passport to 10 characters if needed
      if (enhancedData.personal && enhancedData.personal.appears_passport) {
        enhancedData.personal.appears_passport =
          enhancedData.personal.appears_passport.substring(0, 10);
      }

      console.log("Submitting with fileInputs:", fileInputs);

      // Submit all data at once with the actual File objects
      const response = await studentAPI.submitAllData(enhancedData, fileInputs);

      if (response) {
        studentAPI.clearStorage();

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Student registered successfully!',
        }).then(() => {
          if (onComplete) {
            onComplete();
          }
        });

       
      }
    } catch (error) {
      console.error("Submission error:", error);

      if (error.message !== "Session expired. Please login again.") {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToSectionHandler = (section) => {
    goToSection(section);
  };

  // Count total files
  const totalFiles = Object.values(fileInputs).reduce(
    (sum, files) => sum + files.length,
    0,
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
        <h2 className="text-2xl font-semibold text-secondary mb-6">
          Review & Submit
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-black">
            Please review all sections before final submission.
          </p>

          {/* Section Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(sections).map((section) => (
              <div
                key={section}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span className="capitalize">{section} Details</span>
                {sections[section] ? (
                  <span className="text-green-600 flex items-center">
                    ✓ Complete
                  </span>
                ) : (
                  <button
                    onClick={() => goToSectionHandler(section)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Go to Section
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Documents Summary */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">
            Documents Uploaded ({totalFiles} files)
          </h3>
          <div className="bg-gray-50 p-4 rounded max-h-60 overflow-y-auto">
            {totalFiles > 0 ? (
              <ul className="space-y-2">
                {Object.keys(fileInputs).map(
                  (key) =>
                    fileInputs[key].length > 0 && (
                      <li key={key} className="text-sm border-b pb-2">
                        <span className="font-medium capitalize">{key}:</span>
                        <ul className="pl-5 mt-1 list-disc">
                          {fileInputs[key].map((file, idx) => (
                            <li key={idx} className="text-xs text-gray-600">
                              {file.name} ({(file.size / 1024).toFixed(2)} KB)
                            </li>
                          ))}
                        </ul>
                      </li>
                    ),
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No documents uploaded</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => goToSection("documents")}
            className="px-6 py-2 bg-secondary text-white rounded hover:bg-primary"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary text-white rounded-md hover:bg-secondary disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalSubmission;
