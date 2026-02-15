import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.message || "Something went wrong",
        });
        return;
      }

      // Success
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: result.message || "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Token + user save
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: result.data.token,
          user: result.data.user,
          user_type: "student",
        }),
      );

      setTimeout(() => navigate("/sidebar"), 2000);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
          {/* <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
          <div className="relative">
            <label className="block text-sm mb-1">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 pr-12"
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
            disabled={loading}
            className="w-full bg-[#f16f22] text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/registration" className="text-[#f16f22] underline">
            Register
          </Link>
        </p>
        <p className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="text-[#f16f22] underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
