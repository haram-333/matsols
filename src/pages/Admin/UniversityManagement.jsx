import React from 'react';

const UniversityManagement = () => {
  const universities = [
    { id: 1, name: 'Imperial College London', country: 'UK', status: 'Active' },
    { id: 2, name: 'University of Toronto', country: 'Canada', status: 'Active' },
    { id: 3, name: 'Stanford University', country: 'USA', status: 'Under Review' },
  ];

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div className="admin-title">
          <h1>University Management</h1>
          <p>Configure institutional partners and program offerings.</p>
        </div>
        <button className="btn btn-primary">+ Add University</button>
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
    </div>
  );
};

export default UniversityManagement;
