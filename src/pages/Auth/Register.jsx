import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Login.css"; // Reuse shared auth styles

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    studyLevel: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".auth-glass-box", 
      { opacity: 0, scale: 0.98, x: 20 },
      { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [step]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {
      localStorage.setItem("matsols_user", JSON.stringify({ ...formData, role: "student" }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-bg-visuals">
        <div className="glow-sphere sphere-1"></div>
        <div className="glow-sphere sphere-2"></div>
      </div>
      
      <div className="auth-container">
        <div className="auth-glass-box">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>MATSOLS</span>
            </Link>
            <h1>Start Your Journey</h1>
            <p>Step {step} of 2: {step === 1 ? "Basic Details" : "Study Intent"}</p>
          </div>

          <form className="auth-form" onSubmit={handleNext}>
            {step === 1 && (
              <>
                <div className="auth-input-group">
                  <label>Full Name</label>
                  <div className="input-field">
                    <iconify-icon icon="ri:user-line"></iconify-icon>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Email Address</label>
                  <div className="input-field">
                    <iconify-icon icon="ri:mail-line"></iconify-icon>
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="auth-input-group">
                  <label>Prefered Destination</label>
                  <div className="input-field">
                    <iconify-icon icon="ri:global-line"></iconify-icon>
                    <input 
                      type="text" 
                      placeholder="e.g. United Kingdom" 
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Study Level</label>
                  <div className="input-field">
                    <iconify-icon icon="ri:graduation-cap-line"></iconify-icon>
                    <input 
                      type="text" 
                      placeholder="e.g. Undergraduate" 
                      value={formData.studyLevel}
                      onChange={(e) => setFormData({...formData, studyLevel: e.target.value})}
                      required 
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="btn-auth-submit">
              {step === 1 ? "Continue" : "Complete Registration"}
              <iconify-icon icon="ri:arrow-right-line"></iconify-icon>
            </button>
            
            {step === 2 && (
              <button type="button" className="forgot-link" onClick={() => setStep(1)} style={{marginTop: '10px', background:'none', border:'none', cursor:'pointer'}}>
                Back to previous step
              </button>
            )}
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
