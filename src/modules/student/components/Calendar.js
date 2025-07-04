import React from "react";
import { Container, Card, Button, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../../../shared/styles/Dashboard.css';


const CalendarGridScreen = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const navigate = useNavigate();

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


    return (
        <Container fluid className="p-3" style={{ backgroundColor: "#FFFFFF" }} id="calendarscreen">
            <header id="header" className="d-flex justify-content-between align-items-center mb-4" >
                <div className="d-flex align-items-center" id="calenderheading">
                    <Image
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
                        Timetable
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        src="/assets/avatar.jpeg"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                        id="info-img"
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                    </div>

                </div>
            </header>

            {/* Second Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4" id="second-header">
                {/* Left: Month and Year */}
                <div id="mon-year" style={{ display: 'flex' }}>
                    <div
                        className="d-flex align-items-center"
                        style={{
                            border: '1px solid #D1D5DB',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            height: '35px',
                            padding: '10px',
                            backgroundColor: 'transparent',
                        }}
                        onClick={() => navigate('/calendarscreen')} // Navigate to CalendarScreen.js route
                    >
                        <Image
                            src="/assets/menu-board2.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"

                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: 'black' }}>
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
                            background: 'black'
                        }}
                        onClick={() => navigate('/calendar')} // Navigate to Calendar.js route
                    >
                        <Image
                            src="/assets/stickynote1.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: 'white' }}>
                            Time Table
                        </span>
                    </div>


                </div>

                {/* Right: Search Bar with Sort Button */}
                <div  id="calendarsort" className="d-flex align-items-center">
                    <div className="position-relative me-3" style={{ flexGrow: 1 }}>
                        <Form.Control
                            id="search-container"
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
            <div style={{ border: "1px solid #EAECF0", borderRadius: "12px" }}>
                {/* Header Section */}
                <div
                    className="calendar-header"
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center" style={{ paddingLeft: "16px", paddingTop: "16px" }}>
                            <h5 className="mb-0 fw-bold">November 2024</h5>
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
                    </div>
                    <div className="text-muted " style={{ paddingLeft: "16px", fontWeight: '500', color: '#475467' }}>
                        Today
                    </div>
                    <div className="days-header">
                        <div className="time-placeholder"></div> {/* Placeholder for time column */}
                        {(window.innerWidth < 767 ? [today] : weekDates).map((date, index) => {
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
            <p className="day-text">{days[date.getDay()]}</p>
        </div>
    );
})}

                    </div>
                </div>

                {/* Calendar Grid */}
                <div
                    className="calendar-grid-wrapper"
                    style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", fontSize: '18px', fontWeight: '500' }}
                >
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

            {/* Styles */}
            <style>
                {`
                .calendar-header {
                    position: sticky;
                    top: 0;
                    z-index: 20;
                    background-color: #fff;
                    border-bottom: 1px solid #ddd;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                }

                .days-header {
                    display: grid;
                    grid-template-columns: 120px repeat(7, 1fr); /* Time column + 7 days */
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
                    width:35px;
                    height:35px;
                }

                .day-text {
                    font-size: 16px;
                    font-weight: 500;
                    color: #475467;
                }

                .calendar-grid-wrapper {
                    overflow-x: auto; /* Allow horizontal scrolling */
                    overflow-y: auto; /* Allow vertical scrolling */
                    max-height: calc(100vh - 150px);
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
                    grid-template-columns: 120px repeat(7, 1fr); /* Time column + 7 days */
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
                    fontsize:18px;
                    fontweight:500;
                    color:#475467;
                }

                .grid-cell {
                    background-color: #fff;
                    border: 0.5px solid #EAECF0;
                    position: relative;
                }
                    @media (max-width: 767px) {
    .days-header {
        grid-template-columns: 80px 1fr; /* Time + only one day */
        overflow-x: auto;
    }

    .calendar-grid {
        grid-template-columns: 80px 1fr; /* Time + only one day */
        overflow-x: auto;
    }

    .day-cell {
        font-size: 14px;
    }

    .date-number {
        width: 30px;
        height: 30px;
        padding: 6px;
        font-size: 12px;
    }

    .day-text {
        font-size: 14px;
    }

    .calendar-header h5 {
        font-size: 16px;
    }

    .calendar-header .btn img {
        width: 24px;
        height: 24px;
    }

    .calendar-grid-wrapper {
        max-height: none;
        height: auto;
    }

    .calendar-grid-wrapper::-webkit-scrollbar {
        display: none;
    }

    .time-cell {
        font-size: 12px;
        padding: 4px;
    }

    .grid-cell {
        min-height: 60px;
    }

    .calendar-header {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
    }
}

                `}
            </style>
        </Container>
    );
};

export default CalendarGridScreen;
