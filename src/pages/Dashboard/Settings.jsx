import React, { useState } from 'react';
import './Dashboard.css';

const Settings = () => {
    const [profile, setProfile] = useState({
        fullName: "Haram Cho",
        email: "haram@example.com",
        phone: "+92 300 1234567",
        location: "Lahore, Pakistan",
        bio: "Aspiring computer scientist looking for top-tier universities in the UK and Canada."
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        applicationUpdates: true,
        marketing: false,
        smsAlerts: true
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert("Settings saved successfully!");
    };

    return (
        <div className="settings-page fade-in">
            <div className="section-header">
                <p className="section-subtitle">Manage your personal information and preferences.</p>
            </div>

            <div className="settings-grid">
                <div className="settings-card profile-section">
                    <h3>Profile Information</h3>
                    <form className="settings-form" onSubmit={handleSave}>
                        <div className="form-group-avatar">
                            <img src={`https://ui-avatars.com/api/?name=${profile.fullName}&background=ff863c&color=fff`} alt="Profile" className="large-avatar" />
                            <button type="button" className="btn-change-photo">Change Photo</button>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    value={profile.fullName} 
                                    onChange={handleProfileChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={profile.email} 
                                    disabled 
                                />
                                <span className="input-hint">Email cannot be changed.</span>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={profile.phone} 
                                    onChange={handleProfileChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={profile.location} 
                                    onChange={handleProfileChange} 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea 
                                name="bio" 
                                value={profile.bio} 
                                onChange={handleProfileChange} 
                                rows="3"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-save-settings">Save Profile Changes</button>
                    </form>
                </div>

                <div className="settings-column">
                    <div className="settings-card security-section">
                        <h3>Security</h3>
                        <div className="security-item">
                            <div>
                                <h4>Password</h4>
                                <p>Last changed 3 months ago</p>
                            </div>
                            <button className="btn-outline-small">Update</button>
                        </div>
                        <div className="security-item">
                            <div>
                                <h4>Two-Factor Authentication</h4>
                                <p>Keep your account extra secure</p>
                            </div>
                            <button className="btn-outline-small">Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
