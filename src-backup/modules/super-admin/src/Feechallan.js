import React, { useContext } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";


const Feechallan = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const handlePayWithCard = () => {
        navigate("/paywithcard"); // Navigate to the Paywithcard page
    };
    const data = [
        { sr: 1, no: "4589621420", issue: "25-Sep-2024", deadline: "25-Sep-2024", amount: "37,000", status: "Paid" },
        { sr: 2, no: "1239874852", issue: "18-Jul-2024", deadline: "18-Jul-2024", amount: "40,000", status: "Unpaid" },
        { sr: 3, no: "7894123651", issue: "18-Jun-2024", deadline: "18-Jun-2024", amount: "39,000", status: "Paid" },
        { sr: 4, no: "789451239", issue: "19-Feb-2024", deadline: "19-Feb-2024", amount: "45,000", status: "Unpaid" },
        { sr: 5, no: "789451239", issue: "12-Jan-2024", deadline: "12-Jan-2024", amount: "38,000", status: "Paid" },
    ];

    return (
        <div className="d-flex">


            {/* Main Content */}
            <Container fluid className="p-4" id="feechallan">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-3">
                    <div></div>
                    <div className="d-flex align-items-center" id="info-section">
                        <img
                            id="info-img"
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: "54px", height: "54px" }}
                        />
                        <div className="me-2">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>{userData?.full_name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.admin_id}</div>
                        </div>
                        {/* <button className="bg-transparent border-0">
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: "12px", height: "12px" }}
                            />
                        </button> */}
                    </div>
                </header>


                {/* Table Section */}
                <Card className="mb-4" style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', padding: '12px' }}>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3 p-2">
                        <h5 className="fw-bold mb-0" style={{ fontSize: "20px", fontWeight: '600', color: "#0D0D0D" }}>Fees Challan</h5>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/feechallandetail");
                            }}
                            style={{
                                textDecoration: "none",
                                fontSize: "12px",
                                color: "#344054",
                                fontWeight: "500",
                                borderBottom: "1px solid black",
                            }}
                        >
                            View all
                        </a>
                    </div>

                    {/* Table wrapped in a div */}
                    <div style={{ overflowX: 'auto', backgroundColor: 'white' }}>
                        <Table hover responsive className="mb-0" style={{ marginBottom: '0px' }}>
                            <thead style={{ backgroundColor: "#F9FAFB", fontSize: "14px", color: "#475467", fontWeight: '500' }}>
                                <tr>
                                    <th className="fw" id="srno" style={{ paddingLeft: '30px' }}>Sr No.</th>
                                    <th className="fw" style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Challan no</th>
                                    <th className="fw" style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Issue Date</th>
                                    <th className="fw" style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Dead line</th>
                                    <th className="fw" style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Amount</th>
                                    <th className="fw" style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px", fontWeight: '400', color: "#4B5563", lineHeight: '50px' }}>
                                {data.map((item, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            borderBottom: "1px solid #E0E0E0",
                                            cursor: item.status === "Unpaid" ? "pointer" : "default" // Show pointer only on Unpaid
                                        }}
                                        onClick={() => {
                                            if (item.status === "Unpaid") {
                                                navigate('/paywithcard'); // Navigate to PayWithCard page
                                            }
                                        }}
                                    >
                                        <td className="fw" style={{ paddingLeft: '30px', fontSize: '12px', fontWeight: '400', color: '#4B5563' }}>{item.sr}</td>
                                        <td className="fw" style={{ paddingLeft: '6px', fontSize: '12px', fontWeight: '400', color: '#4B5563' }}>{item.no}</td>
                                        <td className="fw" style={{ paddingLeft: '6px', fontSize: '12px', fontWeight: '400', color: '#4B5563' }}>{item.issue}</td>
                                        <td className="fw" style={{ paddingLeft: '6px', fontSize: '12px', fontWeight: '400', color: '#4B5563' }}>{item.deadline}</td>
                                        <td className="fw" style={{ paddingLeft: '6px', fontSize: '12px', fontWeight: '400', color: '#4B5563' }}>{item.amount} Rs</td>
                                        <td
                                            className="fw-semibold"
                                            style={{
                                                color: '#000', // Set text color always black
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                borderBottom: 'none'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: item.status === "Paid" ? "#12B76A" : "#F04438", // Dot color
                                                    fontSize: "18px",
                                                    lineHeight: "0",
                                                }}
                                            >
                                                ●
                                            </span>
                                            {item.status}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Mobile Responsive Adjustments */}
                    <style>
                        {`
                        /* Completely hide both scrollbars and disable scrolling */
.hide-scrollbar {
  overflow: hidden;
}

/* Hide scrollbars but allow scrolling */
.hide-scrollbar-scrollable {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.hide-scrollbar-scrollable::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

      @media (max-width: 768px) {
        .table {
          font-size: 14px;
        }
        .table th, .table td {
          padding: 8px !important;
        }
      }
    `}
                    </style>
                </Card>



                {/* Payment Cards */}
                <Row>
                    {/* Pending Payment */}
                    <Col md={6}>
                        <Card className=" mb-3" style={{ borderRadius: '12px', border: '1px solid #E5E7EB', padding: '12px' }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px", // Spacing below the heading
                            }}>
                                <h5
                                    className="fw-bold mb-0"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "black", // Optional, adjust for design
                                    }}
                                >
                                    Pending Payment
                                </h5>

                            </div>

                            <p style={{ fontSize: "14px", color: "black", fontWeight: '500' }}>
                                <strong>Fees</strong>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                                    Challan number 754896212 (Unpaid)
                                </p>
                            </p>

                            <div style={{ display: 'flex' }}>
                                <h4 className="fw-bold" style={{ fontSize: '24px', fontWeight: '500', }}>45,000 </h4>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '6px' }}>
                                    Rs
                                </p>
                            </div>
                            <div style={{
                                borderBottom: "1px solid #E5E7EB", // Adjust the color to match your design
                                margin: "0px 0", // Space around the divider
                            }}></div>
                            <p style={{ fontSize: "14px", color: "black", fontWeight: '500' }}>
                                <strong>Fine</strong>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                                    Fine number 754 (Unpaid)
                                </p>
                            </p>
                            <div style={{ display: 'flex' }}>
                                <h4 className="fw-bold" style={{ fontSize: '24px', fontWeight: '500', }}>30,000 </h4>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '6px' }}>
                                    Rs
                                </p>
                            </div>
                            <div style={{
                                borderBottom: "1px solid #E5E7EB", // Adjust the color to match your design
                                margin: "0px 0", // Space around the divider
                            }}></div>
                            <p style={{ fontWeight: "500", fontSize: '14px' }}>
                                Total Payment{" "}
                                <span style={{ fontSize: "14px", fontWeight: "500", color: '#6B7280' }}>
                                    48,000 Rs
                                </span>
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <Button
                                    variant="dark"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        height: '45px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 16px',
                                        backgroundColor: '#1E293B',
                                        border: 'none',
                                    }}
                                    onClick={handlePayWithCard} // Add the click handler
                                >
                                    <img
                                        src="/assets/cards.png"
                                        alt="Card Icon"
                                        className="me-2"
                                        width={24}
                                        height={24}
                                    />
                                    Pay With Card
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    {/* Upcoming Fees */}
                    <Col md={6}>
                        <Card className="upcoming-fees " style={{ borderRadius: '12px', border: '1px solid #E5E7EB', padding: '12px' }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px", // Spacing below the heading
                            }}>
                                <h5
                                    className="fw-bold mb-0"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "black", // Optional, adjust for design
                                    }}
                                >
                                    Upcoming Payment
                                </h5>

                            </div>
                            <p style={{ fontSize: "14px", color: "black", fontWeight: '500' }}>
                                <strong>Fees</strong>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                                    Challan number 754896212
                                </p>
                            </p>

                            <div style={{ display: 'flex' }}>
                                <h4 className="fw-bold" style={{ fontSize: '24px', fontWeight: '500', }}>43,000 </h4>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '6px' }}>
                                    Rs
                                </p>
                            </div>
                            <div style={{
                                borderBottom: "1px solid #E5E7EB", // Adjust the color to match your design
                                margin: "0px 0", // Space around the divider
                            }}></div>

                            <p style={{ fontSize: "14px", color: "black", fontWeight: '500' }}>
                                <strong>Dead Line</strong>
                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                                    25 november 2024
                                </p>
                            </p>

                            <div style={{
                                borderBottom: "1px solid #E5E7EB", // Adjust the color to match your design
                                margin: "0px 0", // Space around the divider
                            }}></div>
                            <p style={{ fontWeight: "500", fontSize: '14px' }}>
                                Total Payment{" "}
                                <span style={{ fontSize: "14px", fontWeight: "500", color: '#6B7280' }}>
                                    48,000 Rs
                                </span>
                            </p>
                            <p style={{ fontWeight: "500", fontSize: '14px' }}>
                                Payment After Due Date{" "}
                                <span style={{ fontSize: "14px", fontWeight: "500", color: '#6B7280' }}>
                                    44,500 Rs
                                </span>
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <Button
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        height: '45px',
                                        borderRadius: '12px', // Rounded corners
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'black',
                                        padding: '0 16px', // Ensures proper padding for content-based width
                                        backgroundColor: 'transparent',
                                        border: '1px solid #E5E7EB', // Correct border style
                                        marginRight: '12px',
                                    }}
                                >
                                    Remind me Later
                                </Button>

                                <Button
                                    variant="dark"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        height: '45px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 16px', // Ensures proper padding for content-based width
                                        backgroundColor: '#1E293B',
                                        border: 'none',
                                    }}
                                    onClick={handlePayWithCard} // Add the click handler

                                >
                                    <img
                                        src="/assets/cards.png" // Replace with avatar image path
                                        alt="Card Icon"
                                        className="me-2"
                                        width={24}
                                        height={24}
                                    />
                                    Pay With Card
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Feechallan;
