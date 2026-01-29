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
import ForgotPassword from "./Authentication/ForgotStudent/ForgotPassword";
import ResetPassword from "./Authentication/ForgotStudent/ResetPassword";
import AgentForgotPassword from "./Authentication/AgentForgot/AgentForgotPassword";
import AgentResetPassword from "./Authentication/AgentForgot/AgentResetPassword";
import AboutUniversity from "./components/TrustedPartners/AboutUniversity/AboutUniversity";
import UniversityApply from "./components/TrustedPartners/AboutUniversity/UniversityApply";
import ProgramDetails from "./components/TrustedPartners/AboutUniversity/ProgramDetails";
import CreateApplicationForm from "./components/TrustedPartners/CreateApplicationForm/CreateApplicationForm";
import ProgramUniversity from "./components/ProgramUniversity/ProgramUniversity";
import AgentFinalApply from "./Slidebar/FinalApply/AgentFinalApply";
import HungaryPage from "./components/Navbar/StudyDestination/HungaryPage";
// import AgentProgramDetails from "./components/TrustedPartners/CreateApplicationForm/AgentProgramDetails";
import { NotificationProvider } from "./Slidebar/contexts/NotificationContext";

//Main layout with Navbar & Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

//Landing page sections
function HomePage() {
  return (
    <>
      <Hero />
      <FastestEasiest />
      <FindProgram />
      <SolutionSection />
      <SolutionServices />
      <Testimonials />
      <ChannelPartners />
      <RequirementPartnar />
      <StudyProgramsBanner />
      <JourneySection />
    </>
  );
}

function App() {
  return (
    <NotificationProvider>
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
            path="/about-university/:id"
            element={
              <MainLayout>
                <AboutUniversity />
              </MainLayout>
            }
          />
          <Route
            path="/university-apply"
            element={
              <MainLayout>
                <UniversityApply />
              </MainLayout>
            }
          />
          <Route
            path="/create-application-form"
            element={
              <MainLayout>
                <CreateApplicationForm />
              </MainLayout>
            }
          />

          <Route
            path="/program-details"
            element={
              <MainLayout>
                <ProgramDetails />
              </MainLayout>
            }
          />

          <Route
            path="/program-university/:id"
            element={
              <MainLayout>
                <ProgramUniversity />
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
            path="/agent-final-apply/:id" 
            element={<AgentFinalApply />}
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
          <Route
            path="/hungary"
            element={
              <MainLayout>
                <HungaryPage />
              </MainLayout>
            }
          />

          {/* Auth pages WITH Navbar & Footer */}
          <Route
            path="/registration"
            element={
              <MainLayout>
                <Registration />
              </MainLayout>
            }
          />

          <Route
            path="/registration-agent"
            element={
              <MainLayout>
                <RegistrationAgent />
              </MainLayout>
            }
          />

          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <MainLayout>
                <ForgotPassword />
              </MainLayout>
            }
          />

          <Route
            path="/reset-password"
            element={
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            }
          />

          <Route
            path="/login-agent"
            element={
              <MainLayout>
                <LoginAgent />
              </MainLayout>
            }
          />

          <Route
            path="/forgot-password-agent"
            element={
              <MainLayout>
                <AgentForgotPassword />
              </MainLayout>
            }
          />

          <Route
            path="/agent-reset-password"
            element={
              <MainLayout>
                <AgentResetPassword />
              </MainLayout>
            }
          />

          {/* Student Dashboard - WITH notifications */}
          <Route path="/sidebar" element={<Sidebar />} />

          {/* Agent Dashboard - WITH notifications */}
          <Route 
            path="/agent-dashboard" 
            element={<AgentDashboard />}
          />
          
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;