import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Coursedetails() {
    const { userData } = useContext(UserContext);
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

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
            status: index % 2 === 0 ? "Paid" : "Unpaid",
        }));
        setCourses(fetchedCourses);
    }, []);


    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <Container fluid className="p-16 d-flex" style={{ marginTop: "20px" }}>
            <main className="flex-grow-1" id="feechallandetail">
                {/* {isMobile && (
                    <Button
                        onClick={toggleSidebar}
                        className="mb-3"
                        style={{
                            backgroundColor: "#101828",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                    </Button>
                )} */}

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
                           src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: "54px", height: "54px" }}
                        />
                        <div className="me-0">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>{userData?.full_name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.admin_id}</div>
                        </div>
                        {/* <button className="bg-transparent border-0">
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: "12px", height: "12px", verticalAlign:'top' }}
                            />
                        </button> */}
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
                    {["Sr No.", "Challan No.", "Issue Date", "Deadline", "Amount", "Status"].map((heading, index) => (
                        <th
                            key={index}
                            style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                padding: "10px",
                                color: '#111827'
                            }}
                        >
                            {heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody style={{ verticalAlign: 'middle', height: '100%' }}>
                {courses.map((course, index) => (
                    <tr
                        key={index}
                        onClick={() => {
                            if (course.status === "Unpaid") {
                                navigate("/paywithcard"); // navigate to PayWithCard page
                            }
                        }}
                        style={{
                            cursor: course.status === "Unpaid" ? "pointer" : "default", // show pointer only if clickable
                        }}
                    >
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
    //   box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
