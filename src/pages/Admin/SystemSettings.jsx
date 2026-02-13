import React from 'react';

const SystemSettings = () => {
  return (
    <div className="admin-content">
      <div className="admin-header">
        <div className="admin-title">
          <h1>System Settings</h1>
          <p>Manage portal configuration and staff access.</p>
        </div>
      </div>

      <div className="admin-stats-grid" style={{ marginTop: '24px' }}>
        <div className="admin-stat-card">
          <h4>Portal Configuration</h4>
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Master Maintenance Mode</label>
            <input type="checkbox" />
          </div>
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>AI Agent Visibility</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

        <div className="admin-stat-card">
          <h4>Security</h4>
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Two-Factor Authentication</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Staff IP Filtering</label>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
