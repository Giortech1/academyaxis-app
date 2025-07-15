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
                            <Form.Check id="sign" type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} label="Remember Me" style={{ fontSize: '14px', fontWeight: '500', color: '#344054', display: 'flex', alignItems: 'center', gap: '14px' }} />
                            <a href="#" onClick={sendPasswordLink} id="sign" className="text-primary" style={{ fontSize: '14px', fontWeight: '600', color: '#2F80EC', textDecoration: 'none' }}>Forgot password</a>
                        </div>
                        <Button type="submit" variant="primary" className="w-100" style={{ fontSize: '16px', fontWeight: '600', background: '#2F80EC' }}>
                            {loading ? <Spinner animation="border" variant="light" size="sm" className="me-2" /> : "Sign In"}
                        </Button>
                    </Form>
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