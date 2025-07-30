import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Card, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { UserContext } from "./UserContext";

const Login = () => {
    const { login } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "admin1@gmail.com",
        password: "123456",
        rememberMe: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const sendPasswordLink = async () => {
        if (!formData.email) {
            toast.error("Please enter your email address first.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, formData.email);
            toast.success("Password reset link sent to your email.", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error sending reset email:", error);
            toast.error("Failed to send password reset link. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.email || !formData.password) {
            toast.error("Missing Information! Please enter username and password.", {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
            return;
        }

        await login(formData.email, formData.password);
        setLoading(false);
    };

    return (
        <div className="modern-login-wrapper">
            <div className="login-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>
            
            <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
                <Card className="login-card shadow-lg border-0">
                    <Card.Body className="p-5">
                        {/* Logo Section */}
                        <div className="text-center mb-4">
                            <div className="logo-container">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="60" height="60" rx="12" fill="#101828"/>
                                    <path d="M18 26H42V34H18V26Z" fill="white"/>
                                    <path d="M21 30H39M21 31.5H36M21 28.5H39" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"/>
                                    <circle cx="30" cy="19" r="3" fill="white"/>
                                    <path d="M24 22.5C24 20.0147 26.4853 18 29.25 18H30.75C33.5147 18 36 20.0147 36 22.5" stroke="white" strokeWidth="1.5"/>
                                </svg>
                            </div>
                            <h2 className="login-title">Welcome Back</h2>
                            <p className="login-subtitle">Sign in to access your admin portal</p>
                        </div>

                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-4">
                                <Form.Label className="form-label">Email Address</Form.Label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polyline points="22,6 12,13 2,6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="Enter your email address"
                                        className="modern-input"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="form-label">Password</Form.Label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#6B7280" strokeWidth="2"/>
                                        <circle cx="12" cy="16" r="1" fill="#6B7280"/>
                                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#6B7280" strokeWidth="2"/>
                                    </svg>
                                    <Form.Control 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        placeholder="Enter your password"
                                        className="modern-input"
                                    />
                                </div>
                            </Form.Group>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Form.Check 
                                    type="checkbox" 
                                    name="rememberMe" 
                                    checked={formData.rememberMe} 
                                    onChange={handleChange} 
                                    label="Remember me"
                                    className="custom-checkbox"
                                />
                                <a 
                                    href="#" 
                                    onClick={sendPasswordLink} 
                                    className="forgot-password-link"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <Button 
                                type="submit" 
                                className="modern-login-btn w-100 mb-3" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <style>{`
                .modern-login-wrapper {
                    min-height: 100vh;
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }

                .login-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                }

                .floating-shapes {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float 6s ease-in-out infinite;
                }

                .shape-1 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, #101828, #374151);
                    top: 10%;
                    right: 15%;
                    animation-delay: 0s;
                }

                .shape-2 {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(45deg, #4B5563, #6B7280);
                    bottom: 20%;
                    left: 10%;
                    animation-delay: 2s;
                }

                .shape-3 {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(45deg, #9CA3AF, #D1D5DB);
                    top: 60%;
                    right: 25%;
                    animation-delay: 4s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                .login-card {
                    width: 100%;
                    max-width: 440px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 24px !important;
                    border: 1px solid rgba(16, 24, 40, 0.05);
                    box-shadow: 0 32px 64px -12px rgba(16, 24, 40, 0.14), 
                                0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .logo-container {
                    display: inline-flex;
                    padding: 16px;
                    background: rgba(16, 24, 40, 0.04);
                    border-radius: 16px;
                    margin-bottom: 24px;
                    border: 1px solid rgba(16, 24, 40, 0.08);
                }

                .login-title {
                    color: #101828;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.02em;
                }

                .login-subtitle {
                    color: #6B7280;
                    font-size: 16px;
                    font-weight: 400;
                    margin-bottom: 0;
                    line-height: 1.5;
                }

                .form-label {
                    color: #374151;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    letter-spacing: -0.01em;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 16px;
                    z-index: 2;
                    pointer-events: none;
                }

                .modern-input {
                    height: 48px;
                    padding-left: 48px !important;
                    padding-right: 16px !important;
                    border: 2px solid #E5E7EB !important;
                    border-radius: 12px !important;
                    background: #ffffff !important;
                    font-size: 16px;
                    font-weight: 400;
                    color: #374151 !important;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }

                .modern-input:focus {
                    border-color: #101828 !important;
                    box-shadow: 0 0 0 4px rgba(16, 24, 40, 0.1) !important;
                    background: #ffffff !important;
                }

                .modern-input::placeholder {
                    color: #9CA3AF;
                    font-weight: 400;
                }

                .custom-checkbox {
                    color: #374151;
                    font-size: 14px;
                    font-weight: 500;
                }

                .custom-checkbox .form-check-input {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #D1D5DB;
                    border-radius: 4px;
                    background-color: #ffffff;
                    margin-right: 8px;
                }

                .custom-checkbox .form-check-input:checked {
                    background-color: #101828;
                    border-color: #101828;
                }

                .forgot-password-link {
                    color: #101828;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .forgot-password-link:hover {
                    color: #374151;
                    text-decoration: underline;
                }

                .modern-login-btn {
                    height: 48px;
                    background: linear-gradient(135deg, #101828 0%, #374151 100%);
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(16, 24, 40, 0.15);
                    position: relative;
                    overflow: hidden;
                }

                .modern-login-btn:hover:not(:disabled) {
                    background: linear-gradient(135deg, #374151 0%, #4B5563 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.25);
                }

                .modern-login-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .modern-login-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Mobile Responsiveness */
                @media (max-width: 768px) {
                    .login-card {
                        margin: 20px;
                        max-width: calc(100% - 40px);
                    }
                    
                    .login-card .card-body {
                        padding: 32px 24px !important;
                    }
                    
                    .login-title {
                        font-size: 28px;
                    }
                    
                    .login-subtitle {
                        font-size: 14px;
                    }
                    
                    .shape {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .modern-input::placeholder {
                        font-size: 14px;
                    }
                    
                    .custom-checkbox {
                        font-size: 12px;
                    }
                    
                    .forgot-password-link {
                        font-size: 12px;
                    }
                }

                /* Toast Customization */
                .Toastify__toast {
                    border-radius: 12px;
                    font-family: inherit;
                    font-size: 14px;
                }

                .Toastify__toast--success {
                    background: linear-gradient(135deg, #059669 0%, #10B981 100%);
                }

                .Toastify__toast--error {
                    background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
                }
            `}</style>

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Login;