import { useState } from 'react';
import './LeadManagement.css';

const LeadManagement = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: "Ali Ahmed", target: "UK - Imperial", email: "ali.ahmed@example.com", status: "New", priority: "high", date: "2 mins ago" },
    { id: 2, name: "Sarah Khan", target: "Canada - UofT", email: "sarah.khan@example.com", status: "Contacted", priority: "med", date: "1 hour ago" },
    { id: 3, name: "John Smith", target: "USA - Stanford", email: "john.smith@example.com", status: "In Progress", priority: "high", date: "3 hours ago" },
    { id: 4, name: "Hina Malik", target: "Australia - ANU", email: "hina.malik@example.com", status: "Qualified", priority: "low", date: "Yesterday" },
    { id: 5, name: "Omar Farooq", target: "UK - Manchester", email: "omar.farooq@example.com", status: "New", priority: "med", date: "5 mins ago" },
    { id: 6, name: "Emily Chen", target: "Canada - UBC", email: "emily.chen@example.com", status: "Contacted", priority: "high", date: "2 hours ago" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    target: '',
    priority: 'med'
  });

  const columns = ["New", "Contacted", "In Progress", "Qualified"];

  const handleAddLead = (e) => {
    e.preventDefault();
    const lead = {
      ...newLead,
      id: leads.length + 1,
      status: 'New',
      date: 'Just now'
    };
    setLeads([lead, ...leads]);
    setNewLead({ name: '', email: '', target: '', priority: 'med' });
    setIsModalOpen(false);
  };

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
                    <span className="lead-name">{lead.name}</span>
                    <div className={`lead-priority priority-${lead.priority}`}></div>
                  </div>
                  
                  <div className="lead-details">
                    <div className="lead-detail-item">
                      <iconify-icon icon="ri:building-line"></iconify-icon>
                      {lead.target}
                    </div>
                    <div className="lead-detail-item">
                      <iconify-icon icon="ri:mail-line"></iconify-icon>
                      {lead.email}
                    </div>
                  </div>

                  <div className="lead-card-footer">
                    <span className="lead-date">{lead.date}</span>
                    <div className="lead-avatar-group">
                       <img src={`https://ui-avatars.com/api/?name=${lead.name}&background=random`} className="lead-mini-avatar" alt="owner" />
                    </div>
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
            <form onSubmit={handleAddLead}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Full Name</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  required 
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
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
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
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
                  onChange={(e) => setNewLead({...newLead, target: e.target.value})}
                  placeholder="e.g. UK - Oxford"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Priority</label>
                <select 
                  className="ai-input"
                  value={newLead.priority}
                  onChange={(e) => setNewLead({...newLead, priority: e.target.value})}
                >
                  <option value="high">High</option>
                  <option value="med">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: '10px' }}>
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
