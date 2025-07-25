import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Button, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function CourseRoadmap() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedSemester, setSelectedSemester] = useState("Semester 1");
    const [program, setProgram] = useState("Bachelor of Science in Computer Science");
    const [courses, setCourses] = useState([]);

    // Fetch course data on component mount
    useEffect(() => {
        // This would typically be an API call
        const fetchedCourses = [
            // Semester 1 courses
            {
                name: "Introduction to AI",
                courseId: "AI101",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 1"
            },
            {
                name: "English Literature",
                courseId: "ENG101",
                type: "Elective",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 1"
            },
            {
                name: "Programming Basics",
                courseId: "CS101",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 1"
            },
            {
                name: "Calculus I",
                courseId: "MTH101",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 1"
            },
            {
                name: "Computer Ethics",
                courseId: "CS105",
                type: "Required",
                creditHour: "2",
                department: "Computer Science",
                semester: "Semester 1"
            },

            // Semester 2 courses
            {
                name: "Data Structures",
                courseId: "CS201",
                type: "Required",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 2"
            },
            {
                name: "Web Development",
                courseId: "CS203",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 2"
            },
            {
                name: "Digital Logic Design",
                courseId: "CS205",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 2"
            },
            {
                name: "Calculus II",
                courseId: "MTH201",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 2"
            },

            // Semester 3 courses
            {
                name: "Object-Oriented Programming",
                courseId: "CS301",
                type: "Required",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 3"
            },
            {
                name: "Database Systems",
                courseId: "CS303",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 3"
            },
            {
                name: "Computer Architecture",
                courseId: "CS305",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 3"
            },
            {
                name: "Linear Algebra",
                courseId: "MTH301",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 3"
            },

            // Semester 4 courses
            {
                name: "Operating Systems",
                courseId: "CS401",
                type: "Required",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 4"
            },
            {
                name: "Computer Networks",
                courseId: "CS403",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 4"
            },
            {
                name: "Software Engineering",
                courseId: "CS405",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 4"
            },
            {
                name: "Probability and Statistics",
                courseId: "MTH401",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 4"
            },

            // Semester 5 courses
            {
                name: "Algorithms Analysis",
                courseId: "CS501",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 5"
            },
            {
                name: "Artificial Intelligence",
                courseId: "CS503",
                type: "Required",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 5"
            },
            {
                name: "Human-Computer Interaction",
                courseId: "CS505",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 5"
            },
            {
                name: "Theory of Computation",
                courseId: "CS507",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 5"
            },

            // Semester 6 courses
            {
                name: "Compiler Design",
                courseId: "CS601",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 6"
            },
            {
                name: "Machine Learning",
                courseId: "CS603",
                type: "Elective",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 6"
            },
            {
                name: "Computer Graphics",
                courseId: "CS605",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 6"
            },
            {
                name: "Information Security",
                courseId: "CS607",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 6"
            },

            // Semester 7 courses
            {
                name: "Parallel Computing",
                courseId: "CS701",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 7"
            },
            {
                name: "Deep Learning",
                courseId: "CS703",
                type: "Elective",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 7"
            },
            {
                name: "Senior Project I",
                courseId: "CS705",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 7"
            },
            {
                name: "Cloud Computing",
                courseId: "CS707",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 7"
            },

            // Semester 8 courses
            {
                name: "Senior Project II",
                courseId: "CS801",
                type: "Required",
                creditHour: "4",
                department: "Computer Science",
                semester: "Semester 8"
            },
            {
                name: "Distributed Systems",
                courseId: "CS803",
                type: "Required",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 8"
            },
            {
                name: "Natural Language Processing",
                courseId: "CS805",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 8"
            },
            {
                name: "Ethical Hacking",
                courseId: "CS807",
                type: "Elective",
                creditHour: "3",
                department: "Computer Science",
                semester: "Semester 8"
            }
        ];

        setCourses(fetchedCourses);
    }, []);

    // Filter courses based on selected semester
    const filteredCourses = courses.filter(course =>
        course.semester === selectedSemester
    );

    return (
        <Container fluid className="p-3">
            <div className="course-roadmap-container">
                {/* Header with Title and User Profile */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="course-roadmap-title">Academic Calendar</h1>

                    <div className="user-profile">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-user" className="user-dropdown">
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                        roundedCircle
                                        width={54}
                                        height={54}
                                        className="me-2"
                                    />
                                    <div className="user-info">
                                        <div className="user-name">{userData?.full_name}</div>
                                        <div className="user-id">{userData?.student_id}</div>
                                    </div>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                                <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                                <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* Program Selection */}
                <div className="program-selection mb-4">
                    <label className="program-label">Program</label>
                    <div className="program-value">{program}</div>
                </div>

                {/* Semester Selector */}
                <div className="semester-dropdown mb-4">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-semester" className="semester-toggle">
                            {selectedSemester} <i className="arrow-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 1")}>Semester 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 2")}>Semester 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 3")}>Semester 3</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 4")}>Semester 4</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 5")}>Semester 5</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 6")}>Semester 6</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 7")}>Semester 7</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedSemester("Semester 8")}>Semester 8</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Course Table */}
                <div className="course-table-container">
                    <table className="course-table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course ID</th>
                                <th>Course Type</th>
                                <th>Credit Hour</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.map((course, index) => (
                                <tr key={index} className={index === filteredCourses.length - 1 ? 'last-row' : ''}>
                                    <td style={{ fontSize: '14px', fontWeight: '500', color: '#101828' }}>{course.name}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.courseId}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                                        {course.type}
                                    </td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.creditHour}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CSS Styles */}
            <style jsx>{`
                .course-roadmap-container {
                   
                    background-color: #fff;
                }
                    .dropdown-toggle::after {
    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
    display:none;
}
                
                .course-roadmap-title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #000;
                    margin: 0;
                }
                
                .user-dropdown {
                    background: none;
                    border: none;
                    padding: 0;
                }
                
                .user-dropdown::after {
                    display: none;
                }
                
                .user-info {
                    display: flex;
                    flex-direction: column;
                }
                
                .user-name {
                    font-size: 14px;
                    font-weight: 500;
                    color:#1F2937;
                }
                
                .user-id {
                    font-size: 12px;
                    color: #9CA3AF;
                    font-weight:400;
                    display:flex;
                }
                
                .program-selection {
                    background-color: #F2F4F7;
                    padding: 12px 16px;
                    border-radius: 8px;
                    width:fit-content;
                }
                
                .program-label {
                    display: block;
                    font-size: 12px;
                    font-weight:500;
                    color: #475467;
                    margin-bottom: 4px;
                }
                
                .program-value {
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .semester-toggle {
                    display: flex;
                    align-items: center;
                    background-color: #fff;
                    border: 1px solid #EAECF0;
                    border-radius: 8px;
                    padding: 8px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    color:#101828;
                }
                
                .arrow-down {
                    border: solid #000;
                    border-width: 0 1px 1px 0;
                    display: inline-block;
                    padding: 3px;
                    margin-left: 8px;
                    transform: rotate(45deg);
                }
                
                .course-table-container {
                    overflow-x: auto;
                }
                
                .course-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    border:1px solid #EAECF0;
                    border-radius:22px;
                }
                
                .course-table th {
                    // background-color: #f8f9fa;
                    color: #101828;
                    font-weight: 500;
                    font-size: 16px;
                    text-align: left;
                    padding: 16px;
                    border-bottom: 1px solid #dee2e6;
                }
                
                .course-table td {
                    padding: 16px;
                    font-size: 14px;
                    border-bottom: 1px solid #dee2e6;
                    color: #212529;
                }
                
                .course-table tr.last-row td {
                    border-bottom: none;
                }
                
                .course-type {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                
                .course-type.required {
                    background-color: #e6f7ff;
                    color: #1890ff;
                }
                
                .course-type.elective {
                    background-color: #f6ffed;
                    color: #52c41a;
                }
                
                @media (max-width: 768px) {
                    .course-table th, 
                    .course-table td {
                        padding: 10px;
                        font-size: 12px;
                    }
                    
                    .course-roadmap-title {
                        font-size: 20px;
                    }
                    
                    .user-name {
                        font-size: 12px;
                    }
                    
                    .user-id {
                        font-size: 10px;
                    }
                }
            `}</style>
        </Container>
    );
}

export default CourseRoadmap;