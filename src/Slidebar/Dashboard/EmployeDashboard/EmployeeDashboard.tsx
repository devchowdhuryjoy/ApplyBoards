
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgentDashboard from "../AgentDashboard";


const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    // Check if user is employee
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      if (parsed.user_type !== 'employee') {
        // If not employee, redirect to agent dashboard
        navigate("/agent-dashboard");
      } else {
        setIsEmployee(true);
      }
    } else {
      navigate("/agent-login");
    }
  }, [navigate]);

  if (!isEmployee) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f16f22] mx-auto"></div>
          <p className="mt-4 text-black">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <AgentDashboard />;
};

export default EmployeeDashboard;