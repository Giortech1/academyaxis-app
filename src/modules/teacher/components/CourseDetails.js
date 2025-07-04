import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form, Card, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// Coursedetails Component
function Coursedetails() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    // Dynamic data for courses (can be fetched from an API or database)
    const [courses, setCourses] = useState([]);

 

    useEffect(() => {
        const fetchedCourses = [
            {
                name: "Mathematics",
                date: "2024-01-10",
                endDate: "2024-06-10",
                hours: "40",
                marks: "85",
                grades: "A",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Physics",
                date: "2024-02-15",
                endDate: "2024-07-15",
                hours: "35",
                marks: "78",
                grades: "B",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Chemistry",
                date: "2024-03-05",
                endDate: "2024-08-05",
                hours: "50",
                marks: "90",
                grades: "A+",
                status: "Upcoming",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Biology",
                date: "2024-04-20",
                endDate: "2024-09-20",
                hours: "45",
                marks: "88",
                grades: "A",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "History",
                date: "2024-05-10",
                endDate: "2024-10-10",
                hours: "30",
                marks: "80",
                grades: "B+",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Mathematics",
                date: "2024-01-10",
                endDate: "2024-06-10",
                hours: "40",
                marks: "85",
                grades: "A",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Physics",
                date: "2024-02-15",
                endDate: "2024-07-15",
                hours: "35",
                marks: "78",
                grades: "B",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Chemistry",
                date: "2024-03-05",
                endDate: "2024-08-05",
                hours: "50",
                marks: "90",
                grades: "A+",
                status: "Upcoming",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Mathematics",
                date: "2024-01-10",
                endDate: "2024-06-10",
                hours: "40",
                marks: "85",
                grades: "A",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Physics",
                date: "2024-02-15",
                endDate: "2024-07-15",
                hours: "35",
                marks: "78",
                grades: "B",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Chemistry",
                date: "2024-03-05",
                endDate: "2024-08-05",
                hours: "50",
                marks: "90",
                grades: "A+",
                status: "Upcoming",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Biology",
                date: "2024-04-20",
                endDate: "2024-09-20",
                hours: "45",
                marks: "88",
                grades: "A",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "History",
                date: "2024-05-10",
                endDate: "2024-10-10",
                hours: "30",
                marks: "80",
                grades: "B+",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Mathematics",
                date: "2024-01-10",
                endDate: "2024-06-10",
                hours: "40",
                marks: "85",
                grades: "A",
                status: "Completed",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Physics",
                date: "2024-02-15",
                endDate: "2024-07-15",
                hours: "35",
                marks: "78",
                grades: "B",
                status: "Ongoing",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },
            {
                name: "Chemistry",
                date: "2024-03-05",
                endDate: "2024-08-05",
                hours: "50",
                marks: "90",
                grades: "A+",
                status: "Upcoming",
                avatar: "/assets/avatar.jpeg",
                userText: "24 Lectures",
            },


        ];

        setCourses(fetchedCourses);
    }, []);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <Container fluid className="p-16 d-flex" style={{marginTop:'20px'}}>
            <main className="flex-grow-1" id="coursedetailscreen">
                
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center"  id="mycourse">
                        <Image
                        id="arrow-left"
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)} // Navigate to the previous page
                        />

                        <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                            My Courses
                        </h1>
                    </div>
                    {/* Right side: User Info and Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                        id="info-img"
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
                            <div style={{ fontWeight: '500', fontSize: '14' }}>Jhon Deo</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>123456</div>
                        </div>

                    </div>
                </header>

                {/* Second Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" id="coursedetailheader">
                    {/* Left: Month and Year */}
                    <div className="d-flex align-items-center" style={{ border: '1px solid #D1D5DB', borderRadius: '8px', height: '35px', padding: '10px' }}>
                        <Image
                            src="/assets/calendar1.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>December 2024</span>
                    </div>

                    {/* Right: Search Bar with Sort Button */}
                    <div className="d-flex align-items-center" id="coursedetailsearch">
                        <div className="position-relative me-3" style={{ flexGrow: 1 }}>
                            <Form.Control
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

                {/* Content Section */}
                <Row>
                    <Col lg={12} md={12}>
                        <Row style={{ padding: "10px" }}>
                            {/* Header Section with Table Inside */}
                            <Col
                                style={{
                                    padding: "15px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #EAECF0",
                                    borderRadius: "12px",

                                }}
                            >
                                {/* Heading and Button Row */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 style={{ fontWeight: "600", fontSize: "16px", margin: 0 }}>My Courses</h5>
                                </div>

                                {/* Table Section */}
                                        <div
                                            className="responsive-table-container"
                                            style={{
                                                maxHeight: "330px",
                                                overflowY: "auto",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <table
                                                className="table table-hover my-courses-table"
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
                                                        {["Course Name", "Enrolled Date", "Total Hours", "Grades", "Status"].map((heading, index) => (
                                                            <th
                                                                key={index}
                                                                style={{
                                                                    fontWeight: "600",
                                                                    fontSize: "14px",
                                                                    padding: "10px",
                                                                }}
                                                            >
                                                                {heading}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses.map((course, index) => (
                                                        <tr key={index}>
                                                            {/* Course Name with Avatar */}
                                                            <td
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "14px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                <img
                                                                    src={course.avatar}
                                                                    alt="User Avatar"
                                                                    style={{
                                                                        width: "44px",
                                                                        height: "44px",
                                                                        borderRadius: "50%",
                                                                        marginRight: "10px",
                                                                    }}
                                                                />
                                                                <div>
                                                                    <div style={{ fontWeight: "500", fontSize: "14px" }}>{course.name}</div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: "12px",
                                                                            color: "#475467",
                                                                            fontWeight: "400",
                                                                        }}
                                                                    >
                                                                        {course.userText}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* Enrolled Date */}
                                                            <td
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "400",
                                                                    color: "#475467",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                {course.date}
                                                            </td>
                                                            {/* Total Hours */}
                                                            <td
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "400",
                                                                    color: "#475467",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                {course.hours}
                                                            </td>
                                                            {/* Grades */}
                                                            <td
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "400",
                                                                    color: "#475467",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                {course.grades}
                                                            </td>
                                                            {/* Status */}
                                                            <td
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "500",
                                                                    color: course.status === "Ongoing" ? "#6941C6" : "black",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        display: "inline-block",
                                                                        width: "8px",
                                                                        height: "8px",
                                                                        borderRadius: "50%",
                                                                        backgroundColor:
                                                                            course.status === "Ongoing"
                                                                                ? "orange"
                                                                                : course.status === "Completed"
                                                                                    ? "green"
                                                                                    : "gray",
                                                                        marginRight: "5px",
                                                                    }}
                                                                ></span>
                                                                {course.status}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Responsive Styles */}
                                        <style jsx>{`
    @media (max-width: 768px) {
      .responsive-table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
          .responsive-table-container::-webkit-scrollbar {
      display: none;
    }

    .responsive-table-container {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

      .responsive-table-container table {
        min-width: 600px;
        width: 100%;
      }

      .my-courses-header {
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 10px;
      }

      .my-courses-header h5 {
        font-size: 14px !important;
      }

      .my-courses-header a button {
        font-size: 12px !important;
      }

      .my-courses-table td,
      .my-courses-table th {
        padding: 8px !important;
        font-size: 12px !important;
      }

      .my-courses-table img {
        width: 36px !important;
        height: 36px !important;
        margin-right: 8px !important;
      }

      .my-courses-table div div:first-child {
        font-size: 13px !important;
      }

      .my-courses-table div div:last-child {
        font-size: 11px !important;
      }
    }
  `}</style>


                            </Col>
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default Coursedetails;
