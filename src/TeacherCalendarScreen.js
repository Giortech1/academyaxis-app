import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for React Calendar
import { Container, Row, Col, Card, Form, Button, Image, Dropdown } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';

import { useNavigate } from "react-router-dom";



const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedClassId, setSelectedClassId] = useState(null); // Track selected class
    const navigate = useNavigate(); // Initialize navigate
    const handleClick = () => {
        navigate('/TeacherCalendar'); // Navigate to /calendar route
      };

    const todayClasses = [
        {
            id: 1,
            teacher: "Arsalan Mushtaq",
            subject: "Math Lecture",
            room: "Room no.7",
            time: "9:00 am - 11:00 am",
            duration: "2 hours",
        },
        {
            id: 2,
            teacher: "Waqas Waheed",
            subject: "Physics Lecture",
            room: "Room no.2",
            time: "11:00 am - 12:00 pm",
            duration: "1 hour",
        },
        {
            id: 3,
            teacher: "Arsalan Mushtaq",
            subject: "Stats Lecture",
            room: "Room no.6",
            time: "1:00 pm - 2:00 pm",
            duration: "1 hour",
        },
        {
            id: 4,
            teacher: "Arsalan Mushtaq",
            subject: "Chemistry Lecture",
            room: "Room no.8",
            time: "2:00 pm - 3:00 pm",
            duration: "1 hour",
        },
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const goToPreviousMonth = () => {
        const prevMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1
        );
        setCurrentMonth(prevMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1
        );
        setCurrentMonth(nextMonth);
    };

    const handleYearChange = (year) => {
        const newDate = new Date(year, currentMonth.getMonth());
        setCurrentMonth(newDate);
    };

    return (
        <Container fluid className="p-4">
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4" >
                <div className="d-flex align-items-center">
                    <Image
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
                        Calendar
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        src="/assets/avatar.jpeg"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                    </div>
                    <button className="bg-transparent border-0">
                        <img
                            src="/assets/arrow-down.png"
                            alt="Dropdown"
                            style={{ width: "12px", height: "12px", verticalAlign: 'top' }}
                        />
                    </button>
                </div>
            </header>

            {/* Second Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                {/* Left: Month and Year */}
                <div style={{ display: 'flex' }}>
                <div
      className="d-flex align-items-center"
      style={{
        border: '1px solid #D1D5DB',
        cursor: 'pointer',
        borderRadius: '8px',
        height: '35px',
        padding: '10px',
        backgroundColor: 'black',
      }}
      onClick={handleClick} // On click, call handleClick
    >
      <img
        src="/assets/menu-board1.png"
        alt="Calendar Icon"
        width={20}
        height={20}
        className="me-2"
      />
      <span style={{ fontSize: "14px", fontWeight: "600", color: 'white' }}>
        Calendar
      </span>
    </div>
                    <div
                        className="d-flex align-items-center"
                        style={{
                            border: '1px solid #D1D5DB',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            height: '35px',
                            padding: '10px',
                            marginLeft: '12px',
                        }}
                        onClick={() => navigate('/TeacherCalendar')} // Navigate to Calendar.js route
                    >
                        <img
                            src="/assets/stickynote.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: 'black' }}>
                            Time Table
                        </span>
                    </div>


                </div>

                {/* Right: Search Bar with Sort Button */}
                <div className="d-flex align-items-center">
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

            <Row>
                {/* Calendar Section */}
                <Col md={8}>
                    <Card className="calendar-section shadow-sm" style={{ borderRadius: "10px" }}>
                        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                            <h6 className="mb-0 d-flex align-items-center">
                                {currentMonth.toLocaleString("default", {
                                    month: "long",
                                })}{" "}
                                {currentMonth.getFullYear()}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="span"
                                        bsPrefix="custom-toggle"
                                        style={{
                                            display: "inline-block",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <img
                                            src="/assets/arrow-down.png" // Replace this with the actual path to your dropdown image
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
                            <div className="d-flex">
                                <Button

                                    onClick={goToPreviousMonth}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
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
                                        border: 'none',
                                        background: 'transparent',
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
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            activeStartDate={currentMonth}
                            tileClassName={({ date }) =>
                                date.toDateString() === selectedDate.toDateString()
                                    ? "selected-box"
                                    : null
                            }
                            className="custom-calendar"
                        />
                    </Card>
                </Col>


                {/* Today's Classes Section */}
                <Col md={4}>
                    <Card className="p-3 shadow-sm" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                        <h6 className="mb-2" style={{ fontSize: '16px', fontWeight: '600' }}>Today's Classes</h6>
                        {todayClasses.map((classInfo) => (
                            <Card
                                key={classInfo.id}
                                className="mb-2 p-3 rounded-3"
                                style={{
                                    minHeight: "120px", // Set minimum height for smaller box
                                    border: `1px solid ${selectedClassId === classInfo.id
                                        ? "green"
                                        : "#E5E7EB"
                                        }`, // Conditional border color
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedClassId(classInfo.id)} // Set selected class
                            >
                                <div className="d-flex">
                                    {/* Left side for placeholder image */}
                                    <div className="me-2" >
                                        <img
                                            src="assets/avatar.jpeg" // Replace with the teacher's image if available
                                            alt={classInfo.teacher}
                                            className="rounded-circle"
                                            style={{ width: '44px', height: '44px' }}
                                        />
                                    </div>
                                    {/* Right side for teacher's name and role */}
                                    <div>
                                        <div className="d-flex align-items-center mb-1">
                                            <h6 className="mb-0" style={{ fontSize: 12, fontWeight: "500" }}>
                                                {classInfo.teacher}
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="/assets/teacher.png" // Replace with the desired icon path
                                                alt="Teacher Icon"
                                                style={{ width: "12px", height: "12px" }}
                                                className="me-2"
                                            />
                                            <small className="text-muted" style={{ fontSize: 12, fontWeight: "400" }}>
                                                Teacher
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                {/* All other content starts from the left */}
                                <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "10px" }}>
                                    <p className="mb-0" style={{ fontSize: 14, fontWeight: "500" }}>
                                        {classInfo.subject}
                                    </p>
                                    <p className="mb-2" style={{ fontSize: 11, fontWeight: "400", color: '#475467' }}>
                                        {classInfo.room}
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/assets/clock1.png" // Replace with the desired icon path
                                            alt="Time Icon"
                                            style={{ width: "14px", height: "14px" }}
                                            className="me-2"
                                        />
                                        <span className="text-muted" style={{ fontSize: "12px", fontWeight: "400" }}>
                                            {classInfo.time} ({classInfo.duration})
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </Card>
                </Col>
            </Row>

            {/* Inline Styles for Calendar */}
            <style>
                {`
    .calendar-section {
      border: 1px solid #ddd; /* Outer section border */
      overflow: hidden; /* Ensure no space between outer and inner edges */
    }

    .custom-calendar {
      border: none; /* No outer border */
      width: 100%;
      height: auto;
      margin: 0; /* Remove any outer margin */
    }

    .custom-calendar .react-calendar__navigation {
      display: none; /* Hide default navigation */
    }

    .custom-calendar .react-calendar__month-view__weekdays {
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;
      font-weight: bold;
      color: #000; /* Black text for weekdays */
      font-size: 14px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd; /* Horizontal borders */
    }

    .custom-calendar .react-calendar__month-view__weekdays__weekday {
      border-right: 1px solid #ddd; /* Vertical line between weekdays */
      text-align: center;
      width: 100%;
    }

    .custom-calendar .react-calendar__month-view__weekdays__weekday:last-child {
      border-right: none; /* Remove the right border for the last weekday (Sunday) */
    }

    .custom-calendar .react-calendar__month-view__days__day {
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd; /* Vertical and horizontal lines for days */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      font-size: 14px;
      color: #000; /* Black text for days */
    }

    .custom-calendar .react-calendar__month-view__days__day:nth-child(7n) {
      border-right: none; /* Remove right border for Sundays */
    }
      abbr[title] {
    -webkit-text-decoration: underline dotted;
    text-decoration: none;
    cursor: help;
    text-decoration-skip-ink: none;
}

    .selected-box {
      background: #101828 !important; /* Dark background for selected box */
      color: #fff !important; /* White text for digits */
      font-weight: bold;
    }

    .custom-calendar .react-calendar__tile:hover {
      background: none;
      cursor: pointer;
    }
  `}
            </style>

        </Container>
    );
};

export default CalendarScreen;
