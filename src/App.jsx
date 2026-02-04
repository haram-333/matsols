import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import UniversityAdmissions from "./pages/UniversityAdmissions";
import CourseMatching from "./pages/CourseMatching";
import VisaSupport from "./pages/VisaSupport";
import InstitutionalRepresentation from "./pages/InstitutionalRepresentation";
import FAQ from "./pages/FAQ";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import AdminPanel from "./pages/Dashboard/AdminPanel";
import StaffPortal from "./pages/Dashboard/StaffPortal";
import ScrollToTop from "./components/ScrollToTop";
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
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/staff" element={<StaffPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
