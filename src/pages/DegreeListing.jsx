import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { degreesData } from '../data/degreesData';
import './Degrees.css';

const DegreeListing = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'BA', 'HND', 'MA', 'Certificate'];

    const filteredDegrees = filter === 'All' 
        ? degreesData 
        : degreesData.filter(d => d.level === filter);

    return (
        <div className="degrees-page">
            <Header />
            
            {/* Hero Section */}
            <div className="degrees-hero">
                <div className="degrees-hero-bg"></div>
                <div className="degrees-container relative z-10">
                    <div className="degrees-hero-content">
                        <h1 className="degrees-hero-title">Degrees & Courses</h1>
                        <p className="degrees-hero-subtitle">
                            Explore our wide range of world-class acting, filmmaking, and creative media programs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="degrees-container">
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`category-btn ${filter === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="degrees-container">
                <div className="degree-grid">
                    {filteredDegrees.map((degree) => (
                        <Link 
                            to={`/degrees/${degree.slug}`} 
                            key={degree.slug}
                            className="degree-card"
                        >
                            <div className="degree-badge">
                                {degree.level}
                            </div>
                            <h3 className="degree-name">
                                {degree.name}
                            </h3>
                            <p className="degree-desc">
                                {degree.about}
                            </p>
                            <div className="degree-footer">
                                View Program Details
                                <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DegreeListing;
