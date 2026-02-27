import { Link } from "react-router-dom";
import "./Dashboard.css";

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="dash-welcome">
        <h2 className="welcome-title">Welcome back, Haram! 👋</h2>
        <p className="welcome-subtitle">Here's what's happening with your applications today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="label">Total Applications</span>
            <span className="value">3</span>
          </div>
          <div className="stat-icon blue">
            <iconify-icon icon="ri:file-list-3-fill"></iconify-icon>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="label">In Progress</span>
            <span className="value">1</span>
          </div>
          <div className="stat-icon orange">
            <iconify-icon icon="ri:time-fill"></iconify-icon>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="label">Offers Received</span>
            <span className="value">1</span>
          </div>
          <div className="stat-icon green">
            <iconify-icon icon="ri:checkbox-circle-fill"></iconify-icon>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="label">Action Required</span>
            <span className="value">2</span>
          </div>
          <div className="stat-icon purple">
            <iconify-icon icon="ri:alert-fill"></iconify-icon>
          </div>
        </div>
      </div>

      {/* Application Tracker - Highlight */}
      <section className="tracker-section">
        <div className="section-header">
          <h3>Application Status: Imperial College London</h3>
          <Link to="/dashboard/applications" className="btn-sm">View Details &rarr;</Link>
        </div>
        
        <div className="app-tracker">
          <div className="steps-container">
            <div className="progress-bar">
              {/* 60% Width for "Under Review" */}
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            
            <div className="step-item completed">
              <div className="step-circle"><iconify-icon icon="ri:check-line"></iconify-icon></div>
              <span className="step-label">Submitted</span>
            </div>
            <div className="step-item completed">
              <div className="step-circle"><iconify-icon icon="ri:check-line"></iconify-icon></div>
              <span className="step-label">Documents Verified</span>
            </div>
            <div className="step-item current">
              <div className="step-circle">3</div>
              <span className="step-label">Under Review</span>
            </div>
            <div className="step-item">
              <div className="step-circle">4</div>
              <span className="step-label">Offer Decision</span>
            </div>
            <div className="step-item">
              <div className="step-circle">5</div>
              <span className="step-label">Visa Process</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Action Items & Documents */}
      <div className="dashboard-grid">
        {/* Todo List */}
        <div className="card">
          <div className="card-header">
            <h4>Action Items</h4>
          </div>
          <div className="todo-list">
            <div className="todo-item">
              <div className="todo-check"></div>
              <div className="todo-content">
                <div className="todo-title">Upload Passport Copy</div>
                <div className="todo-desc">Required for Imperial College Application</div>
              </div>
              <div className="todo-action" onClick={() => alert("Opening file picker...")}>Upload</div>
            </div>
            <div className="todo-item">
              <div className="todo-check"></div>
              <div className="todo-content">
                <div className="todo-title">Complete Profile Information</div>
                <div className="todo-desc">Add your emergency contact details</div>
              </div>
              <div className="todo-action" onClick={() => window.location.href='/dashboard/settings'}>Complete</div>
            </div>
            <div className="todo-item">
              <div className="todo-check checked"><iconify-icon icon="ri:check-line"></iconify-icon></div>
              <div className="todo-content">
                <div className="todo-title" style={{textDecoration: 'line-through', opacity: 0.6}}>Review SOP Draft</div>
                <div className="todo-desc">Completed on Oct 24, 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="card">
          <div className="card-header">
            <h4>Recent Documents</h4>
            <Link to="/dashboard/documents" className="btn-sm">View All</Link>
          </div>
          <div className="doc-list">
            <div className="doc-item">
              <div className="doc-icon">
                <iconify-icon icon="ri:file-pdf-line"></iconify-icon>
              </div>
              <div className="doc-info">
                <div className="doc-name">Offer_Letter.pdf</div>
                <div className="doc-status">Verified</div>
              </div>
            </div>
            <div className="doc-item">
              <div className="doc-icon">
                <iconify-icon icon="ri:file-text-line"></iconify-icon>
              </div>
              <div className="doc-info">
                <div className="doc-name">SOP_Final_v2.docx</div>
                <div className="doc-status pending">Pending Review</div>
              </div>
            </div>
            <div className="doc-item">
              <div className="doc-icon">
                <iconify-icon icon="ri:image-line"></iconify-icon>
              </div>
              <div className="doc-info">
                <div className="doc-name">IELTS_Score.jpg</div>
                <div className="doc-status">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
