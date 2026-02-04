import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("matsols_user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }

    // Dashboard Reveal
    gsap.from(".db-sidebar", { x: -300, duration: 1, ease: "power4.out" });
    gsap.from(".db-main-content", { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: "power2.out" });
    gsap.from(".stat-card", { 
        scale: 0.9, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.5, 
        delay: 0.5, 
        ease: "back.out(1.7)" 
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("matsols_user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>MATSOLS</span>
        </div>

        <nav className="db-nav">
          <Link to="/dashboard" className="db-nav-item active">
            <iconify-icon icon="ri:dashboard-line"></iconify-icon>
            Dashboard
          </Link>
          <Link to="#" className="db-nav-item">
            <iconify-icon icon="ri:file-list-3-line"></iconify-icon>
            My Applications
          </Link>
          <Link to="#" className="db-nav-item">
            <iconify-icon icon="ri:folder-shared-line"></iconify-icon>
            Documents
          </Link>
          <Link to="#" className="db-nav-item">
            <iconify-icon icon="ri:chat-voice-line"></iconify-icon>
            AI Conversations
          </Link>
          <div className="db-nav-divider"></div>
          <Link to="#" className="db-nav-item">
            <iconify-icon icon="ri:user-settings-line"></iconify-icon>
            Profile Settings
          </Link>
        </nav>

        <div className="db-sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            <iconify-icon icon="ri:logout-box-line"></iconify-icon>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="db-main-content">
        <header className="db-header">
          <div className="db-welcome">
            <h1>Hi, {user.name.split(' ')[0]} 👋</h1>
            <p>Welcome to your study abroad control center</p>
          </div>
          <div className="db-actions">
            <button className="btn-notif">
              <iconify-icon icon="ri:notification-3-line"></iconify-icon>
              <span className="badge"></span>
            </button>
            <div className="db-user-pill">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" />
              <span>{user.role.toUpperCase()}</span>
            </div>
          </div>
        </header>

        <div className="db-grid">
          {/* STATS */}
          <div className="db-stats-row">
            <div className="stat-card">
              <div className="stat-icon orange">
                <iconify-icon icon="ri:send-plane-fill"></iconify-icon>
              </div>
              <div className="stat-info">
                <h3>03</h3>
                <p>Apps Sent</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <iconify-icon icon="ri:checkbox-circle-fill"></iconify-icon>
              </div>
              <div className="stat-info">
                <h3>01</h3>
                <p>Offers Recieved</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <iconify-icon icon="ri:file-upload-fill"></iconify-icon>
              </div>
              <div className="stat-info">
                <h3>85%</h3>
                <p>Docs Ready</p>
              </div>
            </div>
          </div>

          {/* ACTIVE APPLICATIONS */}
          <div className="db-section">
            <div className="db-section-header">
              <h2>Active Applications</h2>
              <Link to="#" className="view-all">View All</Link>
            </div>
            <div className="app-card-list">
              <div className="app-card">
                <div className="app-logo">UCL</div>
                <div className="app-info">
                  <h4>University College London</h4>
                  <p>MSc Computer Science • 2026 Intake</p>
                </div>
                <div className="app-status pending">Under Review</div>
                <div className="app-arrow">
                  <iconify-icon icon="ri:arrow-right-s-line"></iconify-icon>
                </div>
              </div>
              <div className="app-card">
                <div className="app-logo km">KM</div>
                <div className="app-info">
                  <h4>King's College London</h4>
                  <p>MSc Artificial Intelligence • 2026 Intake</p>
                </div>
                <div className="app-status success">Offer Received</div>
                <div className="app-arrow">
                  <iconify-icon icon="ri:arrow-right-s-line"></iconify-icon>
                </div>
              </div>
            </div>
          </div>

          {/* DOCUMENT STATUS */}
          <div className="db-section">
            <div className="db-section-header">
              <h2>Required Documents</h2>
              <button className="btn-upload-sm">
                <iconify-icon icon="ri:upload-2-line"></iconify-icon>
                Upload New
              </button>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <iconify-icon icon="ri:file-pdf-2-line" className="doc-type"></iconify-icon>
                <div className="doc-info">
                  <p>Transcript_Final.pdf</p>
                  <span>Uploaded 2 days ago</span>
                </div>
                <div className="doc-status verified">
                  <iconify-icon icon="ri:checkbox-circle-line"></iconify-icon>
                  Verified
                </div>
              </div>
              <div className="doc-item">
                <iconify-icon icon="ri:file-text-line" className="doc-type"></iconify-icon>
                <div className="doc-info">
                  <p>Statement_of_Purpose.docx</p>
                  <span>Draft saved</span>
                </div>
                <div className="doc-status caution">
                  <iconify-icon icon="ri:error-warning-line"></iconify-icon>
                  Action Req
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
