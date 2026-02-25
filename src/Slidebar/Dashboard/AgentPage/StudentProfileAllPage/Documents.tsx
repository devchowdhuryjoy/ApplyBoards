
import React, { useState, useEffect } from "react";
import { studentAPI, documentConfig } from "../../AgentPage/services/api";
import Swal from "sweetalert2";

const Documents = ({ goToSection, onSave, onFilesSelected }) => {
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    try {
      const savedData = studentAPI.getFromStorage() || {};
      if (savedData.documents) {
        // We only store filenames in localStorage, not actual File objects
        setDocuments(savedData.documents);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  }, []);

  const handleUpload = (e, key, max) => {
    const files = Array.from(e.target.files);
    console.log(`Uploading ${files.length} files for ${key}:`, files.map(f => f.name));
    
    setDocuments((prev) => {
      const existing = prev[key] || [];
      // Combine existing files with new ones, respecting max limit
      const updated = [...existing, ...files].slice(0, max);
      
      // Immediately notify parent about the files
      if (onFilesSelected) {
        onFilesSelected(key, updated.filter(f => f instanceof File));
      }
      
      return { ...prev, [key]: updated };
    });

    Swal.fire({
      icon: 'success',
      title: 'Uploaded!',
      text: `${files.length} file(s) uploaded successfully`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const removeFile = (key, index) => {
    setDocuments((prev) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      
      // Notify parent about removed files
      if (onFilesSelected) {
        onFilesSelected(key, updated.filter(f => f instanceof File));
      }
      
      return { ...prev, [key]: updated };
    });

    Swal.fire({
      icon: 'info',
      title: 'Removed',
      text: 'File removed successfully',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleSaveSection = () => {
    // Store only file names in localStorage (not the actual File objects)
    const docSummary = {};
    Object.keys(documents).forEach(key => {
      docSummary[key] = documents[key].map(file => {
        if (file instanceof File) {
          return file.name;
        }
        return file;
      });
    });
    
    studentAPI.saveToStorage('documents', docSummary);
    
    if (onSave) {
      onSave('documents', documents);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Documents saved successfully!',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleContinue = () => {
    // Check if mandatory documents are uploaded
    const mandatoryDocs = documentConfig.filter(doc => doc.mandatory);
    const missingMandatory = mandatoryDocs.filter(doc => {
      const files = documents[doc.key] || [];
      // Check if there are actual File objects or just filenames
      const hasFiles = files.length > 0;
      return !hasFiles;
    });

    if (missingMandatory.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Mandatory Documents',
        text: `Please upload: ${missingMandatory.map(d => d.title).join(', ')}`,
      });
      return;
    }

    // Extract only File objects to pass to parent
    const fileObjects = {};
    Object.keys(documents).forEach(key => {
      fileObjects[key] = documents[key].filter(f => f instanceof File);
    });
    
    // Notify parent about all files before continuing
    if (onFilesSelected) {
      Object.keys(fileObjects).forEach(key => {
        if (fileObjects[key].length > 0) {
          onFilesSelected(key, fileObjects[key]);
        }
      });
    }

    handleSaveSection();
    goToSection("submit");
  };

  const renderBox = (item) => (
    <div key={item.key} className="bg-white rounded-lg border mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-2 sm:gap-0">
        <div>
          <h4 className="font-semibold text-[#1a2b4c]">{item.title}</h4>
          <p className="text-xs text-gray-500">
            Maximum number of documents allowed is {item.max}
          </p>
        </div>

        <label className="bg-[#0f1e46] text-white px-4 py-2 rounded-full text-xs cursor-pointer hover:bg-[#0c1738]">
          Upload {documents[item.key]?.length ? "Another File" : "File"}
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e, item.key, item.max)}
          />
        </label>
      </div>

      <div className="bg-[#d9e4f2] p-4 min-h-[60px]">
        {documents[item.key]?.length ? (
          <div className="flex flex-wrap gap-3">
            {documents[item.key].map((file, i) => (
              <div
                key={i}
                className="flex items-center bg-white px-3 py-1 rounded-full text-sm shadow"
              >
                {file instanceof File ? file.name : file}
                <button
                  onClick={() => removeFile(item.key, i)}
                  className="ml-2 text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No document</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f7fb] min-h-screen p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8 space-y-10">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1a2b4c]">Documents</h2>
          <p className="text-sm text-green-600 mt-1">✔ Section is complete</p>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-[#1a2b4c]">Mandatory Documents</h3>
        {documentConfig.filter((doc) => doc.mandatory).map(renderBox)}

        <h3 className="text-lg font-semibold mt-10 mb-4 text-[#1a2b4c]">Non-Mandatory Documents</h3>
        {documentConfig.filter((doc) => !doc.mandatory).map(renderBox)}

        {/* Save Section Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSection}
            className="bg-blue-900 text-white px-6 py-2 rounded-md text-sm"
          >
            Save Section
          </button>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleContinue}
            className="bg-[#0f1e46] text-white px-8 py-3 rounded-md text-sm hover:bg-[#0c1738] w-full sm:w-auto"
          >
            Continue to next section →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;