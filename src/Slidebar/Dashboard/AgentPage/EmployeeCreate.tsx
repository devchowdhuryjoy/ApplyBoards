


// import { useState } from "react";
// import Swal from "sweetalert2";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// const EmployeeCreate = ({ onSuccess, onClose }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     permissions: [],
//   });

//   // These permissions should match your backend Spatie permissions
//   const permissionOptions = [
//     "Student Profile",
//     "All Student Data",
//     "Program and University",
//     "Application",
//     "Task",
//     "Announcements",
//   ];

//   // Map frontend permission names to backend permission keys
//   const permissionMapping = {
//     "Student Profile": "student.profile",
//     "All Student Data": "student.all",
//     "Program and University": "program.university",
//     "Application": "application",
//     "Task": "task",
//     "Announcements": "announcements",
//   };

//   // Get token from localStorage (from auth object)
//   const getToken = () => {
//     try {
//       const authData = localStorage.getItem("auth");
//       if (!authData) return null;
      
//       const parsed = JSON.parse(authData);
//       return parsed.token || null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((p) => p !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

//   const handleSelectAll = () => {
//     if (formData.permissions.length === permissionOptions.length) {
//       setFormData({ ...formData, permissions: [] });
//     } else {
//       setFormData({ ...formData, permissions: permissionOptions });
//     }
//   };

//   // API function to create employee with dynamic token
//   const createEmployeeAPI = async (employeeData) => {
//     const token = getToken();
    
//     if (!token) {
//       throw new Error("No authentication token found. Please login again.");
//     }

//     const myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     // Map frontend permissions to backend permission keys
//     const backendPermissions = employeeData.permissions.map(
//       perm => permissionMapping[perm] || perm.toLowerCase().replace(/\s+/g, '.')
//     );

//     const raw = JSON.stringify({
//       "name": employeeData.name,
//       "email": employeeData.email,
//       "password": employeeData.password,
//       "permissions": backendPermissions
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     const response = await fetch(`${BASE_URL}/agent/employee/create`, requestOptions);
//     const data = await response.json();
    
//     if (!response.ok) {
//       // Handle 401 Unauthorized - token expired
//       if (response.status === 401) {
//         localStorage.removeItem("auth"); // Clear invalid auth data
//         throw new Error("Session expired. Please login again.");
//       }
//       throw new Error(data.message || 'Failed to create employee');
//     }
    
//     return data;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check authentication first
//     const token = getToken();
//     if (!token) {
//       Swal.fire({
//         title: "Authentication Error",
//         text: "Please login again",
//         icon: "error",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "Go to Login",
//       }).then(() => {
//         // Redirect to login page if needed
//         // window.location.href = "/login";
//       });
//       return;
//     }
    
//     // Validate all fields
//     if (!formData.name || !formData.email || !formData.password) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please fill in all required fields",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please enter a valid email address",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate password
//     if (formData.password.length < 4) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Password must be at least 4 characters long",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate permissions
//     if (formData.permissions.length === 0) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please select at least one permission",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const employeeData = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         permissions: formData.permissions,
//       };

//       console.log("Submitting employee data:", employeeData);
//       console.log("Using BASE_URL:", BASE_URL);
      
//       const response = await createEmployeeAPI(employeeData);
      
//       // Show success message
//       await Swal.fire({
//         title: "Success!",
//         text: response.message || "Employee created successfully",
//         icon: "success",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//         timer: 2000,
//         timerProgressBar: true,
//       });
      
//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         permissions: [],
//       });
      
//       // Call onSuccess callback if provided
//       if (onSuccess) {
//         onSuccess(response.employee || response.data);
//       }
      
//       // Call onClose callback if provided
//       if (onClose) {
//         setTimeout(() => {
//           onClose();
//         }, 1500);
//       }
      
//     } catch (error) {
//       console.error("API Error:", error);
      
//       // Handle specific error messages
//       let errorMessage = "Failed to create employee";
      
//       if (error.message.includes("email") || error.message.includes("duplicate")) {
//         errorMessage = "This email is already registered";
//       } else if (error.message.includes("permission")) {
//         errorMessage = "Invalid permissions selected";
//       } else if (error.message.includes("token") || error.message.includes("Session expired")) {
//         errorMessage = "Your session has expired. Please login again.";
//       } else {
//         errorMessage = error.message || "An unexpected error occurred";
//       }
      
//       Swal.fire({
//         title: "Error!",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: errorMessage.includes("session") ? "Login Again" : "Try Again",
//       }).then((result) => {
//         if (errorMessage.includes("session") && result.isConfirmed) {
//           // Redirect to login page if needed
//           // window.location.href = "/login";
//         }
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Create Employee</h2>
//         {onClose && (
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             disabled={loading}
//           >
//             &times;
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter full name"
//             disabled={loading}
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter email address"
//             disabled={loading}
//           />
//         </div>

//         {/* Password Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none pr-10"
//               required
//               placeholder="Enter password"
//               minLength="4"
//               disabled={loading}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               disabled={loading}
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
//         </div>

//         {/* Permissions Section */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <label className="block text-sm font-medium">
//               Permissions <span className="text-red-500">*</span>
//             </label>
//             <button
//               type="button"
//               onClick={handleSelectAll}
//               className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {formData.permissions.length === permissionOptions.length
//                 ? "Deselect All"
//                 : "Select All"}
//             </button>
//           </div>

//           <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
//             {permissionOptions.map((permission) => (
//               <label
//                 key={permission}
//                 className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={formData.permissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                   className="w-4 h-4 text-orange-500"
//                   disabled={loading}
//                 />
//                 <span className="text-sm">{permission}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mt-2 text-sm text-gray-600">
//             {formData.permissions.length} permission(s) selected
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full md:w-auto mx-auto block bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Creating...
//               </span>
//             ) : (
//               "Create Employee"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EmployeeCreate;



// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

// const EmployeeCreate = ({ onSuccess, onClose }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userPermissions, setUserPermissions] = useState([]);
//   const [availablePermissions, setAvailablePermissions] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     permissions: [],
//   });

//   // Permission mapping based on your login response
//   const permissionMapping = {
//     // Student related permissions
//     "student.view.all": "All Student Data",
//     "student.create": "Student Create",
//     "student.view.by-agent": "Student View by Agent",
//     "student.edit": "Student Edit",
//     "student.update": "Student Update",
//     "student.delete": "Student Delete",
    
//     // Application related permissions
//     "application.view.info": "Application View Info",
//     "application.create": "Application Create",
//     "application.view.all": "Application View All",
//     "application.edit": "Application Edit",
//     "application.update": "Application Update",
//     "application.delete": "Application Delete",
//     "application.detail": "Application Detail",
    
//     // Task related permissions
//     "task.view": "Task View",
//     "task.update": "Task Update",
    
//     // Transaction related permissions
//     "transaction.view": "Transaction View",
    
//     // Employee related permissions
//     "employee.create": "Employee Create",
//     "employee.login": "Employee Login",
//     "employee.view": "Employee View",
    
//     // Agent profile
//     "agent.profile.view": "Agent Profile View",
//   };

//   // Get auth data from localStorage
//   const getAuthData = () => {
//     try {
//       const authData = localStorage.getItem("auth");
//       if (!authData) return null;
      
//       const parsed = JSON.parse(authData);
//       console.log("Raw auth data from localStorage:", parsed);
//       return parsed;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   };

//   // Load user permissions on component mount
//   useEffect(() => {
//     const authData = getAuthData();
    
//     if (authData && authData.user && authData.user.permissions) {
//       // Extract permission names from the user object
//       const permissionNames = authData.user.permissions.map(p => p.name);
//       setUserPermissions(permissionNames);
      
//       console.log("Extracted permission names:", permissionNames);
      
//       // Filter and map permissions that the user has to display names
//       const available = permissionNames
//         .map(perm => permissionMapping[perm])
//         .filter(perm => perm); // Remove undefined mappings
      
//       // Remove duplicates
//       const uniqueAvailable = [...new Set(available)];
//       setAvailablePermissions(uniqueAvailable);
      
//       console.log("Available permissions for assignment:", uniqueAvailable);
//     } else {
//       console.log("No permissions found in auth data");
//     }
//   }, []);

//   // Get token from localStorage (from auth object)
//   const getToken = () => {
//     try {
//       const authData = localStorage.getItem("auth");
//       if (!authData) return null;
      
//       const parsed = JSON.parse(authData);
//       return parsed.token || null;
//     } catch (error) {
//       console.error("Error parsing auth data:", error);
//       return null;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((p) => p !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

//   const handleSelectAll = () => {
//     if (formData.permissions.length === availablePermissions.length) {
//       setFormData({ ...formData, permissions: [] });
//     } else {
//       setFormData({ ...formData, permissions: availablePermissions });
//     }
//   };

//   // Reverse mapping (frontend display to backend permission)
//   const getBackendPermission = (displayPermission) => {
//     const reverseMap = {
//       "All Student Data": "student.view.all",
//       "Student Create": "student.create",
//       "Student View by Agent": "student.view.by-agent",
//       "Student Edit": "student.edit",
//       "Student Update": "student.update",
//       "Student Delete": "student.delete",
//       "Application View Info": "application.view.info",
//       "Application Create": "application.create",
//       "Application View All": "application.view.all",
//       "Application Edit": "application.edit",
//       "Application Update": "application.update",
//       "Application Delete": "application.delete",
//       "Application Detail": "application.detail",
//       "Task View": "task.view",
//       "Task Update": "task.update",
//       "Transaction View": "transaction.view",
//       "Employee Create": "employee.create",
//       "Employee Login": "employee.login",
//       "Employee View": "employee.view",
//       "Agent Profile View": "agent.profile.view",
//     };
//     return reverseMap[displayPermission] || displayPermission;
//   };

//   // API function to create employee with dynamic token
//   const createEmployeeAPI = async (employeeData) => {
//     const token = getToken();
    
//     if (!token) {
//       throw new Error("No authentication token found. Please login again.");
//     }

//     const myHeaders = new Headers();
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     // Map frontend permissions to backend permission keys
//     const backendPermissions = employeeData.permissions.map(
//       perm => getBackendPermission(perm)
//     );

//     const raw = JSON.stringify({
//       "name": employeeData.name,
//       "email": employeeData.email,
//       "password": employeeData.password,
//       "permissions": backendPermissions
//     });

//     console.log("Sending to API:", JSON.parse(raw));

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     const response = await fetch(`${BASE_URL}/agent/employee/create`, requestOptions);
//     const data = await response.json();
    
//     if (!response.ok) {
//       if (response.status === 401) {
//         localStorage.removeItem("auth");
//         throw new Error("Session expired. Please login again.");
//       }
//       throw new Error(data.message || 'Failed to create employee');
//     }
    
//     return data;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const token = getToken();
//     if (!token) {
//       Swal.fire({
//         title: "Authentication Error",
//         text: "Please login again",
//         icon: "error",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "Go to Login",
//       });
//       return;
//     }
    
//     // Validate all fields
//     if (!formData.name || !formData.email || !formData.password) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please fill in all required fields",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please enter a valid email address",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate password
//     if (formData.password.length < 4) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Password must be at least 4 characters long",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     // Validate permissions
//     if (formData.permissions.length === 0) {
//       Swal.fire({
//         title: "Warning!",
//         text: "Please select at least one permission",
//         icon: "warning",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const employeeData = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         permissions: formData.permissions,
//       };
      
//       const response = await createEmployeeAPI(employeeData);
      
//       await Swal.fire({
//         title: "Success!",
//         text: response.message || "Employee created successfully",
//         icon: "success",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "OK",
//         timer: 2000,
//         timerProgressBar: true,
//       });
      
//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         permissions: [],
//       });
      
//       if (onSuccess) {
//         onSuccess(response.employee || response.data);
//       }
      
//       if (onClose) {
//         setTimeout(() => {
//           onClose();
//         }, 1500);
//       }
      
//     } catch (error) {
//       console.error("API Error:", error);
      
//       let errorMessage = "Failed to create employee";
      
//       if (error.message.includes("email") || error.message.includes("duplicate")) {
//         errorMessage = "This email is already registered";
//       } else if (error.message.includes("permission")) {
//         errorMessage = "Invalid permissions selected";
//       } else if (error.message.includes("token") || error.message.includes("Session expired")) {
//         errorMessage = "Your session has expired. Please login again.";
//       } else {
//         errorMessage = error.message || "An unexpected error occurred";
//       }
      
//       Swal.fire({
//         title: "Error!",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonColor: "#f16f22",
//         confirmButtonText: "Try Again",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if user has employee.create permission
//   const canCreateEmployee = userPermissions.includes("employee.create");
  
//   console.log("User permissions array:", userPermissions);
//   console.log("Can create employee:", canCreateEmployee);

//   if (!canCreateEmployee) {
//     return (
//       <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
//         <div className="text-center py-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
//           <p className="text-gray-600">You don't have permission to create employees.</p>
//           <p className="text-sm text-gray-400 mt-2">Required permission: employee.create</p>
//           <p className="text-xs text-gray-400 mt-4">Debug: User permissions count: {userPermissions.length}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Create Employee</h2>
//         {onClose && (
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             disabled={loading}
//           >
//             &times;
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter full name"
//             disabled={loading}
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter email address"
//             disabled={loading}
//           />
//         </div>

//         {/* Password Field */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none pr-10"
//               required
//               placeholder="Enter password"
//               minLength="4"
//               disabled={loading}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               disabled={loading}
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
//         </div>

//         {/* Permissions Section */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <label className="block text-sm font-medium">
//               Permissions to Assign <span className="text-red-500">*</span>
//             </label>
//             {availablePermissions.length > 0 && (
//               <button
//                 type="button"
//                 onClick={handleSelectAll}
//                 className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
//                 disabled={loading}
//               >
//                 {formData.permissions.length === availablePermissions.length
//                   ? "Deselect All"
//                   : "Select All"}
//               </button>
//             )}
//           </div>

//           {availablePermissions.length > 0 ? (
//             <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
//               {availablePermissions.map((permission) => (
//                 <label
//                   key={permission}
//                   className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
//                     loading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={formData.permissions.includes(permission)}
//                     onChange={() => handlePermissionChange(permission)}
//                     className="w-4 h-4 text-orange-500"
//                     disabled={loading}
//                   />
//                   <span className="text-sm">{permission}</span>
//                 </label>
//               ))}
//             </div>
//           ) : (
//             <div className="border rounded-lg p-8 text-center">
//               <p className="text-gray-500">No permissions available to assign</p>
//               <p className="text-sm text-gray-400 mt-2">
//                 Your account doesn't have any permissions that can be assigned to employees.
//               </p>
//             </div>
//           )}

//           <div className="mt-2 text-sm text-gray-600">
//             {formData.permissions.length} permission(s) selected
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full md:w-auto mx-auto block bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || availablePermissions.length === 0}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Creating...
//               </span>
//             ) : (
//               "Create Employee"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EmployeeCreate;



import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const EmployeeCreate = ({ onSuccess, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [userType, setUserType] = useState('agent');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissions: [],
  });

  // Permission mapping based on your login response
  const permissionMapping = {
    // Student related permissions
    "student.view.all": "All Student Data",
    "student.create": "Student Create",
    "student.view.by-agent": "Student View by Agent",
    "student.edit": "Student Edit",
    "student.update": "Student Update",
    "student.delete": "Student Delete",
    
    // Application related permissions
    "application.view.info": "Application View Info",
    "application.create": "Application Create",
    "application.view.all": "Application View All",
    "application.edit": "Application Edit",
    "application.update": "Application Update",
    "application.delete": "Application Delete",
    "application.detail": "Application Detail",
    
    // Task related permissions
    "task.view": "Task View",
    "task.update": "Task Update",
    
    // Transaction related permissions
    "transaction.view": "Transaction View",
    
    // Employee related permissions
    "employee.create": "Employee Create",
    "employee.login": "Employee Login",
    "employee.view": "Employee View",
    
    // Agent profile
    "agent.profile.view": "Agent Profile View",
  };

  // Get auth data from localStorage
  const getAuthData = () => {
    try {
      const authData = localStorage.getItem("auth");
      if (!authData) return null;
      
      const parsed = JSON.parse(authData);
      console.log("Raw auth data from localStorage:", parsed);
      return parsed;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  };

  // Load user permissions on component mount
  useEffect(() => {
    const authData = getAuthData();
    
    if (authData) {
      // Check user type
      if (authData.user_type === 'employee' || authData.employee) {
        setUserType('employee');
        // Extract permissions from employee object
        const permissions = authData.employee?.permissions || authData.permissions || [];
        setUserPermissions(permissions);
        console.log("Employee permissions:", permissions);
      } else {
        setUserType('agent');
        // Extract permissions from user object (for agent)
        const permissions = authData.user?.permissions?.map(p => p.name) || [];
        setUserPermissions(permissions);
        console.log("Agent permissions:", permissions);
      }
    }
  }, []);

  // Update available permissions based on user permissions
  useEffect(() => {
    if (userPermissions.length > 0) {
      // Filter and map permissions that the user has to display names
      const available = userPermissions
        .map(perm => permissionMapping[perm])
        .filter(perm => perm); // Remove undefined mappings
      
      // Remove duplicates
      const uniqueAvailable = [...new Set(available)];
      setAvailablePermissions(uniqueAvailable);
      
      console.log("Available permissions for assignment:", uniqueAvailable);
    }
  }, [userPermissions]);

  // Get token from localStorage (from auth object)
  const getToken = () => {
    try {
      const authData = localStorage.getItem("auth");
      if (!authData) return null;
      
      const parsed = JSON.parse(authData);
      return parsed.token || parsed.access_token || null;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSelectAll = () => {
    if (formData.permissions.length === availablePermissions.length) {
      setFormData({ ...formData, permissions: [] });
    } else {
      setFormData({ ...formData, permissions: availablePermissions });
    }
  };

  // Reverse mapping (frontend display to backend permission)
  const getBackendPermission = (displayPermission) => {
    const reverseMap = {
      "All Student Data": "student.view.all",
      "Student Create": "student.create",
      "Student View by Agent": "student.view.by-agent",
      "Student Edit": "student.edit",
      "Student Update": "student.update",
      "Student Delete": "student.delete",
      "Application View Info": "application.view.info",
      "Application Create": "application.create",
      "Application View All": "application.view.all",
      "Application Edit": "application.edit",
      "Application Update": "application.update",
      "Application Delete": "application.delete",
      "Application Detail": "application.detail",
      "Task View": "task.view",
      "Task Update": "task.update",
      "Transaction View": "transaction.view",
      "Employee Create": "employee.create",
      "Employee Login": "employee.login",
      "Employee View": "employee.view",
      "Agent Profile View": "agent.profile.view",
    };
    return reverseMap[displayPermission] || displayPermission;
  };

  // API function to create employee with dynamic token
  const createEmployeeAPI = async (employeeData) => {
    const token = getToken();
    
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    // Map frontend permissions to backend permission keys
    const backendPermissions = employeeData.permissions.map(
      perm => getBackendPermission(perm)
    );

    const raw = JSON.stringify({
      "name": employeeData.name,
      "email": employeeData.email,
      "password": employeeData.password,
      "permissions": backendPermissions
    });

    console.log("Sending to API:", JSON.parse(raw));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch(`${BASE_URL}/agent/employee/create`, requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("auth");
        throw new Error("Session expired. Please login again.");
      }
      throw new Error(data.message || 'Failed to create employee');
    }
    
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = getToken();
    if (!token) {
      Swal.fire({
        title: "Authentication Error",
        text: "Please login again",
        icon: "error",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "Go to Login",
      });
      return;
    }
    
    // Validate all fields
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        title: "Warning!",
        text: "Please fill in all required fields",
        icon: "warning",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "Warning!",
        text: "Please enter a valid email address",
        icon: "warning",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate password
    if (formData.password.length < 4) {
      Swal.fire({
        title: "Warning!",
        text: "Password must be at least 4 characters long",
        icon: "warning",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate permissions
    if (formData.permissions.length === 0) {
      Swal.fire({
        title: "Warning!",
        text: "Please select at least one permission",
        icon: "warning",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    try {
      const employeeData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        permissions: formData.permissions,
      };
      
      const response = await createEmployeeAPI(employeeData);
      
      await Swal.fire({
        title: "Success!",
        text: response.message || "Employee created successfully",
        icon: "success",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        permissions: [],
      });
      
      if (onSuccess) {
        onSuccess(response.employee || response.data);
      }
      
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
      
    } catch (error) {
      console.error("API Error:", error);
      
      let errorMessage = "Failed to create employee";
      
      if (error.message.includes("email") || error.message.includes("duplicate")) {
        errorMessage = "This email is already registered";
      } else if (error.message.includes("permission")) {
        errorMessage = "Invalid permissions selected";
      } else if (error.message.includes("token") || error.message.includes("Session expired")) {
        errorMessage = "Your session has expired. Please login again.";
      } else {
        errorMessage = error.message || "An unexpected error occurred";
      }
      
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#f16f22",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user has employee.create permission
  const canCreateEmployee = userPermissions.includes("employee.create");
  
  console.log("User type:", userType);
  console.log("User permissions array:", userPermissions);
  console.log("Can create employee:", canCreateEmployee);

  // For agents, always show the form (they have all permissions)
  if (userType === 'agent') {
    // Agent can see all permissions
    return (
      <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Employee</h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              disabled={loading}
            >
              &times;
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none pr-10"
                required
                placeholder="Enter password"
                minLength="4"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
          </div>

          {/* Permissions Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">
                Permissions to Assign <span className="text-red-500">*</span>
              </label>
              {Object.values(permissionMapping).length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (formData.permissions.length === Object.values(permissionMapping).length) {
                      setFormData({ ...formData, permissions: [] });
                    } else {
                      setFormData({ ...formData, permissions: Object.values(permissionMapping) });
                    }
                  }}
                  className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {formData.permissions.length === Object.values(permissionMapping).length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              )}
            </div>

            <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
              {Object.values(permissionMapping).map((permission) => (
                <label
                  key={permission}
                  className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="w-4 h-4 text-orange-500"
                    disabled={loading}
                  />
                  <span className="text-sm">{permission}</span>
                </label>
              ))}
            </div>

            <div className="mt-2 text-sm text-gray-600">
              {formData.permissions.length} permission(s) selected
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto mx-auto block bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // For employees, check permission
  if (!canCreateEmployee) {
    return (
      <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to create employees.</p>
          <p className="text-sm text-gray-400 mt-2">Required permission: employee.create</p>
          <p className="text-xs text-gray-400 mt-4">Debug: User type: {userType}, Permissions count: {userPermissions.length}</p>
        </div>
      </div>
    );
  }

  // For employees with permission, show the form with their available permissions
  return (
    <div className="w-full mx-auto p-6 rounded-xl shadow-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Employee</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            disabled={loading}
          >
            &times;
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter full name"
            disabled={loading}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter email address"
            disabled={loading}
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none pr-10"
              required
              placeholder="Enter password"
              minLength="4"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
        </div>

        {/* Permissions Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium">
              Permissions to Assign <span className="text-red-500">*</span>
            </label>
            {availablePermissions.length > 0 && (
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {formData.permissions.length === availablePermissions.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            )}
          </div>

          {availablePermissions.length > 0 ? (
            <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <label
                  key={permission}
                  className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="w-4 h-4 text-orange-500"
                    disabled={loading}
                  />
                  <span className="text-sm">{permission}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <p className="text-gray-500">No permissions available to assign</p>
              <p className="text-sm text-gray-400 mt-2">
                Your account doesn't have any permissions that can be assigned to employees.
              </p>
            </div>
          )}

          <div className="mt-2 text-sm text-gray-600">
            {formData.permissions.length} permission(s) selected
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto mx-auto block bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || availablePermissions.length === 0}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Employee"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreate;