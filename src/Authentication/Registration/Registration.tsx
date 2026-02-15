// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

// const Registration: React.FC = () => {
//   const navigate = useNavigate();

//   // states
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [destination, setDestination] = useState("");
//   const [studyLevel, setStudyLevel] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [englishTest, setEnglishTest] = useState("");
//   const [testScore, setTestScore] = useState("");
//   const [passportNumber, setPassportNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const destinations = [
//     "UK",
//     "USA",
//     "Canada",
//     "Australia",
//     "Germany",
//     "Hungary",
//     "Finland",
//     "Malaysia",
//   ];
//   const studyLevels = ["Bachelor", "Master"];
//   const englishTests = ["IELTS", "TOEFL", "PTE"];
//   const nationalityOptions = [
//     "Bangladesh",
//     "India",
//     "Pakistan",
//     "Nepal",
//     "China",
//     "USA",
//     "UK",
//     "Canada",
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirm) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Passwords do not match!",
//       });
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: confirm,
//           destination,
//           study_level: studyLevel,
//           subject: testScore,
//           nationality,
//           elp: englishTest,
//           passport: passportNumber,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (data.errors) {
//           const firstError = Object.values(data.errors)[0] as string[];
//           Swal.fire({
//             icon: "error",
//             title: "Registration Failed",
//             text: firstError[0],
//           });
//         } else if (data.message) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: data.message,
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Registration failed. Try again.",
//           });
//         }
//       } else {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Registration successful!",
//         }).then(() => {
//           navigate("/login");
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong. Please try again later.",
//       });
//     }
//   };

 

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center">Students Register</h2>
//         <form onSubmit={handleSubmit} className="mt-4 space-y-3">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm mb-1">Full Name</label>
//             <input
//               type="text"
//               className="w-full border rounded-lg px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Destination */}
//           <div>
//             <label className="block text-sm mb-1">Destination</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-white"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               required
//             >
//               <option value="">Select destination</option>
//               {destinations.map((d) => (
//                 <option key={d} value={d}>
//                   {d}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Study Level */}
//           <div>
//             <label className="block text-sm mb-1">Study Level</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-white"
//               value={studyLevel}
//               onChange={(e) => setStudyLevel(e.target.value)}
//               required
//             >
//               <option value="">Select level</option>
//               {studyLevels.map((lvl) => (
//                 <option key={lvl} value={lvl}>
//                   {lvl}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Nationality */}
//           <div>
//             <label className="block text-sm mb-1">Nationality</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-white"
//               value={nationality}
//               onChange={(e) => setNationality(e.target.value)}
//               required
//             >
//               <option value="">Select nationality</option>
//               {nationalityOptions.map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* English Test */}
//           <div>
//             <label className="block text-sm mb-1">English Test</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-white"
//               value={englishTest}
//               onChange={(e) => setEnglishTest(e.target.value)}
//               required
//             >
//               <option value="">Select test</option>
//               {englishTests.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Test Score */}
//           <div>
//             <label className="block text-sm mb-1">Test Score</label>
//             <input
//               type="number"
//               className="w-full border rounded-lg px-3 py-2"
//               value={testScore}
//               onChange={(e) => setTestScore(e.target.value)}
//               required
//             />
//           </div>

//           {/* Passport Number */}
//           <div>
//             <label className="block text-sm mb-1">Passport Number</label>
//             <input
//               type="text"
//               className="w-full border rounded-lg px-3 py-2 uppercase"
//               value={passportNumber}
//               onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded-lg px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm mb-1">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full border rounded-lg px-3 py-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black z-10"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <label className="block text-sm mb-1">Confirm Password</label>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               className="w-full border rounded-lg px-3 py-2"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//             />
//             <span
//               className="absolute right-3 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? (
//                 <FiEyeOff size={20} />
//               ) : (
//                 <FiEye size={20} />
//               )}
//             </span>
//           </div>

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-[#f16f22] text-white py-2 rounded-lg font-semibold"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-[#f16f22] underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Registration;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [nationality, setNationality] = useState("");
  const [englishTest, setEnglishTest] = useState("");
  const [testScore, setTestScore] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const destinations = [
    "UK",
    "USA",
    "Canada",
    "Australia",
    "Germany",
    "Hungary",
    "Finland",
    "Malaysia",
  ];
  const studyLevels = ["Bachelor", "Master"];
  const englishTests = ["IELTS", "TOEFL", "PTE"];
  const nationalityOptions = [
    "Bangladesh",
    "India",
    "Pakistan",
    "Nepal",
    "China",
    "USA",
    "UK",
    "Canada",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        html: `<div style="text-align: left; font-size: 14px;">Passwords do not match!</div>`,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirm,
          destination,
          study_level: studyLevel,
          subject: testScore,
          nationality,
          elp: englishTest,
          passport: passportNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Agent Registration কোডের মতো error message দেখানো
        let errors = "";

        if (data.errors) {
          errors = Object.values(data.errors).flat().join("<br/>");
        } else {
          errors = data.message || "Validation failed";
        }

        Swal.fire({
          title: "Validation Error",
          html: `<div style="text-align: left; font-size: 14px;">${errors}</div>`,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: data.message || "Registration successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err: any) {
      // Agent Registration কোডের মতো error handling
      let errors = "";

      if (err.response?.data?.errors) {
        errors = Object.values(err.response.data.errors).flat().join("<br/>");
      } else {
        errors = err.response?.data?.message || "A connection error occurred. Please try again.";
      }

      Swal.fire({
        title: "Registration Failed",
        html: `<div style="text-align: left; font-size: 14px;">${errors}</div>`,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center">Students Register</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm mb-1">Destination</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Study Level */}
          <div>
            <label className="block text-sm mb-1">Study Level</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white"
              value={studyLevel}
              onChange={(e) => setStudyLevel(e.target.value)}
              required
            >
              <option value="">Select level</option>
              {studyLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm mb-1">Nationality</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            >
              <option value="">Select nationality</option>
              {nationalityOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* English Test */}
          <div>
            <label className="block text-sm mb-1">English Test</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white"
              value={englishTest}
              onChange={(e) => setEnglishTest(e.target.value)}
              required
            >
              <option value="">Select test</option>
              {englishTests.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Test Score */}
          <div>
            <label className="block text-sm mb-1">Test Score</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              value={testScore}
              onChange={(e) => setTestScore(e.target.value)}
              required
            />
          </div>

          {/* Passport Number */}
          <div>
            <label className="block text-sm mb-1">Passport Number</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 uppercase"
              value={passportNumber}
              onChange={(e) =>
                setPassportNumber(e.target.value.toUpperCase())
              }
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f16f22] text-white py-2 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f16f22] underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;