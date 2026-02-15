// import React, { FormEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

// const RegistrationAgent: React.FC = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState<any>({
//     prefix: "Mr",
//     first_name: "",
//     last_name: "",
//     company_name: "",
//     job_title: "",
//     country_dialing_code: "",
//     phone_number: "",
//     email: "",
//     finance_email: "",
//     password: "",
//     street_address: "",
//     street_address_line2: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//     director_prefix: "Mr",
//     director_first_name: "",
//     director_last_name: "",
//     director_job_title: "",
//     director_dialing_code: "",
//     director_phone: "",
//     director_email: "",
//     students_per_year: "",
//     destinations: [],
//     other_destination: "",
//     litigation_status: "",
//     litigation_details: "",
//     australia_recruitment: "",
//     australia_details: "",
//     other_institutions: "",
//     college_students: "",
//     creative_students: "",
//     university_prep: "",
//     adult_english: "",
//     junior_english: "",
//     direct_university: "",
//     company_year: "",
//     branch_offices: "",
//     counsellors: "",
//     icef_id: "",
//     source_info: "",
//     why_oxford: "",
//     referee_prefix: "Mr",
//     referee_first_name: "",
//     referee_last_name: "",
//     referee_company: "",
//     referee_email: "",
//     referee_dialing_code: "",
//     referee_phone: "",
//     referee_website: "",
//   });

//   const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
//     [],
//   );
//   const [showOtherInput, setShowOtherInput] = useState(false);

//   // input change handler
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Destination checkbox
//   const handleDestinationChange = (destination: string) => {
//     let updated: string[] = [];
//     if (selectedDestinations.includes(destination)) {
//       updated = selectedDestinations.filter((d) => d !== destination);
//     } else {
//       updated = [...selectedDestinations, destination];
//     }
//     setSelectedDestinations(updated);
//     setFormData((prev: any) => ({
//       ...prev,
//       destinations: updated,
//     }));

//     if (destination === "Other") {
//       setShowOtherInput(!selectedDestinations.includes("Other"));
//     }
//   };

//   // Submit
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // ====== Auto prepend +880 if missing ======
//     const updatedFormData = { ...formData };

//     // Agent phone
//     if (!updatedFormData.phone_number.startsWith("+880")) {
//       updatedFormData.phone_number =
//         "+880" + updatedFormData.phone_number.replace(/^0+/, "");
//     }
//     if (!updatedFormData.country_dialing_code) {
//       updatedFormData.country_dialing_code = "+880";
//     }

//     // Director phone
//     if (!updatedFormData.director_phone_number?.startsWith("+880")) {
//       updatedFormData.director_phone_number =
//         "+880" +
//         (updatedFormData.director_phone_number || "").replace(/^0+/, "");
//     }
//     if (!updatedFormData.director_dialing_code) {
//       updatedFormData.director_dialing_code = "+880";
//     }

//     // Referee phone
//     if (!updatedFormData.referee_phone?.startsWith("+880")) {
//       updatedFormData.referee_phone =
//         "+880" + (updatedFormData.referee_phone || "").replace(/^0+/, "");
//     }
//     if (!updatedFormData.referee_dialing_code) {
//       updatedFormData.referee_dialing_code = "+880";
//     }

//     try {
//       const res = await axios.post(
//         `${BASE_URL}/agent/register`,
//         updatedFormData,
//       );
//       if (res.data.status) {
//         // changed from res.data.success to res.data.status
//         Swal.fire("Success", "Registration completed successfully!", "success");
//         navigate("/login-agent");
//       } else {
//         Swal.fire("Error", res.data.message || "Something went wrong", "error");
//       }
//     } catch (err: any) {
//       Swal.fire(
//         "Error",
//         err.response?.data?.message || "Server error",
//         "error",
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white mb-10">
//       {/* Banner */}
//       <div className="text-black py-12 px-6 text-center">
//         <h1 className="text-3xl font-bold mb-4 text-primary">
//           Become an agent
//         </h1>
//         <p className="max-w-3xl mx-auto leading-relaxed text-justify hyphens-auto">
//           With our 30-year history, we have built strong relationships with over
//           5000 recruitment partners, providing educational opportunities for
//           students from over 100 countries. If you would like to partner with
//           Oxford International please complete the below form and a
//           representative will contact you as soon as possible.
//         </p>
//       </div>

//       {/* Form */}
//       <div className="flex justify-center mt-8 px-4">
//         <form
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
//           onSubmit={handleSubmit}
//         >
//           {/* ==== Agent Details ==== */}
//           <h2 className="text-xl font-semibold mb-2">Agent Details</h2>
//           <hr className="mb-4" />

//           {/* Prefix + Name */}
//           <div className="flex gap-2 mb-4">
//             <select
//               name="prefix"
//               value={formData.prefix}
//               onChange={handleChange}
//               className="border p-2 rounded w-1/4"
//             >
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>

//           <input
//             type="text"
//             name="company_name"
//             value={formData.company_name}
//             onChange={handleChange}
//             placeholder="Company Name"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="job_title"
//             value={formData.job_title}
//             onChange={handleChange}
//             placeholder="Job Title"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Phone */}
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               name="country_dialing_code"
//               value="+880"
//               readOnly
//               className="border p-2 rounded w-1/3 bg-gray-200"
//             />
//             <input
//               type="text"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="border p-2 rounded w-full mb-4"
//             />
//             <span
//                className="absolute right-3 top-1/3 -translate-y-1/2 cursor-pointer text-black"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>

//           <h2 className="text-xl font-semibold mb-2">Address</h2>
//           <hr className="mb-4" />
//           {/* Address */}
//           <input
//             type="text"
//             name="street_address"
//             value={formData.street_address}
//             onChange={handleChange}
//             placeholder="Street Address"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="email"
//             name="finance_email"
//             value={formData.finance_email}
//             onChange={handleChange}
//             placeholder="Finance Email"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="street_address_line2"
//             value={formData.street_address_line2}
//             onChange={handleChange}
//             placeholder="Street Address Line 2"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="City"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="State"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="postal_code"
//             value={formData.postal_code}
//             onChange={handleChange}
//             placeholder="Postal Code"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             placeholder="Country"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* ==== Director Details ==== */}
//           <h2 className="text-xl font-semibold mb-2">Director Details</h2>
//           <hr className="mb-4" />

//           <div className="flex gap-2 mb-4">
//             <select
//               name="director_prefix"
//               value={formData.director_prefix}
//               onChange={handleChange}
//               className="border p-2 rounded w-1/4"
//             >
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               name="director_first_name"
//               value={formData.director_first_name}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               name="director_last_name"
//               value={formData.director_last_name}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>

//           <input
//             type="text"
//             name="director_job_title"
//             value={formData.director_job_title}
//             onChange={handleChange}
//             placeholder="Job Title"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               name="director_dialing_code"
//               value="+880"
//               readOnly
//               className="border p-2 rounded w-1/3 bg-gray-200"
//             />
//             <input
//               type="text"
//               name="director_phone_number"
//               value={formData.director_phone_number}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>

//           <input
//             type="email"
//             name="director_email"
//             value={formData.director_email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* ==== Company Info ==== */}
//           <h2 className="text-xl font-semibold mb-2">Company Information</h2>
//           <hr className="mb-4" />

//           <input
//             type="text"
//             name="trading_name"
//             value={formData.trading_name}
//             onChange={handleChange}
//             placeholder="Trading Name"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="url"
//             name="website"
//             value={formData.website}
//             onChange={handleChange}
//             placeholder="Website"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="number"
//             name="students_per_year"
//             value={formData.students_per_year}
//             onChange={handleChange}
//             placeholder="Students per year"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Destinations */}
//           <label className="block text-sm font-medium mb-1">Destinations</label>
//           <div className="flex flex-col gap-2 mb-4">
//             {["UK", "USA", "Canada", "Australia", "Other"].map((d) => (
//               <label key={d} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.destinations.includes(d)}
//                   onChange={() => handleDestinationChange(d)}
//                 />
//                 {d}
//               </label>
//             ))}
//           </div>
//           {showOtherInput && (
//             <input
//               type="text"
//               name="other_destination"
//               value={formData.other_destination}
//               onChange={handleChange}
//               placeholder="Other Destination"
//               className="border p-2 rounded w-full mb-4"
//             />
//           )}

//           {/* Litigation */}
//           <textarea
//             name="litigation"
//             value={formData.litigation}
//             onChange={handleChange}
//             placeholder="Litigation Status"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <textarea
//             name="litigation_details"
//             value={formData.litigation_details}
//             onChange={handleChange}
//             placeholder="Litigation Details"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Australia Recruitment */}
//           <textarea
//             name="australia_recruitment"
//             value={formData.australia_recruitment}
//             onChange={handleChange}
//             placeholder="Recruitment for Australia"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <textarea
//             name="australia_recruitment_details"
//             value={formData.australia_recruitment_details}
//             onChange={handleChange}
//             placeholder="Details"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Institutions */}
//           <textarea
//             name="institutions"
//             value={formData.institutions}
//             onChange={handleChange}
//             placeholder="Institutions you represent"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Services */}
//           <h2 className="text-xl font-semibold mb-2">Services</h2>
//           <hr className="mb-4" />
//           <input
//             type="text"
//             name="college"
//             value={formData.college}
//             onChange={handleChange}
//             placeholder="College Students"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="creative_course"
//             value={formData.creative_course}
//             onChange={handleChange}
//             placeholder="Creative Course"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="university_preparation"
//             value={formData.university_preparation}
//             onChange={handleChange}
//             placeholder="University Preparation"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="adult_english"
//             value={formData.adult_english}
//             onChange={handleChange}
//             placeholder="Adult English"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="junior_english"
//             value={formData.junior_english}
//             onChange={handleChange}
//             placeholder="Junior English"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="text"
//             name="direct_entry"
//             value={formData.direct_entry}
//             onChange={handleChange}
//             placeholder="Direct University Entry"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Company Stats */}
//           <input
//             type="number"
//             name="year_established"
//             value={formData.year_established}
//             onChange={handleChange}
//             placeholder="Year Established"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="number"
//             name="branch_offices"
//             value={formData.branch_offices}
//             onChange={handleChange}
//             placeholder="Branch Offices"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="number"
//             name="counsellors"
//             value={formData.counsellors}
//             onChange={handleChange}
//             placeholder="No. of Counsellors"
//             className="border p-2 rounded w-full mb-4"
//           />

//           <input
//             type="text"
//             name="icef_id"
//             value={formData.icef_id}
//             onChange={handleChange}
//             placeholder="ICEF ID"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <textarea
//             name="hear_about"
//             value={formData.hear_about}
//             onChange={handleChange}
//             placeholder="How did you hear about us?"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <textarea
//             name="why_oxford"
//             value={formData.why_oxford}
//             onChange={handleChange}
//              placeholder="Why choose study-xl?"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* ==== Referee ==== */}
//           <h2 className="text-xl font-semibold mb-2">References</h2>
//           <hr className="mb-4" />
//           <div className="flex gap-2 mb-4">
//             <select
//               name="referee_prefix"
//               value={formData.referee_prefix}
//               onChange={handleChange}
//               className="border p-2 rounded w-1/4"
//             >
//               <option>Mr</option>
//               <option>Mrs</option>
//               <option>Ms</option>
//               <option>Dr</option>
//             </select>
//             <input
//               type="text"
//               name="referee_first_name"
//               value={formData.referee_first_name}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="border p-2 rounded w-1/2"
//             />
//             <input
//               type="text"
//               name="referee_last_name"
//               value={formData.referee_last_name}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="border p-2 rounded w-1/2"
//             />
//           </div>
//           <input
//             type="text"
//             name="referee_company"
//             value={formData.referee_company}
//             onChange={handleChange}
//             placeholder="Company"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <input
//             type="email"
//             name="referee_email"
//             value={formData.referee_email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               name="referee_dialing_code"
//               value="+880"
//               readOnly
//               className="border p-2 rounded w-1/3 bg-gray-200"
//             />
//             <input
//               type="text"
//               name="referee_phone"
//               value={formData.referee_phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="border p-2 rounded w-2/3"
//             />
//           </div>

//           <input
//             type="url"
//             name="referee_website"
//             value={formData.referee_website}
//             onChange={handleChange}
//             placeholder="Website"
//             className="border p-2 rounded w-full mb-4"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-primary text-white px-4 py-2 rounded w-full"
//           >
//             Register as Agent
//           </button>

//           <p className="text-sm text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login-agent" className="text-[#f16f22] underline">
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
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

// Define the type for country metadata
interface CountryInfo {
  code: string;
  flag: string;
}

const RegistrationAgent: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const countryData: Record<string, CountryInfo> = {
    "United Kingdom": { code: "+44", flag: "🇬🇧" },
    "United States": { code: "+1", flag: "🇺🇸" },
    Canada: { code: "+1", flag: "🇨🇦" },
    Australia: { code: "+61", flag: "🇦🇺" },
    Germany: { code: "+49", flag: "🇩🇪" },
    France: { code: "+33", flag: "🇫🇷" },
    Ireland: { code: "+353", flag: "🇮🇪" },
    "New Zealand": { code: "+64", flag: "🇳🇿" },
    Singapore: { code: "+65", flag: "🇸🇬" },
    "United Arab Emirates": { code: "+971", flag: "🇦🇪" },
    Bangladesh: { code: "+880", flag: "🇧🇩" },
    India: { code: "+91", flag: "🇮🇳" },
    Malaysia: { code: "+60", flag: "🇲🇾" },
    Other: { code: "+", flag: "🏳️" },
  };

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
    director_phone_number: "",
    director_email: "",
    students_per_year: "",
    destinations: [],
    other_destination: "None",
    litigation_status: "None",
    litigation_details: "None",
    australia_recruitment: "false",
    australia_recruitment_details: "None",
    other_institutions: "None",
    institutions: "None",
    college_students: "",
    creative_course: "",
    university_preparation: "",
    adult_english: "",
    junior_english: "",
    direct_entry: "",
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
    password_confirmation: "",
    is_approved: 0,
    status: "active",
  });

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );
  const [showOtherInput, setShowOtherInput] = useState(false);

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
      ...(name === "password" ? { password_confirmation: value } : {}),
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
  // submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanPhone = (code: string, phone: string) => {
      if (!phone) return "";
      return phone.startsWith("+") ? phone : code + phone.replace(/^0+/, "");
    };

    const updatedFormData = {
      ...formData,
      phone_number: cleanPhone(
        formData.country_dialing_code,
        formData.phone_number,
      ),
      director_phone_number: cleanPhone(
        formData.director_dialing_code,
        formData.director_phone_number,
      ),
      referee_phone: cleanPhone(
        formData.referee_dialing_code,
        formData.referee_phone,
      ),
      creative_course: formData.creative_course ? 1 : 0,
      university_preparation: formData.university_preparation ? 1 : 0,
      adult_english: formData.adult_english ? 1 : 0,
      junior_english: formData.junior_english ? 1 : 0,
      direct_entry: formData.direct_entry ? 1 : 0,
    };

    // try {
    //   const res = await axios.post(`${BASE_URL}/agent/register`, updatedFormData);

    //   if (res.data.status) {
    //     Swal.fire({
    //       title: "Success!",
    //       text: "Registration completed successfully.",
    //       icon: "success",
    //       timer: 2000,
    //       showConfirmButton: false
    //     });
    //     navigate("/login-agent");
    //   } else {
    //     const errorMessages = res.data.errors
    //       ? Object.values(res.data.errors).flat().join("<br/>")
    //       : res.data.message || "Validation failed";

    //     Swal.fire({
    //       title: "Validation Error",
    //       html: `<div style="text-align: left; font-size: 14px;">${errorMessages}</div>`,
    //       icon: "error"
    //     });
    //   }
    // } catch (err: any) {
    //   const serverErrors = err.response?.data?.errors;
    //   const errors = serverErrors
    //     ? Object.values(serverErrors).flat().join("<br/>")
    //     : "A connection error occurred. Please try again.";

    //   Swal.fire({
    //     title: "Registration Failed",
    //     html: `<div style="text-align: left; font-size: 14px;">${errors}</div>`,
    //     icon: "error"
    //   });
    // }

    try {
      const res = await axios.post(
        `${BASE_URL}/agent/register`,
        updatedFormData,
      );

      if (res.data.status) {
        Swal.fire({
          title: "Success!",
          text: res.data.message || "Registration completed successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/login-agent");
      } else {
        // Backend validation errors show করবে
        let errors = "";

        if (res.data.errors) {
          errors = Object.values(res.data.errors).flat().join("<br/>");
        } else {
          errors = res.data.message || "Validation failed";
        }

        Swal.fire({
          title: "Validation Error",
          html: `<div style="text-align: left; font-size: 14px;">${errors}</div>`,
          icon: "error",
        });
      }
    } catch (err: any) {
      let errors = "";

      if (err.response?.data?.errors) {
        errors = Object.values(err.response.data.errors).flat().join("<br/>");
      } else {
        errors =
          err.response?.data?.message ||
          "A connection error occurred. Please try again.";
      }

      Swal.fire({
        title: "Registration Failed",
        html: `<div style="text-align: left; font-size: 14px;">${errors}</div>`,
        icon: "error",
      });
    }
    
  };

  return (
    <div className="min-h-screen bg-white mb-10">
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
            <div className="w-1/4">
              <label className="block text-sm font-medium mb-1">Prefix</label>
              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
                <option>Dr</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Code</label>
              <select
                name="country_dialing_code"
                value={formData.country_dialing_code}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-gray-100 font-bold appearance-none text-center"
              >
                {Object.entries(countryData).map(([name, info]) => (
                  <option key={`agent-${name}`} value={info.code}>
                    {info.flag} {info.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone number"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border p-2 rounded w-full"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <hr className="mb-4" />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              placeholder="Street Address"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Street Address Line 2
            </label>
            <input
              type="text"
              name="street_address_line2"
              value={formData.street_address_line2}
              onChange={handleChange}
              placeholder="Street Address Line 2"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Finance Email
            </label>
            <input
              type="email"
              name="finance_email"
              value={formData.finance_email}
              onChange={handleChange}
              placeholder="Finance Email"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              State / Province
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* ==== Director Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Director Details</h2>
          <hr className="mb-4" />

          <div className="flex gap-2 mb-4">
            <div className="w-1/4">
              <label className="block text-sm font-medium mb-1">Prefix</label>
              <select
                name="director_prefix"
                value={formData.director_prefix}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
                <option>Dr</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="director_first_name"
                value={formData.director_first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="director_last_name"
                value={formData.director_last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Director Job Title
            </label>
            <input
              type="text"
              name="director_job_title"
              value={formData.director_job_title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Code</label>
              <select
                name="director_dialing_code"
                value={formData.director_dialing_code}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-gray-100 font-bold appearance-none text-center"
              >
                {Object.entries(countryData).map(([name, info]) => (
                  <option key={`dir-${name}`} value={info.code}>
                    {info.flag} {info.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-medium mb-1">
                Director Phone
              </label>
              <input
                type="text"
                name="director_phone_number"
                value={formData.director_phone_number}
                onChange={handleChange}
                placeholder="Director phone"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Director Email
            </label>
            <input
              type="email"
              name="director_email"
              value={formData.director_email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* ==== Company Info ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Information</h2>
          <hr className="mb-4" />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Trading Name
            </label>
            <input
              type="text"
              name="trading_name"
              value={formData.trading_name}
              onChange={handleChange}
              placeholder="Trading Name"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Students per Year
            </label>
            <input
              type="number"
              name="students_per_year"
              value={formData.students_per_year}
              onChange={handleChange}
              placeholder="0"
              className="border p-2 rounded w-full"
            />
          </div>

          <label className="block text-sm font-medium mb-1">Destinations</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {Object.keys(countryData).map((countryName) => (
              <label
                key={countryName}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  checked={formData.destinations.includes(countryName)}
                  onChange={() => handleDestinationChange(countryName)}
                />
                <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                  {countryData[countryName].flag} {countryName}
                </span>
              </label>
            ))}
          </div>

          {showOtherInput && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Please specify other destination
              </label>
              <input
                type="text"
                name="other_destination"
                value={formData.other_destination}
                onChange={handleChange}
                placeholder="Other Destination"
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {/* Litigation */}
          {/* <textarea
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
          /> */}

          {/* Australia Recruitment */}
          {/* <textarea
            name="australia_recruitment"
            value={formData.australia_recruitment}
            onChange={handleChange}
            placeholder="Recruitment for Australia"
            className="border p-2 rounded w-full mb-4"
          /> */}

          {/* <textarea
            name="australia_recruitment_details"
            value={formData.australia_recruitment_details}
            onChange={handleChange}
            placeholder="Details"
            className="border p-2 rounded w-full mb-4"
          /> */}

          {/* Institutions */}
          {/* <textarea
            name="institutions"
            value={formData.institutions}
            onChange={handleChange}
            placeholder="Institutions you represent"
            className="border p-2 rounded w-full mb-4"
          /> */}

          {/* Services */}
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <hr className="mb-4" />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              College Students
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College Students"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Creative Course
            </label>
            <input
              type="text"
              name="creative_course"
              value={formData.creative_course}
              onChange={handleChange}
              placeholder="true or false"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              University Preparation
            </label>
            <input
              type="text"
              name="university_preparation"
              value={formData.university_preparation}
              onChange={handleChange}
              placeholder="true or false"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Adult English
            </label>
            <input
              type="text"
              name="adult_english"
              value={formData.adult_english}
              onChange={handleChange}
              placeholder="true or false"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Junior English
            </label>
            <input
              type="text"
              name="junior_english"
              value={formData.junior_english}
              onChange={handleChange}
              placeholder="true or false"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Direct University Entry
            </label>
            <input
              type="text"
              name="direct_entry"
              value={formData.direct_entry}
              onChange={handleChange}
              placeholder="true or false"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Year Established
            </label>
            <input
              type="date"
              name="year_established"
              value={formData.year_established}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Branch Offices
            </label>
            <input
              type="number"
              name="branch_offices"
              value={formData.branch_offices}
              onChange={handleChange}
              placeholder="0"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Number of Counsellors
            </label>
            <input
              type="number"
              name="counsellors"
              value={formData.counsellors}
              onChange={handleChange}
              placeholder="0"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ICEF ID</label>
            <input
              type="text"
              name="icef_id"
              value={formData.icef_id}
              onChange={handleChange}
              placeholder="ICEF ID"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              How did you hear about us?
            </label>
            <textarea
              name="hear_about"
              value={formData.hear_about}
              onChange={handleChange}
              placeholder="Tell us..."
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Why choose study-xl?
            </label>
            <textarea
              name="why_oxford"
              value={formData.why_oxford}
              onChange={handleChange}
              placeholder="Your reasons..."
              className="border p-2 rounded w-full"
            />
          </div>

          {/* ==== Referee ==== */}
          <h2 className="text-xl font-semibold mb-2">References</h2>
          <hr className="mb-4" />
          <div className="flex gap-2 mb-4">
            <div className="w-1/4">
              <label className="block text-sm font-medium mb-1">Prefix</label>
              <select
                name="referee_prefix"
                value={formData.referee_prefix}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
                <option>Dr</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="referee_first_name"
                value={formData.referee_first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="referee_last_name"
                value={formData.referee_last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Referee Company
            </label>
            <input
              type="text"
              name="referee_company"
              value={formData.referee_company}
              onChange={handleChange}
              placeholder="Company"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Referee Email
            </label>
            <input
              type="email"
              name="referee_email"
              value={formData.referee_email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Code</label>
              <select
                name="referee_dialing_code"
                value={formData.referee_dialing_code}
                onChange={handleChange}
                className="border p-2 rounded w-full bg-gray-100 font-bold appearance-none text-center"
              >
                {Object.entries(countryData).map(([name, info]) => (
                  <option key={`ref-${name}`} value={info.code}>
                    {info.flag} {info.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-medium mb-1">
                Referee Phone
              </label>
              <input
                type="text"
                name="referee_phone"
                value={formData.referee_phone}
                onChange={handleChange}
                placeholder="Referee phone"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Referee Website
            </label>
            <input
              type="url"
              name="referee_website"
              value={formData.referee_website}
              onChange={handleChange}
              placeholder="https://..."
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-opacity-90 transition-colors mt-4 font-semibold"
          >
            Register as Agent
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-agent" className="text-[#f16f22] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationAgent;
