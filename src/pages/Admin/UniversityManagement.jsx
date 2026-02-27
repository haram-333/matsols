import React, { useState } from 'react';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([
    { id: 1, name: 'Imperial College London', country: 'UK', status: 'Active' },
    { id: 2, name: 'University of Toronto', country: 'Canada', status: 'Active' },
    { id: 3, name: 'Stanford University', country: 'USA', status: 'Under Review' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUni, setNewUni] = useState({
    name: '',
    country: '',
    status: 'Active'
  });

  const handleAddUniversity = (e) => {
    e.preventDefault();
    const uni = {
      ...newUni,
      id: universities.length + 1
    };
    setUniversities([...universities, uni]);
    setNewUni({ name: '', country: '', status: 'Active' });
    setIsModalOpen(false);
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div className="admin-title">
          <h1>University Management</h1>
          <p>Configure institutional partners and program offerings.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add University
        </button>
      </div>

      <div className="admin-card-list" style={{ marginTop: '24px' }}>
        <div className="admin-chart-card">
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Country</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {universities.map(uni => (
                  <tr key={uni.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{uni.name}</td>
                    <td style={{ padding: '12px' }}>{uni.country}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        background: uni.status === 'Active' ? '#dcfce7' : '#fef9c3',
                        color: uni.status === 'Active' ? '#166534' : '#854d0e'
                      }}>
                        {uni.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer' }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>Add New University</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <iconify-icon icon="ri:close-line"></iconify-icon>
              </button>
            </div>
            <form onSubmit={handleAddUniversity}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Name</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  required 
                  value={newUni.name}
                  onChange={(e) => setNewUni({...newUni, name: e.target.value})}
                  placeholder="e.g. Harvard University"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Country</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  required 
                  value={newUni.country}
                  onChange={(e) => setNewUni({...newUni, country: e.target.value})}
                  placeholder="e.g. USA"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Initial Status</label>
                <select 
                  className="ai-input"
                  value={newUni.status}
                  onChange={(e) => setNewUni({...newUni, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn-outline" style={{ flex: 1, padding: '10px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-apply" style={{ flex: 1, padding: '10px' }}>Add University</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityManagement;
