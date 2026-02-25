
import React, { useState, useEffect } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from 'sweetalert2';

const WorkDetails = ({ goToSection, onSave }) => {
  const [workExperiences, setWorkExperiences] = useState([{
    job_title: "",
    organization: "",
    address_of_organization: "",
    phone: "",
    start_date: "",
    end_date: "",
    isEditing: true,
    isSaved: false,
  }]);

  // Load saved data
  useEffect(() => {
    const savedData = studentAPI.getFromStorage();
    if (savedData.work && savedData.work.work_experiences) {
      const loadedWorks = savedData.work.work_experiences.map(item => ({
        ...item,
        isEditing: false,
        isSaved: true
      }));
      setWorkExperiences(loadedWorks);
    }
  }, []);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...workExperiences];
    
    if (name === "currentlyWorking") {
      updated[index].currentlyWorking = checked;
      if (checked) {
        updated[index].end_date = "";
      }
    } else {
      updated[index][name] = value;
    }
    
    setWorkExperiences(updated);
  };

  const handleSave = (index) => {
    const updated = [...workExperiences];
    updated[index].isEditing = false;
    updated[index].isSaved = true;
    setWorkExperiences(updated);
  };

  const handleEdit = (index) => {
    const updated = [...workExperiences];
    updated[index].isEditing = true;
    setWorkExperiences(updated);
  };

  const addAnother = () => {
    setWorkExperiences([...workExperiences, {
      job_title: "",
      organization: "",
      address_of_organization: "",
      phone: "",
      start_date: "",
      end_date: "",
      currentlyWorking: false,
      isEditing: true,
      isSaved: false,
    }]);
  };

  const deleteItem = (index) => {
    const updated = workExperiences.filter((_, i) => i !== index);
    if (updated.length === 0) {
      setWorkExperiences([{
        job_title: "",
        organization: "",
        address_of_organization: "",
        phone: "",
        start_date: "",
        end_date: "",
        currentlyWorking: false,
        isEditing: true,
        isSaved: false,
      }]);
    } else {
      setWorkExperiences(updated);
    }
  };

  // const handleSaveSection = () => {
  //   const workData = {
  //     work_experiences: workExperiences.map(({ isEditing, isSaved, ...rest }) => rest)
  //   };

  //   studentAPI.saveToStorage('work', workData);
    
  //   if (onSave) {
  //     onSave('work', workData);
  //   }
    
  //   alert('Work details saved successfully!');
  // };

  // const handleContinue = () => {
  //   handleSaveSection();
  //   goToSection("documents");
  // };


  const handleSaveSection = async () => {
  const workData = {
    work_experiences: workExperiences.map(({ isEditing, isSaved, ...rest }) => rest)
  };

  studentAPI.saveToStorage('work', workData);

  if (onSave) {
    onSave('work', workData);
  }

  await Swal.fire({
    icon: 'success',
    title: 'Saved!',
    text: 'Work details saved successfully!',
    confirmButtonColor: '#3085d6',
  });
};

const handleContinue = async () => {
  await handleSaveSection();
  goToSection("documents");
};

  return (
    <div className="bg-[#f5f7fb] min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#1a2b4c]">
              Work details
            </h2>
            <p className="text-sm text-green-600 mt-1">
              ✔ Section is complete
            </p>
          </div>

          <button 
            onClick={addAnother}
            className="bg-[#0f1e46] text-white px-5 py-2.5 rounded-md text-sm hover:bg-[#0c1738]"
          >
            Add another +
          </button>
        </div>

        {/* Work Cards */}
        {workExperiences.map((work, index) => (
          <div key={index} className="border-l-4 border-blue-500 bg-[#eef3f9] rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Job Title */}
              <div>
                <label className="text-xs text-gray-500">Job title*</label>
                <input
                  type="text"
                  name="job_title"
                  disabled={!work.isEditing}
                  value={work.job_title || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                />
              </div>

              {/* Organisation */}
              <div>
                <label className="text-xs text-gray-500">
                  Name of organisation*
                </label>
                <input
                  type="text"
                  name="organization"
                  disabled={!work.isEditing}
                  value={work.organization || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-xs text-gray-500">
                  Address of organisation*
                </label>
                <input
                  type="text"
                  name="address_of_organization"
                  disabled={!work.isEditing}
                  value={work.address_of_organization || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs text-gray-500">
                  Organization phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  disabled={!work.isEditing}
                  value={work.phone || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-xs text-gray-500">Start date*</label>
                <input
                  type="date"
                  name="start_date"
                  disabled={!work.isEditing}
                  value={work.start_date || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                />
              </div>

              {/* End Date */}
              {!work.currentlyWorking && (
                <div>
                  <label className="text-xs text-gray-500">End date</label>
                  <input
                    type="date"
                    name="end_date"
                    disabled={!work.isEditing}
                    value={work.end_date || ""}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full mt-1 p-3 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100"
                  />
                </div>
              )}
            </div>

            {/* Currently Working */}
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                name="currentlyWorking"
                disabled={!work.isEditing}
                checked={work.currentlyWorking || false}
                onChange={(e) => handleChange(index, e)}
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">
                Student currently works here
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              {work.isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-600 text-white px-6 py-2 rounded-md text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-[#0f1e46] text-white px-6 py-2 rounded-md text-sm hover:bg-[#0c1738]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm hover:bg-red-700"
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
            className="bg-[#0f1e46] text-white px-8 py-3 rounded-md text-sm hover:bg-[#0c1738]"
          >
            Continue to next section →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;