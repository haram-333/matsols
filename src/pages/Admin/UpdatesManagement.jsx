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
      <div className="fuckin-loader-overlay">
        <div className="fuckin-loader"></div>
        <div className="loader-text">Loading Content Management...</div>
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

      <div className="admin-table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Important?</th>
              <th>Title</th>
              <th>Category</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updates.map(item => {
              const isExpired = item.expiryDate && new Date(item.expiryDate) < new Date();

              return (
                <tr key={item.id} style={{ opacity: isExpired && !item.isImportant ? 0.6 : 1 }}>
                  <td>
                    {item.isImportant ? (
                      <span className="status-tag marketing" style={{ padding: '4px 12px', fontSize: '10px' }}>IMPORTANT</span>
                    ) : (
                      <span className="status-tag user" style={{ padding: '4px 12px', fontSize: '10px' }}>Standard</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{item.title}</strong>
                      {isExpired && !item.isImportant && <span style={{ color: '#ef4444', fontSize: '11px' }}>Expired - Hidden</span>}
                    </div>
                  </td>
                  <td>
                    <span className="status-tag editor" style={{ padding: '4px 12px', fontSize: '10px' }}>
                      {item.category}
                    </span>
                  </td>
                  <td>
                    {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'Never'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {updates.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No events found. Create one above!</td>
              </tr>
            )}
          </tbody>
        </table>
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
                <div className="form-responsive-row">
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
                <div className="form-responsive-row" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
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
                <div className="form-responsive-row">
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

              <div className="form-responsive-row" style={{ marginTop: '30px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Event</button>
                <button type="button" onClick={() => setEditingItem(null)} style={{ flex: 1, background: '#f1f5f9', border: 'none', borderRadius: '10px', cursor: 'pointer', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .form-responsive-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        @media (max-width: 768px) {
          .modal-content {
            width: 95% !important;
            padding: 20px !important;
          }
          .form-responsive-row {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default UpdatesManagement;
