import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./InstitutionalRepresentation.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Assets
import heroBg from "../assets/images/about_hero_bg_1769858183540.png";
import why1 from "../assets/images/about_map_section_1769858199696.png"; 
import why2 from "../assets/images/about_team_members_1769858217358.png";
import why3 from "../assets/images/path-3.webp";
import partner1 from "../assets/images/story-1.webp";
import story1 from "../assets/images/story-1.webp";
import story3 from "../assets/images/story-3.webp";
import path1 from "../assets/images/diverse_students_library_1770056302151.png";
import path2 from "../assets/images/about_journey_scenes_1769858238611.png";
import path3 from "../assets/images/digital_admissions_portal_1770056288503.png";
import studentImg from "../assets/images/smiling-students-standing-with-notepad.jpg.jpeg";
import contactImg from "../assets/images/customer-support.jpg";
import univLogo1 from "../assets/images/partner_univ_uk_crest_1770056652963.png";
import univLogo2 from "../assets/images/partner_univ_us_shield_1770056668023.png";
import univLogo3 from "../assets/images/partner_univ_ca_badge_1770056682992.png";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  { q: "What institutions do you represent?", a: "We represent a wide range of prestigious universities and colleges across the UK, USA, Australia, and Canada, focusing on quality and student outcomes." },
  { q: "How do you ensure direct access to decision-makers?", a: "Our long-standing partnerships and exclusive agreements mean we have direct lines to admissions and recruitment heads at our partner institutions." },
  { q: "Can we track the progress of our representation?", a: "Yes, our partners receive regular updates and access to a dedicated portal for monitoring student pipelines and application statuses." },
  { q: "Is there a cost for institutional partnership?", a: "We offer various partnership models. Contact our institutional relations team for a tailored proposal." },
];

const FAQItem = ({ item, isActive, onClick, idx }) => {
  const answerRef = useRef(null);
  return (
    <div className="anim-hidden anim-up" style={{ animationDelay: `${idx * 0.1}s` }}>
      <div className={`ir-faq-item ${isActive ? 'active' : ''}`}>
        <div className="ir-faq-question" onClick={onClick}>
          {item.q}
          <iconify-icon icon={isActive ? "ri:subtract-line" : "ri:add-line"}></iconify-icon>
        </div>
        <div 
          className="ir-faq-answer-wrapper"
          style={{
            height: isActive ? (answerRef.current?.scrollHeight || 'auto') : 0,
            overflow: 'hidden',
            transition: 'height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            opacity: isActive ? 1 : 0
          }}
        >
          <div ref={answerRef} className="ir-faq-answer">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
};

function InstitutionalRepresentation() {
  const [faqActive, setFaqActive] = useState(null);


  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim-hidden').forEach((el) => observer.observe(el));

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
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="ir-page">
      <Header />

      {/* HERO SECTION */}
      <section className="ir-hero">
        <div className="ir-hero__bg" style={{backgroundImage: `url(${heroBg})`}}></div>
        <div className="ir-hero__overlay"></div>
        <div className="ir-hero__content">
          <span className="ir-hero__tag anim-hidden anim-up">INSTITUTIONAL PARTNERS</span>
          <h1 className="ir-hero__title anim-hidden anim-up delay-100">
            Exclusive Access.<br />
            <span>Trusted Representation.</span><br />
            Real Opportunities.
          </h1>
          <p className="ir-hero__subtitle anim-hidden anim-up delay-200">
            Bridging the gap between global institutions and the brightest minds.
          </p>
          <div className="ir-hero__actions anim-hidden anim-up delay-300">
            <button className="btn btn-primary">Partner With Us</button>
            <button className="btn btn-outline-white">Our Network</button>
          </div>
        </div>
      </section>

      {/* DIRECT ACCESS */}
      <section className="ir-access">
        <div className="vs-container ir-access__grid">
          <div className="ir-access__content anim-hidden anim-left">
            <h2>Direct Access to Decision Makers</h2>
            <div className="ir-access__list">
              {[
                { title: "Direct Links", desc: "Unlock priority lanes to university heads and admissions teams worldwide." },
                { title: "Strategic Positioning", desc: "Expert guidance on how to position your institutional strengths for global growth." },
                { title: "Dedicated Support", desc: "Personalized account management for all institutional relations and inquiries." },
                { title: "Streamlined Flow", desc: "Sophisticated pipelines ensuring students find their perfect university match faster." }
              ].map((item, i) => (
                <div key={i} className="ir-access-card">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ir-access__image anim-hidden anim-right">
            <img src={contactImg} alt="Strategic Partnership" />
          </div>
        </div>
      </section>

      {/* UNIVERSITY PARTNERS */}
      <section className="ir-partners">
        <div className="vs-container">
          <h2 className="ir-section-title anim-hidden anim-up">Global University Partners</h2>
          <div className="ir-partners__grid">
            {[
              { 
                name: "University of London", 
                desc: "Strategic representation for undergraduate and post-graduate excellence across the UK.",
                img: univLogo1
              },
              { 
                name: "Liberty University", 
                desc: "Direct access to premiere North American academic opportunities and research.",
                img: univLogo2
              },
              { 
                name: "Innovation Research Univ", 
                desc: "Specialized pathways for STEM and research-led institutions in Canada.",
                img: univLogo3
              }
            ].map((univ, i) => (
              <div key={i} className="ir-partner-card anim-hidden anim-pop">
                <img src={univ.img} alt={univ.name} />
                <div className="ir-partner-info">
                  <h3>{univ.name}</h3>
                  <p>{univ.desc}</p>
                  <a href="#">Learn More &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID (Orange) */}
      <section className="ir-features">
        <div className="vs-container">
          <div className="ir-features__header anim-hidden anim-up">
            <h2>Everything You Need In One Stop</h2>
            <p>Empowering institutions through professional alignment and strategic student recruitment.</p>
          </div>
          <div className="ir-features__grid">
            {[
              { icon: "ri:global-line", title: "Global Reach", desc: "Connect with a diverse pool of qualified international applicants." },
              { icon: "ri:verified-badge-line", title: "Expert Vetting", desc: "Reduced risk through our rigorous student screening and document checks." },
              { icon: "ri:dashboard-3-line", title: "Data Insights", desc: "Access to real-time market trends and recruitment analytics." },
              { icon: "ri:group-line", title: "Scale Recruitment", desc: "Expand your international presence without increasing overhead." },
              { icon: "ri:customer-service-2-line", title: "Priority Support", desc: "Dedicated liaison for your institutional queries and student escalations." },
              { icon: "ri:sparkling-line", title: "Brand Elevation", desc: "Showcase your institution's unique culture and academic excellence." }
            ].map((f, i) => (
              <div key={i} className="ir-feature-card anim-hidden anim-up">
                <div className="ir-f-icon">
                  <iconify-icon icon={f.icon} width="32"></iconify-icon>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES (Alternating) */}
      <section className="ir-stories">
         <div className="vs-container">
            <div className="ir-story anim-hidden anim-up">
               <div className="ir-story__img">
                  <img src={studentImg} alt="University Success" />
               </div>
               <div className="ir-story__content">
                  <h3>Strategic Growth in MENA Region</h3>
                  <p>Our partnership helped [University Name] increase their international student intake from the MENA region by 40% in just two academic cycles through targeted representation.</p>
                  <ul className="ir-check-list">
                    <li>Custom Marketing Strategy</li>
                    <li>Direct Faculty Engagement</li>
                  </ul>
               </div>
            </div>
            {/* Repeat blocks for other stories if needed */}
         </div>
      </section>

      {/* WHY UNIVERSITIES TRUST (Image + List) */}
      <section className="ir-trust">
        <div className="vs-container ir-trust__grid">
          <div className="ir-trust__img anim-hidden anim-left">
            <img src={path2} alt="Historical Campus" />
          </div>
          <div className="ir-trust__content anim-hidden anim-right">
            <h2>Why Universities Trust MATSOLS</h2>
            <p>Our reputation is built on nearly two decades of integrity and results. We don't just recruit; we represent.</p>
            <div className="ir-trust__list">
              {[
                "100% Transparency in Application Processes",
                "Highly Qualified Student Pipeline",
                "Advanced CRM and Tracking Infrastructure"
              ].map((item, i) => (
                <div key={i} className="ir-trust-item">
                  <iconify-icon icon="ri:checkbox-circle-fill"></iconify-icon>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ir-stats">
        <div className="vs-container">
          <div className="ir-stats__grid">
            {[
              { val: "1,500+", label: "Institutions" },
              { val: "30+", label: "Years Experience" },
              { val: "98%", label: "Success Rate" },
              { val: "10+", label: "Strategic Partners" }
            ].map((s, i) => (
              <div key={i} className="ir-stat-item anim-hidden anim-pop">
                <h3>{s.val}</h3>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ir-testimonials">
        <div className="vs-container">
          <h2 className="ir-section-title anim-hidden anim-up">Words from Our Partners</h2>
          <div className="ir-testi__grid">
            {[
              { name: "Dr. Elena Rossi", role: "Director of International Admissions", text: "MATSOLS has been instrumental in our global expansion. Their professional approach is unmatched in the industry." },
              { name: "Mark Thompson", role: "VP Recruitment", text: "The quality of students they bring to our campus is exactly what we look for. A truly reliable partner." }
            ].map((t, i) => (
              <div key={i} className="ir-testi-card anim-hidden anim-up">
                <p>"{t.text}"</p>
                <div className="ir-t-info">
                  <div className="ir-t-meta">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ir-faq">
        <div className="vs-container">
           <h2 className="ir-section-title anim-hidden anim-up" style={{color: 'white'}}>Partnership FAQ</h2>
           <div className="ir-faq__list">
             {faqData.map((f, i) => (
               <FAQItem 
                 key={i} 
                 item={f} 
                 idx={i}
                 isActive={faqActive === i} 
                 onClick={() => setFaqActive(faqActive === i ? null : i)} 
               />
             ))}
           </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ir-cta">
        <div className="vs-container">
          <div className="ir-cta__content anim-hidden anim-up">
            <h2>Ready to Secure Exclusive Opportunities?</h2>
            <p>Join our elite network of global institutional partners today.</p>
            <div className="ir-cta__btns">
              <button className="btn btn-primary">Start Partnership</button>
              <button className="btn btn-outline-white">Book a Meeting</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default InstitutionalRepresentation;
