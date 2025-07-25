import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for React Calendar
import { Container, Row, Col, Card, Form, Button, Image, Dropdown } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import { UserContext } from "./UserContext";

const CalendarScreen = () => {
    const {userData}=useContext(UserContext);
    const [selectedClassId, setSelectedClassId] = useState(null); // Track selected class
    const navigate = useNavigate(); // Initialize navigate

    // Attendance Data (use your real data here)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState({});

    // Helper to format date into 'YYYY-MM-DD'
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // Generate last 15 days attendance
    useEffect(() => {
        const today = new Date();
        const data = {};
        const statuses = ["present", "absent", "leave"];

        for (let i = 0; i < 15; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const formatted = formatDate(date);

            // Randomly pick status
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            data[formatted] = status;
        }

        setAttendanceData(data);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleYearChange = (year) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        setCurrentMonth(newDate);
    };

    const goToPreviousMonth = () => {
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };
    // Calculate attendance statistics dynamically based on attendance data
    const [attendanceStats, setAttendanceStats] = useState([
        {
            label: "Present Days",
            value: "21",
            icon: "/assets/presentday.png",
            bg: "#ECFDF3",
        },
        {
            label: "Leave Days",
            value: "21",
            icon: "/assets/leaveday.png",
            bg: "#F9F5FF",
        },
        {
            label: "Absent Days",
            value: "21",
            icon: "/assets/absentday.png",
            bg: "#FEF3F2",
        },
        {
            label: "Percentage",
            value: "96%",
            icon: "/assets/percentage.png",
            bg: "#E0F2FE",
        },
    ]);



    // Dynamically calculate attendance statistics
    useEffect(() => {
        // Count the number of each type of day
        let presentCount = 0;
        let leaveCount = 0;
        let absentCount = 0;

        Object.values(attendanceData).forEach(status => {
            if (status === "present") presentCount++;
            else if (status === "leave") leaveCount++;
            else if (status === "absent") absentCount++;
        });

        // Calculate attendance percentage
        const totalDays = presentCount + leaveCount + absentCount;
        const percentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;

        // Update attendance stats
        setAttendanceStats([
            {
                label: "Present Days",
                value: presentCount.toString(),
                icon: "/assets/presentday.png",
                bg: "#ECFDF3",
            },
            {
                label: "Leave Days",
                value: leaveCount.toString(),
                icon: "/assets/leaveday.png",
                bg: "#F9F5FF",
            },
            {
                label: "Absent Days",
                value: absentCount.toString(),
                icon: "/assets/absentday.png",
                bg: "#FEF3F2",
            },
            {
                label: "Percentage",
                value: `${percentage}%`,
                icon: "/assets/percentage.png",
                bg: "#E0F2FE",
            },
        ]);
    }, [attendanceData]);

    return (
        <Container fluid className="p-4" id="calendarscreen">
            {/* Header Section */}
            <header id="header" className="d-flex justify-content-between align-items-center mb-4" >
                <div className="d-flex align-items-center" id="calenderheading">
                    <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                        Attendence
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                        id="info-img"
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>{userData?.full_name}</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.admin_id}</div>
                    </div>
                    {/* <button className="bg-transparent border-0">
                        <img
                            src="/assets/arrow-down.png"
                            alt="Dropdown"
                            style={{ width: "12px", height: "12px", verticalAlign: 'top' }}
                        />
                    </button> */}
                </div>
            </header>

            {/* Second Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4" id="second-header">
                {/* Left: Month and Year */}
                <div id="mon-year" style={{ display: 'flex' }}>
                    <div className="d-flex align-items-center" style={{ border: '1px solid #D1D5DB', cursor: 'pointer', borderRadius: '8px', height: '35px', padding: '10px', backgroundColor: 'black' }}>
                        <Image
                            src="/assets/menu-board1.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: 'white' }}>Calendar</span>
                    </div>
                </div>
            </header>

            <Row>
                <Col md={8} id="calendar">
                    <Card
                        className="calendar-section"
                        style={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}
                    >
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center px-3 py-2 ">
                            <h6 className="mb-0 d-flex align-items-center">
                                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                                {currentMonth.getFullYear()}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="span"
                                        bsPrefix="custom-toggle"
                                        style={{ display: "inline-block", cursor: "pointer" }}
                                    >
                                        <img
                                            src="/assets/arrow-down.png"
                                            alt="Dropdown"
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                marginLeft: "8px",
                                            }}
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {[...Array(10).keys()].map((i) => {
                                            const year = currentMonth.getFullYear() - 5 + i;
                                            return (
                                                <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
                                                    {year}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </h6>

                            {/* Arrows */}
                            <div className="d-flex">
                                <Button
                                    onClick={goToPreviousMonth}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        borderRadius: "50%",
                                        width: "30px",
                                        height: "30px",
                                        padding: 0,
                                        marginRight: "5px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src="/assets/arrow-circle-left.png"
                                        alt="Previous"
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                </Button>
                                <Button
                                    onClick={goToNextMonth}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        borderRadius: "50%",
                                        width: "30px",
                                        height: "30px",
                                        padding: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src="/assets/arrow-circle-right1.png"
                                        alt="Next"
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                </Button>
                            </div>
                        </div>

                        {/* Calendar */}
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            activeStartDate={currentMonth}
                            tileClassName={({ date }) =>
                                date.toDateString() === selectedDate.toDateString() ? "selected-box" : null
                            }
                            tileContent={({ date, view }) => {
                                if (view !== "month") return null;

                                const formattedDate = formatDate(date);
                                const status = attendanceData[formattedDate];

                                return status ? (
                                    <div className="dot-container">
                                        <div className={`attendance-dot ${status}`} />
                                    </div>
                                ) : null;
                            }}
                            className="custom-calendar"
                        />
                    </Card>

                    {/* Legend */}
                    <div className="d-flex align-items-center justify-content-start mt-3" style={{ gap: '100px' }}>
                        <div className="d-flex align-items-center me-4">
                            <span className="dot present me-2"></span>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Present</span>
                        </div>
                        <div className="d-flex align-items-center me-4">
                            <span className="dot absent me-2"></span>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Absent</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="dot leave me-2"></span>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Leave</span>
                        </div>
                    </div>

                    {/* Inline Styles */}
                    <style>
                        {`
          .calendar-section {
            overflow: hidden;
            border-bottom:none !important;
          }
          .custom-calendar {
            border: none;
            width: 100%;
            height: auto;
          }
          .custom-calendar .react-calendar__navigation {
            display: none;
          }
          .custom-calendar .react-calendar__month-view__weekdays {
            display: flex;
            justify-content: space-between;
            text-transform: uppercase;
            font-weight: bold;
            color: #000;
            font-size: 14px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
          }
          .custom-calendar .react-calendar__month-view__days__day {
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100px;
            width:100px;
            font-size: 14px;
            position: relative;
          }
          .custom-calendar .react-calendar__month-view__days__day:nth-child(7n) {
            border-right: none;
          }
          abbr[title] {
            text-decoration: none;
          }
          .selected-box {
            background: #101828 !important;
            color: #fff !important;
            font-weight: bold;
          }
          .custom-calendar .react-calendar__tile:hover {
            background: none;
            cursor: pointer;
          }
          .dot-container {
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
          }
          .attendance-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
          .attendance-dot.present {
            background-color: #12B76A;
          }
          .attendance-dot.absent {
            background-color: #D92D20;
          }
          .attendance-dot.leave {
            background-color: #FEC84B;
          }
          .dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            display: inline-block;
          }
          .present {
            background-color: #22c55e;
          }
          .absent {
            background-color: #dc2626;
          }
          .leave {
            background-color: #facc15;
          }
        `}
                    </style>
                </Col>

                {/* Attendance Stat Cards */}
                <Col md={4}>
                    <div className="d-flex flex-column gap-3">
                        {attendanceStats.map((item, index) => (
                            <Card
                                key={index}
                                className="p-4 d-flex flex-row align-items-center"
                                style={{
                                    border: "1px solid #EAECF0",
                                    borderRadius: "12px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                {/* Left side Icon with background */}
                                <div
                                    style={{
                                        backgroundColor: item.bg,
                                        borderRadius: "50%",
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "16px",
                                    }}
                                >
                                    <img src={item.icon} alt={item.label} style={{ width: "24px", height: "24px" }} />
                                </div>

                                {/* Right side text */}
                                <div>
                                    <h5 style={{ margin: 0, fontWeight: "600", fontSize: "20px", color: "#0F172A" }}>
                                        {item.value}
                                    </h5>
                                    <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#475467" }}>
                                        {item.label}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CalendarScreen;