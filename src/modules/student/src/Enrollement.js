import React, { useContext, useState } from "react";
import { Container, Table, Image, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

function Enrollment() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([
        {
            id: 1,
            courseID: 'AI101',
            name: 'Introduction to AI',
            enrolled: '25/6/2024',
            hours: 60,
            enrolledStatus: false,
            instructor: "Kevin Jone",
            schedule: "Mon/Wed 10–11:30 AM",
            creditHours: 3,
            status: "Not Enrolled"
        },
        {
            id: 2,
            courseID: 'ENG205',
            name: 'English Literature',
            enrolled: '25/6/2024',
            hours: 45,
            enrolledStatus: true,
            instructor: "Jane Austen",
            schedule: "Tue/Thu 2–3:30 PM",
            creditHours: 3,
            status: "Enrolled"
        },
        {
            id: 3,
            courseID: 'CS110',
            name: 'Programming Basics',
            enrolled: '25/6/2024',
            hours: 45,
            enrolledStatus: false,
            instructor: "Dr. Smith",
            schedule: "Fri 10–12 PM",
            creditHours: 4,
            status: "Not Enrolled"
        }
    ]);

    const handleEnroll = (id) => {
        setCourses(prev =>
            prev.map(course =>
                course.id === id
                    ? { ...course, enrolledStatus: true, status: "Enrolled" }
                    : course
            )
        );
    };

    return (
        <Container fluid className="p-3">
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center" id="calenderheading">
                    {/* <Image
                        id="arrow-left"
                        src="/assets/arrow-left.png"
                        roundedCircle
                        width={24}
                        height={24}
                        className="me-2"
                        alt="Back Arrow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                        My Course
                    </h1> */}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        id="info-img"
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
                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{userData?.full_name}</div>
                        <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.student_id}</div>
                    </div>
                </div>
            </header>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center border rounded px-3 py-2" style={{ height: '40px' }}>
                    <Image src="/assets/calendar1.png" alt="Calendar Icon" width={20} height={20} className="me-2" />
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>December 2024</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            style={{ paddingLeft: "40px", borderRadius: '8px', width: '250px' }}
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
                        style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            backgroundColor: "white",
                            color: "#374151",
                            fontWeight: "600"
                        }}
                    >
                        <Image src="/assets/filter-lines1.png" width={16} height={16} className="me-2" />
                        Sort
                    </Button>
                </div>
            </header>

            {/* Title */}
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#101828', marginBottom: '40px' }}>Enrollment</h2>

            {/* Table */}
            <div className="table-responsive">
                <Table borderless className="align-middle">
                    <thead style={{ fontSize: '16px', fontWeight: '500', color: '#111827' }}>
                        <tr>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Enrolled Date</th>
                            <th>Total Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '14px' }}>
                        {courses.map((course) => (
                            <tr key={course.id} className="border-top">
                                <td style={{ fontSize: '14px', fontWeight: '500', color: '#101828' }}>{course.name}</td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.courseID}</td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.enrolled}</td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.hours}</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        onClick={() => handleEnroll(course.id)}
                                        style={{
                                            backgroundColor: course.enrolledStatus ? '#3CCB7F' : 'white',
                                            border: '1px solid #3CCB7F',
                                            color: course.enrolledStatus ? 'white' : '#3CCB7F',
                                            fontWeight: '500',
                                            padding: '8px 12px',
                                            fontSize: '14px',
                                            borderRadius: '999px',
                                            width: '90px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        disabled={course.enrolledStatus}
                                    >
                                        {course.enrolledStatus ? 'Enrolled' : 'Enroll'}
                                    </Button>


                                    <Button
                                        onClick={() => navigate('/enrollementcourse', { state: { course } })}
                                        style={{
                                            backgroundColor: '#8A5CF6',
                                            border: 'none',
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '8px 12px',
                                            fontSize: '14px',
                                            borderRadius: '999px',
                                            width: '90px'
                                        }}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default Enrollment;
