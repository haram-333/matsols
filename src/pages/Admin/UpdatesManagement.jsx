import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const UpdatesManagement = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const data = await apiService.getUpdates();
      setUpdates(data);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event/update?")) return;
    try {
      await apiService.deleteUpdate(id);
      fetchUpdates();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (item) => {
    // Formatting date to strings for input if needed
    let formattedDate = '';
    if (item.expiryDate) {
      formattedDate = new Date(item.expiryDate).toISOString().slice(0, 16); // format YYYY-MM-DDThh:mm
    }
    setEditingItem({ ...item, expiryDate: formattedDate });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingItem,
        isImportant: Boolean(editingItem.isImportant)
      };

      await apiService.createUpdate(payload);
      setEditingItem(null);
      fetchUpdates();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const getEmptyItem = () => ({
    title: '',
    category: 'Admission',
    date: '',
    excerpt: '',
    image: '',
    isImportant: false,
    expiryDate: '',
    ctaText: '',
    ctaLink: ''
  });

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
          <h1>Events & Insights CMS</h1>
          <p>Manage the updates displaying on the homepage. Important events go to the big card, others to the grid.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setEditingItem(getEmptyItem())}
        >
          + Add New Event
        </button>
      </div>

      <div className="admin-card-list">
        <div className="admin-chart-card">
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Important?</th>
                  <th style={{ padding: '12px' }}>Title</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Expires</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates.map(item => {
                  const isExpired = item.expiryDate && new Date(item.expiryDate) < new Date();

                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', opacity: isExpired && !item.isImportant ? 0.6 : 1 }}>
                      <td style={{ padding: '12px' }}>
                        {item.isImportant ? (
                          <span style={{ background: '#f59e0b', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>IMPORTANT</span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Standard</span>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <strong>{item.title}</strong>
                        {isExpired && !item.isImportant && <span style={{ marginLeft: '10px', color: '#ef4444', fontSize: '12px' }}>(Expired - Hidden)</span>}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'Never'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {updates.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No events found. Create one above!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingItem && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', padding: '20px' }}>
          <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '600px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '20px' }}>{editingItem.id ? 'Edit Event' : 'New Event'}</h3>
            <form onSubmit={handleSave}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>

                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Title</label>
                  <input
                    type="text"
                    className="ai-input"
                    value={editingItem.title}
                    onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    required
                  />
                </div>

                {/* Excerpt / Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Description / Excerpt</label>
                  <textarea
                    className="ai-input"
                    value={editingItem.excerpt}
                    onChange={e => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                    style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', resize: 'vertical', color: '#1e293b' }}
                    required
                  />
                </div>

                {/* Category & Status Row */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Category Badge</label>
                    <input
                      type="text"
                      className="ai-input"
                      value={editingItem.category}
                      placeholder="e.g. Scholarship, Admission"
                      onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Short Date Text</label>
                    <input
                      type="text"
                      className="ai-input"
                      value={editingItem.date}
                      placeholder="e.g. Ends Mar 15"
                      onChange={e => setEditingItem({ ...editingItem, date: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                      required
                    />
                  </div>
                </div>

                {/* Settings Row */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      id="isImportant"
                      checked={editingItem.isImportant}
                      onChange={e => setEditingItem({ ...editingItem, isImportant: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <label htmlFor="isImportant" style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#f59e0b' }}>
                      Mark as Important (Hero Card)
                    </label>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Expiration Date & Time</label>
                    <input
                      type="datetime-local"
                      className="ai-input"
                      value={editingItem.expiryDate}
                      onChange={e => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    />
                    <small style={{ fontSize: '11px', color: '#64748b' }}>If blank, it never expires natively.</small>
                  </div>
                </div>

                {/* CTA Row */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Button Text</label>
                    <input
                      type="text"
                      className="ai-input"
                      value={editingItem.ctaText}
                      placeholder="e.g. Apply Now"
                      onChange={e => setEditingItem({ ...editingItem, ctaText: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Button Link</label>
                    <input
                      type="text"
                      className="ai-input"
                      value={editingItem.ctaLink}
                      placeholder="e.g. /universities"
                      onChange={e => setEditingItem({ ...editingItem, ctaLink: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                    />
                  </div>
                </div>

                {/* Image Link */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Background Image Link (URL)</label>
                  <input
                    type="url"
                    className="ai-input"
                    value={editingItem.image}
                    placeholder="https://images.unsplash.com/..."
                    onChange={e => setEditingItem({ ...editingItem, image: e.target.value })}
                    style={{ width: '100%', height: '40px', padding: '0 10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' }}
                  />
                  <small style={{ fontSize: '11px', color: '#64748b' }}>Paste a direct image link. Crucial for Important events.</small>
                </div>

              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Event</button>
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
