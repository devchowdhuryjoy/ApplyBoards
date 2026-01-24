import React from 'react';
import { ChevronRight, ChevronLeft, Info, DollarSign } from 'lucide-react';


interface ScholarshipData {
  id: number;
  title: string;
  institution: string;
  amount: string;
  autoApplied: boolean;
  nationalities: string;
  programLevels: string;
}


const scholarships: ScholarshipData[] = [
  {
    id: 1,
    title: "International President's Entrance Scholarships",
    institution: "Western University - All campuses",
    amount: "$100,000 CAD",
    autoApplied: false,
    nationalities: "All nationalities",
    programLevels: "1-Year Post-Secondary Certificate, 2-Year Undergraduate Diploma, 3-Year Bachelor'...",
  },
  {
    id: 2,
    title: "Scholarships for Black and Indigenous Students",
    institution: "Western University - All campuses",
    amount: "$2,500 - $6,000 CAD",
    autoApplied: false,
    nationalities: "All nationalities",
    programLevels: "1-Year Post-Secondary Certificate, 2-Year Undergraduate Diploma, 3-Year Bachelor'...",
  }
];


const ScholarshipCard: React.FC<{ data: ScholarshipData }> = ({ data }) => {
  return (
    <div className="min-w-[340px] max-w-[340px] bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      {/* Header Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 leading-snug mb-1">
          {data.title}
        </h3>
        <p className="text-slate-500 text-sm">{data.institution}</p>
      </div>

      {/* Divider */}
      <hr className="border-slate-100 mb-5" />

      {/* Details Section */}
      <div className="space-y-4 flex-grow">
        
        {/* Amount */}
        <div>
          <p className="text-xs font-bold text-slate-500 mb-1">Amount</p>
          <p className="text-slate-800 font-medium">{data.amount}</p>
        </div>

        {/* Auto Applied */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs font-bold text-slate-500">Auto applied</p>
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
          <p className="text-slate-800">{data.autoApplied ? 'Yes' : 'No'}</p>
        </div>

        {/* Nationalities */}
        <div>
          <p className="text-xs font-bold text-slate-500 mb-1">Eligible nationalities</p>
          <p className="text-slate-800">{data.nationalities}</p>
        </div>

        {/* Program Levels */}
        <div>
          <p className="text-xs font-bold text-slate-500 mb-1">Eligible program levels</p>
          <p className="text-slate-800 text-sm leading-relaxed line-clamp-2">
            {data.programLevels}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 flex justify-end">
        <a 
          href="#" 
          className="text-blue-600 font-medium text-sm flex items-center hover:underline gap-1 transition-colors"
        >
          Learn more
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};


const Scholarships: React.FC = () => {
  return (
    <div className="bg-[#f3f6f9] min-h-screen p-10 flex flex-col justify-center">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2.5 rounded-full text-blue-900">
          <DollarSign className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Scholarships</h2>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center">
        
        {/* Left Navigation Arrow (Visual) */}
        <button className="hidden md:flex absolute -left-5 z-10 items-center justify-center w-10 h-10 bg-white rounded-full shadow border border-slate-100 text-slate-600 hover:bg-slate-50 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards Scroll Area */}
        <div className="flex gap-6 overflow-x-auto pb-4 px-2 w-full scrollbar-hide">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} data={scholarship} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Scholarships;