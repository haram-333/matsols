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
import AdminLayout from "./layouts/AdminLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import MyApplications from "./pages/Dashboard/MyApplications";
import StudentUniversitySearch from "./pages/Dashboard/StudentUniversitySearch";
import StudentUniversityDetail from "./pages/Dashboard/StudentUniversityDetail";
import Documents from "./pages/Dashboard/Documents";
import Messages from "./pages/Dashboard/Messages";
import Settings from "./pages/Dashboard/Settings";
import AdminOverview from "./pages/Admin/AdminOverview";
import LeadManagement from "./pages/Admin/LeadManagement";
import UniversityManagement from "./pages/Admin/UniversityManagement";
import UpdatesManagement from "./pages/Admin/UpdatesManagement";
import ApplicationManagement from "./pages/Admin/ApplicationManagement";
import DegreeManagement from "./pages/Admin/DegreeManagement";
import SystemSettings from "./pages/Admin/SystemSettings";
import UserManagement from "./pages/Admin/UserManagement";
import FreeConsultation from "./pages/FreeConsultation";
import UniversitySearch from "./pages/UniversitySearch";
import UniversityDetail from "./pages/UniversityDetail";
import DegreeListing from "./pages/DegreeListing";
import DegreeDetail from "./pages/DegreeDetail";
import ScrollToTop from "./components/ScrollToTop";
import AIChat from "./components/AIChat";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <AuthProvider>
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
          <Route path="/universities" element={<UniversitySearch />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/degrees" element={<DegreeListing />} />
          <Route path="/degrees/:slug" element={<DegreeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="STUDENT">
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="universities" element={<StudentUniversitySearch />} />
            <Route path="universities/:id" element={<StudentUniversityDetail />} />
            <Route path="documents" element={<Documents />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute requiredRole={["ADMIN", "EDITOR", "MARKETING"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminOverview />} />
            <Route path="leads" element={
              <ProtectedRoute requiredRole={["ADMIN", "MARKETING"]}>
                <LeadManagement />
              </ProtectedRoute>
            } />
            <Route path="applications" element={
              <ProtectedRoute requiredRole={["ADMIN"]}>
                <ApplicationManagement />
              </ProtectedRoute>
            } />
            <Route path="updates" element={
              <ProtectedRoute requiredRole={["ADMIN", "EDITOR"]}>
                <UpdatesManagement />
              </ProtectedRoute>
            } />
            <Route path="universities" element={
              <ProtectedRoute requiredRole={["ADMIN", "EDITOR"]}>
                <UniversityManagement />
              </ProtectedRoute>
            } />
            <Route path="degrees" element={
              <ProtectedRoute requiredRole={["ADMIN", "EDITOR"]}>
                <DegreeManagement />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole={["ADMIN"]}>
                <SystemSettings />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute requiredRole={["ADMIN"]}>
                <UserManagement />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/free-consultation" element={<FreeConsultation />} />
        </Routes>
        {/* <AIChat /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
