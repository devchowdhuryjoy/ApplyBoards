import React, { useState } from "react";
import Universities from "../../../components/TrustedPartners/Universities";

const Universityshow: React.FC = () => {
  

  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
        <div>
        <Universities />
      </div>
    </div>
  );
};

export default Universityshow;