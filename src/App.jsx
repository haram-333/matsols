import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import path1 from "./assets/images/path-1.webp";
import path2 from "./assets/images/path-2.webp";
import path3 from "./assets/images/path-3.webp";
import heroBg from "./assets/images/hero-bg.webp";
import heroVideo from "./assets/videos/bg-video.mp4";
import heroAvatar from "./assets/images/hero-avatar.webp";
import story1 from "./assets/images/story-1.webp";
import story3 from "./assets/images/story-3.webp";
import supportBg from "./assets/images/support-bg.webp";
import titan1 from "./assets/images/path-1.webp"; 
import titan2 from "./assets/images/path-2.webp";

import manchesterMet from "./assets/ubi-logos/1200px-Manchester_Metropolitan_University_logo.svg.png.webp";
import cardiff from "./assets/ubi-logos/Cardiff-Uni.png.webp";
import lancaster from "./assets/ubi-logos/Lancaster-Uni.png.webp";
import queenMary from "./assets/ubi-logos/Queen-Mary-Uni-of-london.png.webp";
import rmit from "./assets/ubi-logos/RMIT.png.webp";
import birmingham from "./assets/ubi-logos/Uni-of-Birmingham.png.webp";
import leeds from "./assets/ubi-logos/Uni-of-Leeds.png.webp";
import manchester from "./assets/ubi-logos/Uni-of-Manchester.png.webp";
import westernAus from "./assets/ubi-logos/Uni-of-Western-Aus.png.webp";
import bristol from "./assets/ubi-logos/University-of-Bristol-Logo-April-24.png.webp";
import unsw from "./assets/ubi-logos/unsw-australia-university-of-new-south-wales-logo.png";
import sheffieldHallam from "./assets/ubi-logos/shu-logo.svg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [faqActive, setFaqActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true); // MUST start muted for browser autoplay compliance
  const [videoKey, setVideoKey] = useState(Date.now()); // Hard-reload key
  const bentoRef = useRef(null);
  const destRef = useRef(null);
  const processRef = useRef(null);
  const pathRef = useRef(null);
  const partnersRef = useRef(null);
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const hasBeenAutoUnmuted = useRef(false);

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
    }, { 
      threshold: 0.2,
      rootMargin: "0px 0px -30% 0px" // Only trigger when element is 30% up the viewport (near center)
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

    // Hero Video Hard-Persistence Effect
    if (heroVideoRef.current) {
      heroVideoRef.current.volume = 0.3;
      heroVideoRef.current.muted = isVideoMuted;
      heroVideoRef.current.play().catch(e => console.log("Hero video auto-play blocked", e));
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Bento Animation - REMOVED GSAP ENTRY for CSS

      // Abstract Background Parallax Scrub
      gsap.fromTo(
        ".bento-abstract-container svg",
        { y: -30 },
        {
          y: 30,
          scrollTrigger: {
            trigger: ".section-bento",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      // Success Circle Animation (96%)
      // Path length is ~283 (2 * PI * 45)
      // 96% of 283 is 271.68. Offset should be 283 - 271.68 = 11.32
      // Success Circle Animation (Reactive Draw)
      gsap.to(".animate-success-circle", {
        strokeDashoffset: 11.32,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".success-circle-container",
          start: "top 75%",
          end: "top 45%",
          scrub: 1.5,
        },
      });

      // Pathway Bar Animation (Reactive Scale)
      gsap.fromTo(
        ".animate-pathway-bar",
        { width: "0%" },
        {
          width: "92%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".b-wide",
            start: "top 80%",
            end: "top 40%",
            scrub: 2,
          },
        },
      );

      // Destinations Header & Cards - REMOVED GSAP ENTRY for CSS

      // 3. Process Section - High-Fidelity Terminal Overhaul (Desktop Only)
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const pc = document.querySelector(".process-content");
        const blueprintCards = gsap.utils.toArray(".blueprint-card");
        const blueprintItems = gsap.utils.toArray(".step-item");

        if (pc && processRef.current) {
          // Master Pin Timeline: Exactly ONE viewport height interaction
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: processRef.current,
              pin: true,
              start: "top top",
              end: "+=250%", // Increased buffer after pinning ends
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const idx = Math.min(
                  Math.floor(p * 1.25 * blueprintItems.length), // Completes at 80% progress
                  blueprintItems.length - 1,
                );

                blueprintItems.forEach((item, i) => {
                  item.classList.toggle("active", i === idx);
                });
                blueprintCards.forEach((card, i) => {
                  card.classList.toggle("active", i === idx);
                });
              },
            },
          });

          // Technical Parallax Grid
          mainTl.to(
            ".blueprint-grid",
            {
              yPercent: -8,
              rotateZ: -1.5,
              ease: "none",
            },
            0,
          );
        }
      });

      // Process Section Header (Scoped Physical Scrub)
      gsap.fromTo(
        ".process-header",
        { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          ease: "power4.out",
          scrollTrigger: { 
            trigger: processRef.current, 
            start: "top 60%",
            end: "top 40%",
            scrub: 0.8,
          },
        },
      );


      // MATSOLS Pillar Section Header (Enhanced Speed)
      gsap.fromTo(
        ".animate-matsols-header",
        { y: -30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".animate-matsols-header",
            start: "top 75%",
            toggleActions: "play none none none",
          }
        }
      );

      // MATSOLS Pillar Section (Instant Reveal)
      gsap.utils.toArray(".animate-matsols-card").forEach((card, i) => {
        // Row 1 (i < 3) from Left, Row 2 (i >= 3) from Right
        const posX = i < 3 ? -60 : 60;
        gsap.fromTo(
          card,
          { x: posX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Section Titles for Grid Sections (Instant Reveal & Visibility Hardening)
      gsap.fromTo(
        ".offers-header .section-title",
        { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-offers",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".offers-header .section-subtitle",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-offers",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // MATSOLS Offers Section (Instant Reveal)
      gsap.utils.toArray(".offer-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? 80 : -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        // Icon Pop (Instant Reveal)
        gsap.from(card.querySelector(".offer-icon-tag"), {
          scale: 0,
          rotate: -45,
          duration: 0.4,
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          ease: "power2.out"
        });
      });

      // Global Impact Section Header (Enhanced Speed)
      gsap.fromTo(
        ".impact-header .section-title",
        { y: -30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".impact-header",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".impact-header .section-subtitle",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".impact-header",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Impact Deck Section (Instant Reveal)
      gsap.utils.toArray(".impact-card").forEach((card, i) => {
        // Row 1 (i < 3) from Bottom, Row 2 (i >= 3) from Top
        const directionY = i < 3 ? 60 : -60;
        gsap.fromTo(
          card,
          { y: directionY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // MATSOLS Title Drawing Animation
      const matsolsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-why-choose",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      matsolsTl.fromTo(
        ".section-why-choose .section-title .char",
        {
          opacity: 0,
          y: 20,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.35,
          stagger: 0.02,
          ease: "power4.out",
        }
      );

      // Section Subtitle Reveals (REMOVED generic conflicting selector)
      // Generic .why-choose-header .section-subtitle animation was removed to prevent collisions.
      // Individual sections now handle their own header reveals above.

      // === HERO SCROLL-TRIGGERED FORWARD-ONLY SCRUB ===
      // Animation progress follows scroll but NEVER reverses
      
      const heroAnimTl = gsap.timeline({ paused: true });
      
      // 1. Title reveal (Forward Only)
      heroAnimTl.fromTo(
        ".hero-parallax-content",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // 2. Main Heading reveal
      heroAnimTl.fromTo(
        ".hero-title .char",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "power4.out" },
        "-=0.7"
      );

      // 3. Description & Buttons reveal (Compressed overlaps)
      heroAnimTl.fromTo(
        [".hero-desc", ".hero-btns"],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Stats cluster: Orbital reveal (One-Shot, back ease)
      heroAnimTl.fromTo(".stat-1", { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.5");
      heroAnimTl.fromTo(".stat-2", { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.55");
      heroAnimTl.fromTo(".stat-3", { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.55");
      heroAnimTl.fromTo(".stat-4", { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.55");

      // Removed pinning logic to fix section overlap
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top 20%",
        onEnter: () => heroAnimTl.play(),
        once: true
      });

      // Dedicated bridge for unmuting on first interaction (EXECUTES ONCE)
      ScrollTrigger.create({
        trigger: "body",
        start: "10px top",
        onEnter: () => {
          if (isVideoMuted && !hasBeenAutoUnmuted.current) {
            hasBeenAutoUnmuted.current = true;
            setIsVideoMuted(false);
            if (heroVideoRef.current) {
              heroVideoRef.current.muted = false;
              heroVideoRef.current.play().catch(e => console.log("Autoplay bridge blocked:", e));
            }
          }
        }
      });

      // AI Matchmaking Animation (Instant Reveal)
      gsap.fromTo(
        ".ai-content-side",
        { x: -80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-ai",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.from(".ai-visual-side", {
        scrollTrigger: {
          trigger: ".section-ai",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        x: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".neural-node", {
        scrollTrigger: {
          trigger: ".section-ai",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.01,
        ease: "power2.out",
      });

      // Success Stories Animation (Instant Reveal)
      gsap.fromTo(
        ".stories-header",
        { y: -30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-stories",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.from(".stories-carousel-wrapper", {
        scrollTrigger: {
          trigger: ".section-stories",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Updates & Insights Header Reveal (Visibility Hardened)
      gsap.fromTo(
        ".insights-header .section-title",
        { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-insights",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".insights-header .section-subtitle",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-insights",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Updates & Insights Card Blast (Instant Reveal)
      gsap.utils.toArray(".insight-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        // Inner button snap (Instant Reveal)
        gsap.from(card.querySelector(".btn-insight"), {
          y: 15,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          ease: "power2.out"
        });
      });
      gsap.to(".moving-shape", {
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        rotate: "random(-45, 45)",
        scale: "random(0.8, 1.2)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 1.5,
          from: "random"
        },
        ease: "sine.inOut"
      });

      gsap.to(".moving-outline", {
        strokeDashoffset: 2000,
        duration: 30,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".bg-drifting-node", {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        opacity: "random(0.1, 0.5)",
        scale: "random(0.5, 1.5)",
        duration: "random(4, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // FAQ Header Reveal (Instant Reveal & Visibility Hardening)
      gsap.fromTo(
        ".section-faq .section-title",
        { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-faq",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
      gsap.fromTo(
        ".section-faq .section-subtitle",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-faq",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // FAQ Items (Instant Reveal)
      gsap.utils.toArray(".faq-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Path Section Universal Scrub Overhaul
      // 1. Path Header (Instant Reveal & Visibility Hardening)
      gsap.fromTo(
        ".path-header h2",
        { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".path-header",
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
      gsap.fromTo(
        ".path-header .section-subtitle",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".path-header",
            start: "top 75%",
            toggleActions: "play none none none",
          }
        }
      );

      // 2. Path Zigzag Animation (Dynamic Length)
      const zigzagPath = document.querySelector(".zigzag-path");
      if (zigzagPath) {
        const length = zigzagPath.getTotalLength();
        gsap.fromTo(
          zigzagPath,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: pathRef.current,
              start: "top center",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }

      // 3. Path Steps Universal Scrub (Fade & Slide)
      gsap.utils.toArray(".path-step").forEach((step, i) => {
        const content = step.querySelector(".step-content");
        const image = step.querySelector(".step-image");

        // Content (Instant Reveal)
        gsap.fromTo(
          content,
          { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        // Image (Instant Reveal)
        gsap.fromTo(
          image,
          { scale: 0.8, opacity: 0, rotate: i % 2 === 0 ? -5 : 5 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        // Sub-buttons (Instant Pop)
        gsap.from(step.querySelector(".btn-path"), {
          x: i % 2 === 0 ? 30 : -30,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          ease: "back.out(2)"
        });
      });

      // Lead Magnet Directional Reveals (Instant Reveal)
      gsap.fromTo(
        ".magnet-left",
        { x: -60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".section-lead-magnet",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.from(".magnet-form-wrap", {
        scrollTrigger: {
          trigger: ".section-lead-magnet",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        x: 60,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Partners Section Reveal (Top-Masked Drop)
      gsap.fromTo(
        ".partners-header",
        { y: -40, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          ease: "power4.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 70%",
            end: "top 50%",
            scrub: 0.8,
          },
        }
      );

      // [REVERTED] Partners Stagger Animation removed as per user request for static/instant marquee feel.
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="export-wrapper">
      {/* Navbar */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
      >
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
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            About Us
          </a>
          <a href="#" className="nav-link nav-dropdown">
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
          </a>
          <a href="#" className="nav-link">
            Universities
          </a>
          <a href="#" className="nav-link">
            Resources
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
        </div>

        <div className="nav-actions">
          <a href="#" className="btn btn-primary nav-cta">
            Free Consultation
          </a>
          <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`bar ${isMenuOpen ? "active" : ""}`}></div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-links">
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              What we Offer
            </a>
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Universities
            </a>
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </a>
            <a
              href="#"
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero - Awwwards Parallax Redesign */}
      <header className="hero" ref={heroRef}>
        <video
          ref={heroVideoRef}
          className="hero-video-bg"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="hero-overlay"></div>

        <div className="hero-content hero-parallax-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <div className="line">
                <span className="word">
                  {"Unleash".split("").map((char, i) => (
                    <span key={i} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                <span className="word">
                  {"Your".split("").map((char, i) => (
                    <span key={i} className="char">
                      {char}
                    </span>
                  ))}
                </span>
              </div>
              <div className="line highlighted">
                <span className="word">
                  {"Global".split("").map((char, i) => (
                    <span key={i} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                <span className="word">
                  {"Future.".split("").map((char, i) => (
                    <span key={i} className="char">
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            </h1>
            <p className="hero-desc">
              Every student's journey begins with a personalized strategy. We
              guide you through global university admissions to help design a
              future that aligns with your career goals.
            </p>
            <div className="hero-btns">
              <a href="#" className="btn btn-primary">
                Start Your Journey
              </a>
              <a href="#" className="btn btn-outline">
                Explore Programs
              </a>
            </div>
          </div>

          {/* Stats Cluster (Circular Orientation) */}
          <div className="hero-stats-cluster">
            <div className="stat-badge stat-1">
              <div className="stat-indicator green"></div>
              <div className="stat-content">
                <span className="stat-number">13,000+</span>
                <span className="stat-label">Students Placed</span>
              </div>
            </div>
            <div className="stat-badge stat-2">
              <div className="stat-indicator orange"></div>
              <div className="stat-content">
                <span className="stat-number">98%</span>
                <span className="stat-label">Visa Success Rate</span>
              </div>
            </div>
            <div className="stat-badge stat-3">
              <div className="stat-indicator blue"></div>
              <div className="stat-content">
                <span className="stat-number">70+</span>
                <span className="stat-label">Partner Universities</span>
              </div>
            </div>
            <div className="stat-badge stat-4">
              <div className="stat-indicator gold"></div>
              <div className="stat-content">
                <span className="stat-number">40+</span>
                <span className="stat-label">Countries Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls - Bottom Right */}
        <div className="hero-video-controls">
          <button
            className="video-control-btn"
            onClick={() => {
              if (heroVideoRef.current) {
                if (isVideoPlaying) {
                  heroVideoRef.current.pause();
                } else {
                  heroVideoRef.current.play();
                }
                setIsVideoPlaying(!isVideoPlaying);
              }
            }}
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            <iconify-icon icon={isVideoPlaying ? "ri:pause-fill" : "ri:play-fill"}></iconify-icon>
          </button>
          <button
            className="video-control-btn"
            onClick={() => {
              if (heroVideoRef.current) {
                heroVideoRef.current.muted = !isVideoMuted;
                setIsVideoMuted(!isVideoMuted);
              }
            }}
            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          >
            <iconify-icon icon={isVideoMuted ? "ri:volume-mute-fill" : "ri:volume-up-fill"}></iconify-icon>
          </button>
        </div>
      </header>

      {/* Partners Section (Replaced Marquee) */}
      <section className="section-partners" ref={partnersRef}>
        <div className="container">
          <div className="partners-header">
            <h2 className="section-title">
              Global Partner{" "}
              <span className="text-gradient">Universities.</span>
            </h2>
            <p className="section-subtitle">
              Collaborating with the world's most prestigious institutions to
              secure your future.
            </p>
          </div>

          <div className="marquee-container">
            <div className="marquee-track">
              {/* Duplicate 4 times for seamless infinite scroll on any screen width */}
              {[...Array(4)]
                .flatMap((_, i) => [
                  { name: "Manchester Met", logo: manchesterMet },
                  { name: "Cardiff", logo: cardiff },
                  { name: "Lancaster", logo: lancaster },
                  { name: "Queen Mary", logo: queenMary },
                  { name: "RMIT", logo: rmit },
                  { name: "Birmingham", logo: birmingham },
                  { name: "Leeds", logo: leeds },
                  { name: "Manchester", logo: manchester },
                  { name: "Western Australia", logo: westernAus },
                  { name: "Bristol", logo: bristol },
                  { name: "UNSW", logo: unsw },
                  { name: "Sheffield Hallam", logo: sheffieldHallam },
                ])
                .map((uni, idx) => (
                  <div key={idx} className="partner-logo-item">
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Offers Section (Verbatim Content) */}
      <section className="section-offers">
        <div className="container">
          <div className="offers-header" style={{ textAlign: "left" }}>
            <h2 className="section-title">What We <span className="text-gradient">Offer.</span></h2>
            <p className="section-subtitle" style={{ textAlign: "left", marginLeft: "0" }}>Comprehensive guidance tailored to your academic and career goals.</p>
          </div>
          <div className="offers-grid">
            {[
              {
                title: "Events",
                desc: "Stay ahead with MATSOLS' global education events, webinars, and workshops for international students looking to study abroad. Gain insights on university applications, visa guidance, and career pathways, and connect directly with top universities and admissions experts.",
                cta: "Join Event",
                icon: "ri:calendar-event-line"
              },
              {
                title: "Admissions",
                desc: "Get expert support with international university admissions and study abroad applications. MATSOLS' experienced consultants guide you through course selection, documentation, SOPs, and visa processes, helping you secure a place at your ideal university abroad.",
                cta: "Book Consultation",
                icon: "ri:user-star-line"
              },
              {
                title: "Scholarships",
                desc: "Access exclusive scholarship opportunities for international students and make your overseas education affordable. MATSOLS helps you identify the right scholarships, prepare applications, and maximize your chances of funding your studies at top global universities.",
                cta: "Find Scholarship",
                icon: "ri:medal-line"
              }
            ].map((offer, idx) => (
              <div key={idx} className="offer-card anim-hidden anim-pop" style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="offer-icon-tag">
                  <iconify-icon icon={offer.icon}></iconify-icon>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
                <a href="#" className="btn btn-primary" style={{ marginTop: 'auto' }}>{offer.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates & Insights Section */}
      <section className="section-insights">
        <div className="insights-bg-abstract">
          <svg viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <defs>
              <pattern id="denseGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--primary-orange)" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
              <linearGradient id="deepBlueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#004089" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#004089" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="orangeSurge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff863c" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#ff863c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff863c" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Layer 1: Skewed Cyber Grid */}
            <rect width="1800" height="1400" fill="url(#denseGrid)" opacity="0.4" transform="rotate(-15 -200 -200)" />

            {/* Layer 2: Massive Swish Curves (FAQ Density) */}
            <path d="M-200,600 C 200,900 800,200 1600,700" fill="none" stroke="url(#orangeSurge)" strokeWidth="50" strokeLinecap="round" opacity="0.2" filter="blur(20px)" /> {/* Blur for depth, heavy stroke */}
            <path d="M-100,300 Q 600,800 1300,100" fill="none" stroke="url(#orangeSurge)" strokeWidth="30" strokeLinecap="round" opacity="0.25" />
            <path d="M0,900 Q 700,200 1500,800" fill="none" stroke="#004089" strokeWidth="20" strokeLinecap="round" opacity="0.2" />

            {/* Layer 3: Tech Node Network (Floating Data) */}
            {[...Array(15)].map((_, i) => (
              <g key={`node-${i}`} opacity={Math.random() * 0.5 + 0.3}>
                <circle cx={Math.random() * 1400} cy={Math.random() * 1000} r={Math.random() * 4 + 2} fill="#ff863c" />
                <line 
                  x1={Math.random() * 1400} y1={Math.random() * 1000} 
                  x2={Math.random() * 1400} y2={Math.random() * 1000} 
                  stroke="#004089" strokeWidth="1" opacity="0.2" 
                />
              </g>
            ))}

            {/* Layer 4: Focal Energy Points */}
            <circle cx="1200" cy="800" r="300" fill="url(#deepBlueGlow)" />
            <circle cx="200" cy="200" r="250" fill="url(#deepBlueGlow)" />
            
            {/* Layer 5: Data Stream Lines */}
            <path d="M0,400 H1400" stroke="#ff863c" strokeWidth="1" strokeDasharray="10 30" opacity="0.4" />
            <path d="M0,420 H1400" stroke="#004089" strokeWidth="1" strokeDasharray="5 15" opacity="0.4" />
          </svg>
        </div>

        <div className="insights-content">
          <div className="container">
            <div className="insights-header" style={{ marginBottom: '60px' }}>
              <h2 className="section-title">Updates & <span className="text-gradient">Insights.</span></h2>
              <p className="section-subtitle">Real-time opportunities, essential notices, and global academic news.</p>
            </div>
          </div>
        </div>

        <div className="pinned-full-width">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ 
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' custom-pagination-bullet"></span>';
              }
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            slidesPerView={1}
            loop={true}
            className="cinematic-swiper no-nav-buttons"
          >
            {[
              {
                badge: "Important",
                title: "Spring 2026 Enrollment",
                subtitle: "Applications Open Now",
                desc: "Priority admissions for UK & Malta are live. Secure your scholarship eligibility before the Q3 deadline.",
                cta: "Begin Assessment",
                image: titan1
              },
              {
                badge: "Important",
                title: "The Elite Grant 2026",
                subtitle: "100% Tuition Coverage",
                desc: "Finalize your research portfolio by Feb 15th to satisfy the new STEM requirements for top-tier funding.",
                cta: "Apply for Grant",
                image: titan2
              }
            ].map((hero, i) => (
              <SwiperSlide key={i}>
                <div className="cinematic-strip">
                  <div className="cinematic-bg">
                    <img src={hero.image} alt="Hero Background" />
                    <div className="cinematic-overlay"></div>
                  </div>
                  
                  <div className="cinematic-content">
                    <span className="hero-badge-pill">{hero.badge}</span>
                    <h1 className="hero-title-large">{hero.title}</h1>
                    <h2 className="hero-subtitle">{hero.subtitle}</h2>
                    <p className="hero-desc">{hero.desc}</p>
                    <a href="#" className="hero-cta-btn">
                      {hero.cta} <iconify-icon icon="ri:arrow-right-line"></iconify-icon>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="container">
          <div className="insights-grid">
              {[
                {
                  badge: "Scholarship",
                  class: "badge-scholarship",
                  title: "Global Excellence Grant",
                  desc: "New $10,000 grants available for high-achieving STEM students applying to top-tier UK research institutions.",
                  date: "Ends Mar 15",
                  icon: "ri:medal-line"
                },
                {
                  badge: "Event",
                  class: "badge-event",
                  title: "Virtual Admissions Fair",
                  desc: "Connect directly with 20+ university representatives from Australia and Canada in our exclusive live webinar series.",
                  date: "Jan 30, 2026",
                  icon: "ri:calendar-event-line"
                },
                {
                  badge: "Admission",
                  class: "badge-admission",
                  title: "Malta Study Pathway",
                  desc: "Explore accelerated Business and IT programs with integrated internship placements in Malta's growing tech hub.",
                  date: "Q2 Intake",
                  icon: "ri:user-star-line"
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="insight-card anim-hidden anim-pop" 
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <span className={`insight-badge ${item.class}`}>{item.badge}</span>
                  <h3 className="insight-title">{item.title}</h3>
                  <p className="insight-desc">{item.desc}</p>
                  <div className="insight-footer">
                    <span style={{ fontSize: '12px', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <iconify-icon icon="ri:time-line"></iconify-icon> {item.date}
                    </span>
                    <a href="#" className="btn-insight">Details <iconify-icon icon="ri:arrow-right-line"></iconify-icon></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      <section className="section-why-choose" style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
        {/* Background Layer - Z-Index 1 */}
        <div className="why-choose-bg-abstract" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 1 }}>
            <svg viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="heavyGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#004089" strokeWidth="2" opacity="0.08"/>
                </pattern>
                <pattern id="diagonalHatch" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                   <line x1="0" y1="0" x2="0" y2="20" stroke="#ff6600" strokeWidth="2" opacity="0.1" />
                </pattern>
              </defs>
              
              {/* 1. Base Grid (Dark Blue) */}
              <rect width="1400" height="1000" fill="url(#heavyGrid)" />
              
              {/* 2. Structural Bars (Thick & Visible) */}
              <rect x="50" y="50" width="1300" height="900" fill="none" stroke="#004089" strokeWidth="6" opacity="0.1" />
              <line x1="700" y1="50" x2="700" y2="950" stroke="#004089" strokeWidth="4" opacity="0.1" />
              
              {/* 3. Orange Accent Zones */}
              <rect x="100" y="100" width="300" height="200" fill="url(#diagonalHatch)" />
              <rect x="1000" y="700" width="300" height="200" fill="url(#diagonalHatch)" />
              
              {/* 4. Circuit/Node Connectors (Solid) */}
              <circle cx="700" cy="500" r="150" fill="none" stroke="#004089" strokeWidth="2" strokeDasharray="20 10" opacity="0.2" />
              <circle cx="700" cy="500" r="140" fill="none" stroke="#ff6600" strokeWidth="4" opacity="0.1" />
              
              <line x1="50" y1="500" x2="1350" y2="500" stroke="#004089" strokeWidth="2" opacity="0.15" />
              <line x1="700" y1="50" x2="700" y2="950" stroke="#004089" strokeWidth="2" opacity="0.15" />
              
              {/* 5. Hard Corners */}
              <rect x="40" y="40" width="40" height="40" fill="#004089" opacity="0.2" />
              <rect x="1320" y="40" width="40" height="40" fill="#004089" opacity="0.2" />
              <rect x="40" y="920" width="40" height="40" fill="#004089" opacity="0.2" />
              <rect x="1320" y="920" width="40" height="40" fill="#004089" opacity="0.2" />
              <rect x="1320" y="920" width="40" height="40" fill="#004089" opacity="0.2" />

              {/* World Map Abstract Texture */}
              {[...Array(20)].map((_, i) => (
                <circle 
                  key={`dot-${i}`}
                  cx={Math.random() * 1400} 
                  cy={Math.random() * 1000} 
                  r={Math.random() * 3 + 2} 
                  fill="#004089" 
                  opacity="0.1" 
                />
              ))}
              
              {/* Large Geometric Watermark */}
              <circle cx="1200" cy="200" r="350" fill="url(#blueOracle)" opacity="0.4" />
              <path d="M1200,200 L1200,800" stroke="#004089" strokeWidth="1" opacity="0.1" />
              <path d="M900,200 L1500,200" stroke="#004089" strokeWidth="1" opacity="0.1" />
            </svg>
        </div>


        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="why-choose-header anim-hidden anim-up">
            <h2 className="section-title">
              {"Why Choose ".split("").map((char, i) => (
                <span key={`wc-${i}`} className="char" style={{ display: "inline-block", whiteSpace: "pre" }}>{char}</span>
              ))}
              <span className="text-gradient">
                {"MATSOLS?".split("").map((char, i) => (
                  <span key={`ms-${i}`} className="char" style={{ display: "inline-block" }}>{char}</span>
                ))}
              </span>
            </h2>
            <p className="section-subtitle">Empowering your academic aspirations with expert guidance and global reach.</p>
          </div>

          <div className="pillars-grid" style={{ perspective: '1000px' }}>
            {[
              {
                title: "Personalized Global Education Pathways",
                desc: "At MATSOLS, every student's journey begins with a personalized strategy. As a leading international education consultancy, we guide students through global university admissions and help design study plans that align with their long-term academic and career goals. Whether you want to study abroad in the UK, Malta, or Turkey, our experts ensure you choose the best program for your aspirations."
              },
              {
                title: "International Opportunities with Local Guidance",
                desc: "We connect students to top universities abroad while offering one-to-one support throughout the application process. With MATSOLS, international students benefit from study abroad guidance tailored to their location, time zone, and unique needs, ensuring a smooth and confident transition to global education opportunities."
              },
              {
                title: "Expert Consultants in Global Admissions",
                desc: "Our team of study abroad consultants specializes in international university applications. They provide practical advice, help strengthen student profiles, and ensure applications meet global standards, giving you a competitive advantage in securing admission to your dream institutions."
              },
              {
                title: "End-to-End Support for International Students",
                desc: "From course selection to student visa guidance, MATSOLS provides complete support for international students. We assist with applications, documentation, pre-departure preparation, and ongoing advice to ensure your overseas study journey is stress-free and successful."
              },
              {
                title: "Focused on Long-Term Academic and Career Success",
                desc: "We don't just help you get admission - we focus on outcomes. By offering guidance on overseas study programs and career-focused education, MATSOLS ensures that your education becomes a foundation for global opportunities and professional growth."
              },
              {
                title: "Integrity, Transparency, and Trust",
                desc: "As a trusted education consultancy for international students, MATSOLS provides honest, transparent advice. Students always understand their options, costs, and timelines, allowing them to make informed decisions about studying abroad with confidence."
              }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                className={`pillar-card anim-hidden ${idx < 3 ? 'anim-left' : 'anim-right'}`} 
                style={{ transitionDelay: `${(idx % 3) * 0.15}s` }}
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="impact-header" style={{ marginTop: '80px', textAlign: "left" }}>
            <h2 className="section-title">Our Global <span className="text-gradient">Impact in Numbers</span></h2>
            <p className="section-subtitle" style={{ textAlign: "left", marginLeft: "0" }}>Quantifying our commitment to international student success worldwide.</p>
          </div>

          <div className="impact-deck">
            {[
              { 
                num: '50,000+', 
                title: 'Students Successfully Placed',
                desc: 'Over 50,000 students worldwide have benefited from MATSOLS guidance, progressing through our pathways to top universities abroad and turning academic ambitions into real global opportunities.'
              },
              { 
                num: '135+', 
                title: 'Study Centres Across 40+ Countries',
                desc: 'Our international network of over 135 study centres ensures international students have access to consistent, high-quality guidance and study abroad support wherever they are.'
              },
              { 
                num: '120+', 
                title: 'Nationalities Represented Annually',
                desc: 'Students from over 120 countries join our programs each year, creating a diverse and inclusive global learning environment, supporting students from around the world in pursuing international education.'
              },
              { 
                num: '89%', 
                title: 'Achieve a 2:1 or Higher',
                desc: 'An impressive 89% of our students achieve a 2:1 or higher at university, showing that our study abroad guidance translates into strong academic performance globally.'
              },
              { 
                num: '70+', 
                title: 'University Partners Worldwide',
                desc: 'We collaborate with more than 70 trusted university partners, including 21 ranked in the QS World Top 200, giving international students access to globally recognized institutions.'
              }
            ].map((impact, idx) => (
              <div key={idx} className={`impact-card anim-hidden anim-zoom delay-${(idx % 3) * 100}`}>
                <div className="impact-num">{impact.num}</div>
                <div className="impact-title">{impact.title}</div>
                <p className="impact-desc">{impact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="section-path" ref={pathRef}>
        <div className="zigzag-svg-container">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1400 1500"
            preserveAspectRatio="none"
          >
            <path
              className="zigzag-path"
              d="M -100 0 L 1500 500 L -100 1000 L 1510 1510"
            />
          </svg>
        </div>

        <div className="path-container">
          <div className="path-header">
            <h2>Your path into global universities</h2>
            <p>
              We've helped 50,000+ international students get into university.
            </p>
          </div>

          <div className="path-steps">
            <div className="path-step">
              <div className="step-image-wrap">
                <img
                  src={path1}
                  alt="Choose your pathway"
                  className="step-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="step-content">
                <span className="step-num">Step 1</span>
                <h3 className="step-title">Personalized Strategy</h3>
                <p className="step-desc">
                  We design study plans that align with your long-term goals.
                  Whether you want to study in the UK, Malta, or Turkey, our
                  experts ensure you choose the best program for your
                  aspirations.
                </p>
                <a href="#" className="btn-path">
                  Our Programmes <span className="arrow">›</span>
                </a>
              </div>
            </div>

            <div className="path-step reversed">
              <div className="step-image-wrap">
                <img
                  src={path2}
                  alt="Support with every step"
                  className="step-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="step-content">
                <span className="step-num">Step 2</span>
                <h3 className="step-title">Global Admissions Support</h3>
                <p className="step-desc">
                  Our team specializes in international applications. We provide
                  one-to-one guidance, help strengthen your profile, and ensure
                  you meet global standards for your dream institutions.
                </p>
                <a href="#" className="btn-path">
                  How we support you <span className="arrow">›</span>
                </a>
              </div>
            </div>

            <div className="path-step">
              <div className="step-image-wrap">
                <img
                  src={path3}
                  alt="Gain entry"
                  className="step-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="step-content">
                <span className="step-num">Step 3</span>
                <h3 className="step-title">Career-Focused Success</h3>
                <p className="step-desc">
                  We focus on outcomes. From student visa guidance to
                  pre-departure prep, MATSOLS ensures your education becomes a
                  foundation for professional growth and global opportunities.
                </p>
                <a href="#" className="btn-path">
                  Explore universities <span className="arrow">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section (Redesigned for Single Row & White Theme) */}
      <section className="section-bento" ref={bentoRef}>
        <div className="bento-abstract-container">
          <svg
            viewBox="0 0 1400 1000"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient
                id="orangeGlow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.05"
                />
              </linearGradient>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="50%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>

            {/* Aggressive Organic Blobs */}
            <path
              d="M1200,100 Q1400,300 1100,500 T900,900"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M-100,200 Q300,400 100,700 T500,1000"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="30"
              strokeLinecap="round"
              opacity="0.2"
            />

            {/* Glowing Focal Points */}
            <circle cx="1250" cy="200" r="180" fill="url(#orangeGlow)" />
            <circle cx="150" cy="850" r="220" fill="url(#orangeGlow)" />

            {/* Complex Intersecting Lines */}
            <path
              d="M0,400 L1400,600"
              stroke="var(--primary-orange)"
              strokeWidth="8"
              opacity="0.4"
              strokeDasharray="20 40"
            />
            <path
              d="M-100,600 C 400,400 600,800 1500,500"
              stroke="var(--primary-orange)"
              strokeWidth="15"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M1400,100 C 1000,300 800,0 600,200"
              stroke="var(--primary-orange)"
              strokeWidth="12"
              fill="none"
              opacity="0.2"
            />

            {/* Technical Detail Elements */}
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={200 + i * 200}
                cy={100 + (i % 2) * 800}
                r="4"
                fill="var(--primary-orange)"
                opacity="0.5"
              />
            ))}

            {/* Floating High-Voltage Nodes */}
            <rect
              x="1100"
              y="700"
              width="160"
              height="160"
              rx="30"
              stroke="var(--primary-orange)"
              strokeWidth="4"
              fill="none"
              opacity="0.2"
              transform="rotate(15 1180 780)"
            />
            <rect
              x="1120"
              y="720"
              width="120"
              height="120"
              rx="20"
              fill="var(--primary-orange)"
              opacity="0.1"
              transform="rotate(15 1180 780)"
            />
          </svg>
        </div>

        <div className="container">
          <div
            className="bento-header anim-hidden anim-up"
            style={{
              textAlign: "center",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="section-badge center-badge">ACADEMIC EXCELLENCE</div>
            <h2 className="animate-bento-header">
              Premier Education Consulting
            </h2>
            <p className="animate-bento-header">
              Harnessing a decades-long legacy of academic excellence to
              architect your global future. Our data-driven strategies and elite
              institutional partnerships ensure a seamless transition into the
              world's most prestigious universities.
            </p>
          </div>

          <div className="bento-grid">
            {/* 1. Global Reach */}
            <div className="b-card b-large anim-hidden anim-left">
              <div className="card-main-content">
                <div className="card-top-row">
                  <h3 style={{ fontSize: "1.8rem" }}>Global Reach</h3>
                  <iconify-icon
                    icon="ri:global-line"
                    width="36"
                    className="card-icon-svg"
                  ></iconify-icon>
                </div>
                <p>
                  MATSOLS provides access to top universities abroad and programs across multiple countries, 
                  including the UK, Malta, and Turkey. Our international education consultancy ensures that 
                  students from all over the world receive expert guidance and support, connecting you to 
                  global education opportunities no matter where you are.
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "30px",
                    opacity: 0.3,
                  }}
                >
                  <iconify-icon icon="ri:earth-line" width="80"></iconify-icon>
                </div>
              </div>
              <div className="card-hover-content">
                <div className="hover-icon-wrap">
                  <iconify-icon
                    icon="ri:earth-line"
                    width="60"
                    className="hover-icon"
                  ></iconify-icon>
                </div>
                <h3>Expert Guidance</h3>
                <p className="hover-desc">
                  Providing expert on-the-ground support in every major academic hub.
                </p>
              </div>
            </div>

            {/* 2. Success Rate (Circular) */}
            <div className="b-card b-tall anim-hidden anim-right">
              <div className="card-main-content">
                <div className="card-top-row">
                  <h3 style={{ fontSize: "1.8rem" }}>Success Rate</h3>
                  <iconify-icon
                    icon="ri:line-chart-line"
                    width="36"
                    className="card-icon-svg"
                  ></iconify-icon>
                </div>
                <div className="success-circle-container">
                  <svg className="success-circle-svg" viewBox="0 0 100 100">
                    <circle className="circle-bg" cx="50" cy="50" r="45" />
                    <circle
                      className="circle-progress animate-success-circle"
                      cx="50"
                      cy="50"
                      r="45"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                    />
                  </svg>
                  <div className="percentage-text">
                    96%
                    <span>Visa Success</span>
                  </div>
                </div>
                <p style={{ marginTop: "auto" }}>
                  With a proven track record, over 50,000 students have successfully secured admission to 
                  world-leading universities through MATSOLS. Our study abroad consultants focus on 
                  achieving strong academic outcomes, helping students meet university requirements and 
                  maximize their potential for global success.
                </p>
              </div>
              <div className="card-hover-content">
                <div className="hover-icon-wrap">
                  <iconify-icon
                    icon="ri:verified-badge-line"
                    width="60"
                    className="hover-icon"
                  ></iconify-icon>
                </div>
                <h3>Academic Excellence</h3>
                <p className="hover-desc">
                  Focusing on strong academic outcomes and potential maximization.
                </p>
              </div>
            </div>

            {/* 3. Confidential (Small) */}
            <div className="b-card b-small anim-hidden anim-left">
              <div className="card-main-content">
                <div className="card-top-row">
                  <h3 style={{ fontSize: "1.8rem" }}>Confidential</h3>
                  <iconify-icon
                    icon="ri:shield-user-line"
                    width="36"
                    className="card-icon-svg"
                  ></iconify-icon>
                </div>
                <p style={{ marginTop: "20px", fontSize: "1rem" }}>
                  We respect your privacy and provide professional, secure support throughout your 
                  education journey. As a trusted education consultancy for international students, 
                  MATSOLS ensures that all your personal information, applications, and documentation 
                  are handled with full confidentiality and integrity.
                </p>
                <div style={{ marginTop: "auto", opacity: 0.3 }}>
                  <iconify-icon
                    icon="ri:fingerprint-line"
                    width="80"
                  ></iconify-icon>
                </div>
              </div>
              <div className="card-hover-content">
                <div className="hover-icon-wrap">
                  <iconify-icon
                    icon="ri:lock-password-line"
                    width="60"
                    className="hover-icon"
                  ></iconify-icon>
                </div>
                <h3>Total Integrity</h3>
                <p className="hover-desc">
                  Military-grade discretion for all high-profile university placements.
                </p>
              </div>
            </div>

            {/* 4. Tailored Pathways (Wide) */}
            <div className="b-card b-wide anim-hidden anim-right">
              <div className="card-main-content">
                <div className="card-top-row">
                  <h3 style={{ fontSize: "1.8rem" }}>Tailored Pathways</h3>
                  <iconify-icon
                    icon="ri:route-line"
                    width="36"
                    className="card-icon-svg"
                  ></iconify-icon>
                </div>
                <div
                  className="card-progress-track"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    height: "10px",
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    className="card-progress-bar animate-pathway-bar"
                    style={{
                      background: "var(--primary-orange)",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>
                <p style={{ marginTop: "30px" }}>
                  Every student is unique, and so is our guidance. MATSOLS designs personalized education 
                  pathways based on your goals, academic background, and career aspirations. From 
                  international university applications to student visa guidance, we ensure a 
                  step-by-step plan that aligns with your ambitions and opens doors to global study opportunities.
                </p>
              </div>
              <div className="card-hover-content">
                <div className="hover-icon-wrap">
                  <iconify-icon
                    icon="ri:mind-map"
                    width="60"
                    className="hover-icon"
                  ></iconify-icon>
                </div>
                <h3>Future Blueprints</h3>
                <p className="hover-desc">
                  Strategic plans designed to align with your unique ambitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
      <section className="section-scholarships">
        <div className="container">
          <div className="scholarship-header animate-entry">
            <div className="section-badge center-badge">CORPORATE ASSET ALLOCATION</div>
            <h2 className="section-title centered">Strategic <span className="text-gradient">Financial Optimization.</span></h2>
            <p className="section-subtitle centered">
              Leveraging global institutional synergies to drive sustainable academic throughput. Our robust financial infrastructure ensures optimized resource distribution across the scholarship lifecycle for maximum stakeholder value.
            </p>
          </div>

          <div className="grant-registry-grid animate-entry">
            {[
              { 
                title: "Academic Excellence Portfolio", 
                location: "Tier-1 Institutional Asset", 
                amount: "98th Percentile Yield", 
                tag: "Q1 2026 Pipeline", 
                icon: "ri:bank-card-line" 
              },
              { 
                title: "Strategic Human Capital Grant", 
                location: "Global Leadership Stream", 
                amount: "Full Asset Coverage", 
                tag: "High-Priority Stream", 
                icon: "ri:briefcase-line" 
              },
              { 
                title: "Innovative R&D Investment", 
                location: "Systemic Knowledge Transfer", 
                amount: "Milestone-Based Fund", 
                tag: "Performance Indexed", 
                icon: "ri:pie-chart-line" 
              }
            ].map((grant, idx) => (
              <div key={idx} className="grant-card luxury-glass">
                <div className="grant-card-glow"></div>
                <div className="grant-icon-wrapper">
                  <iconify-icon icon={grant.icon} width="40"></iconify-icon>
                </div>
                <div className="grant-body">
                  <div className="grant-tag">{grant.tag}</div>
                  <h3>{grant.title}</h3>
                  <p className="grant-location">{grant.location}</p>
                  <div className="grant-footer">
                    <span className="grant-amount">{grant.amount}</span>
                    <a href="#" className="grant-link">Execute Compliance →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="funding-ticker-wrapper animate-entry">
            <div className="funding-ticker">
              <span className="ticker-label">Cumulative Capital Outflow:</span>
              <span className="ticker-value">$12.4M ACV</span>
              <div className="ticker-divider"></div>
              <span className="ticker-label">Key Stakeholders:</span>
              <span className="ticker-value">2,840+</span>
              <div className="ticker-divider"></div>
              <span className="ticker-label">Project Yield Metric:</span>
              <span className="ticker-value">98.2%</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <a href="#" className="btn btn-primary">Initialize Asset Allocation</a>
          </div>
        </div>
      </section>
      */}

      {/* Destinations 3D */}
      <section className="section-dest" ref={destRef}>
        <div className="container">
          <h2 style={{ fontSize: "3rem", marginBottom: "12px", textAlign: "left" }}>
            Where Will You Excel?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "40px", textAlign: "left", marginLeft: "0" }}>
            Discover your ideal study destination among the world's leading academic hubs.
          </p>
          <div className="cards-row">
            <div className="dest-card anim-hidden anim-left">
              <img
                alt="UK"
                src="https://storage.googleapis.com/banani-generated-images/generated-images/ee17499d-cc53-46e4-90cf-1165877d8493.jpg"
              />
              <div className="dest-info">
                <h3>United Kingdom</h3>
                <div className="dest-details">
                  <p>Home to Oxford, Cambridge, and LSE.</p>
                  <span
                    style={{ color: "var(--primary-orange)", fontWeight: 600 }}
                  >
                    Explore UK →
                  </span>
                </div>
              </div>
            </div>
            <div className="dest-card anim-hidden anim-left">
              <img
                alt="USA"
                src="https://storage.googleapis.com/banani-generated-images/generated-images/4f95ce3a-7fbe-4e49-9201-29c22d1d80df.jpg"
              />
              <div className="dest-info">
                <h3>USA</h3>
                <div className="dest-details">
                  <p>Ivy League and top research institutions.</p>
                  <span
                    style={{ color: "var(--primary-orange)", fontWeight: 600 }}
                  >
                    Explore USA →
                  </span>
                </div>
              </div>
            </div>
            <div className="dest-card anim-hidden anim-right">
              <img
                alt="Canada"
                src="https://storage.googleapis.com/banani-generated-images/generated-images/ee7c2dce-4c7f-4225-b955-abf95a74d492.jpg"
              />
              <div className="dest-info">
                <h3>Canada</h3>
                <div className="dest-details">
                  <p>World-class education with PGWP options.</p>
                  <span
                    style={{ color: "var(--primary-orange)", fontWeight: 600 }}
                  >
                    Explore Canada →
                  </span>
                </div>
              </div>
            </div>
            <div className="dest-card anim-hidden anim-right">
              <img
                alt="Australia"
                src="https://storage.googleapis.com/banani-generated-images/generated-images/28fd5e03-2a59-4651-a36b-b0d2b542efec.jpg"
              />
              <div className="dest-info">
                <h3>Australia</h3>
                <div className="dest-details">
                  <p>Innovative research and vibrant lifestyle.</p>
                  <span
                    style={{ color: "var(--primary-orange)", fontWeight: 600 }}
                  >
                    Explore Australia →
                  </span>
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
            <h2 className="section-title">
              Success <span className="text-gradient">Stories.</span>
            </h2>
            <p className="section-subtitle">
              Real results from ambitious students who dared to dream bigger.
            </p>
          </div>

          <div className="stories-carousel-wrapper animate-entry">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={false}
              rewind={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              className="stories-carousel"
            >
              {[
                {
                  quote: "Honestly, I was stressed out about applying to universities abroad. I wasn't sure which country or course was right for me, and the whole paperwork thing was overwhelming. Then I reached out to MATSOLS. They walked me through everything-step by step-and helped me figure out a path that made sense for me. Now I'm at SBM Malta studying Business, and it's been amazing. The campus is vibrant, I've met people from over 30 countries, and I feel confident about my career plans. What I loved the most was how personal their support was-they really cared about my goals, not just getting me admitted.",
                  name: "Emma L.",
                  uni: "SBM Malta",
                  course: "Business Administration",
                  img: story1,
                },
                {
                  quote: "Applying to universities abroad was confusing at first. I didn't know which courses matched my skills or how to handle all the documents and deadlines. MATSOLS helped me map out my path, guided me through my application, and even gave me interview tips. Now I'm at a UK university studying IT, already doing projects that could help me land my first career job. I feel like I have a plan, a direction, and a support system all at once. MATSOLS wasn't just about admissions-they helped me take the first steps toward my career.",
                  name: "James K.",
                  uni: "UK University",
                  course: "Information Technology",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
                },
                {
                  quote: "I always wanted to study finance abroad, but honestly, I was worried about the cost. Between tuition, living expenses, and travel, it felt impossible on my family's budget. I wasn't sure how I'd make it work. Then I reached out to MATSOLS. They didn't just help me with my university applications-they helped me figure out scholarships, budget-friendly options, and ways to manage living costs abroad. They even helped me plan a realistic financial roadmap for my studies. Fast forward a few months, and I'm now studying Finance in Malta at SBM, surrounded by students from all over the world. I feel confident about my education and my finances, and I know I wouldn't have made it here without MATSOLS. They turned what felt impossible into a real opportunity.",
                  name: "Sofia R.",
                  uni: "SBM Malta",
                  course: "Finance & Accounting",
                  img: story3,
                },
              ].map((story, idx) => (
                <SwiperSlide key={idx}>
                  <div className="testi-card">
                    <div className="testi-image-side">
                      <div className="testi-image-circle">
                        <img
                          src={story.img}
                          alt={story.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="testi-content-side">
                      <p className="testi-quote">{story.quote}</p>
                      <div className="testi-author">
                        <h4>{story.name}</h4>
                        <p>{story.uni} — {story.course}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-faq">
        <div className="faq-abstract-container">
          <svg
            viewBox="0 0 1400 1000"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient
                id="orangeGlowFaq"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.05"
                />
              </linearGradient>
              <linearGradient
                id="lineGradientFaq"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="50%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-orange)"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>

            {/* Aggressive Organic Blobs */}
            <path
              d="M1200,100 Q1400,300 1100,500 T900,900"
              fill="none"
              stroke="url(#lineGradientFaq)"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M-100,200 Q300,400 100,700 T500,1000"
              fill="none"
              stroke="url(#lineGradientFaq)"
              strokeWidth="30"
              strokeLinecap="round"
              opacity="0.2"
            />

            {/* Glowing Focal Points */}
            <circle cx="1250" cy="200" r="180" fill="url(#orangeGlowFaq)" />
            <circle cx="150" cy="850" r="220" fill="url(#orangeGlowFaq)" />

            {/* Complex Intersecting Lines */}
            <path
              d="M0,400 L1400,600"
              stroke="var(--primary-orange)"
              strokeWidth="8"
              opacity="0.4"
              strokeDasharray="20 40"
            />
            <path
              d="M-100,600 C 400,400 600,800 1500,500"
              stroke="var(--primary-orange)"
              strokeWidth="15"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M1400,100 C 1000,300 800,0 600,200"
              stroke="var(--primary-orange)"
              strokeWidth="12"
              fill="none"
              opacity="0.2"
            />

            {/* Technical Detail Elements */}
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={200 + i * 200}
                cy={100 + (i % 2) * 800}
                r="4"
                fill="var(--primary-orange)"
                opacity="0.5"
              />
            ))}

            {/* Floating High-Voltage Nodes */}
            <rect
              x="1100"
              y="700"
              width="160"
              height="160"
              rx="30"
              stroke="var(--primary-orange)"
              strokeWidth="4"
              fill="none"
              opacity="0.2"
              transform="rotate(15 1180 780)"
            />
            <rect
              x="1120"
              y="720"
              width="120"
              height="120"
              rx="20"
              fill="var(--primary-orange)"
              opacity="0.1"
              transform="rotate(15 1180 780)"
            />
          </svg>
        </div>

        <div className="container">
          <div className="faq-layout">
            <div className="faq-info animate-entry">
              <div className="section-badge">SUPPORT</div>
              <h2 className="section-title">
                Common <span className="text-gradient">Questions.</span>
              </h2>
              <p className="section-subtitle">
                Everything you need to know about the elite education route.
              </p>
              <div className="faq-image-box">
                <img
                  src={path3}
                  alt="Consultation"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="faq-list">
              {[
                {
                  q: "How does the AI matching engine work?",
                  a: "Our engine uses machine learning to correlate your academic history, budget, and career goals with data from over 1,800 global universities to find the highest probability of success.",
                },
                {
                  q: "What is the typical timeline for an application?",
                  a: "For top-tier universities, we recommend starting at least 12 months in advance. However, our rapid-track service can handle urgent applications in under 3 months.",
                },
                {
                  q: "Do you assist with scholarship applications?",
                  a: "Yes, scholarship optimization is a core part of our service. We identify exclusive funding which often goes unadvertised to the general public.",
                },
                {
                  q: "What is your visa success rate?",
                  a: "We maintain a 98.4% visa success rate across UK, USA, Canada, and Australia through rigorous pre-submission audits and interview coaching.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${faqActive === idx ? "active" : ""} animate-entry`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => setFaqActive(faqActive === idx ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{item.q}</span>
                    <iconify-icon
                      icon={
                        faqActive === idx ? "line-md:minus" : "line-md:plus"
                      }
                      width="24"
                    ></iconify-icon>
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

      {/* Process Sticky - Extreme Overhaul */}
      <section className="section-process" ref={processRef} style={{ position: 'relative' }}>
        <div className="process-bg-abstract" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, 
        /* Orange background override handled by CSS or container */ }}>
            <svg viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="engineerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#004089" strokeWidth="0.5" opacity="0.15"/> {/* Dark Blue Stroke for Light BG */}
                </pattern>
                <linearGradient id="blueprintFade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#004089" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#004089" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Full Schematic Grid (Dark for Visibility) */}
              <rect width="1400" height="1000" fill="url(#engineerGrid)" />
              
              {/* Contrast Frame - Dark Blue */}
              <path d="M40,40 L150,40 M40,40 L40,150" stroke="#004089" strokeWidth="3" opacity="0.8" fill="none" />
              <path d="M1360,40 L1250,40 M1360,40 L1360,150" stroke="#004089" strokeWidth="3" opacity="0.8" fill="none" />
              <path d="M40,960 L150,960 M40,960 L40,850" stroke="#004089" strokeWidth="3" opacity="0.8" fill="none" />
              <path d="M1360,960 L1250,960 M1360,960 L1360,850" stroke="#004089" strokeWidth="3" opacity="0.8" fill="none" />
              
              {/* Ruler Markings */}
              {[...Array(20)].map((_, i) => (
                <line key={`v-rule-${i}`} x1={40} y1={100 + i * 40} x2={55} y2={100 + i * 40} stroke="#004089" strokeWidth="1" opacity="0.6" />
              ))}
              
              {/* Isometric / Radar Elements */}
              <circle cx="700" cy="500" r="300" stroke="#004089" strokeWidth="1" fill="none" strokeDasharray="10 10" opacity="0.3" />
              <circle cx="700" cy="500" r="450" stroke="#004089" strokeWidth="1" fill="url(#blueprintFade)" opacity="0.5" />
              
              {/* Isometric Cube Hint */}
              <path d="M1100,500 L1200,440 L1300,500 L1200,560 Z" fill="none" stroke="#004089" strokeWidth="2" opacity="0.2" />
              <path d="M1100,500 V620 L1200,680 V560" fill="none" stroke="#004089" strokeWidth="2" opacity="0.2" />
              <path d="M1300,500 V620 L1200,680" fill="none" stroke="#004089" strokeWidth="2" opacity="0.2" />
            </svg>
        </div>

        <div className="process-layout">
          <div className="sticky-col">
            <h2 className="process-header">
              The
              <br />
              Blueprint
            </h2>

            <div className="steps-nav">
              <div className="step-item active" data-step="1">
                <div className="step-dot"></div>
                <span>01. Strategy</span>
              </div>
              <div className="step-item" data-step="2">
                <div className="step-dot"></div>
                <span>02. Matching</span>
              </div>
              <div className="step-item" data-step="3">
                <div className="step-dot"></div>
                <span>03. Engineering</span>
              </div>
              <div className="step-item" data-step="4">
                <div className="step-dot"></div>
                <span>04. Integration</span>
              </div>
            </div>
          </div>

          <div className="process-content">
            {[
              {
                id: 1,
                title: "Strategic Blueprint",
                desc: "A comprehensive audit of your academic profile to identify high-potential opportunities and mitigate risks before they arise.",
                icon: "ri:focus-3-line",
                step: "01",
              },
              {
                id: 2,
                title: "Institutional Match",
                desc: "Correlating your trajectory with data from 1,850+ global institutions to find the intersection of prestige and acceptance probability.",
                icon: "ri:user-search-line",
                step: "02",
              },
              {
                id: 3,
                title: "Fidelity Audit",
                desc: "Every SOP and recommendation is refined for maximum institutional impact, ensuring documentation meets elite standards.",
                icon: "ri:article-line",
                step: "03",
              },
              {
                id: 4,
                title: "Success Integration",
                desc: "From final submission to pre-departure protocols, we ensure a seamless transition into your global education journey.",
                icon: "ri:send-plane-fill",
                step: "04",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`blueprint-card ${i === 0 ? "active" : ""}`}
                data-step={step.id}
              >
                <div className="card-inner">
                  <div className="card-header-clean">
                    <span className="step-label">Step {step.step}</span>
                    <div className="p-icon-box">
                      <iconify-icon icon={step.icon} width="40"></iconify-icon>
                    </div>
                  </div>
                  <div className="p-details">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Lead Magnet */}
      <div className="container">
        <section className="magnet-section">
          <div className="magnet-box">
            <div className="magnet-left">
              <img
                src={supportBg}
                loading="lazy"
                decoding="async"
                className="magnet-bg-image"
                alt="Support Team"
              />
              <div className="magnet-overlay"></div>
              <div className="magnet-content">
                <h2 className="magnet-title">
                  Begin Your Elite Education Journey
                </h2>
                <p className="magnet-desc">
                  Schedule a confidential strategy session with our senior
                  consultants to unlock exclusive university pathways and
                  scholarship opportunities.
                </p>
                <ul className="magnet-list">
                  <li>
                    <iconify-icon
                      icon="line-md:confirm"
                      width="20"
                    ></iconify-icon>{" "}
                    Exclusive Partner Network Access
                  </li>
                  <li>
                    <iconify-icon
                      icon="line-md:confirm"
                      width="20"
                    ></iconify-icon>{" "}
                    Strategic Scholarship Optimization
                  </li>
                  <li>
                    <iconify-icon
                      icon="line-md:confirm"
                      width="20"
                    ></iconify-icon>{" "}
                    Bespoke Academic Roadmapping
                  </li>
                </ul>
              </div>
            </div>
            <div className="magnet-form-wrap">
              <h3 className="magnet-form-title">
                Request a Confidential Consultation
              </h3>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                />
              </div>
              <button className="btn btn-primary magnet-btn">
                Schedule My Session
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
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

export default App;
