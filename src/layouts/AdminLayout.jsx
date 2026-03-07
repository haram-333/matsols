import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Redirect Editor away from Analytics Overview to Updates
    if (user?.role === 'EDITOR' && location.pathname === '/admin') {
      window.location.href = '/admin/updates';
    }
  }, [location.pathname, user?.role]);

  const hasRole = (roles) => roles.includes(user?.role);

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/admin" className="admin-logo">
            <iconify-icon icon="ri:government-line" style={{ fontSize: '24px' }}></iconify-icon>
            MATSOLS HUB
          </Link>
          <button className="sidebar-close md-show" onClick={() => setIsSidebarOpen(false)}>
            <iconify-icon icon="ri:close-line"></iconify-icon>
          </button>
        </div>

        <nav className="admin-nav">
          {hasRole(['ADMIN', 'MARKETING']) && (
            <Link to="/admin" className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
              <iconify-icon icon="ri:pie-chart-line"></iconify-icon>
              Analytics Overview
            </Link>
          )}

          {hasRole(['ADMIN', 'MARKETING']) && (
            <Link to="/admin/leads" className={`admin-nav-item ${isActive('/admin/leads') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
              <iconify-icon icon="ri:user-follow-line"></iconify-icon>
              Student Leads
            </Link>
          )}

          {hasRole(['ADMIN']) && (
            <Link to="/admin/applications" className={`admin-nav-item ${isActive('/admin/applications') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
              <iconify-icon icon="ri:file-list-3-line"></iconify-icon>
              App Management
            </Link>
          )}

          {hasRole(['ADMIN', 'EDITOR']) && (
            <>
              <Link to="/admin/updates" className={`admin-nav-item ${isActive('/admin/updates') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <iconify-icon icon="ri:notification-3-line"></iconify-icon>
                Updates & Insights
              </Link>
              <Link to="/admin/universities" className={`admin-nav-item ${isActive('/admin/universities') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <iconify-icon icon="ri:bank-line"></iconify-icon>
                University Management
              </Link>
              <Link to="/admin/degrees" className={`admin-nav-item ${isActive('/admin/degrees') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <iconify-icon icon="ri:briefcase-line"></iconify-icon>
                Degree Management
              </Link>
            </>
          )}

          {hasRole(['ADMIN']) && (
            <>
              <Link to="/admin/users" className={`admin-nav-item ${isActive('/admin/users') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <iconify-icon icon="ri:user-settings-line"></iconify-icon>
                Staff & Roles
              </Link>
              <Link to="/admin/settings" className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <iconify-icon icon="ri:settings-line"></iconify-icon>
                System Settings
              </Link>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto', padding: '30px' }}>
          <Link to="/" className="btn-apply" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '10px' }}>
            View Public Site
          </Link>
          <button onClick={logout} className="btn-apply" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: '#ff3b30', color: 'white', border: 'none', cursor: 'pointer' }}>
            <iconify-icon icon="ri:logout-box-r-line"></iconify-icon> Logout
          </button>
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
