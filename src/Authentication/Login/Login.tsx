import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formdata = new FormData();
  //     formdata.append("email", email);
  //     formdata.append("password", password);

  //     const requestOptions: RequestInit = {
  //       method: "POST",
  //       body: formdata,
  //       redirect: "follow",
  //     };

  //     const response = await fetch(`${BASE_URL}/login`, requestOptions);
  //     const result = await response.json();

  //     if (!response.ok) {

  //       Swal.fire({
  //         icon: "error",
  //         title: "Login Failed",
  //         text: result.message || "Something went wrong",
  //       });
  //       return;
  //     }

  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Successful",
  //       text: result.message || "Welcome back!",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     localStorage.setItem("auth", JSON.stringify(result));

  //     setTimeout(() => navigate("/sidebar"), 2000);
  //   } catch (err: any) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: err.message || "Something went wrong",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        })
      );

      setTimeout(() => navigate("/sidebar"), 2000);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
