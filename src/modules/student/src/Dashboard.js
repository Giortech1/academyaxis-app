import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Image, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';

const Dashboard = () => {
    const { userData, sections, fetchAnnouncements } = useContext(UserContext);
    const [announcements, setAnnouncements] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [challanNo, setChallanNo] = useState('9872');
    const [feeAmount, setFeeAmount] = useState(43000);
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');
    const [statusColor, setStatusColor] = useState('red');

    const [attendance, setAttendance] = useState(0);
    const [comparisonPercentage, setComparisonPercentage] = useState(0);
    const [quizProgress, setQuizProgress] = useState(0);
    const [assignmentProgress, setAssignmentProgress] = useState(0);

    useEffect(() => {
        if (userData?.student_id) {
            getDashboardData();
        }
    }, [userData?.student_id]);

    const getDashboardData = async () => {
        try {
            const response = await fetchAnnouncements(userData?.student_id);

            if (response?.success) {
                const now = new Date();

                const filteredAndSorted = (response.data || [])
                    .filter(announcement => {
                        if (!announcement.isScheduled) return true;
                        const scheduleDate = new Date(announcement.scheduleDateTime);
                        return scheduleDate <= now;
                    })
                    .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                setAnnouncements(filteredAndSorted);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userData && sections?.length > 0) {
            calculateStudentData();
        }
    }, [sections, userData]);

    useEffect(() => {
        setTimeout(() => {
            setChallanNo('9873');
            setFeeAmount(50000);
            setPaymentStatus('Paid');
            setStatusColor('green');
        }, 5000);
    }, []);

    const calculateStudentData = () => {
        if (!userData?.student_id || !sections) {
            setAttendance(0);
            setComparisonPercentage(0);
            setQuizProgress(0);
            setAssignmentProgress(0);
        }

        let totalAttendanceDays = 0;
        let presentDays = 0;
        let totalAssignments = 0;
        let submittedAssignments = 0;
        let totalQuizzes = 0;
        let submittedQuizzes = 0;

        sections.forEach(section => {
            // Calculate attendance
            if (section.attendance) {
                section.attendance.forEach(attendanceRecord => {
                    const studentAttendance = attendanceRecord.students?.find(s => s.studentId === userData.student_id);
                    if (studentAttendance) {
                        totalAttendanceDays++;
                        if (studentAttendance.status === 'Present') {
                            presentDays++;
                        }
                    }
                });
            }

            // Calculate assignments
            if (section.assignments) {
                totalAssignments += section.assignments.length;
                section.assignments.forEach(assignment => {
                    if (assignment.submitted && assignment.submitted.some(sub => sub.studentId === userData.student_id)) {
                        submittedAssignments++;
                    }
                });
            }

            // Calculate quizzes
            if (section.quizzes) {
                totalQuizzes += section.quizzes.length;
                section.quizzes.forEach(quiz => {
                    if (quiz.submitted && quiz.submitted.some(sub => sub.studentId === userData.student_id)) {
                        submittedQuizzes++;
                    }
                });
            }
        });

        const attendancePercentage = totalAttendanceDays > 0 ? Math.round((presentDays / totalAttendanceDays) * 100) : 80;
        const assignmentProgressPercentage = totalAssignments > 0 ? Math.round((submittedAssignments / totalAssignments) * 100) : 70;
        const quizProgressPercentage = totalQuizzes > 0 ? Math.round((submittedQuizzes / totalQuizzes) * 100) : 56;

        setAttendance(attendancePercentage);
        setComparisonPercentage(0);
        setQuizProgress(quizProgressPercentage);
        setAssignmentProgress(assignmentProgressPercentage);
    };

    const getUpcomingTasks = () => {
        if (!userData?.student_id || !sections) {
            return [];
        }

        const studentSections = sections.filter(section =>
            section.student_ids && section.student_ids.includes(userData.student_id)
        );

        let upcomingTasks = [];
        let taskCounter = 1;

        studentSections.forEach(section => {
            // Add assignments
            if (section.assignments) {
                section.assignments.forEach(assignment => {
                    const endDate = new Date(assignment.endDate);
                    const today = new Date();
                    const isSubmitted = assignment.submitted && assignment.submitted.some(sub => sub.studentId === userData.student_id);

                    if (endDate > today && !isSubmitted) {
                        upcomingTasks.push({
                            id: `A${taskCounter}`,
                            code: `A${taskCounter}`,
                            subject: "Assignment",
                            date: endDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                            time: `${assignment.startTime || '9:00 am'} - ${assignment.endTime || '11:00 am'}`,
                            iconColor: "#FEDF89",
                            backgroundColor: "#FFFAEB",
                            textColor: "#92400E",
                            title: assignment.title,
                            courseName: section.course?.name
                        });
                        taskCounter++;
                    }
                });
            }

            // Add quizzes
            if (section.quizzes) {
                section.quizzes.forEach(quiz => {
                    const endDate = new Date(quiz.endDate);
                    const today = new Date();
                    const isSubmitted = quiz.submitted && quiz.submitted.some(sub => sub.studentId === userData.student_id);

                    if (endDate > today && !isSubmitted) {
                        upcomingTasks.push({
                            id: `Q${taskCounter}`,
                            code: `Q${taskCounter}`,
                            subject: "Quiz",
                            date: endDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                            time: `${quiz.startTime || '10:00 am'} - ${quiz.endTime || '11:00 am'}`,
                            iconColor: "#E9D7FE",
                            backgroundColor: "#F9F5FF",
                            textColor: "#4338CA",
                            title: quiz.title,
                            courseName: section.course?.name
                        });
                        taskCounter++;
                    }
                });
            }
        });

        return upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
    };

    useEffect(() => {
        const upcomingTasks = getUpcomingTasks();
        setExams(upcomingTasks);
        setLoading(false);
    }, [sections, userData]);

    const formatAnnouncements = () => {
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
            role: announcement.createdBy?.type || '',
            thumb: "/assets/thumb.png",
            options: "/assets/dots-vertical.png",
            title: announcement.title
        }));
    };

    const formattedAnnouncements = formatAnnouncements();

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

    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get days in a month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const daysGrid = [];
        for (let i = 0; i < firstDay; i++) daysGrid.push(null);
        for (let i = 1; i <= totalDays; i++) daysGrid.push(i);
        return daysGrid;
    };

    const daysGrid = getDaysInMonth(currentDate);

    // Change Month
    const changeMonth = (increment) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDate(newDate);
    };

    // Countdown Timer Setup
    const targetDate = new Date("2024-12-22T00:00:00");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Array of card data with background colors
    const cardsData = [
        {
            title: "Physics",
            time: "2 hours",
            schedule: "8:00 AM to 2:00 PM",
            bgColor: "#EAF7F1",
            borderColor: "#039855",
        },
        {
            title: "Chemistry",
            time: "3 hours",
            schedule: "9:00 AM to 3:00 PM",
            bgColor: "#F9F5FF",
            borderColor: "#D6BBFB",
        },
        {
            title: "Mathematics",
            time: "1.5 hours",
            schedule: "10:00 AM to 12:30 PM",
            bgColor: "#FEF9C3",
            borderColor: "#FBBF24",
        },
    ];

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
                            className="event-card"
                            style={{
                                backgroundColor: event.color,
                                borderRadius: "0px",
                                height: `${80 * duration - 2}px`,
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                right: "0px",
                                bottom: "0px",
                                zIndex: 10,
                                overflow: "hidden",
                                padding: "8px",
                                color: "#000"
                            }}
                        >
                            <div style={{ height: "100%" }}>
                                <p className="event-subject">
                                    <img
                                        src={"/assets/book1.png"}
                                        alt="Event"
                                        className="event-icon"
                                    />
                                    {event.subject}
                                </p>

                                <p className="event-room">
                                    {event.room}
                                </p>

                                <p className="event-time">
                                    {event.startTime} - {event.endTime}
                                </p>

                                <p className="event-teacher">
                                    <img
                                        src={"/assets/Avatar3.png"}
                                        alt={event.teacher}
                                        className="teacher-avatar"
                                    />
                                    {event.teacher}
                                </p>

                                <p className="event-role">
                                    <img
                                        src={"/assets/teacher.png"}
                                        alt="Teacher"
                                        className="role-icon"
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

    return (
        <Container fluid>
            <Row className="mt-0">
                <Col md={12} className="dashboard-content">
                    <header className="dashboard-header">
                        <div className="header-section">
                            <h1 className="welcome-title">Welcome {userData?.first_name} {userData?.last_name} 👋</h1>
                            <p className="current-date">Friday, 27 December 2024</p>
                        </div>

                        <div className="user-info">
                            <img
                                className="user-avatar"
                                src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                alt="User"
                            />
                            <div className="user-details">
                                <div className="user-name">{userData?.full_name}</div>
                                <div className="user-id">{userData?.student_id}</div>
                            </div>
                        </div>
                    </header>

                    <Row className="result-cards-row">
                        <Col md={3} className="result-col">
                            <Card className="result-card">
                                <Card.Body>
                                    <Card.Title className="card-title">
                                        Result
                                    </Card.Title>

                                    <div className="gpa-section">
                                        <h4 className="gpa-value">{userData?.gpa}</h4>
                                        <p className="gpa-label">GPA</p>
                                    </div>

                                    <p className="comparison-text">
                                        <Image
                                            src="/assets/arrow-up.png"
                                            alt="Arrow Up"
                                            className="arrow-icon"
                                        />
                                        <span className="percentage-change">0%</span> vs last semester
                                    </p>

                                    <div className="cgpa-section">
                                        <h4 className="cgpa-value">{userData?.cgpa}</h4>
                                        <p className="cgpa-label">CGPA</p>
                                    </div>

                                    <p className="semester-info">
                                        Semester {userData?.current_semester} Result
                                    </p>
                                </Card.Body>
                            </Card>

                            <Card className="attendance-card">
                                <Card.Body>
                                    <Card.Title className="card-title">Attendance</Card.Title>
                                    <h1 className="attendance-percentage">{attendance}%</h1>
                                    <p className="comparison-text">
                                        <Image
                                            src="/assets/arrow-up.png"
                                            alt="Arrow Up"
                                            className="arrow-icon"
                                        />
                                        <span className="percentage-change">{comparisonPercentage}%</span> vs last semester
                                    </p>
                                    <p className="attendance-info">
                                        Attendance this Semester
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3} className="quiz-assignment-col">
                            <Card className="quiz-assignment-card">
                                <Card.Body>
                                    <Card.Title className="card-title quiz-assignment-title">Quiz & Assignment</Card.Title>

                                    <div className="progress-section">
                                        <p className="progress-label">Quizzes</p>
                                        <div className="progress-container">
                                            <div 
                                                className="progress-bar quiz-progress"
                                                style={{ width: `${quizProgress}%` }}
                                            ></div>
                                            <span className="progress-percentage">{quizProgress}%</span>
                                        </div>
                                    </div>

                                    <div className="progress-section assignment-section">
                                        <p className="progress-label">Assignments</p>
                                        <div className="progress-container">
                                            <div 
                                                className="progress-bar assignment-progress"
                                                style={{ width: `${assignmentProgress}%` }}
                                            ></div>
                                            <span className="progress-percentage">{assignmentProgress}%</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="fees-card">
                                <Card.Body>
                                    <Card.Title className="card-title">Fees</Card.Title>
                                    <p className="challan-info">Challan no. {challanNo}</p>
                                    <h4 className="fee-amount">
                                        {feeAmount} <span className="currency">Rs</span>
                                    </h4>

                                    <p className="payment-status">
                                        <span 
                                            className="status-indicator"
                                            style={{ backgroundColor: statusColor }}
                                        ></span>
                                        {paymentStatus}
                                    </p>

                                    <div className="payment-button-container">
                                        {paymentStatus === 'Unpaid' ? (
                                            <Button
                                                className="pay-button"
                                                onClick={() => navigate("/paywithcard")}
                                            >
                                                <img
                                                    src="assets/cards2.png"
                                                    alt="Card Icon"
                                                    className="card-icon"
                                                />
                                                Pay with Card
                                            </Button>
                                        ) : (
                                            <Button className="paid-button">
                                                Payment Completed
                                            </Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="calendar-col">
                            <Card className="calendar-card">
                                <Card.Body className="calendar-body">
                                    <div className="calendar-container">
                                        <div className="calendar-header">
                                            <div className="calendar-nav">
                                                <div className="calendar-title-section">
                                                    <h5 className="calendar-month">
                                                        {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                                    </h5>
                                                    <Button
                                                        className="nav-button"
                                                        onClick={() => navigateWeek(-1)}
                                                    >
                                                        <img
                                                            src="/assets/left-arrow.png"
                                                            alt="Left Arrow"
                                                            className="nav-arrow"
                                                        />
                                                    </Button>
                                                    <Button
                                                        className="nav-button"
                                                        onClick={() => navigateWeek(1)}
                                                    >
                                                        <img
                                                            src="/assets/right-arrow.png"
                                                            alt="Right Arrow"
                                                            className="nav-arrow"
                                                        />
                                                    </Button>
                                                </div>

                                                <div className="view-link-container">
                                                    <Button
                                                        className="view-link"
                                                        onClick={() => navigate("/timetable")}
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="today-label">
                                                Today
                                            </div>

                                            <div className="days-header">
                                                <div className="time-placeholder"></div>
                                                {weekDates.slice(0, 4).map((date, index) => {
                                                    const isToday = today.toDateString() === date.toDateString();
                                                    return (
                                                        <div key={index} className="day-cell">
                                                            <p
                                                                className={`date-number ${isToday ? 'today' : ''}`}
                                                            >
                                                                {date.getDate()}
                                                            </p>
                                                            <p className="day-text">{days[index]}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="calendar-grid-wrapper">
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

                    <Row className="bottom-row">
                        <Col md={6} className="news-col">
                            <div className="news-container">
                                <div className="news-header">
                                    <h5 className="news-title">
                                        News & Announcements
                                    </h5>
                                    <button
                                        className="view-all-button"
                                        onClick={() => navigate("/news-and-announcements")}
                                    >
                                        View All
                                    </button>
                                </div>

                                {formattedAnnouncements.slice(0, 1).map((item, index) => (
                                    <div key={index} className="announcement-item">
                                        <div className="announcement-header">
                                            <div className="author-info">
                                                <img
                                                    src={item.profile}
                                                    alt="Teacher Profile"
                                                    className="author-avatar"
                                                />
                                                <div>
                                                    <h6 className="author-name">
                                                        {item.name}
                                                    </h6>
                                                    <span className="author-role">
                                                        <img
                                                            src="assets/teacher.png"
                                                            alt="Teacher Profile"
                                                            className="role-icon-small"
                                                        />
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="announcement-content">
                                            <div className="message-container">
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

                                <div className="old-announcements-divider">
                                    <div className="divider-content">
                                        <span className="old-label">
                                            Old Announcements
                                        </span>
                                        <img
                                            src="assets/arrow-down2.png"
                                            alt="Arrow Down"
                                            className="arrow-down"
                                        />
                                    </div>
                                </div>

                                {formattedAnnouncements.slice(1, 2).map((item, index) => (
                                    <div key={index + 1} className="announcement-item">
                                        <div className="announcement-header">
                                            <div className="author-info">
                                                <img
                                                    src={item.profile}
                                                    alt="Teacher Profile"
                                                    className="author-avatar"
                                                />
                                                <div>
                                                    <h6 className="author-name">
                                                        {item.name}
                                                    </h6>
                                                    <span className="author-role">
                                                        <img
                                                            src="assets/teacher.png"
                                                            alt="Teacher Profile"
                                                            className="role-icon-small"
                                                        />
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="announcement-content">
                                            <div className="message-container">
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
                            </div>
                        </Col>

                        <Col md={6} className="tasks-col">
                            <Card className="tasks-card">
                                <Card.Body>
                                    <div className="tasks-header">
                                        <Card.Title className="tasks-title">
                                            Upcoming Tasks
                                        </Card.Title>
                                    </div>

                                    <div className="tasks-list-container">
                                        <ListGroup variant="flush" className="tasks-list">
                                            {loading ? (
                                                <div className="loading-message">
                                                    Loading tasks...
                                                </div>
                                            ) : exams.length === 0 ? (
                                                <div className="no-tasks-message">
                                                    No upcoming tasks
                                                </div>
                                            ) : (
                                                exams.map((exam) => (
                                                    <ListGroup.Item
                                                        key={exam.id}
                                                        className="task-item"
                                                        style={{
                                                            backgroundColor: exam.backgroundColor,
                                                        }}
                                                        onClick={() => {
                                                            if (exam.subject === 'Quiz') {
                                                                navigate(`/quiz-detail/${exam.id}`);
                                                            } else if (exam.subject === 'Assignment') {
                                                                navigate(`/assignment-detail/${exam.id}`);
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            className="task-icon"
                                                            style={{
                                                                backgroundColor: exam.iconColor,
                                                            }}
                                                        >
                                                            <span 
                                                                className="task-code"
                                                                style={{ color: exam.textColor }}
                                                            >
                                                                {exam.code}
                                                            </span>
                                                        </div>
                                                        <div className="task-details">
                                                            <p className="task-title">
                                                                {exam.title ? `${exam.subject} - ${exam.title}` : `${exam.subject} - ${exam.date}`}
                                                            </p>
                                                            <p className="task-info">
                                                                {exam.courseName ? `${exam.courseName} • ${exam.time}` : exam.time}
                                                            </p>
                                                        </div>
                                                    </ListGroup.Item>
                                                ))
                                            )}
                                        </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;