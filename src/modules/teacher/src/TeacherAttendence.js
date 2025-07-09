import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Image, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Attendance() {
    const { userData, sections } = useContext(UserContext);
    const [searchText, setSearchText] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    const navigate = useNavigate();

    const handleCardClick = (data) => {
        navigate("/teacher-attendance-detail", { state: { selectedData: data } });
    };

    // Function to convert 24-hour time to 12-hour format
    const convertTo12Hour = (time24) => {
        if (!time24) return "N/A";
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
    };

    // Function to calculate duration between start and end time
    const calculateDuration = (startTime, endTime) => {
        if (!startTime || !endTime) return "N/A";
        const start = new Date(`2000-01-01 ${startTime}`);
        const end = new Date(`2000-01-01 ${endTime}`);
        const diffMs = end - start;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHours === 1 && diffMinutes === 0) {
            return "1 hour";
        } else if (diffHours > 1 && diffMinutes === 0) {
            return `${diffHours} hours`;
        } else if (diffHours === 0) {
            return `${diffMinutes} minutes`;
        } else {
            return `${diffHours}h ${diffMinutes}m`;
        }
    };

    // Function to convert sections data to attendance format
    const convertSectionsToAttendance = () => {
        if (!sections || sections.length === 0) {
            return [];
        }

        return sections.map((section, index) => {
            const teacher = section.teachers && section.teachers.length > 0 ? section.teachers[0] : null;
            const studentsCount = section.students ? section.students.length : 0;
            
            // Calculate new admissions (students created in last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const newAdmissions = section.students ? section.students.filter(student => {
                if (student.createdAt) {
                    const studentCreatedDate = new Date(student.createdAt);
                    return studentCreatedDate >= thirtyDaysAgo;
                }
                return false;
            }).length : 0;

            // Format time range
            const startTime = section.schedule?.start_time;
            const endTime = section.schedule?.end_time;
            const timeRange = startTime && endTime 
                ? `${convertTo12Hour(startTime)} - ${convertTo12Hour(endTime)}`
                : "No schedule";
            
            const duration = calculateDuration(startTime, endTime);

            // Generate random avatars for display (in real app, these would be student photos)
            const avatars = [
                "/assets/Avatar3.png",
                "/assets/Avatar4.png", 
                "/assets/Avatar5.png",
                "/assets/avatar.jpeg"
            ];

            return {
                id: section.id || `section-${index + 1}`,
                section: `${section.course_name} - ${section.section}`,
                department: section.department,
                totalStudents: studentsCount,
                newAdmissions: newAdmissions,
                time: timeRange,
                duration: duration,
                teacher: teacher,
                students: section.students || [],
                schedule: section.schedule,
                roomNo: section.room_no,
                avatars: avatars,
                courseName: section.course_name,
                sectionLetter: section.section
            };
        });
    };

    // Filter data based on search text
    const filterData = (data, searchQuery) => {
        if (!searchQuery.trim()) {
            return data;
        }
        
        const query = searchQuery.toLowerCase();
        return data.filter(item => 
            item.section.toLowerCase().includes(query) ||
            item.department.toLowerCase().includes(query) ||
            item.courseName?.toLowerCase().includes(query) ||
            (item.teacher && `${item.teacher.first_name} ${item.teacher.last_name}`.toLowerCase().includes(query))
        );
    };

    // Convert sections data when component mounts or sections change
    useEffect(() => {
        const convertedData = convertSectionsToAttendance();
        setAttendanceData(convertedData);
        setFilteredData(convertedData);
    }, [sections]);

    // Filter data when search text changes
    useEffect(() => {
        const filtered = filterData(attendanceData, searchText);
        setFilteredData(filtered);
    }, [searchText, attendanceData]);

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header className="main-header">
                    <div className="header-left">
                        <h1 className="page-title">Attendance</h1>
                    </div>

                    {/* Right side: User Info and Dropdown */}
                    <div className="header-right">
                        <img
                            src="/assets/avatar.jpeg"
                            alt="User"
                            className="user-avatar"
                        />
                        <div className="user-info">
                            <div className="user-name">
                                {userData?.first_name && userData?.last_name 
                                    ? `${userData.first_name} ${userData.last_name}` 
                                    : "John Doe"}
                            </div>
                            <div className="user-id">
                                {userData?.teacher_id || userData?.student_id || "123456"}
                            </div>
                        </div>
                        <button className="dropdown-btn">
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                className="dropdown-arrow"
                            />
                        </button>
                    </div>
                </header>

                {/* Filter Section */}
                <header className="filter-header">
                    {/* Left Side - All Classes Button */}
                    <div className="all-classes-btn">
                        <Image
                            src="/assets/menu-board2.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span>All Classes</span>
                    </div>

                    {/* Right Side - Search and Sort */}
                    <div className="search-sort-container">
                        {/* Search Input */}
                        <div className="search-wrapper">
                            <Form.Control
                                type="text"
                                placeholder="Search by class, department, or teacher"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="search-input"
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                className="search-icon"
                            />
                        </div>

                        {/* Sort Button */}
                        <Button className="sort-btn">
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

                <Container className="cards-container">
                    {filteredData.length === 0 ? (
                        <div className="no-results">
                            <p>
                                {searchText ? 
                                    `No classes found matching "${searchText}"` : 
                                    "No classes available"
                                }
                            </p>
                        </div>
                    ) : (
                        <Row className="g-4">
                            {filteredData.map((data) => (
                                <Col key={data.id} xs={12} sm={6} md={4}>
                                    <Card
                                        className="attendance-card"
                                        onClick={() => handleCardClick(data)}
                                    >
                                        <Card.Body>
                                            <h5 className="section-title">{data.section}</h5>
                                            <p className="department-text">{data.department}</p>
                                            {data.roomNo && (
                                                <p className="room-text">Room: {data.roomNo}</p>
                                            )}

                                            <p className="students-label">Total Students in Class</p>
                                            <h2 className="students-count">{data.totalStudents}</h2>

                                            {data.newAdmissions > 0 && (
                                                <p className="new-admissions">
                                                    <Image 
                                                        src="/assets/1.png" 
                                                        width={20} 
                                                        height={20} 
                                                        className="me-1" 
                                                        alt="New Admission" 
                                                    />
                                                    +{data.newAdmissions} New Admission
                                                    {data.newAdmissions > 1 ? 's' : ''}
                                                </p>
                                            )}

                                            {data.totalStudents > 0 && (
                                                <div className="avatars-container">
                                                    {data.avatars.slice(0, 3).map((avatar, index) => (
                                                        <Image 
                                                            key={index}
                                                            src={avatar} 
                                                            roundedCircle 
                                                            width={30} 
                                                            height={30} 
                                                            className={`avatar ${index > 0 ? 'overlapped' : ''}`}
                                                        />
                                                    ))}
                                                    {data.totalStudents > 3 && (
                                                        <span className="remaining-count">
                                                            +{data.totalStudents - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {data.teacher && (
                                                <p className="teacher-info">
                                                    <Image 
                                                        src="/assets/teacher.png" 
                                                        width={14} 
                                                        height={14} 
                                                        className="me-1" 
                                                        alt="Teacher" 
                                                    />
                                                    {data.teacher.first_name} {data.teacher.last_name}
                                                </p>
                                            )}

                                            <p className="schedule-time">
                                                <Image 
                                                    src="/assets/clock.png" 
                                                    width={14} 
                                                    height={14} 
                                                    className="me-1" 
                                                    alt="Time" 
                                                />
                                                {data.time} 
                                                {data.duration !== "N/A" && ` (${data.duration})`}
                                            </p>

                                            {data.schedule?.days && (
                                                <p className="schedule-days">
                                                    <Image 
                                                        src="/assets/calendar.png" 
                                                        width={14} 
                                                        height={14} 
                                                        className="me-1" 
                                                        alt="Days" 
                                                    />
                                                    {data.schedule.days.join(', ')}
                                                </p>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </main>
            
            <AttendanceStyles />
        </Container>
    );
}

// Separated Styles Component
const AttendanceStyles = () => (
    <style>
        {`
        /* Main Header Styles */
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            padding-top: 0px;
            width: 100%;
        }

        .header-left {
            display: flex;
            align-items: center;
        }

        .page-title {
            font-size: 24px;
            margin: 0;
            font-weight: 600;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

        .user-avatar {
            border-radius: 50%;
            width: 54px;
            height: 54px;
            margin-right: 10px;
            object-fit: cover;
        }

        .user-info {
            margin-right: 10px;
        }

        .user-name {
            font-weight: 500;
            font-size: 14px;
        }

        .user-id {
            font-size: 12px;
            color: #6c757d;
        }

        .dropdown-btn {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        .dropdown-arrow {
            width: 12px;
            height: 12px;
        }

        /* Filter Header Styles */
        .filter-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding-right: 20px;
            width: 100%;
            margin-bottom: 1rem;
        }

        .all-classes-btn {
            display: flex;
            align-items: center;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            background-color: white;
            width: 140px;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            transition: background-color 0.2s ease;
        }

        .all-classes-btn:hover {
            background-color: #f9fafb;
        }

        .search-sort-container {
            display: flex;
            align-items: center;
        }

        .search-wrapper {
            position: relative;
            margin-right: 1rem;
        }

        .search-input {
            border-radius: 8px !important;
            padding-left: 40px !important;
            font-size: 14px !important;
            font-weight: 400 !important;
            color: #98A2B3 !important;
            border: 1px solid #D1D5DB !important;
            width: 300px !important;
        }

        .search-input:focus {
            border-color: #7C3AED !important;
            box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25) !important;
        }

        .search-icon {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
        }

        .sort-btn {
            display: flex !important;
            align-items: center !important;
            background-color: white !important;
            color: #374151 !important;
            border: 1px solid #D1D5DB !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            padding: 8px 12px !important;
            transition: background-color 0.2s ease !important;
        }

        .sort-btn:hover {
            background-color: #f9fafb !important;
        }

        /* Cards Container */
        .cards-container {
            margin-top: 1rem;
            max-width: 100%;
        }

        .no-results {
            text-align: center;
            padding: 3rem 1rem;
            color: #6b7280;
        }

        .no-results p {
            margin: 0;
            font-size: 16px;
        }

        /* Attendance Card Styles */
        .attendance-card {
            border-radius: 12px !important;
            border: 1px solid #EAECF0 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            height: 100%;
        }

        .attendance-card:hover {
            border-color: #7C3AED !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
            transform: translateY(-2px) !important;
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: #111827;
        }

        .department-text {
            font-size: 11px;
            font-weight: 400;
            color: #475467;
            margin-bottom: 0.25rem;
        }

        .room-text {
            font-size: 11px;
            font-weight: 400;
            color: #6366f1;
            margin-bottom: 0.5rem;
        }

        .students-label {
            font-size: 16px;
            font-weight: 500;
            color: #101828;
            margin-bottom: 0.25rem;
        }

        .students-count {
            font-size: 36px;
            font-weight: 600;
            color: #667085;
            margin-bottom: 0.5rem;
        }

        .new-admissions {
            color: #027A48;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .avatars-container {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .avatar {
            border: 2px solid white;
            object-fit: cover;
        }

        .avatar.overlapped {
            margin-left: -15px;
        }

        .remaining-count {
            font-size: 11px;
            font-weight: 500;
            color: #475467;
            margin-left: 0.5rem;
        }

        .teacher-info {
            font-size: 12px;
            font-weight: 400;
            color: #1F2937;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
        }

        .schedule-time {
            font-size: 12px;
            font-weight: 400;
            color: #1F2937;
            margin-bottom: 0.25rem;
            display: flex;
            align-items: center;
        }

        .schedule-days {
            font-size: 11px;
            font-weight: 400;
            color: #6b7280;
            margin-bottom: 0;
            display: flex;
            align-items: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .filter-header {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;
            }

            .search-sort-container {
                justify-content: space-between;
            }

            .search-input {
                width: 220px !important;
            }

            .all-classes-btn {
                width: 100%;
            }
        }

        @media (max-width: 576px) {
            .main-header {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;
            }

            .header-right {
                justify-content: center;
            }

            .search-input {
                width: 180px !important;
            }
        }
        `}
    </style>
);

export default Attendance;