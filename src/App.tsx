// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Banner/Hero";
// import FastestEasiest from "./components/FastestandEasiest/FastestEasiest";
// import FindProgram from "./components/FindProgram/FindProgram";
// import SolutionSection from "./components/SolutionSection/SolutionSection";
// import SolutionServices from "./components/SolutionSection/SolutionServices";
// import Testimonials from "./components/Testimonials/Testimonials";
// import TrustedPartners from "./components/TrustedPartners/TrustedPartners";
// import Universities from "./components/TrustedPartners/Universities";
// import ChannelPartners from "./components/ChannelPartners/ChannelPartners";
// import RequirementPartnar from "./components/RequirementPartnar/RequirementPartnar";
// import StudyProgramsBanner from "./components/StudyProgramsBanner/StudyProgramsBanner";
// import JourneySection from "./components/JourneySection/JourneySection";
// import Footer from "./components/Footer/Footer";
// import Registration from "./Authentication/Registration/Registration";
// import Login from "./Authentication/Login/Login";


// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         {/* Fixed Navbar */}
//         <Navbar />
//         <Hero />
//         <FastestEasiest />
//         <FindProgram />
//         <SolutionSection />
//         <SolutionServices />
//         <Testimonials />
//         <TrustedPartners />
//         <Universities />
//         <ChannelPartners />
//         <RequirementPartnar />
//         <StudyProgramsBanner />
//         <JourneySection />

//         {/* Page content (grows and scrolls if needed) */}
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </main>

//         {/* Fixed Footer */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Banner/Hero";
import FastestEasiest from "./components/FastestandEasiest/FastestEasiest";
import FindProgram from "./components/FindProgram/FindProgram";
import SolutionSection from "./components/SolutionSection/SolutionSection";
import SolutionServices from "./components/SolutionSection/SolutionServices";
import Testimonials from "./components/Testimonials/Testimonials";
import TrustedPartners from "./components/TrustedPartners/TrustedPartners";
import Universities from "./components/TrustedPartners/Universities";
import ChannelPartners from "./components/ChannelPartners/ChannelPartners";
import RequirementPartnar from "./components/RequirementPartnar/RequirementPartnar";
import StudyProgramsBanner from "./components/StudyProgramsBanner/StudyProgramsBanner";
import JourneySection from "./components/JourneySection/JourneySection";
import Footer from "./components/Footer/Footer";
import Registration from "./Authentication/Registration/Registration";
import Login from "./Authentication/Login/Login";
import Sidebar from "./Slidebar/Sidebar";

// ✅ Main landing layout
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />
      <Hero />
      <FastestEasiest />
      <FindProgram />
      <SolutionSection />
      <SolutionServices />
      <Testimonials />
      <TrustedPartners />
      <Universities />
      <ChannelPartners />
      <RequirementPartnar />
      <StudyProgramsBanner />
      <JourneySection />
      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Layout />} />

        {/* Auth pages (NO Navbar/Footer here) */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;

