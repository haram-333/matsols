import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const DegreeManagement = () => {
    const [degrees, setDegrees] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const initialDegreeState = {
        name: '',
        slug: '',
        level: 'Undergraduate',
        duration: '',
        tuitionFee: '',
        intake: '',
        campusLocation: '',
        universityId: '',
        additionalInfo: '[]'
    };

    const [newDegree, setNewDegree] = useState(initialDegreeState);
    const [extraInfoFields, setExtraInfoFields] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [degreesData, unisData] = await Promise.all([
                apiService.getAllDegrees(),
                apiService.getUniversities()
            ]);
            setDegrees(degreesData);
            setUniversities(unisData);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (degree = null) => {
        if (degree) {
            setEditingId(degree.id);
            setNewDegree({
                ...degree,
                universityId: degree.universityId || '',
                additionalInfo: degree.additionalInfo || '[]'
            });
            try {
                setExtraInfoFields(JSON.parse(degree.additionalInfo || '[]'));
            } catch (e) {
                setExtraInfoFields([]);
            }
        } else {
            setEditingId(null);
            setNewDegree(initialDegreeState);
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

    const handleSaveDegree = async (e) => {
        e.preventDefault();
        const payload = {
            ...newDegree,
            additionalInfo: JSON.stringify(extraInfoFields),
            // Ensure numeric/string fields are correct if needed
        };

        if (editingId) {
            await apiService.updateDegree(editingId, payload);
        } else {
            await apiService.createDegree(payload);
        }

        await fetchData();
        setIsModalOpen(false);
        setNewDegree(initialDegreeState);
        setExtraInfoFields([]);
        setEditingId(null);
    };

    const deleteDegree = async (id) => {
        if (window.confirm("Are you sure you want to delete this degree?")) {
            await apiService.deleteDegree(id);
            await fetchData();
        }
    };

    if (loading && degrees.length === 0) return (
        <div className="fuckin-loader-overlay">
            <div className="fuckin-loader"></div>
            <div className="loader-text">Loading Degree Database...</div>
        </div>
    );

    return (
        <div className="admin-content">
            <div className="admin-header">
                <div className="admin-title">
                    <h1>Degree Management</h1>
                    <p>Manage courses, degrees, and program details.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal()}
                >
                    + Add Degree
                </button>
            </div>

            <div className="admin-card-list" style={{ marginTop: '24px' }}>
                <div className="admin-chart-card">
                    <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Name</th>
                                    <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Level</th>
                                    <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>University</th>
                                    <th style={{ textAlign: 'left', padding: '12px', background: '#f8fafc' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {degrees.map(deg => (
                                    <tr key={deg.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '12px' }}>
                                            <div><strong>{deg.name}</strong></div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{deg.slug}</div>
                                        </td>
                                        <td style={{ padding: '12px' }}>{deg.level}</td>
                                        <td style={{ padding: '12px' }}>
                                            {deg.universityId ? (
                                                universities.find(u => u.id === deg.universityId)?.name || 'Linked Uni'
                                            ) : (
                                                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Linked</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleOpenModal(deg)}
                                                    style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '12px' }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteDegree(deg.id)}
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}
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
                </div>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h3>{editingId ? 'Edit Degree' : 'Add New Degree'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <iconify-icon icon="ri:close-line"></iconify-icon>
                            </button>
                        </div>
                        <form onSubmit={handleSaveDegree} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                            <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                                <div className="admin-form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Degree Name</label>
                                        <input
                                            type="text"
                                            className="ai-input"
                                            required
                                            value={newDegree.name}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setNewDegree({
                                                    ...newDegree,
                                                    name: val,
                                                    slug: editingId ? newDegree.slug : val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                                                });
                                            }}
                                            placeholder="e.g. Computer Science"
                                            style={{ color: '#1e293b' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>URL Slug</label>
                                        <input
                                            type="text"
                                            className="ai-input"
                                            required
                                            value={newDegree.slug}
                                            onChange={(e) => setNewDegree({ ...newDegree, slug: e.target.value })}
                                            placeholder="computer-science"
                                            style={{ color: '#1e293b' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>University Partner</label>
                                    <select
                                        className="ai-input"
                                        value={newDegree.universityId}
                                        onChange={(e) => setNewDegree({ ...newDegree, universityId: e.target.value })}
                                        style={{ color: '#1e293b' }}
                                    >
                                        <option value="">Select University (Optional)</option>
                                        {universities.map(u => (
                                            <option key={u.id} value={u.id}>{u.name} ({u.country})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="admin-form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Level</label>
                                        <select
                                            className="ai-input"
                                            value={newDegree.level}
                                            onChange={(e) => setNewDegree({ ...newDegree, level: e.target.value })}
                                            style={{ color: '#1e293b' }}
                                        >
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                            <option value="PHD">PHD</option>
                                            <option value="Foundation">Foundation</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Duration</label>
                                        <input
                                            type="text"
                                            className="ai-input"
                                            placeholder="e.g. 3-4 Years"
                                            value={newDegree.duration}
                                            onChange={(e) => setNewDegree({ ...newDegree, duration: e.target.value })}
                                            style={{ color: '#1e293b' }}
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Tuition Fee (per year)</label>
                                        <input
                                            type="text"
                                            className="ai-input"
                                            placeholder="e.g. £15,000"
                                            value={newDegree.tuitionFee}
                                            onChange={(e) => setNewDegree({ ...newDegree, tuitionFee: e.target.value })}
                                            style={{ color: '#1e293b' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Intake</label>
                                        <input
                                            type="text"
                                            className="ai-input"
                                            placeholder="e.g. Sept, Jan"
                                            value={newDegree.intake}
                                            onChange={(e) => setNewDegree({ ...newDegree, intake: e.target.value })}
                                            style={{ color: '#1e293b' }}
                                        />
                                    </div>
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
                                                placeholder="Label (e.g. IELTS Score)"
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

                            </div>
                            <div className="modal-actions" style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: 'white' }}>
                                <button type="button" className="btn-outline" style={{ flex: 1, padding: '12px' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-apply" style={{ flex: 1, padding: '12px', background: '#0f172a', color: 'white', border: 'none' }}>
                                    {editingId ? 'Update Degree' : 'Add Degree Info'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DegreeManagement;
