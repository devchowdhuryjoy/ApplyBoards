import React, {} from "react";
import StudentApplication from "../../../components/TrustedPartners/CreateApplicationForm/StudentApplication";





const ProgramsPage: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      <div>
        <StudentApplication />
      </div>
    </div>
  );
};

export default ProgramsPage;
