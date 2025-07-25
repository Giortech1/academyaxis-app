import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Image, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

function Attendence() {
    const { userData, sections } = useContext(UserContext);
    const [searchText, setSearchText] = useState("");
    const [yearOptions] = useState(["2022–2024", "2023–2025", "2024–2026", "2025–2027"]);
    const [selectedYear, setSelectedYear] = useState("2024–2026");
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (data) => {
        navigate("/AttendenceDetails", { state: { selectedData: data } });
    };

    const toggleYearDropdown = () => {
        setYearDropdownOpen(!yearDropdownOpen);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setYearDropdownOpen(false);
    };

    const filteredData = sections?.filter((data) => data.batch === selectedYear || data.section.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Attendence</h1>
                    </div>
                    <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id='info-img'
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={{
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                marginRight: '10px',

                            }}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14' }}>{userData?.first_name} {userData?.last_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.admin_id}</div>
                        </div>

                    </div>
                </header>

                {/* Filter Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px", paddingRight: "20px", width: "100%" }}>
                    <div className="d-flex align-items-center gap-2">
                        {/* All Classes Button */}
                        <div className="d-flex align-items-center" style={{ backgroundColor: "#111827", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>
                            <Image src="/assets/allclasses.png" alt="Calendar Icon" width={20} height={20} className="me-2" />
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>All Classes</span>
                        </div>

                        {/* Dynamic Year Dropdown */}
                        <div className="position-relative" style={{ minWidth: "150px" }}>
                            <div
                                onClick={toggleYearDropdown}
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#111827",
                                }}
                            >
                                {selectedYear}
                                <img
                                    src={yearDropdownOpen ? "/assets/arrow-up.png" : "/assets/arrow-down.png"}
                                    alt="Arrow"
                                    style={{ width: "12px", height: "12px", marginLeft: "8px" }}
                                />
                            </div>
                            {yearDropdownOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        backgroundColor: "white",
                                        border: "1px solid #D1D5DB",
                                        borderRadius: "8px",
                                        marginTop: "2px",
                                        zIndex: 1000,
                                    }}
                                >
                                    {yearOptions.map((year, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleYearSelect(year)}
                                            style={{
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#111827",
                                                borderBottom: index !== yearOptions.length - 1 ? "1px solid #eee" : "none",
                                            }}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
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
                                    color: "#111827",
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
                    </div>
                </header>

                <Container className="mt-4 p-0" style={{ maxWidth: '100%' }}>
                    <Row className="g-4">
                        {filteredData?.length > 0 ? (
                            filteredData.map((data) => (
                                <Col key={data?.id} xs={12} sm={6} md={4}>
                                    <Card
                                        className="p-2"
                                        style={{ borderRadius: "12px", border: "1px solid #EAECF0", cursor: "pointer" }}
                                        onClick={() => handleCardClick(data)}
                                    >
                                        <Card.Body>
                                            {/* Header with section and vertical dots */}
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="data-section">{data?.course?.name}</h5>
                                                <Image
                                                    src="/assets/dots-vertical.png"
                                                    width={16}
                                                    height={16}
                                                    alt="Options"
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>

                                            <p className="data-department">{data?.department?.name}</p>
                                            <p className="total-students">Total Students in Class</p>
                                            <h2 className="data-students">{data?.students?.length}</h2>
                                            <p className="text d-flex align-items-center" id="admission">
                                                <Image src="/assets/1.png" id="new-admission" width={20} height={20} className="me-1" alt="New Admission" />
                                                +{data?.students?.length} New Admission
                                            </p>
                                            <div className="d-flex align-items-center">
                                                {data?.students?.slice(0, 3).map((student, index) => (
                                                    <Image
                                                        key={student?.id || index}
                                                        src={student?.profile_pic}
                                                        roundedCircle
                                                        width={30}
                                                        height={30}
                                                        className="me-1"
                                                        id={index !== 0 ? "avt" : ""}
                                                    />
                                                ))}

                                                {data?.students?.length > 3 && (
                                                    <span className="total-count">
                                                        +{data?.students?.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-4 d-flex align-items-center" id="data-batch" style={{ fontSize: '12px', fontWeight: '400', color: '#1F2937', marginTop: '15px' }}>
                                                <Image src="/assets/batch.png" width={14} height={14} className="me-1" alt="Batch" />
                                                Section {data?.section}
                                            </p>
                                        </Card.Body>

                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className="text-center">No sections found for selected year.</p>
                        )}
                    </Row>
                </Container>
            </main>

            <style>
                {`
                    .data-section{ font-size:20px; font-weight:600;}
                    .data-department{ font-size:11px; font-weight:400; color:#475467;}
                    .total-students{ font-size:16px; font-weight:500; color:#101828;}
                    .data-students{ font-size:36px; font-weight:600; color:#667085;}
                    #new-admission{width:20px; height:20px;}
                    #admission{ color:#027A48; font-size:14px; font-weight:500;}
                    #avt{ margin-left:-15px;}
                    .total-count{ font-size:11px; font-weight:500; color:#475467;}
                    #data-time{ font-size:12px; font-weight:400; color:#1F2937;}
                `}
            </style>
        </Container>
    );
}

export default Attendence;
