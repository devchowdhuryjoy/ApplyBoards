import React, { useState, useEffect } from "react";
import { studentAPI } from "../../AgentPage/services/api";
import Swal from "sweetalert2";

const nationalityOptions = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirati",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakh",
  "Kenyan",
  "Kiribati",
  "Korean",
  "Kosovan",
  "Kuwaiti",
  "Kyrgyz",
  "Lao",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealand",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Philippine",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamese",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbek",
  "Vanuatuan",
  "Vatican",
  "Venezuelan",
  "Vietnamese",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];

// Complete list of countries
const countryOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error = null,
  disabled = false,
}) => (
  <div className="w-full">
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select option",
  disabled = false,
}) => (
  <div className="w-full">
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const PersonalDetails = ({ goToSection, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.first_name || "",
    lastName: initialData.family_name || "",
    email: initialData.email || "",
    countryCode: initialData.country_code || "+880",
    mobile: initialData.phone || "",
    dob: initialData.date_of_birth || "",
    gender: initialData.gender || "",
    nationality: initialData.nationality || "",
    countryOfBirth: initialData.country_of_birth || "",
    nativeLanguage: initialData.native_language || "",
    appearsPassport: initialData.appears_passport || "",
    passportIssueLocation: initialData.passport_issue_location || "",
    passportNumber: initialData.passport_number || "",
    passportIssueDate: initialData.issue_date || "",
    passportExpiryDate: initialData.expiry_date || "",
    permanentCountry: initialData.permanent_country || "",
    permanentAddress1: initialData.permanent_address1 || "",
    permanentAddress2: initialData.permanent_address2 || "",
    permanentPostcode: initialData.postal_code || "",
    permanentState: initialData.state_territory || "",
    permanentCity: initialData.city || "",
    sameAddress:
      initialData.same_address !== undefined ? initialData.same_address : false,
    currentCountry: initialData.country_of_residence || "",
    currentAddress1: initialData.current_address_1 || "",
    currentAddress2: initialData.current_address_2 || "",
    currentPostcode: initialData.current_postal_code || "",
    currentState: initialData.current_state_territory || "",
    currentCity: initialData.current_city || "",
    emergencyName: initialData.emergency_contact_name || "",
    emergencyRelationship: initialData.emergency_contact_relationship || "",
    emergencyPhone: initialData.emergency_contact_phone || "",
    emergencyEmail: initialData.emergency_contact_email || "",
  });

  const [errors, setErrors] = useState({});

  // Load saved data on component mount
  useEffect(() => {
    const savedData = studentAPI.getFromStorage();
    if (savedData.personal) {
      const personal = savedData.personal;
      setFormData((prev) => ({
        ...prev,
        firstName: personal.first_name || prev.firstName,
        lastName: personal.family_name || prev.lastName,
        email: personal.email || prev.email,
        mobile: personal.phone || prev.mobile,
        gender: personal.gender || prev.gender,
        nationality: personal.nationality || prev.nationality,
        dob: personal.date_of_birth || prev.dob,
        countryOfBirth: personal.country_of_birth || prev.countryOfBirth,
        nativeLanguage: personal.native_language || prev.nativeLanguage,

        appearsPassport: personal.appears_passport || prev.appearsPassport,
        passportIssueLocation:
          personal.passport_issue_location || prev.passportIssueLocation,
        passportNumber: personal.passport_number || prev.passportNumber,
        passportIssueDate: personal.issue_date || prev.passportIssueDate,
        passportExpiryDate: personal.expiry_date || prev.passportExpiryDate,
        permanentCountry: personal.permanent_country || prev.permanentCountry,
        permanentAddress1:
          personal.permanent_address1 || prev.permanentAddress1,
        permanentAddress2:
          personal.permanent_address2 || prev.permanentAddress2,
        permanentPostcode: personal.postal_code || prev.permanentPostcode,
        permanentState: personal.state_territory || prev.permanentState,
        permanentCity: personal.city || prev.permanentCity,
        currentCountry: personal.country_of_residence || prev.currentCountry,
        currentAddress1: personal.current_address_1 || prev.currentAddress1,
        currentAddress2: personal.current_address_2 || prev.currentAddress2,
        currentPostcode: personal.current_postal_code || prev.currentPostcode,
        currentState: personal.current_state_territory || prev.currentState,
        currentCity: personal.current_city || prev.currentCity,
        emergencyName: personal.emergency_contact_name || prev.emergencyName,
        emergencyRelationship:
          personal.emergency_contact_relationship || prev.emergencyRelationship,
        emergencyPhone: personal.emergency_contact_phone || prev.emergencyPhone,
        emergencyEmail: personal.emergency_contact_email || prev.emergencyEmail,
      }));
    }
  }, []);

  // Validate passport dates
  const validatePassportDates = () => {
    const newErrors = {};

    if (formData.passportIssueDate && formData.passportExpiryDate) {
      const issueDate = new Date(formData.passportIssueDate);
      const expiryDate = new Date(formData.passportExpiryDate);

      if (expiryDate <= issueDate) {
        newErrors.passportExpiryDate = "Expiry date must be after issue date";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    //Same address checkbox logic
    if (type === "checkbox" && name === "sameAddress") {
      setFormData((prev) => ({
        ...prev,
        sameAddress: checked,
        currentCountry: checked ? prev.permanentCountry : "",
        currentAddress1: checked ? prev.permanentAddress1 : "",
        currentAddress2: checked ? prev.permanentAddress2 : "",
        currentPostcode: checked ? prev.permanentPostcode : "",
        currentState: checked ? prev.permanentState : "",
        currentCity: checked ? prev.permanentCity : "",
      }));
      return;
    }

    // Normal input change (Unlimited characters)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error if exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const dateErrors = validatePassportDates();
    setErrors(dateErrors);
    return Object.keys(dateErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      // alert('Please fix the errors before saving');
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors before saving",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Prepare data in the format expected by API
    const personalData = {
      first_name: formData.firstName,
      family_name: formData.lastName,
      email: formData.email,
      phone: formData.mobile,
      gender: formData.gender,
      nationality: formData.nationality,
      date_of_birth: formData.dob,
      country_of_birth: formData.countryOfBirth,
      native_language: formData.nativeLanguage,
      appears_passport: formData.appearsPassport,
      passport_issue_location: formData.passportIssueLocation,
      passport_number: formData.passportNumber,
      issue_date: formData.passportIssueDate,
      expiry_date: formData.passportExpiryDate,
      permanent_country: formData.permanentCountry,
      permanent_address1: formData.permanentAddress1,
      permanent_address2: formData.permanentAddress2,
      postal_code: formData.permanentPostcode,
      state_territory: formData.permanentState,
      city: formData.permanentCity,
      same_address: formData.sameAddress,
      country_of_residence: formData.currentCountry,
      current_address_1: formData.currentAddress1,
      current_address_2: formData.currentAddress2,
      current_postal_code: formData.currentPostcode,
      current_state_territory: formData.currentState,
      current_city: formData.currentCity,
      emergency_contact_name: formData.emergencyName,
      emergency_contact_relationship: formData.emergencyRelationship,
      emergency_contact_phone: formData.emergencyPhone,
      emergency_contact_email: formData.emergencyEmail,
    };

    // Save to localStorage
    studentAPI.saveToStorage("personal", personalData);

    // Notify parent if needed
    if (onSave) {
      onSave("personal", personalData);
    }

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Personal details saved successfully!",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors before continuing",
        confirmButtonColor: "#d33",
      });
      return;
    }

    handleSave();

    await Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Personal details saved successfully!",
      timer: 1200,
      showConfirmButton: false,
    });

    goToSection("education");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-800">
            Personal information
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-2/3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="First name*"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Family name*"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputField
                label="Email*"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="w-full">
                <label className="block text-xs text-gray-500 mb-1">
                  Mobile number*
                </label>
                <div className="flex">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter number"
                    className="w-full border-t border-b border-r border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <InputField
                label="Date of birth*"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <SelectField
                label="Gender*"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
                placeholder="Select Gender"
              />

              <div className="mb-4">
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nationality*
                </label>
                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-900"
                >
                  <option value="">Select Nationality</option>
                  {nationalityOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <SelectField
                label="Country of birth*"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
                options={countryOptions}
                placeholder="Select Country"
              />

              <InputField
                label="Native language"
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={handleChange}
              />
            </div>

            <InputField
              label="Name as it appears in passport"
              name="appearsPassport"
              value={formData.appearsPassport}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="Passport issue location"
                name="passportIssueLocation"
                value={formData.passportIssueLocation}
                onChange={handleChange}
              />
              <InputField
                label="Passport number"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
              />
              <InputField
                label="Issue date"
                name="passportIssueDate"
                type="date"
                value={formData.passportIssueDate}
                onChange={handleChange}
              />
              <InputField
                label="Expiry date"
                name="passportExpiryDate"
                type="date"
                value={formData.passportExpiryDate}
                onChange={handleChange}
                error={errors.passportExpiryDate}
              />
            </div>

            {/* Permanent Address */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-4">Permanent address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <SelectField
                  label="Country*"
                  name="permanentCountry"
                  value={formData.permanentCountry}
                  onChange={handleChange}
                  options={countryOptions}
                  placeholder="Select Country"
                />

                <InputField
                  label="Address 1*"
                  name="permanentAddress1"
                  value={formData.permanentAddress1}
                  onChange={handleChange}
                />
                <InputField
                  label="Address 2"
                  name="permanentAddress2"
                  value={formData.permanentAddress2}
                  onChange={handleChange}
                />
                <InputField
                  label="Post code*"
                  name="permanentPostcode"
                  value={formData.permanentPostcode}
                  onChange={handleChange}
                />
                <InputField
                  label="State*"
                  name="permanentState"
                  value={formData.permanentState}
                  onChange={handleChange}
                />
                <InputField
                  label="City*"
                  name="permanentCity"
                  value={formData.permanentCity}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Current Address */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Current address</h3>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Same as permanent address</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <SelectField
                  label="Country*"
                  name="currentCountry"
                  value={formData.currentCountry}
                  onChange={handleChange}
                  options={countryOptions}
                  placeholder="Select Country"
                  disabled={formData.sameAddress}
                />
                <InputField
                  label="Address 1*"
                  name="currentAddress1"
                  value={formData.currentAddress1}
                  onChange={handleChange}
                />
                <InputField
                  label="Address 2"
                  name="currentAddress2"
                  value={formData.currentAddress2}
                  onChange={handleChange}
                />
                <InputField
                  label="Post code*"
                  name="currentPostcode"
                  value={formData.currentPostcode}
                  onChange={handleChange}
                />
                <InputField
                  label="State*"
                  name="currentState"
                  value={formData.currentState}
                  onChange={handleChange}
                />
                <InputField
                  label="City*"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  label="Contact name*"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                />
                <InputField
                  label="Relationship*"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                />
                <InputField
                  label="Phone*"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                />
                <InputField
                  label="Email*"
                  name="emergencyEmail"
                  type="email"
                  value={formData.emergencyEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Save & Continue Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t">
              <button
                onClick={handleSave}
                className="bg-blue-900 text-white md:px-8 px-4 md:py-3 py-2 rounded-md hover:bg-blue-800"
              >
                Save
              </button>
              <button
                onClick={handleContinue}
                className="bg-blue-900 text-white md:px-8 px-4 md:py-3 py-2 rounded-md"
              >
                Continue to next section →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
