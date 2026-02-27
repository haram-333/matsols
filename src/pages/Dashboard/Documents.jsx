import React from 'react';
import './Dashboard.css';

const Documents = () => {
    const documents = [
        { id: 1, name: "Passport_Copy.pdf", type: "PDF", size: "1.2 MB", date: "Oct 12, 2024", status: "Verified" },
        { id: 2, name: "Academic_Transcript.pdf", type: "PDF", size: "2.4 MB", date: "Oct 12, 2024", status: "Verified" },
        { id: 3, name: "Offer_Letter_Imperial.pdf", type: "PDF", size: "0.8 MB", date: "Oct 24, 2024", status: "New" },
        { id: 4, name: "IELTS_Score_Report.jpg", type: "Image", size: "3.1 MB", date: "Sep 30, 2024", status: "Verified" },
        { id: 5, name: "SOP_Draft_v2.docx", type: "DOCX", size: "0.4 MB", date: "Oct 20, 2024", status: "Pending Review" }
    ];

    return (
        <div className="documents-page fade-in">
            <div className="section-header">
                <p className="section-subtitle">Manage your application documents and uploads.</p>
                <button className="btn-upload-new">
                    <iconify-icon icon="ri:upload-2-line"></iconify-icon>
                    Upload New Document
                </button>
            </div>

            <div className="doc-stats">
                <div className="doc-stat-card">
                    <div className="stat-icon verified">
                        <iconify-icon icon="ri:checkbox-circle-line"></iconify-icon>
                    </div>
                    <div className="stat-info">
                        <h3>3</h3>
                        <p>Verified</p>
                    </div>
                </div>
                <div className="doc-stat-card">
                    <div className="stat-icon pending">
                        <iconify-icon icon="ri:time-line"></iconify-icon>
                    </div>
                    <div className="stat-info">
                        <h3>1</h3>
                        <p>Pending</p>
                    </div>
                </div>
                <div className="doc-stat-card">
                    <div className="stat-icon required">
                        <iconify-icon icon="ri:error-warning-line"></iconify-icon>
                    </div>
                    <div className="stat-info">
                        <h3>2</h3>
                        <p>Required</p>
                    </div>
                </div>
            </div>

            <div className="docs-table-wrapper">
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Date Uploaded</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id}>
                                <td>
                                    <div className="doc-name-cell">
                                        <iconify-icon icon={doc.type === "PDF" ? "ri:file-pdf-line" : "ri:file-text-line"}></iconify-icon>
                                        <span>{doc.name}</span>
                                    </div>
                                </td>
                                <td>{doc.type}</td>
                                <td>{doc.size}</td>
                                <td>{doc.date}</td>
                                <td>
                                    <span className={`doc-status-tag ${doc.status.toLowerCase().replace(' ', '-')}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="doc-actions">
                                        <button title="View"><iconify-icon icon="ri:eye-line"></iconify-icon></button>
                                        <button title="Download"><iconify-icon icon="ri:download-line"></iconify-icon></button>
                                        <button title="Delete" className="delete"><iconify-icon icon="ri:delete-bin-line"></iconify-icon></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="required-docs">
                <h3 className="sub-section-title">Required Documents</h3>
                <div className="req-docs-list">
                    <div className="req-doc-item">
                        <div className="req-doc-info">
                            <h4>Statement of Purpose (SOP)</h4>
                            <p>Required for Stanford University application.</p>
                        </div>
                        <button className="btn-upload-req">Upload</button>
                    </div>
                    <div className="req-doc-item">
                        <div className="req-doc-info">
                            <h4>Letter of Recommendation (LOR)</h4>
                            <p>At least 2 required for all UK universities.</p>
                        </div>
                        <button className="btn-upload-req">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
