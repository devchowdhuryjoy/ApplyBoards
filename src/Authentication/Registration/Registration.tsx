
// import React, { useState } from "react";

// const countries = [
//   { name: "Canada", flag: "🇨🇦" },
//   { name: "U.S.A.", flag: "🇺🇸" },
//   { name: "Australia", flag: "🇦🇺" },
//   { name: "U.K.", flag: "🇬🇧" },
//   { name: "Germany", flag: "🇩🇪" },
//   { name: "Ireland", flag: "🇮🇪" },
// ];

// const Registration: React.FC = () => {
//   const [showBanner, setShowBanner] = useState(true);

//   return (
//     <div className="min-h-screen bg-[#f3f6fb] flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">

//       {/* Close Button at Top-Right */}
//         <button
//           onClick={() => setShowBanner(false)}
//           className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-red-600 hover:text-red-800"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//       {/* Left Illustration */}
//       <div className="absolute bottom-0 left-0 w-full lg:w-1/2 z-0">
//         <img
//           src="/illustration-left.svg"
//           alt="Illustration"
//           className="w-full h-auto"
//         />
//       </div>

//       {/* Main Content Box */}
//       <div className="relative z-10 bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-xl w-full">
        

//         <div className="text-sm text-black mb-2">Destination Country</div>

//         <div className="flex items-center justify-between mb-4">
//           <div className="flex space-x-1">
//             <div className="w-2 h-2 bg-primary rounded-full"></div>
//             {[...Array(7)].map((_, idx) => (
//               <div key={idx} className="w-2 h-2 bg-gray-300 rounded-full"></div>
//             ))}
//           </div>
//           <div className="text-sm text-black">1/8</div>
//         </div>

//         <div className="text-xl font-semibold mb-4">
//           Which countries are you interested in?
//         </div>

//         {/* Banner */}
//         {showBanner && (
//           <div className="bg-green-100 border border-green-300 p-3 rounded-lg mb-4 relative">
//             <span role="img" aria-label="Pig">
//               🐷
//             </span>{" "}
//             With Study XL's in-house visa support for Australia, you'll get
//             expert guidance to prepare a strong GTE statement.
//           </div>
//         )}

//         {/* Countries Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//           {countries.map((country) => (
//             <button
//               key={country.name}
//               className="border border-gray-300 rounded-lg py-3 px-4 text-center hover:border-blue-500 transition"
//             >
//               <div className="text-2xl">{country.flag}</div>
//               <div className="mt-1 text-sm font-medium">{country.name}</div>
//             </button>
//           ))}
//         </div>

//         <button className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-secondary transition mt-6 w-full">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Registration;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u: any) => u.email === email);
    if (exists) {
      setError("Email already registered, please login.");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;

