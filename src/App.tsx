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
import ProgramSearch from "./components/Navbar/Students/ProgramSearch";

// ✅ Main layout with Navbar & Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

// ✅ Landing page sections
function HomePage() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Navbar & Footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/program-search"
          element={
            <MainLayout>
              <ProgramSearch />
            </MainLayout>
          }
        />

        {/* Auth pages without Navbar/Footer */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;



// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import Sidebar from "./Slidebar/Sidebar";
// import ProgramSearch from "./components/Navbar/Students/ProgramSearch";

// // ✅ Main landing layout
// function Layout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Fixed Navbar */}
//       <Navbar />
//       <Hero />
//       <FastestEasiest />
//       <FindProgram />
//       <SolutionSection />
//       <SolutionServices />
//       <Testimonials />
//       <TrustedPartners />
//       <Universities />
//       <ChannelPartners />
//       <RequirementPartnar />
//       <StudyProgramsBanner />
//       <JourneySection />
//       {/* Fixed Footer */}
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing page */}
//         <Route path="/" element={<Layout />} />

//         {/* Auth pages (NO Navbar/Footer here) */}
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/sidebar" element={<Sidebar />} />
//         <Route path="/program-search" element={<ProgramSearch />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

