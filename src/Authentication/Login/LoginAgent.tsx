import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${BASE_URL}/agent/login`, {
        method: "POST",
        body: formData,
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

      //Success
      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
        });

        //Save token + user
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: data.token,
            user: data.agent,
            user_type: "agent",
          }),
        );

        navigate("/agent-dashboard");
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

        <div className="mb-4 relative">
          <label className="block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 cursor-pointer text-black z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f16f22] text-white py-2 rounded hover:bg-[#d65a1e]"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/registration-agent" className="text-[#f16f22] underline">
          Register
        </Link>
      </p>

      <p className="text-sm text-center mt-2">
        <Link to="/forgot-password-agent" className="text-[#f16f22] underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default AgentLogin;
