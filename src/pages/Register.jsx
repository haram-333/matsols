import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-overlay">
                <div className="auth-blob orange"></div>
                <div className="auth-blob blue"></div>
            </div>

            <div className="auth-card anim-fade-up">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        MATSOLS
                    </Link>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullname">Full Name</label>
                        <div className="form-input-wrap">
                            <input 
                                type="text" 
                                id="fullname" 
                                className="form-input" 
                                placeholder="Your full name"
                                required 
                            />
                            <iconify-icon icon="ri:user-line" class="input-icon"></iconify-icon>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrap">
                            <input 
                                type="email" 
                                id="email" 
                                className="form-input" 
                                placeholder="name@example.com"
                                required 
                            />
                            <iconify-icon icon="ri:mail-line" class="input-icon"></iconify-icon>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrap">
                            <input 
                                type="password" 
                                id="password" 
                                className="form-input" 
                                placeholder="Create a password"
                                required 
                            />
                            <iconify-icon icon="ri:lock-password-line" class="input-icon"></iconify-icon>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                        <div className="form-input-wrap">
                            <input 
                                type="password" 
                                id="confirm-password" 
                                className="form-input" 
                                placeholder="Repeat password"
                                required 
                            />
                            <iconify-icon icon="ri:lock-check-line" class="input-icon"></iconify-icon>
                        </div>
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? (
                            <>
                                <iconify-icon icon="eos-icons:loading" width="24"></iconify-icon>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Get Started <iconify-icon icon="ri:arrow-right-line"></iconify-icon>
                            </>
                        )}
                    </button>
                    
                    <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '0px' }}>
                        By registering, you agree to our Terms & Conditions.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
