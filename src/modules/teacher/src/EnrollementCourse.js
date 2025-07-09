import React from "react";
import { Container, Table, Image, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';

function EnrollementCourse() {
    const navigate = useNavigate();
    const location = useLocation();

    // Receive course from previous screen or use fallback demo data
    const course = location.state?.course || {
        name: "Introduction to AI",
        courseID: "AI101",
        instructor: "Kevin Jone",
        schedule: "Mon/Wed 10–11:30 AM",
        creditHours: 3,
        status: "Enrolled"
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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




    // Example schedule parser (from "Mon/Wed 10–11:30 AM")
    const parseSchedule = (scheduleStr) => {
        const [daysStr, timeStr] = scheduleStr.split(" ");
        const daysMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
        const [start, end] = timeStr.split("–");

        return daysStr.split("/").map((day) => {
            const date = new Date(startOfWeek); // Use start of the week
            date.setDate(date.getDate() + daysMap[day]); // Set correct weekday
            return {
                id: course.courseID + "-" + day,
                date,
                startTime: convertTo12Hour(start),
                endTime: convertTo12Hour(end),
                subject: course.name,
                room: "Room no.1",
                teacher: course.instructor,
                color: "#E9E8FC",
            };
        });
    };

    // Utility: Convert "10" or "11:30" to "10:00 am" or "11:30 am"
    const convertTo12Hour = (time) => {
        const [hourMin, period] = time.includes("am") || time.includes("pm") ? [time.slice(0, -2), time.slice(-2)] : [time, ""];
        let [h, m] = hourMin.split(":");
        h = parseInt(h);
        m = m || "00";
        const hour24 = h;
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const ampm = h >= 12 ? "pm" : "am";
        return `${hour12}:${m} ${period || ampm}`;
    };

    // Dynamically generate events
    const events = course.schedule ? parseSchedule(course.schedule) : [];

    const renderEvent = (currentDate, time) => {
        return events.map((event) => {
            const eventDate = new Date(event.date);
            if (eventDate.toDateString() === currentDate.toDateString()) {
                const startIndex = hours.indexOf(event.startTime);
                const endIndex = hours.indexOf(event.endTime);
                const currentIndex = hours.indexOf(time);

                if (currentIndex === startIndex) {
                    const duration = endIndex - startIndex || 1; // fallback if not found
                    return (
                        <div
                            key={event.id}
                            style={{
                                gridRow: `span ${duration}`,
                                height: `${80 * duration}px`,
                                backgroundColor: event.color,
                                borderRadius: "8px",
                                padding: "10px 12px",
                                margin: "4px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                fontSize: "12px",
                            }}
                        >
                            <strong style={{ fontWeight: 600, color: "#1D2939" }}>{event.subject}</strong>
                            <span style={{ color: "#4B5563", fontSize: "11px" }}>
                                {event.startTime} - {event.endTime}
                            </span>
                            <span style={{ color: "#4B5563", fontSize: "11px", fontWeight: 500 }}>
                                {event.teacher}
                            </span>
                        </div>
                    );
                }
            }
            return null;
        });
    };


    return (
        <Container fluid className="px-3  py-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Image
                        src="/assets/arrow-left.png"
                        alt="Back"
                        width={20}
                        height={20}
                        className="me-2"
                        onClick={() => navigate(-1)}
                        style={{ cursor: 'pointer' }}
                    />
                    <h4 className="mb-0" style={{ fontWeight: 600 }}>My Courses</h4>
                </div>
                <div className="d-flex align-items-center">
                    <img
                        src="/assets/avatar.jpeg"
                        alt="User"
                        style={{
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            marginRight: '10px'
                        }}
                    />
                    <div>
                        <div style={{ fontWeight: '500', fontSize: '14px' }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: '12px', color: '#6c757d' }}>14785200</div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h5 style={{ fontWeight: "600", marginBottom: "40px", color: '#101828', }}>{course.name}</h5>

            {/* Table */}
            <div className="table-responsive">
                <Table borderless className="align-middle">
                    <thead style={{ fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                        <tr>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Instructor</th>
                            <th>Schedule</th>
                            <th>Credit Hours</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px" }}>
                        <tr className="border-top">
                            <td>{course.name || "—"}</td>
                            <td>{course.courseID || "—"}</td>
                            <td>{course.instructor || "N/A"}</td>
                            <td>{course.schedule || "N/A"}</td>
                            <td>{course.creditHours || "—"}</td>
                            <td>
                                <span className="d-flex align-items-center">
                                    <span className="rounded-circle me-1" style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#10B981'
                                    }}></span>
                                    {course.status || "Enrolled"}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div style={{ border: "1px solid #EAECF0", borderRadius: "12px", marginTop: '30px' }}>
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
                        {weekDates.map((date, index) => {
                            const isToday =
                                today.toDateString() === date.toDateString(); // Highlight if it's today
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

            {/* Responsive Style */}
            <style jsx>{`
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
          table {
            font-size: 13px;
          }
          th, td {
            padding: 10px 8px !important;
            white-space: nowrap;
          }
        }
      `}</style>
        </Container>
    );
}

export default EnrollementCourse;
