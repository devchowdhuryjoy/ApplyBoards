import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationAgent: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Static behavior: after submit → go to login-agent
    navigate("/login-agent");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Agent Registration</h2>

        <input type="text" placeholder="Full Name" className="border p-2 w-full mb-3 rounded"/>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-3 rounded"/>
        <input type="text" placeholder="Agency Name" className="border p-2 w-full mb-3 rounded"/>
        <input type="password" placeholder="Password" className="border p-2 w-full mb-3 rounded"/>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
          Register as Agent
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login-agent" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>

      
    </div>
  );
};

export default RegistrationAgent;
