import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const CalendarGridScreen = () => {
    const { userData, sections } = useContext(UserContext);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

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
    const currentWeekStart = new Date(startOfWeek.getTime());
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentWeekStart.getTime());
        date.setDate(currentWeekStart.getDate() + i);
        return date;
    });

    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? "am" : "pm";
        return `${hour}:00 ${period}`;
    });

    // Function to convert 24-hour format to 12-hour format
    const convertTo12Hour = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
    };

    // Function to get day name from date
    const getDayName = (date) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[date.getDay()].toLowerCase();
    };

    // Function to get color for events (cycling through predefined colors)
    const getEventColor = (index) => {
        const colors = ["#E9E8FC", "#E8F8F2", "#FFF5E5", "#DFF8E1", "#FFE5E5", "#E5F9FF", "#F0E5FF"];
        return colors[index % colors.length];
    };

    // Function to convert sections data to events format
    const convertSectionsToEvents = () => {
        if (!sections || sections.length === 0) {
            return [];
        }

        const generatedEvents = [];
        let eventId = 1;

        sections.forEach((section, sectionIndex) => {
            if (section.schedule && section.schedule.days && section.schedule.start_time && section.schedule.end_time) {
                const teacher = section.teachers && section.teachers.length > 0 ? section.teachers[0] : null;
                
                if (teacher) {
                    // For each day in the schedule
                    section.schedule.days.forEach(dayName => {
                        // Find the corresponding date in the current week
                        weekDates.forEach(weekDate => {
                            if (getDayName(weekDate) === dayName) {
                                const event = {
                                    id: eventId++,
                                    date: weekDate.getTime(),
                                    startTime: convertTo12Hour(section.schedule.start_time),
                                    endTime: convertTo12Hour(section.schedule.end_time),
                                    subject: section.course_name,
                                    room: section.room_no,
                                    teacher: `${teacher.first_name} ${teacher.last_name}`,
                                    color: getEventColor(sectionIndex),
                                    department: section.department,
                                    section: section.section,
                                    teacherId: teacher.teacher_id,
                                    email: teacher.email,
                                    teacherImage: "/assets/Avatar3.png" // Default teacher image
                                };
                                generatedEvents.push(event);
                            }
                        });
                    });
                }
            }
        });

        return generatedEvents;
    };

    // Update events when sections or week changes
    useEffect(() => {
        const newEvents = convertSectionsToEvents();
        setEvents(newEvents);
    }, [sections, startOfWeek]);

    // Get current month and year for header
    const getCurrentMonthYear = () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentDate = weekDates[3]; // Use middle of week for reference
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    };

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
                                {/* Event Title */}
                                <p className="event-title">
                                    <img
                                        src={"/assets/book1.png"}
                                        alt="Event"
                                        className="event-icon"
                                    />
                                    {event.subject}
                                </p>

                                {/* Room Information */}
                                <p className="event-room">
                                    {event.room} • {event.department} • Section {event.section}
                                </p>

                                {/* Time Range */}
                                <p className="event-time">
                                    {event.startTime} - {event.endTime}
                                </p>

                                {/* Teacher Information */}
                                <p className="event-teacher">
                                    <img
                                        src={event.teacherImage}
                                        alt={event.teacher}
                                        className="teacher-avatar-small"
                                    />
                                    {event.teacher}
                                </p>

                                {/* Teacher Label */}
                                <p className="teacher-label">
                                    <img
                                        src={"/assets/teacher.png"}
                                        alt="Teacher"
                                        className="teacher-icon-small"
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
        <Container fluid className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
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
                        Timetable
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
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>
                            {userData?.first_name && userData?.last_name 
                                ? `${userData.first_name} ${userData.last_name}` 
                                : "Mian Hamad Khalil"}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>
                            {userData?.teacher_id || userData?.student_id || "123456"}
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
                    <div
                        className="timetable-nav-button"
                        onClick={() => navigate('/Teachercalendarscreen')}
                    >
                        <Image
                            src="/assets/menu-board2.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span>Calendar</span>
                    </div>

                    <div
                        className="timetable-nav-button active"
                        onClick={() => navigate('/calendar')}
                    >
                        <Image
                            src="/assets/stickynote1.png"
                            alt="Calendar Icon"
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
                            placeholder="Search"
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

            <div className="timetable-container">
                {/* Header Section */}
                <div className="timetable-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center header-controls">
                            <h5 className="mb-0 fw-bold">{getCurrentMonthYear()}</h5>
                            <Button
                                variant="none"
                                className="ms-1 border-0 week-nav-btn"
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
                                className="ms-0 border-0 week-nav-btn"
                                onClick={() => navigateWeek(1)}
                            >
                                <img
                                    src="/assets/right-arrow.png"
                                    alt="Right Arrow"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className="today-label">
                        Today
                    </div>
                    <div className="days-header">
                        <div className="time-placeholder"></div>
                        {weekDates.map((date, index) => {
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

                {/* Calendar Grid */}
                <div className="calendar-grid-wrapper">
                    <div className="calendar-grid">
                        {hours.map((hour, index) => (
                            <React.Fragment key={index}>
                                <div className="time-cell">{hour}</div>
                                {weekDates.map((date) => (
                                    <div key={`${date}-${hour}`} className="grid-cell">
                                        {renderEvent(date, hour)}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <TimetableStyles />
        </Container>
    );
};

// Separated Styles Component
const TimetableStyles = () => (
    <style>
        {`
        /* Navigation Buttons */
        .timetable-nav-button {
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
            background-color: transparent;
            color: black;
            transition: all 0.2s ease;
        }

        .timetable-nav-button.active {
            background-color: black;
            color: white;
        }

        .timetable-nav-button:hover {
            background-color: #f3f4f6;
        }

        .timetable-nav-button.active:hover {
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

        /* Timetable Container */
        .timetable-container {
            border: 1px solid #EAECF0;
            border-radius: 12px;
        }

        /* Timetable Header */
        .timetable-header {
            position: sticky;
            top: 0;
            z-index: 20;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        .header-controls {
            padding-left: 16px;
            padding-top: 16px;
        }

        .week-nav-btn {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
        }

        .today-label {
            padding-left: 16px;
            font-weight: 500;
            color: #475467;
            margin-bottom: 10px;
        }

        .days-header {
            display: grid;
            grid-template-columns: 120px repeat(7, 1fr);
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
            padding: 10px 0;
        }

        .date-number {
            font-size: 14px;
            font-weight: bold;
            border-radius: 50%;
            padding: 8px;
            margin-bottom: 4px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .day-text {
            font-size: 16px;
            font-weight: 500;
            color: #475467;
            margin: 0;
        }

        /* Calendar Grid */
        .calendar-grid-wrapper {
            overflow-x: auto;
            overflow-y: auto;
            max-height: calc(100vh - 150px);
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            font-size: 18px;
            font-weight: 500;
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
            grid-template-columns: 120px repeat(7, 1fr);
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

        /* Event Card Styles */
        .event-card {
            transition: transform 0.2s ease;
        }

        .event-card:hover {
            transform: scale(1.02);
        }

        .event-title {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
        }

        .event-icon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .event-room {
            margin-bottom: 4px;
            font-size: 11px;
            color: #6c757d;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 400;
            padding-bottom: 16px;
        }

        .event-time {
            margin-bottom: 4px;
            font-size: 12px;
            color: #6c757d;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 400;
            padding-bottom: 16px;
        }

        .event-teacher {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
        }

        .teacher-avatar-small {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 4px;
            object-fit: cover;
        }

        .teacher-label {
            display: flex;
            align-items: center;
            margin-bottom: 0;
            font-size: 11px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #6c757d;
            font-weight: 300;
        }

        .teacher-icon-small {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 4px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .calendar-grid {
                grid-template-columns: 80px repeat(7, 120px);
            }
            
            .time-cell {
                font-size: 14px;
            }
            
            .event-title,
            .event-teacher {
                font-size: 10px;
            }
            
            .event-room,
            .event-time {
                font-size: 9px;
            }
        }
        `}
    </style>
);

export default CalendarGridScreen;