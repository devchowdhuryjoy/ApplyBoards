// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

// const AgentLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);


//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);

//       const response = await fetch(`${BASE_URL}/agent/login`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (response.status === 403) {
//           Swal.fire({
//             icon: "warning",
//             title: "Pending Approval",
//             text: data.message,
//           });
//         } else if (response.status === 401) {
//           Swal.fire({
//             icon: "error",
//             title: "Invalid Credentials",
//             text: data.message,
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Login Failed",
//             text: data.message || "Something went wrong!",
//           });
//         }
//         return;
//       }

//       //Success
//       if (data.status) {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: data.message,
//         });

//         //Save token + user
//         localStorage.setItem(
//           "auth",
//           JSON.stringify({
//             token: data.token,
//             user: data.agent,
//             user_type: "agent",
//           }),
//         );

//         navigate("/agent-dashboard");
//       }
//     } catch (error) {
//       console.error("Server Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: "Something went wrong!",
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md mb-10">
//       <h2 className="text-xl font-bold mb-4">Agent Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border px-3 py-2 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4 relative">
//           <label className="block mb-1">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             className="w-full border px-3 py-2 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black z-10"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#f16f22] text-white py-2 rounded hover:bg-[#d65a1e]"
//         >
//           Login
//         </button>
//       </form>

//       <p className="text-sm text-center mt-4">
//         Don’t have an account?{" "}
//         <Link to="/registration-agent" className="text-[#f16f22] underline">
//           Register
//         </Link>
//       </p>

//       <p className="text-sm text-center mt-2">
//         <Link to="/forgot-password-agent" className="text-[#f16f22] underline">
//           Forgot Password?
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default AgentLogin;


import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("agent"); // 'agent' or 'employee'
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // Determine API endpoint based on user type
      const endpoint = userType === 'agent' 
        ? `${BASE_URL}/agent/login`
        : `${BASE_URL}/agent/employee/login`;

      console.log(`Logging in as ${userType} with endpoint:`, endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        if (response.status === 403) {
          Swal.fire({
            icon: "warning",
            title: "Pending Approval",
            text: data.message,
          });
        } else if (response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message || "Something went wrong!",
          });
        }
        return;
      }

      // Success - Handle both agent and employee responses
      if (data.status || data.access_token || data.token) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message || `Welcome ${userType === 'agent' ? 'Agent' : 'Employee'}!`,
        });

        // Prepare auth data based on user type
        let authData;
        
        if (userType === 'agent') {
          // Agent login response structure
          authData = {
            token: data.token,
            user: data.agent,
            permissions: data.agent?.permissions || [],
            user_type: "agent",
          };
        } else {
          // Employee login response structure
          authData = {
            token: data.access_token || data.token,
            user: data.employee, // Keep as 'user' for consistency
            employee: data.employee,
            permissions: data.employee?.permissions || [],
            user_type: "employee",
          };
        }

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(authData));
        console.log("Saved auth data:", authData);

        // Navigate to appropriate dashboard
        if (userType === 'agent') {
          navigate("/agent-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.error("Server Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md mb-10">
      <h2 className="text-xl font-bold mb-4 text-center">Login Panel</h2>
      
      {/* User Type Selection Tabs */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setUserType('agent')}
          className={`flex-1 py-2 rounded-md transition-all duration-200 font-medium ${
            userType === 'agent'
              ? 'bg-[#f16f22] text-white shadow-md'
              : 'text-gray-600 hover:text-[#f16f22]'
          }`}
        >
          Agent Login
        </button>
        <button
          type="button"
          onClick={() => setUserType('employee')}
          className={`flex-1 py-2 rounded-md transition-all duration-200 font-medium ${
            userType === 'employee'
              ? 'bg-[#f16f22] text-white shadow-md'
              : 'text-gray-600 hover:text-[#f16f22]'
          }`}
        >
          Employee Login
        </button>
      </div>

      {/* User Type Indicator */}
      <div className="mb-4 text-sm text-center">
        <span className="text-gray-500">Logging in as: </span>
        <span className="font-semibold text-[#f16f22]">
          {userType === 'agent' ? 'Agent' : 'Employee'}
        </span>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[#f16f22] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-[#f16f22] outline-none pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#f16f22]"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f16f22] text-white py-2.5 rounded-lg hover:bg-[#d65a1e] transition duration-200 font-medium"
        >
          Login as {userType === 'agent' ? 'Agent' : 'Employee'}
        </button>
      </form>

      {/* Links Section */}
      <div className="mt-6 text-sm text-center space-y-2">
        <p>
          Don't have an account?{" "}
          <Link to="/registration-agent" className="text-[#f16f22] underline hover:text-[#d65a1e]">
            Register as Agent
          </Link>
        </p>
        <p>
          <Link to="/forgot-password-agent" className="text-[#f16f22] underline hover:text-[#d65a1e]">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AgentLogin;