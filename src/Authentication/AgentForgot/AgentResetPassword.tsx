import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const AgentResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailFromLink = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !emailFromLink) {
      Swal.fire("Error", "Invalid password reset link", "error");
    }
  }, [token, emailFromLink]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/agent/reset_password_submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: emailFromLink,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Something went wrong");

      Swal.fire("Success", result.message, "success");
      navigate("/agent-login");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center">Agent Reset Password</h2>
        <form onSubmit={handleResetPassword} className="mt-4 space-y-3">
          <input
            type="email"
            value={emailFromLink}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f16f22] text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentResetPassword;



