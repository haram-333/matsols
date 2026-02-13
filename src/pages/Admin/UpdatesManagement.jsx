import React, { useState } from 'react';
import { initialUpdates } from '../../data/updatesData';

const UpdatesManagement = () => {
  const [updates, setUpdates] = useState(() => {
    const saved = localStorage.getItem('matsols_updates');
    return saved ? JSON.parse(saved) : initialUpdates;
  });
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' or 'grid'

  const updateAndSave = (newUpdates) => {
    setUpdates(newUpdates);
    localStorage.setItem('matsols_updates', JSON.stringify(newUpdates));
  };

  const handleDelete = (type, id) => {
    const newUpdates = {
      ...updates,
      [type]: updates[type].filter(item => item.id !== id)
    };
    updateAndSave(newUpdates);
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const type = activeTab;
    let newUpdates;
    if (editingItem.id) {
      // Edit
      newUpdates = {
        ...updates,
        [type]: updates[type].map(item => item.id === editingItem.id ? editingItem : item)
      };
    } else {
      // New
      const newItem = { ...editingItem, id: Date.now() };
      newUpdates = {
        ...updates,
        [type]: [...updates[type], newItem]
      };
    }
    updateAndSave(newUpdates);
    setEditingItem(null);
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Updates & Insights CMS</h1>
          <p>Manage the hero slider and categorical updates on the homepage.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setEditingItem({ badge: '', title: '', desc: '', date: '', cta: '', subtitle: '' })}
        >
          + Add New Update
        </button>
      </div>

      <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0' }}>
        <button 
          className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
          style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'hero' ? '2px solid #06b6d4' : 'none', color: activeTab === 'hero' ? '#06b6d4' : '#64748b' }}
        >
          Hero Slides
        </button>
        <button 
          className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
          onClick={() => setActiveTab('grid')}
          style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'grid' ? '2px solid #06b6d4' : 'none', color: activeTab === 'grid' ? '#06b6d4' : '#64748b' }}
        >
          Grid Cards
        </button>
      </div>

      <div className="admin-card-list">
        <div className="admin-chart-card">
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Badge</th>
                  <th style={{ padding: '12px' }}>Title</th>
                  {activeTab === 'hero' && <th style={{ padding: '12px' }}>Subtitle</th>}
                  <th style={{ padding: '12px' }}>{activeTab === 'hero' ? 'CTA' : 'Date'}</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates[activeTab].map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>
                      <span className={`insight-badge ${item.class || 'badge-important'}`} style={{ display: 'inline-block' }}>
                        {item.badge}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <strong>{item.title}</strong>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0', maxWidth: '300px' }}>{item.desc}</p>
                    </td>
                    {activeTab === 'hero' && <td style={{ padding: '12px' }}>{item.subtitle}</td>}
                    <td style={{ padding: '12px' }}>{item.cta || item.date}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(activeTab, item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingItem && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '500px', maxWidth: '90%' }}>
            <h3>{editingItem.id ? 'Edit Update' : 'New Update'}</h3>
            <form onSubmit={handleSave} style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Badge Type (Status)</label>
                <select 
                  className="ai-input" 
                  value={editingItem.badge} 
                  onChange={e => setEditingItem({...editingItem, badge: e.target.value})}
                  style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                >
                  <option value="Important">Important</option>
                  <option value="Admission">Admission</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Event">Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Title</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  value={editingItem.title} 
                  onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                  style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                />
              </div>
              {activeTab === 'hero' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Subtitle</label>
                  <input 
                    type="text" 
                    className="ai-input" 
                    value={editingItem.subtitle} 
                    onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})}
                    style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  />
                </div>
              )}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Description</label>
                <textarea 
                  className="ai-input" 
                  value={editingItem.desc} 
                  onChange={e => setEditingItem({...editingItem, desc: e.target.value})}
                  style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>{activeTab === 'hero' ? 'CTA Text' : 'Date/Label'}</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  value={activeTab === 'hero' ? editingItem.cta : editingItem.date} 
                  onChange={e => setEditingItem({...editingItem, [activeTab === 'hero' ? 'cta' : 'date']: e.target.value})}
                  style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingItem(null)} style={{ flex: 1, background: '#f1f5f9', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatesManagement;
