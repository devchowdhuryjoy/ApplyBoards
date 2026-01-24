import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

// Reusable Input/Display Field Component
const RequirementCard = ({ label, value, isDropdown = false, actionLink = null, fullWidth = false }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-md p-3 shadow-sm ${fullWidth ? 'col-span-2' : 'col-span-1'}`}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
          {isDropdown && <ChevronDown className="w-3 h-3 text-gray-400" />}
        </div>
        {actionLink && (
          <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium no-underline hover:underline">
            {actionLink}
          </a>
        )}
      </div>
      <div className="text-xl font-bold text-gray-800">
        {value}
      </div>
    </div>
  );
};

// Reusable Accordion/Info Component
const InfoAccordion = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-gray-200 rounded-md bg-white mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-t-md"
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 text-xs text-gray-500 border-t border-transparent leading-relaxed">
          <div className="mt-2">
           {description}
          </div>
        </div>
      )}
    </div>
  );
};

const Admissions = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-blue-100 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Admission Requirements</h2>
        </div>
        <p className="text-xs text-gray-500 ml-9">
          May vary depending on student nationality and education background.
        </p>
      </div>

      {/* Academic Background Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Academic Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RequirementCard 
            label="Minimum Level of Education Completed" 
            value="Grade 12 / High School" 
          />
          <RequirementCard 
            label="Minimum GPA" 
            value="85.0%" 
            actionLink="Convert grades"
          />
        </div>
      </div>

      {/* Language Test Scores Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Minimum Language Test Scores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IELTS - Full Width Look (using col-span-2) */}
          <RequirementCard 
            label="IELTS" 
            value="5.5" 
            isDropdown={true}
            fullWidth={true}
          />

          {/* TOEFL - Full Width Look */}
          <RequirementCard 
            label="TOEFL" 
            value="69.0" 
            isDropdown={true}
            fullWidth={true}
          />

          {/* PTE & Duolingo - Side by Side */}
          <RequirementCard 
            label="PTE" 
            value="36.0" 
            isDropdown={true}
          />
          <RequirementCard 
            label="DUOLINGO" 
            value="90" 
          />
        </div>
      </div>

      {/* Info / Accordion Section */}
      <div className="mb-8 space-y-2">
        <InfoAccordion 
          title="This program requires valid language test results"
          description="Applicants interested in applying for direct admission, but are yet to complete an acceptable language test, can do so, but must provide valid results before receiving a final offer letter."
        />
        <InfoAccordion 
          title="This program offers conditional admissions"
          description="For conditional admission, instead of submitting language proficiency test scores, applicants may complete English courses prior to the academic program. The length of the English course is determined based on the applicant's level of English proficiency."
        />
      </div>

      {/* Disclaimer & Footer Status */}
      <div className="mt-6">
        <p className="text-[10px] text-gray-400 mb-4 italic">
          The program requirements above should only be used as a guide and do not guarantee admission into the program.
        </p>
        
        <div className="inline-block px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
          Not Eligible
        </div>
      </div>
      
      {/* Bottom Section (Scholarships teaser) */}
       <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2">
          <div className="p-1 bg-gray-100 rounded-full">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Scholarships</h2>
        </div>
    </div>
  );
};

export default Admissions;