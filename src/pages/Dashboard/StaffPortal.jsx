import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./StudentDashboard.css"; // Reuse layout
import "./AdminPanel.css"; // Reuse table styles

const StaffPortal = () => {
  const [activeTab, setActiveTab] = useState("Assigned Leads");
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".db-sidebar", { x: -300, duration: 1, ease: "power4.out" });
    gsap.from(".db-main-content", { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: "power2.out" });
  }, []);

  const tasks = [
    { student: "Sarah Ahmed", task: "Verify Passport", priority: "High", due: "Today" },
    { student: "Zain Kabir", task: "Call Schedule", priority: "Med", due: "Tomorrow" },
    { student: "Fatima Noor", task: "Missing Transcript", priority: "High", due: "Today" },
  ];

  return (
    <div className="dashboard-layout staff-layout">
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>STAFF DRIVE</span>
        </div>

        <nav className="db-nav">
          <button className={`db-nav-item ${activeTab === "My Tasks" ? "active" : ""}`} onClick={() => setActiveTab("My Tasks")}>
            <iconify-icon icon="ri:task-line"></iconify-icon>
            My Daily Tasks
          </button>
          <button className={`db-nav-item ${activeTab === "Assigned Leads" ? "active" : ""}`} onClick={() => setActiveTab("Assigned Leads")}>
            <iconify-icon icon="ri:user-follow-line"></iconify-icon>
            Assigned Students
          </button>
          <button className={`db-nav-item ${activeTab === "Comms" ? "active" : ""}`} onClick={() => setActiveTab("Comms")}>
            <iconify-icon icon="ri:chat-3-line"></iconify-icon>
            External Comms
          </button>
          <div className="db-nav-divider"></div>
          <button className="db-nav-item">
            <iconify-icon icon="ri:settings-3-line"></iconify-icon>
            My Settings
          </button>
        </nav>

        <div className="db-sidebar-footer">
          <button className="btn-logout" onClick={() => navigate("/login")}>
            <iconify-icon icon="ri:logout-box-line"></iconify-icon>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="db-main-content">
        <header className="db-header">
          <div className="db-welcome">
            <h1>Staff Workspace</h1>
            <p>Operational follow-up and verification queue</p>
          </div>
          <div className="db-actions">
             <div className="staff-stats-mini">
                <div className="s-mini">
                    <span className="label">Tasks Today</span>
                    <span className="value">12 / 15</span>
                </div>
             </div>
          </div>
        </header>

        <div className="staff-grid">
            <div className="staff-section full-width">
                <div className="db-section-header">
                    <h2>Operational Tasks Queue</h2>
                    <div className="table-actions">
                        <button className="btn-table-filter">Priority: High First</button>
                    </div>
                </div>

                <div className="admin-data-table-wrap">
                    <table className="admin-data-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Required Action</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((t, i) => (
                                <tr key={i}>
                                    <td><strong>{t.student}</strong></td>
                                    <td>{t.task}</td>
                                    <td>
                                        <span className={`score-badge ${t.priority.toLowerCase()}`}>{t.priority}</span>
                                    </td>
                                    <td>{t.due}</td>
                                    <td><span className="status-pill unverified">In Progress</span></td>
                                    <td>
                                        <button className="btn-row-view">Complete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default StaffPortal;
