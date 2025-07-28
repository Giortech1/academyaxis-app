import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const SlipDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const paymentCardRef = useRef(null);
    
    // State for payment data with expanded fields that match the Figma design
    const [paymentData, setPaymentData] = useState({
        paymentID: "#1234569",
        timeDate: new Date().toLocaleString(),
        paymentMethod: "Card Payment",
        cardLastFour: "1234567856",
        senderName: "Muhammad Faisal",
        amount: 12300,
        tax: 12,
        total: 12312,
        userID: "234432424",
        paymentMonth: "January 2025",
        paymentDate: "12:22:23",
        billingAddress: "123 Main Street, Lahore",
        status: "Paid",
        academyAxisStatus: ""
    });
    
    // Fetch payment data from location state if available
    useEffect(() => {
        if (location.state?.paymentData) {
            // Get current date and format it for the payment date
            const currentDate = new Date();
            const formattedTime = `${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
            
            // Get current month and year for payment month
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const formattedMonth = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            
            // Merge with default data to ensure all fields exist
            setPaymentData({
                ...paymentData,
                ...location.state.paymentData,
                // Set additional fields needed for this view
                userID: location.state.paymentData.userID || "234432424",
                paymentMonth: location.state.paymentData.paymentMonth || formattedMonth,
                paymentDate: location.state.paymentData.paymentDate || formattedTime,
                billingAddress: location.state.paymentData.billingAddress || "123 Main Street, Lahore",
                status: location.state.paymentData.status || "Paid",
                academyAxisStatus: location.state.paymentData.academyAxisStatus || ""
            });
        }
    }, [location.state]);
    
    // Function to handle back button
    const handleBack = () => {
        navigate(-1);
    };
    
    // Function to handle download PDF
    const handleDownloadPdf = () => {
        // Create a promise-based function for generating PDF
        const generatePDF = async () => {
            // Show loading state if needed
            try {
                // Capture the payment card as an image
                const element = paymentCardRef.current;
                const canvas = await html2canvas(element, {
                    scale: 2, // Higher scale for better quality
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff"
                });
                
                // Initialize PDF document
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });
                
                // Get dimensions
                const imgWidth = 210; // A4 width in mm (210mm)
                const pageHeight = 297; // A4 height in mm (297mm)
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Add image to PDF
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                
                // Save the PDF
                pdf.save(`Payment_Statement_${paymentData.paymentID}.pdf`);
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("There was an error generating the PDF. Please try again.");
            }
        };
        
        // Execute the PDF generation
        generatePDF();
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
                        Payment Statement
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        id="feeimg"
                        src="/assets/avatar.jpeg"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                    </div>
                </div>
            </header>
            
            {/* Payment Statement Title */}
            <Row className="mb-4">
                <Col>
                    <h3 style={{fontSize:'20px', fontWeight:'600'}}>Payment Statement</h3>
                </Col>
            </Row>

            {/* Payment Details Card */}
            <Row className="justify-content-center">
                <Col md={10} lg={6}>
                    <div 
                        ref={paymentCardRef} 
                        className="card p-4" 
                        style={{border:'1px solid #EAECF0', borderRadius:'22px'}}
                    >
                        {/* School Logo and Name */}
                        <div className="text-center mb-4 position-relative">
                            <h2 className="mb-4" style={{fontSize:'32px', fontWeight:'700'}}>Academy Axis LOGO</h2>
                        </div>
                        
                        {/* Payment Details Table */}
                        <div>
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Name</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.senderName}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>User ID</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.userID}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Payment Month</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.paymentMonth}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Payment Date</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.paymentDate}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Amount</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>${typeof paymentData.amount === 'number' ? paymentData.amount.toFixed(2) : paymentData.amount}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>AcademyAxis Status</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.academyAxisStatus}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Tax</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>${typeof paymentData.tax === 'number' ? paymentData.tax.toFixed(2) : paymentData.tax}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Total Amount</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>${typeof paymentData.total === 'number' ? paymentData.total.toFixed(2) : paymentData.total}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Billing Address</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.billingAddress}</div>
                            </div>
                            
                            <div className="d-flex justify-content-between py-2">
                                <div style={{fontSize:'18px', fontWeight:'400', color:'#475467'}}>Status</div>
                                <div className="text-end" style={{fontSize:'18px', fontWeight:'500', color:'#000'}}>{paymentData.status}</div>
                            </div>
                        </div>
                        
                        {/* Download Button - only shown on screen, not in PDF */}
                        <div className="text-center mt-4 pdf-hide">
                            <Button 
                                variant="primary" 
                                className="px-4 py-2"
                                style={{ 
                                    backgroundColor: "#A855F7", 
                                    borderColor: "#A855F7", 
                                    fontSize:'16px', 
                                    fontWeight:'500', 
                                    borderRadius:'8px',
                                    width: '80%',
                                    maxWidth: '400px'
                                }}
                                onClick={handleDownloadPdf}
                            >
                                <img 
                                    src="/assets/file2.png" 
                                    alt="Download" 
                                    width={20} 
                                    height={20} 
                                    className="me-2"
                                /> Download PDF
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SlipDetails;