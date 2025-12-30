// import React, { useState } from "react";

// interface FormData {
//   fullName: string;
//   email: string;
//   phone: string;
//   country: string;
//   program: string;
// }

// const CreateApplicationForm: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     fullName: "",
//     email: "",
//     phone: "",
//     country: "",
//     program: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitted Data:", form);
//     alert("Application Submitted!");
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
//       <h2 className="text-2xl font-bold text-center text-primary">
//         Create Application
//       </h2>
//       <p className="text-center text-gray-500 mb-6">
//         Fill out the application form below
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Full Name */}
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={form.fullName}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
//             placeholder="Enter your name"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-semibold">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-semibold">Phone Number</label>
//           <input
//             type="text"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary"
//             placeholder="+880 1XXX..."
//           />
//         </div>

//         {/* Country */}
//         <div>
//           <label className="block mb-1 font-semibold">Country</label>
//           <select
//             name="country"
//             value={form.country}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2"
//           >
//             <option value="">Select Country</option>
//             <option value="Bangladesh">Bangladesh</option>
//             <option value="UK">UK</option>
//             <option value="Canada">Canada</option>
//             <option value="Australia">Australia</option>
//           </select>
//         </div>

//         {/* Program */}
//         <div>
//           <label className="block mb-1 font-semibold">Program</label>
//           <select
//             name="program"
//             value={form.program}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2"
//           >
//             <option value="">Select Program</option>
//             <option value="Diploma">Diploma</option>
//             <option value="Bachelor">Bachelor</option>
//             <option value="Masters">Masters</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-3 rounded-xl hover:bg-secondary transition"
//         >
//           Submit Application
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateApplicationForm;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  program: string;
  universityId?: number;
  universityName?: string;
}

const CreateApplicationForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    program: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // লগিন চেক এবং redirect হ্যান্ডলিং
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");
      
      if (!token || !user) {
        // লগিন না থাকলে লগিন পেজে নিয়ে যাও
        navigate("/login", { 
          state: { 
            redirectTo: "/create-application-form",
            message: "Please login to create an application"
          } 
        });
        return;
      }
      
      setIsLoggedIn(true);
      
      // location state থেকে university ডাটা থাকলে সেট করা
      if (location.state?.university) {
        setForm(prev => ({
          ...prev,
          universityId: location.state.university.id,
          universityName: location.state.university.name
        }));
      }
    };

    checkLogin();
  }, [navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // এখানে আপনার API কল করবেন
    console.log("Submitted Data:", form);
    
    // Success message
    alert("Application Submitted Successfully!");
    
    // Submit করার পর dashboard এ নিয়ে যান
    navigate("/dashboard", { 
      state: { 
        message: "Application submitted successfully!",
        applicationData: form 
      } 
    });
  };

  // লগিন না থাকলে কিছুই দেখাবে না (redirect হবে)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
            Create Application
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-6">
            Fill out the application form below
          </p>
          
          {form.universityName && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-700 font-medium">
                Applying to: <span className="font-semibold">{form.universityName}</span>
              </p>
              {form.universityId && (
                <p className="text-blue-600 text-sm mt-1">
                  University ID: {form.universityId}
                </p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Enter your email address"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="+880 1XXX XXX XXX"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Country *
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none bg-white"
            >
              <option value="">Select your country</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Program *
            </label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none bg-white"
            >
              <option value="">Select program level</option>
              <option value="Diploma">Diploma/Certificate</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD/Doctorate</option>
              <option value="Language">Language Course</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:bg-secondary hover:shadow-lg"
            >
              Submit Application
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-3 border border-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateApplicationForm;