import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newUni, setNewUni] = useState({
    name: '',
    country: '',
    image: '',
    websiteUrl: '',
    description: '',
    about: '',
    campusLife: '',
    admissionCriteria: '',
    rank: '',
    location: '',
    status: 'Active'
  });

  const fetchUniversities = async () => {
    try {
      const data = await apiService.getUniversities();
      setUniversities(data);
    } catch (error) {
      console.error("Error fetching universities", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    await apiService.createUniversity(newUni);
    await fetchUniversities();
    setNewUni({
      name: '',
      country: '',
      image: '',
      websiteUrl: '',
      description: '',
      about: '',
      campusLife: '',
      admissionCriteria: '',
      rank: '',
      location: '',
      status: 'Active'
    });
    setIsModalOpen(false);
  };

  const updateStatus = async (id, status) => {
    await apiService.updateUniversity(id, { status });
    await fetchUniversities();
  };

  const deleteUniversity = async (id) => {
    if (window.confirm("Are you sure you want to delete this university?")) {
      await apiService.deleteUniversity(id);
      await fetchUniversities();
    }
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
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Logo</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Country</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {universities.map(uni => (
                  <tr key={uni.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>
                      {uni.image ? (
                        <img
                          src={uni.image}
                          alt={uni.name}
                          style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = 'https://placehold.co/40x40?text=Uni'; }}
                        />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#64748b' }}>No Logo</div>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>{uni.name}</td>
                    <td style={{ padding: '12px' }}>{uni.country}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={uni.status}
                        onChange={(e) => updateStatus(uni.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          border: '1px solid #e2e8f0',
                          background: uni.status === 'Active' ? '#dcfce7' : uni.status === 'Under Review' ? '#fef9c3' : '#fee2e2',
                          color: uni.status === 'Active' ? '#166534' : uni.status === 'Under Review' ? '#854d0e' : '#991b1b',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => deleteUniversity(uni.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Delete
                      </button>
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
            <form onSubmit={handleAddUniversity} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Name</label>
                  <input
                    type="text"
                    className="ai-input"
                    required
                    value={newUni.name}
                    onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
                    placeholder="e.g. Harvard University"
                    style={{ color: '#1e293b' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Country</label>
                  <input
                    type="text"
                    className="ai-input"
                    required
                    value={newUni.country}
                    onChange={(e) => setNewUni({ ...newUni, country: e.target.value })}
                    placeholder="e.g. USA"
                    style={{ color: '#1e293b' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Image URL</label>
                  <input
                    type="text"
                    className="ai-input"
                    placeholder="https://example.com/logo.png"
                    value={newUni.image}
                    onChange={(e) => setNewUni({ ...newUni, image: e.target.value })}
                    style={{ color: '#1e293b' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Website Link</label>
                  <input
                    type="text"
                    className="ai-input"
                    placeholder="https://example.com"
                    value={newUni.websiteUrl}
                    onChange={(e) => setNewUni({ ...newUni, websiteUrl: e.target.value })}
                    style={{ color: '#1e293b' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Short Description</label>
                  <input
                    type="text"
                    className="ai-input"
                    placeholder="One-liner summary..."
                    value={newUni.description}
                    onChange={(e) => setNewUni({ ...newUni, description: e.target.value })}
                    style={{ color: '#1e293b' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Detailed About (Main Bio)</label>
                  <textarea
                    className="ai-input"
                    placeholder="Detailed history and vision..."
                    value={newUni.about}
                    onChange={(e) => setNewUni({ ...newUni, about: e.target.value })}
                    style={{ color: '#1e293b', minHeight: '80px', padding: '12px', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>World Rank</label>
                    <input
                      type="text"
                      className="ai-input"
                      placeholder="e.g. #150"
                      value={newUni.rank}
                      onChange={(e) => setNewUni({ ...newUni, rank: e.target.value })}
                      style={{ color: '#1e293b' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Specific Location/City</label>
                    <input
                      type="text"
                      className="ai-input"
                      placeholder="e.g. London, UK"
                      value={newUni.location}
                      onChange={(e) => setNewUni({ ...newUni, location: e.target.value })}
                      style={{ color: '#1e293b' }}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Campus Life</label>
                  <textarea
                    className="ai-input"
                    placeholder="Facilities, clubs, student experience..."
                    value={newUni.campusLife}
                    onChange={(e) => setNewUni({ ...newUni, campusLife: e.target.value })}
                    style={{ color: '#1e293b', minHeight: '80px', padding: '12px', resize: 'vertical' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Admission Criteria</label>
                  <textarea
                    className="ai-input"
                    placeholder="GPA, IELTS, specific documents required..."
                    value={newUni.admissionCriteria}
                    onChange={(e) => setNewUni({ ...newUni, admissionCriteria: e.target.value })}
                    style={{ color: '#1e293b', minHeight: '80px', padding: '12px', resize: 'vertical' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Initial Status</label>
                  <select
                    className="ai-input"
                    value={newUni.status}
                    onChange={(e) => setNewUni({ ...newUni, status: e.target.value })}
                    style={{ color: '#1e293b' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" style={{ flex: 1, padding: '12px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-apply" style={{ flex: 1, padding: '12px', background: '#0f172a', color: 'white', border: 'none' }}>Add University Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityManagement;
