import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "../index.css";
import "./CourseMatching.css";

// Local Project Assets
import path1 from "../assets/images/smiling-students-standing-with-notepad.jpg.jpeg";
import path2 from "../assets/images/diverse_students_library_1770056302151.png";
import path3 from "../assets/images/university_consulting_session_1770056274181.png";
import heroBg from "../assets/images/glamorous-female-student-red-jacket-sitting-yard-front-college-with-computer.jpg.jpeg";
import story1 from "../assets/images/story-1.webp";
import story3 from "../assets/images/story-3.webp";
import supportBg from "../assets/images/support-bg.webp";

gsap.registerPlugin(ScrollTrigger);

function CourseMatching() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  useEffect(() => {
    // Reset mobile submenu when main menu is closed
    if (!isMenuOpen) {
      setIsMobileSubmenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Scroll listener for navbar
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
    }, { threshold: 0.1 });

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

  const disciplines = [
    { name: "Business", icon: "lucide:briefcase" },
    { name: "Engineering", icon: "lucide:settings" },
    { name: "IT", icon: "lucide:monitor" },
    { name: "Medicine", icon: "lucide:heart-pulse" },
    { name: "Law", icon: "lucide:scale" },
    { name: "Arts & Design", icon: "lucide:palette" },
    { name: "Psychology", icon: "lucide:brain" },
    { name: "Nursing", icon: "lucide:stethoscope" },
    { name: "Accounting", icon: "lucide:calculator" },
    { name: "Education", icon: "lucide:book-open" },
    { name: "Hospitality", icon: "lucide:building" },
    { name: "Media", icon: "lucide:camera" },
  ];

  const faqData = [
    { q: "How do you determine which courses fit me best?", a: "We analyze your academic history, career goals, budget, and personal preferences to match you with programs that have high success rates for students with similar profiles." },
    { q: "Is this service available for postgraduate students?", a: "Yes, we handle both undergraduate and postgraduate course matching, including specialized Master's and PhD programs." },
    { q: "Do you have partnerships with top-tier universities?", a: "We work with over 100+ institutions globally, ranging from prestigious research universities to specialized vocational colleges." },
  ];

  return (
    <div className="cm-page">
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="nav-container">
          <div className="nav-main">
            <div className="nav-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              MATSOLS
            </div>
            <div className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <div className="nav-item-dropdown">
                <Link to="/what-we-offer" className="nav-link nav-dropdown active">
                  What we Offer
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                <div className="nav-dropdown-menu">
                  <Link to="/what-we-offer/university-admissions" className="dropdown-link">University Admissions</Link>
                  <Link to="/what-we-offer/course-matching" className="dropdown-link active">Course Matching</Link>
                  <Link to="/what-we-offer/visa-support" className="dropdown-link">Visa Support</Link>
                  <Link to="/what-we-offer/institutional-representation" className="dropdown-link">Institutional Representation</Link>
                </div>
              </div>
              <a href="#" className="nav-link">Universities</a>
              <Link to="/faqs" className="nav-link">FAQs</Link>
              <a href="#" className="nav-link">Contact</a>
            </div>

            <div className="nav-actions">
              <a href="#" className="btn btn-primary nav-cta">Free Consultation</a>
              <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
                <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-viewport">
            <div className="mobile-menu-slider" style={{transform: isMobileSubmenuOpen ? 'translateX(-50%)' : 'translateX(0)'}}>
              <div className="mobile-menu-view">
                <div className="mobile-menu-links">
                  <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                  <div className="mobile-link mobile-forward-link" style={{cursor:'default'}}>
                    <Link to="/what-we-offer" onClick={() => setIsMenuOpen(false)} style={{ color: 'inherit', textDecoration: 'none' }}>What we Offer</Link>
                    <div onClick={(e) => { e.stopPropagation(); setIsMobileSubmenuOpen(true); }} style={{ cursor: 'pointer', paddingLeft: '20px', display: 'flex', alignItems: 'center', height: '100%' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <a href="#" className="mobile-link">Universities</a>
                  <Link to="/faqs" className="mobile-link" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
                  <a href="#" className="mobile-link">Contact</a>
                  <a href="#" className="btn btn-primary">Free Consultation</a>
                </div>
              </div>
              <div className="mobile-menu-view">
                <button className="mobile-back-btn" onClick={() => setIsMobileSubmenuOpen(false)}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div style={{height: '60px'}}></div>
                <div className="mobile-menu-links">
                  <Link to="/what-we-offer/university-admissions" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>University Admissions</Link>
                  <Link to="/what-we-offer/course-matching" className="mobile-sublink active" onClick={() => setIsMenuOpen(false)}>Course Matching</Link>
                  <Link to="/what-we-offer/visa-support" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Visa Support</Link>
                  <Link to="/what-we-offer/institutional-representation" className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>Institutional Representation</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="cm-hero">
        <div className="cm-hero__bg" style={{backgroundImage: `url(${heroBg})`}}></div>
        <div className="cm-hero__overlay"></div>
        <div className="cm-hero__content">
          <h1 className="cm-hero__title anim-hidden anim-up">
            Your Degree Should Work for<br />
            Your Future - <span>Not Just Today</span>
          </h1>
          <p className="cm-hero__subtitle anim-hidden anim-up delay-100">
            Personalized course recommendations based on your unique profile and career goals.
          </p>
          <div className="cm-hero__actions anim-hidden anim-up delay-200">
            <button className="btn btn-primary">Start Matching</button>
            <button className="btn btn-outline-white">Watch How it Works</button>
          </div>
        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section className="cm-approach cm-container">
        <h2 className="cm-approach__title anim-hidden anim-up">Our Approach</h2>
        
        <div className="cm-approach__row anim-hidden anim-left">
          <div className="cm-approach__image-wrap">
            <img src={path1} alt="Counseling" />
          </div>
          <div className="cm-approach__text">
            <h3>One-to-One Counseling</h3>
            <p>Our experts provide personalized guidance through one-on-one sessions, identifying your strengths and academic interests.</p>
          </div>
        </div>

        <div className="cm-approach__row reverse anim-hidden anim-right">
          <div className="cm-approach__image-wrap">
            <img src={path2} alt="Recommendations" />
          </div>
          <div className="cm-approach__text">
            <h3>Career-Aligned Recommendations</h3>
            <p>We suggest courses that directly align with your long-term career aspirations and market requirements.</p>
          </div>
        </div>

        <div className="cm-approach__row anim-hidden anim-left">
          <div className="cm-approach__image-wrap">
            <img src={path3} alt="International" />
          </div>
          <div className="cm-approach__text">
            <h3>International Destinations</h3>
            <p>Explore courses across top global study destinations, from the UK and USA to Canada and Australia.</p>
          </div>
        </div>

        <div className="cm-approach__row reverse anim-hidden anim-right">
          <div className="cm-approach__image-wrap">
            <img src={supportBg} alt="Trend Analysis" />
          </div>
          <div className="cm-approach__text">
            <h3>Market Trend Analysis</h3>
            <p>Data-driven insights into emerging job markets to ensure your degree remains valuable after graduation.</p>
          </div>
        </div>
      </section>

      {/* POPULAR DISCIPLINES */}
      <section className="cm-disciplines">
        <div className="cm-container">
          <h2 className="cm-disciplines__title anim-hidden anim-up">Popular Disciplines</h2>
          <div className="cm-disciplines__grid">
            {disciplines.map((d, i) => (
              <div key={i} className={`cm-discipline-card anim-hidden anim-up delay-${i % 4 * 100}`}>
                <div className="cm-discipline-icon">
                  <iconify-icon icon={d.icon}></iconify-icon>
                </div>
                <span className="cm-discipline-name">{d.name}</span>
              </div>
            ))}
          </div>
          <button className="cm-disciplines__see-more anim-hidden anim-up">See More</button>
        </div>
      </section>

      {/* WHAT WE EXAMINE */}
      <section className="cm-examine">
        <div className="cm-container cm-examine__grid">
          <div className="cm-examine__image anim-hidden anim-left">
            <img src={supportBg} alt="Team" />
          </div>
          <div className="cm-examine__content anim-hidden anim-right">
            <h2>What We Examine</h2>
            <div className="cm-examine__list">
              <div className="cm-examine-card">
                <div className="cm-examine-bullet"></div>
                <div className="cm-examine-info">
                  <h4>Academic Background</h4>
                  <p>Deep dive into your qualifications and scoring history.</p>
                </div>
              </div>
              <div className="cm-examine-card">
                <div className="cm-examine-bullet"></div>
                <div className="cm-examine-info">
                  <h4>Financial Goals</h4>
                  <p>Matching with your budget and available scholarship opportunities.</p>
                </div>
              </div>
              <div className="cm-examine-card">
                <div className="cm-examine-bullet"></div>
                <div className="cm-examine-info">
                  <h4>Personal Preferences</h4>
                  <p>Campus life, location, and cultural fit adjustments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="cm-stats">
        <div className="cm-container cm-stats__grid">
          <div className="cm-stat-item anim-hidden anim-up">
            <h2>85%</h2>
            <p>Success Rate</p>
          </div>
          <div className="cm-stat-item anim-hidden anim-up delay-100">
            <h2>500k+</h2>
            <p>Applications</p>
          </div>
          <div className="cm-stat-item anim-hidden anim-up delay-200">
            <h2>100+</h2>
            <p>Universities</p>
          </div>
          <div className="cm-stat-item anim-hidden anim-up delay-300">
            <h2>10k+</h2>
            <p>Students</p>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="cm-stories cm-container">
        <h2 className="cm-stories__title anim-hidden anim-up">Career Success Stories</h2>
        <div className="cm-stories__grid">
          <div className="cm-story-card anim-hidden anim-up delay-100">
            <img src={story1} alt="Sarah" className="cm-story-avatar" />
            <p>"The course matching process was simple and efficient. I found exactly what I needed."</p>
            <div className="cm-story-info">
              <h4>Sarah J.</h4>
              <span>Manchester Met</span>
            </div>
          </div>
          <div className="cm-story-card anim-hidden anim-up delay-200">
            <img src={story1} alt="Michael" className="cm-story-avatar" />
            <p>"Found a course that aligned perfectly with my career goals. Highly recommended!"</p>
            <div className="cm-story-info">
              <h4>Michael T.</h4>
              <span>Uni of Leeds</span>
            </div>
          </div>
          <div className="cm-story-card anim-hidden anim-up delay-300">
            <img src={story3} alt="Elena" className="cm-story-avatar" />
            <p>"Their insights into the international job market were a game-changer for me."</p>
            <div className="cm-story-info">
              <h4>Elena R.</h4>
              <span>RMIT University</span>
            </div>
          </div>
        </div>
      </section>

      {/* MATCHING PROCESS */}
      <section className="cm-process">
        <div className="cm-container">
          <h2 className="cm-process__title anim-hidden anim-up">Our Matching Process</h2>
          <div className="cm-process__grid">
            <div className="cm-process-step anim-hidden anim-up delay-100">
              <div className="cm-process-icon"><iconify-icon icon="lucide:message-circle"></iconify-icon></div>
              <span>Consultation</span>
            </div>
            <div className="cm-process-step anim-hidden anim-up delay-200">
              <div className="cm-process-icon"><iconify-icon icon="lucide:user"></iconify-icon></div>
              <span>Profile Analysis</span>
            </div>
            <div className="cm-process-step anim-hidden anim-up delay-300">
              <div className="cm-process-icon"><iconify-icon icon="lucide:check-circle"></iconify-icon></div>
              <span>Course Selection</span>
            </div>
            <div className="cm-process-step anim-hidden anim-up delay-400">
              <div className="cm-process-icon"><iconify-icon icon="lucide:award"></iconify-icon></div>
              <span>Final Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="cm-faq cm-container">
        <h2 className="cm-faq__title anim-hidden anim-up">Common Questions</h2>
        <div className="cm-faq__list">
          {faqData.map((f, i) => (
            <div key={i} className={`cm-faq-item anim-hidden anim-up delay-${i * 100}`}>
              <div className="cm-faq-question" onClick={() => setFaqActive(faqActive === i ? null : i)}>
                {f.q}
                <iconify-icon icon={faqActive === i ? "lucide:chevron-up" : "lucide:chevron-down"}></iconify-icon>
              </div>
              {faqActive === i && <div className="cm-faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cm-cta">
        <div className="cm-cta__bg" style={{backgroundImage: `url(${heroBg})`}}></div>
        <div className="cm-cta__overlay"></div>
        <div className="cm-container cm-cta__content">
          <h2 className="anim-hidden anim-up">Ready to Find Your Perfect Course?</h2>
          <p className="anim-hidden anim-up delay-100">Start your journey today with our expert guidance and personalized matching.</p>
          <div className="cm-cta__btns anim-hidden anim-up delay-200">
            <button className="btn btn-primary">Get Started Now</button>
            <button className="btn btn-outline-white">Contact Support</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="watermark-text">MATSOLS</div>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: "span 2" }}>
              <div className="footer-logo">MATSOLS</div>
              <p>Building bridges to global education since 2005. We are the architects of your international career.</p>
              <div className="footer-social">
                <a href="#" className="social-icon"><iconify-icon icon="line-md:linkedin" width="22" height="22"></iconify-icon></a>
                <a href="#" className="social-icon"><iconify-icon icon="line-md:twitter-x" width="22" height="22"></iconify-icon></a>
                <a href="#" className="social-icon"><iconify-icon icon="line-md:instagram" width="22" height="22"></iconify-icon></a>
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
              <p className="footer-newsletter-text">Weekly insights on visa regulations.</p>
              <input type="email" className="newsletter-input" placeholder="Email address" />
            </div>
          </div>
          <div className="footer-bottom">Copyright © 2026 MATSOLS. Built for Excellence.</div>
        </div>
      </footer>
    </div>
  );
}

export default CourseMatching;
