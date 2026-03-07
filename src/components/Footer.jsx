import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="watermark-text">MATSOLS</div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: "span 2" }}>
            <div className="footer-logo">MATSOLS</div>
            <p>
              Building bridges to global education since 2005. We are the
              architects of your international career.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">
                <iconify-icon icon="line-md:linkedin" width="22" height="22"></iconify-icon>
              </a>
              <a href="#" className="social-icon">
                <iconify-icon icon="line-md:twitter-x" width="22" height="22"></iconify-icon>
              </a>
              <a href="#" className="social-icon">
                <iconify-icon icon="line-md:instagram" width="22" height="22"></iconify-icon>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <nav className="footer-links">
              <Link to="/universities">Study in UK</Link>
              <Link to="/universities">Study in USA</Link>
              <Link to="/universities">Study in Canada</Link>
              <Link to="/universities">Study in Australia</Link>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <nav className="footer-links">
              <Link to="/what-we-offer/university-admissions">Admissions</Link>
              <Link to="/what-we-offer/visa-support">Visa Support</Link>
              <Link to="/degrees">Scholarships</Link>
              <Link to="/admin">Staff Portal</Link>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="footer-newsletter-text">
              Weekly insights on visa regulations.
            </p>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Email address"
            />
          </div>
        </div>
        <div className="footer-bottom">
          Copyright © 2026 MATSOLS. Built for Excellence.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
