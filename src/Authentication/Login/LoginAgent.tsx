import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginAgent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Static: after login → agent slidebar
    navigate("/agent-dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Agent Login</h2>

        <input type="email" placeholder="Email" className="border p-2 w-full mb-3 rounded"/>
        <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/registration-agent" className="text-blue-600 underline">
            Registration
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginAgent;
