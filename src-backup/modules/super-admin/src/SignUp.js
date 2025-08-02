import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button, Container, Offcanvas, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const { registerUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        adminId: "",
        userId: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.userId) {
                toast.error("Missing Information! Name, email, username, and ID fields are required.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                return;
            }

            if (!formData.termsAccepted) {
                toast.error("You must accept the terms and conditions.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                return;
            }

           
            if (!formData.password || !formData.confirmPassword) {
                toast.error("Missing Information! Both password and confirm password fields are required.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                toast.error("The password and confirm password fields must match, Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                return;
            }

            if (!passwordRegex.test(formData.password)) {
                toast.error("Weak Password! Your password must be at least 8 characters long and include both letters and numbers.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                return;
            }

            const data = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                user_name: formData.username,
                email: formData.email,
                user_id: formData.userId, 
                password: formData.password,
                status: true,
                role: 'user',
                createdAt: new Date().toISOString(),
                adminId: formData.adminId,
                profile_pic: '',
            };
            console.log('Registering user with data:', data);

            const result = await registerUser(data);

            if (result?.success) {
                navigate('/');
            } else {
                toast.error(`Error! ${result?.error || 'Something went wrong please try again later'}.`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

        } catch (error) {
            console.log('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
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
                    <Button variant="text" className="fw-semibold text-dark">Sign up</Button>
                    <Button onClick={() => navigate('/login')} variant="primary" className="fw-semibold text-white">Log in</Button>
                </Offcanvas.Body>
            </Offcanvas>

            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="p-4 border-0" id="card">
                    <div className="text-center mb-3">

                    </div>
                    <h4 className="text-center" style={{ fontSize: '30px', fontWeight: '600', color: '#101828' }}>Create an Account</h4>
                    <p className="text-center text-muted" id="ustad" style={{ fontSize: '16px', fontWeight: '400' }}>Let's setup your account! Please enter your details.</p>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex gap-2">
                            <Form.Group className="mb-3 w-50">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" />
                            </Form.Group>
                            <Form.Group className="mb-3 w-50">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
                        </Form.Group>
                        
                        {/* New ID field */}
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="userId" 
                                value={formData.userId} 
                                onChange={handleChange} 
                                placeholder="Enter your ID" 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Set Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="********" />
                        </Form.Group>
                        <Form.Group className="form-check mb-3" style={{ display: 'flex' }}>
                            <Form.Check type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} id="terms" />
                            <Form.Label htmlFor="terms" className="ms-2" id="sign">I agree to <a href="Term" className="text-primary">Terms & Conditions</a></Form.Label>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            {loading ? <Spinner animation="border" variant="light" size="sm" className="me-2" /> : "Create Account"}
                        </Button>
                    </Form>
                    <p className="text-center mt-3" id="sign">Already have an account? <a href="/login" className="text-primary" style={{ textDecoration: 'none' }}>Sign In</a></p>
                </Card>
            </Container>
            <style>{`
          
                        @media (max-width: 650px) {
                        #ustad{
                        font-size:14px !important;}
                        #card{
                        padding:0px !important;}
                        #terms{
                        font-size:12px;}
                          #sign{
            font-size:12px;
            font-weight:400;}
                          
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

export default Signup;