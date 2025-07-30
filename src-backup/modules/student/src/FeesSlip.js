import React, { useState, useEffect, useContext } from "react";
import { Container, Row,Image, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const FeesSlip = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    // State for dynamic payment data
    const [paymentData, setPaymentData] = useState({
        paymentID: "#123569",
        timeDate: new Date().toLocaleString(),
        paymentMethod: "Card Payment",
        cardLastFour: "123467856",
        senderName: "Muhammad Faisal",
        amount: 123330,
        tax: 12,
        total: 123342
    });
    
    // Fetch payment data from API or passed state
    useEffect(() => {
        // If data is passed from previous page, use it
        if (location.state?.paymentData) {
            setPaymentData({
                ...paymentData,
                ...location.state.paymentData,
                // Calculate total if not provided
                total: location.state.paymentData.total || 
                      (location.state.paymentData.amount + location.state.paymentData.tax),
                // Add additional fields needed for SlipDetails
                userID: "234432424",
                paymentMonth: "January 2025",
                paymentDate: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
                billingAddress: "123 Main Street, Lahore",
                status: "Paid",
                academyAxisStatus: ""
            });
        } else {
            // For demo, we could fetch from an API here
            // This is where you would make an API call in a real application
            console.log("No payment data provided, using default values");
        }
    }, [location.state]);

    // Function to handle cancel button
    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };
    
    // Function to handle view button - navigate to SlipDetails
    const handleView = () => {
        navigate('/slip-details', { state: { paymentData } });
    };

    return (
        <Container fluid className="py-3">
            {/* Header Section */}
           <header className="d-flex justify-content-between align-items-center mb-4" >
                    <div className="d-flex align-items-center">
                        <Image
                        
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)}
                           
                        />
                        <h1 id="feeheading" className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                            payment details
                        </h1>
                    </div>

                    <div className="d-flex align-items-center">
                        <img
                         id="feeimg"
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: "54px", height: "54px" }}
                        />
                        <div className="me-0">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>{userData?.full_name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.student_id}</div>
                        </div>
                    
                    </div>
                </header>

            {/* Title Section with buttons */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <h3 className="payment-details" style={{fontSize:'20px', fontWeight:'600'}}>Payment Details</h3>
                </Col>
                <Col xs="auto">
                    <Button 
                        variant="light" 
                        className="me-2 px-4"
                        onClick={handleCancel}
                        style={{fontSize:'16px', fontWeight:'400', background:'#F2F4F7', borderRadius:'12px'}}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        className="px-4"
                        style={{ backgroundColor: "#9747FF", borderColor: "#9747FF", fontSize:'16px', fontWeight:'400', borderRadius:'12px' }}
                        onClick={handleView}
                    >
                        View
                    </Button>
                </Col>
            </Row>

            {/* Payment Success Card */}
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="card p-3" style={{border:'1px solid #EAECF0', borderRadius:'22px'}}>
                        <div className="text-center mb-3">
                            {/* Success Icon */}
                            <div 
                                className="rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                                style={{ 
                                    backgroundColor: "#8A3FFC", 
                                    width: "60px", 
                                    height: "60px" 
                                }}
                            >
                                <img 
                                    src="/assets/tick.png" 
                                    alt="Success Icon" 
                                    width={77} 
                                    height={77} 
                                />
                            </div>
                            
                            <h3 className="mb-1" style={{fontSize:'28px', fontWeight:'600'}}>Payment Successful</h3>
                            <p className="text" style={{fontSize:'20px', fontWeight:'400'}}>Payment Statement</p>
                            
                            {/* Payment ID Badge */}
                            <div className="d-inline-block px-3 py-2 mb-4" style={{border:'1px solid #E5E5E5', borderRadius:'12px', fontSize:'20px', fontWeight:'400'}}>
                                <span className="me-2">
                                    <img 
                                        src="/assets/file1.png" 
                                        alt="File Icon" 
                                        width={16} 
                                        height={16}
                                    />
                                </span>
                                {paymentData.paymentID}
                            </div>
                        </div>
                        
                        {/* Payment Details Table */}
                        <div>
                            <div className="d-flex justify-content-between py-2">
                                <div className="time" style={{fontSize:'16px', fontWeight:'500'}}>Time Date</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>{paymentData.timeDate}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div className="payment-id" style={{fontSize:'16px', fontWeight:'500'}}>Payment ID</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>{paymentData.cardLastFour}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div className="payment-method" style={{fontSize:'16px', fontWeight:'500'}}>Payment Method</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>{paymentData.paymentMethod}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div className="sender-name" style={{fontSize:'16px', fontWeight:'500'}}>Sender Name</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>{paymentData.senderName}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div className="amount" style={{fontSize:'16px', fontWeight:'500'}}>Amount</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>${typeof paymentData.amount === 'number' ? paymentData.amount.toFixed(2) : paymentData.amount}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div className="tax" style={{fontSize:'16px', fontWeight:'500'}}>Tax</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'400', color:'#475467'}}>${typeof paymentData.tax === 'number' ? paymentData.tax.toFixed(2) : paymentData.tax}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-top mt-2 pt-3">
                                <div className="total" style={{fontSize:'16px', fontWeight:'500'}}>Total</div>
                                <div className="text-end" style={{fontSize:'16px', fontWeight:'500', color:'#12B76A'}}>${typeof paymentData.total === 'number' ? paymentData.total.toFixed(2) : paymentData.total}</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FeesSlip;