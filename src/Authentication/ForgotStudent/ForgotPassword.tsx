import React, { useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📨 Sending request to:", `${BASE_URL}/forgot-password`);
      console.log("Payload:", { email });

      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) throw new Error(result.message || "Something went wrong");

      Swal.fire("Success", result.message, "success");
      setEmail("");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="mt-4 space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#f16f22] text-white py-2 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Back to Login?{" "}
          <Link to="/login" className="text-[#f16f22] underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
