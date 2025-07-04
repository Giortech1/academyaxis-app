import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AssignmentDetails() {
    const { id } = useParams();
}// Get the assignment ID from the route

function Assignments() {
    const navigate = useNavigate();



    return (
        <Container fluid className="p-0 d-flex">

            {/* Main Content */}
            <main className="flex-grow-1 p-3" id="assigndetailpage">


                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" id="">
                    {/* Heading */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} id="assignheading">
                        <Image
                            id="arrow-left"
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back"
                            onClick={() => navigate(-1)}
                            style={{ cursor: 'pointer' }}
                        />
                        <h1 style={{ fontSize: "24px", fontWeight: "600", display: 'contents' }}>Assignments</h1>
                    </div>

                    {/* User Info */}
                    <div className="d-flex align-items-center">
                        <Image
                            id="info-img"
                            src="/assets/avatar.jpeg"
                            roundedCircle
                            width={54}
                            height={54}
                            className="me-2"
                            alt="User Avatar"
                        />
                        <div className="me-2">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>John Deo</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                        </div>
                       
                    </div>
                </header>

                {/* Page Content */}
                <Row style={{ padding: '0px' }}>
                    {/* Main Assignments Section */}
                    <Col id="assignmentsdetail-screen" lg={8} md={12} style={{ borderRadius: '12px', borderColor: '#E5E7EB' }}>
                        <div className="p-0" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                            {/* Section Heading */}
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="m-0" style={{ fontSize: "16px", fontWeight: "600", padding: '8px' }}>
                                    Assignments
                                </h4>
                            </div>

                            {/* User Info Content */}
                            <div className="d-flex align-items-center" style={{ padding: '8px' }}>
                                <Image
                                    src="/assets/avatar.png"
                                    roundedCircle
                                    width={44}
                                    height={44}
                                    className="me-3"
                                    alt="User Avatar"
                                />
                                <div>
                                    <div style={{ fontSize: "14px", fontWeight: "500" }}>Demo Assignment name</div>
                                    <div style={{ fontSize: "12px", color: "#475467", fontWeight: '400' }}>
                                        Computer
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div style={{ fontSize: "12px", color: "#000", padding: '8px', fontWeight: '400' }}>
                                Welcome to the Assignments section. Here, you will find all the
                                necessary details regarding your upcoming assignments, deadlines,
                                and submission guidelines. Make sure to check this section
                                regularly to stay updated on your coursework and tasks.
                            </div>

                            {/* Instructions Section */}
                            <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
                                <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px', color: '#101828' }}>
                                    Instructions
                                </h5>
                                <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                                    Please follow the instructions below carefully.Please follow the instructions below carefully:Please follow the instructions below carefully:
                                    Please follow the instructions below carefully:Please follow the instructions below carefully:Please follow the instructions below carefully:

                                </div>

                                {/* Links Section */}
                                <div className="d-flex justify-content-start  mt-3" style={{ flexDirection: 'column' }}>
                                    <a
                                        href="#"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            color: "#1D4ED8",
                                            textDecoration: "none",
                                        }}
                                    >
                                        #demolinkassignment
                                    </a>
                                    <a
                                        href="#"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            color: "#1D4ED8",
                                            textDecoration: "none",
                                        }}
                                    >
                                        #demofilelinkassignment
                                    </a>
                                </div>
                            </div>
                            <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
                                <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px' }}>
                                    Date of Submission
                                </h5>
                                <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                                    9/20/2024

                                </div>


                            </div>
                            <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
                                <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px' }}>
                                    Teacher
                                </h5>
                                <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400', marginBottom: '10px' }}>
                                    Arslan Tariq

                                </div>


                            </div>
                        </div>
                        {/* Submit Assignment Section */}
                        <Col id="submitsection" lg={12} md={12} style={{ marginTop: "24px" }}>
                            <div className="p-3 border rounded" style={{ border: "0.5px dashed var(--Neutral-500, #6B7280)", }}>
                                {/* Section Header */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Submit Assignment</h4>
                                    {/* <Image
                                        src="/assets/dots-vertical.png"
                                        alt="Submit Assignment"
                                        style={{ width: "20px", height: "20px", borderRadius: "8px" }}
                                    /> */}
                                </div>

                                {/* File Upload Area */}
                                <div id="fileupload"
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{
                                        padding: "24px",
                                        border: "0.5px dashed var(--Neutral-500, #6B7280)",
                                        borderRadius: "12px",
                                        textAlign: "center",
                                        width: '350px',
                                        margin: 'auto',
                                    }}
                                >
                                    <Image
                                        src="/assets/plus.png"
                                        alt="Upload Icon"
                                        style={{ width: "60px", height: "60px", marginBottom: "16px", backgroundColor: '#667085', borderRadius: '100px' }}
                                    />
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#4B5563",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Drag and drop or choose a file to upload
                                    </p>
                                    <p style={{ fontSize: "11px", color: "#6B7280", marginBottom: "16px", fontWeight: '400' }}>
                                        PDF or cSV
                                    </p>

                                </div>
                            </div>
                        </Col>
                    </Col>



                    <Col id="assigndeatil-time" lg={4} md={12}>
                        <div id="assigntime-left"
                            className="border rounded p-3"
                            style={{
                                border: "1px solid #dee2e6",
                                backgroundColor: "#f8f9fa",
                                height: "720px",
                            }}
                        >
                            <h4
                                className="mb-3"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: "#343a40",
                                }}
                            >
                                Time Left
                            </h4>
                            <div
                                style={{
                                    fontSize: "14px",
                                    color: "#495057",
                                    lineHeight: "1.5",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <span style={{ display: "flex", gap: "5px", alignItems: 'center' }}>
                                        {["0", "2", ":", "0", "4", ":", "2", "2"].map(
                                            (char, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        border: char === ":" ? "none" : "1px solid #E5E7EB",
                                                        padding: char === ":" ? "0" : "4px 8px",
                                                        fontSize: "20px",
                                                        fontWeight: "600",
                                                        borderRadius: "4px",
                                                        color: "#111827",
                                                    }}
                                                >
                                                    {char}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        borderBottom: "1px solid #E5E7EB",
                                        paddingBottom: "10px",
                                        gap: '25px'
                                    }}
                                >
                                    <span
                                        style={{
                                            marginRight: "15px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: "#6c757d",
                                        }}
                                    >
                                        Days
                                    </span>
                                    <span
                                        style={{
                                            marginRight: "15px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: "#6c757d",
                                        }}
                                    >
                                        Hours
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            color: "#6c757d",
                                        }}
                                    >
                                        Seconds
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: "10px",
                                    fontSize: "12px",
                                    color: "#6c757d",
                                    lineHeight: "1.4",
                                }}
                            >
                                Stay focused and manage your time wisely. Completing tasks ahead of
                                deadlines ensures smooth progress in your coursework.
                            </div>

                            <div
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    paddingTop: "10px",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <img
                                    src="/assets/Avatar.png"
                                    alt="User Avatar"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        marginRight: "10px",
                                    }}
                                />
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <h5
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#111827",
                                            marginBottom: "0px",
                                        }}
                                    >
                                        Arslan Mushtaq
                                    </h5>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src="/assets/teacher.png"
                                            alt="User Role"
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                marginRight: "5px",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#6c757d",
                                                marginBottom: "0",
                                            }}
                                        >
                                            Teacher
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Button Section */}
                            <div
                                style={{
                                    marginTop: "20px",
                                    borderTop: "1px solid #dee2e6",
                                    paddingTop: "10px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <button
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                        width: '176px',
                                        height: '35px',
                                        padding: "10px",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "#fff",
                                        backgroundColor: "#111827",
                                        border: "none",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src="/assets/messages-3.png"
                                        alt="Button Icon"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                    Request Message
                                </button>
                            </div>
                        </div>

                    </Col>
                    <div className="col-lg-8" style={{padding:'20px', display:'flex', justifyContent:'flex-end'}}><button class="submit-button">Submit</button></div>



                </Row>
                

            </main>
            <style jsx>{`
  .submit-button {
    background-color: #9747FF; /* Vibrant purple color */
    color: white;
    border: none;
    border-radius: 50px; /* Fully rounded corners */
    padding: 10px 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: 'Arial', sans-serif;
  }

  .submit-button:hover {
    background-color: #8433E0; /* Slightly darker on hover */
  }

  .submit-button:active {
    background-color: #7020D0; /* Even darker when clicked */
    transform: translateY(1px);
  }
`}</style>
        </Container>
    );
}

export default Assignments;
