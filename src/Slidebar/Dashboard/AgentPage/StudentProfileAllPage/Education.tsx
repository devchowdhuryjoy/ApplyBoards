import React, { useState, useEffect } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from "sweetalert2";

const InputField = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = "text",
}) => (
  <div className="w-full">
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
    />
  </div>
);

const Education = ({ goToSection, onSave }) => {
  const [destination, setDestination] = useState("");
  const [englishYes, setEnglishYes] = useState(false);
  const [otherYes, setOtherYes] = useState(false);

  const emptyAcademic = {
    country: "",
    institution: "",
    course: "",
    lavel_of_study: "",
    start_date: "",
    end_date: "",
    grade: "",
    destination: "",
    full_time_part_time: "", // Added this field
    isEditing: true,
    isSaved: false,
  };

  const [academicHistory, setAcademicHistory] = useState([emptyAcademic]);

  // Academic Interests - NEW SECTION
  const emptyAcademicInterest = {
    level_of_study: "",
    discipline: "",
    programme: "",
    start_date: "",
    location: "",
    isEditing: true,
    isSaved: false,
  };

  const [academicInterests, setAcademicInterests] = useState([
    emptyAcademicInterest,
  ]);

  // Language tests
  const [languageTests, setLanguageTests] = useState([
    {
      test_token: "",
      date_of_test: "",
      test_reference: "",
      remarks: "", // Added remarks field
      isEditing: true,
      isSaved: false,
    },
  ]);

  // Other language tests
  const [otherLanguage, setOtherLanguage] = useState([
    {
      test_token: "",
      date_of_test: "",
      test_reference: "",
      remarks: "", // Added remarks field
      isEditing: true,
      isSaved: false,
    },
  ]);

  const [immigrationHistory, setImmigrationHistory] = useState("");

  // Load saved data
  useEffect(() => {
    const savedData = studentAPI.getFromStorage();
    if (savedData.education) {
      const edu = savedData.education;

      if (edu.destination) setDestination(edu.destination);
      if (edu.immigration_history)
        setImmigrationHistory(edu.immigration_history);

      if (edu.academic_histories && edu.academic_histories.length > 0) {
        const loadedAcademics = edu.academic_histories.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setAcademicHistory(loadedAcademics);
      }

      // Load academic interests
      if (edu.academic_interests && edu.academic_interests.length > 0) {
        const loadedInterests = edu.academic_interests.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setAcademicInterests(loadedInterests);
      }

      if (edu.language_tests && edu.language_tests.length > 0) {
        const loadedTests = edu.language_tests.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setLanguageTests(loadedTests);
      }

      if (edu.other_language && edu.other_language.length > 0) {
        const loadedOther = edu.other_language.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setOtherLanguage(loadedOther);
      }
    }
  }, []);

  const handleChange = (index, e, array, setArray) => {
    const updated = [...array];
    updated[index][e.target.name] = e.target.value;
    setArray(updated);
  };

  const handleSave = (index, array, setArray) => {
    const updated = [...array];
    updated[index].isEditing = false;
    updated[index].isSaved = true;
    setArray(updated);
  };

  const handleEdit = (index, array, setArray) => {
    const updated = [...array];
    updated[index].isEditing = true;
    setArray(updated);
  };

  const addAnother = (array, setArray, emptyItem) => {
    setArray([...array, { ...emptyItem, isEditing: true, isSaved: false }]);
  };

  const deleteItem = (index, array, setArray, emptyItem) => {
    const updated = array.filter((_, i) => i !== index);
    setArray(updated.length ? updated : [{ ...emptyItem }]);
  };

  const handleSaveSection = async () => {
    // Filter out editing/saved flags for storage
    const educationData = {
      destination: destination,
      immigration_history: immigrationHistory,
      academic_histories: academicHistory.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
      academic_interests: academicInterests.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
      language_tests: languageTests.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
      other_language: otherLanguage.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
    };

    studentAPI.saveToStorage("education", educationData);

    if (onSave) {
      onSave("education", educationData);
    }

    await Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Education details saved successfully!",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleContinue = async () => {
    await handleSaveSection();

    goToSection("travel");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-10">
        {/* Destination Countries */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg font-semibold">Destination Countries</h2>
           
          </div>

          <div className="max-w-md">
            <InputField
              label="Countries where student desires to study*"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveSection}
              className="bg-blue-900 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        {/* Academic History */}
        <div className="border-t pt-8">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-lg font-semibold">Academic history</h2>
            <button
              onClick={() =>
                addAnother(academicHistory, setAcademicHistory, emptyAcademic)
              }
              className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
            >
              Add another +
            </button>
          </div>

          {academicHistory.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-100 rounded-md p-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="Country"
                  name="country"
                  value={item.country}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Institution"
                  name="institution"
                  value={item.institution}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Course"
                  name="course"
                  value={item.course}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Level of study"
                  name="lavel_of_study"
                  value={item.lavel_of_study}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Full time/Part time"
                  name="full_time_part_time"
                  value={item.full_time_part_time}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Start date"
                  name="start_date"
                  type="date"
                  value={item.start_date}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="End date"
                  name="end_date"
                  type="date"
                  value={item.end_date}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
                <InputField
                  label="Grade"
                  name="grade"
                  value={item.grade}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(index, e, academicHistory, setAcademicHistory)
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                {item.isEditing ? (
                  <>
                    <button
                      onClick={() =>
                        handleSave(index, academicHistory, setAcademicHistory)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() =>
                        deleteItem(
                          index,
                          academicHistory,
                          setAcademicHistory,
                          emptyAcademic,
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    {item.isSaved && (
                      <button
                        onClick={() =>
                          handleEdit(index, academicHistory, setAcademicHistory)
                        }
                        className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteItem(
                          index,
                          academicHistory,
                          setAcademicHistory,
                          emptyAcademic,
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Interests - NEW SECTION */}
        <div className="border-t pt-8">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-lg font-semibold">Academic Interests</h2>
            <button
              onClick={() =>
                addAnother(
                  academicInterests,
                  setAcademicInterests,
                  emptyAcademicInterest,
                )
              }
              className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
            >
              Add another +
            </button>
          </div>

          {academicInterests.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-100 rounded-md p-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Level of study"
                  name="level_of_study"
                  value={item.level_of_study}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e,
                      academicInterests,
                      setAcademicInterests,
                    )
                  }
                />
                <InputField
                  label="Discipline"
                  name="discipline"
                  value={item.discipline}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e,
                      academicInterests,
                      setAcademicInterests,
                    )
                  }
                />
                <InputField
                  label="Programme"
                  name="programme"
                  value={item.programme}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e,
                      academicInterests,
                      setAcademicInterests,
                    )
                  }
                />
                <InputField
                  label="Start date"
                  name="start_date"
                  type="date"
                  value={item.start_date}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e,
                      academicInterests,
                      setAcademicInterests,
                    )
                  }
                />
                <InputField
                  label="Location"
                  name="location"
                  value={item.location}
                  disabled={!item.isEditing}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e,
                      academicInterests,
                      setAcademicInterests,
                    )
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                {item.isEditing ? (
                  <>
                    <button
                      onClick={() =>
                        handleSave(
                          index,
                          academicInterests,
                          setAcademicInterests,
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() =>
                        deleteItem(
                          index,
                          academicInterests,
                          setAcademicInterests,
                          emptyAcademicInterest,
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    {item.isSaved && (
                      <button
                        onClick={() =>
                          handleEdit(
                            index,
                            academicInterests,
                            setAcademicInterests,
                          )
                        }
                        className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteItem(
                          index,
                          academicInterests,
                          setAcademicInterests,
                          emptyAcademicInterest,
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        
        {/* ================= English Language Section ================= */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">
            English Language and Standardised Exam Scores
          </h2>

          {/* Yes / No Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
            <button
              onClick={() => setEnglishYes(true)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${
                englishYes ? "bg-blue-900 text-white" : "border border-gray-300"
              }`}
            >
              Yes
            </button>

            <button
              onClick={() => setEnglishYes(false)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${
                !englishYes
                  ? "bg-blue-900 text-white"
                  : "border border-gray-300"
              }`}
            >
              No
            </button>
          </div>

          {englishYes && (
            <>
              {languageTests.map((test, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Test Taken */}
                    <div className="w-full">
                      <label className="block text-xs text-gray-500 mb-1">
                        Test taken*
                      </label>
                      <select
                        name="test_token"
                        value={test.test_token}
                        disabled={!test.isEditing}
                        onChange={(e) =>
                          handleChange(
                            index,
                            e,
                            languageTests,
                            setLanguageTests,
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
                      >
                        <option value="">Select Test</option>
                        <option value="IELTS">IELTS</option>
                        <option value="IELTS UKVI">IELTS UKVI</option>
                        <option value="PTE">PTE</option>
                        <option value="TOEFL IBT">TOEFL IBT</option>
                        <option value="Cambridge English Test">
                          Cambridge English Test
                        </option>
                        <option value="Duolingo">Duolingo</option>
                        <option value="English Language Cert ESOL">
                          English Language Cert ESOL
                        </option>
                        <option value="SELT">SELT</option>
                      </select>
                    </div>

                    <InputField
                      label="Date of test*"
                      name="date_of_test"
                      type="date"
                      value={test.date_of_test}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, languageTests, setLanguageTests)
                      }
                    />

                    <InputField
                      label="Test reference ID"
                      name="test_reference"
                      value={test.test_reference}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, languageTests, setLanguageTests)
                      }
                    />

                    <InputField
                      label="Remarks"
                      name="remarks"
                      value={test.remarks}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, languageTests, setLanguageTests)
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    {test.isEditing ? (
                      <button
                        onClick={() =>
                          handleSave(index, languageTests, setLanguageTests)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(index, languageTests, setLanguageTests)
                        }
                        className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteItem(index, languageTests, setLanguageTests, {
                          test_token: "",
                          date_of_test: "",
                          test_reference: "",
                          remarks: "",
                          isEditing: true,
                          isSaved: false,
                        })
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveSection}
                  className="bg-blue-900 text-white px-6 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        {/* ================= Other Language Section ================= */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">
            Other Language and Standardised Exam Scores
          </h2>

          {/* Yes / No Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
            <button
              onClick={() => setOtherYes(true)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${
                otherYes ? "bg-blue-900 text-white" : "border border-gray-300"
              }`}
            >
              Yes
            </button>

            <button
              onClick={() => setOtherYes(false)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${
                !otherYes ? "bg-blue-900 text-white" : "border border-gray-300"
              }`}
            >
              No
            </button>
          </div>

          {otherYes && (
            <>
              {otherLanguage.map((test, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="w-full">
                      <label className="block text-xs text-gray-500 mb-1">
                        Test taken*
                      </label>
                      <select
                        name="test_token"
                        value={test.test_token}
                        disabled={!test.isEditing}
                        onChange={(e) =>
                          handleChange(
                            index,
                            e,
                            otherLanguage,
                            setOtherLanguage,
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
                      >
                        <option value="">Select Test</option>
                        <option value="American College Testing (ACT)">
                          American College Testing (ACT)
                        </option>
                        <option value="BioMedical Admissions Test (BMAT Exam)">
                          BioMedical Admissions Test (BMAT Exam)
                        </option>
                        <option value="Central Universities Common Entrance Test (CUCET)">
                          Central Universities Common Entrance Test (CUCET)
                        </option>
                        <option value="Common Admission Test (CAT)">
                          Common Admission Test (CAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Common Law Admission Test (CLAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Common University Entrance Test (CUET)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GAMSAT (Graduate Medical School Admissions Test)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Graduate Aptitude Test in Engineering (GATE)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Graduate Management Aptitude Test (GMAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GRE Chemistry
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GRE General
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GRE Mathematics
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GRE Physics
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          GRE Psychology
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Health Professions Admission Test (HPAT Ulster)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Joint Entrance Examination (JEE)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Law School Admission Test (LSAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          LNAT (National Admissions Test for Law)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Management Aptitude Test (MAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Mathematics Admissions Test (MAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Medical College Admission Test (MCAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          National Aptitude Test (NAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          National Aptitude Test in Architecture (NATA)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          National Eligibility Entrance Test (NEET)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Scholastic Aptitude Test (SAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          Sixth Term Examination Paper (STEP)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          UK Clinical Aptitude Test (UKCAT)
                        </option>
                        <option value="Common Law Admission Test (CLAT)">
                          University Clinical Aptitude Test (UCAT)
                        </option>
                      </select>
                    </div>

                    <InputField
                      label="Date of test*"
                      name="date_of_test"
                      type="date"
                      value={test.date_of_test}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, otherLanguage, setOtherLanguage)
                      }
                    />

                    <InputField
                      label="Test reference ID"
                      name="test_reference"
                      value={test.test_reference}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, otherLanguage, setOtherLanguage)
                      }
                    />

                    <InputField
                      label="Remarks"
                      name="remarks"
                      value={test.remarks}
                      disabled={!test.isEditing}
                      onChange={(e) =>
                        handleChange(index, e, otherLanguage, setOtherLanguage)
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    {test.isEditing ? (
                      <button
                        onClick={() =>
                          handleSave(index, otherLanguage, setOtherLanguage)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(index, otherLanguage, setOtherLanguage)
                        }
                        className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteItem(index, otherLanguage, setOtherLanguage, {
                          test_token: "",
                          date_of_test: "",
                          test_reference: "",
                          remarks: "",
                          isEditing: true,
                          isSaved: false,
                        })
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveSection}
                  className="bg-blue-900 text-white px-6 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        {/* Immigration History */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Immigration History</h2>
          <div className="max-w-md">
            <InputField
              label="Has the student ever been refused a visa or deported?*"
              name="immigration_history"
              value={immigrationHistory}
              onChange={(e) => setImmigrationHistory(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveSection}
              className="bg-blue-900 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={handleContinue}
            className="bg-blue-900 text-white md:px-8 px-4 md:py-3 py-2 rounded-md"
          >
            Continue to next section →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Education;
