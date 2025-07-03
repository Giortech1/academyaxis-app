
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';


import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(false);
    // Dynamic data for courses (can be fetched from an API or database)
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate("/grades"); // Navigate to grades.js when the card is clicked
    };

    const today = new Date();

    const [startOfWeek, setStartOfWeek] = React.useState(() => {
        const today = new Date();
        const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
        const start = new Date(today); // Create a copy
        start.setDate(today.getDate() - dayIndex); // Update the copy
        return start;
    });



    const navigateWeek = (direction) => {
        setStartOfWeek((prev) => {
            const newStartOfWeek = new Date(prev.getTime()); // Copy the value of `prev`
            newStartOfWeek.setDate(newStartOfWeek.getDate() + direction * 7);
            return newStartOfWeek; // Return a new object
        });

    };


    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    startOfWeek.setDate(today.getDate() - dayIndex);
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek.getTime()); // Copy `startOfWeek`
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
                                height: `${80 * duration - 8}px`, // Adjust height to account for top and bottom spacing
                                position: "absolute",
                                top: "4px", // Set 4px space at the top
                                left: "4px",
                                right: "4px",
                                bottom: "4px", // Set 4px space at the bottom
                                zIndex: 10,
                                overflow: "hidden", // Ensure no scrolling
                            }}

                        >
                            <div style={{ height: "100%" }}>
                                {/* Event Title */}
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

                                {/* Room Information */}
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

                                {/* Time Range */}
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

                                {/* Teacher Information */}
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

                                {/* Teacher Label */}
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
        name: 'Mian Amir Mehmood',
        id: '14785200',
        stats: [
            {
                label: 'Total Subjects',
                value: 5,
                icon: '/assets/totalclasses.png',
                bg: '#F9F5FF',
            },
            {
                label: 'Total Students',
                value: 154,
                icon: '/assets/totalstudents.png',
                bg: '#FFFAEB',
            },

        ],
    };

    // Attendance Data
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
        <Container fluid>
            <Row className="mt-3">


                {/* Main Content */}
                <Col md={12} className="p-3">
                    <header
                        id='dashboardheader'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // marginBottom: '20px',

                            paddingtop: '0px',
                            paddingBottom: '30px',
                            width: '100%',

                        }}
                    >
                        {/* Left side: Arrow and Heading */}
                        <div id='section1' style={{ display: 'flex', flexDirection: 'column', }}>

                            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600', color: '#111827' }}>Dashboard</h1>

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
                                <div style={{ fontWeight: '500', fontSize: '14' }}>Mian Hamad Khalil</div>
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>123456</div>
                            </div>
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src="/assets/arrow-down.png" // Replace with your dropdown icon
                                    alt="Dropdown"
                                    style={{ width: '12px', height: '12px' }}
                                />
                            </button>
                        </div>
                    </header>

                    <Row id='result-card'>
                        {/* Result Card */}
                        <Col md={6}>
                            <div className="teacher-dashboard px-0 py-0">
                                {/* Profile Card */}
                                <Card className="mb-4  " style={{ borderRadius: '12px', border: '1px solid #9747FF', background: '#9747FF' }}>
                                    <Card.Body className="d-flex align-items-center">
                                        <Image
                                            src="/assets/avatar.jpeg" // Replace with real image
                                            roundedCircle
                                            style={{ width: '84px', height: '84px', objectFit: 'cover', marginRight: '16px' }}
                                        />
                                        <div>
                                            <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '0px' }}>Welcome Back!</p>
                                            <h5 style={{ fontWeight: '600', marginBottom: 0, fontSize: '24px', color: 'white' }}>{teacher.name}</h5>
                                            <p style={{ fontSize: '16px', fontWeight: '500', color: '#D0D5DD', marginBottom: 0 }}>{teacher.id}</p>
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/* Stat Cards */}
                                <Row>
                                    {teacher.stats.map((stat, index) => (
                                        <Col key={index} xs={12} sm={6} className="mb-4">
                                            <Card
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '1px solid #EAECF0',
                                                    backgroundColor: '#fff',
                                                }}
                                            >
                                                <Card.Body className="d-flex align-items-center" style={{ gap: '16px', padding: "30px 34px" }}>
                                                    <div
                                                        style={{
                                                            backgroundColor: stat.bg,
                                                            borderRadius: '50%',
                                                            width: '56px',
                                                            height: '56px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Image src={stat.icon} alt={stat.label} style={{ width: '24px', height: '24px' }} />
                                                    </div>
                                                    <div>
                                                        <h4 style={{ margin: 0, fontWeight: '600', fontSize: '36px' }}>{stat.value}</h4>
                                                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#475467' }}>{stat.label}</p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                {/* Attendance Section */}

                                <Card className="mb-4" style={{ borderRadius: '22px', border: 'none', backgroundColor: '#F8F8F8' }}>
                                    <Card.Body className="d-flex justify-content-between align-items-start flex-wrap attendance-section">
                                        <h5 style={{ fontWeight: '500', fontSize: '24px', marginBottom: '16px', color: '#000' }}>Your Attendance</h5>

                                        <div className="d-flex align-items-center w-100 flex-wrap gap-4 justify-content-between">
                                            {/* Chart */}
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

                                            {/* Legend */}
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



                                {/* Responsive Fixes */}
                                <style jsx>{`
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
//   width: 100%;
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
  font-size:18px;
  font-weight:400;
}

.value-text {
  font-weight: 400;
  color: #101828;
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


      `}</style>
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
                                                {/* Left Section */}
                                                <div className="d-flex align-items-center">
                                                    {/* Dynamically display current month and year */}
                                                    <h5 className="mb-0 fw-bold">
                                                        {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                                                    </h5>
                                                    <Button
                                                        variant="none"
                                                        className="ms-1 border-0"
                                                        onClick={() => navigateWeek(-1)} // Move to the previous week
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
                                                        onClick={() => navigateWeek(1)} // Move to the next week
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

                                            {/* Today Section */}
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

                                            {/* Days Header */}
                                            <div className="days-header">
                                                <div className="time-placeholder"></div> {/* Placeholder for time column */}
                                                {weekDates.slice(0, 4).map((date, index) => {
                                                    // Show only 4 days
                                                    const isToday = today.toDateString() === date.toDateString(); // Highlight if it's today
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


                                        {/* Calendar Grid */}
                                        <div
                                            className="calendar-grid-wrapper"
                                            style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", fontSize: '18px', fontWeight: '500', height: 'calc(100% - 80px)' }}
                                        >
                                            <div className="calendar-grid">
                                                {hours.map((hour, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="time-cell">{hour}</div>
                                                        {weekDates.slice(0, 4).map((date) => ( // Show only 4 days
                                                            <div key={`${date}-${hour}`} className="grid-cell">
                                                                {renderEvent(date, hour)}
                                                            </div>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Styles */}
                                    <style>
                                        {`
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
        grid-template-columns: 120px repeat(4, 1fr); /* Time column + 4 days */
        gap: 0;
        text-align: center;
    }

    .time-placeholder {
        width: 100%; /* Placeholder to align days properly */
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
        overflow-x: auto; /* Allow horizontal scrolling */
        overflow-y: auto; /* Allow vertical scrolling */
        max-height: 388px; /* Adjust to fit remaining height */
    }

    .calendar-grid-wrapper::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Webkit browsers */
    }

    .calendar-grid-wrapper {
        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
        scrollbar-width: none; /* Hide scrollbar for Firefox */
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: 120px repeat(4, 1fr); /* Time column + 4 days */
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
    `}
                                    </style>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>


                    <Row>
                        <Col md={6} >
                            <div
                                className="p-3"
                                style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    backgroundColor: '#fff',

                                }}
                            >
                                {/* Heading Section */}
                                <div
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ marginBottom: '15px' }}
                                >
                                    <h5 style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: '' }}>
                                        News & Announcements
                                    </h5>
                                    <button
                                        className="btn border-0"
                                        style={{
                                            fontSize: "12px",
                                            padding: "5px 10px",
                                            textDecoration: "underline",
                                            background: "transparent",
                                            borderBottom: "1px solid #000",
                                            fontWeight: "500",
                                        }}
                                        onClick={() => navigate("/news-and-announcements")}
                                    >
                                        View All
                                    </button>




                                </div>
                                {/* User Info Section */}
                                <div
                                    className="d-flex align-items-start"
                                    style={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center', // Ensures vertical alignment
                                    }}
                                >
                                    <div className="d-flex align-items-start">
                                        <img
                                            src="assets/Avatar3.png" // Replace with actual profile image URL
                                            alt="Teacher Profile"
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                marginRight: '15px',
                                            }}
                                        />
                                        <div>
                                            <h6
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                Arsalan Mushtaq
                                            </h6>
                                            <span
                                                style={{
                                                    display: 'block',
                                                    color: '#475467',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                <img
                                                    src="assets/teacher.png" // Replace with actual profile image URL
                                                    alt="Teacher Profile"
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        marginRight: '5px',
                                                    }}
                                                />
                                                Teacher
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src="assets/dots-vertical.png" // Replace with actual dots image URL
                                        alt="Options"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer', // Optional: Adds a pointer cursor for interactivity
                                            marginRight: '18px'
                                        }}
                                    />
                                </div>
                                {/* Text Section */}
                                <div style={{ marginTop: '10px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginTop: '5px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                flex: 1, // Ensures the text takes available space
                                                flexBasis: '85%', // Explicitly sets the width in a flex container
                                                maxWidth: '85%', // Ensures it doesn’t exceed 80% of the parent width

                                            }}
                                        >
                                            This is a demo announcement by teacher for students this is
                                            a demo announcement by teacher for students. This is a demo announcement by teacher for students this is
                                            a demo announcement by teacher for students
                                        </p>
                                        <img
                                            src="assets/thumb.png" // Replace with the actual path to your image
                                            alt="Thumb Icon"
                                            style={{
                                                width: '16px',
                                                height: '16.5px',
                                                marginRight: '15px', // Adds spacing between text and the image
                                                alignSelf: 'center', // Centers the image vertically
                                            }}
                                        />
                                    </div>

                                    <span
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: '400',
                                            color: '#4B5563',
                                        }}
                                    >
                                        Thu, 19 Sep 2024 12:40 PM
                                    </span>
                                </div>
                                <div
                                    className="d-flex justify-content-center align-items-center mt-2"
                                    style={{
                                        borderTop: '1px solid #E5E7EB', // Creates the horizontal border
                                        position: 'relative', // Allows proper positioning of the text and arrow
                                        paddingTop: '10px',
                                    }}
                                >
                                    {/* Text and Arrow Section */}
                                    <div
                                        style={{
                                            position: 'absolute', // Positions the text above the border
                                            top: '-12px', // Adjusts the position of the text to overlap the border
                                            backgroundColor: '#FFF', // Matches the background color to blend with the container
                                            padding: '0 12px', // Adds spacing around the text
                                            display: 'flex', // Aligns text and arrow horizontally
                                            alignItems: 'center',
                                            zIndex: 1, // Ensures it stays above the border
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: '#9CA3AF', // Gray color for the text
                                                fontSize: '11px', // Adjusted font size
                                                fontWeight: '500', // Medium font weight
                                                marginRight: '8px', // Spacing between text and arrow
                                            }}
                                        >
                                            Old Announcements
                                        </span>
                                        <img
                                            src="assets/arrow-down2.png" // Replace with your arrow image path
                                            alt="Arrow Down"
                                            style={{
                                                width: '16px', // Arrow icon width
                                                height: '16px', // Arrow icon height
                                            }}
                                        />
                                    </div>
                                </div>



                                {/* User Info Section */}
                                <div
                                    className="d-flex align-items-start"
                                    style={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center', // Ensures vertical alignment
                                    }}
                                >
                                    <div className="d-flex align-items-start">
                                        <img
                                            src="assets/Avatar4.png" // Replace with actual profile image URL
                                            alt="Teacher Profile"
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                marginRight: '15px',
                                            }}
                                        />
                                        <div>
                                            <h6
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                Amna Mushtaq
                                            </h6>
                                            <span
                                                style={{
                                                    display: 'block',
                                                    color: '#475467',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                <img
                                                    src="assets/teacher.png" // Replace with actual profile image URL
                                                    alt="Teacher Profile"
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        marginRight: '5px',
                                                    }}
                                                />
                                                Teacher
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src="assets/dots-vertical.png" // Replace with actual dots image URL
                                        alt="Options"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer', // Optional: Adds a pointer cursor for interactivity
                                            marginRight: '18px'
                                        }}
                                    />
                                </div>
                                {/* Text Section */}
                                <div style={{ marginTop: '10px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginTop: '5px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                flex: 1, // Ensures the text takes available space
                                                flexBasis: '85%', // Explicitly sets the width in a flex container
                                                maxWidth: '85%', // Ensures it doesn’t exceed 80% of the parent width

                                            }}
                                        >
                                            This is a demo announcement by teacher for students this is
                                            a demo announcement by teacher for students. This is a demo announcement by teacher for students this is
                                            a demo announcement by teacher for students
                                        </p>
                                        <img
                                            src="assets/Group 2.png" // Replace with the actual path to your image
                                            alt="Thumb Icon"
                                            style={{
                                                width: '16px',
                                                height: '16.5px',
                                                marginRight: '15px', // Adds spacing between text and the image
                                                alignSelf: 'center', // Centers the image vertically
                                            }}
                                        />
                                    </div>

                                    <span
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: '400',
                                            color: '#4B5563',
                                        }}
                                    >
                                        11/9/2024
                                    </span>
                                </div>

                            </div>

                        </Col>



                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default Dashboard;
