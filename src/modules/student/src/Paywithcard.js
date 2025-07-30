import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const FeesChallan = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        cardholderName: "",
        cardNumber: "",
        zipCode: "",
        expirationDate: "",
        cvv: ""
    });
    
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});

    // Dynamic user details - in a real app, this would be fetched from an API
    const [userDetails, setUserDetails] = useState({
        name: "Jhon Doeo",
        id: "12456",
        avatar: "/assets/avatar.jpeg",
    });

    // Dynamic payment details - in a real app, this would be fetched from an API
    const [paymentDetails, setPaymentDetails] = useState({
        monthlyFees: 40000,
        securityFees: 5000,
        attendanceFine: 3000,
    });

    // Calculate total payment dynamically whenever paymentDetails changes
    const [totalPayment, setTotalPayment] = useState(0);
    
    useEffect(() => {
        // Calculate total payment whenever paymentDetails changes
        const total = Object.values(paymentDetails).reduce((sum, fee) => sum + fee, 0);
        setTotalPayment(total);
    }, [paymentDetails]);

    // Simulate fetching user data from an API
    useEffect(() => {
        // In a real application, you would fetch data here
        const fetchUserData = async () => {
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // This would be replaced with actual API data
                setUserDetails({
                    name: "Jhon D0eoo",
                    id: "12346",
                    avatar: "/assets/avatar.jpeg",
                });
                
                setPaymentDetails({
                    monthlyFees: 40000,
                    securityFees: 5000,
                    attendanceFine: 3000,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                setErrorMessage("Failed to load user data. Please try again later.");
            }
        };
        
        fetchUserData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error for this field when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        let isValid = true;
        
        // Validate cardholder name
        if (!formData.cardholderName.trim()) {
            errors.cardholderName = "Cardholder name is required";
            isValid = false;
        }
        
        // Validate card number
        if (!formData.cardNumber.trim()) {
            errors.cardNumber = "Card number is required";
            isValid = false;
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            errors.cardNumber = "Card number must be 16 digits";
            isValid = false;
        }
        
        // Validate zip code
        if (!formData.zipCode.trim()) {
            errors.zipCode = "Zip code is required";
            isValid = false;
        }
        
        // Validate expiration date
        if (!formData.expirationDate.trim()) {
            errors.expirationDate = "Expiration date is required";
            isValid = false;
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
            errors.expirationDate = "Use format MM/YY";
            isValid = false;
        }
        
        // Validate CVV
        if (!formData.cvv.trim()) {
            errors.cvv = "CVV is required";
            isValid = false;
        } else if (!/^\d{3}$/.test(formData.cvv)) {
            errors.cvv = "CVV must be 3 digits";
            isValid = false;
        }
        
        setFormErrors(errors);
        return isValid;
    };

    // Handle payment submission
    const handlePayNow = async () => {
        // Validate form
        if (!validateForm()) return;
        
        // Simulate payment processing
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Prepare payment data to pass to the FeesSlip component
            const paymentData = {
                paymentID: `#${Math.floor(1000000 + Math.random() * 9000000)}`,
                timeDate: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
                paymentMethod: "Card Payment",
                cardLastFour: formData.cardNumber.slice(-4),
                senderName: formData.cardholderName,
                amount: totalPayment,
                tax: Math.round(totalPayment * 0.01), // 1% tax for example
                total: totalPayment + Math.round(totalPayment * 0.01)
            };
            
            // Navigate to the FeesSlip component with payment data
            navigate('/payment-success', { 
                state: { paymentData } 
            });
            
        } catch (error) {
            console.error("Payment processing error:", error);
            setErrorMessage("Payment processing failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format expiration date
    const formatExpirationDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        
        if (v.length > 2) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
        }
        
        return v;
    };

    return (
        <Container fluid>
            <Row className="p-3" id="paywithcard">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center ">
                    <div id="feechallan" className="d-flex align-items-center">
                        <Image
                            id="arrow-left"
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)} // Navigate to the previous page
                        />

                        <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                            Fees Challan
                        </h1>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            id="info-img"
                            src={userDetails.avatar}
                            alt="User"
                            style={{
                                borderRadius: "50%",
                                width: "54px",
                                height: "54px",
                                marginRight: "10px",
                            }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>{userDetails.name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userDetails.id}</div>
                        </div>
                    </div>
                </header>

                {/* Error Message */}
                {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {errorMessage}
                    </div>
                )}

                <Row className="mt-4">
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                    Cardholder Name
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "#A9A9AF",
                                        borderRadius: "8px",
                                        borderWidth: "1px solid #E5E7EB",
                                        height: "45px",
                                    }}
                                    type="text"
                                    name="cardholderName"
                                    value={formData.cardholderName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Full Name"
                                    isInvalid={!!formErrors.cardholderName}
                                />
                                {formErrors.cardholderName && (
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.cardholderName}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                    Card Number
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "#A9A9AF",
                                        borderRadius: "8px",
                                        borderWidth: "1px solid #E5E7EB",
                                        height: "45px",
                                    }}
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={(e) => {
                                        const formattedValue = formatCardNumber(e.target.value);
                                        setFormData({
                                            ...formData,
                                            cardNumber: formattedValue
                                        });
                                        
                                        // Clear error when user types
                                        if (formErrors.cardNumber) {
                                            setFormErrors({
                                                ...formErrors,
                                                cardNumber: ""
                                            });
                                        }
                                    }}
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    maxLength={19} // 16 digits + 3 spaces
                                    isInvalid={!!formErrors.cardNumber}
                                />
                                {formErrors.cardNumber && (
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.cardNumber}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <div className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        id="custom-checkbox"
                                        checked={checkboxChecked}
                                        onChange={(e) => setCheckboxChecked(e.target.checked)}
                                    />
                                    <label htmlFor="custom-checkbox">
                                        Save my payment details for future use.
                                    </label>
                                </div>
                            </Form.Group>

                            <style>
                                {`
                                .custom-checkbox {
                                    display: flex;
                                    align-items: center;
                                    font-size: 12px;
                                    font-weight: 500;
                                    color:#6B7280;
                                    cursor: pointer;
                                }

                                .custom-checkbox input[type="checkbox"] {
                                    appearance: none;
                                    -webkit-appearance: none;
                                    width: 20px;
                                    height: 20px;
                                    border: 1px solid #ccc;
                                    border-radius: 6px;
                                    margin-right: 10px;
                                    display: inline-block;
                                    cursor: pointer;
                                }

                                .custom-checkbox input[type="checkbox"]:checked {
                                    background-color: #E5E7EB;
                                    border-color: #E5E7EB;
                                }

                                .custom-checkbox input[type="checkbox"]:checked::after {
                                    content: '✔';
                                    color: limegreen;
                                    font-weight: bold;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 18px;
                                    width: 100%;
                                    height: 100%;
                                }
                            `}
                            </style>
                        </Form>
                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                Zip Code
                            </Form.Label>
                            <Form.Control
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#A9A9AF",
                                    borderRadius: "8px",
                                    borderWidth: "1px solid #E5E7EB",
                                    height: "45px",
                                }}
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="Enter Code"
                                maxLength={5}
                                isInvalid={!!formErrors.zipCode}
                            />
                            {formErrors.zipCode && (
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.zipCode}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <div style={{ display: "flex" }}>
                            <Form.Group className="mb-3" style={{ marginRight: "10px", width: "50%" }}>
                                <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                    Expiration Date
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "#A9A9AF",
                                        borderRadius: "8px",
                                        borderWidth: "1px solid #E5E7EB",
                                        height: "45px",
                                    }}
                                    type="text"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={(e) => {
                                        const formattedValue = formatExpirationDate(e.target.value);
                                        setFormData({
                                            ...formData,
                                            expirationDate: formattedValue
                                        });
                                        
                                        // Clear error when user types
                                        if (formErrors.expirationDate) {
                                            setFormErrors({
                                                ...formErrors,
                                                expirationDate: ""
                                            });
                                        }
                                    }}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    isInvalid={!!formErrors.expirationDate}
                                />
                                {formErrors.expirationDate && (
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.expirationDate}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: "50%" }}>
                                <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                    CVV / CVC
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "#A9A9AF",
                                        borderRadius: "8px",
                                        borderWidth: "1px solid #E5E7EB",
                                        height: "45px",
                                    }}
                                    type="password"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    maxLength={3}
                                    isInvalid={!!formErrors.cvv}
                                />
                                {formErrors.cvv && (
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.cvv}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Row style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginLeft: '2px' }}>
                    <Col
                        style={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "12px",
                            padding: "10px",
                        }}
                    >
                        <Col className="d-flex align-items-center justify-content-between bg-light">
                            <div className="d-flex flex-grow-1 align-items-center">
                                <h5 className="me-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                                    Payment Summary
                                </h5>
                            </div>
                        </Col>
                        <table className="table">
                            <tbody>
                                {Object.entries(paymentDetails).map(([key, value], index) => (
                                    <tr key={index}>
                                        <td style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </td>
                                        <td className="text-end" style={{ fontSize: "16px", fontWeight: "500", color: "#4B5563" }}>
                                            {value} Rs
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex align-items-center justify-content-end gap-3">
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                    padding: "10px 10px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                }}
                            >
                                <h4
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        color: "#000",
                                        marginTop: "5px",
                                    }}
                                >
                                    Total Payment
                                </h4>
                                <span
                                    style={{ fontSize: "18px", fontWeight: "500", color: "#4B5563" }}
                                >
                                    {totalPayment} Rs
                                </span>
                            </div>
                            <Button
                                variant="dark"
                                className="w-auto"
                                style={{
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onClick={handlePayNow}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src="/assets/card-tick.png"
                                            alt="Pay Now"
                                            style={{ width: "24px", height: "24px", marginRight: "10px" }}
                                        />
                                        Pay Now
                                    </>
                                )}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default FeesChallan;