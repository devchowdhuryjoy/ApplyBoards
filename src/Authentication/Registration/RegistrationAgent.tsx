import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const RegistrationAgent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    prefix: "Mr",
    first_name: "",
    last_name: "",
    company_name: "",
    job_title: "",
    country_dialing_code: "",
    phone_number: "",
    email: "",
    finance_email: "",
    password: "",
    street_address: "",
    street_address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    director_prefix: "Mr",
    director_first_name: "",
    director_last_name: "",
    director_job_title: "",
    director_dialing_code: "",
    director_phone: "",
    director_email: "",
    students_per_year: "",
    destinations: [],
    other_destination: "",
    litigation_status: "",
    litigation_details: "",
    australia_recruitment: "",
    australia_details: "",
    other_institutions: "",
    college_students: "",
    creative_students: "",
    university_prep: "",
    adult_english: "",
    junior_english: "",
    direct_university: "",
    company_year: "",
    branch_offices: "",
    counsellors: "",
    icef_id: "",
    source_info: "",
    why_oxford: "",
    referee_prefix: "Mr",
    referee_first_name: "",
    referee_last_name: "",
    referee_company: "",
    referee_email: "",
    referee_dialing_code: "",
    referee_phone: "",
    referee_website: "",
  });

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [showOtherInput, setShowOtherInput] = useState(false);

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Destination checkbox
  const handleDestinationChange = (destination: string) => {
    let updated: string[] = [];
    if (selectedDestinations.includes(destination)) {
      updated = selectedDestinations.filter((d) => d !== destination);
    } else {
      updated = [...selectedDestinations, destination];
    }
    setSelectedDestinations(updated);
    setFormData((prev: any) => ({
      ...prev,
      destinations: updated,
    }));

    if (destination === "Other") {
      setShowOtherInput(!selectedDestinations.includes("Other"));
    }
  };

  // Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ====== Auto prepend +880 if missing ======
    const updatedFormData = { ...formData };

    // Agent phone
    if (!updatedFormData.phone_number.startsWith("+880")) {
      updatedFormData.phone_number =
        "+880" + updatedFormData.phone_number.replace(/^0+/, "");
    }
    if (!updatedFormData.country_dialing_code) {
      updatedFormData.country_dialing_code = "+880";
    }

    // Director phone
    if (!updatedFormData.director_phone_number?.startsWith("+880")) {
      updatedFormData.director_phone_number =
        "+880" +
        (updatedFormData.director_phone_number || "").replace(/^0+/, "");
    }
    if (!updatedFormData.director_dialing_code) {
      updatedFormData.director_dialing_code = "+880";
    }

    // Referee phone
    if (!updatedFormData.referee_phone?.startsWith("+880")) {
      updatedFormData.referee_phone =
        "+880" + (updatedFormData.referee_phone || "").replace(/^0+/, "");
    }
    if (!updatedFormData.referee_dialing_code) {
      updatedFormData.referee_dialing_code = "+880";
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/agents/register`,
        updatedFormData
      );
      if (res.data.status) {
        // changed from res.data.success to res.data.status
        Swal.fire("Success", "Registration completed successfully!", "success");
        navigate("/login-agent");
      } else {
        Swal.fire("Error", res.data.message || "Something went wrong", "error");
      }
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Server error",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white mb-10">
      {/* Banner */}
      <div className="text-black py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          Become an agent
        </h1>
        <p className="max-w-3xl mx-auto leading-relaxed text-justify hyphens-auto">
          With our 30-year history, we have built strong relationships with over
          5000 recruitment partners, providing educational opportunities for
          students from over 100 countries. If you would like to partner with
          Oxford International please complete the below form and a
          representative will contact you as soon as possible.
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-8 px-4">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
          onSubmit={handleSubmit}
        >
          {/* ==== Agent Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Agent Details</h2>
          <hr className="mb-4" />

          {/* Prefix + Name */}
          <div className="flex gap-2 mb-4">
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Phone */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="country_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="email"
            name="finance_email"
            value={formData.finance_email}
            onChange={handleChange}
            placeholder="Finance Email"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Address */}
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            placeholder="Street Address"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="street_address_line2"
            value={formData.street_address_line2}
            onChange={handleChange}
            placeholder="Street Address Line 2"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Director Details ==== */}
          <h2 className="text-xl font-semibold mb-2">Director Details</h2>
          <hr className="mb-4" />

          <div className="flex gap-2 mb-4">
            <select
              name="director_prefix"
              value={formData.director_prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="director_first_name"
              value={formData.director_first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="director_last_name"
              value={formData.director_last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>

          <input
            type="text"
            name="director_job_title"
            value={formData.director_job_title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="director_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="director_phone_number"
              value={formData.director_phone_number}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="email"
            name="director_email"
            value={formData.director_email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Company Info ==== */}
          <h2 className="text-xl font-semibold mb-2">Company Information</h2>
          <hr className="mb-4" />

          <input
            type="text"
            name="trading_name"
            value={formData.trading_name}
            onChange={handleChange}
            placeholder="Trading Name"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="students_per_year"
            value={formData.students_per_year}
            onChange={handleChange}
            placeholder="Students per year"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Destinations */}
          <label className="block text-sm font-medium mb-1">Destinations</label>
          <div className="flex flex-col gap-2 mb-4">
            {["UK", "USA", "Canada", "Australia", "Other"].map((d) => (
              <label key={d} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.destinations.includes(d)}
                  onChange={() => handleDestinationChange(d)}
                />
                {d}
              </label>
            ))}
          </div>
          {showOtherInput && (
            <input
              type="text"
              name="other_destination"
              value={formData.other_destination}
              onChange={handleChange}
              placeholder="Other Destination"
              className="border p-2 rounded w-full mb-4"
            />
          )}

          {/* Litigation */}
          <textarea
            name="litigation"
            value={formData.litigation}
            onChange={handleChange}
            placeholder="Litigation Status"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="litigation_details"
            value={formData.litigation_details}
            onChange={handleChange}
            placeholder="Litigation Details"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Australia Recruitment */}
          <textarea
            name="australia_recruitment"
            value={formData.australia_recruitment}
            onChange={handleChange}
            placeholder="Recruitment for Australia"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="australia_recruitment_details"
            value={formData.australia_recruitment_details}
            onChange={handleChange}
            placeholder="Details"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Institutions */}
          <textarea
            name="institutions"
            value={formData.institutions}
            onChange={handleChange}
            placeholder="Institutions you represent"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Services */}
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <hr className="mb-4" />
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College Students"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="creative_course"
            value={formData.creative_course}
            onChange={handleChange}
            placeholder="Creative Course"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="university_preparation"
            value={formData.university_preparation}
            onChange={handleChange}
            placeholder="University Preparation"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="adult_english"
            value={formData.adult_english}
            onChange={handleChange}
            placeholder="Adult English"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="junior_english"
            value={formData.junior_english}
            onChange={handleChange}
            placeholder="Junior English"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="direct_entry"
            value={formData.direct_entry}
            onChange={handleChange}
            placeholder="Direct University Entry"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Company Stats */}
          <input
            type="number"
            name="year_established"
            value={formData.year_established}
            onChange={handleChange}
            placeholder="Year Established"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="branch_offices"
            value={formData.branch_offices}
            onChange={handleChange}
            placeholder="Branch Offices"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            name="counsellors"
            value={formData.counsellors}
            onChange={handleChange}
            placeholder="No. of Counsellors"
            className="border p-2 rounded w-full mb-4"
          />

          <input
            type="text"
            name="icef_id"
            value={formData.icef_id}
            onChange={handleChange}
            placeholder="ICEF ID"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="hear_about"
            value={formData.hear_about}
            onChange={handleChange}
            placeholder="How did you hear about us?"
            className="border p-2 rounded w-full mb-4"
          />
          <textarea
            name="why_oxford"
            value={formData.why_oxford}
            onChange={handleChange}
            placeholder="Why choose Oxford?"
            className="border p-2 rounded w-full mb-4"
          />

          {/* ==== Referee ==== */}
          <h2 className="text-xl font-semibold mb-2">References</h2>
          <hr className="mb-4" />
          <div className="flex gap-2 mb-4">
            <select
              name="referee_prefix"
              value={formData.referee_prefix}
              onChange={handleChange}
              className="border p-2 rounded w-1/4"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
              <option>Dr</option>
            </select>
            <input
              type="text"
              name="referee_first_name"
              value={formData.referee_first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              name="referee_last_name"
              value={formData.referee_last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded w-1/2"
            />
          </div>
          <input
            type="text"
            name="referee_company"
            value={formData.referee_company}
            onChange={handleChange}
            placeholder="Company"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="email"
            name="referee_email"
            value={formData.referee_email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="referee_dialing_code"
              value="+880"
              readOnly
              className="border p-2 rounded w-1/3 bg-gray-200"
            />
            <input
              type="text"
              name="referee_phone"
              value={formData.referee_phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded w-2/3"
            />
          </div>

          <input
            type="url"
            name="referee_website"
            value={formData.referee_website}
            onChange={handleChange}
            placeholder="Website"
            className="border p-2 rounded w-full mb-4"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded w-full"
          >
            Register as Agent
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-agent" className="text-[#f16f22] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationAgent;
