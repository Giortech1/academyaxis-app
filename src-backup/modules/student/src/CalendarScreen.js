import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Card, Form, Button, Image, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const CalendarScreen = () => {
    const { userData, sections} = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [todayClasses, setTodayClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const getCurrentDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[selectedDate.getDay()].toLowerCase();
    };

    const convertSectionsToClasses = () => {
        if (!sections || sections.length === 0) {
            return [];
        }

        const currentDay = getCurrentDayName();
        const classes = [];

        sections.forEach((section, index) => {
            if (section?.schedule && section?.schedule?.days && section?.schedule?.days?.includes(currentDay)) {
                const teacher = section?.teachers && section?.teachers?.length > 0 ? section?.teachers[0] : null;

                if (teacher) {
                    const classInfo = {
                        id: section.id || index + 1,
                        teacher: `${teacher?.first_name} ${teacher?.last_name}`,
                        subject: section?.course?.name,
                        room: section?.room_no,
                        time: `${section?.schedule?.start_time} - ${section?.schedule?.end_time}`,
                        duration: calculateDuration(section?.schedule?.start_time, section?.schedule?.end_time),
                        department: section?.department?.name,
                        section: section?.section,
                        teacherId: teacher?.teacher_id,
                        email: teacher?.email,
                        profile_pic: teacher?.profile_pic || "/assets/avatar.jpeg",
                    };
                    classes.push(classInfo);
                }
            }
        });

        return classes;
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

    // Filter classes based on search term
    const getFilteredClasses = () => {
        let classes = convertSectionsToClasses();
        
        if (searchTerm.trim()) {
            classes = classes.filter(classInfo =>
                classInfo.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                classInfo.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                classInfo.room.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return classes;
    };

    useEffect(() => {
        const classes = getFilteredClasses();
        setTodayClasses(classes);
    }, [sections, selectedDate, searchTerm]);

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

    const isToday = (date) =>
        date.toDateString() === new Date().toDateString();

    const formatDisplayDate = (date) =>
        date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

    return (
        <Container fluid className="p-4">
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
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
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>
                            {userData?.full_name || 
                             (userData?.first_name && userData?.last_name
                                ? `${userData.first_name} ${userData.last_name}`
                                : "Student")}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>
                            {userData?.student_id || userData?.id || "ID"}
                        </div>
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
                {/* Left: Navigation Buttons */}
                <div style={{ display: 'flex' }}>
                    <div className="calendar-nav-button active">
                        <img
                            src="/assets/menu-board1.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span>Calendar</span>
                    </div>
                    <div
                        className="calendar-nav-button"
                        onClick={() => navigate('/timetable')}
                    >
                        <img
                            src="/assets/stickynote.png"
                            alt="Timetable Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span>Time Table</span>
                    </div>
                </div>

                {/* Right: Search Bar with Sort Button */}
                <div className="d-flex align-items-center">
                    <div className="position-relative me-3 search-container">
                        <Form.Control
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <Image
                            src="/assets/search-lg1.png"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className="search-icon"
                        />
                    </div>

                    <Button className="sort-button">
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
                    <Card className="calendar-section shadow-sm">
                        <div className="calendar-header">
                            <h6 className="mb-0 d-flex align-items-center">
                                {currentMonth.toLocaleString("default", {
                                    month: "long",
                                })}{" "}
                                {currentMonth.getFullYear()}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as="span"
                                        bsPrefix="custom-toggle"
                                        className="year-dropdown"
                                    >
                                        <img
                                            src="/assets/arrow-down.png"
                                            alt="Dropdown"
                                            className="dropdown-arrow"
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
                                    className="nav-arrow-button"
                                >
                                    <img
                                        src="/assets/arrow-circle-left.png"
                                        alt="Previous"
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                </Button>
                                <Button
                                    onClick={goToNextMonth}
                                    className="nav-arrow-button"
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
                    <Card className="classes-card">
                        <h6 className="classes-title">
                            {isToday(selectedDate)
                                ? "Today's Classes"
                                : `Classes for ${formatDisplayDate(selectedDate)}`}
                        </h6>
                        {todayClasses.length === 0 ? (
                            <div className="no-classes">
                                <img
                                    src="/assets/no-classes.png"
                                    alt="No Classes"
                                    style={{ width: "60px", height: "60px", opacity: 0.5, marginBottom: "10px" }}
                                />
                                <p>
                                    {searchTerm.trim() 
                                        ? "No classes found matching your search"
                                        : `No classes scheduled for ${getCurrentDayName()}`}
                                </p>
                            </div>
                        ) : (
                            todayClasses.map((classInfo) => (
                                <Card
                                    key={classInfo.id}
                                    className={`class-card ${selectedClassId === classInfo.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedClassId(classInfo.id)}
                                >
                                    <div className="d-flex">
                                        {/* Left side for teacher image */}
                                        <div className="me-2">
                                            <img
                                                src={classInfo.profile_pic}
                                                alt={classInfo.teacher}
                                                className="teacher-avatar"
                                            />
                                        </div>
                                        {/* Right side for teacher's name and role */}
                                        <div>
                                            <div className="d-flex align-items-center mb-1">
                                                <h6 className="teacher-name">
                                                    {classInfo.teacher}
                                                </h6>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <img
                                                    src="/assets/teacher.png"
                                                    alt="Teacher Icon"
                                                    className="teacher-icon"
                                                />
                                                <small className="teacher-role">Teacher</small>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Class details */}
                                    <div className="class-details">
                                        <p className="subject-name">{classInfo.subject}</p>
                                        <p className="room-info">
                                            {classInfo.room} 
                                            {classInfo.department && ` • ${classInfo.department}`}
                                            {classInfo.section && ` • Section ${classInfo.section}`}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="/assets/clock1.png"
                                                alt="Time Icon"
                                                className="time-icon"
                                            />
                                            <span className="time-info">
                                                {classInfo.time} ({classInfo.duration})
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </Card>
                </Col>
            </Row>

            <CalendarStyles />
        </Container>
    );
};

// Separated Styles Component
const CalendarStyles = () => (
    <style>
        {`
        /* Navigation Buttons */
        .calendar-nav-button {
            display: flex;
            align-items: center;
            border: 1px solid #D1D5DB;
            cursor: pointer;
            border-radius: 8px;
            height: 35px;
            padding: 10px;
            margin-right: 12px;
            font-size: 14px;
            font-weight: 600;
            background-color: white;
            color: black;
            transition: all 0.2s ease;
        }

        .calendar-nav-button.active {
            background-color: black;
            color: white;
        }

        .calendar-nav-button:hover {
            background-color: #f3f4f6;
        }

        .calendar-nav-button.active:hover {
            background-color: #374151;
        }

        /* Search Container */
        .search-container {
            flex-grow: 1;
        }

        .search-input {
            border-radius: 8px !important;
            padding-left: 40px !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            color: #98A2B3 !important;
            border-color: #D1D5DB !important;
            width: 300px !important;
        }

        .search-icon {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
        }

        /* Sort Button */
        .sort-button {
            background-color: transparent !important;
            color: #374151 !important;
            border: 1px solid #D1D5DB !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            display: flex;
            align-items: center;
        }

        /* Calendar Section */
        .calendar-section {
            border-radius: 10px !important;
            border: 1px solid #ddd;
            overflow: hidden;
        }

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #dee2e6;
        }

        .year-dropdown {
            display: inline-block;
            cursor: pointer;
        }

        .dropdown-arrow {
            width: 14px;
            height: 14px;
            margin-left: 8px;
        }

        .nav-arrow-button {
            border: none !important;
            background: transparent !important;
            border-radius: 50% !important;
            width: 30px !important;
            height: 30px !important;
            padding: 0 !important;
            margin-right: 5px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .nav-arrow-button:last-child {
            margin-right: 0 !important;
        }

        /* Custom Calendar Styles */
        .custom-calendar {
            border: none;
            width: 100%;
            height: auto;
            margin: 0;
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

        .custom-calendar .react-calendar__month-view__weekdays__weekday {
            border-right: 1px solid #ddd;
            text-align: center;
            width: 100%;
        }

        .custom-calendar .react-calendar__month-view__weekdays__weekday:last-child {
            border-right: none;
        }

        .custom-calendar .react-calendar__month-view__days__day {
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80px;
            font-size: 14px;
            color: #000;
        }

        .custom-calendar .react-calendar__month-view__days__day:nth-child(7n) {
            border-right: none;
        }

        abbr[title] {
            -webkit-text-decoration: underline dotted;
            text-decoration: none;
            cursor: help;
            text-decoration-skip-ink: none;
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

        /* Classes Card */
        .classes-card {
            padding: 1rem !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
            border: 1px solid #E5E7EB !important;
            border-radius: 12px !important;
        }

        .classes-title {
            margin-bottom: 0.5rem !important;
            font-size: 16px !important;
            font-weight: 600 !important;
        }

        .no-classes {
            text-align: center;
            padding: 2rem 1rem;
            color: #6b7280;
        }

        .no-classes p {
            margin: 0;
            font-size: 14px;
        }

        /* Class Card */
        .class-card {
            margin-bottom: 0.5rem !important;
            padding: 0.75rem !important;
            border-radius: 0.75rem !important;
            min-height: 120px !important;
            border: 1px solid #E5E7EB !important;
            cursor: pointer !important;
            transition: border-color 0.2s ease !important;
        }

        .class-card.selected {
            border-color: green !important;
        }

        .class-card:hover {
            border-color: #d1d5db !important;
        }

        .class-card.selected:hover {
            border-color: #16a34a !important;
        }

        .teacher-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
        }

        .teacher-name {
            margin-bottom: 0 !important;
            font-size: 12px !important;
            font-weight: 500 !important;
        }

        .teacher-icon {
            width: 12px;
            height: 12px;
            margin-right: 0.5rem;
        }

        .teacher-role {
            color: #6b7280 !important;
            font-size: 12px !important;
            font-weight: 400 !important;
        }

        .class-details {
            border-top: 1px solid #E5E7EB;
            padding-top: 10px;
        }

        .subject-name {
            margin-bottom: 0 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
        }

        .room-info {
            margin-bottom: 0.5rem !important;
            font-size: 11px !important;
            font-weight: 400 !important;
            color: #475467 !important;
        }

        .time-icon {
            width: 14px;
            height: 14px;
            margin-right: 0.5rem;
        }

        .time-info {
            color: #6b7280;
            font-size: 12px;
            font-weight: 400;
        }
        `}
    </style>
);

export default CalendarScreen;