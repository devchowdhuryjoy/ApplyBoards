import JourneySection from "../../JourneySection/JourneySection";

const Agent = () => {
  const agentText = `
To work as an agent, you must meet certain requirements and conditions. You need to be committed and willing to apply your skills effectively. Being proactive and motivated is essential for success in this role. Understanding the company's policies and guidelines is a must. You should be able to communicate clearly with clients and team members. Patience and persistence are key qualities for a professional agent. Managing your time efficiently will help you achieve better results. Staying organized ensures that all tasks are completed on schedule. You must be ready to handle challenges and unexpected situations calmly. Continuous learning and improvement are encouraged to grow in your career. Ethical behavior and honesty are fundamental principles for an agent. Building strong relationships with clients is vital for long-term success. Listening actively to client needs will help you provide better solutions. Being adaptable allows you to work effectively in different scenarios. Sharing knowledge and helping teammates strengthens the overall team. Keeping accurate records and reports is part of your responsibilities. Professionalism in every interaction reflects positively on the company. Applying for this role shows your willingness to take on responsibilities. Follow-up and feedback help in improving service quality. Being a successful agent requires dedication, focus, and consistency.
  `;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Agent Text */}
      <div className="bg-white shadow rounded-lg p-6 text-justify hyphens-auto">
        <p>{agentText}</p>
      </div>

      {/* Journey Section */}
      <JourneySection />
    </div>
  );
};

export default Agent;
