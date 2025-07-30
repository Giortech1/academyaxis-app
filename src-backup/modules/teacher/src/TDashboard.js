import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Image, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';

const Dashboard = () => {
    const { userData, sections, fetchAnnouncements } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        if (userData) {
            getDashboardData();
        }
    }, [userData]);

    const getDashboardData = async () => {
        try {
            const response = await fetchAnnouncements(userData?.teacher_id);

            if (response?.success) {
                const now = new Date();

                const filteredAndSorted = (response.data || [])
                    .filter(announcement => {
                        if (announcement?.createdBy?.id === userData?.teacher_id) return false;
                        if (!announcement.isScheduled) return true;
                        const scheduleDate = new Date(announcement.scheduleDateTime);
                        return scheduleDate <= now;
                    })
                    .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                setAnnouncements(filteredAndSorted);
            }


            console.log('Sections: ', sections);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const calculateTeacherStats = () => {
        const teacherSections = sections.filter(section =>
            section.teacher_ids && section.teacher_ids.includes(userData?.teacher_id)
        );

        const uniqueCourses = teacherSections.reduce((acc, section) => {
            if (section.course && !acc.find(course => course.id === section.course.id)) {
                acc.push(section.course);
            }
            return acc;
        }, []);

        const totalStudents = teacherSections.reduce((total, section) => {
            return total + (section.student_ids ? section.student_ids.length : 0);
        }, 0);

        return [
            {
                label: 'Total Subjects',
                value: uniqueCourses.length,
                icon: '/assets/totalclasses.png',
                bg: '#F9F5FF',
            },
            {
                label: 'Total Students',
                value: totalStudents,
                icon: '/assets/totalstudents.png',
                bg: '#FFFAEB',
            },
        ];
    };

    const teacherStats = calculateTeacherStats();

    const formatAnnouncements = () => {
        if (!announcements || announcements.length === 0) {
            return [
                {
                    name: "Arsalan Mushtaq",
                    message: "This is a demo announcement by teacher for students this is a demo announcement by teacher for students. This is a demo announcement by teacher for students this is a demo announcement by teacher for students",
                    time: "Thu, 19 Sep 2024 12:40 PM",
                    profile: "assets/Avatar3.png",
                    roleIcon: "assets/teacher.png",
                    role: "Teacher",
                    thumb: "assets/thumb.png",
                    options: "assets/dots-vertical.png",
                },
                {
                    name: "Amna Mushtaq",
                    message: "This is a demo announcement by teacher for students this is a demo announcement by teacher for students. This is a demo announcement by teacher for students this is a demo announcement by teacher for students",
                    time: "11/9/2024",
                    profile: "assets/Avatar4.png",
                    roleIcon: "assets/teacher.png",
                    role: "Teacher",
                    thumb: "assets/Group 2.png",
                    options: "assets/dots-vertical.png",
                }
            ];
        }

        return announcements.map(announcement => ({
            name: announcement.createdBy?.name || 'Unknown',
            message: announcement.description,
            time: new Date(announcement.createdAt).toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            profile: announcement.createdBy?.profile_pic || "/assets/avatar.jpeg",
            roleIcon: "/assets/teacher.png",
            role: announcement.createdBy?.type || 'Admin',
            thumb: "/assets/thumb.png",
            options: "/assets/dots-vertical.png",
            title: announcement.title
        }));
    };

    const formattedAnnouncements = formatAnnouncements();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate("/grades");
    };

    const today = new Date();

    const [startOfWeek, setStartOfWeek] = React.useState(() => {
        const today = new Date();
        const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
        const start = new Date(today);
        start.setDate(today.getDate() - dayIndex);
        return start;
    });

    const navigateWeek = (direction) => {
        setStartOfWeek((prev) => {
            const newStartOfWeek = new Date(prev.getTime());
            newStartOfWeek.setDate(newStartOfWeek.getDate() + direction * 7);
            return newStartOfWeek;
        });
    };

    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    startOfWeek.setDate(today.getDate() - dayIndex);
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek.getTime());
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? "am" : "pm";
        return `${hour}:00 ${period}`;
    });

    const events = [
        {
            id: 1,
            date: new Date(startOfWeek).setDate(startOfWeek.getDate() + 0),
            startTime: "9:00 am",
            endTime: "11:00 am",
            subject: "Math Class",
            room: "Room no.8",
            teacher: "Kevin Jone",
            color: "#E9E8FC",
        },
        {
            id: 2,
            date: new Date(startOfWeek).setDate(startOfWeek.getDate() + 2),
            startTime: "12:00 pm",
            endTime: "2:00 pm",
            subject: "Physics Class",
            room: "Room no.5",
            teacher: "Lisa Smith",
            color: "#E8F8F2",
        },
        {
            id: 3,
            date: new Date(startOfWeek).setDate(startOfWeek.getDate() + 4),
            startTime: "1:00 pm",
            endTime: "3:00 pm",
            subject: "Chemistry Class",
            room: "Room no.3",
            teacher: "John Doe",
            color: "#FFF5E5",
        },
        {
            id: 4,
            date: new Date(startOfWeek).setDate(startOfWeek.getDate() + 1),
            startTime: "10:00 am",
            endTime: "12:00 pm",
            subject: "English Literature",
            room: "Room no.2",
            teacher: "Sarah Brown",
            color: "#DFF8E1",
        },
    ];

    const renderEvent = (currentDate, time) => {
        return events.map((event) => {
            const eventDate = new Date(event.date);
            if (eventDate.toDateString() === currentDate.toDateString()) {
                const startIndex = hours.indexOf(event.startTime);
                const endIndex = hours.indexOf(event.endTime);
                const currentIndex = hours.indexOf(time);

                if (currentIndex === startIndex) {
                    const duration = endIndex - startIndex;
                    return (
                        <Card
                            key={event.id}
                            className="p-2 text-dark shadow-sm event-card"
                            style={{
                                backgroundColor: event.color,
                                borderRadius: "8px",
                                height: `${80 * duration - 8}px`,
                                position: "absolute",
                                top: "4px",
                                left: "4px",
                                right: "4px",
                                bottom: "4px",
                                zIndex: 10,
                                overflow: "hidden",
                            }}
                        >
                            <div style={{ height: "100%" }}>
                                <p
                                    className="d-flex align-items-center mb-1"
                                    style={{
                                        fontSize: 12,
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        fontWeight: "500",
                                    }}
                                >
                                    <img
                                        src={"/assets/book1.png"}
                                        alt="Event"
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            marginRight: "8px",
                                        }}
                                    />
                                    {event.subject}
                                </p>

                                <p
                                    className="mb-1"
                                    style={{
                                        fontSize: 11,
                                        color: "#6c757d",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        fontWeight: "400",
                                        paddingBottom: "16px"
                                    }}
                                >
                                    {event.room}
                                </p>

                                <p
                                    className="mb-1"
                                    style={{
                                        fontSize: 12,
                                        color: "#6c757d",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        fontWeight: "400",
                                        paddingBottom: "16px"
                                    }}
                                >
                                    {event.startTime} - {event.endTime}
                                </p>

                                <p
                                    className="d-flex align-items-center mb-1"
                                    style={{
                                        fontSize: 12,
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        fontWeight: "500",
                                    }}
                                >
                                    <img
                                        src={"/assets/Avatar3.png"}
                                        alt={event.teacher}
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            marginRight: "4px",
                                        }}
                                    />
                                    {event.teacher}
                                </p>

                                <p
                                    className="d-flex align-items-center mb-0"
                                    style={{
                                        fontSize: 11,
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        color: "#6c757d",
                                        fontWeight: '300',
                                    }}
                                >
                                    <img
                                        src={"/assets/teacher.png"}
                                        alt="Teacher"
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            marginRight: "4px",
                                        }}
                                    />
                                    <span>Teacher</span>
                                </p>
                            </div>
                        </Card>
                    );
                }
            }
            return null;
        });
    };

    const teacher = {
        name: userData?.full_name,
        id: userData?.teacher_id,
        stats: teacherStats,
    };

    const attendance = {
        present: 10,
        absent: 5,
        leave: 3,
    };

    const total = attendance.present + attendance.absent + attendance.leave;

    const segments = [
        { label: 'Present', value: attendance.present, color: '#12B76A' },
        { label: 'Absent', value: attendance.absent, color: '#D92D20' },
        { label: 'Leave', value: attendance.leave, color: '#FFC300' },
    ];

    const attendancePercentage = Math.round((attendance.present / total) * 100);

    return (
        <>
            <Container fluid>
                <Row className="mt-3">
                    <Col md={12} className="p-3">
                        <header id='dashboardheader' className="dashboard-header">
                            <div id='section1' className="section-title">
                                <h1 className="main-heading">Dashboard</h1>
                            </div>

                            <div id='user-info' className="user-info-section">
                                <img
                                    id='info-img'
                                    src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                    alt="User"
                                    className="user-avatar"
                                />
                                <div className="user-details">
                                    <div className="user-name">{userData?.first_name} {userData?.last_name}</div>
                                    <div className="user-id">{userData?.teacher_id}</div>
                                </div>
                                <button className="dropdown-btn">
                                    <img
                                        src="/assets/arrow-down.png"
                                        alt="Dropdown"
                                        className="dropdown-icon"
                                    />
                                </button>
                            </div>
                        </header>

                        <Row id='result-card'>
                            <Col md={6}>
                                <div className="teacher-dashboard px-0 py-0">
                                    <Card className="mb-4 welcome-card">
                                        <Card.Body className="welcome-card-body">
                                            <Image
                                                src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                                roundedCircle
                                                className="profile-image"
                                            />
                                            <div>
                                                <p className="welcome-text">Welcome Back!</p>
                                                <h5 className="welcome-name">{teacher.name}</h5>
                                                <p className="welcome-id">{teacher.id}</p>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    {/* Stat Cards */}
                                    {isLoading ? (
                                        <div className="loading-stats">
                                            <div className="loading-spinner"></div>
                                            <p className="loading-stats-text">Loading statistics...</p>
                                        </div>
                                    ) : (
                                        <Row>
                                            {teacher.stats.map((stat, index) => (
                                                <Col key={index} xs={12} sm={6} className="mb-4">
                                                    <Card className="stat-card">
                                                        <Card.Body className="stat-card-body">
                                                            <div
                                                                className="stat-icon"
                                                                style={{ backgroundColor: stat.bg }}
                                                            >
                                                                <Image src={stat.icon} alt={stat.label} />
                                                            </div>
                                                            <div>
                                                                <h4 className="stat-value">{stat.value}</h4>
                                                                <p className="stat-label">{stat.label}</p>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    )}

                                    {/* Attendance Section - Keep as is */}
                                    <Card className="mb-4 attendance-card">
                                        <Card.Body className="d-flex justify-content-between align-items-start flex-wrap attendance-section">
                                            <h5 className="attendance-title">Your Attendance</h5>

                                            <div className="d-flex align-items-center w-100 flex-wrap gap-4 justify-content-between">
                                                <div className="attendance-chart">
                                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                                        <circle
                                                            cx="18"
                                                            cy="18"
                                                            r="15.9155"
                                                            fill="none"
                                                            stroke="#E4E4E7"
                                                            strokeWidth="4.5"
                                                        />
                                                        {segments.reduce((acc, segment, index) => {
                                                            const offset = segments
                                                                .slice(0, index)
                                                                .reduce((sum, s) => sum + (s.value / total) * 100, 0);
                                                            const dash = (segment.value / total) * 100;
                                                            acc.push(
                                                                <circle
                                                                    key={segment.label}
                                                                    cx="18"
                                                                    cy="18"
                                                                    r="15.9155"
                                                                    fill="none"
                                                                    stroke={segment.color}
                                                                    strokeWidth="4"
                                                                    strokeDasharray={`${dash} ${100 - dash}`}
                                                                    strokeDashoffset={-offset}
                                                                    transform="rotate(-90 18 18)"
                                                                    strokeLinecap="round"
                                                                />
                                                            );
                                                            return acc;
                                                        }, [])}
                                                    </svg>
                                                    <div className="attendance-percentage">{attendancePercentage}%</div>
                                                </div>

                                                <ul className="attendance-legend mb-0 ms-4">
                                                    {segments.map((s) => (
                                                        <li key={s.label}>
                                                            <span style={{ backgroundColor: s.color }}></span>
                                                            <span className="label-text">{s.label}</span>
                                                            <span className="value-text">{Math.round((s.value / total) * 100)}%</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>

                            {/* Calendar */}
                            <Col md={6}>
                                <Card style={{ border: 'none' }}>
                                    <Card.Body style={{ padding: '0px', border: 'none', borderRadius: '12px' }}>
                                        <div style={{ border: "1px solid #EAECF0", borderRadius: "12px", height: '100%' }}>
                                            {/* Header Section */}
                                            <div
                                                className="calendar-header"
                                                style={{
                                                    borderTopLeftRadius: "12px",
                                                    borderTopRightRadius: "12px",
                                                    padding: "10px",
                                                    paddingBottom: '0px'
                                                }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <h5 className="mb-0 fw-bold">
                                                            {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                                        </h5>
                                                        <Button
                                                            variant="none"
                                                            className="ms-1 border-0"
                                                            onClick={() => navigateWeek(-1)}
                                                        >
                                                            <img
                                                                src="/assets/left-arrow.png"
                                                                alt="Left Arrow"
                                                                style={{ width: "30px", height: "30px" }}
                                                            />
                                                        </Button>
                                                        <Button
                                                            variant="none"
                                                            className="ms-0 border-0"
                                                            onClick={() => navigateWeek(1)}
                                                        >
                                                            <img
                                                                src="/assets/right-arrow.png"
                                                                alt="Right Arrow"
                                                                style={{ width: "30px", height: "30px" }}
                                                            />
                                                        </Button>
                                                    </div>

                                                    <div style={{ marginRight: "5px" }}>
                                                        <Button
                                                            variant="link"
                                                            style={{
                                                                textDecoration: "underline",
                                                                fontWeight: "500",
                                                                fontSize: "12px",
                                                                color: "#111827",
                                                                padding: "0",
                                                            }}
                                                            onClick={() => navigate("/calendar")}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div
                                                    className="text-muted"
                                                    style={{
                                                        paddingLeft: "16px",
                                                        fontWeight: "500",
                                                        color: "#475467",
                                                    }}
                                                >
                                                    Today
                                                </div>

                                                <div className="days-header">
                                                    <div className="time-placeholder"></div>
                                                    {weekDates.slice(0, 4).map((date, index) => {
                                                        const isToday = today.toDateString() === date.toDateString();
                                                        return (
                                                            <div key={index} className="day-cell">
                                                                <p
                                                                    className="date-number"
                                                                    style={{
                                                                        backgroundColor: isToday ? "#F9F5FF" : "#F2F4F7",
                                                                        color: isToday ? "#7F56D9" : "#475467",
                                                                    }}
                                                                >
                                                                    {date.getDate()}
                                                                </p>
                                                                <p className="day-text">{days[index]}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div
                                                className="calendar-grid-wrapper"
                                                style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", fontSize: '18px', fontWeight: '500', height: 'calc(100% - 80px)' }}
                                            >
                                                <div className="calendar-grid">
                                                    {hours.map((hour, index) => (
                                                        <React.Fragment key={index}>
                                                            <div className="time-cell">{hour}</div>
                                                            {weekDates.slice(0, 4).map((date) => (
                                                                <div key={`${date}-${hour}`} className="grid-cell">
                                                                    {renderEvent(date, hour)}
                                                                </div>
                                                            ))}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="p-3 announcements-container">
                                    <div className="announcements-header">
                                        <h5 className="announcements-title">
                                            News & Announcements
                                        </h5>
                                        <button
                                            className="view-all-btn"
                                            onClick={() => navigate("/news-and-announcements")}
                                        >
                                            View All
                                        </button>
                                    </div>

                                    {isLoading ? (
                                        <div className="loading-announcements">
                                            <div className="loading-spinner"></div>
                                            <p className="loading-announcements-text">Loading announcements...</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* First announcement */}
                                            {formattedAnnouncements.slice(0, 1).map((item, index) => (
                                                <div key={index} className="announcement-item">
                                                    <div className="announcement-user-info">
                                                        <div className="announcement-user-left">
                                                            <img
                                                                src={item.profile}
                                                                alt="Profile"
                                                                className="announcement-profile"
                                                            />
                                                            <div>
                                                                <h6 className="announcement-name">
                                                                    {item.name}
                                                                </h6>
                                                                <span className="announcement-role">
                                                                    <img
                                                                        src={item.roleIcon}
                                                                        alt="Role Icon"
                                                                        className="role-icon"
                                                                    />
                                                                    {item.role}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="announcement-content">
                                                        <div className="announcement-text-section">
                                                            <p className="announcement-message">
                                                                {item.message}
                                                            </p>
                                                        </div>
                                                        <span className="announcement-time">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                            {formattedAnnouncements.length > 1 && (
                                                <div className="announcements-divider">
                                                    <div className="divider-label">
                                                        <span className="divider-text">
                                                            Old Announcements
                                                        </span>
                                                        <img
                                                            src="assets/arrow-down2.png"
                                                            alt="Arrow Down"
                                                            className="divider-arrow"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Remaining announcements */}
                                            {formattedAnnouncements.slice(1, 2).map((item, index) => (
                                                <div key={index + 1} className="announcement-item">
                                                    <div className="announcement-user-info">
                                                        <div className="announcement-user-left">
                                                            <img
                                                                src={item.profile}
                                                                alt="Profile"
                                                                className="announcement-profile"
                                                            />
                                                            <div>
                                                                <h6 className="announcement-name">
                                                                    {item.name}
                                                                </h6>
                                                                <span className="announcement-role">
                                                                    <img
                                                                        src={item.roleIcon}
                                                                        alt="Role Icon"
                                                                        className="role-icon"
                                                                    />
                                                                    {item.role}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="announcement-content">
                                                        <div className="announcement-text-section">
                                                            <p className="announcement-message">
                                                                {item.message}
                                                            </p>
                                                        </div>
                                                        <span className="announcement-time">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .loading-stats {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                }
                
                .loading-announcements {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #9747FF;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }
                
                .loading-stats-text {
                    font-size: 14px;
                    color: #6c757d;
                    margin: 0;
                    font-weight: 500;
                }
                
                .loading-announcements-text {
                    font-size: 14px;
                    color: #6c757d;
                    margin: 0;
                    font-weight: 500;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 0px;
                    padding-bottom: 30px;
                    width: 100%;
                }
                
                .section-title {
                    display: flex;
                    flex-direction: column;
                }
                
                .main-heading {
                    font-size: 24px;
                    margin: 0;
                    font-weight: 600;
                    color: #111827;
                }
                
                .user-info-section {
                    display: flex;
                    align-items: center;
                }
                
                .user-avatar {
                    border-radius: 50%;
                    width: 54px;
                    height: 54px;
                    margin-right: 10px;
                }
                
                .user-details {
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
                
                .dropdown-icon {
                    width: 12px;
                    height: 12px;
                }
                
                .welcome-card {
                    border-radius: 12px;
                    border: 1px solid #9747FF;
                    background: #9747FF;
                }
                
                .welcome-card-body {
                    display: flex;
                    align-items: center;
                }
                
                .profile-image {
                    width: 84px;
                    height: 84px;
                    object-fit: cover;
                    margin-right: 16px;
                }
                
                .welcome-text {
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 0px;
                }
                
                .welcome-name {
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 24px;
                    color: white;
                }
                
                .welcome-id {
                    font-size: 16px;
                    font-weight: 500;
                    color: #D0D5DD;
                    margin-bottom: 0;
                }
                
                .stat-card {
                    border-radius: 12px;
                    border: 1px solid #EAECF0;
                    background-color: #fff;
                }
                
                .stat-card-body {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 30px 34px;
                }
                
                .stat-icon {
                    border-radius: 50%;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .stat-icon img {
                    width: 24px;
                    height: 24px;
                }
                
                .stat-value {
                    margin: 0;
                    font-weight: 600;
                    font-size: 36px;
                }
                
                .stat-label {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 500;
                    color: #475467;
                }
                
                .attendance-card {
                    border-radius: 22px;
                    border: none;
                    background-color: #F8F8F8;
                }
                
                .attendance-title {
                    font-weight: 500;
                    font-size: 24px;
                    margin-bottom: 16px;
                    color: #000;
                }
                
                .attendance-section {
                    padding: 24px 30px;
                    border-radius: 22px;
                    background-color: #f8f8f8;
                }

                .attendance-chart {
                    position: relative;
                    width: 160px;
                    height: 160px;
                }

                .circular-chart {
                    width: 100%;
                    height: 100%;
                }

                .attendance-percentage {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-weight: 600;
                    font-size: 32px;
                    color: #101828;
                }

                .attendance-legend {
                    list-style: none;
                    padding: 0;
                    font-size: 14px;
                    font-weight: 500;
                    color: #344054;
                    min-width: 160px;
                    max-width: 240px;
                }

                .attendance-legend li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }

                .attendance-legend li span:first-child {
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    margin-right: 8px;
                }

                .label-text {
                    flex: 1;
                    margin-left: 8px;
                    color: #000;
                    font-size: 18px;
                    font-weight: 400;
                }

                .value-text {
                    font-weight: 400;
                    color: #101828;
                }

                .announcements-container {
                    border: 1px solid #E5E7EB;
                    border-radius: 12px;
                    background-color: #fff;
                }
                
                .announcements-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .announcements-title {
                    margin: 0;
                    font-weight: 600;
                    font-size: 16px;
                }
                
                .view-all-btn {
                    font-size: 12px;
                    padding: 5px 10px;
                    text-decoration: underline;
                    background: transparent;
                    border-bottom: 1px solid #000;
                    font-weight: 500;
                    border: none;
                }
                
                .announcement-item {
                    margin-bottom: 20px;
                }
                
                .announcement-user-info {
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                }
                
                .announcement-user-left {
                    display: flex;
                    align-items: start;
                }
                
                .announcement-profile {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                
                .announcement-name {
                    margin: 0;
                    font-weight: 500;
                    font-size: 14px;
                    padding-top: 2px;
                }
                
                .announcement-role {
                    display: block;
                    color: #475467;
                    font-size: 12px;
                    font-weight: 400;
                }
                
                .role-icon {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                }
                
                .announcement-options {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    margin-right: 18px;
                }
                
                .announcement-content {
                    margin-top: 10px;
                }
                
                .announcement-text-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }
                
                .announcement-message {
                    margin: 0;
                    color: #374151;
                    font-size: 12px;
                    font-weight: 400;
                    flex: 1;
                    flex-basis: 85%;
                    max-width: 85%;
                }
                
                .announcement-thumb {
                    width: 16px;
                    height: 16.5px;
                    margin-right: 15px;
                    align-self: center;
                }
                
                .announcement-time {
                    font-size: 11px;
                    font-weight: 400;
                    color: #4B5563;
                }
                
                .announcements-divider {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 8px;
                    border-top: 1px solid #E5E7EB;
                    position: relative;
                    padding-top: 10px;
                }
                
                .divider-label {
                    position: absolute;
                    top: -12px;
                    background-color: #FFF;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    z-index: 1;
                }
                
                .divider-text {
                    color: #9CA3AF;
                    font-size: 11px;
                    font-weight: 500;
                    margin-right: 8px;
                }
                
                .divider-arrow {
                    width: 16px;
                    height: 16px;
                }

                /* Responsive */
                @media (max-width: 576px) {
                    .attendance-section {
                        flex-direction: column;
                        text-align: center;
                    }

                    .attendance-chart {
                        margin: auto;
                    }

                    .attendance-legend {
                        margin-top: 20px;
                        max-width: 100%;
                        text-align: left;
                    }
                }

                .calendar-header {
                    position: relative;
                    top: 0;
                    z-index: 20;
                    background-color: #fff;
                    border-bottom: 1px solid #ddd;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                }

                .days-header {
                    display: grid;
                    grid-template-columns: 120px repeat(4, 1fr);
                    gap: 0;
                    text-align: center;
                }

                .time-placeholder {
                    width: 100%;
                }

                .day-cell {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .date-number {
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: 50%;
                    padding: 8px;
                    margin-bottom: 4px;
                    width: 35px;
                    height: 35px;
                }

                .day-text {
                    font-size: 16px;
                    font-weight: 500;
                    color: #475467;
                }

                .calendar-grid-wrapper {
                    overflow-x: auto;
                    overflow-y: auto;
                    max-height: 388px;
                }

                .calendar-grid-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .calendar-grid-wrapper {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .calendar-grid {
                    display: grid;
                    grid-template-columns: 120px repeat(4, 1fr);
                    grid-auto-rows: 80px;
                    background-color: #fff;
                }

                .time-cell {
                    background-color: #FFFFFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid #EAECF0;
                    border-bottom: 1px solid #EAECF0;
                    font-size: 18px;
                    font-weight: 500;
                    color: #475467;
                }

                .grid-cell {
                    background-color: #fff;
                    border: 0.5px solid #EAECF0;
                    position: relative;
                }
            `}</style>
        </>
    );
};

export default Dashboard;