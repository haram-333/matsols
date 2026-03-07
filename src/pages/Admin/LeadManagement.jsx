import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './LeadManagement.css';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    target: '',
    priority: 'med'
  });

  const columns = ["New", "Contacted", "In Progress", "Qualified"];

  const fetchLeads = async () => {
    try {
      const data = await apiService.getLeads();
      setLeads(data);
    } catch (err) {
      setError("Failed to load leads from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (e) => {
    e.preventDefault();
    const lead = {
      fullName: newLead.name,
      email: newLead.email,
      targetCountry: newLead.target,
      priority: newLead.priority
    };

    // Create lead in backend
    await apiService.submitLead(lead);
    await fetchLeads(); // Refresh list to get real ID and status

    setNewLead({ name: '', email: '', target: '', priority: 'med' });
    setIsModalOpen(false);
  };

  const updateStatus = async (id, newStatus) => {
    await apiService.updateLead(id, { status: newStatus });
    await fetchLeads();
  };

  const deleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      await apiService.deleteLead(id);
      await fetchLeads();
    }
  };

  const [exportRange, setExportRange] = useState({ from: '', to: '' });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (preset = null) => {
    setIsExporting(true);
    let from = exportRange.from;
    let to = exportRange.to;

    if (preset === '7d') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      from = d.toISOString().split('T')[0];
      to = new Date().toISOString().split('T')[0];
    } else if (preset === '30d') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      from = d.toISOString().split('T')[0];
      to = new Date().toISOString().split('T')[0];
    }

    await apiService.exportLeads(from, to);
    setIsExporting(false);
  };

  if (loading) return (
    <div className="fuckin-loader-overlay">
      <div className="fuckin-loader"></div>
      <div className="loader-text">Loading Lead Pipelines...</div>
    </div>
  );

  return (
    <div className="lead-management">
      <div className="admin-header leads-header">
        <div className="admin-title">
          <h1>Student Leads</h1>
          <p>Manage and track student inquiries from the AI Agent and Homepage.</p>
        </div>
        <div className="leads-actions">
          <div className="search-bar-wrap">
            <input type="text" placeholder="Search leads..." className="ai-input leads-search-input" />
          </div>
          <button
            className="btn-apply leads-add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Lead
          </button>
        </div>
      </div>

      <div className="admin-chart-card" style={{ marginBottom: '24px', padding: '20px' }}>
        <h4 style={{ marginBottom: '15px' }}>Export Leads Report</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>From Date</label>
            <input
              type="date"
              className="ai-input"
              style={{ height: '35px', padding: '5px 10px' }}
              value={exportRange.from}
              onChange={(e) => setExportRange({ ...exportRange, from: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>To Date</label>
            <input
              type="date"
              className="ai-input"
              style={{ height: '35px', padding: '5px 10px' }}
              value={exportRange.to}
              onChange={(e) => setExportRange({ ...exportRange, to: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleExport()}
              disabled={isExporting}
              className="btn-apply"
              style={{ height: '35px', padding: '0 15px', fontSize: '12px' }}
            >
              {isExporting ? 'Exporting...' : 'Export Selected Range'}
            </button>
            <button
              onClick={() => handleExport('7d')}
              disabled={isExporting}
              className="btn-outline"
              style={{ height: '35px', padding: '0 15px', fontSize: '12px' }}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handleExport('30d')}
              disabled={isExporting}
              className="btn-outline"
              style={{ height: '35px', padding: '0 15px', fontSize: '12px' }}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      <div className="lead-board">
        {columns.map(col => (
          <div key={col} className="lead-column">
            <div className="column-header">
              <h4>{col}</h4>
              <span className="lead-count">{leads.filter(l => l.status === col).length}</span>
            </div>

            <div className="lead-cards">
              {leads.filter(l => l.status === col).map(lead => (
                <div key={lead.id} className="lead-card">
                  <div className="lead-card-header">
                    <span className="lead-name">{lead.fullName}</span>
                    <div className={`lead-priority priority-${lead.priority}`}></div>
                  </div>

                  <div className="lead-details">
                    <div className="lead-detail-item">
                      <iconify-icon icon="ri:building-line"></iconify-icon>
                      {lead.targetCountry || "Unknown"}
                    </div>
                    <div className="lead-detail-item">
                      <iconify-icon icon="ri:mail-line"></iconify-icon>
                      {lead.email}
                    </div>
                  </div>

                  <div className="lead-card-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="lead-date">{new Date(lead.createdAt).toLocaleDateString()}</span>
                      <select
                        className="ai-input"
                        style={{ padding: '2px 8px', fontSize: '12px', height: 'auto', width: 'auto' }}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                      >
                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Delete Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>Add New Lead</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <iconify-icon icon="ri:close-line"></iconify-icon>
              </button>
            </div>
            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Full Name</label>
                  <input
                    type="text"
                    className="ai-input"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Email Address</label>
                  <input
                    type="email"
                    className="ai-input"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Target University</label>
                  <input
                    type="text"
                    className="ai-input"
                    required
                    value={newLead.target}
                    onChange={(e) => setNewLead({ ...newLead, target: e.target.value })}
                    placeholder="e.g. UK - Oxford"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Priority</label>
                  <select
                    className="ai-input"
                    value={newLead.priority}
                    onChange={(e) => setNewLead({ ...newLead, priority: e.target.value })}
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" style={{ flex: 1, padding: '10px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-apply" style={{ flex: 1, padding: '10px' }}>Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
