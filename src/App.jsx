import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import UniversityAdmissions from "./pages/UniversityAdmissions";
import CourseMatching from "./pages/CourseMatching";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-offer" element={<Services />} />
        <Route path="/what-we-offer/university-admissions" element={<UniversityAdmissions />} />
        <Route path="/what-we-offer/course-matching" element={<CourseMatching />} />
      </Routes>
    </Router>
  );
}

export default App;
