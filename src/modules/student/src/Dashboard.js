
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';


import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [showFirstContent, setShowFirstContent] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    // Dynamic data for courses (can be fetched from an API or database)
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // State variables to store the dynamic data
    const [attendance, setAttendance] = useState(80);  // Default attendance percentage
    const [comparisonPercentage, setComparisonPercentage] = useState(10);  // Default comparison value

    // Example of fetching data (simulating with useEffect)
    useEffect(() => {
        // Simulate fetching data from an API or dynamic source
        // Here we're just setting the values after a timeout, you can replace it with actual API call
        setTimeout(() => {
            setAttendance(85);  // Example dynamic attendance percentage
            setComparisonPercentage(12);  // Example dynamic comparison percentage
        }, 2000);  // Simulating a 2 second delay
    }, []);  // Empty array ensures this runs only once when the component mounts


    // State variables to store dynamic progress values
    const [quizProgress, setQuizProgress] = useState(56); // Default quiz progress
    const [assignmentProgress, setAssignmentProgress] = useState(70); // Default assignment progress

    // Example of fetching dynamic data (simulating with useEffect)
    useEffect(() => {
        // Simulate fetching data from an API or dynamic source
        // Here we're just setting the values after a timeout, you can replace it with an actual API call
        setTimeout(() => {
            setQuizProgress(80);  // Example dynamic quiz progress
            setAssignmentProgress(85);  // Example dynamic assignment progress
        }, 2000);  // Simulating a 2-second delay
    }, []);  // Empty array ensures this runs only once when the component mounts


    // Dynamic state variables for fee data
    const [challanNo, setChallanNo] = useState('9872');  // Default challan number
    const [feeAmount, setFeeAmount] = useState(43000);  // Default fee amount
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');  // Default payment status
    const [statusColor, setStatusColor] = useState('red');  // Default color for unpaid status

    // Simulate fetching dynamic fee data
    useEffect(() => {
        // Example: Simulating data fetching after a delay
        setTimeout(() => {
            setChallanNo('9873');  // New challan number
            setFeeAmount(50000);  // New fee amount
            setPaymentStatus('Paid');  // Payment status updated
            setStatusColor('green');  // Set status color to green for paid
        }, 5000);  // Simulating a 2-second delay
    }, []);


    const [assignment, setAssignment] = useState({
        name: 'Demo Assignment name',
        subject: 'Computer',
        description: 'Welcome to the Assignments section. Here, you will find all the necessary details regarding your upcoming assignments, deadlines, and submission guidelines. Make sure to check this section regularly to stay updated on your coursework and tasks.',
        instructions: 'Demo instructions by teacher to student. Demo instructions by teacher to student. Demo instructions by teacher to student.',
        submissionDate: '9/20/2024',
        studentName: 'Demo Student',
        studentAvatar: '/assets/avatar.png',  // You can replace this with dynamic image data
    });

    // Simulate fetching dynamic assignment data
    useEffect(() => {
        // Example: Fetch assignment data from an API or database
        setTimeout(() => {
            setAssignment({
                name: 'Final Project - Data Science',
                subject: 'Data Science',
                description: 'Complete the final project for Data Science. The project should include data cleaning, exploration, and modeling.',
                instructions: '1. Clean the dataset. 2. Perform exploratory data analysis. 3. Build a machine learning model and evaluate it.',
                submissionDate: '12/15/2024',
                studentName: 'John Doe',
                studentAvatar: '/assets/john-avatar.png',  // Replace with actual avatar
            });
        }, 5000);  // Simulating a 2-second delay for fetching data
    }, []);


    const [exams, setExams] = useState([]); // State to store exams data
    const [loading, setLoading] = useState(true); // State to handle loading state

    useEffect(() => {
        setTimeout(() => {
            const fetchedTasks = [
                {
                    id: 1,
                    code: "Q1",
                    subject: "Quiz",
                    date: "22 Apr 2025",
                    time: "10:00 am - 11:00 am",
                    iconColor: "#E9D7FE",
                    backgroundColor: "#F9F5FF",
                    textColor: "#4338CA",
                },
                {
                    id: 2,
                    code: "A1",
                    subject: "Assignment",
                    date: "23 Apr 2025",
                    time: "2:00 pm - 4:00 pm",
                    iconColor: "#FEDF89",
                    backgroundColor: "#FFFAEB",
                    textColor: "#92400E",
                },
                {
                    id: 3,
                    code: "Q2",
                    subject: "Quiz",
                    date: "24 Apr 2025",
                    time: "1:00 pm - 3:00 pm",
                    iconColor: "#D5D9EB",
                    backgroundColor: "#F8F9FC",
                    textColor: "#065F46",
                },
                {
                    id: 4,
                    code: "Q3",
                    subject: "Quiz",
                    date: "25 Apr 2025",
                    time: "9:00 am - 10:30 am",
                    iconColor: "#E9D7FE",
                    backgroundColor: "#F9F5FF",
                    textColor: "#B45309",
                },
                {
                    id: 5,
                    code: "A2",
                    subject: "Assignment",
                    date: "26 Apr 2025",
                    time: "3:00 pm - 5:00 pm",
                    iconColor: "#FEDF89",
                    backgroundColor: "#FFFAEB",
                    textColor: "#1E3A8A",
                },
            ];

            // Optional filter if needed later
            const allowedSubjects = ["Quiz", "Assignment", "Task"];
            const filteredTasks = fetchedTasks.filter(task =>
                allowedSubjects.includes(task.subject)
            );

            setExams(filteredTasks);
            setLoading(false);
        }, 1000);
    }, []);



    useEffect(() => {
        const fetchedCourses = [
            { name: "Introduction to AI", courseId: "CS110", date: "2024-06-25", status: "Ongoing" },
            { name: "English Literature", courseId: "ENG205", date: "2024-04-10", status: "Ongoing" },
            { name: "Data Structures and Algorithms", courseId: "CS201", date: "2024-01-15", status: "Completed" },
            { name: "Fundamentals of JavaScript", courseId: "CS102", date: "2024-02-20", status: "Completed" },
            { name: "Database Management Systems", courseId: "CS310", date: "2024-03-05", status: "Completed" },
            { name: "Discrete Mathematics", courseId: "MATH201", date: "2024-02-10", status: "Ongoing" },
            { name: "Web Development", courseId: "CS301", date: "2024-05-01", status: "Upcoming" },
            { name: "Introduction to Psychology", courseId: "PSY101", date: "2024-04-12", status: "Completed" },
            { name: "Mobile Application Development", courseId: "CS401", date: "2024-07-15", status: "Ongoing" },
            { name: "Software Engineering", courseId: "CS520", date: "2024-03-22", status: "Completed" },
        ];
        setCourses(fetchedCourses);
    }, []);


    // Toggle the content every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirstContent((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
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
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week for 1st
        const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in month

        // Create grid for days
        const daysGrid = [];
        for (let i = 0; i < firstDay; i++) daysGrid.push(null); // Empty slots before 1st day
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
            bgColor: "#EAF7F1", // Light green
            borderColor: "#039855", // Dark green
        },
        {
            title: "Chemistry",
            time: "3 hours",
            schedule: "9:00 AM to 3:00 PM",
            bgColor: "#F9F5FF", // Light purple
            borderColor: "#D6BBFB", // Dark purple
        },
        {
            title: "Mathematics",
            time: "1.5 hours",
            schedule: "10:00 AM to 12:30 PM",
            bgColor: "#FEF9C3", // Light yellow
            borderColor: "#FBBF24", // Dark yellow
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
                            className="p-2 text-dark shadow-sm event-card"
                            style={{
                                backgroundColor: event.color,
                                borderRadius: "0px",
                                height: `${80 * duration - 2}px`, // Adjust height to account for top and bottom spacing
                                position: "absolute",
                                top: "0px", // Set 4px space at the top
                                left: "0px",
                                right: "0px",
                                bottom: "0px", // Set 4px space at the bottom
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
        <Container fluid>
            <Row className="mt-0">


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
                            paddingBottom: '10px',
                            width: '100%',

                        }}
                    >
                        {/* Left side: Arrow and Heading */}
                        <div id='section1' style={{ display: 'flex', flexDirection: 'column', }}>

                            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Welcome Hamad Khalil 👋</h1>
                            <p>Friday, 27 December 2024</p>
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
                          
                        </div>
                    </header>

                    <Row id='result-card'>
                        {/* Result Card */}
                        <Col md={3}>
                            {/* Result Card with GPA & CGPA */}
                            <Card id='result'
                                style={{
                                    marginBottom: "16px",
                                    border: "1px solid #EAECF0",
                                    borderRadius: "12px",
                                    padding: '1px',
                                    backgroundColor: "#FFFFFF",
                                    minHeight: "250px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    cursor: 'default',
                                }}
                            >
                                <Card.Body>
                                    <Card.Title
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#101828",
                                        }}
                                    >
                                        Result
                                    </Card.Title>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <h4 style={{ fontSize: "36px", fontWeight: "600", color: "#101828" }}>4.3</h4>
                                        <p
                                            style={{
                                                fontSize: "24px",
                                                fontWeight: "500",
                                                color: "#475467",
                                                marginLeft: "6px",
                                                paddingTop: '12px',
                                            }}
                                        >
                                            GPA
                                        </p>
                                    </div>

                                    <p style={{ fontSize: "12px", fontWeight: "500", color: "#475467" }}>
                                        <Image
                                            src="/assets/arrow-up.png"
                                            alt="Arrow Up"
                                            width={20}
                                            height={20}
                                            style={{ marginRight: "6px", cursor: "pointer" }}
                                        />
                                        <span style={{ color: "#027A48" }}>10%</span> vs last semester
                                    </p>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <h4 style={{ fontSize: "36px", fontWeight: "600", color: "#12B76A" }}>4.8</h4>
                                        <p
                                            style={{
                                                fontSize: "24px",
                                                fontWeight: "500",
                                                color: "#12B76A",
                                                marginLeft: "6px",
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            CGPA
                                        </p>
                                    </div>

                                    <p style={{ fontSize: "12px", fontWeight: "500", color: "#475467" }}>
                                        Semester 7 Result
                                    </p>
                                </Card.Body>
                            </Card>

                            {/* Attendance Card */}
                            <Card style={{ minHeight: '250px', border: '1px solid #EAECF0', borderRadius: '12px' }}>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '16px', fontWeight: '600' }}>Attendance</Card.Title>
                                    <h1 style={{ fontSize: '48px', fontWeight: '600', marginTop: '30px' }}>{attendance}%</h1>
                                    <p style={{ fontSize: "12px", fontWeight: "500", color: "#A9A9AF" }}>
                                        <Image
                                            src="/assets/arrow-up.png"
                                            alt="Arrow Up"
                                            width={20}
                                            height={20}
                                            style={{ marginRight: "6px", cursor: "pointer" }}
                                        />
                                        <span style={{ color: "#027A48" }}>{comparisonPercentage}%</span> vs last semester
                                    </p>
                                    <p style={{ fontSize: '14px', fontWeight: '500', display: 'flex', paddingTop: '25px' }}>
                                        Attendance this Semester
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>


                        {/* Quiz & Assignment Card */}
                        <Col md={3}>
                            <Card className="mb-3" style={{ minHeight: '250px', border: '1px solid #EAECF0', borderRadius: '12px' }}>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '16px', fontWeight: '600', marginBottom: '30px' }}>Quiz & Assignment</Card.Title>

                                    {/* Quizzes Progress */}
                                    <p style={{ fontSize: '14px', fontWeight: '600' }}>Quizzes</p>
                                    <div style={{ position: 'relative', height: '8px', borderRadius: '6px', background: '#E8D4FF' }}>
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${quizProgress}%`, // Dynamic width based on progress percentage
                                                borderRadius: '6px',
                                                background: 'linear-gradient(90deg, #A66EFF 0%, #C493FF 100%)', // Gradient colors
                                            }}
                                        ></div>
                                        <span style={{ position: 'absolute', bottom: '-18px', right: '0', fontSize: '11px', fontWeight: '400' }}>
                                            {quizProgress}%
                                        </span>
                                    </div>

                                    {/* Assignments Progress */}
                                    <p style={{ fontSize: '14px', fontWeight: '600', paddingTop: '30px' }}>Assignments</p>
                                    <div style={{ position: 'relative', height: '8px', borderRadius: '6px', background: '#E8D4FF' }}>
                                        <div
                                            style={{
                                                height: '100%',
                                                width: `${assignmentProgress}%`, // Dynamic width based on progress percentage
                                                borderRadius: '6px',
                                                background: 'linear-gradient(90deg, #A66EFF 0%, #C493FF 100%)', // Gradient colors
                                            }}
                                        ></div>
                                        <span style={{ position: 'absolute', bottom: '-18px', right: '0', fontSize: '11px', fontWeight: '400' }}>
                                            {assignmentProgress}%
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>


                            <Card style={{ minHeight: '250px', border: '1px solid #EAECF0', borderRadius: '12px' }}>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '16px', fontWeight: '600' }}>Fees</Card.Title>
                                    <p style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>Challan no. {challanNo}</p>
                                    <h4 style={{ fontSize: '24px', fontWeight: '600' }}>
                                        {feeAmount} <span style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>Rs</span>
                                    </h4>

                                    <p style={{ color: 'black', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
                                        <span style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: statusColor, // Dynamically change color based on status
                                            marginRight: '8px'
                                        }}></span>
                                        {paymentStatus}
                                    </p>

                                    <div style={{ marginTop: '50px' }}>
                                        {paymentStatus === 'Unpaid' ? (
                                            <Button
                                                variant="primary"
                                                style={{
                                                    backgroundColor: 'black',
                                                    height: '35px',
                                                    border: 'none',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    margin: 'auto',
                                                    paddingTop: 'auto',
                                                    borderRadius: '12px',
                                                    width: '80%',
                                                    alignItems: 'center',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                }}
                                                onClick={() => navigate("/paywithcard")} // Navigate to Paywithcard.js page
                                            >
                                                <img
                                                    src="assets/cards2.png"
                                                    alt="Card Icon"
                                                    style={{ width: '16px', height: '16px', marginRight: '8px' }}
                                                />
                                                Pay with Card
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="secondary"
                                                style={{
                                                    backgroundColor: '#6c757d',
                                                    height: '35px',
                                                    border: 'none',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    margin: 'auto',
                                                    paddingTop: 'auto',
                                                    borderRadius: '12px',
                                                    width: '80%',
                                                    alignItems: 'center',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                Payment Completed
                                            </Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
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

                                                {/* Right Section: View All Button */}
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
                                                        onClick={() => navigate("/calendar")} // Navigate to Calendar.js page
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
        .hide-scrollbar::-webkit-scrollbar {
    display: none;
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
        .hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}


    .day-text {
        font-size: 16px;
        font-weight: 500;
        color: #475467;
    }

    .calendar-grid-wrapper {
        overflow-x: auto; /* Allow horizontal scrolling */
        overflow-y: auto; /* Allow vertical scrolling */
        max-height: 350px; /* Adjust to fit remaining height */
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
        @media (max-width: 767px) {
 
  

  section h2 {
    font-size: 18px !important;
  }

  section button {
    font-size: 13px !important;
  }

  section .date-column {
    width: 100% !important;
    min-width: unset !important;
  }

  section .exam-row {
    flex-direction: column !important;
    align-items: stretch !important;
  }

  section .exam-boxes {
    flex-direction: column !important;
    gap: 12px !important;
  }

  section .exam-box {
    width: 100% !important;
    padding: 14px 16px !important;
    border-radius: 12px !important;
  }

  section .exam-box h3 {
    font-size: 15px !important;
  }

  section .exam-box p {
    font-size: 13px !important;
  }
    #exams{
    flex-direction:column;
    align-items:baseline !important;}
}
    #exam-column{
    width:100%;}
    
    #examindex{
    padding:16px 12px !important;}

    `}
                                    </style>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        {/* Assignments Section */}
                        <Col md={6} style={{ marginTop: '20px' }}>
                            <div
                            id='news'
                                className="p-2"
                                style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    backgroundColor: '#fff',
                                    height: '400px'

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
                                        onClick={() => navigate("/news-and-announcements")} // Navigate to the desired page
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
                                  
                                </div>
                                {/* Text Section */}
                                <div style={{ marginTop: '20px' }}>
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
                                   
                                </div>
                                {/* Text Section */}
                                <div style={{ marginTop: '20px' }}>
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

                        <Col md={6} style={{ marginTop: '20px' }}>
                            <Card
                                style={{
                                    border: '1px solid #EAECF0',
                                    borderRadius: '12px',
                                    height: 'auto',
                                    height:'400px',
                                    // overflowY: 'auto',
                                }}
                                className="hide-scrollbar"
                            >
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Card.Title
                                            className="mb-0"
                                            style={{ fontWeight: '600', fontSize: '16px' }}
                                        >
                                            Upcoming Tasks
                                        </Card.Title>
                                        {/* <button
                                            className="btn border-0"
                                            style={{
                                                fontSize: '12px',
                                                padding: '5px 10px',
                                                textDecoration: 'underline',
                                                background: 'transparent',
                                                borderBottom: '1px solid #000',
                                                fontWeight: '500',
                                                color: '#111827',
                                            }}
                                            onClick={() => navigate('/exams')}
                                        >
                                            View All
                                        </button> */}
                                    </div>

                                    {/* Scrollable container */}
                                    <div
                                        style={{
                                            maxHeight: exams.length > 3 ? '345px' : 'none',
                                            overflowY: exams.length > 3 ? 'auto' : 'visible',
                                            paddingRight: exams.length > 3 ? '4px' : '0',
                                        }}
                                    >
                                        <ListGroup variant="flush" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {loading ? (
                                                <div style={{ textAlign: 'center', padding: '10px' }}>
                                                    Loading tasks...
                                                </div>
                                            ) : exams.length === 0 ? (
                                                <div style={{ textAlign: 'center', padding: '10px' }}>
                                                    No upcoming tasks
                                                </div>
                                            ) : (
                                                exams.map((exam) => (
                                                    <ListGroup.Item
                                                        key={exam.id}
                                                        style={{
                                                            border: 'none',
                                                            backgroundColor: exam.backgroundColor,
                                                            borderRadius: '16px',
                                                            padding: '16px 30px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '14px',
                                                            cursor: 'pointer', // Added this line to make cursor pointer

                                                        }}
                                                        onClick={() => {
                                                            if (exam.subject === 'Quiz') {
                                                                navigate(`/quiz-detail/${exam.id}`);  // Navigate to QuizDetail
                                                            } else if (exam.subject === 'Assignment') {
                                                                navigate(`/assignment-detail/${exam.id}`);  // Navigate to AssignmentDetail
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                backgroundColor: exam.iconColor,
                                                                width: '48px',
                                                                height: '48px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '12px',
                                                            }}
                                                        >
                                                            <span style={{ color: exam.textColor, fontWeight: '600', fontSize: '18px' }}>
                                                                {exam.code}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p
                                                                className="mb-1"
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: '500',
                                                                    color: '#101828',
                                                                }}
                                                            >
                                                                {exam.subject} - {exam.date}
                                                            </p>
                                                            <p
                                                                className="mb-0"
                                                                style={{
                                                                    fontSize: '12px',
                                                                    color: '#475467',
                                                                    fontWeight: '500',
                                                                }}
                                                            >
                                                                {exam.time}
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
