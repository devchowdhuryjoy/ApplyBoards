import React from 'react';

const stats = [
  {
    icon: '🎓',
    value: '1.3M+',
    label: 'Students Helped',
    color: 'text-blue-600',
  },
  {
    icon: '🌐',
    value: '140,000+',
    label: 'Global Programs',
    color: 'text-pink-500',
  },
  {
    icon: '🏛️',
    value: '1,500+',
    label: 'Institutions Globally',
    color: 'text-green-500',
  },
  {
    icon: '🏳️',
    value: '150+',
    label: 'Nationalities',
    color: 'text-orange-500',
  },
  {
    icon: '👥',
    value: '10+',
    label: 'Years of Expertise',
    color: 'text-purple-500',
  },
];

const FastestEasiest: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-snug">
          The Fastest and Easiest Way <br className="hidden md:block" /> to Successfully Study Abroad
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg py-8 px-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className={`text-4xl mb-4 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-black mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FastestEasiest;

