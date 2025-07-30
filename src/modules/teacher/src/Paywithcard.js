import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const FeesChallan = () => {
    const navigate = useNavigate();

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    // Mock data for payment summary and user details
    const [userDetails] = useState({
        name: "{userData?.full_name}",
        id: "124567",
        avatar: "/assets/avatar.jpeg",
    });

    const [paymentDetails] = useState({
        monthlyFees: 40000,
        securityFees: 5000,
        attendanceFine: 3000,
    });

    // Calculate total payment dynamically
    const totalPayment = Object.values(paymentDetails).reduce((sum, fee) => sum + fee, 0);

    const handlePayNow = () => {
        // Logic for payment processing
        alert("Payment processing...");
    };

    return (
        <Container fluid>
            <Row className="p-1" id="paywithcard">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4 mt-4">
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
                                    placeholder="Enter Full Name"
                                />
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
                                    placeholder="Enter card number"
                                />
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
                                placeholder="Enter Code"
                            />
                        </Form.Group>

                        <div style={{ display: "flex" }}>
                            <Form.Group className="mb-3" style={{ marginRight: "10px" }}>
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
                                    placeholder="MM/YY"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
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
                                    type="text"
                                    placeholder="123"
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Row style={{width:'95%', justifyContent:'center', alignItems:'center', display:'flex', marginLeft:'2px'}}>
                    <Col
                        style={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "12px",
                            padding: "10px",
                            
                        }}
                    >
                        <Col className="d-flex align-items-center justify-content-between  bg-light ">
                            <div className="d-flex flex-grow-1 align-items-center">
                                <h5 className="me-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                                    Payment Summary
                                </h5>
                            </div>
                            <div>
                                <img
                                    src="/assets/dots-vertical.png"
                                    alt="Options"
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </div>
                        </Col>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td
                                        style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}
                                    >
                                        Monthly Fees
                                    </td>
                                    <td
                                        className="text-end"
                                        style={{ fontSize: "16px", fontWeight: "500", color: "#4B5563" }}
                                    >
                                        {paymentDetails.monthlyFees} Rs
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}
                                    >
                                        Security Fees
                                    </td>
                                    <td
                                        className="text-end"
                                        style={{ fontSize: "16px", fontWeight: "500", color: "#4B5563" }}
                                    >
                                        {paymentDetails.securityFees} Rs
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}
                                    >
                                        Attendance Fine
                                    </td>
                                    <td
                                        className="text-end"
                                        style={{ fontSize: "16px", fontWeight: "500", color: "#4B5563" }}
                                    >
                                        {paymentDetails.attendanceFine} Rs
                                    </td>
                                </tr>
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
                                    // height: "45px",
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
                                    // height: "45px",
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onClick={handlePayNow}
                            >
                                <img
                                    src="/assets/card-tick.png"
                                    alt="Pay Now"
                                    style={{ width: "24px", height: "24px", marginRight: "10px" }}
                                />
                                Pay Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default FeesChallan;
