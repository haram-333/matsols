import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './index.css'
import pathwayImg from './assets/pathway-1.png'
import supportImg from './assets/support-2.png'
import universityImg from './assets/university-3.png'

import manchesterMet from './assets/ubi-logos/1200px-Manchester_Metropolitan_University_logo.svg.png.webp';
import cardiff from './assets/ubi-logos/Cardiff-Uni.png.webp';
import lancaster from './assets/ubi-logos/Lancaster-Uni.png.webp';
import queenMary from './assets/ubi-logos/Queen-Mary-Uni-of-london.png.webp';
import rmit from './assets/ubi-logos/RMIT.png.webp';
import birmingham from './assets/ubi-logos/Uni-of-Birmingham.png.webp';
import leeds from './assets/ubi-logos/Uni-of-Leeds.png.webp';
import manchester from './assets/ubi-logos/Uni-of-Manchester.png.webp';
import westernAus from './assets/ubi-logos/Uni-of-Western-Aus.png.webp';
import bristol from './assets/ubi-logos/University-of-Bristol-Logo-April-24.png.webp';
import unsw from './assets/ubi-logos/unsw-australia-university-of-new-south-wales-logo.png';
import sheffieldHallam from './assets/ubi-logos/shu-logo.svg';

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [faqActive, setFaqActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bentoRef = useRef(null);
  const destRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const pathRef = useRef(null);
  const partnersRef = useRef(null);

  useEffect(() => {
    // Scroll listener for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Bento Animation
      const bentoTl = gsap.timeline({
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 75%",
        }
      });

      bentoTl.fromTo(".bento-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".b-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power2.out",
          onComplete: () => {
            gsap.set(".b-card", { clearProps: "transform" });
          }
        },
        "-=0.4"
      );

      // Destinations
      gsap.fromTo(".dest-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: destRef.current,
            start: "top 80%"
          }
        }
      );

      // Process
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 75%",
        }
      });

      processTl.fromTo(".process-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".step-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".process-card", 
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out",
          onComplete: () => {
             gsap.set(".process-card", { clearProps: "transform" });
          }
        },
        "-=0.6"
      );

      // Services Animation
      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 75%",
        }
      });

      servicesTl.fromTo(".services-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".swiper",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      );

      // Hero Title Drawing Animation
      const heroTl = gsap.timeline();
      heroTl.fromTo(".hero-title .char", 
        { 
          opacity: 0, 
          scale: 0.8,
          clipPath: "inset(0 100% 0 0)",
          x: -10
        }, 
        { 
          opacity: 1, 
          scale: 1, 
          clipPath: "inset(0 0% 0 0)",
          x: 0,
          duration: 0.4, 
          stagger: 0.03, 
          ease: "none", // Linear reveal for "drawing" feel
          delay: 0.5
        }
      );

      // AI Matchmaking Animation
      gsap.from(".ai-content-side", {
        scrollTrigger: {
          trigger: ".section-ai",
          start: "top 80%"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".neural-node", {
        scrollTrigger: {
          trigger: ".section-ai",
          start: "top 60%"
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Success Stories Animation
      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: ".section-stories",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // FAQ Animation
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".section-faq",
          start: "top 80%"
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Path Zigzag Animation
      gsap.fromTo(".zigzag-path",
        { strokeDasharray: 3000, strokeDashoffset: 3000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: pathRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1.5
          }
        }
      );

      gsap.from(".path-step", {
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 40%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.4,
        ease: "power4.out"
      });

      // Partners Stagger Animation
      gsap.from(".partner-logo-item", {
        scrollTrigger: {
          trigger: partnersRef.current,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="export-wrapper">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
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
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About Us</a>
          <a href="#" className="nav-link nav-dropdown">
            What we Offer
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </a>
          <a href="#" className="nav-link">Universities</a>
          <a href="#" className="nav-link">Resources</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
        
        <div className="nav-actions">
          <a href="#" className="btn btn-primary nav-cta">Free Consultation</a>
          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-links">
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>What we Offer</a>
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Universities</a>
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Resources</a>
            <a href="#" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <a href="#" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Free Consultation</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <img
          className="hero-video-bg"
          alt="Global Network"
          src="https://storage.googleapis.com/banani-generated-images/generated-images/0081fbf7-1a78-4c29-8b7a-c3f8907322d2.jpg"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {/* Splitting text for animation with line wraps */}
              <div className="line">
                <span className="word">
                  {"Unleash".split('').map((char, i) => (
                    <span key={i} className="char">{char}</span>
                  ))}
                </span>
                <span className="word">
                  {"Your".split('').map((char, i) => (
                    <span key={i} className="char">{char}</span>
                  ))}
                </span>
              </div>
              <div className="line highlighted">
                <span className="word">
                  {"Global".split('').map((char, i) => (
                    <span key={i} className="char">{char}</span>
                  ))}
                </span>
                <span className="word">
                  {"Future.".split('').map((char, i) => (
                    <span key={i} className="char">{char}</span>
                  ))}
                </span>
              </div>
            </h1>
            <p className="animate-entry delay-2">
              We connect ambitious students with world-class universities through precision consulting and AI-driven matching.
            </p>
            <div className="hero-btns animate-entry delay-3">
              <a href="#" className="btn btn-primary">Start Your Journey</a>
              <a href="#" className="btn btn-outline">Explore Programs</a>
            </div>
          </div>

          <div className="hero-globe animate-entry delay-3">
            <div className="floating-badge badge-1">
              <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%' }}></div>
              <span>13,000+ Students Placed</span>
            </div>
            <div className="floating-badge badge-2">
              <div style={{ width: '10px', height: '10px', background: 'var(--primary-orange)', borderRadius: '50%' }}></div>
              <span>98% Visa Success Rate</span>
            </div>
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" style={{ opacity: 0.3 }}>
              <circle cx="200" cy="200" r="199" stroke="white" strokeWidth="1" strokeDasharray="10 10"></circle>
              <circle cx="200" cy="200" r="140" stroke="var(--primary-orange)" strokeWidth="1"></circle>
            </svg>
          </div>
        </div>
      </header>

      {/* Partners Section (Replaced Marquee) */}
      <section className="section-partners" ref={partnersRef}>
        <div className="container">
          <div className="partners-header">
            <h2 className="section-title">Global Partner <span className="text-gradient">Universities.</span></h2>
            <p className="section-subtitle">Collaborating with the world's most prestigious institutions to secure your future.</p>
          </div>
          



          <div className="marquee-container">
            <div className="marquee-track">
              {/* Duplicate 4 times for seamless infinite scroll on any screen width */}
              {[...Array(4)].flatMap((_, i) => [
                { name: 'Manchester Met', logo: manchesterMet },
                { name: 'Cardiff', logo: cardiff },
                { name: 'Lancaster', logo: lancaster },
                { name: 'Queen Mary', logo: queenMary },
                { name: 'RMIT', logo: rmit },
                { name: 'Birmingham', logo: birmingham },
                { name: 'Leeds', logo: leeds },
                { name: 'Manchester', logo: manchester },
                { name: 'Western Australia', logo: westernAus },
                { name: 'Bristol', logo: bristol },
                { name: 'UNSW', logo: unsw },
                { name: 'Sheffield Hallam', logo: sheffieldHallam }
              ]).map((uni, idx) => (
                <div key={idx} className="partner-logo-item">
                  <img src={uni.logo} alt={uni.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="section-path" ref={pathRef}>
        <div className="zigzag-svg-container">
          <svg width="100%" height="100%" viewBox="0 0 1400 1200" preserveAspectRatio="none">
            <path 
              className="zigzag-path" 
              d="M 200 100 L 1200 450 L 200 850 L 1200 1150" 
            />
          </svg>
        </div>

        <div className="path-container">
          <div className="path-header">
            <h2 className="animate-entry">Your path into global universities</h2>
            <p className="animate-entry delay-1">We've helped 50,000+ international students get into university.</p>
          </div>

          <div className="path-steps">
            <div className="path-step">
              <div className="step-image-wrap">
                <img src={pathwayImg} alt="Choose your pathway" className="step-image" />
              </div>
              <div className="step-content">
                <span className="step-num">Step 1</span>
                <h3 className="step-title">Choose your pathway</h3>
                <p className="step-desc">
                  Study an NCUK pathway programme in more than 40 countries worldwide. 
                  Start your journey locally or study abroad straight away.
                </p>
                <a href="#" className="btn-path">
                  Our Programmes <span className="arrow">›</span>
                </a>
              </div>
            </div>

            <div className="path-step reversed">
              <div className="step-image-wrap">
                <img src={supportImg} alt="Support with every step" className="step-image" />
              </div>
              <div className="step-content">
                <span className="step-num">Step 2</span>
                <h3 className="step-title">Support with every step</h3>
                <p className="step-desc">
                  Our expert student support teams will guide you through every step of your journey 
                  and help find the best university and course for you.
                </p>
                <a href="#" className="btn-path">
                  How we support you <span className="arrow">›</span>
                </a>
              </div>
            </div>

            <div className="path-step">
              <div className="step-image-wrap">
                <img src={universityImg} alt="Gain entry" className="step-image" />
              </div>
              <div className="step-content">
                <span className="step-num">Step 3</span>
                <h3 className="step-title">Gain entry to your dream university</h3>
                <p className="step-desc">
                  Progress to one of 70+ universities – including 10 in the QS World Top 100 – 
                  across the most popular study destinations.
                </p>
                <a href="#" className="btn-path">
                  Explore universities <span className="arrow">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="section-bento" ref={bentoRef}>
        <div className="container">
          <div className="bento-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--primary-dark)' }}>
              Premier Education Consulting
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Data-driven approaches to secure your future.
            </p>
          </div>

          <div className="bento-grid">
            <div className="b-card b-large">
              <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Global Reach</h3>
              <p style={{ opacity: 0.8 }}>
                Connecting you to 30+ countries with local support teams in every major hub.
              </p>
              <div style={{ marginTop: '60px' }}>
                <img alt="Map" style={{ opacity: 0.2, width: '100%' }} src="https://storage.googleapis.com/banani-generated-images/generated-images/ff826544-75c9-4157-86d2-dff08f187335.jpg" />
              </div>
            </div>

            <div className="b-card b-tall">
              <h3 style={{ fontSize: '1.5rem' }}>Success Rate</h3>
              <div className="stat-ring"></div>
              <p style={{ color: '#666' }}>Visa Approval</p>
            </div>

            <div className="b-card b-small b-confidential">
              <div className="card-top-row">
                <h3 style={{ fontSize: '1.5rem' }}>Confidential</h3>
                <svg className="card-icon" width="32" height="32" viewBox="0 0 24 24" fill="var(--primary-blue)">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10.99H17V11.99H12Z"></path>
                </svg>
              </div>
              <p className="card-desc">
                Elite discretion & encrypted data.
              </p>
            </div>

            <div className="b-card b-wide b-pathways">
              <h3 style={{ fontSize: '1.5rem' }}>Tailored Pathways</h3>
              <div className="card-progress-track">
                <div className="card-progress-bar"></div>
              </div>
              <p className="card-desc">
                Custom roadmaps for PhD, Masters, and UG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Matchmaking Section */}
      <section className="section-ai">
        <div className="container">
          <div className="ai-layout">
            <div className="ai-content-side animate-entry">
              <div className="section-badge">INTELLIGENCE V3</div>
              <h2 className="section-title">AI-Powered <span className="text-gradient">Precision Matching.</span></h2>
              <p className="section-subtitle">
                Beyond traditional consulting. Our neural matching engine analyzes 50+ data points—from academic synergy to cultural fit—to find your perfect university destination.
              </p>
              
              <div className="ai-features">
                <div className="ai-feature-card">
                  <div className="ai-card-icon">
                    <iconify-icon icon="line-md:clipboard-check" width="28"></iconify-icon>
                  </div>
                  <div>
                    <h4>Profile Analysis</h4>
                    <p>Quantitative mapping of your GPA, test scores, and research interests.</p>
                  </div>
                </div>
                <div className="ai-feature-card">
                  <div className="ai-card-icon">
                    <iconify-icon icon="line-md:cog-loop" width="28"></iconify-icon>
                  </div>
                  <div>
                    <h4>Live Adaptation</h4>
                    <p>Real-time updates based on changing university quotas and requirements.</p>
                  </div>
                </div>
              </div>

              <a href="#" className="btn btn-primary" style={{ marginTop: '40px' }}>Try AI Matchmaker</a>
            </div>

            <div className="ai-visual-side">
              <div className="neural-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`neural-node node-${i}`}>
                    <div className="node-pulse"></div>
                    <img alt="Uni" src={`https://storage.googleapis.com/banani-generated-images/generated-images/${i === 1 ? 'ee17499d-cc53-46e4-90cf-1165877d8493' : i === 2 ? '4f95ce3a-7fbe-4e49-9201-29c22d1d80df' : 'ee7c2dce-4c7f-4225-b955-abf95a74d492'}.jpg`} />
                  </div>
                ))}
                <div className="center-orb">
                  <iconify-icon icon="line-md:loading-loop" width="48"></iconify-icon>
                </div>
                <svg className="neural-lines" viewBox="0 0 500 500">
                  <path d="M100 100 L250 250 M400 100 L250 250 M100 400 L250 250 M400 400 L250 250" stroke="var(--primary-orange)" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations 3D */}
      <section className="section-dest" ref={destRef}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Where Will You Excel?</h2>
          <div className="cards-row">
            <div className="dest-card">
              <img alt="UK" src="https://storage.googleapis.com/banani-generated-images/generated-images/ee17499d-cc53-46e4-90cf-1165877d8493.jpg" />
              <div className="dest-info">
                <h3>United Kingdom</h3>
                <div className="dest-details">
                  <p>Home to Oxford, Cambridge, and LSE.</p>
                  <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>Explore UK →</span>
                </div>
              </div>
            </div>
            <div className="dest-card">
              <img alt="USA" src="https://storage.googleapis.com/banani-generated-images/generated-images/4f95ce3a-7fbe-4e49-9201-29c22d1d80df.jpg" />
              <div className="dest-info">
                <h3>USA</h3>
                <div className="dest-details">
                  <p>Ivy League and top research institutions.</p>
                  <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>Explore USA →</span>
                </div>
              </div>
            </div>
            <div className="dest-card">
              <img alt="Canada" src="https://storage.googleapis.com/banani-generated-images/generated-images/ee7c2dce-4c7f-4225-b955-abf95a74d492.jpg" />
              <div className="dest-info">
                <h3>Canada</h3>
                <div className="dest-details">
                  <p>World-class education with PGWP options.</p>
                  <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>Explore Canada →</span>
                </div>
              </div>
            </div>
            <div className="dest-card">
              <img alt="Australia" src="https://storage.googleapis.com/banani-generated-images/generated-images/28fd5e03-2a59-4651-a36b-b0d2b542efec.jpg" />
              <div className="dest-info">
                <h3>Australia</h3>
                <div className="dest-details">
                  <p>Innovative research and vibrant lifestyle.</p>
                  <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>Explore Australia →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section-stories">
        <div className="container">
          <div className="stories-header animate-entry">
            <h2 className="section-title">Success <span className="text-gradient">Stories.</span></h2>
            <p className="section-subtitle">Real results from ambitious students who dared to dream bigger.</p>
          </div>

          <div className="stories-grid">
            <div className="story-card animate-entry">
              <div className="story-quote">"The AI matchmaker found the exact PhD program I was looking for. Matsols handled my visa with zero stress."</div>
              <div className="story-user">
                <img src="https://storage.googleapis.com/banani-generated-images/generated-images/ff826544-75c9-4157-86d2-dff08f187335.jpg" alt="Student" />
                <div>
                  <div className="user-name">Sarah Jenkins</div>
                  <div className="user-meta">Oxford University • MSc Data Science</div>
                </div>
              </div>
            </div>

            <div className="story-card animate-entry" style={{ animationDelay: '0.2s' }}>
              <div className="story-quote">"Elite service from start to finish. I'm now studying at my dream Ivy League school thanks to their consultants."</div>
              <div className="story-user">
                <img src="https://storage.googleapis.com/banani-generated-images/generated-images/0081fbf7-1a78-4c29-8b7a-c3f8907322d2.jpg" alt="Student" />
                <div>
                  <div className="user-name">David Chen</div>
                  <div className="user-meta">Harvard University • MBA</div>
                </div>
              </div>
            </div>

            <div className="story-card animate-entry" style={{ animationDelay: '0.4s' }}>
              <div className="story-quote">"The level of detail in their strategic roadmapping is unmatched. Highly recommend for serious applicants."</div>
              <div className="story-user">
                <img src="https://storage.googleapis.com/banani-generated-images/generated-images/ee17499d-cc53-46e4-90cf-1165877d8493.jpg" alt="Student" />
                <div>
                  <div className="user-name">Aisha Rahman</div>
                  <div className="user-meta">U of Toronto • Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-info animate-entry">
              <div className="section-badge">SUPPORT</div>
              <h2 className="section-title">Common <span className="text-gradient">Questions.</span></h2>
              <p className="section-subtitle">Everything you need to know about the elite education route.</p>
              <div className="faq-image-box">
                <img src="https://storage.googleapis.com/banani-generated-images/generated-images/4f95ce3a-7fbe-4e49-9201-29c22d1d80df.jpg" alt="Consultation" />
              </div>
            </div>

            <div className="faq-list">
              {[
                { q: "How does the AI matching engine work?", a: "Our engine uses machine learning to correlate your academic history, budget, and career goals with data from over 1,800 global universities to find the highest probability of success." },
                { q: "What is the typical timeline for an application?", a: "For top-tier universities, we recommend starting at least 12 months in advance. However, our rapid-track service can handle urgent applications in under 3 months." },
                { q: "Do you assist with scholarship applications?", a: "Yes, scholarship optimization is a core part of our service. We identify exclusive funding which often goes unadvertised to the general public." },
                { q: "What is your visa success rate?", a: "We maintain a 98.4% visa success rate across UK, USA, Canada, and Australia through rigorous pre-submission audits and interview coaching." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`faq-item ${faqActive === idx ? 'active' : ''} animate-entry`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => setFaqActive(faqActive === idx ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{item.q}</span>
                    <iconify-icon icon={faqActive === idx ? "line-md:minus" : "line-md:plus"} width="24"></iconify-icon>
                  </div>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Sticky */}
      <section className="section-process" ref={processRef}>
        <div className="container">
          <div className="process-layout">
            <div className="sticky-col">
              <h2 className="process-header" style={{ fontSize: '3rem', color: 'white', marginBottom: '20px' }}>The Blueprint</h2>
              <div className="steps-nav">
                <div className="step-item active">01. Consultation</div>
                <div className="step-item">02. Selection</div>
                <div className="step-item">03. Application</div>
                <div className="step-item">04. Departure</div>
              </div>
            </div>
            <div className="process-content">
              <div className="process-card">
                <div className="p-icon">🤝</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Expert Consultation</h3>
                  <p style={{ color: '#666' }}>We analyze your academic profile and career aspirations to build a winning strategy.</p>
                </div>
              </div>
              <div className="process-card">
                <div className="p-icon">📋</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>University Selection</h3>
                  <p style={{ color: '#666' }}>Shortlisting the best-fit institutions from our network of 1,850+ partners.</p>
                </div>
              </div>
              <div className="process-card">
                <div className="p-icon">✈️</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Application & Visa</h3>
                  <p style={{ color: '#666' }}>Our team handles the paperwork, SOPs, and visa interviews with 98% success precision.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Horizontal */}
      <section className="section-services" ref={servicesRef}>
        <div className="container">
          <div className="services-header">
            <h2>Corporate Solutions</h2>
            <a href="#" className="view-all-link">View All Services →</a>
          </div>
        </div>
        
        <div className="h-scroll">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            grabCursor={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 3.8 }
            }}
            style={{ overflow: 'visible' }}
          >
              {[
                { 
                  num: '01', title: 'Visa Support', desc: 'End-to-end guidance for Tier 4, F1, and Study Permits.', 
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><line x1="7" y1="15" x2="17" y2="15"/><line x1="7" y1="11" x2="17" y2="11"/><line x1="7" y1="7" x2="13" y2="7"/></svg>
                },
                { 
                  num: '02', title: 'Course Matching', desc: 'AI-driven selection based on your academic history.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                },
                { 
                  num: '03', title: 'Accommodation', desc: 'Secure premium housing before you even fly.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                },
                { 
                  num: '04', title: 'Financial Aid', desc: 'Scholarship applications and loan assistance.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                },
                { 
                  num: '05', title: 'Test Prep', desc: 'Focused coaching for IELTS, TOEFL, and GRE.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5L2.5 7.4c-.3.3-.5.7-.5 1.1v6.9c0 .4.2.8.5 1.1l4.9 4.9c.3.3.7.5 1.1.5h6.9c.4 0 .8-.2 1.1-.5l4.9-4.9c.3-.3.5-.7.5-1.1V8.6c0-.4-.2-.8-.5-1.1l-4.9-4.9c-.3-.3-.7-.5-1.1-.5z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                },
                { 
                  num: '06', title: 'Pre-Departure', desc: 'Briefings on life, culture, and laws abroad.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                },
                { 
                  num: '07', title: 'Career Coaching', desc: 'Part-time job search and career roadmapping.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                },
                { 
                  num: '08', title: 'SOP Editing', desc: 'Personal statement refinement by experts.',
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                }
              ].map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="serv-card">
                    <div className="serv-icon">
                      {item.icon}
                    </div>
                    <div className="serv-content">
                      <h3 className="serv-title">{item.title}</h3>
                      <p className="serv-desc">{item.desc}</p>
                    </div>
                    <div className="serv-num">{item.num}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </section>

      {/* Lead Magnet */}
      <div className="container">
        <section className="magnet-section">
          <div className="magnet-box">
            <div className="magnet-left">
              <div className="magnet-content">
                <h2 className="magnet-title">Begin Your Elite Education Journey</h2>
                <p className="magnet-desc">Schedule a confidential strategy session with our senior consultants to unlock exclusive university pathways and scholarship opportunities.</p>
                <ul className="magnet-list">
                  <li><iconify-icon icon="line-md:confirm" width="20"></iconify-icon> Exclusive Partner Network Access</li>
                  <li><iconify-icon icon="line-md:confirm" width="20"></iconify-icon> Strategic Scholarship Optimization</li>
                  <li><iconify-icon icon="line-md:confirm" width="20"></iconify-icon> Bespoke Academic Roadmapping</li>
                </ul>
              </div>
            </div>
            <div className="magnet-form-wrap">
              <h3 className="magnet-form-title">Request a Confidential Consultation</h3>
              <div className="input-group">
                <input type="text" placeholder="Full Name" className="input-field" />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Email Address" className="input-field" />
              </div>
              <button className="btn btn-primary magnet-btn">Schedule My Session</button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="watermark-text">MATSOLS</div>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="footer-logo">MATSOLS</div>
              <p>Building bridges to global education since 2005. We are the architects of your international career.</p>
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
          <div className="footer-bottom">
            Copyright © 2026 MATSOLS. Built for Excellence.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
