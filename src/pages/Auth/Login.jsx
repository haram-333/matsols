import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cinematic Reveal
    const tl = gsap.timeline();
    tl.fromTo(".auth-glass-box", 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" }
    );
    tl.from(".auth-input-group", { 
      opacity: 0, 
      y: 20, 
      stagger: 0.1, 
      duration: 0.5, 
      ease: "power2.out" 
    }, "-=0.4");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Protopye logic: store a mock user and navigate
    localStorage.setItem("matsols_user", JSON.stringify({ name: "Demo Student", role: "student" }));
    navigate("/dashboard");
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-bg-visuals">
        <div className="glow-sphere sphere-1"></div>
        <div className="glow-sphere sphere-2"></div>
      </div>
      
      <div className="auth-container">
        <div className="auth-glass-box">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>MATSOLS</span>
            </Link>
            <h1>Welcome Back</h1>
            <p>Access your global education portal</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="input-field">
                <iconify-icon icon="ri:mail-line"></iconify-icon>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot?</a>
              </div>
              <div className="input-field">
                <iconify-icon icon="ri:lock-password-line"></iconify-icon>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit">
              Sign In to Portal
              <iconify-icon icon="ri:arrow-right-line"></iconify-icon>
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
