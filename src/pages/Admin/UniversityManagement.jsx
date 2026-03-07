import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialUniState = {
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
    status: 'Active',
    additionalInfo: '[]' // Stored as JSON string
  };

  const [newUni, setNewUni] = useState(initialUniState);
  const [extraInfoFields, setExtraInfoFields] = useState([]);

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

  const handleOpenModal = (uni = null) => {
    if (uni) {
      setEditingId(uni.id);
      setNewUni({
        ...uni,
        additionalInfo: uni.additionalInfo || '[]'
      });
      try {
        setExtraInfoFields(JSON.parse(uni.additionalInfo || '[]'));
      } catch (e) {
        setExtraInfoFields([]);
      }
    } else {
      setEditingId(null);
      setNewUni(initialUniState);
      setExtraInfoFields([]);
    }
    setIsModalOpen(true);
  };

  const handleAddExtraField = () => {
    setExtraInfoFields([...extraInfoFields, { label: '', value: '' }]);
  };

  const handleExtraFieldChange = (index, key, value) => {
    const updated = [...extraInfoFields];
    updated[index][key] = value;
    setExtraInfoFields(updated);
  };

  const handleRemoveExtraField = (index) => {
    setExtraInfoFields(extraInfoFields.filter((_, i) => i !== index));
  };

  const handleSaveUniversity = async (e) => {
    e.preventDefault();
    const payload = {
      ...newUni,
      additionalInfo: JSON.stringify(extraInfoFields)
    };

    if (editingId) {
      await apiService.updateUniversity(editingId, payload);
    } else {
      await apiService.createUniversity(payload);
    }

    await fetchUniversities();
    setIsModalOpen(false);
    setNewUni(initialUniState);
    setExtraInfoFields([]);
    setEditingId(null);
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
          onClick={() => handleOpenModal()}
        >
          + Add University
        </button>
      </div>

      <div className="admin-table-wrapper" style={{ marginTop: '24px' }}>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Country</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {universities.map(uni => (
              <tr key={uni.id}>
                <td>
                  {uni.image ? (
                    <img
                      src={uni.image}
                      alt={uni.name}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://placehold.co/40x40?text=Uni'; }}
                    />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#64748b' }}>No Logo</div>
                  )}
                </td>
                <td><strong>{uni.name}</strong></td>
                <td>{uni.country}</td>
                <td>
                  <select
                    className="ai-input"
                    value={uni.status}
                    onChange={(e) => updateStatus(uni.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '12px',
                      width: 'auto',
                      height: 'auto',
                      background: uni.status === 'Active' ? '#dcfce7' : uni.status === 'Under Review' ? '#fef9c3' : '#fee2e2',
                      color: uni.status === 'Active' ? '#166534' : uni.status === 'Under Review' ? '#854d0e' : '#991b1b',
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                      onClick={() => handleOpenModal(uni)}
                      style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUniversity(uni.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>{editingId ? 'Edit University' : 'Add New University'}</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <iconify-icon icon="ri:close-line"></iconify-icon>
              </button>
            </div>
            <form onSubmit={handleSaveUniversity} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
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
                <div className="admin-form-row">
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Additional Information</label>
                    <button type="button" onClick={handleAddExtraField} style={{ fontSize: '12px', padding: '4px 8px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add Field</button>
                  </div>
                  {extraInfoFields.map((field, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input
                        type="text"
                        className="ai-input"
                        placeholder="Label (e.g. Global Rank)"
                        value={field.label}
                        onChange={(e) => handleExtraFieldChange(idx, 'label', e.target.value)}
                        style={{ flex: 1, color: '#1e293b' }}
                      />
                      <input
                        type="text"
                        className="ai-input"
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) => handleExtraFieldChange(idx, 'value', e.target.value)}
                        style={{ flex: 1, color: '#1e293b' }}
                      />
                      <button type="button" onClick={() => handleRemoveExtraField(idx)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <iconify-icon icon="ri:delete-bin-line"></iconify-icon>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Status</label>
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
              <div className="modal-actions" style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: 'white' }}>
                <button type="button" className="btn-outline" style={{ flex: 1, padding: '12px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-apply" style={{ flex: 1, padding: '12px', background: '#0f172a', color: 'white', border: 'none' }}>
                  {editingId ? 'Update University' : 'Add University Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityManagement;
