import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset mobile submenu when main menu is closed
  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileSubmenuOpen(false);
    }
  }, [isMenuOpen]);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            MATSOLS
          </Link>

          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>

            <div className="nav-item-dropdown">
              <Link to="/what-we-offer" className="nav-link">
                What we Offer
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                <Link to="/what-we-offer/university-admissions" className="dropdown-link">University Admissions</Link>
                <Link to="/what-we-offer/course-matching" className="dropdown-link">Course Matching</Link>
                <Link to="/what-we-offer/visa-support" className="dropdown-link">Visa Support</Link>
                <Link to="/what-we-offer/institutional-representation" className="dropdown-link">Institutional Representation</Link>
              </div>
            </div>

            <Link to="/universities" className="nav-link">Universities</Link>
            <Link to="/faqs" className="nav-link">FAQs</Link>
            <a href="#" className="nav-link">Contact</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="btn-icon" aria-label="Sign In">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/free-consultation" className="btn btn-primary nav-cta">Free Consultation</Link>
            
            <div className="mobile-nav-controls">
              <Link to="/login" className="mobile-user-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-viewport">
          <div className="mobile-menu-slider" style={{ transform: isMobileSubmenuOpen ? "translateX(-50%)" : "translateX(0)" }}>
            <div className="mobile-menu-view">
              <div className="mobile-menu-links">
                <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                
                <div className="mobile-link mobile-forward-link">
                  <Link to="/what-we-offer" onClick={() => setIsMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>What we Offer</Link>
                  <div onClick={(e) => { e.stopPropagation(); setIsMobileSubmenuOpen(true); }} style={{ cursor: "pointer", paddingLeft: "20px", display: "flex", alignItems: "center", height: "100%" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <Link to="/universities" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Universities</Link>
                <Link to="/faqs" className="mobile-link" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
                <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
                
                <div className="mobile-actions">
                  <Link to="/free-consultation" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setIsMenuOpen(false)}>Free Consultation</Link>
                </div>
              </div>
            </div>

            <div className="mobile-menu-view" style={{ position: "relative" }}>
              <button className="mobile-back-btn" onClick={() => setIsMobileSubmenuOpen(false)} style={{ position: "absolute", top: "0", left: "0", padding: "10px", zIndex: 10 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{ height: "60px" }}></div>
              <div className="mobile-menu-links" style={{ marginTop: "10px" }}>
                <Link to="/what-we-offer/university-admissions" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>University Admissions</Link>
                <Link to="/what-we-offer/course-matching" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Course Matching</Link>
                <Link to="/what-we-offer/visa-support" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Visa Support</Link>
                <Link to="/what-we-offer/institutional-representation" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Institutional Representation</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
