import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Image } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext.js';



ChartJS.register(ArcElement, Tooltip, Legend);

const Grades = () => {
          const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  const semesterData = [
    { id: 1, name: "Semester 1", date: "25-Sep-2024", status: "Passed" },
    { id: 2, name: "Semester 2", date: "18-Jul-2024", status: "Failed" },
    { id: 3, name: "Semester 3", date: "18-Jun-2024", status: "Passed" },
    { id: 4, name: "Semester 4", date: "19-Feb-2024", status: "Failed" },
    { id: 5, name: "Semester 5", date: "12-Jan-2024", status: "Passed" },
    { id: 6, name: "Semester 6", date: "12-Jan-2024", status: "Passed" },
  ];

  const getStatusDot = (status) => {
    const color = status === "Passed" ? "#16A34A" : "#DC2626"; // Green for Passed, Red for Failed
    return (
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          backgroundColor: color,
          borderRadius: "50%",
          marginRight: "8px",
        }}
      ></span>
    );
  };

  const chartData = {
    labels: ["Tests", "Assignments", "Others"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#16A34A", "#3B82F6", "#A855F7"],
        hoverBackgroundColor: ["#15803D", "#2563EB", "#9333EA"],
      },
    ],
  };

  return (
    <Container fluid className="p-3" id="gradescontainer">
      {/* Header */}
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center" id="gradesheading">
          <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>Grades</h1>
        </div>
        {/* Right side: User Info and Dropdown */}
      <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id='info-img'
                            src="/assets/avatar.jpeg" // Replace with your image path
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
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.user_id}</div>
                        </div>

                    </div>
      </header>
      <header className="d-flex justify-content-between align-items-center mb-4" id="gradesheader">
        {/* Left: Month and Year */}
        <div className="d-flex align-items-center" style={{ border: '1px solid #D1D5DB', borderRadius: '8px', height: '35px', padding: '10px' }}>
          <Image
            src="/assets/book-saved.png"
            alt="Calendar Icon"
            width={20}
            height={20}
            className="me-2"
          />
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Smester 7 Result</span>
        </div>

        {/* Right: Search Bar with Sort Button */}
        <div className="d-flex align-items-center" id="gradesearch">
          <div className="position-relative me-3" style={{ flexGrow: 1 }}>
            <Form.Control
              id="gradeformsearch"
              type="text"
              placeholder="Search"
              style={{ borderRadius: "8px", paddingLeft: "40px", fontSize: '16px', fontWeight: '400', color: '#98A2B3', borderColor: '#D1D5DB', width: '300px' }}
            />
            <Image
              src="/assets/search-lg1.png"
              alt="Search Icon"
              width={20}
              height={20}
              style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)" }}
            />
          </div>

          <Button
            className="d-flex align-items-center"
            style={{
              backgroundColor: "transparent",
              color: "#374151",
              border: "none",
              borderRadius: "8px",
              border: '1px solid #D1D5DB',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            <Image
              src="/assets/filter-lines1.png"
              alt="Sort Icon"
              width={16}
              height={16}
              className="me-2"
            />
            Sort
          </Button>
        </div>
      </header>
      <Row id="graderow">
        {/* Overview Section */}
        <Col lg={8} className="position-relative">
          <Card className="p-4  position-relative" id="grademetrics" style={{ overflow: "hidden", border: '1px solid #EAECF0', borderRadius: '16px', minHeight: '279px', justifyContent: 'center' }}>
            {/* Inner Plus-Like Borders */}
            {/* Horizontal Lines */}



            <Row className="gx-0 gy-0">
              {/* Metrics Section */}
              <Col lg={8} className="position-relative" >
                <Row className="gx-4 gy-4">
                  {/* Current Semester */}
                  <div id="responsive">
                    <Col md={6} className="d-flex align-items-center p-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "rgba(255, 140, 0, 0.1)", // Light Orange
                        }}
                      >
                        <Image src="/assets/menu-board.png" alt="Semester Icon" width={32} height={32} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: "24px", fontWeight: '600' }}>
                          7<sup>th</sup>
                        </h5>
                        <p className="text-muted mb-0" style={{ fontSize: "12px", fontWeight: '500', color: '#475467' }}>
                          Current Semester
                        </p>
                      </div>

                    </Col>


                    {/* Current GPA */}
                    <Col md={6} className="d-flex align-items-center p-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "rgba(34, 197, 94, 0.1)", // Light Green
                        }}
                      >
                        <Image src="/assets/trend-up.png" alt="GPA Icon" width={32} height={32} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: "24px", fontWeight: '600' }}>4.1</h5>
                        <p className="text-muted mb-0" style={{ fontSize: "12px", fontWeight: '500', color: '#475467' }}>
                          Current GPA
                        </p>
                      </div>
                    </Col>

                  </div>




                  {/* Grade */}
                  <div id="responsive">
                    <Col md={6} className="d-flex align-items-center p-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "rgba(139, 92, 246, 0.1)", // Light Purple
                        }}
                      >
                        <Image src="/assets/book1.png" alt="Grade Icon" width={32} height={32} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: "24px", fontWeight: '600' }}>B+</h5>
                        <p className="text-muted mb-0" style={{ fontSize: "12px", fontWeight: '500', color: '#475467' }}>
                          Grade
                        </p>
                      </div>
                    </Col>

                    {/* Percentage */}
                    <Col md={6} className="d-flex align-items-center p-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "rgba(59, 130, 246, 0.1)", // Light Blue
                        }}
                      >
                        <Image src="/assets/teacher5.png" alt="Percentage Icon" width={32} height={32} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: "24px", fontWeight: '600' }}>79.6</h5>
                        <p className="text-muted mb-0" style={{ fontSize: "12px", fontWeight: '500', color: '#475467' }}>
                          Percentage
                        </p>
                      </div>
                    </Col>

                  </div>
                </Row>
              </Col>

              {/* Download Section */}
              <Col lg={4} className="d-flex align-items-center justify-content-center p-4">
                <div className="text-center">
                  <h5 className="fw-bold mb-3" style={{ fontSize: "16px", fontWeight: '500', display: 'flex' }}>
                    Download Result
                  </h5>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "rgba(168, 85, 247, 0.1)", // Light Purple
                      }}
                    >
                      <Image src="/assets/file-04.png" alt="PDF Icon" width={32} height={32} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ fontSize: "14px", fontWeight: '500', color: '#101828' }}>
                        Test Marksheet
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: "12px", display: 'flex', fontWeight: '400', color: '#475467' }}>
                        PDF File
                      </p>
                    </div>
                    <Image src="/assets/import.png" style={{ marginLeft: '20px' }} alt="PDF Icon" width={32} height={32} />

                  </div>
                  <td>
                    <Button
                      variant="light"
                      style={{ borderRadius: "12px", height: "36px", backgroundColor: '#F6F7F9', width: '150px' }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/SubGrades"); // Navigate to Feechallandetail
                        }}
                        style={{
                          textDecoration: "none",
                          fontSize: "14px",
                          color: "#475467",
                          fontWeight: "500",

                        }}
                      >
                        View Marks
                      </a>
                    </Button>
                  </td>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* GPA Chart */}
        <Col lg={4} md={6} sm={12}>
          <Card className="p-4  text-center " style={{ border: '1px solid #EAECF0', borderRadius: '12px' }}>
            <h5 className="fw-bold text-start mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>Semester 7</h5>
            <div
              className="d-flex justify-content-center align-items-center position-relative mx-auto"
              style={{
                maxWidth: "100%", // Restrict max width for responsiveness
                height: "130px",
                width: "100%", // Allow the chart to scale
              }}
            >
              <Pie
                data={{
                  labels: ["Test", "Assignments", "Other"],
                  datasets: [
                    {
                      data: [30, 50, 20],
                      backgroundColor: ["#0077D9", "#06B6D4", "#00CED9"],
                      fontSize: '14px',
                      fontWeight: '400',
                      borderWidth: 0,
                      cutout: "50%",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      enabled: true,
                    },
                    legend: {
                      display: true,
                      position: "right",
                      align: "center",
                      labels: {
                        boxWidth: 8,
                        boxHeight: 8,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20,
                        font: {
                          size: 12,
                          family: "Arial",
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <hr style={{ border: '1px solid grey' }} />
            <div className="d-flex justify-content-between align-items-center px-3">
              <p className="fw-bold mb-0" style={{ fontSize: '16px', fontWeight: '600' }}>Total GPA</p>
              <p
                className="fw-bold text-success mb-0"
                style={{ fontSize: "18px", fontWeight: '600', color: '#22C55E' }}
              >
                4.1
              </p>
            </div>
          </Card>
        </Col>



      </Row>

      {/* Grades Table */}
      {/* Grades Table */}
      <Row className="mt-4">
        <Col lg={12}>
          <Card className="p-4" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
            <h5 className="fw-bold mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>Grades</h5>
            <Table responsive className="table-borderless">
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ textAlign: "left", paddingLeft: "10px", fontSize: '16px', fontWeight: '600' }}>Sr No.</th>
                  <th style={{ textAlign: "left", fontSize: '16px', fontWeight: '600' }}>Name</th>
                  <th style={{ textAlign: "left", fontSize: '16px', fontWeight: '600' }}>Date</th>
                  <th style={{ textAlign: "left", fontSize: '16px', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: "left", fontSize: '16px', fontWeight: '600' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {semesterData.map((semester) => (
                  <tr
                    key={semester.id}
                    style={{ borderBottom: "1px solid #E5E7EB" }}
                  >
                    <td style={{ paddingLeft: "10px", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{semester.id}</td>
                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{semester.name}</td>
                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{semester.date}</td>
                    <td>
                      {getStatusDot(semester.status)}
                      <span
                        className="fw-normal"
                        style={{
                          fontSize: "12px",
                          color: "#000", // Set text color to black
                        }}
                      >
                        {semester.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="light"
                        style={{ borderRadius: "12px", width: "90px", height: "36px" }}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/SubGrades"); // Navigate to Feechallandetail
                          }}
                          style={{
                            textDecoration: "none",
                            fontSize: "14px",
                            color: "#475467",
                            fontWeight: "500",

                          }}
                        >
                          View
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <style jsx>{`
  @media (max-width: 768px) {
    .table-wrapper {
      overflow-x: auto;
      width: 100%;
      margin-top: 12px;
      border-radius: 8px;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    }

    .table-borderless {
      min-width: 600px;
      background-color: #fff;
      border-collapse: separate;
      border-spacing: 0;
    }

    .table-borderless thead {
      background-color: #f9fafb;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .table-borderless th,
    .table-borderless td {
      padding: 12px 10px;
      font-size: 13px;
      text-align: left;
      white-space: nowrap;
    }

    .table-borderless th {
      font-weight: 600;
      color: #1f2937;
      border-bottom: 1px solid #e5e7eb;
    }

    .table-borderless td {
      font-weight: 400;
      color: #4b5563;
      border-bottom: 1px solid #f3f4f6;
    }

    .table-borderless td span {
      font-size: 12px;
    }

    .table-borderless a {
      font-size: 13px;
      font-weight: 500;
      color: #475467;
      text-decoration: none;
    }

    .table-borderless button {
      width: 90px;
      height: 36px;
      border-radius: 12px;
      font-size: 13px;
    }
  }
`}</style>


        </Col>
      </Row>


    </Container>
  );
};

export default Grades;
