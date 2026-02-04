import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "../index.css";
import "./UniversityAdmissions.css";

// Placeholder images - replace with actual assets
// Local Assets
import heroBg from "../assets/images/graduation-cap-with-globe-digital-art-style-education-day.jpg.jpeg";
import cardImg1 from "../assets/images/girl-checks-her-tablet-standing-street.jpg.jpeg";
import cardImg2 from "../assets/images/dreamy-teen-girl-with-textbook.jpg.jpeg";
import cardImg3 from "../assets/images/low-angle-cheerful-team-students-passed-test-by-preparing-all-together.jpg.jpeg";
import cardImg4 from "../assets/images/digital_admissions_portal_1770056288503.png";
import uniImg1 from "../assets/images/path-1.webp";
import uniImg2 from "../assets/images/path-2.webp";
import uniImg3 from "../assets/images/path-3.webp";
import uniImg4 from "../assets/images/support-bg.webp";
import avatar1 from "../assets/images/story-1.webp";
import avatar2 from "../assets/images/story-3.webp";
import avatar3 from "../assets/images/hero-avatar.webp";

gsap.registerPlugin(ScrollTrigger);

function UniversityAdmissions() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  // Reset mobile submenu when main menu is closed
  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileSubmenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // CSS Animation Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" 
    });

    document.querySelectorAll('.anim-hidden').forEach((el) => observer.observe(el));

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  const faqData = [
    { q: "What documents do I need to submit?", a: "You'll typically need academic transcripts, personal statement, letters of recommendation, and proof of English proficiency (IELTS/TOEFL)." },
    { q: "How long does the application process take?", a: "The process usually takes 4-8 weeks from submission to decision, depending on the university and program." },
    { q: "Can you help with scholarship applications?", a: "Absolutely! We identify relevant scholarships and guide you through each application to maximize your chances." },
    { q: "Do you guarantee university acceptance?", a: "While we can't guarantee acceptance, our strategic approach and expert guidance significantly improve your chances." },
  ];

  return (
    <div className="ua-page">
      {/* NAVBAR (Copied from Home.jsx) */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
      >
        <div className="nav-container">
          <div className="nav-main">
            <div className="nav-logo">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="var(--primary-orange)"
                ></path>
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              MATSOLS
            </div>
            <div className="nav-menu">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
              {/* DROPDOWN MENU */}
              <div className="nav-item-dropdown">
                <Link to="/what-we-offer" className="nav-link nav-dropdown active">
                    What we Offer
                    <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M6 9l6 6 6-6" />
                    </svg>
                </Link>
                {/* Desktop Dropdown Content */}
                <div className="nav-dropdown-menu">
                    <Link to="/what-we-offer/university-admissions" className="dropdown-link active">
                        University Admissions
                    </Link>
                    <Link to="/what-we-offer/course-matching" className="dropdown-link">
                        Course Matching
                    </Link>
                     <Link to="/what-we-offer/visa-support" className="dropdown-link">
                         Visa Support
                     </Link>
                    <Link to="/what-we-offer/institutional-representation" className="dropdown-link">
                        Institutional Representation
                    </Link>
                </div>
              </div>
              <a href="#" className="nav-link">
                Universities
              </a>
              <Link to="/faqs" className="nav-link">
                FAQs
              </Link>
              <a href="#" className="nav-link">
                Contact
              </a>
            </div>

            <div className="nav-actions">
              <Link to="/login" className="nav-link" style={{marginRight: '20px'}}>Sign In</Link>
              <Link to="/free-consultation" className="btn btn-primary nav-cta">
                Free Consultation
              </Link>
              <button
                className="hamburger"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
            <div className="mobile-menu-viewport">
                <div 
                    className="mobile-menu-slider" 
                    style={{transform: isMobileSubmenuOpen ? 'translateX(-50%)' : 'translateX(0)'}}
                >
                    {/* VIEW 1: MAIN MENU */}
                    <div className="mobile-menu-view">
                        <div className="mobile-menu-links">
                            <Link
                                to="/"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            
                            {/* FORWARD LINK TO SUBMENU */}
                            <div className="mobile-link mobile-forward-link" style={{cursor:'default'}}>
                                <Link 
                                    to="/what-we-offer" 
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    What we Offer
                                </Link>
                                <div 
                                    onClick={(e) => { e.stopPropagation(); setIsMobileSubmenuOpen(true); }}
                                    style={{ cursor: 'pointer', paddingLeft: '20px', display: 'flex', alignItems: 'center', height: '100%' }}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Universities
                            </a>
                            <Link
                                to="/faqs"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                FAQs
                            </Link>
                            <a
                                href="#"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                            <a
                                href="#"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                            <Link
                                to="/login"
                                className="mobile-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/free-consultation"
                                className="btn btn-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Free Consultation
                            </Link>
                        </div>
                    </div>

                    {/* VIEW 2: SUBMENU */}
                    <div className="mobile-menu-view" style={{position:'relative'}}>
                        <button 
                            className="mobile-back-btn" 
                            onClick={() => setIsMobileSubmenuOpen(false)} 
                            style={{
                                position: 'absolute',
                                top: '0', 
                                left: '0',
                                padding: '10px',
                                zIndex: 10
                            }}
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <div style={{height: '60px'}}></div>

                        <div className="mobile-menu-links" style={{marginTop:'10px'}}>
                            <Link to="/what-we-offer/university-admissions" className="mobile-sublink active" onClick={() => setIsMenuOpen(false)}>University Admissions</Link>
                            <Link to="/what-we-offer/course-matching" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Course Matching</Link>
                             <Link to="/what-we-offer/visa-support" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Visa Support</Link>
                            <Link to="/what-we-offer/institutional-representation" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Institutional Representation</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="ua-hero">
        <div className="ua-hero__bg" style={{backgroundImage: `url(${heroBg})`}}></div>
        <div className="ua-hero__overlay"></div>
        <div className="ua-hero__inner">
          <h1 className="ua-hero__title anim-hidden anim-up">
            Discover the Right University –<br />
            <span className="ua-hero__highlight">Without the Stress</span>
          </h1>
          <p className="ua-hero__desc anim-hidden anim-up delay-100">
            Personalized guidance to match you with top universities around the world. 
            We handle the research, strategy, and paperwork, so you can focus on your future.
          </p>
          <a href="#what-we-do" className="ua-hero__btn anim-hidden anim-up delay-200">
            Explore Our Services
          </a>
        </div>
      </section>

      {/* ========== WHAT WE DO SECTION ========== */}
      <section id="what-we-do" className="ua-whatwedo">
        <div className="container">
          <div className="ua-section-header anim-hidden anim-up">
            <h2 className="ua-section-title">What We Do</h2>
            <p className="ua-section-subtitle">Comprehensive support for every step of your university journey.</p>
          </div>

          <div className="ua-whatwedo__grid">
            <div className="ua-whatwedo__card anim-hidden anim-up delay-100">
              <img src={cardImg1} alt="Profile Assessment" />
              <div className="ua-whatwedo__card-overlay">
                <h3 className="ua-whatwedo__card-title">Profile Assessment</h3>
                <p className="ua-whatwedo__card-desc">In-depth evaluation of your academic strengths</p>
              </div>
            </div>
            <div className="ua-whatwedo__card anim-hidden anim-up delay-200">
              <img src={cardImg2} alt="University Shortlisting" />
              <div className="ua-whatwedo__card-overlay">
                <h3 className="ua-whatwedo__card-title">University Shortlisting</h3>
                <p className="ua-whatwedo__card-desc">Strategic selection based on your goals</p>
              </div>
            </div>
            <div className="ua-whatwedo__card anim-hidden anim-up delay-300">
              <img src={cardImg3} alt="University Matching" />
              <div className="ua-whatwedo__card-overlay">
                <h3 className="ua-whatwedo__card-title">University Matching</h3>
                <p className="ua-whatwedo__card-desc">Find your perfect academic fit</p>
              </div>
            </div>
            <div className="ua-whatwedo__card anim-hidden anim-up delay-400">
              <img src={cardImg4} alt="Application Preparation" />
              <div className="ua-whatwedo__card-overlay">
                <h3 className="ua-whatwedo__card-title">Application Prep</h3>
                <p className="ua-whatwedo__card-desc">Polished essays and documents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE OUR GUIDANCE ========== */}
      <section className="ua-whychoose">
        <div className="container">
          <div className="ua-whychoose__content">
            <div className="ua-whychoose__left anim-hidden anim-left">
              <h2>Why Choose Our Guidance</h2>
              <p>With years of experience and a deep network of university partnerships, we provide unmatched insight into the admissions landscape.</p>
            </div>
            <div className="ua-whychoose__features anim-hidden anim-right">
              <div className="ua-feature-item">
                <div className="ua-feature-icon">
                  <iconify-icon icon="lucide:check-circle"></iconify-icon>
                </div>
                <div className="ua-feature-content">
                  <h4>Zero Third-Party Fees</h4>
                  <p>We work directly with universities, so you never pay hidden fees.</p>
                </div>
              </div>
              <div className="ua-feature-item">
                <div className="ua-feature-icon">
                  <iconify-icon icon="lucide:brain"></iconify-icon>
                </div>
                <div className="ua-feature-content">
                  <h4>Expert Knowledge</h4>
                  <p>Our advisors have first-hand experience with top global institutions.</p>
                </div>
              </div>
              <div className="ua-feature-item">
                <div className="ua-feature-icon">
                  <iconify-icon icon="lucide:users"></iconify-icon>
                </div>
                <div className="ua-feature-content">
                  <h4>Personalized Approach</h4>
                  <p>Every student receives a tailored strategy matching their unique profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUR ADMISSIONS PROCESS ========== */}
      <section className="ua-process">
        <div className="container">
          <div className="ua-section-header anim-hidden anim-up">
            <h2 className="ua-section-title">Our Admissions Process</h2>
            <p className="ua-section-subtitle">A clear, proven path to your dream university.</p>
          </div>

          <div className="ua-process__timeline">
            <div className="ua-process__step anim-hidden anim-up delay-100">
              <div className="ua-process__icon">
                <iconify-icon icon="lucide:message-circle"></iconify-icon>
              </div>
              <h4>Consult</h4>
              <p>Free initial consultation to understand your goals</p>
            </div>
            <div className="ua-process__step anim-hidden anim-up delay-200">
              <div className="ua-process__icon">
                <iconify-icon icon="lucide:target"></iconify-icon>
              </div>
              <h4>Strategize</h4>
              <p>Create a tailored application roadmap</p>
            </div>
            <div className="ua-process__step anim-hidden anim-up delay-300">
              <div className="ua-process__icon">
                <iconify-icon icon="lucide:file-text"></iconify-icon>
              </div>
              <h4>Apply</h4>
              <p>Submit polished and compelling applications</p>
            </div>
            <div className="ua-process__step anim-hidden anim-up delay-400">
              <div className="ua-process__icon">
                <iconify-icon icon="lucide:award"></iconify-icon>
              </div>
              <h4>Secure</h4>
              <p>Celebrate your acceptance and plan next steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PARTNER UNIVERSITIES ========== */}
      <section className="ua-partners">
        <div className="container">
          <div className="ua-section-header anim-hidden anim-up">
            <h2 className="ua-section-title">Partner Universities</h2>
            <p className="ua-section-subtitle">We have direct relationships with 100+ leading institutions worldwide.</p>
          </div>

          <div className="ua-partners__grid">
            <div className="ua-partner-card anim-hidden anim-up delay-100">
              <img src={uniImg1} alt="University 1" />
              <div className="ua-partner-card__overlay">
                <span className="ua-partner-card__name">University of Manchester</span>
              </div>
            </div>
            <div className="ua-partner-card anim-hidden anim-up delay-200">
              <img src={uniImg2} alt="University 2" />
              <div className="ua-partner-card__overlay">
                <span className="ua-partner-card__name">University of Bristol</span>
              </div>
            </div>
            <div className="ua-partner-card anim-hidden anim-up delay-300">
              <img src={uniImg3} alt="University 3" />
              <div className="ua-partner-card__overlay">
                <span className="ua-partner-card__name">Queen Mary University</span>
              </div>
            </div>
            <div className="ua-partner-card anim-hidden anim-up delay-400">
              <img src={uniImg4} alt="University 4" />
              <div className="ua-partner-card__overlay">
                <span className="ua-partner-card__name">University of Birmingham</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STUDENT SUCCESS STORIES ========== */}
      <section className="ua-stories">
        <div className="container">
          <div className="ua-section-header anim-hidden anim-up">
            <h2 className="ua-section-title">Student Success Stories</h2>
            <p className="ua-section-subtitle">Real results from real students we've helped.</p>
          </div>

          <div className="ua-stories__grid">
            <div className="ua-story-card anim-hidden anim-up delay-100">
              <img src={avatar1} alt="Sarah" className="ua-story-card__img" />
              <p className="ua-story-card__quote">"MATSOLS helped me get into my dream university. Their guidance was invaluable!"</p>
              <h4 className="ua-story-card__name">Sarah M.</h4>
              <p className="ua-story-card__uni">University of Manchester</p>
            </div>
            <div className="ua-story-card anim-hidden anim-up delay-200">
              <img src={avatar2} alt="Ahmed" className="ua-story-card__img" />
              <p className="ua-story-card__quote">"The personalized approach made all the difference. I couldn't have done it without them."</p>
              <h4 className="ua-story-card__name">Ahmed K.</h4>
              <p className="ua-story-card__uni">Queen Mary University</p>
            </div>
            <div className="ua-story-card anim-hidden anim-up delay-300">
              <img src={avatar3} alt="Priya" className="ua-story-card__img" />
              <p className="ua-story-card__quote">"From application to visa, MATSOLS was with me every step of the way."</p>
              <h4 className="ua-story-card__name">Priya S.</h4>
              <p className="ua-story-card__uni">University of Bristol</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="ua-faq">
        <div className="container">
          <div className="ua-section-header anim-hidden anim-up">
            <h2 className="ua-section-title">Common Questions</h2>
          </div>

          <div className="ua-faq__container">
            {faqData.map((item, idx) => (
              <div 
                key={idx} 
                className={`ua-faq-item ${faqActive === idx ? 'active' : ''}`}
                onClick={() => setFaqActive(faqActive === idx ? null : idx)}
              >
                <div className="ua-faq-question">
                  <span>{item.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                <div className="ua-faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="ua-cta">
        <div className="container ua-cta__inner">
          <h2 className="anim-hidden anim-up">Ready to Find Your Perfect University?</h2>
          <p className="anim-hidden anim-up delay-100">Book a free consultation today and take the first step toward your dream education.</p>
          <a href="#" className="ua-cta__btn anim-hidden anim-up delay-200">
            Schedule Free Consultation
          </a>
        </div>
      </section>

      {/* FOOTER (Copied from Home.jsx) */}
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
                  <iconify-icon
                    icon="line-md:linkedin"
                    width="22"
                    height="22"
                  ></iconify-icon>
                </a>
                <a href="#" className="social-icon">
                  <iconify-icon
                    icon="line-md:twitter-x"
                    width="22"
                    height="22"
                  ></iconify-icon>
                </a>
                <a href="#" className="social-icon">
                  <iconify-icon
                    icon="line-md:instagram"
                    width="22"
                    height="22"
                  ></iconify-icon>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Destinations</h4>
              <nav className="footer-links">
                <a href="#">Study in UK</a>
                <a href="#">Study in USA</a>
                <a href="#">Study in Canada</a>
                <a href="#">Study in Australia</a>
              </nav>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <nav className="footer-links">
                <a href="#">Admissions</a>
                <a href="#">Visa Support</a>
                <a href="#">Scholarships</a>
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
    </div>
  );
}

export default UniversityAdmissions;
