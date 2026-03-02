import { useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EmployeeCreate = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });

  const roleOptions = [
    "Student Profile",
    "All Student Data",
    "Program and University",
    "Application",
    "Task",
    "Announcements",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSelectAll = () => {
    if (formData.roles.length === roleOptions.length) {
      setFormData({ ...formData, roles: [] });
    } else {
      setFormData({ ...formData, roles: roleOptions });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    Swal.fire({
      title: "Success!",
      text: "Employee Created Successfully (Design Only)",
      icon: "success",
      confirmButtonColor: "#f16f22",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="w-full max-w-5xl  mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter email address"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter your phone number"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 ">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={value}
            onChange={onChange}
            className="mb-5 w-full border rounded px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            minLength="4"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>

        {/* Roles */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium">Roles</label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-secondary"
            >
              {formData.roles.length === roleOptions.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            {roleOptions.map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{role}</span>
              </label>
            ))}
          </div>

          <div className="mt-2 text-sm text-black">
            {formData.roles.length} roles selected
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="block mx-auto bg-primary text-white px-8 py-2 rounded hover:bg-secondary transition"
          >
            Create Employee
          </button>
        </div>

      </form>
    </div>
  );
};

export default EmployeeCreate;
