import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import UniversityAdmissions from "./pages/UniversityAdmissions";
import CourseMatching from "./pages/CourseMatching";
import VisaSupport from "./pages/VisaSupport";
import InstitutionalRepresentation from "./pages/InstitutionalRepresentation";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import FreeConsultation from "./pages/FreeConsultation";
import ScrollToTop from "./components/ScrollToTop";
import AIChat from "./components/AIChat";
import "./index.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-offer" element={<Services />} />
        <Route path="/what-we-offer/university-admissions" element={<UniversityAdmissions />} />
        <Route path="/what-we-offer/course-matching" element={<CourseMatching />} />
        <Route path="/what-we-offer/visa-support" element={<VisaSupport />} />
        <Route path="/what-we-offer/institutional-representation" element={<InstitutionalRepresentation />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          {/* Add more nested dashboard routes here later */}
        </Route>
        
        <Route path="/free-consultation" element={<FreeConsultation />} />
      </Routes>
      <AIChat />
    </Router>
  );
}

export default App;
