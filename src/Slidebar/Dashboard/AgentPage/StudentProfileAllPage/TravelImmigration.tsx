import React, { useEffect, useRef, useState } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from "sweetalert2";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
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

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}) => (
  <div className="w-full">
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
    >
      <option value="">Please Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const MultiSelectDropdown = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="w-full relative">
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-900 flex justify-between items-center"
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select countries"}
        <span>▼</span>
      </button>
      {open && (
        <div className="absolute mt-1 w-full border border-gray-300 rounded-md bg-white shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const TravelImmigration = ({ goToSection, onSave }) => {
  const [travelYes, setTravelYes] = useState(true);
  const [rejectionYes, setRejectionYes] = useState(false);

  // Travel histories array
  const [travelHistories, setTravelHistories] = useState([
    {
      date_of_arrival: "",
      date_of_departure: "",
      visa_start_date: "",
      visa_expiry_date: "",
      purpose_of_visit: "",
      country: "",
      visa_type: "",
      isEditing: true,
      isSaved: false,
    },
  ]);

  // Visa rejections array
  const [visaRejections, setVisaRejections] = useState([
    {
      vis_rejection_type: "",
      date_of_rejection: "",
      country: "",
      visa_type: "",
      detail: "",
      isEditing: true,
      isSaved: false,
    },
  ]);

  const [immigrationCountries, setImmigrationCountries] = useState([]);

  // Load saved data
  useEffect(() => {
    const savedData = studentAPI.getFromStorage();
    if (savedData.travel) {
      const travel = savedData.travel;

      if (travel.travel_histories && travel.travel_histories.length > 0) {
        const loadedTravels = travel.travel_histories.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setTravelHistories(loadedTravels);
        setTravelYes(true);
      }

      if (travel.visa_rejections && travel.visa_rejections.length > 0) {
        const loadedRejections = travel.visa_rejections.map((item) => ({
          ...item,
          isEditing: false,
          isSaved: true,
        }));
        setVisaRejections(loadedRejections);
        setRejectionYes(true);
      }
    }
  }, []);

  const handleTravelChange = (index, e) => {
    const updated = [...travelHistories];
    updated[index][e.target.name] = e.target.value;
    setTravelHistories(updated);
  };

  const handleRejectionChange = (index, e) => {
    const updated = [...visaRejections];
    updated[index][e.target.name] = e.target.value;
    setVisaRejections(updated);
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
    const travelData = {
      travel_histories: travelHistories.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
      visa_rejections: visaRejections.map(
        ({ isEditing, isSaved, ...rest }) => rest,
      ),
      immigration_countries: immigrationCountries,
    };

    studentAPI.saveToStorage("travel", travelData);

    if (onSave) {
      onSave("travel", travelData);
    }

    await Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Travel details saved successfully!",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleContinue = async () => {
    await handleSaveSection();
    goToSection("referee");
  };

  const emptyTravel = {
    date_of_arrival: "",
    date_of_departure: "",
    visa_start_date: "",
    visa_expiry_date: "",
    purpose_of_visit: "",
    country: "",
    visa_type: "",
    isEditing: true,
    isSaved: false,
  };

  const emptyRejection = {
    vis_rejection_type: "",
    date_of_rejection: "",
    country: "",
    visa_type: "",
    detail: "",
    isEditing: true,
    isSaved: false,
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-10">
        {/* Travel History */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg font-semibold">Travel history</h2>
          </div>

          <p className="text-sm mb-4">
            Has this student applied for permission to remain in any of the
            following countries in the past ten years?
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
            <button
              onClick={() => setTravelYes(true)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${travelYes ? "bg-blue-900 text-white" : "border border-gray-300"}`}
            >
              Yes
            </button>
            <button
              onClick={() => setTravelYes(false)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${!travelYes ? "bg-blue-900 text-white" : "border border-gray-300"}`}
            >
              No
            </button>
          </div>

          {travelYes && (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() =>
                    addAnother(travelHistories, setTravelHistories, emptyTravel)
                  }
                  className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                >
                  Add Travel History +
                </button>
              </div>

              {travelHistories.map((item, index) => (
                <div key={index} className="mb-6 p-4 border rounded bg-blue-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    <Input
                      label="Date of arrival*"
                      name="date_of_arrival"
                      type="date"
                      value={item.date_of_arrival}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                    />
                    <Input
                      label="Date of departure*"
                      name="date_of_departure"
                      type="date"
                      value={item.date_of_departure}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                    />
                    <Input
                      label="Visa start date*"
                      name="visa_start_date"
                      type="date"
                      value={item.visa_start_date}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                    />
                    <Input
                      label="Visa expiry date*"
                      name="visa_expiry_date"
                      type="date"
                      value={item.visa_expiry_date}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                    />
                    <Input
                      label="Purpose of visit"
                      name="purpose_of_visit"
                      value={item.purpose_of_visit}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                    />
                    <Select
                      label="Country*"
                      name="country"
                      value={item.country}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                      options={[
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "France",
                        "Germany",
                        "Malasia",
                      ]}
                    />
                    <Select
                      label="Visa type*"
                      name="visa_type"
                      value={item.visa_type}
                      disabled={!item.isEditing}
                      onChange={(e) => handleTravelChange(index, e)}
                      options={[
                        "Work Visa",
                        "Business Visa",
                        "Student Visa",
                        "Visitor Visa",
                        "family Visa",
                        "Settlement Visa",
                        "Transit Visa",
                      ]}
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    {item.isEditing ? (
                      <>
                        <button
                          onClick={() =>
                            handleSave(
                              index,
                              travelHistories,
                              setTravelHistories,
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
                              travelHistories,
                              setTravelHistories,
                              emptyTravel,
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleEdit(
                              index,
                              travelHistories,
                              setTravelHistories,
                            )
                          }
                          className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            deleteItem(
                              index,
                              travelHistories,
                              setTravelHistories,
                              emptyTravel,
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
            </>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveSection}
              className="bg-blue-900 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        {/* Visa Rejections */}
        <div className="border-t pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg font-semibold">Visa rejections</h2>
          </div>

          <p className="text-sm mb-4">
            Has this student ever been refused permission to stay or deported?
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
            <button
              onClick={() => setRejectionYes(true)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${rejectionYes ? "bg-blue-900 text-white" : "border border-gray-300"}`}
            >
              Yes
            </button>
            <button
              onClick={() => setRejectionYes(false)}
              className={`px-6 py-2 rounded-md w-full sm:w-auto ${!rejectionYes ? "bg-blue-900 text-white" : "border border-gray-300"}`}
            >
              No
            </button>
          </div>

          {rejectionYes && (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() =>
                    addAnother(
                      visaRejections,
                      setVisaRejections,
                      emptyRejection,
                    )
                  }
                  className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                >
                  Add Rejection +
                </button>
              </div>

              {visaRejections.map((item, index) => (
                <div key={index} className="mb-6 p-4 border rounded bg-blue-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    <Select
                      label="Refusal type*"
                      name="vis_rejection_type"
                      value={item.vis_rejection_type}
                      disabled={!item.isEditing}
                      onChange={(e) => handleRejectionChange(index, e)}
                      options={["Visa Refused", "Deported", "Asylum Refused"]}
                    />
                    <Input
                      label="Date of refusal*"
                      name="date_of_rejection"
                      type="date"
                      value={item.date_of_rejection}
                      disabled={!item.isEditing}
                      onChange={(e) => handleRejectionChange(index, e)}
                    />
                    <Select
                      label="Country*"
                      name="country"
                      value={item.country}
                      disabled={!item.isEditing}
                      onChange={(e) => handleRejectionChange(index, e)}
                      options={[
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "France",
                        "Germany",
                        "Malasia",
                      ]}
                    />
                    <Select
                      label="Visa type*"
                      name="visa_type"
                      value={item.visa_type}
                      disabled={!item.isEditing}
                      onChange={(e) => handleRejectionChange(index, e)}
                      options={[
                        "Work Visa",
                        "Business Visa",
                        "Student Visa",
                        "Visitor Visa",
                        "family Visa",
                        "Settlement Visa",
                        "Transit Visa",
                      ]}
                    />
                    <Input
                      label="Details"
                      name="detail"
                      value={item.detail}
                      disabled={!item.isEditing}
                      onChange={(e) => handleRejectionChange(index, e)}
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    {item.isEditing ? (
                      <>
                        <button
                          onClick={() =>
                            handleSave(index, visaRejections, setVisaRejections)
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            deleteItem(
                              index,
                              visaRejections,
                              setVisaRejections,
                              emptyRejection,
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleEdit(index, visaRejections, setVisaRejections)
                          }
                          className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            deleteItem(
                              index,
                              visaRejections,
                              setVisaRejections,
                              emptyRejection,
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
            </>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveSection}
              className="bg-blue-900 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>

        {/* Continue */}
        <div className="flex justify-end border-t pt-6">
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

export default TravelImmigration;
