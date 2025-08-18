import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Banner/Hero";
import FastestEasiest from "./components/FastestandEasiest/FastestEasiest";
import FindProgram from "./components/FindProgram/FindProgram";
// import Footer from "./components/Footer/Footer";
// import Registration from "./Authentication/Registration/Registration";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />
        <Hero />
        <FastestEasiest />
        <FindProgram />

        {/* Page content (grows and scrolls if needed) */}
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/registration" element={<Registration />} /> */}
          </Routes>
        </main>

        {/* Fixed Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;

