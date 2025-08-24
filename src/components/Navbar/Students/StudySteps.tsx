import { useState } from "react";
import { UserPlus, Mail, Lock } from "lucide-react";

const steps = [
  { id: 1, title: "Register", content: "Sign Up for Free", desc: "Register for an account, then share your education goals to get tailored recommendations. It only takes a few minutes!" },
  { id: 2, title: "Search", content: "Find Your Program", desc: "Browse thousands of programs worldwide and pick the one that fits your academic goals." },
  { id: 3, title: "Apply", content: "Submit Your Application", desc: "Apply to multiple universities with just one application form." },
  { id: 4, title: "Funding", content: "Explore Scholarships", desc: "Find scholarships and funding opportunities to support your study journey." },
  { id: 5, title: "Payments", content: "Secure Payment Options", desc: "Pay your tuition fees safely and conveniently online." },
  { id: 6, title: "Visa", content: "Visa Guidance", desc: "Get expert advice and step-by-step help for your student visa application." },
];

const StudySteps = () => {

     const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <section className="w-full px-6 md:px-12 lg:px-20 py-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
        6 Steps to Study Success
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`px-6 py-2 rounded-full border transition font-medium ${
                  activeStep === step.id
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="space-y-4 text-center lg:text-left border rounded-2xl p-4">
            <p className="uppercase text-primary font-semibold tracking-wide underline">
              {steps[activeStep - 1].title}
            </p>
            <h3 className="text-2xl font-bold text-black">
              {steps[activeStep - 1].content}
            </h3>
            <p className="text-black leading-relaxed text-justify">
              {steps[activeStep - 1].desc}
            </p>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex justify-center">
          {/* Main form card */}
          <div className="bg-white border rounded-2xl shadow-lg w-80 p-6 relative z-10">
            <h3 className="text-lg font-semibold mb-4">Sign Up</h3>
            <div className="space-y-3">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <UserPlus className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>
              <button className="w-full bg-primary hover:bg-secondary transition text-white rounded-lg py-2 font-medium">
                Create Account
              </button>
            </div>
          </div>

          {/* Floating icons on the right */}
          {/* <div className="absolute right-[-60px] top-8 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-md">
              ✅
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
              ⏰
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md">
              ⚙️
            </div>
          </div> */}
        </div>
      </div>
    </section>
    </>
  )
}

export default StudySteps
