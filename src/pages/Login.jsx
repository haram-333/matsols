import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, logout } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Initial simple fade-in effect
    useEffect(() => {
        window.scrollTo(0, 0);
        // Force cleanup when visiting login page to prevent "storing last person"
        // Pass false to avoid redirect loop back to this page
        if (typeof logout === 'function') {
            logout(false);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                // Determine redirect path
                const from = location.state?.from?.pathname;

                const staffRoles = ["ADMIN", "EDITOR", "MARKETING"];
                if (staffRoles.includes(result.role)) {
                    navigate(from && from.startsWith("/admin") ? from : "/admin");
                } else {
                    navigate(from && from.startsWith("/dashboard") ? from : "/dashboard");
                }
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">
                        Don't have an account? <Link to="/register">Create one today</Link>
                    </p>
                </div>

                {error && (
                    <div className="auth-error-msg anim-shake">
                        <iconify-icon icon="ri:error-warning-fill"></iconify-icon>
                        {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrap">
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrap">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <iconify-icon icon={showPassword ? "ri:eye-off-line" : "ri:eye-line"}></iconify-icon>
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? (
                            <>
                                <iconify-icon icon="eos-icons:loading" width="24"></iconify-icon>
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In <iconify-icon icon="ri:arrow-right-line"></iconify-icon>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
