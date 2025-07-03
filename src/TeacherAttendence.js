import React, { useState, useEffect } from "react";
import { Container, Button, Form, Image, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Attendence() {
    const [searchText, setSearchText] = useState("");
    const dropdownOptions = [{ label: "ICS" }, { label: "Section 1" }];
    const searchPlaceholder = "Search";
    const sortButtonText = "Sort";

    const navigate = useNavigate();

    const handleCardClick = (data) => {
        navigate("/teacher-attendance-detail", { state: { selectedData: data } });
    };

    useEffect(() => {
        // Add any data fetching logic here if necessary
    }, []);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        // Simulating fetching data from an API
        const fetchData = [
            { id: 1, section: "ICS-B", department: "Department 1", totalStudents: 36, newAdmissions: 2, time: "9:00 am - 11:00 am", duration: "2 hours" },
            { id: 2, section: "ICS-B", department: "Department 1", totalStudents: 36, newAdmissions: 2, time: "9:00 am - 11:00 am", duration: "2 hours" },
            { id: 3, section: "ICS-B", department: "Department 1", totalStudents: 36, newAdmissions: 2, time: "9:00 am - 11:00 am", duration: "2 hours" },
            { id: 4, section: "ICS-B", department: "Department 1", totalStudents: 36, newAdmissions: 2, time: "9:00 am - 11:00 am", duration: "2 hours" },
            { id: 5, section: "ICS-B", department: "Department 1", totalStudents: 36, newAdmissions: 2, time: "9:00 am - 11:00 am", duration: "2 hours" },
        ];
        setAttendanceData(fetchData);
    }, []);

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        paddingTop: "0px",
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Attendence</h1>
                    </div>

                    {/* Right side: User Info and Dropdown */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/assets/avatar.jpeg"
                            alt="User"
                            style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14" }}>Jhon Deo</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                        </div>
                        <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: "12px", height: "12px" }}
                            />
                        </button>
                    </div>
                </header>

                {/* Filter Section */}
                <header
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{ marginTop: "15px", paddingRight: "20px", width: "100%" }}
                >
                    {/* Left Side - Single Button */}
                    <div
                        className="d-flex align-items-center"
                        style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            width: "140px",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            src="/assets/menu-board2.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            All Classes
                        </span>
                    </div>

                    {/* Right Side - Search and Sort */}
                    <div className="d-flex align-items-center">
                        {/* Search Input */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "40px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #D1D5DB",
                                    width: "300px",
                                }}
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "12px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        {/* Sort Button */}
                        <Button
                            className="d-flex align-items-center"
                            style={{
                                backgroundColor: "white",
                                color: "#374151",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "8px 12px",
                            }}
                        >
                            <Image
                                src="/assets/filter-lines.png"
                                alt="Sort Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            Sort
                        </Button>
                    </div>
                </header>
                <Container className="mt-4" style={{maxWidth:'100%'}}>
                    <Row className="g-4">
                        {attendanceData.map((data) => (
                            <Col key={data.id} xs={12} sm={6} md={4}>
                                <Card
                                    className="p-2"
                                    style={{ borderRadius: "12px", border: "1px solid #EAECF0", cursor: "pointer" }}
                                    onClick={() => handleCardClick(data)}
                                >
                                    <Card.Body>
                                        <h5 className="data-section">{data.section}</h5>
                                        <p className="data-department">{data.department}</p>

                                        <p className="total-students">Total Students in Class</p>
                                        <h2 className="data-students">{data.totalStudents}</h2>

                                        <p className="text d-flex align-items-center" id="admission">
                                            <Image src="/assets/1.png" id="new-admission" width={20} height={20} className="me-1" alt="New Admission" />
                                            +{data.newAdmissions} New Admission
                                        </p>

                                        <div className="d-flex align-items-center">
                                            <Image src="/assets/Avatar3.png" roundedCircle width={30} height={30} className="me-1" />
                                            <Image src="/assets/Avatar4.png" id="avt" roundedCircle width={30} height={30} className="me-1" />
                                            <Image src="/assets/Avatar5.png" id="avt" roundedCircle width={30} height={30} className="me-1" />
                                            <span className="total-count">+31</span>
                                        </div>

                                        <p className="mt-2 d-flex align-items-center" id="data-time">
                                            <Image src="/assets/clock.png" width={14} height={14} className="me-1" alt="Time" />
                                            {data.time} ({data.duration})
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </main>
            <style>
                {`
         .data-section{
         font-size:20px;
         font-weight:600;}
         
         .data-department{
         font-size:11px;
         font-weight:400;
         color:#475467;}

         .total-students{
         font-size:16px;
         font-weight:500;
         color:#101828;}

         .data-students{
         font-size:36px;
         font-weight:600;
         color:#667085;}

         #new-admission
         {width:20px;
         height:20px;}

         #admission{
         color:#027A48;
         font-size:14px;
         font-weight:500;}

         #avt{
         margin-left:-15px;
         }

         .total-count{
         font-size:11px;
         font-weight:500;
         color:#475467;}

         #data-time
         {font-size:12px;
         font-weight:400;
         color:#1F2937;}

        `}
            </style>
        </Container>

    );
}

export default Attendence;
