import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/admin" className="admin-logo">
            <iconify-icon icon="ri:government-line" style={{fontSize: '24px'}}></iconify-icon>
            MATSOLS HUB
          </Link>
          <button className="sidebar-close md-show" onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:close-line"></iconify-icon>
          </button>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:pie-chart-line"></iconify-icon>
            Analytics Overview
          </Link>
          <Link to="/admin/leads" className={`admin-nav-item ${isActive('/admin/leads') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:user-follow-line"></iconify-icon>
            Student Leads
          </Link>
          <Link to="/admin/updates" className={`admin-nav-item ${isActive('/admin/updates') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:notification-3-line"></iconify-icon>
            Updates & Insights
          </Link>
          <Link to="/admin/universities" className={`admin-nav-item ${isActive('/admin/universities') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:bank-line"></iconify-icon>
            University Management
          </Link>
          <Link to="/admin/settings" className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:settings-line"></iconify-icon>
            System Settings
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', padding: '30px' }}>
          <Link to="/" className="btn-apply" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
            View Public Site
          </Link>
        </div>
      </aside>

      <div className="admin-content-wrapper">
        <header className="admin-top-bar md-show">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(true)}>
            <iconify-icon icon="ri:menu-2-line"></iconify-icon>
          </button>
          <span className="portal-name">Staff Portal</span>
        </header>

      <main className="admin-main">
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default AdminLayout;
