import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    aiAgentVisible: true,
    twoFactorAuth: false,
    staffIpFiltering: false,
    supportEmail: '',
    supportPhone: '',
    siteName: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await apiService.getSettings();
      if (data) setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const result = await apiService.updateSettings(settings);
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Critical connection error.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="fuckin-loader-overlay">
      <div className="fuckin-loader"></div>
      <div className="loader-text">Loading Portal Configuration...</div>
    </div>
  );

  return (
    <div className="admin-content fade-in">
      <div className="admin-header">
        <div className="admin-title">
          <h1>System Settings</h1>
          <p>Manage portal configuration, security, and global contact information.</p>
        </div>
        <button
          className={`btn-apply ${saving ? 'loading' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color: message.type === 'success' ? '#16a34a' : '#ef4444',
          border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {message.text}
        </div>
      )}

      <div className="admin-stats-grid" style={{ marginTop: '24px' }}>
        {/* Portal Configuration */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <iconify-icon icon="ri:settings-4-line" style={{ fontSize: '24px', color: '#06b6d4' }}></iconify-icon>
            <h3 style={{ margin: 0 }}>Portal Configuration</h3>
          </div>

          <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Master Maintenance Mode</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Disable access for all non-admin users.</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.maintenanceMode} onChange={() => handleToggle('maintenanceMode')} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: '600' }}>AI Agent Visibility</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Show or hide the MATSOLS AI Advisor.</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.aiAgentVisible} onChange={() => handleToggle('aiAgentVisible')} />
              <span className="slider round"></span>
            </label>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Global Site Name</label>
            <input
              type="text"
              name="siteName"
              className="ai-input"
              value={settings.siteName}
              onChange={handleChange}
              placeholder="e.g. MATSOLS Platform"
            />
          </div>
        </div>

        {/* Contact & Support */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <iconify-icon icon="ri:customer-service-2-line" style={{ fontSize: '24px', color: '#f59e0b' }}></iconify-icon>
            <h3 style={{ margin: 0 }}>Support & Contact</h3>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Support Email</label>
            <input
              type="email"
              name="supportEmail"
              className="ai-input"
              value={settings.supportEmail}
              onChange={handleChange}
              placeholder="support@company.com"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Support Phone</label>
            <input
              type="text"
              name="supportPhone"
              className="ai-input"
              value={settings.supportPhone}
              onChange={handleChange}
              placeholder="+44 123 456 789"
            />
          </div>
        </div>

        {/* Security */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <iconify-icon icon="ri:shield-keyhole-line" style={{ fontSize: '24px', color: '#10b981' }}></iconify-icon>
            <h3 style={{ margin: 0 }}>Security & Compliance</h3>
          </div>

          <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Two-Factor Authentication</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Force 2FA for all staff accounts.</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.twoFactorAuth} onChange={() => handleToggle('twoFactorAuth')} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Staff IP Filtering</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Only allow access from white-listed offices.</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={settings.staffIpFiltering} onChange={() => handleToggle('staffIpFiltering')} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <style>{`
                .admin-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                }
                @media (max-width: 768px) {
                    .admin-stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .settings-row {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        gap: 15px;
                    }
                    .settings-row > div:first-child {
                        flex: 1;
                    }
                }
                @media (max-width: 480px) {
                    .settings-row {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                }
                .form-responsive-row {
                  display: flex;
                  gap: 15px;
                  margin-bottom: 15px;
                }
                @media (max-width: 768px) {
                  .modal-content {
                    width: 95% !important;
                    padding: 20px !important;
                  }
                  .form-responsive-row {
                    flex-direction: column;
                    gap: 15px;
                  }
                }
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 22px;
                }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: #cbd5e1;
                    transition: .3s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 16px;
                    width: 16px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .3s;
                }
                input:checked + .slider { background-color: #06b6d4; }
                input:focus + .slider { box-shadow: 0 0 1px #06b6d4; }
                input:checked + .slider:before { transform: translateX(22px); }
                .slider.round { border-radius: 34px; }
                .slider.round:before { border-radius: 50%; }
            `}</style>
    </div>
  );
};

export default SystemSettings;
