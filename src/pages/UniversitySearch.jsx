import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '../index.css';
import './UniversitySearch.css';

const UniversitySearch = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const universities = [
    {
      id: 1,
      name: "Imperial College London",
      country: "UK",
      city: "London",
      ranking: "#6 QS World",
      tuition: "£28,000",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1080&auto=format&fit=crop",
      tags: ["Engineering", "Medicine", "STEM"]
    },
    {
      id: 2,
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto",
      ranking: "#21 QS World",
      tuition: "$45,000",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1080&auto=format&fit=crop",
      tags: ["Research", "Business", "CS"]
    },
    {
      id: 3,
      name: "Australian National University",
      country: "Australia",
      city: "Canberra",
      ranking: "#34 QS World",
      tuition: "$38,000",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1080&auto=format&fit=crop",
      tags: ["Law", "Medicine", "Environment"]
    },
    {
      id: 4,
      name: "Stanford University",
      country: "USA",
      city: "California",
      ranking: "#3 QS World",
      tuition: "$56,000",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1080&auto=format&fit=crop",
      tags: ["Tech", "Entrepreneurship", "AI"]
    },
    {
      id: 5,
      name: "University of Manchester",
      country: "UK",
      city: "Manchester",
      ranking: "#32 QS World",
      tuition: "£22,000",
      image: "https://images.unsplash.com/photo-1506765336936-bb05e7e06295?q=80&w=1080&auto=format&fit=crop",
      tags: ["History", "Engineering", "Arts"]
    },
    {
      id: 6,
      name: "University of Melbourne",
      country: "Australia",
      city: "Melbourne",
      ranking: "#14 QS World",
      tuition: "$42,000",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1080&auto=format&fit=crop",
      tags: ["Med-Tech", "Arts", "Science"]
    }
  ];

  const filteredUnis = universities.filter(uni => {
    const matchesFilter = activeFilter === 'All' || uni.country === activeFilter;
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uni.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="export-wrapper">
      <div className="uni-discovery-page">
        <Header />
        
        <div className="uni-container">
          <div className="uni-header">
            <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Explore World-Class Universities</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px', fontFamily: 'Inter, sans-serif' }}>
              Browse through our portfolio of elite institutional partners and find the perfect match for your academic goals.
            </p>
          </div>

          <div className="uni-layout">
            <aside className="uni-filters">
              <div className="filter-group">
                <h4 style={{ fontFamily: 'Inter, sans-serif' }}>Study Destination</h4>
                <div className="filter-options">
                  {['All', 'UK', 'USA', 'Canada', 'Australia'].map(dest => (
                    <label key={dest} className="filter-checkbox" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <input 
                        type="radio" 
                        name="destination"
                        checked={activeFilter === dest}
                        onChange={() => setActiveFilter(dest)}
                      />
                      {dest}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 style={{ fontFamily: 'Inter, sans-serif' }}>Program Level</h4>
                <div className="filter-options">
                  {['Undergraduate', 'Postgraduate', 'PhD/Research'].map(level => (
                    <label key={level} className="filter-checkbox" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <input type="checkbox" defaultChecked />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 style={{ fontFamily: 'Inter, sans-serif' }}>World Ranking</h4>
                <div className="filter-options">
                  {['Top 10', 'Top 50', 'Top 100', 'Over 100'].map(score => (
                    <label key={score} className="filter-checkbox" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <input type="checkbox" />
                      {score}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div className="uni-main">
              <div className="search-bar-wrap" style={{ marginBottom: '40px', position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search by University name or city..."
                  className="ai-input"
                  style={{ width: '100%', height: '54px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <iconify-icon 
                  icon="ri:search-2-line" 
                  style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '20px' }}
                ></iconify-icon>
              </div>

              <div className="uni-grid">
                {filteredUnis.map(uni => (
                  <div key={uni.id} className="uni-card">
                    <div className="uni-card-img">
                      <img src={uni.image} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="uni-badge">{uni.ranking}</div>
                    </div>
                    <div className="uni-card-content">
                      <h3 className="uni-name" style={{ fontFamily: 'Playfair Display, serif' }}>{uni.name}</h3>
                      <div className="uni-meta">
                        <div className="uni-meta-item" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <iconify-icon icon="ri:map-pin-2-fill"></iconify-icon>
                          {uni.city}, {uni.country}
                        </div>
                        <div className="uni-meta-item" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <iconify-icon icon="ri:graduation-cap-fill"></iconify-icon>
                          {uni.tags.join(' • ')}
                        </div>
                      </div>
                      <div className="uni-card-footer">
                        <div className="uni-price" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {uni.tuition} <span style={{ fontFamily: 'Inter, sans-serif' }}>/ year</span>
                        </div>
                        <Link to="/register" className="btn-apply" style={{ fontFamily: 'Inter, sans-serif' }}>Explore Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUnis.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 0', opacity: 0.5 }}>
                  <iconify-icon icon="ri:search-eye-line" style={{ fontSize: '48px', marginBottom: '20px' }}></iconify-icon>
                  <p style={{ fontFamily: 'Inter, sans-serif' }}>No universities found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UniversitySearch;
