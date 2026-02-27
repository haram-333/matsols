import React, { useState } from 'react';
import './Dashboard.css';

const StudentUniversitySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const universities = [
        { id: 1, name: "Imperial College London", country: "UK", courses: 145, rating: 4.9, logo: "https://ui-avatars.com/api/?name=ICL&background=041021&color=fff" },
        { id: 2, name: "University of Toronto", country: "Canada", courses: 210, rating: 4.8, logo: "https://ui-avatars.com/api/?name=UofT&background=004089&color=fff" },
        { id: 3, name: "Stanford University", country: "USA", courses: 180, rating: 5.0, logo: "https://ui-avatars.com/api/?name=Stan&background=8c1515&color=fff" },
        { id: 4, name: "Australian National University", country: "Australia", courses: 95, rating: 4.7, logo: "https://ui-avatars.com/api/?name=ANU&background=000&color=fff" },
        { id: 5, name: "University of Manchester", country: "UK", courses: 120, rating: 4.6, logo: "https://ui-avatars.com/api/?name=UoM&background=660099&color=fff" },
        { id: 6, name: "UBC", country: "Canada", courses: 160, rating: 4.8, logo: "https://ui-avatars.com/api/?name=UBC&background=002145&color=fff" }
    ];

    const filteredUnis = universities.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="student-uni-search fade-in">
            <div className="section-header">
                <p className="section-subtitle">Find and track universities for your applications.</p>
                <div className="uni-search-bar">
                    <iconify-icon icon="ri:search-line"></iconify-icon>
                    <input 
                        type="text" 
                        placeholder="Search by name or country..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="uni-grid">
                {filteredUnis.map(uni => (
                    <div key={uni.id} className="uni-card-compact">
                        <div className="uni-card-main">
                            <img src={uni.logo} alt={uni.name} className="uni-logo-small" />
                            <div className="uni-details">
                                <h3 className="uni-name-small">{uni.name}</h3>
                                <div className="uni-tags">
                                    <span className="tag country">{uni.country}</span>
                                    <span className="tag courses">{uni.courses} Courses</span>
                                </div>
                            </div>
                        </div>
                        <div className="uni-actions">
                            <button className="btn-action save">
                                <iconify-icon icon="ri:heart-line"></iconify-icon>
                                Save
                            </button>
                            <button className="btn-action apply">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUnis.length === 0 && (
                <div className="no-results">
                    <iconify-icon icon="ri:search-eye-line" style={{fontSize: '48px', opacity: 0.3}}></iconify-icon>
                    <p>No universities found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
};

export default StudentUniversitySearch;
