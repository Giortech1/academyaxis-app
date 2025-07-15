import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';


const CalendarGridScreen = () => {
            const { userData } = useContext(UserContext);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    
    // Month names for date display
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Get the current date
    const today = new Date();
    
    // Initialize startOfWeek
    const [startOfWeek, setStartOfWeek] = useState(() => {
        const day = new Date(today);
        const dayIndex = day.getDay() === 0 ? 6 : day.getDay() - 1;
        day.setDate(day.getDate() - dayIndex);
        return day;
    });
    
    // Generate week dates based on startOfWeek
    const [weekDates, setWeekDates] = useState([]);
    
    useEffect(() => {
        // Update week dates whenever startOfWeek changes
        const newWeekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
        setWeekDates(newWeekDates);
    }, [startOfWeek]);
    
    // Initialize form data
    const [formData, setFormData] = useState({
        day: '',
        course: '',
        teacher: '',
        startTime: '',
        endTime: '',
        room: '',
        color: ''
    });
    
    // Available hours
    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? "am" : "pm";
        return `${hour}:00 ${period}`;
    });
    
    // Available teachers
    const teachers = [
        { id: 1, name: "Kevin Jone" },
        { id: 2, name: "Lisa Smith" },
        { id: 3, name: "John Doe" },
        { id: 4, name: "Sarah Brown" }
    ];
    
    // Available rooms
    const rooms = [
        { id: 1, name: "Room no.1" },
        { id: 2, name: "Room no.2" },
        { id: 3, name: "Room no.3" },
        { id: 4, name: "Room no.5" },
        { id: 5, name: "Room no.8" }
    ];
    
    // Event colors
    const eventColors = [
        { id: 1, value: "#E9E8FC", name: "Purple" },
        { id: 2, value: "#E8F8F2", name: "Green" },
        { id: 3, value: "#FFF5E5", name: "Orange" },
        { id: 4, value: "#DFF8E1", name: "Light Green" },
        { id: 5, value: "#F0F0FF", name: "Blue" }
    ];
    
    // Initialize default events
    useEffect(() => {
        // Default events data
        const defaultEvents = [
            {
                id: 1,
                date: new Date(startOfWeek.getTime()),
                startTime: "9:00 am",
                endTime: "11:00 am",
                subject: "Math Class",
                room: "Room no.8",
                teacher: "Kevin Jone",
                color: "#E9E8FC",
            },
            {
                id: 2,
                date: new Date(startOfWeek.getTime()),
                startTime: "12:00 pm",
                endTime: "2:00 pm",
                subject: "Physics Class",
                room: "Room no.5",
                teacher: "Lisa Smith",
                color: "#E8F8F2",
            },
            {
                id: 3,
                date: new Date(startOfWeek.getTime()),
                startTime: "1:00 pm",
                endTime: "3:00 pm",
                subject: "Chemistry Class",
                room: "Room no.3",
                teacher: "John Doe",
                color: "#FFF5E5",
            },
            {
                id: 4,
                date: new Date(startOfWeek.getTime()),
                startTime: "10:00 am",
                endTime: "12:00 pm",
                subject: "English Literature",
                room: "Room no.2",
                teacher: "Sarah Brown",
                color: "#DFF8E1",
            }
        ];
        
        // Assign different days to each event
        const updatedEvents = defaultEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            eventDate.setDate(eventDate.getDate() + index); // Distribute events over different days
            return {
                ...event,
                date: eventDate
            };
        });
        
        setEvents(updatedEvents);
    }, []);
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    // Handle form submission
    const handleSubmit = () => {
        // Validate form data
        if (!formData.day || !formData.course || !formData.teacher || 
            !formData.startTime || !formData.endTime || !formData.room) {
            alert("Please fill in all required fields");
            return;
        }
        
        // Create new event
        const selectedDay = parseInt(formData.day);
        const eventDate = new Date(startOfWeek);
        eventDate.setDate(startOfWeek.getDate() + selectedDay);
        
        const newEvent = {
            id: events.length + 1,
            date: eventDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            subject: formData.course,
            room: formData.room,
            teacher: formData.teacher,
            color: formData.color || eventColors[Math.floor(Math.random() * eventColors.length)].value
        };
        
        // Add new event to events array
        setEvents(prevEvents => [...prevEvents, newEvent]);
        
        // Reset form and close modal
        setFormData({
            day: '',
            course: '',
            teacher: '',
            startTime: '',
            endTime: '',
            room: '',
            color: ''
        });
        setShowModal(false);
    };
    
    // Handle week navigation
    const navigateWeek = (direction) => {
        setStartOfWeek(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + direction * 7);
            return newDate;
        });
    };
    
    // Delete an event
    const deleteEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };
    
    // Helper to format month year string
    const getMonthYearString = () => {
        const month = monthNames[startOfWeek.getMonth()];
        const year = startOfWeek.getFullYear();
        return `${month} ${year}`;
    };
    
    // Render events in calendar cells
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
                            onClick={() => {
                                // Handle event click - could show details or edit modal
                                console.log('Event clicked:', event);
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
        <Container fluid className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
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
                        Timetable
                    </h1>
                </div>

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
                            <div style={{ fontWeight: '500', fontSize: '14' }}>{userData?.first_name} {userData?.last_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.user_id}</div>
                        </div>

                    </div>
            </header>

            {/* Second Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                {/* Left: Class Name */}
                <div>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>
                        Demo Class Name
                    </span>
                </div>

                {/* Right: Delete and Add Buttons */}
                <div className="d-flex">
                    {/* Delete Button */}
                    <button
                        style={{
                            backgroundColor: 'white',
                            color: '#000',
                            border: '1px solid #D1D5DB',
                            borderRadius: '8px',
                            padding: '6px 16px',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete all events?')) {
                                setEvents([]);
                            }
                        }}
                    >
                        <img src="/assets/delete1.png" alt="Delete" width="16" height="16" />
                        Delete
                    </button>

                    {/* Add Button */}
                    <div>
                        {/* Add Button */}
                        <button
                            style={{
                                backgroundColor: '#111827',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 33px',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginLeft: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setShowModal(true)}
                        >
                            Add
                        </button>

                        {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '15px',
                            width: '320px',
                            boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
                            position: 'relative',
                        }}
                    >
                        {/* Modal Header */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Add class</h5>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form>
                            <div className="mb-3">
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>Day</label>
                                <select
                                    name="day"
                                    className="form-control"
                                    value={formData.day}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Day</option>
                                    {weekDates.map((date, index) => (
                                        <option key={index} value={index}>
                                            {days[index]} ({date.getDate()}/{date.getMonth() + 1})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>Course</label>
                                <input
                                    name="course"
                                    className="form-control"
                                    placeholder="Data Structure"
                                    value={formData.course}
                                    onChange={handleChange}
                                    style={{ fontSize: '14px', fontWeight: '500' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>Room</label>
                                <select
                                    name="room"
                                    className="form-control"
                                    value={formData.room}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Room</option>
                                    {rooms.map(room => (
                                        <option key={room.id} value={room.name}>
                                            {room.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>Teacher</label>
                                <select
                                    name="teacher"
                                    className="form-control"
                                    value={formData.teacher}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Teacher</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher.id} value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3 d-flex justify-content-between">
                                <div style={{ width: '48%' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '500' }}>Start time</label>
                                    <select
                                        name="startTime"
                                        className="form-control"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        {hours.filter((_, i) => i < 22).map((hour, index) => (
                                            <option key={index} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '500' }}>End time</label>
                                    <select
                                        name="endTime"
                                        className="form-control"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        {hours.filter((_, i) => i > hours.indexOf(formData.startTime) || !formData.startTime).map((hour, index) => (
                                            <option key={index} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label style={{ fontSize: '14px', fontWeight: '500' }}>Event Color</label>
                                <div className="d-flex justify-content-between">
                                    {eventColors.map(color => (
                                        <div 
                                            key={color.id}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                backgroundColor: color.value,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                border: formData.color === color.value ? '2px solid #7F56D9' : '1px solid #ddd'
                                            }}
                                            onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="button"
                                className="btn w-100"
                                style={{
                                    backgroundColor: '#F9F5FF',
                                    color: '#7F56D9',
                                    borderRadius: '10px',
                                    fontWeight: '500',
                                    fontSize: '18px',
                                    border: '1px solid #7F56D9',
                                }}
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
                    </div>
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
                            <h5 className="mb-0 fw-bold">{getMonthYearString()}</h5>
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
                        
                        {/* Today button */}
                        <Button
                            variant="outline-primary"
                            className="me-3"
                            onClick={() => {
                                const day = new Date();
                                const dayIndex = day.getDay() === 0 ? 6 : day.getDay() - 1;
                                day.setDate(day.getDate() - dayIndex);
                                setStartOfWeek(day);
                            }}
                            style={{
                                borderColor: '#7F56D9',
                                color: '#7F56D9',
                                borderRadius: '8px',
                                fontSize: '14px',
                            }}
                        >
                            Today
                        </Button>
                    </div>
                    <div className="text-muted " style={{ paddingLeft: "16px", fontWeight: '500', color: '#475467' }}>
                        Today: {today.toLocaleDateString()}
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
                                {weekDates.map((date, dateIndex) => (
                                    <div 
                                        key={`${dateIndex}-${hour}`} 
                                        className="grid-cell"
                                        onClick={() => {
                                            // Quick add event on cell click
                                            const dayIndex = dateIndex;
                                            setFormData({
                                                day: dayIndex.toString(),
                                                startTime: hour,
                                                endTime: hours[Math.min(index + 2, hours.length - 1)],
                                                course: '',
                                                teacher: '',
                                                room: '',
                                                color: eventColors[Math.floor(Math.random() * eventColors.length)].value
                                            });
                                            setShowModal(true);
                                        }}
                                    >
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
                `}
            </style>
        </Container>
    );
};

export default CalendarGridScreen;
