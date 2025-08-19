import React from "react";
import { Globe, FileText, Users } from "lucide-react";

const ChannelPartners = () => {
  return (
    <div className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary">
        Channel Partners
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Left Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Top Left Card */}
          <div className="bg-gradient-to-r from-secondary to-primary text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center text-center">
            <p className="text-3xl font-bold">150+</p>
            <p className="text-lg">Student Nationalities</p>
          </div>

          {/* Right Big Image */}
          <div className="row-span-2 bg-white rounded-2xl overflow-hidden shadow-md">
            <img
              src="student-1.png"
              alt="Main Partner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left Small Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <img
              src="student-2.png"
              alt="Small Partner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side */}
        <div>
          <h4 className="text-sm text-secondary font-semibold mb-2">
            PARTNERS INSTITUTIONS
          </h4>
          <h3 className="text-xl md:text-3xl font-bold mb-6">
            How We Help Partner Institutions
          </h3>

          <ul className="space-y-5">
            <li className="flex items-start space-x-3">
              <Globe className="text-secondary w-6 h-6 mt-1" />
              <p>
                Diversify your enrolment with students from{" "}
                <span className="font-semibold">150+ nationalities</span>
              </p>
            </li>
            <li className="flex items-start space-x-3">
              <FileText className="text-secondary w-6 h-6 mt-1" />
              <p>
                Receive higher quality applications and improve{" "}
                <span className="font-semibold">conversion by 10%</span>
              </p>
            </li>
            <li className="flex items-start space-x-3">
              <Users className="text-secondary w-6 h-6 mt-1" />
              <p>
                Leverage proven technology to save time and{" "}
                <span className="font-semibold">
                  reduce manual processing by 40%
                </span>
              </p>
            </li>
          </ul>

          <button className="mt-8 bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-xl shadow-md transition">
            Partner with Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelPartners;
