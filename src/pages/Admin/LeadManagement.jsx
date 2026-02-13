import './LeadManagement.css';

const LeadManagement = () => {
  const leads = [
    { id: 1, name: "Ali Ahmed", target: "UK - Imperial", status: "New", priority: "high", date: "2 mins ago" },
    { id: 2, name: "Sarah Khan", target: "Canada - UofT", status: "Contacted", priority: "med", date: "1 hour ago" },
    { id: 3, name: "John Smith", target: "USA - Stanford", status: "In Progress", priority: "high", date: "3 hours ago" },
    { id: 4, name: "Hina Malik", target: "Australia - ANU", status: "Qualified", priority: "low", date: "Yesterday" },
    { id: 5, name: "Omar Farooq", target: "UK - Manchester", status: "New", priority: "med", date: "5 mins ago" },
    { id: 6, name: "Emily Chen", target: "Canada - UBC", status: "Contacted", priority: "high", date: "2 hours ago" },
  ];

  const columns = ["New", "Contacted", "In Progress", "Qualified"];

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
          <button className="btn-apply leads-add-btn">+ Add Lead</button>
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
                      {lead.name.toLowerCase().replace(' ', '.')}@example.com
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
    </div>
  );
};

export default LeadManagement;
