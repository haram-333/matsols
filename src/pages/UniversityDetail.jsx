import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UniversitySearch.css';

const UniversityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchUni = async () => {
            try {
                const data = await apiService.getUniversityById(id);
                setUniversity(data);
            } catch (err) {
                console.error("Error fetching university:", err);
                navigate('/universities');
            } finally {
                setLoading(false);
            }
        };
        fetchUni();
    }, [id, navigate]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
            <iconify-icon icon="line-md:loading-twotone-loop" style={{ fontSize: '64px', color: '#06b6d4' }}></iconify-icon>
        </div>
    );

    if (!university) return null;

    return (
        <div className="uni-discovery-page" style={{ background: '#f8fafc' }}>
            <Header />

            <div className="detail-hero-section" style={{
                background: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url(${university.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1080'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '120px 0 60px',
                color: 'white'
            }}>
                <div className="uni-container">
                    <Link to="/universities" style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', textDecoration: 'none', fontWeight: '600' }}>
                        <iconify-icon icon="ri:arrow-left-line"></iconify-icon>
                        Back to Institutions
                    </Link>
                    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end' }}>
                        <div style={{ width: '180px', height: '180px', borderRadius: '24px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)', background: 'white' }}>
                            <img src={university.image || 'https://placehold.co/180x180?text=Logo'} alt={university.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ paddingBottom: '10px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <span style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4', padding: '6px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: '700', border: '1px solid rgba(6,182,212,0.3)' }}>
                                    {university.country}
                                </span>
                                {university.rank && (
                                    <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '6px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: '700', border: '1px solid rgba(16,185,129,0.3)' }}>
                                        World Rank {university.rank}
                                    </span>
                                )}
                            </div>
                            <h1 style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'Playfair Display, serif', marginBottom: '10px' }}>{university.name}</h1>
                            <p style={{ opacity: 0.7, fontSize: '18px', maxWidth: '700px' }}>{university.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="uni-container" style={{ marginTop: '40px', paddingBottom: '100px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                    <div className="detail-main-content">
                        <div className="tab-navigation" style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #e2e8f0', marginBottom: '30px' }}>
                            {['about', 'campus', 'admission'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '15px 0',
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        color: activeTab === tab ? '#0f172a' : '#94a3b8',
                                        borderBottom: activeTab === tab ? '3px solid #06b6d4' : '3px solid transparent',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {tab === 'about' ? 'Overview' : tab === 'campus' ? 'Campus Life' : 'Admission'}
                                </button>
                            ))}
                        </div>

                        <div className="tab-content" style={{ background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                            {activeTab === 'about' && (
                                <div className="fade-in">
                                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>About the Institution</h3>
                                    <p style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>
                                        {university.about || "Detailed overview coming soon. This institution provides world-class education with a focus on global excellence."}
                                    </p>
                                </div>
                            )}
                            {activeTab === 'campus' && (
                                <div className="fade-in">
                                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Campus Experience</h3>
                                    <p style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>
                                        {university.campusLife || "Campus life details are being updated. Expect a vibrant atmosphere with numerous student clubs, state-of-the-art facilities, and a diverse community."}
                                    </p>
                                </div>
                            )}
                            {activeTab === 'admission' && (
                                <div className="fade-in">
                                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Admission Requirements</h3>
                                    <p style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>
                                        {university.admissionCriteria || "Admission details vary by program. Generally requires academic transcripts, English proficiency (IELTS/TOEFL), and a Statement of Purpose."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="detail-sidebar">
                        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '24px', color: 'white', position: 'sticky', top: '100px' }}>
                            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <iconify-icon icon="ri:send-plane-fill" style={{ color: '#06b6d4' }}></iconify-icon>
                                Interested?
                            </h4>
                            <p style={{ opacity: 0.8, fontSize: '15px', marginBottom: '25px', lineHeight: '1.6' }}>
                                Start your journey today. Our expert advisors will guide you through the entire application process.
                            </p>
                            <Link to="/register" style={{
                                display: 'block',
                                background: 'white',
                                color: '#1e293b',
                                padding: '16px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                fontWeight: '700',
                                marginBottom: '12px'
                            }}>
                                Apply Now
                            </Link>
                            <Link to="/free-consultation" style={{
                                display: 'block',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                padding: '16px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                fontWeight: '700',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                Book Free Consultation
                            </Link>

                            <hr style={{ margin: '30px 0', opacity: 0.1 }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.8 }}>
                                    <iconify-icon icon="ri:map-pin-2-fill"></iconify-icon>
                                    <span style={{ fontSize: '14px' }}>{university.location || university.country}</span>
                                </div>
                                {university.websiteUrl && (
                                    <a href={university.websiteUrl.startsWith('http') ? university.websiteUrl : `https://${university.websiteUrl}`}
                                        target="_blank" rel="noreferrer"
                                        style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#06b6d4', textDecoration: 'none', fontSize: '14px' }}>
                                        <iconify-icon icon="ri:global-line"></iconify-icon>
                                        Official Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UniversityDetail;
