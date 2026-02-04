import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "../index.css";
import "./FAQ.css";

gsap.registerPlugin(ScrollTrigger);

const faqCategories = [
  "All Questions",
  "Admissions",
  "Visa & Document",
  "Financial Aid",
  "Scholarships",
  "After Arrival"
];

const faqQuestions = [
  { q: "Do I need perfect grades to study abroad?", a: "Not necessarily. While high grades help, many universities look at your overall profile, including extracurriculars, work experience, and your Statement of Purpose (SOP)." },
  { q: "Is English test mandatory for me?", a: "For most English-speaking countries, tests like IELTS, TOEFL, or Duolingo are mandatory. However, some universities offer waivers based on your previous medium of instruction." },
  { q: "Take a demo class or a look at?", a: "We often organize university webinars and masterclasses where you can experience the teaching style and interact with faculty directly." },
  { q: "How will the university name and when should apply it have?", a: "Application deadlines vary by country and intake (Fall/Spring). Generally, you should start 8-12 months before your intended start date." },
  { q: "Do you help with the full admissions process?", a: "Yes, from shortlisting universities to drafting SOPs and final enrollment, we handle the end-to-end journey." },
  { q: "What if there is no foundation entry level programs?", a: "We can help you find alternative pathways, such as pre-masters or diploma programs that lead into full degree courses." },
  { q: "How long does it take for a response after submit?", a: "Universities typically take 2-6 weeks to issue an offer letter after receiving a complete application." },
  { q: "Which visa do I need?", a: "This depends on the country. For example, you'll need a Tier 4 (Student) visa for the UK or an F-1 visa for the USA. We provide detailed guidance on each." },
  { q: "Do you charge extra for visa support?", a: "Visa consultation is included as part of our comprehensive student service package for registered students." },
  { q: "Are your university partnerships genuine?", a: "Absolutely. MATSOLS is an authorized representative of over 100+ top-tier global institutions." },
  { q: "Do you help with scholarships?", a: "Yes, we identify scholarship opportunities you're eligible for and assist with the application process to maximize your funding." },
  { q: "How much does the average course cost?", a: "Tuition fees vary widely by country and course. We provide a detailed cost-of-attendance breakdown for your specific program." },
  { q: "Do you help with local documentation?", a: "Yes, we guide you through the process of certifying, translating, and preparing all necessary legal documents." },
  { q: "Is my personal information kept confidential?", a: "Privacy is our priority. Your data is handled securely and only shared with universities as part of your application." },
  { q: "Do you assist with pre-departure orientation?", a: "Yes, we hold sessions to prepare you for life abroad, covering everything from culture to currency and mobile SIMs." }
];

const FAQAccordion = ({ question, answer, isActive, onClick, idx }) => {
  const contentRef = useRef(null);
  return (
    <div className={`faq-item ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="faq-question">
        <span>{question}</span>
        <div className="faq-icon-wrap">
          <iconify-icon icon={isActive ? "ri:subtract-fill" : "ri:add-fill"}></iconify-icon>
        </div>
      </div>
      <div 
        className="faq-answer-wrapper"
        style={{ height: isActive ? contentRef.current?.scrollHeight : 0 }}
      >
        <div ref={contentRef} className="faq-answer">
          {answer}
        </div>
      </div>
    </div>
  );
};

function FAQ() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Questions");

  useEffect(() => {
    if (!isMenuOpen) setIsMobileSubmenuOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".anim-hidden").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="faq-page">
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
                <Link to="/what-we-offer" className="nav-link nav-dropdown">
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
              <a href="#" className="nav-link">Universities</a>
              <Link to="/faqs" className="nav-link active">FAQs</Link>
              <a href="#" className="nav-link">Contact</a>
            </div>

            <div className="nav-actions">
              <Link to="/login" className="nav-link" style={{marginRight: '20px'}}>Sign In</Link>
              <Link to="/free-consultation" className="btn btn-primary nav-cta">Free Consultation</Link>
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
                  <Link to="/faqs" className="mobile-link active" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
                  <a href="#" className="mobile-link">Contact</a>
                  <Link to="/login" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  <Link to="/free-consultation" className="btn btn-primary">Free Consultation</Link>
                </div>
              </div>
              <div className="mobile-menu-view">
                <button className="mobile-back-btn" onClick={() => setIsMobileSubmenuOpen(false)}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div style={{height: '60px'}}></div>
                <div className="mobile-menu-links">
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

      {/* HERO SECTION */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero__content">
            <span className="faq-badge anim-hidden anim-up">FAQ SUPPORT CENTER</span>
            <h1 className="faq-hero__title anim-hidden anim-up">Frequently Asked <span>Questions</span></h1>
            <p className="faq-hero__subtitle anim-hidden anim-up">
              Find answers to common questions about studying abroad,<br />
              admissions, visas, and more.
            </p>
            <div className="faq-search-wrap anim-hidden anim-up">
              <div className="faq-search">
                  <input type="text" placeholder="Search for answers (e.g., visa requirements)" />
                  <button className="btn-search">
                      <iconify-icon icon="ri:search-line"></iconify-icon>
                  </button>
              </div>
            </div>
            <button className="btn-secondary anim-hidden anim-up">Explore Most View Questions</button>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="faq-categories">
        <div className="container">
          <div className="faq-categories__scroll anim-hidden anim-up">
            {faqCategories.map((cat) => (
              <button 
                key={cat} 
                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ LIST SECTION */}
      <section className="faq-list-section">
        <div className="container">
          <div className="faq-accordion-container">
            {faqQuestions.map((item, idx) => (
              <FAQAccordion 
                key={idx}
                idx={idx}
                question={item.q}
                answer={item.a}
                isActive={activeIdx === idx}
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              />
            ))}
          </div>
          <div className="faq-bottom-cta anim-hidden anim-up">
              <h2>Still Have Questions?</h2>
              <p>Can't find the answer you're looking for? Let our experts help you personally.</p>
              <button className="btn btn-primary">Contact Our Advisor Support Today</button>
              <div className="faq-cta-links">
                  <a href="#">Terms & Conditions</a>
                  <span>|</span>
                  <a href="#">Privacy Policy</a>
              </div>
          </div>
        </div>
      </section>

      {/* POPULAR TOPICS */}
      <section className="faq-topics">
          <div className="container">
              <div className="faq-topics__header anim-hidden anim-up">
                  <h2>Popular Topics</h2>
                  <p>Choose an area and let us guide you further.</p>
              </div>
              <div className="faq-topics__grid">
                  {[
                      { icon: "ri:hotel-line", title: "University Selector", desc: "Guide to choosing colleges" },
                      { icon: "ri:file-list-3-line", title: "Admissions Process", desc: "How entries works" },
                      { icon: "ri:passport-line", title: "Visa Requirements", desc: "Documents & Interview" },
                      { icon: "ri:money-dollar-circle-line", title: "Financial Aid", desc: "Costs & Loans" },
                      { icon: "ri:global-line", title: "English Tests", desc: "IELTS, TOEFL & more" },
                      { icon: "ri:home-gear-line", title: "Accommodation", desc: "Finding places to stay" }
                  ].map((topic, i) => (
                      <div key={i} className="topic-card anim-hidden anim-pop">
                          <div className="topic-icon">
                              <iconify-icon icon={topic.icon} width="24"></iconify-icon>
                          </div>
                          <h3>{topic.title}</h3>
                          <p>{topic.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* RELATED RESOURCES */}
      <section className="faq-resources">
          <div className="container">
              <div className="faq-resources__header anim-hidden anim-up">
                  <h2>Related Resources</h2>
              </div>
              <div className="faq-resources__grid">
                  {[
                      { icon: "ri:service-line", title: "Services Overview", link: "View Services" },
                      { icon: "ri:earth-line", title: "Study Destinations", link: "View Destinations" },
                      { icon: "ri:mail-line", title: "Contact Us", link: "Contact support" }
                  ].map((res, i) => (
                      <div key={i} className="resource-card anim-hidden anim-up">
                          <div className="res-icon">
                              <iconify-icon icon={res.icon} width="24"></iconify-icon>
                          </div>
                          <div className="res-info">
                              <h3>{res.title}</h3>
                              <a href="#">{res.link} &rsaquo;</a>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FOOTER CTA */}
      <section className="faq-final-talk">
          <div className="container">
              <div className="final-talk-box">
                  <div className="talk-content">
                      <h2>Still have questions? Let's talk.</h2>
                      <p>Get a personalized assessment from our education experts.</p>
                      <div className="talk-meta">
                          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80" alt="Advisor" />
                          <p>Ready to secure your future today</p>
                      </div>
                  </div>
                  <div className="talk-actions">
                      <button className="btn btn-dark">Analyze your success with us today</button>
                      <button className="btn btn-outline">Contact us</button>
                  </div>
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
              <p className="footer-newsletter-text">Weekly insights on educational trends.</p>
              <input type="email" className="newsletter-input" placeholder="Email address" />
            </div>
          </div>
          <div className="footer-bottom">Copyright © 2026 MATSOLS. Built for Excellence.</div>
        </div>
      </footer>
    </div>
  );
}

export default FAQ;
