import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const UpdatesManagement = () => {
  const [updates, setUpdates] = useState({ hero: [], grid: [] });
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' or 'grid'

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const data = await apiService.getUpdates();
      // Categorize flat array into hero/grid
      const categorized = {
        hero: data.filter(u => u.category === 'hero'),
        grid: data.filter(u => u.category === 'grid')
      };
      setUpdates(categorized);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this update?")) return;
    try {
      await apiService.deleteUpdate(id);
      fetchUpdates();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Image is optional, and we'll use 'category' to match activeTab
      const payload = {
        ...editingItem,
        category: activeTab,
        date: activeTab === 'grid' ? editingItem.date : (editingItem.cta || 'Apply Now') // Just a fallback
      };
      
      await apiService.createUpdate(payload);
      setEditingItem(null);
      fetchUpdates();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <iconify-icon icon="eos-icons:loading" width="48" style={{ color: '#06b6d4' }}></iconify-icon>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Updates & Insights CMS</h1>
          <p>Manage the hero slider and categorical updates on the homepage.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setEditingItem({ title: '', excerpt: '', date: '', image: '' })}
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
                  <th style={{ padding: '12px' }}>Title</th>
                  <th style={{ padding: '12px' }}>Content Snippet</th>
                  <th style={{ padding: '12px' }}>{activeTab === 'hero' ? 'CTA/Label' : 'Date'}</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates[activeTab].map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>
                      <strong>{item.title}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0', maxWidth: '400px' }}>{item.excerpt}</p>
                    </td>
                    <td style={{ padding: '12px' }}>{item.date}</td>
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
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Title</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  value={editingItem.title} 
                  onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                  style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Content / Excerpt</label>
                <textarea 
                  className="ai-input" 
                  value={editingItem.excerpt} 
                  onChange={e => setEditingItem({...editingItem, excerpt: e.target.value})}
                  style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>{activeTab === 'hero' ? 'CTA Text (e.g. Join Now)' : 'Date/Label'}</label>
                <input 
                  type="text" 
                  className="ai-input" 
                  value={editingItem.date}
                  onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                  style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  required
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
