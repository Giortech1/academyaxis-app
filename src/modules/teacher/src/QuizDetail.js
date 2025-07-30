import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function AssignmentDetails() {
    const { userData } = useContext(UserContext);
    const { id } = useParams();
}// Get the assignment ID from the route

function QuizDetail() {
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
                        <h1 style={{ fontSize: "24px", fontWeight: "600", display: 'contents' }}>Quizzes</h1>
                    </div>

                    {/* User Info */}
                    <div className="d-flex align-items-center">
                        <Image
                            id="info-img"
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            roundedCircle
                            width={54}
                            height={54}
                            className="me-2"
                            alt="User Avatar"
                        />
                        <div className="me-2">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>John Deo</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.teacher_id}</div>
                        </div>
                        <Button variant="link" className="p-0">
                            <Image
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                width={12}
                                height={12}
                            />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <Row style={{ padding: '0px' }}>
                    {/* Main Assignments Section */}
                    <Col id="quizdetail-screen" lg={8} md={12} style={{ borderRadius: '12px', borderColor: '#E5E7EB' }}>
    <div className="p-0" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
        {/* Section Heading */}
        <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0" style={{ fontSize: "16px", fontWeight: "600", padding: '8px' }}>
                Quizzes
            </h4>
        </div>

        {/* Quiz Info Content */}
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
                <div style={{ fontSize: "14px", fontWeight: "500" }}>Demo Quizzes Name</div>
                <div style={{ fontSize: "12px", color: "#475467", fontWeight: '400' }}>
                    Computer
                </div>
            </div>
        </div>

        {/* Description */}
        <div style={{ fontSize: "12px", color: "#000", padding: '8px', fontWeight: '400' }}>
            This is a demo quiz by teacher for students this is a demo quiz by teacher for students
            This is a demo quiz by teacher for students this is a demo quiz by teacher for students.
        </div>

        {/* Instructions Section */}
        <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
            <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px', color: '#101828' }}>
                Instructions
            </h5>
            <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                Demo Instructions by teacher to student Demo Instructions by teacher to student
                Demo Instructions by student Demo Instructions by teacher to student
                Demo Instructions by teacher to student Demo Instructions by teacher.
            </div>

            {/* Links Section */}
            <div className="d-flex justify-content-start mt-3" style={{ flexDirection: 'column' }}>
                <a
                    href="#"
                    style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#1D4ED8",
                        textDecoration: "none",
                    }}
                >
                    #demolinkquiz
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
                    #demofilelinkquiz
                </a>
            </div>
        </div>

        {/* Date of Submission */}
        <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
            <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px' }}>
                Date of Submission
            </h5>
            <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                9/20/2024
            </div>
        </div>

        {/* Teacher Name */}
        <div style={{ borderTop: '1px solid #E5E7EB', marginTop: '16px', paddingLeft: '8px' }}>
            <h5 style={{ fontSize: "14px", fontWeight: "500", marginTop: '8px', marginBottom: '8px' }}>
                Teacher
            </h5>
            <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400', marginBottom: '10px' }}>
                Arslan Tariq
            </div>
        </div>
    </div>

    {/* Attempt Button OUTSIDE the box */}
    <div className="d-flex justify-content-end mt-2" style={{ padding: '8px' }}>
        <Button
            style={{
                backgroundColor: '#9747FF',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '100px',
                padding: '6px 16px',
                border: 'none',
            }}
        >
            Attempt
        </Button>
    </div>
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
                </Row>
            </main>
        </Container>
    );
}

export default QuizDetail;
