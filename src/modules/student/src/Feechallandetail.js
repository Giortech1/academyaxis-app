import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

function Coursedetails() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchedCourses = Array.from({ length: 20 }, (_, index) => ({
            srNo: index + 1,
            challanNo: `CH-${1000 + index}`,
            issueDate: `2024-01-${String(index + 1).padStart(2, "0")}`,
            deadline: `2024-02-${String(index + 1).padStart(2, "0")}`,
            amount: `$${(100 + index * 10).toFixed(2)}`,
            status: index % 2 === 0 ? "Paid" : "Unpaid", // Replaced "Ongoing" with "Unpaid"
        }));
        setCourses(fetchedCourses);
    }, []);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <Container fluid className="p-16 d-flex" style={{ marginTop: "20px" }}>
            <main className="flex-grow-1" id="feechallandetail">
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
                            Fees Challan
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

                <Row>
                    <Col lg={12} md={12}>
                        <Row style={{ padding: "10px" }}>
                            <Col
                                style={{
                                    padding: "15px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #EAECF0",
                                    borderRadius: "12px",
                                }}
                            >
                                <header className="d-flex justify-content-between align-items-center mb-4" id="feeheader">
                                    <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Fees Challan</h2>
                                    <div className="d-flex align-items-center" id="feesearch">
                                        <Button
                                            className="d-flex align-items-center"
                                            style={{
                                                backgroundColor: "transparent",
                                                color: "#374151",
                                                border: "none",
                                                borderRadius: "8px",
                                                border: "1px solid #D1D5DB",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                marginRight: "10px",
                                                lineHeight: "24px",
                                            }}
                                        >
                                            <Image
                                                src="/assets/filter-lines1.png"
                                                alt="Sort Icon"
                                                width={20}
                                                height={20}
                                                className="me-2"
                                            />
                                            Sort
                                        </Button>
                                        <div className="position-relative me-3" style={{ flexGrow: 1 }}>
                                            <Form.Control
                                                id="search-container"
                                                type="text"
                                                placeholder="Search"
                                                style={{
                                                    borderRadius: "8px",
                                                    paddingLeft: "40px",
                                                    borderColor: "#D1D5DB",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#374151",
                                                    width: "300px",
                                                }}
                                            />
                                            <Image
                                                src="/assets/search-lg1.png"
                                                alt="Search Icon"
                                                width={20}
                                                height={20}
                                                style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)" }}
                                            />
                                        </div>
                                    </div>
                                </header>

                                <div className="table-wrapper"
                                    style={{
                                        borderRadius: "12px",
                                    }}
                                >
                                    <table
                                        className="table table-hover"
                                        style={{
                                            width: "100%",
                                            borderCollapse: "separate",
                                            borderSpacing: 0,
                                        }}
                                    >
                                        <thead
                                            style={{
                                                backgroundColor: "#F9FAFB",
                                                color: "#475467",
                                                position: "sticky",
                                                top: 0,
                                                zIndex: 1,
                                            }}
                                        >
                                            <tr>
                                                {["Sr No.", "Challan No.", "Issue Date", "Deadline", "Amount", "Status", "Actions"].map((heading, index) => (
                                                    <th
                                                        key={index}
                                                        style={{
                                                            fontWeight: "500",
                                                            fontSize: "14px",
                                                            padding: "10px",
                                                        }}
                                                    >
                                                        {heading}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody style={{ verticalAlign: 'middle', height: '100%' }}>
                                            {courses.map((course, index) => (
                                                <tr key={index}>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px', alignItems: 'center' }}>{course.srNo}</td>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px' }}>{course.challanNo}</td>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px' }}>{course.issueDate}</td>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px' }}>{course.deadline}</td>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px' }}>{course.amount}</td>
                                                    <td
                                                        style={{
                                                            padding: "10px",
                                                            fontSize: "14px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "5px",
                                                            height: '60px',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                borderRadius: "50%",
                                                                backgroundColor: course.status === "Paid" ? "green" : "red",
                                                            }}
                                                        ></span>
                                                        <span style={{ color: "#000" }}>{course.status}</span>
                                                    </td>
                                                    <td style={{ padding: "10px", fontSize: "12px", fontWeight: "400", color: "#4B5563", height: '60px' }}>
                                                        <Button
                                                            onClick={() => {
                                                                if (course.status === "Paid") {
                                                                    navigate('/slip-details', { state: { challan: course } });
                                                                } else {
                                                                    navigate('/Paywithcard', { state: { challan: course } });
                                                                }
                                                            }}
                                                            style={{
                                                                backgroundColor: "#9747FF",
                                                                color: "white",
                                                                border: "1px solid #9747FF",
                                                                borderRadius: "100px",
                                                                fontSize: "14px",
                                                                fontWeight: "500",
                                                                padding: "8px 20px",
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <style jsx>{`
  @media (max-width: 768px) {
    .table-wrapper {
      overflow-x: auto;
      width: 100%;
      margin-top: 10px;
      border-radius: 8px;
    }

    .table {
      min-width: 600px;
      border-collapse: separate;
      border-spacing: 0;
      background-color: #fff;
    }

    .table thead {
      position: sticky;
      top: 0;
      background-color: #f9fafb;
      z-index: 1;
    }

    .table th,
    .table td {
      padding: 12px 10px;
      font-size: 13px;
      white-space: nowrap;
      text-align: left;
    }

    .table th {
      font-weight: 600;
      color: #344054;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .table td {
      font-weight: 400;
      color: #4b5563;
      border-bottom: 1px solid #f1f1f1;
    }

    .table td:last-child {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .table td span {
      font-size: 13px;
    }

    .table td span:first-child {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }

  /* Modal styles removed as they're no longer needed */
`}</style>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default Coursedetails;