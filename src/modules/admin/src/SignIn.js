import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button, Container, Offcanvas, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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
        <div className="container-fluid vh-100 d-flex flex-column">
            <Navbar expand="lg" bg="white" className="py-3 px-1 border-bottom">
                <Container>
                    <Navbar.Brand href="/">
                        {/* */} <img src="/assets/logo.png" alt="Logo" height="40" style={{ width: "130px", height: "45px" }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowMenu(true)} style={{
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        fontSize: '1.25rem', // control icon size
                    }} />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end d-none d-lg-flex">
                        <Button variant="text" className="fw-semibold text-dark">Log in</Button>
                        <Button onClick={() => navigate('/signup')} variant="primary" className="fw-semibold text-white ms-2">Sign up</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column gap-3 align-items-center">
                    <Button variant="text" className="fw-semibold text-dark">Log in</Button>
                    <Button onClick={() => navigate('/signup')} variant="primary" className="fw-semibold text-white">Sign up</Button>
                </Offcanvas.Body>
            </Offcanvas>

            <Container className="d-flex justify-content-center align-items-center flex-grow-1">
                <Card className="p- w-100" id="login" style={{ maxWidth: "400px", border: "none" }}>
                    <div className="text-center mb-3">
                        {/*  <img src="/assets/logo.png" alt="Logo" height="40" style={{ width: "112px", height: "28px" }} /> */}
                    </div>
                    <h4 className="text-center" style={{ fontSize: '30px', fontWeight: '600', color: '#101828' }}>Log in to your account</h4>
                    <p className="text-center text-muted" id="ustad" style={{ fontSize: '16px', color: '#475467', fontWeight: '400' }}>Welcome back! Please enter your details.</p>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" style={{ border: '1px solid #D0D5DD', fontSize: '16px', fontWeight: '400', color: '#667085' }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '14px', fontWeight: '500', color: '#344054' }}>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" style={{ border: '1px solid #D0D5DD', fontSize: '16px', fontWeight: '400', color: '#667085' }} />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-3" >
                            <Form.Check id="sign" type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange}  label="Remember Me" style={{ fontSize: '14px', fontWeight: '500', color: '#344054', display:'flex', alignItems:'center', gap:'14px' }} />
                            <a href="#"  onClick={sendPasswordLink} id="sign" className="text-primary" style={{ fontSize: '14px', fontWeight: '600', color: '#2F80EC', textDecoration: 'none' }}>Forgot password</a>
                        </div>
                        <Button type="submit" variant="primary" className="w-100" style={{ fontSize: '16px', fontWeight: '600', background: '#2F80EC' }}>
                            {loading ? <Spinner animation="border" variant="light" size="sm" className="me-2" /> : "Sign In"}
                        </Button>
                    </Form>
                    <p className="text-center mt-3" id="sign" style={{ fontSize: '14px', fontWeight: '400', color: '#475467', display:'flex', justifyContent:'center', gap:'10px' }}>
                        Don’t have an account?
                        <button
                            onClick={() => window.location.href = '/signup'}
                            className="text-primary"
                            id="sign"
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#2F80EC',
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                paddingLeft: '2px'
                            }}
                        >
                            Sign up
                        </button>
                    </p>

                </Card>
            </Container>
            <style>{`
                        @media (max-width: 650px) {
                        #sign + label {
    font-size: 12px !important;
  }
                        #ustad{
                        font-size:14px !important;}
                        #sign{
                        font-size:12px !important;
                        font-weight:400 !important;}
                           #login{
                           height:80vh !important;}
                            input::placeholder,
  textarea::placeholder {
    
    font-size: 12px;
  }

                        }
                    `}</style>

            <ToastContainer />
        </div>
    );
};

export default Login;