// import React, { FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const RegistrationAgent: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Static behavior: after submit → go to login-agent
//     navigate("/login-agent");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4">Agent Registration</h2>

//         <input type="text" placeholder="Full Name" className="border p-2 w-full mb-3 rounded"/>
//         <input type="email" placeholder="Email" className="border p-2 w-full mb-3 rounded"/>
//         <input type="text" placeholder="Agency Name" className="border p-2 w-full mb-3 rounded"/>
//         <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

//         <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
//           Register as Agent
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login-agent" className="text-blue-600 underline">
//             Login
//           </Link>
//         </p>
//       </form>

      
//     </div>
//   );
// };

// export default RegistrationAgent;







import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationAgent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [litigationStatus, setLitigationStatus] = useState("");
  const [australiaRecruitment, setAustraliaRecruitment] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login-agent");
  };

  const handleDestinationChange = (destination: string) => {
    if (selectedDestinations.includes(destination)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== destination));
    } else {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
    
    if (destination === "Other") {
      setShowOtherInput(!selectedDestinations.includes("Other"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="bg-primary text-white py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Become an agent</h1>
        <p className="max-w-3xl mx-auto leading-relaxed text-justify hyphens-auto">
          With our 30-year history, we have built strong relationships with over
          5000 recruitment partners, providing educational opportunities for
          students from over 100 countries. If you would like to partner with
          Oxford International please complete the below form and a
          representative will contact you as soon as possible.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex justify-center mt-8 px-4">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
          onSubmit={handleSubmit}
        >
          {/* ==== Agent Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Agent Details</h2>
          <hr className="mb-4" />

          {/* Name Fields */}
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-4">
            <select className="border p-2 rounded w-1/4">
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          {/* Company Name */}
          <label className="block text-sm font-medium mb-1">
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Company name"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Job Title */}
          <label className="block text-sm font-medium mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Job Title"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Phone Number */}
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Country dialling code"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="border p-2 rounded w-2/3"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>Country dialling code</span>
            <span>Phone Number</span>
          </div>

          {/* Email */}
          <label className="block text-sm font-medium mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            className="border p-2 w-full mb-1 rounded"
          />
          <p className="text-xs text-gray-500 mb-4">example@example.com</p>

          {/* Finance Email */}
          <label className="block text-sm font-medium mb-1">
            Finance Email address (for invoicing){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@example.com"
            className="border p-2 w-full mb-1 rounded"
          />
          <p className="text-xs text-gray-500 mb-4">example@example.com</p>

          {/* Password */}
          <label className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

          {/* ==== Company Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Details</h2>
          <hr className="mb-4" />

          {/* Name of Company */}
          <label className="block text-sm font-medium mb-1">
            Name of Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Trading Name */}
          <label className="block text-sm font-medium mb-1">
            Trading Name (if different)
          </label>
          <input
            type="text"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Website Address */}
          <label className="block text-sm font-medium mb-1">
            Website address (if have)
          </label>
          <input
            type="url"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Head Office Address */}
          <label className="block text-sm font-medium mb-1">
            Head Office Address <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">Please enter full address</p>
          
          <div className="mb-2">
            <input
              type="text"
              placeholder="Street Address"
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Street Address Line 2"
              className="border p-2 w-full mb-2 rounded"
            />
          </div>
          
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="City"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder="State/Province"
              className="border p-2 rounded w-1/2"
            />
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Postal/Zip Code"
              className="border p-2 rounded w-1/2"
            />
            <select className="border p-2 rounded w-1/2">
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          {/* ==== Company Director Details ==== */}
          <h2 className="text-xl font-semibold mb-1">
            Company Director Details
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            (for contact purposes, leave blank if same as above)
          </p>
          <hr className="mb-4" />

          {/* Director Name */}
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="flex gap-2 mb-1">
            <select className="border p-2 rounded w-1/4">
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>Title</span>
            <span>First Name</span>
            <span>Last Name</span>
          </div>

          {/* Director Job Title */}
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            className="border p-2 w-full mb-4 rounded"
          />

          {/* Director Phone */}
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Country dialling code"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="border p-2 rounded w-2/3"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>Country dialling code</span>
            <span>Phone Number</span>
          </div>

          {/* Director Email */}
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            className="border p-2 w-full mb-1 rounded"
          />
          <p className="text-xs text-gray-500 mb-6">example@example.com</p>

          {/* ==== Company Overview ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Overview</h2>
          <hr className="mb-4" />

          {/* Students per year */}
          <label className="block text-sm font-medium mb-1">
            How many students do you currently send abroad per year? <span className="text-red-500">*</span>
          </label>
          <select className="border p-2 w-full mb-4 rounded">
            <option value="">Please select</option>
            <option value="0-10">0-10</option>
            <option value="11-50">11-50</option>
            <option value="51-100">51-100</option>
            <option value="101-200">101-200</option>
            <option value="201+">201+</option>
          </select>

          {/* Destinations */}
          <label className="block text-sm font-medium mb-1">
            Which of the following destinations do you plan to recruit for? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="uk" 
                className="mr-2"
                onChange={() => handleDestinationChange("UK")}
              />
              <label htmlFor="uk">UK</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="usa" 
                className="mr-2"
                onChange={() => handleDestinationChange("USA")}
              />
              <label htmlFor="usa">USA</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="canada" 
                className="mr-2"
                onChange={() => handleDestinationChange("Canada")}
              />
              <label htmlFor="canada">Canada</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="australia1" 
                className="mr-2"
                onChange={() => handleDestinationChange("Australia (University of Notre Dame Australia)")}
              />
              <label htmlFor="australia1">Australia (University of Notre Dame Australia)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="australia2" 
                className="mr-2"
                onChange={() => handleDestinationChange("Australia (Universal Higher Education)")}
              />
              <label htmlFor="australia2">Australia (Universal Higher Education)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="other" 
                className="mr-2"
                onChange={() => handleDestinationChange("Other")}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          {/* Other destination input */}
          {showOtherInput && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                If 'Other' selected please specify:
              </label>
              <input
                type="text"
                className="border p-2 w-full rounded"
              />
            </div>
          )}

          {/* Litigation question */}
          <label className="block text-sm font-medium mb-1">
            Do you have any past, pending or threatened litigation, arbitration, administrative actions or other disputes? <span className="text-red-500">*</span>
          </label>
          <select 
            className="border p-2 w-full mb-2 rounded"
            value={litigationStatus}
            onChange={(e) => setLitigationStatus(e.target.value)}
          >
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          
          {/* Litigation details (if yes) */}
          {litigationStatus === "yes" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                If 'Yes' please specify:
              </label>
              <textarea
                className="border p-2 w-full rounded"
                rows={3}
              />
            </div>
          )}

          {/* Australia recruitment question */}
          <label className="block text-sm font-medium mb-1">
            Have you recruited international students into Australia within the past 12 months? <span className="text-red-500">*</span>
          </label>
          <select 
            className="border p-2 w-full mb-2 rounded"
            value={australiaRecruitment}
            onChange={(e) => setAustraliaRecruitment(e.target.value)}
          >
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          
          {/* Australia recruitment details (if yes) */}
          {australiaRecruitment === "yes" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                If 'Yes' please specify:
              </label>
              <textarea
                className="border p-2 w-full rounded"
                rows={3}
              />
            </div>
          )}

          {/* Other institutions question */}
          <label className="block text-sm font-medium mb-1">
            Which other UK / USA / Canada / Australia schools or institutions do you represent? <span className="text-red-500">*</span>
          </label>
          <textarea
            className="border p-2 w-full mb-6 rounded"
            rows={3}
          />

          {/* ==== How many students ==== */}
          <h2 className="text-xl font-semibold mb-2">How many students do you currently send to the UK/USA/Canada/Australia for the following courses per year?</h2>
          <hr className="mb-4" />

          {/* College / Boarding School Name */}
          <label className="block text-sm font-medium mb-1">
            College / Boarding School <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="College / Boarding School name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Creative Course Name */}
          <label className="block text-sm font-medium mb-1">
            Creative course <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Creative course name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* University Preparation Name */}
          <label className="block text-sm font-medium mb-1">
            University Preparation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="University Preparation name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Adult English Language Name */}
          <label className="block text-sm font-medium mb-1">
            Adult English Language <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Adult English Language name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Junior English Language Name */}
          <label className="block text-sm font-medium mb-1">
            Junior English Language <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Junior English Language name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Direct entry to university */}
          <label className="block text-sm font-medium mb-1">
            Direct entry to university <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Direct entry to university name"
            className="border p-2 w-full mb-4 rounded"
          />


           {/* ==== Company Operations ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Operations</h2>
          <hr className="mb-4" />

          {/* What year was your company established? */}
          <label className="block text-sm font-medium mb-1">
            What year was your company established? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="What year was your company established?"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Do you have any branch offices? If yes, please list locations */}
          <label className="block text-sm font-medium mb-1">
            Do you have any branch offices? If yes, please list locations <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Branch office locations"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* How many counsellors do you employ? */}
          <label className="block text-sm font-medium mb-1">
            How many counsellors do you employ? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Number of counsellors"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Are you ICEF Registered Agency? If Yes, what is IAS ID number? */}
          <label className="block text-sm font-medium mb-1">
            Are you ICEF Registered Agency? If Yes, what is IAS ID number? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="IAS ID number"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* How did you hear about Oxford International? */}
          <label className="block text-sm font-medium mb-1">
            How did you hear about Oxford International? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Source of information"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* Why do you want to work with Oxford International? */}
          <label className="block text-sm font-medium mb-1">
            Why do you want to work with Oxford International? <span className="text-red-500">*</span>
          </label>
          <textarea
            className="border p-2 w-full mb-6 rounded"
            rows={3}
          />


           {/* ==== Business References ==== */}
          <h2 className="text-xl font-semibold mb-2">Business References</h2>
          <p className="text-justify hyphens-auto mb-5">Our reputation is our guarantee and therefore it is a requirement that we obtain some background information about those agencies wishing to represent us. We would appreciate it if you could provide us with the details of two Institutions you have sent students to who we may contact for a reference.</p>
          {/* <hr className="mb-4" /> */}


          <label className="block text-sm font-medium mb-1">
            First Referee Name <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-4">
            <select className="border p-2 rounded w-1/4">
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          {/* First Referee Company Name */}
          <label className="block text-sm font-medium mb-1">
            First Referee Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="First Referee Company Name"
            className="border p-2 w-full mb-4 rounded"
          />
          {/* First Referee Email */}
          <label className="block text-sm font-medium mb-1">
            First Referee Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="First Referee Email"
            className="border p-2 w-full mb-4 rounded"
          />

            {/* First Referee Phone Number */}
          <label className="block text-sm font-medium mb-1">
            First Referee Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              placeholder="Country dialling code"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="First Referee Phone Number"
              className="border p-2 rounded w-2/3"
            />
          </div>

          {/* First Referee Company website */}
          <label className="block text-sm font-medium mb-1">
            First Referee Company website <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="First Referee Company website"
            className="border p-2 w-full mb-4 rounded"
          />
          

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded w-full"
          >
            Register as Agent
          </button>

          {/* Login Link */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-agent" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationAgent;