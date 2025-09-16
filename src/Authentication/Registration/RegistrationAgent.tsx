// import React, { FormEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const RegistrationAgent: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
//   const [showOtherInput, setShowOtherInput] = useState(false);
//   const [litigationStatus, setLitigationStatus] = useState("");
//   const [australiaRecruitment, setAustraliaRecruitment] = useState("");

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     navigate("/login-agent");
//   };

//   const handleDestinationChange = (destination: string) => {
//     if (selectedDestinations.includes(destination)) {
//       setSelectedDestinations(selectedDestinations.filter(d => d !== destination));
//     } else {
//       setSelectedDestinations([...selectedDestinations, destination]);
//     }

//     if (destination === "Other") {
//       setShowOtherInput(!selectedDestinations.includes("Other"));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Banner Section */}
//       <div className="text-black py-12 px-6 text-center">
//         <h1 className="text-3xl font-bold mb-4 text-primary">Become an agent</h1>
//         <p className="max-w-3xl mx-auto leading-relaxed text-justify hyphens-auto">
//           With our 30-year history, we have built strong relationships with over
//           5000 recruitment partners, providing educational opportunities for
//           students from over 100 countries. If you would like to partner with
//           Oxford International please complete the below form and a
//           representative will contact you as soon as possible.
//         </p>
//       </div>

//       {/* Form Section */}
//       <div className="flex justify-center mt-8 px-4">
//         <form
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
//           onSubmit={handleSubmit}
//         >
//           {/* ==== Agent Details ==== */}
//           <h2 className="text-xl font-semibold mb-2">Agent Details</h2>
//           <hr className="mb-4" />

//           {/* Name Fields */}
//           <label className="block text-sm font-medium mb-1">
//             Name <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2 mb-4">
//             <select className="border p-2 rounded w-1/4">
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>

//           {/* Company Name */}
//           <label className="block text-sm font-medium mb-1">
//             Company name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Company name"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Job Title */}
//           <label className="block text-sm font-medium mb-1">
//             Job Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Phone Number */}
//           <label className="block text-sm font-medium mb-1">
//             Phone Number <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2 mb-1">
//             <input
//               type="text"
//               placeholder="Country dialling code"
//               className="border p-2 rounded w-1/3"
//             />
//             <input
//               type="text"
//               placeholder="Phone number"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>
//           <div className="flex justify-between text-xs text-gray-500 mb-4">
//             <span>Country dialling code</span>
//             <span>Phone Number</span>
//           </div>

//           {/* Email */}
//           <label className="block text-sm font-medium mb-1">
//             Email address <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             placeholder="example@example.com"
//             className="border p-2 w-full mb-1 rounded"
//           />
//           <p className="text-xs text-gray-500 mb-4">example@example.com</p>

//           {/* Finance Email */}
//           <label className="block text-sm font-medium mb-1">
//             Finance Email address (for invoicing){" "}
//             <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             placeholder="example@example.com"
//             className="border p-2 w-full mb-1 rounded"
//           />
//           <p className="text-xs text-gray-500 mb-4">example@example.com</p>

//           {/* Password */}
//           <label className="block text-sm font-medium mb-1">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

//           {/* ==== Company Details ==== */}
//           <h2 className="text-xl font-semibold mb-2">Company Details</h2>
//           <hr className="mb-4" />

//           {/* Name of Company */}
//           <label className="block text-sm font-medium mb-1">
//             Name of Company <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Trading Name */}
//           <label className="block text-sm font-medium mb-1">
//             Trading Name (if different)
//           </label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Website Address */}
//           <label className="block text-sm font-medium mb-1">
//             Website address (if have)
//           </label>
//           <input
//             type="url"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Head Office Address */}
//           <label className="block text-sm font-medium mb-1">
//             Head Office Address <span className="text-red-500">*</span>
//           </label>
//           <p className="text-xs text-gray-500 mb-2">Please enter full address</p>

//           <div className="mb-2">
//             <input
//               type="text"
//               placeholder="Street Address"
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Street Address Line 2"
//               className="border p-2 w-full mb-2 rounded"
//             />
//           </div>

//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               placeholder="City"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               placeholder="State/Province"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>

//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               placeholder="Postal/Zip Code"
//               className="border p-2 rounded w-1/2"
//             />
//             <select className="border p-2 rounded w-1/2">
//               <option value="">Select Country</option>
//               <option value="US">United States</option>
//               <option value="UK">United Kingdom</option>
//               {/* Add more countries as needed */}
//             </select>
//           </div>

//           {/* ==== Company Director Details ==== */}
//           <h2 className="text-xl font-semibold mb-1">
//             Company Director Details
//           </h2>
//           <p className="text-sm text-gray-500 mb-4">
//             (for contact purposes, leave blank if same as above)
//           </p>
//           <hr className="mb-4" />

//           {/* Director Name */}
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <div className="flex gap-2 mb-1">
//             <select className="border p-2 rounded w-1/4">
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>
//           <div className="flex justify-between text-xs text-gray-500 mb-4">
//             <span>Title</span>
//             <span>First Name</span>
//             <span>Last Name</span>
//           </div>

//           {/* Director Job Title */}
//           <label className="block text-sm font-medium mb-1">Job Title</label>
//           <input
//             type="text"
//             placeholder="Job Title"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Director Phone */}
//           <label className="block text-sm font-medium mb-1">Phone Number</label>
//           <div className="flex gap-2 mb-1">
//             <input
//               type="text"
//               placeholder="Country dialling code"
//               className="border p-2 rounded w-1/3"
//             />
//             <input
//               type="text"
//               placeholder="Phone number"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>
//           <div className="flex justify-between text-xs text-gray-500 mb-4">
//             <span>Country dialling code</span>
//             <span>Phone Number</span>
//           </div>

//           {/* Director Email */}
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="example@example.com"
//             className="border p-2 w-full mb-1 rounded"
//           />
//           <p className="text-xs text-gray-500 mb-6">example@example.com</p>

//           {/* ==== Company Overview ==== */}
//           <h2 className="text-xl font-semibold mb-2">Company Overview</h2>
//           <hr className="mb-4" />

//           {/* Students per year */}
//           <label className="block text-sm font-medium mb-1">
//             How many students do you currently send abroad per year? <span className="text-red-500">*</span>
//           </label>
//           <select className="border p-2 w-full mb-4 rounded">
//             <option value="">Please select</option>
//             <option value="0-10">0-10</option>
//             <option value="11-50">11-50</option>
//             <option value="51-100">51-100</option>
//             <option value="101-200">101-200</option>
//             <option value="201+">201+</option>
//           </select>

//           {/* Destinations */}
//           <label className="block text-sm font-medium mb-1">
//             Which of the following destinations do you plan to recruit for? <span className="text-red-500">*</span>
//           </label>
//           <div className="grid grid-cols-2 gap-2 mb-4">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="uk"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("UK")}
//               />
//               <label htmlFor="uk">UK</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="usa"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("USA")}
//               />
//               <label htmlFor="usa">USA</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="canada"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("Canada")}
//               />
//               <label htmlFor="canada">Canada</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="australia1"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("Australia (University of Notre Dame Australia)")}
//               />
//               <label htmlFor="australia1">Australia (University of Notre Dame Australia)</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="australia2"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("Australia (Universal Higher Education)")}
//               />
//               <label htmlFor="australia2">Australia (Universal Higher Education)</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="other"
//                 className="mr-2"
//                 onChange={() => handleDestinationChange("Other")}
//               />
//               <label htmlFor="other">Other</label>
//             </div>
//           </div>

//           {/* Other destination input */}
//           {showOtherInput && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 If 'Other' selected please specify:
//               </label>
//               <input
//                 type="text"
//                 className="border p-2 w-full rounded"
//               />
//             </div>
//           )}

//           {/* Litigation question */}
//           <label className="block text-sm font-medium mb-1">
//             Do you have any past, pending or threatened litigation, arbitration, administrative actions or other disputes? <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="border p-2 w-full mb-2 rounded"
//             value={litigationStatus}
//             onChange={(e) => setLitigationStatus(e.target.value)}
//           >
//             <option value="">Please Select</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>

//           {/* Litigation details (if yes) */}
//           {litigationStatus === "yes" && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 If 'Yes' please specify:
//               </label>
//               <textarea
//                 className="border p-2 w-full rounded"
//                 rows={3}
//               />
//             </div>
//           )}

//           {/* Australia recruitment question */}
//           <label className="block text-sm font-medium mb-1">
//             Have you recruited international students into Australia within the past 12 months? <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="border p-2 w-full mb-2 rounded"
//             value={australiaRecruitment}
//             onChange={(e) => setAustraliaRecruitment(e.target.value)}
//           >
//             <option value="">Please Select</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>

//           {/* Australia recruitment details (if yes) */}
//           {australiaRecruitment === "yes" && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 If 'Yes' please specify:
//               </label>
//               <textarea
//                 className="border p-2 w-full rounded"
//                 rows={3}
//               />
//             </div>
//           )}

//           {/* Other institutions question */}
//           <label className="block text-sm font-medium mb-1">
//             Which other UK / USA / Canada / Australia schools or institutions do you represent? <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             className="border p-2 w-full mb-6 rounded"
//             rows={3}
//           />

//           {/* ==== How many students ==== */}
//           <h2 className="text-xl font-semibold mb-2">How many students do you currently send to the UK/USA/Canada/Australia for the following courses per year?</h2>
//           <hr className="mb-4" />

//           {/* College / Boarding School Name */}
//           <label className="block text-sm font-medium mb-1">
//             College / Boarding School <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="College / Boarding School name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Creative Course Name */}
//           <label className="block text-sm font-medium mb-1">
//             Creative course <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Creative course name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* University Preparation Name */}
//           <label className="block text-sm font-medium mb-1">
//             University Preparation <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="University Preparation name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Adult English Language Name */}
//           <label className="block text-sm font-medium mb-1">
//             Adult English Language <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Adult English Language name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Junior English Language Name */}
//           <label className="block text-sm font-medium mb-1">
//             Junior English Language <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Junior English Language name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Direct entry to university */}
//           <label className="block text-sm font-medium mb-1">
//             Direct entry to university <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Direct entry to university name"
//             className="border p-2 w-full mb-4 rounded"
//           />

//            {/* ==== Company Operations ==== */}
//           <h2 className="text-xl font-semibold mb-2">Company Operations</h2>
//           <hr className="mb-4" />

//           {/* What year was your company established? */}
//           <label className="block text-sm font-medium mb-1">
//             What year was your company established? <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="What year was your company established?"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Do you have any branch offices? If yes, please list locations */}
//           <label className="block text-sm font-medium mb-1">
//             Do you have any branch offices? If yes, please list locations <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Branch office locations"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* How many counsellors do you employ? */}
//           <label className="block text-sm font-medium mb-1">
//             How many counsellors do you employ? <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Number of counsellors"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Are you ICEF Registered Agency? If Yes, what is IAS ID number? */}
//           <label className="block text-sm font-medium mb-1">
//             Are you ICEF Registered Agency? If Yes, what is IAS ID number? <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="IAS ID number"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* How did you hear about Oxford International? */}
//           <label className="block text-sm font-medium mb-1">
//             How did you hear about Oxford International? <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Source of information"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* Why do you want to work with Oxford International? */}
//           <label className="block text-sm font-medium mb-1">
//             Why do you want to work with Oxford International? <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             className="border p-2 w-full mb-6 rounded"
//             rows={3}
//           />

//            {/* ==== Business References ==== */}
//           <h2 className="text-xl font-semibold mb-2">Business References</h2>
//           <p className="text-justify hyphens-auto mb-5">Our reputation is our guarantee and therefore it is a requirement that we obtain some background information about those agencies wishing to represent us. We would appreciate it if you could provide us with the details of two Institutions you have sent students to who we may contact for a reference.</p>
//           {/* <hr className="mb-4" /> */}

//           <label className="block text-sm font-medium mb-1">
//             First Referee Name <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2 mb-4">
//             <select className="border p-2 rounded w-1/4">
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>

//           {/* First Referee Company Name */}
//           <label className="block text-sm font-medium mb-1">
//             First Referee Company Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="First Referee Company Name"
//             className="border p-2 w-full mb-4 rounded"
//           />
//           {/* First Referee Email */}
//           <label className="block text-sm font-medium mb-1">
//             First Referee Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="First Referee Email"
//             className="border p-2 w-full mb-4 rounded"
//           />

//             {/* First Referee Phone Number */}
//           <label className="block text-sm font-medium mb-1">
//             First Referee Phone Number <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2 mb-1">
//             <input
//               type="text"
//               placeholder="Country dialling code"
//               className="border p-2 rounded w-1/3"
//             />
//             <input
//               type="text"
//               placeholder="First Referee Phone Number"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>

//           {/* First Referee Company website */}
//           <label className="block text-sm font-medium mb-1">
//             First Referee Company website <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="First Referee Company website"
//             className="border p-2 w-full mb-4 rounded"
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-primary text-white px-4 py-2 rounded w-full"
//           >
//             Register as Agent
//           </button>

//           {/* Login Link */}
//           <p className="text-sm text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login-agent" className="text-blue-600 underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationAgent;

import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const RegistrationAgent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    prefix: "Mr",
    first_name: "",
    last_name: "",
    company_name: "",
    job_title: "",
    country_dialing_code: "",
    phone_number: "",
    email: "",
    finance_email: "",
    password: "",
    street_address: "",
    street_address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    director_prefix: "Mr",
    director_first_name: "",
    director_last_name: "",
    director_job_title: "",
    director_dialing_code: "",
    director_phone: "",
    director_email: "",
    students_per_year: "",
    destinations: [],
    other_destination: "",
    litigation_status: "",
    litigation_details: "",
    australia_recruitment: "",
    australia_details: "",
    other_institutions: "",
    college_students: "",
    creative_students: "",
    university_prep: "",
    adult_english: "",
    junior_english: "",
    direct_university: "",
    company_year: "",
    branch_offices: "",
    counsellors: "",
    icef_id: "",
    source_info: "",
    why_oxford: "",
    referee_prefix: "Mr",
    referee_first_name: "",
    referee_last_name: "",
    referee_company: "",
    referee_email: "",
    referee_dialing_code: "",
    referee_phone: "",
    referee_website: "",
  });

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [showOtherInput, setShowOtherInput] = useState(false);

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Destination checkbox
  const handleDestinationChange = (destination: string) => {
    let updated: string[] = [];
    if (selectedDestinations.includes(destination)) {
      updated = selectedDestinations.filter((d) => d !== destination);
    } else {
      updated = [...selectedDestinations, destination];
    }
    setSelectedDestinations(updated);
    setFormData((prev: any) => ({
      ...prev,
      destinations: updated,
    }));

    if (destination === "Other") {
      setShowOtherInput(!selectedDestinations.includes("Other"));
    }
  };

  // Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ====== Auto prepend +880 if missing ======
    const updatedFormData = { ...formData };

    // Agent phone
    if (!updatedFormData.phone_number.startsWith("+880")) {
      updatedFormData.phone_number =
        "+880" + updatedFormData.phone_number.replace(/^0+/, "");
    }
    if (!updatedFormData.country_dialing_code) {
      updatedFormData.country_dialing_code = "+880";
    }

    // Director phone
    if (!updatedFormData.director_phone_number?.startsWith("+880")) {
      updatedFormData.director_phone_number =
        "+880" +
        (updatedFormData.director_phone_number || "").replace(/^0+/, "");
    }
    if (!updatedFormData.director_dialing_code) {
      updatedFormData.director_dialing_code = "+880";
    }

    // Referee phone
    if (!updatedFormData.referee_phone?.startsWith("+880")) {
      updatedFormData.referee_phone =
        "+880" + (updatedFormData.referee_phone || "").replace(/^0+/, "");
    }
    if (!updatedFormData.referee_dialing_code) {
      updatedFormData.referee_dialing_code = "+880";
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/agents/register`,
        updatedFormData
      );
      if (res.data.status) {
        // changed from res.data.success to res.data.status
        Swal.fire("Success", "Registration completed successfully!", "success");
        navigate("/login-agent");
      } else {
        Swal.fire("Error", res.data.message || "Something went wrong", "error");
      }
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Server error",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="text-black py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          Become an agent
        </h1>
        <p className="max-w-3xl mx-auto leading-relaxed text-justify hyphens-auto">
          With our 30-year history, we have built strong relationships with over
          5000 recruitment partners, providing educational opportunities for
          students from over 100 countries. If you would like to partner with
          Oxford International please complete the below form and a
          representative will contact you as soon as possible.
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-8 px-4">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
          onSubmit={handleSubmit}
        >
          {/* ==== Agent Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Agent Details</h2>
          <hr className="mb-4" />

          {/* Prefix + Name */}
          <div className="flex gap-2 mb-4">
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Phone */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="country_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="email"
            name="finance_email"
            value={formData.finance_email}
            onChange={handleChange}
            placeholder="Finance Email"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Address */}
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            placeholder="Street Address"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="street_address_line2"
            value={formData.street_address_line2}
            onChange={handleChange}
            placeholder="Street Address Line 2"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Director Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Director Details</h2>
          <hr className="mb-4" />

          <div className="flex gap-2 mb-4">
            <select
              name="director_prefix"
              value={formData.director_prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="director_first_name"
              value={formData.director_first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="director_last_name"
              value={formData.director_last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          <input
            type="text"
            name="director_job_title"
            value={formData.director_job_title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="director_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="director_phone_number"
              value={formData.director_phone_number}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="email"
            name="director_email"
            value={formData.director_email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Company Info ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Information</h2>
          <hr className="mb-4" />

          <input
            type="text"
            name="trading_name"
            value={formData.trading_name}
            onChange={handleChange}
            placeholder="Trading Name"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="students_per_year"
            value={formData.students_per_year}
            onChange={handleChange}
            placeholder="Students per year"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Destinations */}
          <label className="block text-sm font-medium mb-1">Destinations</label>
          <div className="flex flex-col gap-2 mb-4">
            {["UK", "USA", "Canada", "Australia", "Other"].map((d) => (
              <label key={d} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.destinations.includes(d)}
                  onChange={() => handleDestinationChange(d)}
                />
                {d}
              </label>
            ))}
          </div>
          {showOtherInput && (
            <input
              type="text"
              name="other_destination"
              value={formData.other_destination}
              onChange={handleChange}
              placeholder="Other Destination"
              className="border p-2 rounded w-full mb-4"
            />
          )}

          {/* Litigation */}
          <textarea
            name="litigation"
            value={formData.litigation}
            onChange={handleChange}
            placeholder="Litigation Status"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="litigation_details"
            value={formData.litigation_details}
            onChange={handleChange}
            placeholder="Litigation Details"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Australia Recruitment */}
          <textarea
            name="australia_recruitment"
            value={formData.australia_recruitment}
            onChange={handleChange}
            placeholder="Recruitment for Australia"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="australia_recruitment_details"
            value={formData.australia_recruitment_details}
            onChange={handleChange}
            placeholder="Details"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Institutions */}
          <textarea
            name="institutions"
            value={formData.institutions}
            onChange={handleChange}
            placeholder="Institutions you represent"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Services */}
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <hr className="mb-4" />
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College Students"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="creative_course"
            value={formData.creative_course}
            onChange={handleChange}
            placeholder="Creative Course"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="university_preparation"
            value={formData.university_preparation}
            onChange={handleChange}
            placeholder="University Preparation"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="adult_english"
            value={formData.adult_english}
            onChange={handleChange}
            placeholder="Adult English"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="junior_english"
            value={formData.junior_english}
            onChange={handleChange}
            placeholder="Junior English"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="direct_entry"
            value={formData.direct_entry}
            onChange={handleChange}
            placeholder="Direct University Entry"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Company Stats */}
          <input
            type="number"
            name="year_established"
            value={formData.year_established}
            onChange={handleChange}
            placeholder="Year Established"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="branch_offices"
            value={formData.branch_offices}
            onChange={handleChange}
            placeholder="Branch Offices"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="counsellors"
            value={formData.counsellors}
            onChange={handleChange}
            placeholder="No. of Counsellors"
            className="border p-2 rounded w-full mb-4"
          />

          <input
            type="text"
            name="icef_id"
            value={formData.icef_id}
            onChange={handleChange}
            placeholder="ICEF ID"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="hear_about"
            value={formData.hear_about}
            onChange={handleChange}
            placeholder="How did you hear about us?"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="why_oxford"
            value={formData.why_oxford}
            onChange={handleChange}
            placeholder="Why choose Oxford?"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Referee ==== */}
          <h2 className="text-xl font-semibold mb-2">References</h2>
          <hr className="mb-4" />
          <div className="flex gap-2 mb-4">
            <select
              name="referee_prefix"
              value={formData.referee_prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="referee_first_name"
              value={formData.referee_first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="referee_last_name"
              value={formData.referee_last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>
          <input
            type="text"
            name="referee_company"
            value={formData.referee_company}
            onChange={handleChange}
            placeholder="Company"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="email"
            name="referee_email"
            value={formData.referee_email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="referee_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="referee_phone"
              value={formData.referee_phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="url"
            name="referee_website"
            value={formData.referee_website}
            onChange={handleChange}
            placeholder="Website"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded w-full"
          >
            Register as Agent
          </button>

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
