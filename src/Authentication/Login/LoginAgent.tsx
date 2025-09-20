// import React, { FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const LoginAgent: React.FC = () => {
//   const navigate = useNavigate();

//   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Static: after login → agent slidebar
//     navigate("/agent-dashboard");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//         onSubmit={handleLogin}
//       >
//         <h2 className="text-2xl font-bold mb-4">Agent Login</h2>

//         <input type="email" placeholder="Email" className="border p-2 w-full mb-3 rounded"/>
//         <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

//         <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
//           Login
//         </button>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/registration-agent" className="text-blue-600 underline">
//             Registration
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginAgent;

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/agent/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

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

      // ✅ Success
      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
        });

        localStorage.setItem("agent", JSON.stringify(data.agent));
        navigate("/agent-dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Agent Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/registration-agent" className="text-blue-600 underline">
          Register
        </Link>
      </p>

      <p className="text-sm text-center mt-2">
        <Link to="/forgot-password-agent" className="text-blue-600 underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default AgentLogin;
