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
import RegistrationAgent from "./Authentication/Registration/RegistrationAgent";
import LoginAgent from "./Authentication/Login/LoginAgent";
import AgentDashboard from "./Slidebar/Dashboard/AgentDashboard";
import University from "./components/Navbar/University/University";
import Agent from "./components/Navbar/Agent/Agent";
import UkPage from "./components/Navbar/StudyDestination/UkPage";
import UsaPage from "./components/Navbar/StudyDestination/UsaPage";
import CanadaPage from "./components/Navbar/StudyDestination/CanadaPage";
import AustraliaPage from "./components/Navbar/StudyDestination/AustraliaPage";




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
        <Route
          path="/university"
          element={
            <MainLayout>
              <University />
            </MainLayout>
          }
        />
        <Route
          path="/agent"
          element={
            <MainLayout>
              <Agent />
            </MainLayout>
          }
        />
        <Route
          path="/uk"
          element={
            <MainLayout>
              <UkPage />
            </MainLayout>
          }
        />
        <Route
          path="/usa"
          element={
            <MainLayout>
              <UsaPage />
            </MainLayout>
          }
        />
        <Route
          path="/canada"
          element={
            <MainLayout>
              <CanadaPage />
            </MainLayout>
          }
        />
        <Route
          path="/australia"
          element={
            <MainLayout>
              <AustraliaPage />
            </MainLayout>
          }
        />

        {/* Auth pages without Navbar/Footer */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration-agent" element={<RegistrationAgent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-agent" element={<LoginAgent />} />
        <Route path="/sidebar" element={<Sidebar />} />
        
        {/* Agent Dashboard */}
        <Route path="/agent-dashboard" element={<AgentDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;











