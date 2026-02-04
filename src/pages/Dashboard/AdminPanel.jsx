import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./StudentDashboard.css"; // Reuse layout styles
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Leads");
  const navigate = useNavigate();

  useEffect(() => {
    // Reveal
    gsap.from(".db-sidebar", { x: -300, duration: 1, ease: "power4.out" });
    gsap.from(".db-main-content", { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: "power2.out" });
  }, []);

  const leads = [
    { name: "Sarah Ahmed", destination: "UK", intake: "Sept 2026", status: "Unverified", score: "High" },
    { name: "Zain Kabir", destination: "USA", intake: "Jan 2026", status: "Qualified", score: "Med" },
    { name: "Fatima Noor", destination: "Canada", intake: "Sept 2026", status: "New Lead", score: "High" },
    { name: "Omar Farooq", destination: "Australia", intake: "Sept 2026", status: "Disqualified", score: "Low" },
  ];

  return (
    <div className="dashboard-layout admin-layout">
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>ADMIN CTRL</span>
        </div>

        <nav className="db-nav">
          <button className={`db-nav-item ${activeTab === "Overview" ? "active" : ""}`} onClick={() => setActiveTab("Overview")}>
            <iconify-icon icon="ri:pie-chart-line"></iconify-icon>
            Global Overview
          </button>
          <button className={`db-nav-item ${activeTab === "Leads" ? "active" : ""}`} onClick={() => setActiveTab("Leads")}>
            <iconify-icon icon="ri:user-search-line"></iconify-icon>
            Lead Management
          </button>
          <button className={`db-nav-item ${activeTab === "Students" ? "active" : ""}`} onClick={() => setActiveTab("Students")}>
            <iconify-icon icon="ri:group-line"></iconify-icon>
            Registered Students
          </button>
          <button className={`db-nav-item ${activeTab === "Applications" ? "active" : ""}`} onClick={() => setActiveTab("Applications")}>
            <iconify-icon icon="ri:folders-line"></iconify-icon>
            Global Applications
          </button>
          <div className="db-nav-divider"></div>
          <button className={`db-nav-item ${activeTab === "Staff" ? "active" : ""}`} onClick={() => setActiveTab("Staff")}>
            <iconify-icon icon="ri:shield-user-line"></iconify-icon>
            Staff & Roles
          </button>
        </nav>

        <div className="db-sidebar-footer">
           <button className="btn-logout" onClick={() => navigate("/login")}>
            <iconify-icon icon="ri:logout-box-line"></iconify-icon>
            Exit Console
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="db-main-content">
        <header className="db-header">
          <div className="db-welcome">
            <h1>Operational Console</h1>
            <p>System monitoring and lead evaluation pipeline</p>
          </div>
          <div className="db-actions">
            <div className="search-bar-admin">
               <iconify-icon icon="ri:search-line"></iconify-icon>
               <input type="text" placeholder="Search students, emails, or IDs..." />
            </div>
          </div>
        </header>

        <div className="admin-stats-strip">
            <div className="a-stat">
                <span className="label">Total Leads</span>
                <span className="value">1,284</span>
                <span className="trend positive">+12% this week</span>
            </div>
            <div className="a-stat">
                <span className="label">Active Apps</span>
                <span className="value">456</span>
                <span className="trend positive">+5% this week</span>
            </div>
            <div className="a-stat">
                <span className="label">Conversion Rate</span>
                <span className="value">3.2%</span>
                <span className="trend negative">-0.4% from avg</span>
            </div>
        </div>

        <section className="admin-table-section">
            <div className="table-controls">
                <h2>{activeTab} Management</h2>
                <div className="table-actions">
                    <button className="btn-table-filter">
                        <iconify-icon icon="ri:filter-3-line"></iconify-icon>
                        Filters
                    </button>
                    <button className="btn-table-action orange">Export Data</button>
                </div>
            </div>

            <div className="admin-data-table-wrap">
                <table className="admin-data-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Destination</th>
                            <th>Intake</th>
                            <th>Lead Score</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((l, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="td-name">
                                        <div className="avatar">{l.name[0]}</div>
                                        <span>{l.name}</span>
                                    </div>
                                </td>
                                <td>{l.destination}</td>
                                <td>{l.intake}</td>
                                <td>
                                    <span className={`score-badge ${l.score.toLowerCase()}`}>{l.score}</span>
                                </td>
                                <td>
                                    <span className={`status-pill ${l.status.toLowerCase().replace(' ', '-')}`}>{l.status}</span>
                                </td>
                                <td>
                                    <button className="btn-row-view">Review</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
