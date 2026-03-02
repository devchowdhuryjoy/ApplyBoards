


import React, { useState, useEffect } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from 'sweetalert2';

const InputField = ({ label, name, value, onChange, disabled = false }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full mt-1 p-3 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-gray-100"
    />
  </div>
);

const RefereeDetails = ({ goToSection, onSave }) => {
  const [referees, setReferees] = useState([{
    name: "",
    possition: "",
    tittle: "",
    work_email: "",
    how_log_has_the_person: "",
    mobile: "",
    relationship: "",
    institution: "",
    address_of_institution: "",
    isEditing: true,
    isSaved: false,
  }]);

  // Load saved data
  useEffect(() => {
    const savedData = studentAPI.getFromStorage();
    if (savedData.referee && savedData.referee.referees) {
      const loadedReferees = savedData.referee.referees.map(item => ({
        ...item,
        isEditing: false,
        isSaved: true
      }));
      setReferees(loadedReferees);
    }
  }, []);

  const handleChange = (index, e) => {
    const updated = [...referees];
    updated[index][e.target.name] = e.target.value;
    setReferees(updated);
  };

  const handleSave = (index) => {
    const updated = [...referees];
    updated[index].isEditing = false;
    updated[index].isSaved = true;
    setReferees(updated);
  };

  const handleEdit = (index) => {
    const updated = [...referees];
    updated[index].isEditing = true;
    setReferees(updated);
  };

  const addAnother = () => {
    setReferees([...referees, {
      name: "",
      possition: "",
      tittle: "",
      work_email: "",
      how_log_has_the_person: "",
      mobile: "",
      relationship: "",
      institution: "",
      address_of_institution: "",
      isEditing: true,
      isSaved: false,
    }]);
  };

  const deleteItem = (index) => {
    const updated = referees.filter((_, i) => i !== index);
    if (updated.length === 0) {
      setReferees([{
        name: "",
        possition: "",
        tittle: "",
        work_email: "",
        how_log_has_the_person: "",
        mobile: "",
        relationship: "",
        institution: "",
        address_of_institution: "",
        isEditing: true,
        isSaved: false,
      }]);
    } else {
      setReferees(updated);
    }
  };

  // const handleSaveSection = () => {
  //   const refereeData = {
  //     referees: referees.map(({ isEditing, isSaved, ...rest }) => rest)
  //   };

  //   studentAPI.saveToStorage('referee', refereeData);
    
  //   if (onSave) {
  //     onSave('referee', refereeData);
  //   }
    
  //   alert('Referee details saved successfully!');
  // };

  // const handleContinue = () => {
  //   handleSaveSection();
  //   goToSection("work");
  // };


  const handleSaveSection = async () => {
  const refereeData = {
    referees: referees.map(({ isEditing, isSaved, ...rest }) => rest)
  };

  studentAPI.saveToStorage('referee', refereeData);

  if (onSave) {
    onSave('referee', refereeData);
  }

  await Swal.fire({
    icon: 'success',
    title: 'Saved!',
    text: 'Referee details saved successfully!',
    confirmButtonColor: '#3085d6',
  });
};

const handleContinue = async () => {
  await handleSaveSection();
  goToSection("work");
};

  return (
    <div className="bg-[#f5f7fb] min-h-screen p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8 space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1a2b4c]">
              Referee details
            </h2>
            {/* <p className="text-sm text-green-600 mt-1">
              ✔ Section is complete
            </p> */}
          </div>
          <button
            onClick={addAnother}
            className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm mt-2 sm:mt-0"
          >
            Add Another Referee +
          </button>
        </div>

        {/* Referee Cards */}
        {referees.map((referee, index) => (
          <div key={index} className="border-l-4 border-blue-500 bg-[#eef3f9] rounded-lg p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <InputField 
                label="Name*" 
                name="name" 
                value={referee.name} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Position*" 
                name="possition" 
                value={referee.possition} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Title" 
                name="tittle" 
                value={referee.tittle} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Work email*" 
                name="work_email" 
                value={referee.work_email} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="How long known you?" 
                name="how_log_has_the_person" 
                value={referee.how_log_has_the_person} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Mobile number*" 
                name="mobile" 
                value={referee.mobile} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Relationship*" 
                name="relationship" 
                value={referee.relationship} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Institution*" 
                name="institution" 
                value={referee.institution} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
              <InputField 
                label="Institution address*" 
                name="address_of_institution" 
                value={referee.address_of_institution} 
                disabled={!referee.isEditing}
                onChange={(e) => handleChange(index, e)} 
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              {referee.isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-600 text-white px-6 py-2 rounded-md text-sm w-full sm:w-auto"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-[#0f1e46] text-white px-6 py-2 rounded-md text-sm w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Save Section Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSection}
            className="bg-blue-900 text-white px-6 py-2 rounded-md text-sm"
          >
            Save Section
          </button>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleContinue}
            className="bg-[#0f1e46] text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-[#0c1738] transition w-full sm:w-auto"
          >
            Continue to next section →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefereeDetails;

