import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role?: string;
  message: string;
  title: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Arabelle A.",
    title: "Like an answer from heaven",
    message:
      "I tried [applying to institutions] and it took months, and months, and months for me to get an answer from a school. But then I stumbled upon Study XL, and it was like an answer from heaven.",
    image: "https://i.ibb.co/r2mF8Vd/woman1.jpg", // replace with real
  },
  {
    name: "Krupal P.",
    title: "All thanks to Study XL",
    message:
      "I wanted to make my parents proud, and they are proud — all thanks to Study XL.",
    image: "https://i.ibb.co/1GmHnRg/woman2.jpg", // replace with real
  },
  {
    name: "Michael T.",
    title: "Made my dream possible",
    message:
      "With Study XL, I got guidance at every step. The process became so much easier, and I finally got accepted into my dream program!",
    image: "https://i.ibb.co/txPCKpb/man1.jpg", // replace with real
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-primary">
            What Our Students Have to Say
          </h2>
          <p className="text-black mt-2">
            Hear from real international students about their experience.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6">
            {[testimonials[current], testimonials[(current + 1) % testimonials.length]].map(
              (t, i) => (
                <div
                  key={i}
                  className="bg-blue-50 p-6 rounded-xl shadow-sm flex flex-col justify-between"
                >
                  <Quote className="text-blue-600 w-8 h-8 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{t.message}</p>
                  <div className="flex items-center mt-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <span className="font-semibold text-gray-900">{t.name}</span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
