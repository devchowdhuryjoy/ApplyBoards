import React, { useState } from "react";

const MultiStepFormPopup = ({ open, setOpen }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    program: "",
    address: "",
    passportNo: "",
    dob: "",
    gender: "",
    studyGap: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Final Submitted Data:", form);
    alert("Application Submitted!");
    setOpen(false);
    setStep(1);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-primary text-center">
              Step {step} of 2
            </h2>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4 mt-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="program"
                  placeholder="Program"
                  value={form.program}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-white py-3 rounded-lg mt-3"
                >
                  Next →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4 mt-4">
                <input
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="passportNo"
                  placeholder="Passport Number"
                  value={form.passportNo}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <input
                  name="studyGap"
                  placeholder="Study Gap (Years)"
                  value={form.studyGap}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => setStep(1)}
                    className="border px-4 py-2 rounded-lg"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default MultiStepFormPopup;
