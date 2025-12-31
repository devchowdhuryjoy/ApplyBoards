import React, { useState } from "react";
import CreateApplicationForm from "../../../components/TrustedPartners/CreateApplicationForm/CreateApplicationForm";



const Universityshow: React.FC = () => {
  

  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      <div>
        <CreateApplicationForm />
      </div>
    </div>
  );
};

export default Universityshow;